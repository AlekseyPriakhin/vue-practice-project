
export {useFetch}
//import {makeRequest} from '@/helpers/request'

/* function getPath(page, per_page) {
    let path = `/car_types?per_page=${per_page}&page=${page}`;
  
    return path;
  } */


async function useFetch(url,options)
{
    return await fetch(url,options)
    .then((response) =>
    {
        if(response.ok && response.status < 400) return response.json();
        else if(response.status >= 400 && response.status < 500) throw new Error('client error')
        else if(response.status >= 500) throw new Error('server error')
    })
    .catch(err=>console.log(err));
}