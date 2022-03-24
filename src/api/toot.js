import { API_HOST } from "../utils/constants";
import { getTokenApi } from "../api/auth";
export function addTootApi(message) {
  const url = `${API_HOST}/toots`;
  const data = {
    message,
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Toot enviado." };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserTootsApi(idUser, page) {
  const url = `${API_HOST}/toots?id=${idUser}&page=${page}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
export function deleteTootApi(idToot) {
  const url = `${API_HOST}/toots?id=${idToot}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Toot eliminado." };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}

export function getTootsFollowersApi(page = 1) {
  const url = `${API_HOST}/users/toots?page=${page}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
export function getTootApi(id) {
  const url = `${API_HOST}/toot?id=${id}`;
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
