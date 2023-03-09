import { SearchableCollection } from "./searchable_collection";

export class NumericSearchableCollection extends SearchableCollection<number, number> {
    constructor (collection: number[]) {
        super(collection);
    }

    /**
     * Searchs an item in the collection based on the search term
     * @param search_term Search term
     * @returns An array with the numbers that are equal to the search term
     */
    search(search_term: number): number[] {
        const found_items: number[] = [];
        for (let index = 0; index < this.getNumberOfItems(); index++) {
            const element: number = this.getItem(index) as number;
            if (element === search_term) {
                found_items.push(element);
            }
        }
        return found_items;
    }
}