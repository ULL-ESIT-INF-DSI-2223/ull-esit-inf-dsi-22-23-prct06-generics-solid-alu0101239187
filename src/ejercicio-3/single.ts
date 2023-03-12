import { Song } from "./song";

export class Single {
  private _versions: string[];
  /**
   * Constructor of the class Single
   * @param _name Single name
   * @param _artist Single artist
   * @param _publication_year Disc publication year. Must be a positive integer
   * @param _song Single song
   * @param versions Song versions
   * ```typescript
   * new Single("Partiendo la Pana", "Estopa", 2002, "Partiendo la Pana", ["Original", "Acústico"]);
   * ```
   */
  constructor(
    private _name: string,
    private _artist: string,
    private _publication_year: number,
    private _song: Song,
    versions?: string[]
  ) {
    if (_publication_year % 1 !== 0 || _publication_year < 0) {
      throw "El año de publicación debe ser un entero positivo.";
    }
    if (typeof versions === "undefined") {
      this._versions = ["Original"];
    } else {
      this._versions = versions;
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

  get song() {
    return this._song;
  }

  set song(song: Song) {
    this._song = song;
  }

  get versions() {
    return this._versions;
  }

  set versions(versions: string[]) {
    this._versions = versions;
  }
}
