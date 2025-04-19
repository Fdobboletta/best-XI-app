-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "goalkeeper_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"week" integer,
	"team_name" varchar(255),
	"home_away" varchar(10),
	"player_id" varchar(50),
	"player_name" varchar(255),
	"player_country_code" varchar(10),
	"goals_against" double precision,
	"shots_on_target_against" double precision,
	"saves" double precision,
	"save_percentage" double precision,
	"post_shot_expected_goals" double precision,
	"launched_passes_completed" double precision,
	"launched_passes_attempted" double precision,
	"launched_passes_completion_percentage" double precision,
	"passes_attempted" double precision,
	"throws_attempted" double precision,
	"passes_launched_percentage" double precision,
	"average_pass_length" double precision,
	"goal_kicks_attempted" double precision,
	"goal_kicks_launched_percentage" double precision,
	"average_goal_kick_length" double precision,
	"crosses_faced" double precision,
	"crosses_stopped" double precision,
	"crosses_stopped_percentage" double precision,
	"defensive_actions_outside_box" double precision,
	"average_distance_defensive_actions" double precision,
	"matchweek" integer,
	"score" double precision,
	"player_id_reference" integer
);
--> statement-breakpoint
CREATE TABLE "player_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"transfermarkt_player_id" integer,
	"name" varchar(255) NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"transfermarkt_player_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"position" varchar(100),
	"date_of_birth" date,
	"age" integer,
	"nationality" varchar(100),
	"second_nationality" varchar(100),
	"height" double precision,
	"foot" varchar(10),
	"joined_on" date,
	"signed_from" varchar(255),
	"contract_end" date,
	"market_value" double precision,
	"status" text,
	"club_name" varchar(255),
	"transfermarkt_club_id" integer,
	CONSTRAINT "players_transfermarkt_player_id_key" UNIQUE("transfermarkt_player_id")
);
--> statement-breakpoint
CREATE TABLE "player_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"week" integer,
	"team_name" varchar(255),
	"home_away" varchar(10),
	"player_id" varchar(50),
	"player_name" varchar(255),
	"player_country_code" varchar(10),
	"player_number" integer,
	"age" integer,
	"positions" text[],
	"minutes_played" integer,
	"goals" double precision,
	"assists" double precision,
	"shots" double precision,
	"shots_on_target" double precision,
	"expected_goals" double precision,
	"expected_assists" double precision,
	"key_passes" double precision,
	"shot_creating_actions" double precision,
	"goal_creating_actions" double precision,
	"touches_in_opp_box" double precision,
	"passes_completed" double precision,
	"passes_attempted" double precision,
	"pass_completion_percentage" double precision,
	"progressive_passes" double precision,
	"passes_into_final_third" double precision,
	"progressive_passes_total_distance" double precision,
	"progressive_carries" double precision,
	"take_ons_attempted" double precision,
	"take_ons_successful" double precision,
	"touches_in_final_third" double precision,
	"tackles" double precision,
	"interceptions" double precision,
	"blocks" double precision,
	"clearances" double precision,
	"tackles_plus_interceptions" double precision,
	"aerials_won" double precision,
	"ball_recoveries" double precision,
	"crosses" double precision,
	"yellow_cards" integer,
	"red_cards" integer,
	"touches" double precision,
	"tackles_dribbled_past" double precision,
	"tackles_dribbled_past_attempted" double precision,
	"tackle_dribbled_past_percentage" double precision,
	"main_position" varchar(10),
	"score" double precision,
	"player_id_reference" integer
);
--> statement-breakpoint
ALTER TABLE "goalkeeper_stats" ADD CONSTRAINT "goalkeeper_stats_player_id_reference_fkey" FOREIGN KEY ("player_id_reference") REFERENCES "public"."players"("transfermarkt_player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_images" ADD CONSTRAINT "player_images_transfermarkt_player_id_fkey" FOREIGN KEY ("transfermarkt_player_id") REFERENCES "public"."players"("transfermarkt_player_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_stats" ADD CONSTRAINT "player_stats_player_id_reference_fkey" FOREIGN KEY ("player_id_reference") REFERENCES "public"."players"("transfermarkt_player_id") ON DELETE no action ON UPDATE no action;
*/