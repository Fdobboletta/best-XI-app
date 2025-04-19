import { relations } from "drizzle-orm/relations";
import { players, goalkeeperStats, playerImages, playerStats } from "./schema";

export const goalkeeperStatsRelations = relations(goalkeeperStats, ({one}) => ({
	player: one(players, {
		fields: [goalkeeperStats.playerIdReference],
		references: [players.transfermarktPlayerId]
	}),
}));

export const playersRelations = relations(players, ({many}) => ({
	goalkeeperStats: many(goalkeeperStats),
	playerImages: many(playerImages),
	playerStats: many(playerStats),
}));

export const playerImagesRelations = relations(playerImages, ({one}) => ({
	player: one(players, {
		fields: [playerImages.transfermarktPlayerId],
		references: [players.transfermarktPlayerId]
	}),
}));

export const playerStatsRelations = relations(playerStats, ({one}) => ({
	player: one(players, {
		fields: [playerStats.playerIdReference],
		references: [players.transfermarktPlayerId]
	}),
}));