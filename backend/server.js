require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME      
});


db.connect((err) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    console.log('Kõik on korras! Connected to the MySQL database.');
});



app.get('/api/search', async (req, res) => {
    const { query } = req.query; 
    
    if (!query) {
        return res.status(400).json({ error: "Empty search query" });
    }

    try {
        
        const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`;
        
       
        const response = await fetch(tmdbUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        
        const data = await response.json();
        
  
        res.json(data.results || []); 
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Unable to retrieve data from TMDB" });
    }
});

app.get('/api/watchlist', (req, res) => {
    const sql = "SELECT * FROM watch_list ORDER BY created_at DESC";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Error occurred while fetching movies from the database" });
        }
        res.json(results);
    });
});


app.post('/api/watchlist', (req, res) => {
    const { movie_id, title, poster_path, rating, notes, status } = req.body;
    const sql = "INSERT INTO watch_list (movie_id, title, poster_path, rating, notes, status) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [movie_id, title, poster_path, rating, notes, status || 'want_to_watch'], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Error occurred while saving movie to the database" });
        }
        res.status(201).json({ message: "Movie successfully added!", id: result.insertId });
    });
});


app.delete('/api/watchlist/:id', (req, res) => {
    const { id } = req.params; 
    const sql = "DELETE FROM watch_list WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Error occurred while deleting movie from the database" });
        }
        res.json({ message: "Movie successfully deleted!" });
    });
});

app.put('/api/watchlist/:id', (req, res) => {
    const { id } = req.params;
    const { rating, notes, status } = req.body;
    const sql = "UPDATE watch_list SET rating = ?, notes = ?, status = ? WHERE id = ?";
    
    db.query(sql, [rating, notes, status, id], (err, result) => {
        if (err) {
            console.error("Ошибка обновления в БД:", err);
            return res.status(500).json({ error: "Ошибка при обновлении фильма" });
        }
        res.json({ message: "Фильм успешно обновлен!" });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен!`);
    console.log(`Ссылка для проверки бэкенд-списка: http://localhost:${PORT}/api/watchlist`);
});