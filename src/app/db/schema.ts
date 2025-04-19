import {
  pgTable,
  foreignKey,
  serial,
  integer,
  varchar,
  doublePrecision,
  text,
  unique,
  date,
} from "drizzle-orm/pg-core";

export const goalkeeperStats = pgTable(
  "goalkeeper_stats",
  {
    id: serial().primaryKey().notNull(),
    week: integer(),
    teamName: varchar("team_name", { length: 255 }),
    homeAway: varchar("home_away", { length: 10 }),
    playerId: varchar("player_id", { length: 50 }),
    playerName: varchar("player_name", { length: 255 }),
    playerCountryCode: varchar("player_country_code", { length: 10 }),
    goalsAgainst: doublePrecision("goals_against"),
    shotsOnTargetAgainst: doublePrecision("shots_on_target_against"),
    saves: doublePrecision(),
    savePercentage: doublePrecision("save_percentage"),
    postShotExpectedGoals: doublePrecision("post_shot_expected_goals"),
    launchedPassesCompleted: doublePrecision("launched_passes_completed"),
    launchedPassesAttempted: doublePrecision("launched_passes_attempted"),
    launchedPassesCompletionPercentage: doublePrecision(
      "launched_passes_completion_percentage"
    ),
    passesAttempted: doublePrecision("passes_attempted"),
    throwsAttempted: doublePrecision("throws_attempted"),
    passesLaunchedPercentage: doublePrecision("passes_launched_percentage"),
    averagePassLength: doublePrecision("average_pass_length"),
    goalKicksAttempted: doublePrecision("goal_kicks_attempted"),
    goalKicksLaunchedPercentage: doublePrecision(
      "goal_kicks_launched_percentage"
    ),
    averageGoalKickLength: doublePrecision("average_goal_kick_length"),
    crossesFaced: doublePrecision("crosses_faced"),
    crossesStopped: doublePrecision("crosses_stopped"),
    crossesStoppedPercentage: doublePrecision("crosses_stopped_percentage"),
    defensiveActionsOutsideBox: doublePrecision(
      "defensive_actions_outside_box"
    ),
    averageDistanceDefensiveActions: doublePrecision(
      "average_distance_defensive_actions"
    ),
    matchweek: integer(),
    score: doublePrecision(),
    playerIdReference: integer("player_id_reference"),
  },
  (table) => [
    foreignKey({
      columns: [table.playerIdReference],
      foreignColumns: [players.transfermarktPlayerId],
      name: "goalkeeper_stats_player_id_reference_fkey",
    }),
  ]
);

export const playerImages = pgTable(
  "player_images",
  {
    id: serial().primaryKey().notNull(),
    transfermarktPlayerId: integer("transfermarkt_player_id"),
    name: varchar({ length: 255 }).notNull(),
    imageUrl: text("image_url").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.transfermarktPlayerId],
      foreignColumns: [players.transfermarktPlayerId],
      name: "player_images_transfermarkt_player_id_fkey",
    }),
  ]
);

export const players = pgTable(
  "players",
  {
    id: serial().primaryKey().notNull(),
    transfermarktPlayerId: integer("transfermarkt_player_id").notNull(),
    name: varchar({ length: 255 }).notNull(),
    position: varchar({ length: 100 }),
    dateOfBirth: date("date_of_birth"),
    age: integer(),
    nationality: varchar({ length: 100 }),
    secondNationality: varchar("second_nationality", { length: 100 }),
    height: doublePrecision(),
    foot: varchar({ length: 10 }),
    joinedOn: date("joined_on"),
    signedFrom: varchar("signed_from", { length: 255 }),
    contractEnd: date("contract_end"),
    marketValue: doublePrecision("market_value"),
    status: text(),
    clubName: varchar("club_name", { length: 255 }),
    transfermarktClubId: integer("transfermarkt_club_id"),
  },
  (table) => [
    unique("players_transfermarkt_player_id_key").on(
      table.transfermarktPlayerId
    ),
  ]
);

export const playerStats = pgTable(
  "player_stats",
  {
    id: serial().primaryKey().notNull(),
    week: integer(),
    teamName: varchar("team_name", { length: 255 }),
    homeAway: varchar("home_away", { length: 10 }),
    playerId: varchar("player_id", { length: 50 }),
    playerName: varchar("player_name", { length: 255 }),
    playerCountryCode: varchar("player_country_code", { length: 10 }),
    playerNumber: integer("player_number"),
    age: integer(),
    positions: text().array(),
    minutesPlayed: integer("minutes_played"),
    goals: doublePrecision(),
    assists: doublePrecision(),
    shots: doublePrecision(),
    shotsOnTarget: doublePrecision("shots_on_target"),
    expectedGoals: doublePrecision("expected_goals"),
    expectedAssists: doublePrecision("expected_assists"),
    keyPasses: doublePrecision("key_passes"),
    shotCreatingActions: doublePrecision("shot_creating_actions"),
    goalCreatingActions: doublePrecision("goal_creating_actions"),
    touchesInOppBox: doublePrecision("touches_in_opp_box"),
    passesCompleted: doublePrecision("passes_completed"),
    passesAttempted: doublePrecision("passes_attempted"),
    passCompletionPercentage: doublePrecision("pass_completion_percentage"),
    progressivePasses: doublePrecision("progressive_passes"),
    passesIntoFinalThird: doublePrecision("passes_into_final_third"),
    progressivePassesTotalDistance: doublePrecision(
      "progressive_passes_total_distance"
    ),
    progressiveCarries: doublePrecision("progressive_carries"),
    takeOnsAttempted: doublePrecision("take_ons_attempted"),
    takeOnsSuccessful: doublePrecision("take_ons_successful"),
    touchesInFinalThird: doublePrecision("touches_in_final_third"),
    tackles: doublePrecision(),
    interceptions: doublePrecision(),
    blocks: doublePrecision(),
    clearances: doublePrecision(),
    tacklesPlusInterceptions: doublePrecision("tackles_plus_interceptions"),
    aerialsWon: doublePrecision("aerials_won"),
    ballRecoveries: doublePrecision("ball_recoveries"),
    crosses: doublePrecision(),
    yellowCards: integer("yellow_cards"),
    redCards: integer("red_cards"),
    touches: doublePrecision(),
    tacklesDribbledPast: doublePrecision("tackles_dribbled_past"),
    tacklesDribbledPastAttempted: doublePrecision(
      "tackles_dribbled_past_attempted"
    ),
    tackleDribbledPastPercentage: doublePrecision(
      "tackle_dribbled_past_percentage"
    ),
    mainPosition: varchar("main_position", { length: 10 }),
    score: doublePrecision(),
    playerIdReference: integer("player_id_reference"),
  },
  (table) => [
    foreignKey({
      columns: [table.playerIdReference],
      foreignColumns: [players.transfermarktPlayerId],
      name: "player_stats_player_id_reference_fkey",
    }),
  ]
);
