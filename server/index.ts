import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 5002;

// MySQLデータベースへの接続設定
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'mydatabase',
};

// 初期化関数を呼び出してデータベース接続を確認
async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    await connection.end();
  } catch (error) {
    console.error('Unable to connect to MySQL database:', error);
    process.exit(1);
  }
}

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(bodyParser.json());
app.use(cors());

// 投稿を取得するエンドポイントを追加
app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM posts');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 投稿を編集するエンドポイントを追加
app.put('/api/posts', async (req: Request, res: Response) => {
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
});

// 新規投稿を作成するエンドポイントを追加
app.post('/api/posts', async (req: Request, res: Response) => {
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
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?', [username, password]
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
});

// 投稿を削除するエンドポイントを追加
app.delete('/api/posts/:id', async (req: Request, res: Response) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
