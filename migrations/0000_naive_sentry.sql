CREATE TABLE "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL
);
