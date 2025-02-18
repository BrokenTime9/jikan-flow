"use server";
import { db } from "@/lib/db";
import { tasks } from "@/db/schema";
import { NewTask, Task } from "@/types/taskType";
import { eq, and, asc } from "drizzle-orm";
import { title } from "process";

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
      .where(and(eq(tasks.projectId, projectId), eq(tasks.userId, userId)))
      .orderBy(asc(tasks.id));

    return { success: true, message: "Fetched all tasks", task: allTasks };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Fetch Failed";
    return { success: false, message: e, task: null };
  }
};

export const editTask = async ({
  id,
  userId,
  title,
  desc,
  dueDate,
  progress,
}: {
  id: number;
  userId: number;
  title: string;
  desc: string;
  dueDate: Date;
  progress?: number;
}): Promise<TaskResponse> => {
  try {
    const existingTask = await db.query.tasks.findFirst({
      where: (t, { eq }) => eq(t.id, id),
    });

    if (!existingTask || existingTask.userId !== userId) {
      throw new Error("Unauthorized or task not found");
    }

    const updatedProgress = progress ?? existingTask.progress ?? 0;
    const done = updatedProgress >= 100;

    await db
      .update(tasks)
      .set({
        title,
        desc,
        progress: updatedProgress,
        dueDate: new Date(dueDate),
        done,
      })
      .where(eq(tasks.id, id));

    return {
      success: true,
      message: "Task updated successfully",
      task: {
        ...existingTask,
        title,
        desc,
        progress: updatedProgress,
        dueDate,
        done,
      },
    };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Task update failed";
    return { success: false, message: e, task: null };
  }
};

export const deleteTask = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}): Promise<TaskResponse> => {
  const task = await db.query.tasks.findFirst({
    where: (p, { eq }) => eq(p.id, id),
  });

  try {
    if (!task || task.userId !== userId) {
      throw new Error("Unauthorized or project not found");
    }

    await db.delete(tasks).where(eq(tasks.id, id));
    return { success: true, message: "Project deleted", task };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Registration failed";
    return { success: false, message: e, task: null };
  }
};
