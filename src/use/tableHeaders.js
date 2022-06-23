//import {ref} from 'vue'

export function useTableHeaders(headers = [])
{
  for (const header of headers) {
    header.isDesc = false;

  }
  return headers
}