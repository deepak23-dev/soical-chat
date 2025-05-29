CREATE TABLE `post_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`post` varchar(255) NOT NULL,
	`caption` varchar(255),
	`like` int,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`user_id` int NOT NULL,
	CONSTRAINT `post_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `post_table` ADD CONSTRAINT `post_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE no action ON UPDATE no action;