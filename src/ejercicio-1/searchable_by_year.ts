export interface SearchableByYear<T> {
    searchByYear(year: number): T[];
}