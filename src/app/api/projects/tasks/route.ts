import { NextResponse } from "next/server";
import { createTask, getTasks } from "@/actions/taskAction";

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
    const { title, desc, type, dueDate, projectId } = body;

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
