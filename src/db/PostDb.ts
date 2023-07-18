import { Post } from "./model/Post";
 
export interface PostDb {
    getPosts(): Promise<Post[]>;
    createPost(post: Post): Promise<Post>;
    getPost(postId: number): Promise<Post>;
    deletePost(postId: number): Promise<void>;
    updatePost(post: Post): Promise<void>;
}