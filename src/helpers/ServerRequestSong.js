import { getToken } from "../utils/LocalStorage.utils";

export const ServerRequestSong = (routes, method, body) => {
    const token = getToken();
    const url = `http://localhost:3300/${routes}`;
    const JSONBody = JSON.stringify(body);
    const options = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + JSON.parse(token)
        },
        body: JSONBody
    }

    let response;

    return fetch(url, options)
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