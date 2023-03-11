export interface SearchableByName<T extends {name: string}> {
    /**
     * Searchs an item in a collection by his name
     * @param name Name to search
     */
    searchByName(name: string): T[];
}