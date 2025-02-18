import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tasks } from "@/db/schema";

export type Task = InferSelectModel<typeof tasks>;
export type NewTask = InferInsertModel<typeof tasks>;
export type NewMutationTask = Omit<InferInsertModel<typeof tasks>, "userId">;
