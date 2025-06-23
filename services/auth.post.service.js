import { and, eq, like, not, sql } from "drizzle-orm";
import {db} from "../config/db.js";
import { postLikeUsersTable, postTable, usersTable } from "../drizzle/schema.js"; 
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

export const checkLike=async(id,userId)=>{
    // console.log(id,userId);
    
    const [like] = await db
    .select()
    .from(postLikeUsersTable)
    .where(
      and(
        eq(postLikeUsersTable.userId, userId),
        eq(postLikeUsersTable.postId, id)
      )
    );

  return like ?? null;
}

export const likeUpdate=async(id,userId)=>{

//  return data
 await  db.insert(postLikeUsersTable).values({postId:id,userId});
 await db.update(postLikeUsersTable).set({ isliked: true }).where( and(
      eq(postLikeUsersTable.postId, id),
      eq(postLikeUsersTable.userId, userId)
    ));
    return db.update(postTable).set({ like: sql`${postTable.like} + 1` }).where(eq(postTable.id,id));
  
}

export const likedlt=async(id,userId)=>{
    // console.log(userId);
    
      await db.delete(postLikeUsersTable).where( and(
      eq(postLikeUsersTable.postId, id),
      eq(postLikeUsersTable.userId, userId)
    ));

    return db.update(postTable).set({ like: sql`${postTable.like} - 1` }).where(eq(postTable.id,id));
    
    //  await db.update(postLikeUsersTable).set({ isliked: false }).where( and(
    //   eq(postLikeUsersTable.postId, id),
    //   eq(postLikeUsersTable.userId, userId)
    // ));
    // return db.update(postTable).set({ like: sql`${postTable.like} - 1` }).where(eq(postTable.id,id));
}

export const postlikedata=async()=>{
    return await db.select().from(postLikeUsersTable);
}

//* get all user 

export const getAllUsersdata=async(id)=>{
    
    return await db.select({id:usersTable.id,name:usersTable.name,email:usersTable.email}).from(usersTable).where(not(eq(usersTable.id,id)));
}