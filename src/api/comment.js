import { API_HOST } from "../utils/constants";
import { getTokenApi } from "../api/auth";
export function addCommentApi(message, tootId) {
  const url = `${API_HOST}/comments`;
  const data = {
    tootId,
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
        return { code: response.status, message: "Comentario enviado." };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}

export function getTootCommentsApi(idToot, page) {
  const url = `${API_HOST}/comments?id=${idToot}&page=${page}`;
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
export function deleteCommentApi(idComment) {
  const url = `${API_HOST}/comments?id=${idComment}`;
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
        return { code: response.status, message: "Comentario eliminado." };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}
