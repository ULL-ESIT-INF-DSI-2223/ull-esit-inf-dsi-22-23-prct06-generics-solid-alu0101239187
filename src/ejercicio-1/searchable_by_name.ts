export interface SearchableByName<T> {
    searchByName(name: string): T[];
}