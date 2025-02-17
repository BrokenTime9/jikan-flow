import { serial, text, boolean, pgTable, integer } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  project: text("project").notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});
