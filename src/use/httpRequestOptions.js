export class HTTPRequestOptions 
{
    #options

    constructor(){
        this.#options = {}
    }

    useMethod(method)
    {
        this.#options.method = method;
        return this;
    }

    useBody(body)
    {
        this.#options.body = body;
        return this;
    }

    useHeaders(headers)
    {
        this.#options.headers = headers;
        return this;
    }

    getOptions()
    {
        return this.#options;
    }


}