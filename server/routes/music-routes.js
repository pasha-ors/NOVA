import express from "express";
import pool from '../database/db.js';
import axios from "axios";

const router = express.Router();

router.post('/download', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.post('http://music_downloader:5001/download', { url });

        const { message, data } = response.data;

        const result = await pool.query(
            'INSERT INTO music (title, artist, file_path) VALUES ($1, $2, $3) RETURNING *',
            [data.title, data.artist, data.file_path]
        );

        res.status(201).json({
            message: 'Music downloaded and saved to database.',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error downloading or saving music:', error.message);
        res.status(500).json({ error: 'Failed to download or save music.' });
    }
});

export default router;