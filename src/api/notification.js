import {API_HOST} from "../utils/constants";
import {getTokenApi} from "./auth";

export function getNotificationsApi(page = 0) {
    const url = `${API_HOST}/notification?page=${page}`;
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

export function getCountNotificationsApi() {
    const url = `${API_HOST}/count/notification`;
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

export function checkNotification(id) {
    const url = `${API_HOST}/notification?id=${id}`;
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