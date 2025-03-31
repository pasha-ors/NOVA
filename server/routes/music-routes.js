import express from "express";
import pool from '../database/db.js';
import axios from "axios";
import {authenticateToken} from "../middleware/authorization.js";

const router = express.Router();

router.post('/download', authenticateToken, async (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.post('http://music_downloader:5001/download', { url });

        const { message, data } = response.data;
        const userID = req.user.user_id;

        const result = await pool.query(
            'INSERT INTO music (title, artist, file_path, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [data.title, data.artist, data.file_path, userID]
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


router.get('/', authenticateToken, async (req, res) => {
    try {
        const userID = req.user.user_id;

        const result = await pool.query(
            "SELECT music.title FROM music JOIN users ON users.user_id = music.user_id WHERE users.user_id = $1",
            [userID]
        );

        const music = result.rows;

        if (!music || music.length === 0) {
            return res.status(200).json({ music: [] });
        }

        return res.status(200).json({ music });

    } catch (error) {
        console.error('[GET /api/music] Error:', error);
        return res.status(500).json({ error: 'Failed to get music.' });
    }
});

export default router;