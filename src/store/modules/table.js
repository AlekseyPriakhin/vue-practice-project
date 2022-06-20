
import {getURL} from '@/helpers/url'
export default {
    state: {
        records : [],
        currentPage : 1,
        totalPages : 10,
        perPage : 10,
        search : ''

    },
    getters: {
        getRecords(state){return state.records},
        getTotalPages(state) {return state.totalPages},
        getCurrentPage(state) {return state.currentPage},
        getSearch(state) {return state.search}
    },
    mutations: {
        setCurrentPage(state,pageNum) {state.currentPage = pageNum},
        setRecords(state,newRecords){state.records = newRecords},
        setTotalPages(state,totalPages){state.totalPages = totalPages},
        setSearch(state,newSearch) {state.search = newSearch}
    },
    actions: {

        async getRecords(ctx,pageNum)
        {
            const path = `${getURL()}/car_types?per_page=10&page=${pageNum}&search=${this.getters.getSearch}`;
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
            
        },
        search(ctx,search){ctx.commit('setSearch',search)}
    }
  }