import {API_HOST} from "../utils/constants";
import { getTokenApi } from "../api/auth";
export function addReportApi(description, reportedUser){
    const url = `${API_HOST}/reports`
    const data = {
        reportedUser,
        description
    }
    const params ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer${getTokenApi()}`
        },
        body: JSON.stringify(data),
    };
    return fetch(url, params).then(response => {
        if(response.status >=200 && response.status<300){
        return {code:response.status, message:"Toot enviado."}
        }
        return {code:500, message:"Error del servidor."}
    }).catch(err=> {return err;});
}

export function getReportsApi(page){
    const url = `${API_HOST}/reports?page=${page}`;
    const params = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer${getTokenApi()}`
        }
    }
    return fetch(url, params).then(response =>{
        return response.json();
    }).catch(err =>{
        return err;
    });
}
export function deleteReportApi(idReport, banned){
    const url = `${API_HOST}/reports?id=${idReport}&banned=${banned}`;
    const params = {
        method:"DELETE",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer${getTokenApi()}`
        }
    }
    return fetch(url, params).then(response =>{
        return response.json();
    }).catch(err =>{
        return err;
    });
}
export function getReportApi(id){
    const url = `${API_HOST}/report?id=${id}`;
    const params = {
        method:"GET",
        headers:{
            Authorization: `Bearer${getTokenApi()}`
        }
    };
    return fetch(url, params).then(response =>{
        // eslint-disable-next-line no-throw-literal
        if(response.status >= 400) throw null;
        return response.json();
    }).then(result =>{
        return result;
    }).catch(err =>{
        return err;
    })
}