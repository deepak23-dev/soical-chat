import { and, eq,or } from "drizzle-orm";
import {db} from "../config/db.js";
import { converstionTable } from "../drizzle/schema.js";


export const createChat=async({senderId,reciverId,message})=>{
    return await db.insert(converstionTable)
    .values({senderId,reciverId,message})
    .$returningId();
};


export const getAllmessages=async({userId,room})=>{
    
    return await db.select().from(converstionTable).where(
     or(
         and(
            eq(converstionTable.senderId, userId),
            eq(converstionTable.reciverId, room)
          ),
         and(
            eq(converstionTable.senderId, room),
            eq(converstionTable.reciverId, userId)
        )
     )
  );
}
