import { Disc } from "./disc";
import { Discography } from "./discography";
import { Single } from "./single";

export class Artist {
  /**
   * Constructor of the class Artist
   * @param _name Artist name
   * @param _monthly_listeners Artist monthly listeners. Must be a positive integer.
   * @param _discography Artist discography
   * ```typescript
   * new Artist("Estopa", 1500, [new Disc(...)])
   * ```
   */
  constructor(
    private _name: string,
    private _monthly_listeners: number,
    private _discography: Discography<Disc, Single>
  ) {
    if (_monthly_listeners % 1 !== 0 || _monthly_listeners < 0) {
      throw "El número de oyentes mensuales debe ser un entero positivo.";
    }
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get monthly_listeners() {
    return this._monthly_listeners;
  }

  set monthly_listeners(monthly_listeners: number) {
    if (monthly_listeners % 1 !== 0 || monthly_listeners < 0) {
      throw "El número de oyentes mensuales debe ser un entero positivo.";
    }
    this._monthly_listeners = monthly_listeners;
  }

  get discography() {
    return this._discography;
  }

  set discography(discography: Discography<Disc, Single>) {
    this._discography = discography;
  }
}
