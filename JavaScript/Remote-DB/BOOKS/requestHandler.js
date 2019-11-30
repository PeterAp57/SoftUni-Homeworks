const username = "Pesho";
const password = "pesho";
const appKey = "kid_BJ7GE8SnS";
const appSecret = "2b46411e5c4d49eba9dfcf0c693bedbf";
const baseUrl = "https://baas.kinvey.com/";

function generateHeaders(methodType,data){
    const headers = {
        method: methodType,
        headers:{
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
            "Content-Type": "application/json"
        }
    }
    if( methodType === "POST" || methodType === "PUT"){
        headers.body = JSON.stringify(data);
    }
    return headers;
}

function handleError(ex){
    if(!ex.ok){
        throw new Error(ex.statusText);
    }
    return ex;
}

function makePromise(kModule,end,headers){
    const url = `${baseUrl}${kModule}/${appKey}/${end}`;
    return fetch(url,headers)
    .then(handleError)
    .then(x => x.json())
}


export function get(kModule,end){
    const headers = generateHeaders("Get");
   return makePromise(kModule,end,headers);
}

export function post(kModule,end,data){
    const headers = generateHeaders("POST",data);
    return makePromise(kModule,end,headers);
}

export function put(kModule,end,data){
    const headers = generateHeaders("PUT",data);
    return makePromise(kModule,end,headers);
}

export function del(kModule,end){
    const headers = generateHeaders("DELETE");
   return makePromise(kModule,end,headers);
}