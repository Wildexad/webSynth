CREATE TABLE IF NOT EXISTS "users" (
	"uid" SERIAL PRIMARY KEY,
	"login" VARCHAR(20) NULL DEFAULT NULL,
	"password" VARCHAR(20) NULL DEFAULT NULL,
	"email" VARCHAR(50) NULL DEFAULT NULL,
	"name" VARCHAR(50) NULL DEFAULT NULL,
	"uuid" VARCHAR(50) NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "instruments" (
	"instr_id" SERIAL PRIMARY KEY,
	"uid" INTEGER NULL DEFAULT NULL,
	"instr_name" VARCHAR(250) NULL DEFAULT NULL,
	"instr_info" JSON NULL DEFAULT NULL,
	CONSTRAINT "FK_instruments_users" FOREIGN KEY ("uid") REFERENCES "users" ("uid") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "songs" (
	"song_id" SERIAL  PRIMARY KEY,
	"uid" INTEGER NULL DEFAULT NULL,
	"song_name" VARCHAR(250) NULL DEFAULT NULL,
	"song_info" JSON NULL DEFAULT NULL,
	CONSTRAINT "FK_songs_users" FOREIGN KEY ("uid") REFERENCES "users" ("uid") ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO "users" ("uid", "login", "password", "email", "name", "uuid") VALUES
	(1, 'user', '123456', 'user@mail.ru', 'Имя пользователя', '');
