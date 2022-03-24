import {API_HOST} from "../utils/constants";
import {getTokenApi} from "../api/auth";

export function checkBlockApi(idUser){
    const url = `${API_HOST}/block?id=${idUser}`;
    const params = {
        method: "GET",
        headers:{
            Authorization: `Bearer${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}
export function blockUserApi(idUser){
    const url = `${API_HOST}/block?id=${idUser}`;
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}
export function unBlockUserApi(idUser){
    const url = `${API_HOST}/block?id=${idUser}`;
    const params = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer${getTokenApi()}`
        }
    }
    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}
export function getBlockUsersApi(page){
    const url = `${API_HOST}/users/blocks?page=${page}`
    const params = {
        headers:{
        Authorization: `Bearer${getTokenApi()}`,
        },
    };
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}