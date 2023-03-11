export class Movie {
  /**
   * Constructor of the class Movie
   * @param _name Name of the movie
   * @param _director Director of the movie
   * @param _duration Duration of the movie in minutes, must be a positive integer
   * @param _year Year of the movie, must be a positive integer
   * ```typescript
   * movie: Movie = new Movie("Avatar", "James Cameron", 137, 2009);
   * ```
   */
  constructor(
    private _name: string,
    private _director: string,
    private _duration: number,
    private _year: number
  ) {
    if (_duration % 1 !== 0 || _duration < 0) {
      throw "La duración en minutos debe ser un entero positivo.";
    }
    if (_year % 1 !== 0 || _year < 0) {
      throw "El año debe ser un entero positivo.";
    }
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get director() {
    return this._director;
  }

  set director(director: string) {
    this._director = director;
  }

  get duration() {
    return this._duration;
  }

  set duration(duration: number) {
    if (duration % 1 !== 0 || duration < 0) {
      throw "La duración en minutos debe ser un entero positivo.";
    }
    this._duration = duration;
  }

  get year() {
    return this._year;
  }

  set year(year: number) {
    if (year % 1 !== 0 || year < 0) {
      throw "El año debe ser un entero positivo.";
    }
    this._year = year;
  }
}
