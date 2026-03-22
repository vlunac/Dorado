import client from "./client";

export const investorsApi = {
  /** Get the logged-in investor's own profile */
  getMe: () => client.get("/investors/me"),

  /** Create or update the logged-in investor's profile */
  updateMe: (data) => client.put("/investors/me", data),

  /** Get any investor's public profile by ID */
  getById: (id) => client.get(`/investors/${id}`),
};
