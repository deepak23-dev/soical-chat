import { relations } from 'drizzle-orm';
import { boolean, text } from 'drizzle-orm/gel-core';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const postTable = mysqlTable('post_table', {
  id: int().autoincrement().primaryKey(),
  post: varchar({ length: 255 }).notNull(),
  caption: varchar({ length: 255 }),
  like: int().default(0),
  createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  userId: int('user_id').notNull().references(() => usersTable.id),
});



export const sessionTable=mysqlTable("session",{
  id:int().autoincrement().primaryKey(),
  userId:int("usr_id").notNull().references(()=>usersTable.id,{onDelete:"cascade"}),
  valid:boolean().default(true).notNull(),
  userAgent:text("user_agent"),
  ip:varchar({length:255}),
   createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),

});

// user has many posts
export const userRelation = relations(usersTable, ({ many }) => ({
  post: many(postTable),
  session:many(sessionTable)
}));

// a post belongs to a user
export const postRelation = relations(postTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postTable.userId], // foreign key
    references: [usersTable.id],
  }),
}));




// relationship of user to the session table 
export const sessionRelation = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId], // foreign key
    references: [usersTable.id],
  }),
}));