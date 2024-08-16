ALTER TABLE `user` ADD `login` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_login_unique` ON `user` (`login`);