
import { makeRequest } from '@/helpers/request'

function getPath(page, per_page, search, sort) {
  let path = `/car_types?per_page=${per_page}&page=${page}`;
  if (search) path += `&search=${search}`;

  if (sort && sort.length === 1) path += `&sort_by[]=${sort[0].id}&sort_desc[]=${sort[0].isDesc}`;

  return path;
}

export default {
  state: {
    records: [],
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    search: '',
    sortOptions: [{ id: 'id', isDesc: false, isActive: false },
    { id: 'name', isDesc: false, isActive: false },
    { id: 'short_name', isDesc: false, isActive: false },
    { id: 'code', isDesc: false, isActive: false }
    ]

  },
  getters: {
    getRecords(state) { return state.records },
    getTotalPages(state) { return state.totalPages },
    getCurrentPage(state) { return state.currentPage },
    getSearch(state) { return state.search },
    getSortOptions(state) { return state.sortOptions }
  },
  mutations: {
    setCurrentPage(state, pageNum) { state.currentPage = pageNum },
    setRecords(state, newRecords) { state.records = newRecords },
    setTotalPages(state, totalPages) { state.totalPages = totalPages },
    setSearch(state, newSearch) { state.search = newSearch },
    setSortOptions(state, sortBy) {
      state.sortOptions.forEach(option => {
        if (option.id !== sortBy) {
          option.isDesc = false;
          option.isActive = false
        }
        else {
          option.isActive = true,
          option.isDesc = !option.isDesc
        }
      });
    }
  },
  actions: {

    async getRecords(ctx, pageNum = 1) {
      const search = this.getters.getSearch;
      const sort = this.getters.getSortOptions.filter(e => e.isActive === true);
      const options = {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      }
      const path = getPath(pageNum, ctx.state.perPage, search, sort);
      const result = await makeRequest(path, options).then(res => res.json());

      ctx.commit('setCurrentPage', pageNum)
      ctx.commit('setTotalPages', result.total_pages)
      ctx.commit('setRecords', result.data)
    },
    search(ctx, search) { ctx.commit('setSearch', search) },
    sort(ctx, sortBy) { ctx.commit('setSortOptions', sortBy) }
  }
}