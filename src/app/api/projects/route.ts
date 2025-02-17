import { NextResponse } from "next/server";
import {
  getProjects,
  createProject,
  deleteProject,
  editProject,
} from "@/actions/projectAction";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const projects = await getProjects(Number(userId));

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
export async function POST(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Project name is required" },
        { status: 400 },
      );
    }

    const project = await createProject({
      userId: Number(userId),
      name,
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("X-User-ID");
    const numericId = Number(userId);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        {
          success: false,
          message: "Project ID and name are required",
        },
        { status: 400 },
      );
    }
    const project = await editProject({ id, name, userId: numericId });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
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

    const deletedProject = await deleteProject({ userId: Number(userId), id });

    return NextResponse.json(deletedProject);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
