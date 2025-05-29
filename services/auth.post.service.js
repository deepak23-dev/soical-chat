import { eq } from "drizzle-orm";
import {db} from "../config/db.js";
import { postTable, usersTable } from "../drizzle/schema.js"; 

export const createPost=async({post,caption,userId})=>{
     return await db
    .insert(postTable)
    .values({post,caption,userId})
    .$returningId();
    
}

export const getAllUserPost=async({id})=>{
    // console.log("id is",id); 
    return await db.select().from(postTable).where(eq(postTable.userId,id))
}

export const getProfilesPost=async()=>{
    return await db.select().from(postTable).innerJoin(usersTable, eq(postTable.userId, usersTable.id))
}