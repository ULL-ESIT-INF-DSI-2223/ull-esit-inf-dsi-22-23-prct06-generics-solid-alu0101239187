import { Artist } from "./artist";
import { Disc } from "./disc";
import { Discography } from "./discography";
import { Single } from "./single";

export class Group extends Artist {
  /**
   * Constructor of the class Group
   * @param _name Group name
   * @param _monthly_listeners Group monthly listeners. Must be a positive integer
   * @param _discography Group discography
   * @param _number_of_members Group number of members. Must be a positive integer
   * ```typescript
   * new Group("Estopa", 1500, [new Disc(...)], 2)
   * ```
   */
  constructor(
    _name: string,
    _monthly_listeners: number,
    _discography: Discography<Disc, Single>,
    private _number_of_members: number
  ) {
    if (_number_of_members % 1 !== 0 || _number_of_members < 0) {
      throw "El número de miembros debe ser un entero positivo.";
    }
    super(_name, _monthly_listeners, _discography);
  }

  get number_of_members() {
    return this._number_of_members;
  }

  set number_of_members(number_of_members: number) {
    if (number_of_members % 1 !== 0 || number_of_members < 0) {
      throw "El número de miembros debe ser un entero positivo.";
    }
    this._number_of_members = number_of_members;
  }
}
