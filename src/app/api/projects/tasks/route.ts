import { NextResponse } from "next/server";
import {
  createTask,
  getTasks,
  editTask,
  deleteTask,
} from "@/actions/taskAction";

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");
    const numericId = Number(userId);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { title, desc, type, dueDate, projectId, priority } = body;

    if (!title || !desc || !type || !dueDate || !projectId) {
      return NextResponse.json(
        { success: false, message: "Missing parameter" },
        { status: 422 },
      );
    }

    const task = await createTask({
      title,
      desc,
      type,
      dueDate,
      projectId,
      priority,
      userId: numericId,
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: "Missing projectId" },
        { status: 400 },
      );
    }

    const numericUserId = Number(userId);
    const numericProjectId = Number(projectId);

    if (isNaN(numericUserId) || isNaN(numericProjectId)) {
      return NextResponse.json(
        { success: false, message: "Invalid userId or projectId" },
        { status: 400 },
      );
    }

    const allTasks = await getTasks(numericProjectId, numericUserId);

    return NextResponse.json({
      success: true,
      message: "Fetched tasks successfully",
      tasks: allTasks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "An error occurred" });
  }
}

export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const numericUserId = Number(userId);
    if (isNaN(numericUserId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { id, title, desc, dueDate, progress, priority } = body;

    if (!id || !title || !desc || !dueDate || !priority) {
      console.log(id);
      console.log(title);
      console.log(desc);
      console.log(dueDate);
      console.log(progress);
      return NextResponse.json(
        { success: false, message: "Missing parameter" },
        { status: 422 },
      );
    }

    const numericTaskId = Number(id);
    const numericProgress = Number(progress);

    if (isNaN(numericTaskId) || isNaN(numericProgress)) {
      return NextResponse.json(
        { success: false, message: "Invalid task ID, project ID, or progress" },
        { status: 400 },
      );
    }

    const updatedTask = await editTask({
      id,
      title,
      userId: numericUserId,
      priority,
      desc,
      dueDate,
      progress: numericProgress,
    });

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 },
      );
    }

    const deletedTask = await deleteTask({ userId: Number(userId), id });

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
