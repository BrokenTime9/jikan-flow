import {
  serial,
  text,
  boolean,
  pgTable,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
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

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  desc: text("description").notNull(),
  type: text("category").notNull(),
  done: boolean("completed").default(false).notNull(),
  priority: integer("priority").default(2),
  progress: integer("progress").default(0),
  dueDate: timestamp("due_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  projectId: integer("projectId")
    .references(() => projects.id)
    .notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
});
