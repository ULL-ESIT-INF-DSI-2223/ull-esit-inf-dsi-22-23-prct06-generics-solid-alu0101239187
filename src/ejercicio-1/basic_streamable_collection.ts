import { Streamable } from "./streamable";

export abstract class BasicStreamableCollection<
  T extends { name: string; year: number }
> implements Streamable<T>
{
  private _collection: T[];

  /**
   * Constructor of the abstract class BasicStreamableCollection
   * @param _collection Initial elements of the collection
   */
  constructor(...collection: T[]) {
    this._collection = collection;
  }

  get collection() {
    return this._collection;
  }

  /**
   * Adds an item to a collection
   * @param item Item to add
   * @returns true if element could be added, false otherwise
   */
  public add(element: T): boolean {
    if (
      this.collection.filter(function (e) {
        return e.name === element.name;
      }).length === 0
    ) {
      this.collection.push(element);
      return true;
    }
    return false;
  }

  /**
   * Returns an item from a collection
   * @param index Index of the item to get
   * @returns The item if the index is correct, undefined otherwise
   */
  public get(index: number): T | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._collection[index];
  }

  /**
   * Removes an item from a collection
   * @param index Index of the item to remove
   * @returns The item removed if the operation was succesful, undefined otherwised
   */
  public remove(index: number): T | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._collection.splice(index, 1)[0];
  }

  /**
   * Returns the number of items of a collection
   * @returns The number of items of the collection
   */
  public length(): number {
    return this._collection.length;
  }

  /**
   * Searchs items in the collection by his name
   * @param name Name to search
   * @returns The items found with the search term
   */
  public searchByName(name: string): T[] {
    return this.collection.filter(function (element) {
      return element.name.toUpperCase().startsWith(name.toUpperCase());
    });
  }

  /**
   * Searchs items in the collection by his year
   * @param year Year to search
   * @returns The items found with the year
   */
  public searchByYear(year: number): T[] {
    return this.collection.filter(function (element) {
      return element.year === year;
    });
  }

  /**
   * Prints the collection as a string
   * @returns String representation of the collection
   */
  public abstract print(): string;
}
