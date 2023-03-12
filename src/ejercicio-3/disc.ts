import { Song } from "./song";

export class Disc {
  /**
   * Constructor of the class Disc
   * @param _name Disc name
   * @param _artist Disc artist
   * @param _publication_year Disc publication year. Must be a positive integer
   * @param _songs Disc songs
   * ```typescript
   * new Disc("Destrangis", "Estopa", 2002, [new Song(...)])
   * ```
   */
  constructor(
    private _name: string,
    private _artist: string,
    private _publication_year: number,
    private _songs: Song[]
  ) {
    if (_publication_year % 1 !== 0 || _publication_year < 0) {
      throw "El año de publicación debe ser un entero positivo.";
    }
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get artist() {
    return this._artist;
  }

  set artist(artist: string) {
    this._artist = artist;
  }

  get publication_year() {
    return this._publication_year;
  }

  set publication_year(publication_year: number) {
    if (publication_year % 1 !== 0 || publication_year < 0) {
      throw "El año de publicación debe ser un entero positivo.";
    }
    this._publication_year = publication_year;
  }

  get songs() {
    return this._songs;
  }

  set songs(songs: Song[]) {
    this._songs = songs;
  }
}
