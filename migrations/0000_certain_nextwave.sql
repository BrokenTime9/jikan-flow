CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"project" text NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"priority" integer DEFAULT 2,
	"progress" integer DEFAULT 0,
	"due_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"projectId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;