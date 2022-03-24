import { API_HOST } from "../utils/constants";
import { getTokenApi } from "../api/auth";

export function checkFollowApi(idUser) {
  const url = `${API_HOST}/relation?id=${idUser}`;
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function followUserApi(idUser) {
  const url = `${API_HOST}/relation?id=${idUser}`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function unFollowUserApi(idUser) {
  const url = `${API_HOST}/relation?id=${idUser}`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function getUsersApi() {
  const url = `${API_HOST}/users`;
  const params = {
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function countRelations(type) {
  const url = `${API_HOST}/count/relations?type=${type}`;
  const params = {
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export function getRelationUsersApi(data) {
  const url = `${API_HOST}/users/relations?${data}`;
  const params = {
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
