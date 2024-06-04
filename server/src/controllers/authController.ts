import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig';

// ログイン処理
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE user_name = ? AND password = ?', [username, password]
        );
        await connection.end();

        if ((rows as any).length > 0) {
            res.json({ message: '成功' });
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
        const user_identification_code = 'aaaaa';
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO users (user_identification_code, user_name, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
            [user_identification_code, username, password, created_at, updated_at]
        );
        await connection.end();
        res.status(201).json({ message: 'User registered successfully', user_id: (result as any).insertId });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};