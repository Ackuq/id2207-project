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

  getEventProjects: () => {
    return api.makeRequest("/v1/eventProject");
  },

  getEventProject: (id) => {
    return api.makeRequest(`/v1/eventProject/${id}`);
  },

  updateEventProject: (id, values) => {
    return api.makeRequest(`/v1/eventProject/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
  },

  createTask: (id, values) => {
    return api.makeRequest(`/v1/eventProject/${id}/task`, {
      method: "POST",
      body: JSON.stringify(values),
    });
  },

  getEventTasks: (id) => {
    return api.makeRequest(`/v1/eventProject/${id}/task`);
  },

  getUser: (id) => {
    return api.makeRequest(`/v1/user/${id}`);
  },

  getSubTeam: () => {
    return api.makeRequest(`/v1/user/subTeam`);
  },

  getTasks: () => {
    return api.makeRequest(`/v1/task`);
  },

  getTask: (id) => {
    return api.makeRequest(`/v1/task/${id}`);
  },
};

export default api;
