import React from 'react';
import './searchbar.css'; 

function SearchBar({ searchQuery, setSearchQuery, searchResults, handleAddToWatchlist, getPosterUrl }) {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Lisatavate filmide otsing (inglise keeles / vene keeles)..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {searchResults.length > 0 && (
        <div className="search-dropdown">
          {searchResults.map(movie => (
            <div key={movie.id} onClick={() => handleAddToWatchlist(movie)} className="search-item">
              <img src={getPosterUrl(movie.poster_path)} alt="" className="search-poster" />
              <div>
                <strong className="search-title">{movie.title}</strong>
                <span className="search-year">{movie.release_date ? movie.release_date.substring(0, 4) : '----'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;