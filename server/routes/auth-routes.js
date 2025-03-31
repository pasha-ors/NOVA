import express from "express";
import pool from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utils/jwt-helpers.js'
import err from "jsonwebtoken/lib/JsonWebTokenError.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`[LOGIN] Запит на логін: ${email}`);

        if (!email || !password) {
            console.warn('[LOGIN] Відсутні email або пароль');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (users.rows.length === 0) {
            console.warn(`[LOGIN] Email не знайдено: ${email}`);
            return res.status(404).json({ error: 'Email is incorrect' });
        }

        const user = users.rows[0];
        console.log(user);
        const validPassword = await bcrypt.compare(password, user.user_password);
        if (!validPassword) {
            console.warn(`[LOGIN] Невірний пароль для: ${email}`);
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        console.log('[LOGIN] Авторизація успішна, генеруємо токени...');
        let tokens = jwtTokens(user);
        console.log("REFRESH TOKEN:", tokens.refreshToken);
        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000 // 5 хвилин
        });

        console.log('[LOGIN] Токени відправлені, логін завершено');
        res.json({ accessToken: tokens.accessToken });

    } catch (err) {
        console.error('[LOGIN] Помилка при логіні:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const users = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if(users.rows.length > 0) {
            return res.status(401).json({error: 'User are already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );

        const tokens = jwtTokens(newUser.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true
        });
        res.json({accessToken: tokens.accessToken});
    }catch(err){
        res.status(401).json({error: err.message});
    }
})

router.get('/refresh_token', (req, res) => {
    try{
        const refresh_token = req.cookies.refresh_token;
        console.log(refresh_token);
        if(refresh_token === null){
            return res.status(401).json({error: 'Refresh token is null'});
        }
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if(error){
                return res.status(401).json({error: error.message});
            }
            let tokens  = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
            res.json({ accessToken: tokens.accessToken });
        })
    }catch(err){
        res.status(401).json({error: err.message});
    }
});

router.delete('/refresh_token', (req, res) => {
    try{
        res.clearCookie('refresh_token');
        return res.status(200).json({message: 'Refresh token has been deleted'});
    } catch{
        res.status(401).json({error: err.message});
    }
});

export default router;