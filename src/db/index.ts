import { Pool } from "pg";
import { PostDb } from "./PostDb";
import { Post1 } from "../db/pg/Post1";
 
const connectionString = process.env.POSTGRESQL_CONNECTION;
 
const pool = new Pool({
  connectionString
});
 
export const posts: PostDb = new Post1(pool);