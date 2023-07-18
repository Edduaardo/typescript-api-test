import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Post } from '../db/model/Post'
import { posts } from '../db'

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts1 = await posts.getPosts();
    return res.status(StatusCodes.OK).json({
        posts1
    });
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const post1 = await posts.getPost(parseInt(req.params.id));
    return res.status(StatusCodes.OK).json({
        post1
    });
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: validationResults.array()
        });
    }
    
    let post1: Post = {
        id: parseInt(req.params.id),
        title: req.body.title ?? null,
        body: req.body.body ?? null,
        createdAt: req.body.createdAt ?? null
    };
    await posts.updatePost(post1);
    return res.status(StatusCodes.OK).json({
        message: 'ok'
    });
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    await posts.deletePost(parseInt(req.params.id));
    return res.status(StatusCodes.OK).json({
        message: 'Post deleted successfully'
    });
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
    const validationResults = validationResult(req);
    if (!validationResults.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: validationResults.array()
        });
    }

    const newPost: Post = {
        id: 0,
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date()
    };
    const result = await posts.createPost(newPost);

    return res.status(StatusCodes.OK).json({
        result
    });
};

export default { 
    getPosts,
    getPost,
    updatePost,
    deletePost,
    addPost
};