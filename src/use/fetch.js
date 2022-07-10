export async function useFetch(url,options)
{
    return await fetch(`${process.env.VUE_APP_DOMAIN}${url}`, options)
    .then((response) =>
    {
        if(response.ok && response.status < 400) return response.json();
        else throw new Error(`${response.status} ${response.statusText}`)
    })
    .catch(err=>console.log(err.message));
}