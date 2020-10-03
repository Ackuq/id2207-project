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
        const json = await res.json();
        throw json;
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

  createEventRequest: (values) => {
    return api.makeRequest("/v1/eventRequest", {
      method: "POST",
      body: JSON.stringify(values),
    });
  },

  getEventRequests: () => {
    return api.makeRequest("/v1/eventRequest");
  },

  getEventRequest: (id) => {
    return api.makeRequest(`/v1/eventRequest/${id}`);
  },

  updateEventRequest: (id, values) => {
    return api.makeRequest(`/v1/eventRequest/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
  },

  getUser: (id) => {
    return api.makeRequest(`/v1/user/${id}`);
  },
};

export default api;
