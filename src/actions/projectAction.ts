"use server";
import { db } from "@/lib/db";
import { projects } from "@/db/schema";
import { Project } from "@/types/projectType";
import { eq, asc } from "drizzle-orm";

interface ProjectResponse {
  success: boolean;
  message: string;
  project: Project | Project[] | null;
}

export const createProject = async ({
  name,
  userId,
}: {
  name: string;
  userId: number;
}): Promise<ProjectResponse> => {
  try {
    if (!name) {
      throw new Error("Add a name to the project");
    }
    const existingProject = await db
      .select()
      .from(projects)
      .where(eq(projects.project, name));

    if (existingProject.length > 0) {
      throw new Error("This Project already exists");
    }

    const [insertedProject] = await db
      .insert(projects)
      .values({ project: name, userId })
      .returning();

    return {
      success: true,
      message: "Project added succesfully",
      project: insertedProject,
    };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Registration failed";

    return { success: false, message: e, project: null };
  }
};

export const getProjects = async (id: number): Promise<ProjectResponse> => {
  try {
    if (!id) {
      throw new Error("No id given");
    }

    const allProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, id))
      .orderBy(asc(projects.id));
    return {
      success: true,
      message: "succesfully retrieved projects",
      project: allProjects,
    };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Registration failed";
    return { success: false, message: e, project: null };
  }
};

export const editProject = async ({
  id,
  name,
  userId,
}: {
  id: number;
  name: string;
  userId: number;
}): Promise<ProjectResponse> => {
  try {
    const project = await db.query.projects.findFirst({
      where: (p, { eq }) => eq(p.id, id),
    });

    if (!project || project.userId !== userId) {
      throw new Error("Unauthorized or project not found");
    }
    const existingProject = await db
      .select()
      .from(projects)
      .where(eq(projects.project, name));

    if (existingProject.length > 0) {
      throw new Error("This Project already exists");
    }

    await db.update(projects).set({ project: name }).where(eq(projects.id, id));

    return {
      success: true,
      message: "Project updated successfully",
      project: project,
    };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Project update failed";
    return { success: false, message: e, project: null };
  }
};

export const deleteProject = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}): Promise<ProjectResponse> => {
  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, id),
  });

  try {
    if (!project || project.userId !== userId) {
      throw new Error("Unauthorized or project not found");
    }

    await db.delete(projects).where(eq(projects.id, id));
    return { success: true, message: "Project deleted", project: project };
  } catch (error) {
    const e = error instanceof Error ? error.message : "Registration failed";
    return { success: false, message: e, project: null };
  }
};
