import { Disc } from "./disc";
import { Single } from "./single";

export class Discography<D extends Disc, S extends Single> {
  private _elements: (D | S)[];

  /**
   * Constructor of the class Discography
   * @param elements Initial discs and singles of the discography
   * ```typescript
   * const discography1: Discography = new Discography();
   * const discography2: Discography = new Discography(new Disc("Graduation", "Kanye West", 2007, []), new Single("Partiendo la Pana", "Kanye West", 2002, new Song("Partiendo la Pana", "Partiendo la Pana", 150, ["Rock español"], 200), ["Original", "Acústico"]););
   * ```
   */
  constructor(...elements: (D | S)[]) {
    this._elements = elements;
  }

  get elements() {
    return this._elements;
  }

  /**
   * Adds a disc or single to the discography
   * @param element Element to add
   * @returns true if element could be added, false otherwise
   * ```typescript
   * const discography: Discography = new Discography();
   * discography.add(new Disc("Graduation", "Kanye West", 2007, [])) // returns true
   * ```
   */
  public add(element: D | S): boolean {
    if (
      this._elements.filter(function (d) {
        return d.name === element.name;
      }).length === 0
    ) {
      this._elements.push(element);
      return true;
    }
    return false;
  }

  /**
   * Returns a disc or single from the discography
   * @param index Index of the element to get
   * @returns The element if the index is correct, undefined otherwise
   * ```typescript
   * const discography: Discography = new Discography(new Disc("Graduation", "Kanye West", 2007, []), new Disc("Yeezus", "Kanye West", 2013, []));
   * discography.get(0) // returns new Disc("Graduation", "Kanye West", 2007, [])
   * ```
   */
  public get(index: number): D | S | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._elements[index];
  }

  /**
   * Removes a disc or single from the discography
   * @param index Index of the element to remove
   * @returns The element removed if the operation was succesful, undefined otherwise
   * ```typescript
   * const discography: Discography = new Discography(new Disc("Graduation", "Kanye West", 2007, []), new Disc("Yeezus", "Kanye West", 2013, []));
   * discography.remove(0) // returns new Disc("Graduation", "Kanye West", 2007, [])
   * ```
   */
  public remove(index: number): D | S | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._elements.splice(index, 1)[0];
  }

  /**
   * Returns the number of discs and singles in the discography
   * @returns The number of elements in the discography
   * ```typescript
   * const discography: Discography = new Discography(new Disc("Graduation", "Kanye West", 2007, []), new Disc("Yeezus", "Kanye West", 2013, []));
   * discography.length() // returns 2
   * ```
   */
  public length(): number {
    return this._elements.length;
  }
}
