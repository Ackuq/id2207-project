const apiUrl = process.env.API_URL || "http://localhost:2000";

const api = {
  accessToken: null,

  makeRequest: (endpoint, options, auth = true) => {
    return fetch(`${apiUrl}/api${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth ? api.accessToken : "",
      },
    }).then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw await res.json();
      }
    });
  },

  login: (email, password) => {
    return api.makeRequest(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      false
    );
  },

  getMe: () => {
    return api.makeRequest("/v1/me");
  },
};

export default api;
