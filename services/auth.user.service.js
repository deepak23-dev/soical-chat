import { and, eq } from "drizzle-orm";
import {db} from "../config/db.js";
import { sessionTable, usersTable } from "../drizzle/schema.js"; 
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";


export const getUserByEmail=async(email)=>{
    const [user]=await db.select().from(usersTable).where(eq(usersTable.email,email));
    return user
}

export const createUser=async({name,email,password})=>{
    const hashPassword=await argon2.hash(password)
    return await db
    .insert(usersTable)
    .values({name,email, password: hashPassword})
    .$returningId();
    ;
    
}

export const getUserLogin=async(email)=>{
    const [data]=await db.select().from(usersTable).where(eq(usersTable.email,email));
    
    return data;
}

export const genrateAccessToken=({id,name,email,sessionId})=>{
    // console.log(id,name,email,sessionId);
    
    return jwt.sign(
        {id,name,email,sessionId},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"2min"
        }
    )
}

export const verifyJWTToken=(token)=>{
      return jwt.verify(token,process.env.JWT_SECRET_KEY);
  
}

export const createSession=async(userId,obj)=>{
return  await db
    .insert(sessionTable)
    .values({userId,userAgent:obj.userAgent,ip:obj.ip})
    .$returningId();
}


export const accessTokens=async(accessToken)=> {
  try {
    // console.log(accessToken);
    
    // Get session matching the access token
    const [session] = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, accessToken.id));
// console.log(session);

    // If session exists, get associated user
    if (session) {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, session.userId));

      return {user,accessToken} || null;
    }

    return null;
  } catch (error) {
    console.error('Error in accessTokens:', error.message);
    return null;
  }
};


export const deletePreviousSeesion=async(userId)=>{
    return await db.delete(sessionTable).where(eq(sessionTable.userId,userId));
}