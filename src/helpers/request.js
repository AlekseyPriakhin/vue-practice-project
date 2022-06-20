export { makeRequest}


function makeRequest(path, options) {
    return fetch(getURL()+path, options);
}


function getURL() {
    return "https://naim.rzdit.ru";
}