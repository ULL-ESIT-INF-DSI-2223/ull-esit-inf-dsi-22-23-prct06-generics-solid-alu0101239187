export class Documentary {
    constructor(private _name: string, private _field: string, private _duration: number, private _year: number) {
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
  
    get field() {
      return this._field;
    }
  
    set field(field: string) {
      this._field = field;
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