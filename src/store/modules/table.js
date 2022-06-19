
import {getURL} from '@/helpers/url'
export default {
    state: {
        records : [],
        currentPage : 1,
        totalPages : 10,
        perPage : 10,

    },
    getters: {
        getRecords(state){return state.records},
        getTotalPages(state) {return state.totalPages},
        getCurrentPage(state) {return state.currentPage}
    },
    mutations: {
        setCurrentPage(state,pageNum) {state.currentPage = pageNum},
        setRecords(state,newRecords){state.records = newRecords},
        setTotalPages(state,totalPages){state.totalPages = totalPages}
    },
    actions: {

        async getRecords(ctx)
        {
            const path = `https://naim.rzdit.ru/car_types?per_page=10&page=2`;
            const result = await fetch(path,{
                method:'GET',
                headers:
                {
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
              }
                ).then(res => res.json());
            ctx.commit('setRecords',result.data)
        },
        async toPage(ctx,pageNum)
        {
            const path = `${getURL()}/car_types?per_page=10&page=${pageNum}&sort_desc[]=true&sort_by[]=id`;
            const result = await fetch(path,{
                method:'GET',
                headers:
                {
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
              }
                ).then(res => res.json());
                ctx.commit('setCurrentPage',pageNum)
            ctx.commit('setTotalPages',result.total_pages)
            ctx.commit('setRecords',result.data)
            
        }
    }
  }