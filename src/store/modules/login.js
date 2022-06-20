import { makeRequest } from "@/helpers/request";
const responseHandler = async (response, ctx) => {
    if (response.ok) {
        const tokens = await response.json();
        ctx.commit('setTokens',tokens.access,tokens.refresh)
        localStorage.setItem('access',tokens.access);
        localStorage.setItem('refresh',tokens.refresh);
        ctx.commit('updateValidStatus',false);
        return true;
    }
    else if(response.status === 401) 
    {
        ctx.commit('updateValidStatus',true);
        return false;
    }
}

export default
    {
        state: {
            isNotValid: false,
            isLogin: false,
            access: localStorage.getItem('access') || '',
            refresh: localStorage.getItem('refresh') || ''
        },
        getters: {
            isNotValid(state) {return state.isValid},
            isLogin(state) { return state.isLogin; },
            accessToken(state) { return state.access; },
            refreshToken(state) { return state.refresh; }
        },
        mutations: {
            updateValidStatus(state,value){state.isValid  = value},

            updateAuthStatus(state, value) {
                state.isLogin = value;
                localStorage.setItem('isLogin', state.isLogin);
            },
            setTokens(state, access, refresh) { state.access = access; state.refresh = refresh }


        },
        actions: {
            async login(ctx, payload) {
                const path = `/session`;
                const options = {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                };
                const result = await makeRequest(path,options)
                .then(res=> responseHandler(res,ctx));

                return result;

            }
        }
    }