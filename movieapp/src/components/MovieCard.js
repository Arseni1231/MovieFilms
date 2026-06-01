import React from 'react';
import './moviecard.css'; 

function MovieCard({ movie, handleUpdateMovie, handleDeleteMovie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster_path} alt={movie.title} className="card-poster" />
      
      <div className="card-content">
        <h4 className="card-title">{movie.title}</h4>
        
        <div>
          <label className="input-label">Minu hinnang (1-10):</label>
          <input 
            type="number" 
            min="1" max="10"
            value={movie.rating || ''} 
            placeholder="ei hinnatud"
            onChange={(e) => handleUpdateMovie(movie.id, { rating: e.target.value ? parseInt(e.target.value) : null, notes: movie.notes, status: movie.status })}
            className="rating-input"
          />
          
          <textarea 
            placeholder="Lisa märge" 
            value={movie.notes || ''} 
            onChange={(e) => handleUpdateMovie(movie.id, { rating: movie.rating, notes: e.target.value, status: movie.status })}
            className="notes-textarea"
          />
        </div>

        <div className="card-buttons">
          {movie.status === 'want_to_watch' ? (
            <button 
              onClick={() => handleUpdateMovie(movie.id, { rating: movie.rating, notes: movie.notes, status: 'watched' })}
              className="btn-watched"
            >
              Vaatasin läbi
            </button>
          ) : (
            <button 
              onClick={() => handleUpdateMovie(movie.id, { rating: movie.rating, notes: movie.notes, status: 'want_to_watch' })}
              className="btn-rewatch"
            >
            Üle vaadata  
            </button>
          )}
          
          <button onClick={() => handleDeleteMovie(movie.id)} className="btn-delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;