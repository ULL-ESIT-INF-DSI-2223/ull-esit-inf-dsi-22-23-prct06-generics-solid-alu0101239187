export interface SearchableByYear<T extends {year: number}> {
    /**
     * Searchs an item in a collection by his year
     * @param year Year to search
     */
    searchByYear(year: number): T[];
}