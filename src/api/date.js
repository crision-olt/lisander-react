import {API_HOST} from "../utils/constants";
import {getTokenApi} from "../api/auth";

export function updateDateApi() {
    const url = `${API_HOST}/reloadDate`;
    const params = {
        method: "GET",
        headers: {
            Authorization: `Bearer${getTokenApi()}`
        },
    }
    return fetch(url, params)
        .then(response => {
            return response;
        }).catch(err => {
            return err;
        });
}

export function isStandardApi() {
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

export function isAdminApi() {
    const url = `${API_HOST}/isAdmin`;
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

export function isSuperAdminApi() {
    const url = `${API_HOST}/isSuperAdmin`;
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

export function getDateApi() {
    const url = `${API_HOST}/date`;
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

export function getReloads() {
    const url = `${API_HOST}/reloads`;
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