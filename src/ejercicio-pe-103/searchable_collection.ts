import { Collectable } from "./collectable";
import { Searchable } from "./searchable";

export abstract class SearchableCollection<T, S>
  implements Collectable<T>, Searchable<T, S>
{
  constructor(private _collection: T[]) {}

  get collection(): T[] {
    return this._collection;
  }

  /**
   * Adds an item to a collection
   * @param item Item to add
   */
  public addItem(item: T): void {
    this._collection.push(item);
  }

  /**
   * Returns an item from a collection
   * @param index Index of the item to get
   * @returns The item if the index is correct, undefined otherwise
   */
  public getItem(index: number): T | undefined {
    if (index < 0 || index >= this.getNumberOfItems() || index % 1 !== 0) {
      return undefined;
    }
    return this._collection[index];
  }

  /**
   * Removes an item from a collection
   * @param index Index of the item to remove
   * @returns The item removed if the operation was succesful, undefined otherwised
   */
  public removeItem(index: number): T | undefined {
    if (index < 0 || index >= this.getNumberOfItems() || index % 1 !== 0) {
      return undefined;
    }
    return this._collection.splice(index, 1)[0];
  }

  /**
   * Returns the number of items of a collection
   * @returns The number of items of the collection
   */
  public getNumberOfItems(): number {
    return this._collection.length;
  }

  /**
   * Searchs an item in a collection based on the search term
   * @param search_term Search term
   * @returns An array with the items found
   */
  abstract search(search_term: S): T[];
}
