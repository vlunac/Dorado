import client from "./client";

export const startupsApi = {
  /**
   * Search / filter startups.
   * @param {{ industry, stage, location, team_size_min, team_size_max, current_ask_max, founded_year }} params
   */
  list: (params = {}) => client.get("/startups/", { params }),

  /** Get a single startup by ID */
  getById: (id) => client.get(`/startups/${id}`),

  /** Create a new startup (founder only) */
  create: (data) => client.post("/startups/", data),

  /** Update an existing startup (founder only, must own it) */
  update: (id, data) => client.put(`/startups/${id}`, data),

  /**
   * Get AI-generated investor summary for a startup.
   * Calls the Anthropic API on the backend and caches the result.
   */
  getSummary: (id) => client.get(`/summaries/${id}`),
};
