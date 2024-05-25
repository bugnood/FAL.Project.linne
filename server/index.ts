import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';  // 追加

const app = express();
const PORT = process.env.PORT || 5002;

// MySQLデータベースへの接続設定
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'mydatabase',
};

async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    // 必要に応じて初期化処理をここに追加できます
    await connection.end();
  } catch (error) {
    console.error('Unable to connect to MySQL database:', error);
    process.exit(1);  // エラーの場合、プロセスを終了します
  }
}

// 初期化関数を呼び出してデータベース接続を確認
initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', async (req: Request, res: Response) => {  // 修正
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
