import { Router } from 'express';
import { getPosts, updatePost, createPost, deletePost, likePost, favoritePost } from '../controllers/postController';

const router = Router();

// 投稿取得エンドポイント
router.get('/', getPosts);

// 投稿編集エンドポイント
router.put('/', updatePost);

// 新規投稿エンドポイント
router.post('/', createPost);

// 投稿削除エンドポイント
router.delete('/:id', deletePost);

// いいね数更新エンドポイント
router.put('/like/:id', likePost);

// お気に入り数更新エンドポイント
router.put('/favorite/:id', favoritePost);

export default router;