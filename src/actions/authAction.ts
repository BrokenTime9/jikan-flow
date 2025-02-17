"use server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export const register = async (user: string, pass: string) => {
	try {
		if (!user || !pass) {
			throw new Error("Username and password are required");
		}
		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.username, user));

		if (existingUser.length > 0) {
			throw new Error("User already exists");
		}

		const hashedPassword = await bcrypt.hash(pass, 10);

		const insertedUser = await db
			.insert(users)
			.values({ username: user, password: hashedPassword })
			.returning({ id: users.id });

		const userId = insertedUser[0]?.id;

		const token = sign({ userId }, process.env.JWT_SECRET as string, {
			expiresIn: "7d",
		});

		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60,
			path: "/",
		});

		return { success: true, message: "User registered successfully" };
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Registration failed";
		return { success: false, message: errorMessage };
	}
};

export const login = async (user: string, pass: string) => {
	try {
		if (!user || !pass) {
			throw new Error("Username and password are required");
		}

		const currentUser = await db
			.select({ id: users.id, password: users.password })
			.from(users)
			.where(eq(users.username, user));

		if (currentUser.length === 0) {
			return { success: false, message: "Username incorrect" };
		}

		const passValidation = await bcrypt.compare(pass, currentUser[0].password);

		if (!passValidation) {
			throw new Error("Incorrect password");
		}

		const userId = currentUser[0]?.id;

		const token = sign({ userId }, process.env.JWT_SECRET as string, {
			expiresIn: "7d",
		});

		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60,
			path: "/",
		});

		return { success: true, message: "Login successfull" };
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Registration failed";
		return { success: false, message: errorMessage };
	}
};
