import { relations } from 'drizzle-orm';
import { boolean, text } from 'drizzle-orm/gel-core';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

// user table
export const usersTable = mysqlTable('users_table', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// post table
export const postTable = mysqlTable('post_table', {
  id: int().autoincrement().primaryKey(),
  post: varchar({ length: 255 }).notNull(),
  caption: varchar({ length: 255 }),
  like: int().default(0),
  createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  userId: int('user_id').notNull().references(() => usersTable.id,{onDelete:"cascade"}),
});

//post like table
export const postLikeUsersTable=mysqlTable('post_like-user',{
  id:int().autoincrement().primaryKey(),
  isliked:boolean().default(false),
postId:int("post_id").notNull().references(()=>postTable.id,{onDelete:"cascade"}),
userId:int("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"})

});


//message table
export const converstionTable=mysqlTable('converstions',{
  id:int().autoincrement().primaryKey(),
  message: varchar({ length: 1000 }).notNull(),
senderId:int("sender_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
reciverId:int("reciver_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
 createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// session table
export const sessionTable=mysqlTable("session",{
  id:int().autoincrement().primaryKey(),
  userId:int("user_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
  valid:boolean().default(true).notNull(),
  userAgent:text("user_agent"),
  ip:varchar({length:255}),
   createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),

});

// user has many posts
export const userRelation = relations(usersTable, ({ many }) => ({
  post: many(postTable),
  session:many(sessionTable),
  likedPosts: many(postLikeUsersTable),
 sentMessages: many(converstionTable, {
    relationName: 'sender'
  }),
  receivedMessages: many(converstionTable, {
    relationName: 'receiver'
  }),
}));

// a post belongs to a user
export const postRelation = relations(postTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [postTable.userId],
    references: [usersTable.id],
  }),
  likedBy: many(postLikeUsersTable),
}));



// relationship of user to the session table 
export const sessionRelation = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId], // foreign key
    references: [usersTable.id],
  }),
}));


export const postLikeUsersRelation = relations(postLikeUsersTable, ({ one }) => ({
  post: one(postTable, {
    fields: [postLikeUsersTable.postId],
    references: [postTable.id],
  }),
  user: one(usersTable, {
    fields: [postLikeUsersTable.userId],
    references: [usersTable.id],
  }),
}));

export const conversationRelation = relations(converstionTable, ({ one }) => ({
  sender: one(usersTable, {
    fields: [converstionTable.senderId],
    references: [usersTable.id],
    relationName: 'sender'
  }),
  receiver: one(usersTable, {
    fields: [converstionTable.reciverId],
    references: [usersTable.id],
    relationName: 'receiver'
  }),
}));