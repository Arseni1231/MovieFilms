import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import './App.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('want_to_watch');

  const getPosterUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
  };

  const fetchWatchlist = () => {
    fetch('http://localhost:5000/api/watchlist')
      .then(res => res.json())
      .then(data => setWatchlist(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      fetch(`http://localhost:5000/api/search?query=${searchQuery}`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setSearchResults(data); })
        .catch(err => console.error(err));
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);


  const handleAddToWatchlist = (movie) => {
    const newMovie = {
      movie_id: movie.id.toString(),
      title: movie.title,
      poster_path: getPosterUrl(movie.poster_path),
      rating: null,
      notes: '',
      status: 'want_to_watch'
    };

    fetch('http://localhost:5000/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    })
    .then(() => {
      fetchWatchlist();
      setSearchQuery('');
      setSearchResults([]);
    })
    .catch(err => console.error(err));
  };


  const handleUpdateMovie = (id, updatedFields) => {
    fetch(`http://localhost:5000/api/watchlist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })
    .then(() => fetchWatchlist())
    .catch(err => console.error(err));
  };


  const handleDeleteMovie = (id) => {
    fetch(`http://localhost:5000/api/watchlist/${id}`, { method: 'DELETE' })
      .then(() => fetchWatchlist())
      .catch(err => console.error(err));
  };


  const filteredMovies = watchlist.filter(movie => movie.status === activeTab);

  return (
    <div className="App" style={{ padding: '30px', fontFamily: 'Segoe UI, Roboto, sans-serif', background: '#141414', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#e50914', fontSize: '36px', marginBottom: '30px' }}>MOVIE TRACKER</h1>

      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        handleAddToWatchlist={handleAddToWatchlist}
        getPosterUrl={getPosterUrl}
      />


      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #222', paddingBottom: '10px' }}>
        <button 
          onClick={() => setActiveTab('want_to_watch')}
          style={{ background: 'none', border: 'none', color: activeTab === 'want_to_watch' ? '#e50914' : '#aaa', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', paddingBottom: '5px', borderBottom: activeTab === 'want_to_watch' ? '3px solid #e50914' : 'none' }}
        >
          Хочу посмотреть ({watchlist.filter(m => m.status === 'want_to_watch').length})
        </button>
        <button 
          onClick={() => setActiveTab('watched')}
          style={{ background: 'none', border: 'none', color: activeTab === 'watched' ? '#00ffcc' : '#aaa', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', paddingBottom: '5px', borderBottom: activeTab === 'watched' ? '3px solid #00ffcc' : 'none' }}
        >
          Vaadatud ({watchlist.filter(m => m.status === 'watched').length})
        </button>
      </div>

      {/* Переиспользуемый компонент сетки фильмов */}
      <MovieGrid 
        movies={filteredMovies}
        handleUpdateMovie={handleUpdateMovie}
        handleDeleteMovie={handleDeleteMovie}
      />
    </div>
  );
}

export default App;