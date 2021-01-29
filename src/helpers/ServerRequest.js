import { getToken } from "../utils/LocalStorage.utils";

export const API_URL = window.location.hostname === 'soundmist.netlify.app' ? "https://sound-mist.herokuapp.com" : `http://localhost:3300`;


export const ServerRequest = (routes, method, body) => {
    const token = getToken();
    const url = `${API_URL}/${routes}`;

    const JSONBody = JSON.stringify(body);
    const options = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        body: JSONBody
    }

    let response;

    const reqUrl = `${API_URL}/${routes}`;

    return fetch(reqUrl, options)
        .catch(error => (error))
        .then(res => {
            if (res.status >= 400) {
                response = res;
            }
            return res.json();
        })
        .then(resJson => {
            return new Promise((resolve, reject) => {
                if (response) {
                    reject(resJson);
                } else {
                    resolve(resJson)
                }
            });
        });


}