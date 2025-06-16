import { eq, like, sql } from "drizzle-orm";
import {db} from "../config/db.js";
import { postTable, usersTable } from "../drizzle/schema.js"; 
import { rm} from 'fs';
import path from "path";


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

//* getdata  of post for updation

export const getPostData=async(id)=>{
    return await db.select().from(postTable).where(eq(postTable.id,id));
}

export const updatedPost=async({id,caption,post,img})=>{
    // console.log("id,caption",id,caption);
    // console.log(postTable.userId);

   const filePath=path.join(process.cwd(),'uploads',img)
   
    rm(filePath,()=>{
        console.log(`path dlt `);
    }) 
     const data= await db.update(postTable).set({caption,post}).where(eq(postTable.id,id));
        const userId= postTable.userId;
    return{
        data,
        userId
    }
}


export const deleteApost=async({id,userId})=>{
//    console.log("id",id);
   
   const [data]=await db.select().from(postTable).where(eq(postTable.id,id)) ;
//    console.log(data);
   
//    console.log("data",data.userId);
//    console.log("userId",userId);
   
    if(data.userId !=userId) return null; 
    const filePath=path.join(process.cwd(),'uploads',data.post)
   
    
    rm(filePath,()=>{
        console.log(`path dlt `);
    }) 
    
   return await db.delete(postTable).where(eq(postTable.id,id));
}

export const likeUpdate=async(id)=>{
    return db.update(postTable).set({ like: sql`${postTable.like} + 1` }).where(eq(postTable.id,id));
}

export const likedlt=async(id)=>{
    return db.update(postTable).set({ like: sql`${postTable.like} - 1` }).where(eq(postTable.id,id));
}