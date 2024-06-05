import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig';

const secretKey = 'your_secret_key';

// ログイン処理
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT user_id, user_name FROM users WHERE user_name = ? AND password = ?', [username, password]
        );
        await connection.end();

        if ((rows as any).length > 0) {
            const user = (rows as any)[0];
            const token = jwt.sign({ userId: user.user_id, username: user.user_name }, 'your_jwt_secret');
            res.json({ message: '成功', user: { userId: user.user_id, username: user.user_name }, token });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ユーザー登録処理
export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const created_at = new Date();
        const updated_at = new Date();
        const user_identification_code = uuidv4();
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO users (user_identification_code, user_name, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
            [user_identification_code, username, password, created_at, updated_at]
        );
        await connection.end();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};