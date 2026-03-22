import client from "./client";

export const authApi = {
  /**
   * Register a new user.
   * @param {{ email, password, full_name, role }} data
   */
  register: (data) => client.post("/auth/register", data),

  /**
   * Login — returns { access_token, token_type }.
   * FastAPI's OAuth2 form expects application/x-www-form-urlencoded.
   */
  login: (email, password) => {
    const form = new URLSearchParams();
    form.append("username", email);  // FastAPI OAuth2 uses "username" field
    form.append("password", password);
    return client.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
};
