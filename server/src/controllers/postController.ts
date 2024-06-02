import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig';

// 投稿を取得する
export const getPosts = async (req: Request, res: Response) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM posts ORDER BY created_at DESC');
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 投稿を編集する
export const updatePost = async (req: Request, res: Response) => {
    const { id, content } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE posts SET content = ? WHERE post_id = ?', [content, id]);
        await connection.end();
        res.json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 新規投稿を作成する
export const createPost = async (req: Request, res: Response) => {
    const { user_id, content, media, hashtags, mentions } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO posts (user_id, content, media, hashtags, mentions) VALUES (?, ?, ?, ?, ?)',
            [user_id, content, media, hashtags, mentions]
        );
        await connection.end();
        res.json({ message: 'Post created successfully', post_id: (result as any).insertId });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 投稿を削除する
export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM posts WHERE post_id = ?', [postId]);
        await connection.end();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// いいね数を更新する
export const likePost = async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE posts SET likes_count = likes_count + 1 WHERE post_id = ?', [postId]);
        const [rows] = await connection.execute('SELECT likes_count FROM posts WHERE post_id = ?', [postId]);
        await connection.end();
        res.status(200).json({ likes_count: (rows as any)[0].likes_count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to update like count' });
    }
};

// お気に入り数を更新する
export const favoritePost = async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE posts SET favorite_count = favorite_count + 1 WHERE post_id = ?', [postId]);
        const [rows] = await connection.execute('SELECT favorite_count FROM posts WHERE post_id = ?', [postId]);
        await connection.end();
        res.status(200).json({ favorite_count: (rows as any)[0].favorite_count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to update favorite count' });
    }
};
