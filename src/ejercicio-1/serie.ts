export class Serie {
  /**
   * Constructor of the class Serie
   * @param _name Name of the serie
   * @param _seasons Number of seasons of the serie, must be an integer greater than zero
   * @param _chapters Numbre of chapters of the serie, must be an integer greater than zero
   * @param _year Year of the serie, must be a positive integer
   * ```typescript
   * serie: Serie = new Serie("The Last of Us", 1, 9, 2023);
   * ```
   */
  constructor(private _name: string, private _seasons: number, private _chapters: number, private _year: number) {
    if (_seasons % 1 !== 0 || _seasons < 1) {
      throw "El número de temporadas debe ser entero y mayor que cero.";
    }
    if (_chapters % 1 !== 0 || _chapters < 1) {
      throw "El número de capítulos debe ser entero y mayor que cero.";
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

  get seasons() {
    return this._seasons;
  }

  set seasons(seasons: number) {
    if (seasons % 1 !== 0 || seasons < 1) {
      throw "El número de temporadas debe ser entero y mayor que cero.";
    }
    this._seasons = seasons;
  }

  get chapters() {
    return this._chapters;
  }

  set chapters(chapters: number) {
    if (chapters % 1 !== 0 || chapters < 1) {
      throw "El número de capítulos debe ser entero y mayor que cero.";
    }
    this._chapters = chapters;
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