CREATE TABLE `session` (
	`id` int AUTO_INCREMENT NOT NULL,
	`usr_id` int NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`user_agent` text,
	`ip` varchar(255),
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_usr_id_users_table_id_fk` FOREIGN KEY (`usr_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;