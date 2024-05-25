// server/index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express サーバーが実行中です。');
});

app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で実行中です。`);
});
