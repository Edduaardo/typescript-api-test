import express from 'express';
import { query, body, param } from 'express-validator';
import controller from '../controllers/posts';

const router = express.Router();

router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id',
    body('id').trim().notEmpty().isAlphanumeric(),
    body('title').trim().notEmpty(),
    body('body').trim().notEmpty(),
    body('createdAt').trim().optional().isDate(),
    controller.updatePost);
router.post(
    '/posts',
    body('title').trim().notEmpty(),
    body('body').trim().notEmpty(),
    body('createdAt').trim().optional().isDate(),
    controller.addPost);
router.delete('/posts/:id', controller.deletePost);

export = router;