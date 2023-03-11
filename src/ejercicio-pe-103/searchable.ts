export interface Searchable<T, S> {
  /**
   * Searchs an item in a collection based on the search term
   * @param search_term Search term
   */
  search(search_term: S): T[];
}
