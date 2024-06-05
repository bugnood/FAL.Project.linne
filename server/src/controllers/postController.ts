import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig';

// 投稿を取得する
export const getPosts = async (req: Request, res: Response) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT p.*, u.user_name, u.user_identification_code
            FROM pops p
            JOIN users u ON p.user_id = u.user_id
            ORDER BY p.created_at DESC
        `);
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
    const { newPopsContents } = req.body;
    console.log(newPopsContents);

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO pops (user_id, content, image1, image2, image3, image4, tags, favorites_count, attention_count, bookmarks_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [1, newPopsContents, null, null, null, null, null, 0, 0, 0]
        );
        await connection.end();
        res.json({ message: 'Post created successfully', post_no: (result as any).insertId });
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
    const post_no = req.params.id;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('UPDATE pops SET favorites_count = favorites_count + 1 WHERE post_no = ?', [post_no]);
        const [rows] = await connection.execute('SELECT favorites_count FROM pops WHERE post_no = ?', [post_no]);
        await connection.end();
        res.status(200).json({ favorites_count: (rows as any)[0].favorites_count });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to update favorite count' });
    }
};
