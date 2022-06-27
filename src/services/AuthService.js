import { useFetch } from '../use/fetch'
const url = `/session`

export async function login(router, login, password) {
    const respone = await useFetch(url, getOptions(login, password))
    
    if (respone) {
        setTokens(respone);
        router.push('/');
    }

    return false;
}


export function checkAuth() {
    const token = localStorage.getItem('access');
    if (!token) {
        return false;
    }

    const expireDate = new Date(localStorage.getItem('access_expires_at'))
    if (expireDate < Date.now()) {
        clearTokens();
        return false;
    }

    return true
}


function getOptions(login, password) {

    const options = {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers:
        {
            'Content-Type': 'application/json'
        }
    }

    return options;
}



function setTokens(tokens) {
    localStorage.setItem('access', tokens.access)
    localStorage.setItem('access_expires_at', tokens.access_expires_at)
}

function clearTokens(){
    localStorage.removeItem('access');
    localStorage.removeItem('access_expires_at')
}
