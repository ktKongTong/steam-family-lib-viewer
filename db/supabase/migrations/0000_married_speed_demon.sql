CREATE TABLE IF NOT EXISTS "steamGameInfo" (
	"app_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256) DEFAULT '' NOT NULL,
	"aliases" varchar(256) DEFAULT '' NOT NULL,
	"top20_tags" varchar(256) DEFAULT '' NOT NULL,
	"last_refreshed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
