import {API_HOST} from "../utils/constants";
import {getTokenApi} from "./auth";

export function getAdminsApi() {
    const url = `${API_HOST}/admin`;
    const params = {
        method: "GET",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response => {
        // eslint-disable-next-line no-throw-literal
        if (response.status >= 400) throw null;
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function insertAdmin(user) {
    const url = `${API_HOST}/admin`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        updateDateToday: user.updateDate,
    };
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        },
        body: JSON.stringify(userTemp),
    };
    return fetch(url, params)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            return {code: 404, message: "Email no disponible"};
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
}

export function changePassword(passwords) {
    const url = `${API_HOST}/user/changePassword`;

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        },
        body: JSON.stringify(passwords),
    };
    return fetch(url, params)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            return {code: 404, message: "Hubo un error actualizando la contraseña"};
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
}

export function banAdmin(id) {
    const url = `${API_HOST}/admin?id=${id}`;
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${getTokenApi()}`
        }
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
}