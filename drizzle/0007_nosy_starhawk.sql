CREATE TABLE `converstions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` varchar(1000) NOT NULL,
	`sender_id` int NOT NULL,
	`reciver_id` int NOT NULL,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `converstions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `converstions` ADD CONSTRAINT `converstions_sender_id_users_table_id_fk` FOREIGN KEY (`sender_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `converstions` ADD CONSTRAINT `converstions_reciver_id_users_table_id_fk` FOREIGN KEY (`reciver_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;