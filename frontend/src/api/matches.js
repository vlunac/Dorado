import client from "./client";

export const matchesApi = {
  /** Returns ranked startup matches for the current investor */
  getMatches: () => client.get("/matches/"),
};
