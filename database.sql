CREATE DATABASE gig_center;


CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	username varchar(20) NOT NULL UNIQUE,
	first_name varchar(25) NOT NULL,
	last_name varchar(25) NOT NULL,
	role varchar(20) NOT NULL
);

CREATE TABLE gig (
	id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	start_time TIME,
	end_time TIME,
	load_time TIME,
	details varchar(400),
	gig_song_id INT,
	creator_user_id INT
);

CREATE TABLE song (
	id SERIAL PRIMARY KEY,
	title varchar(30) NOT NULL,
	artist varchar(30),
	length TIMESTAMP,
	bpm INT,
	key varchar(2),
	recording_url varchar(40),
	pdf_url varchar(40)
);

CREATE TABLE gig_song (
	id SERIAL PRIMARY KEY,
	gig_id INT NOT NULL,
	song_id INT NOT NULL,
	song_order INT NOT NULL
);

CREATE TABLE user_gig (
	id INT NOT NULL,
	user_id INT NOT NULL,
	gig_id INT NOT NULL
);

ALTER TABLE `gig_song` ADD CONSTRAINT `gig_song_fk0` FOREIGN KEY (`gig_id`) REFERENCES `Gig`(`id`);

ALTER TABLE `gig_song` ADD CONSTRAINT `gig_song_fk1` FOREIGN KEY (`song_id`) REFERENCES `Songs`(`id`);

ALTER TABLE `user_gig` ADD CONSTRAINT `user_gig_fk0` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`);

ALTER TABLE `user_gig` ADD CONSTRAINT `user_gig_fk1` FOREIGN KEY (`gig_id`) REFERENCES `Gig`(`id`);