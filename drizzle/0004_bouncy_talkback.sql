CREATE TABLE `post_like-user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`post_id` int NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `post_like-user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN `usr_id` TO `user_id`;--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `session_usr_id_users_table_id_fk`;
--> statement-breakpoint
ALTER TABLE `post_like-user` ADD CONSTRAINT `post_like-user_post_id_post_table_id_fk` FOREIGN KEY (`post_id`) REFERENCES `post_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_like-user` ADD CONSTRAINT `post_like-user_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;