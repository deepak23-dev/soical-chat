import { and, eq } from "drizzle-orm";
import {db} from "../config/db.js";
import { usersTable } from "../drizzle/schema.js"; 
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

export const genrateToken=({id,name,email})=>{
    return jwt.sign(
        {id,name,email},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"1h"
        }
    )
}

export const verifyJWTToken=(token)=>{
      return jwt.verify(token,process.env.JWT_SECRET_KEY);
  
}