import {API_HOST} from "../utils/constants";
import {getTokenApi} from "../api/auth";

export function getUserApi(id) {
    const url = `${API_HOST}/user?id=${id}`;
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

export function uploadBannerApi(file) {
    const url = `${API_HOST}/user/banner`;
    const formData = new FormData();
    formData.append("banner", file);
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        },
        body: formData
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}

export function uploadAvatarApi(file) {
    const url = `${API_HOST}/user/avatar`;
    const formData = new FormData();
    formData.append("avatar", file);
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        },
        body: formData
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}

export function updateInfoApi(data) {
    const url = `${API_HOST}/user`;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
        .then(response => {
            return response;
        }).catch(err => {
            return err;
        });
}

export function getAvatarApi(avatar) {
    const url = `${API_HOST}/uploads/avatars/${avatar}`;
    return url;
}

export function getBannerApi(banner) {
    const url = `${API_HOST}/uploads/banners/${banner}`;
    return url;
}

export function countTootsApi() {
    const url = `${API_HOST}/isStandard`;
    const params = {
        method: "GET",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        },
    }
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
