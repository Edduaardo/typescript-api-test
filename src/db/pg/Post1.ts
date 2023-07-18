import { Pool, QueryResult } from "pg";
import { Post } from "../model/Post";
 
export class Post1 {
  #pool: Pool;
 
  constructor(pool: Pool) {
    this.#pool = pool;
  }
 
  async getPosts(): Promise<Post[]> {
      const result = await this.#pool.query(
        `SELECT
          id AS "id",
          title AS "title",
          body AS "body",
          created_at AS "createdAt" 
        FROM
          Post`);
      return Post1.mapPostsResult(result);
  }
 
  async getPost(postId: number): Promise<Post> {
    const result = await this.#pool.query(
      `SELECT
        id AS "id",
        title AS "title",
        body AS "body",
        created_at AS "createdAt" 
      FROM
        Post post
      WHERE
        post.id = $1`, [postId]);
    return Post1.mapPostsResult(result)[0];
  }

  async createPost(post: Post): Promise<Post> {
    var result = await this.#pool.query(
      `INSERT INTO
      Post (
        title,
        body,
        created_at
      ) 
    VALUES (
      $1,
      $2,
      $3
    ) RETURNING *`,
      [
        post.title,
        post.body,
        post.createdAt
      ]);
    return Post1.mapPostsResult(result)[0];
  }

  async deletePost(postId: number): Promise<void> {
    await this.#pool.query(
      `DELETE FROM
        Post
      WHERE
        id = $1`,
      [postId]);
  }

  async updatePost(post: Post): Promise<void> {
    await this.#pool.query(
      `UPDATE
        Post
      SET
        title = COALESCE($1, title),
        body = COALESCE($2, body),
        created_at = COALESCE($3, created_at)
      WHERE
        id = $4`,
        [
          post.title,
          post.body,
          post.createdAt,
          post.id
        ]
    );
  }

  private static mapPostsResult = (
    res: QueryResult
  ): Post[] =>
    res.rows.map((r) => ({
      id: r.id,
      title: r.title,
      body: r.body,
      createdAt: r.createdAt
    }));
}