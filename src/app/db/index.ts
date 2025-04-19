import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("SUPABASE_DB_URL environment variable is not set");
}

// Configure connection options for the pool
const connectionOptions = {
  prepare: false,
  connection: {
    timeZone: "UTC",
  },
  idle_timeout: 20, // Time to wait before closing idle connections
  max_lifetime: 60 * 30, // Maximum lifetime for connections (in seconds)
  connect_timeout: 10, // Timeout to establish a new connection
  max: 10, // Max number of connections in the pool
  min: 2, // Min number of connections in the pool
};

const client = postgres(process.env.SUPABASE_DB_URL, connectionOptions);

export const db = drizzle(client, { schema });

// For use in edge functions/middleware
export const createClient = (connectionString: string) => {
  if (!connectionString) {
    throw new Error("Database connection string is required");
  }
  const client = postgres(connectionString, connectionOptions);
  return drizzle(client, { schema });
};
