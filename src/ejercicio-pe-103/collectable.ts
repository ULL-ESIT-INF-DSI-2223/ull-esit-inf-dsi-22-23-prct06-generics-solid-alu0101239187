export interface Collectable<T> {
    /**
     * Adds an item to a collection
     * @param item Item to add
     */
    addItem(item: T): void;

    /**
     * Returns an item from a collection
     * @param index Index of the item to get
     */
    getItem(index: number): T | undefined;

    /**
     * Removes an item from a collection and returns it
     * @param index Index of the item to remove
     */
    removeItem(index: number): T | undefined;
    
    /**
     * Returns the number of items of a collection
     */
    getNumberOfItems(): number;
}