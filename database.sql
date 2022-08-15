CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(80) not null,
	"complete" varchar(3) not null
	);

INSERT INTO "tasks" ("task", "complete")
VALUES ('Eat a good breakfast', 'no'), ('Drink water!', 'no');