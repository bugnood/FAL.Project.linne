// server/index.ts (Express アプリ)

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5002;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "aaa" && password === "12345") {
    res.json({ message: '成功' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
