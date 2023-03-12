export interface Collectable<T> {
  /**
   * Adds an item from a collection
   * @param element Element to add
   */
  add(element: T): boolean;

  /**
   * Returns an item from a collection
   * @param index Index of the item to get
   */
  get(index: number): T | undefined;

  /**
   * Removes an item from a collection and returns it
   * @param index Index of the item to remove
   */
  remove(index: number): T | undefined;

  /**
   * Returns the number of items of a collection
   */
  length(): number;
}
