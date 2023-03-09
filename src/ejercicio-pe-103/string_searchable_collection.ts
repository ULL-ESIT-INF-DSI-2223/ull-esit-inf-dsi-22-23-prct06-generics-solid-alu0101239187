import { SearchableCollection } from "./searchable_collection";

export class StringSearchableCollection extends SearchableCollection<string, string> {
    constructor (collection: string[]) {
        super(collection);
    }

    /**
     * Searchs an item in the collection based on the search term
     * @param search_term Search term
     * @returns An array with the strings that contains the search term as a substring
     */
    search(search_term: string): string[] {
        const found_items: string[] = [];
        for (let index = 0; index < this.getNumberOfItems(); index++) {
            const element: string = this.getItem(index) as string;
            if (element === search_term) {
                found_items.push(element);
            }
        }
        return found_items;
    }
}