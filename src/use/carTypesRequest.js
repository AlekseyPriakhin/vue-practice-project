export class CarTypesRequest
{
  #reqString;

  constructor()
  {
      this.#reqString = `/car_types?`;
  }

  onPage(pageNum)
  {
    this.#reqString += `page=${pageNum}&`;
    return this;
  }

  perPage(perPageCount)
  {
    this.#reqString += `per_page=${perPageCount}&`;
    return this;
  }

  withSearchQuery(searchQuery)
  {
    if(searchQuery) this.#reqString += `search=${searchQuery}&`
    return this;
  }

  withSortOptions(sortOptions = [])
  {
    for(const option of sortOptions){
      this.#reqString+=`sort_desc[]=${option.isDesc}&sort_by[]=${option.id}&`;
    }
    return this;
  }

  getUrl()
  {
    return this.#reqString.slice(0,this.#reqString.length-1)
  }
}
