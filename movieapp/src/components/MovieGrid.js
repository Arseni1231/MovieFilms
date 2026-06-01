import React from 'react';
import MovieCard from './MovieCard';
import './moviegrid.css';

function MovieGrid({ movies, handleUpdateMovie, handleDeleteMovie }) {
  if (movies.length === 0) {
    return <p className="empty-message">Siin pole veel midagi...</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          handleUpdateMovie={handleUpdateMovie} 
          handleDeleteMovie={handleDeleteMovie} 
        />
      ))}
    </div>
  );
}

export default MovieGrid;