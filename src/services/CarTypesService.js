import {useFetch} from '../use/fetch.js'
import { CarTypesRequest } from '@/use/carTypesRequest.js';
import { HTTPRequestOptions } from '@/use/httpRequestOptions.js';

export async function getRecords(pageNum=1,searchQuery='',sortOptions=[],perPage = 10)
{
  const url = new CarTypesRequest()
  .onPage(pageNum)
  .perPage(perPage)
  .withSearchQuery(searchQuery)
  .withSortOptions(sortOptions)
  .getUrl();

  const options = new HTTPRequestOptions()
  .useMethod('GET')
  .useHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access')}`
    }
  )
  .getOptions();
  
  const res =  await useFetch(url,options);
  return res;
}