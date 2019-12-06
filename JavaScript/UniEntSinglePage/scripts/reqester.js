const appKey = 'kid_SkapXhP6B';
const appSecret = '407a3ffcc14a4a4ca6a806ea95721bc5';
const baseUrl = 'https://baas.kinvey.com';
 
function createAuthorization(type) {
    return type === 'Basic'
        ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
        : `Kinvey ${sessionStorage.getItem('authtoken')}`
}
 
function makeHeaders(type, httpMethod, data) {
 
    const headers = {
        method: httpMethod,
        headers: {
            'Authorization': createAuthorization(type),
            'Content-Type': 'application/json'
        }
    };
 
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        headers.body = JSON.stringify(data)
    }
    return headers;
}
 
function serializeData(x) {
    if (x.status === 204){
        return x;
    }
    return x.json();
}
 
function handleError(e) {
    if (!e.ok) {
        console.log(e);
        throw new Error(e.statusText);
    }
    return e;
}
 
function createPromise(kinveyModule, endpoint, headers) {
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;
 
    return fetch(url, headers)
        .then(handleError)
        .then(serializeData)
}
 
export function get(kinveyModule, endpoint, type) {
    const headers = makeHeaders(type ,'GET');
    return createPromise(kinveyModule, endpoint, headers)
}
 
export function post(kinveyModule, endpoint, data, type) {
    const headers = makeHeaders(type, 'POST', data);
    return createPromise(kinveyModule, endpoint, headers)
}
 
export function put(kinveyModule, endpoint, data, type) {
    const headers = makeHeaders(type, 'PUT', data);
    return createPromise(kinveyModule, endpoint, headers)
}
 
export function del(kinveyModule, endpoint, type) {
    const headers = makeHeaders(type, 'DELETE');
    return createPromise(kinveyModule, endpoint, headers)
}