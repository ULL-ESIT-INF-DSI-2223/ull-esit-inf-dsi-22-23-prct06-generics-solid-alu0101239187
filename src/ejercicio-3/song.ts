export class Song {
  /**
   * Constructor of the class Song
   * @param _name Song name
   * @param _album Song disc
   * @param _duration Song duration. Must be a positive integer
   * @param _genres Song genres
   * @param _single True if the song is a single, false if otherwise
   * @param _reproductions_number Song number of reproductions. Must be a positive integer
   * ```typescript
   * new Song("Wolves", "The Life of Pablo", 239, ["Hip hop"], false, 1567);
   * ```
   */
  constructor(
    private _name: string,
    private _album: string,
    private _duration: number,
    private _genres: string[],
    private _reproductions_number: number
  ) {
    if (_duration % 1 !== 0 || _duration < 0) {
      throw "La duración debe ser un número entero positivo.";
    }
    if (_reproductions_number % 1 !== 0 || _reproductions_number < 0) {
      throw "El número de reproducciones debe ser un entero positivo.";
    }
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get album() {
    return this._album;
  }

  set album(disc: string) {
    this._album = disc;
  }

  get duration() {
    return this._duration;
  }

  set duration(duration: number) {
    if (duration % 1 !== 0 || duration < 0) {
      throw "La duración debe ser un número entero positivo.";
    }
    this._duration = duration;
  }

  get genres() {
    return this._genres;
  }

  set genres(genres: string[]) {
    this._genres = genres;
  }

  get reproductions_number() {
    return this._reproductions_number;
  }

  set reproductions_number(reproductions_number: number) {
    if (reproductions_number % 1 !== 0 || reproductions_number < 0) {
      throw "El número de reproducciones debe ser un entero positivo.";
    }
    this._reproductions_number = reproductions_number;
  }
}
