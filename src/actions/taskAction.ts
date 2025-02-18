"use server";
import { db } from "@/lib/db";
import { tasks } from "@/db/schema";
import { NewTask, Task } from "@/types/taskType";
import { eq, and } from "drizzle-orm";

interface TaskResponse {
  success: boolean;
  message: string;
  task: Task | Task[] | null;
}

export const createTask = async ({
  title,
  desc,
  type,
  dueDate,
  projectId,
  userId,
}: NewTask): Promise<TaskResponse> => {
  try {
    const existingTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.title, title));

    if (existingTasks.length > 0) {
      throw new Error("Can't have two tasks with the same title");
    }

    const [insertedTask] = await db
      .insert(tasks)
      .values({
        title,
        desc,
        type,
        done: false,
        dueDate: new Date(dueDate),
        createdAt: new Date(),
        projectId,
        userId,
      })
      .returning();

    return { success: true, message: "New Task Created", task: insertedTask };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Creation failed";
    return { success: false, message: e, task: null };
  }
};

export const getTasks = async (
  projectId: number,
  userId: number,
): Promise<TaskResponse> => {
  try {
    const allTasks = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.projectId, projectId), eq(tasks.userId, userId)));

    return { success: true, message: "Fetched all tasks", task: allTasks };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Fetch Failed";
    return { success: false, message: e, task: null };
  }
};
