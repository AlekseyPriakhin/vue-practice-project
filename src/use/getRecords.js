import {useFetch} from './fetch.js'
import {useDomain} from './getDomain.js'

export async function useGetRecords(pageNum=1,searchQuery='',sortOptions=[],perPage = 10)
{
    const options = {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      }

      let url = `${useDomain()}/car_types?page=${pageNum}&per_page=${perPage}`

      if(searchQuery && searchQuery !== "") url+= `&search=${searchQuery}`
      if(sortOptions.length !== 0) url+= getSortOptionAsString(sortOptions)


       const res =  await useFetch(url,options);
       return res;
}

function getSortOptionAsString(sortOptions)
{
  let string = '';
  for(const option of sortOptions)
  {
    string+=`&sort_desc[]=${option.isDesc}&sort_by[]=${option.id}`;
  }
  return string;
}