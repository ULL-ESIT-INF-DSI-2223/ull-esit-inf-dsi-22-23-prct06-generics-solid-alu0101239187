# Práctica 6 - Clases e interfaces genéricas. Principios SOLID

## Daniel Jorge Acosta

### alu0101239187@ull.edu.es

## Índice

- [Introducción](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct05-objects-classes-interfaces-alu0101239187/#introducción)
- [Ejercicios](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct05-objects-classes-interfaces-alu0101239187/#ejercicios)

## Introducción

En este repositorio se encuentra descrita la realización de una serie de ejercicios mediante los que aprender el uso y la creación de clases e interfaces genéricas en TypeScript, además de afianzar la aplicación de los principios SOLID a nuestro código. La estructura de este proyecto es similar a la utilizada en prácticas anteriores, añadiendo en esta ocasión el fichero de configuración de **Coveralls**, herramienta que se utiliza en esta práctica por primera vez. Podemos encontrar los ficheros de código fuente en el directorio **src/**, estando separados en directorios por ejercicios siguiendo la nomenclatura **ejercicio-n/**. los ficheros de pruebas se encuentran en el directorio **tests/**, estando separados en directorios al igual que los ficheros de código fuente. Las herramientas utilizadas a lo largo del proyecto son principalmente **ESLint** para la comprobación de errores, **Prettier** para el formateo del código, **TypeDoc** para la documentación automática del código, **Mocha** y **Chai** para el desarrollo dirigido por pruebas e **Instanbul** y **Coveralls** para la obtención de informes de cubrimiento del código fuente. Es estos ejercicios se seguirán los principios **SOLID**. Los ejercicios desarrollados son:

1. DSIflix
2. Implementación de una lista y sus operaciones
3. Ampliando la biblioteca musical

## Ejercicios

### 1. DSIflix

Este ejercicio trata de diseñar el modelado de datos para una plataforma de vídeos en streaming. Para esto tenemos que crear una estructura de clases e interfaces que nos permita guardar y relacionar la información de esta.

#### Interfazgenérica  SearchableByName

La interfaz genérica `SearchableByName` se utiliza para indicar que un objeto implementa una operación para buscar elementos de tipo T por su nombre.

```typescript
export interface SearchableByName<T extends { name: string }> {
  searchByName(name: string): T[];
}
```

#### Interfaz genérica SearchableByYear

La interfaz genérica `SearchableByYear` se utiliza para indicar que un objeto implementa una operación para buscar elementos de tipo T por su año.

```typescript
export interface SearchableByYear<T extends { year: number }> {
  searchByYear(year: number): T[];
}

```

#### Interfaz genérica Collectable

La interfaz genérica `Collectable` se utiliza para indicar que un objeto implementa las operaciones básicas para gestionar una colección de objetos de un tipo genérico T.

```typescript
export interface Collectable<T> {
  add(element: T): boolean;

  get(index: number): T | undefined;

  remove(index: number): T | undefined;

  length(): number;
}
```

#### Interfaz Printable

La interfaz `Printable` se utiliza para indicar que un objeto implementa una operación para imprimir su contenido como cadena.

```typescript
export interface Printable {
    print(): string;
}
```

#### Interfaz genérica Streamable

`Streamable` es una interfaz genérica que extiende las interfaces `SearchableByName`, `SearchableByYear`, `Collectable` y `Printable` para indicar que un objeto es streameable y, por tanto, implementa estas operaciones.

```typescript
export interface Streamable<T extends { name: string; year: number }>
  extends SearchableByName<T>,
    SearchableByYear<T>,
    Collectable<T>,
    Printable {}
```

#### Clase abstracta genérica BasicStreamableCollection

La clase abstracta `BasicStreamableCollection` implementa la interfaz genérica `Streamable` y representa una colección streameable básica cuyo tipo debe ser definido. Esta clase tiene una colección de elementos genéricos y define e implementa la mayoría de métodos que puede llevar acabo una colección streamable, siendo la execpción el método `print` que debe ser definido dependiendo del tipo de colección del que se trate.

```typescript
export abstract class BasicStreamableCollection<
  T extends { name: string; year: number }
> implements Streamable<T>
{
  private _collection: T[];

  constructor(...collection: T[]) {
    this._collection = collection;
  }

  get collection() {
    return this._collection;
  }

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

  public get(index: number): T | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._collection[index];
  }

  public remove(index: number): T | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._collection.splice(index, 1)[0];
  }

  public length(): number {
    return this._collection.length;
  }

  public searchByName(name: string): T[] {
    return this.collection.filter(function (element) {
      return element.name.toUpperCase().startsWith(name.toUpperCase());
    });
  }

  public searchByYear(year: number): T[] {
    return this.collection.filter(function (element) {
      return element.year === year;
    });
  }

  public abstract print(): string;
}
```

A continuación se describirán los métodos implementados en la clase:

 * `add` añade un elemento a la colección siempre que no esté repetido.
 * `get` devuelve un objeto de la colección según su índice. Devuelve *undefined* si el índice es inválido.
 * `remove` devuelve un objeto de la colección según su índice y lo elimina. Devuelve *undefined* si el índice es inválido.
 * `length` devuelve el número de elementos de la colección.
 * `searchByName` devuelve los elementos cuyo nombre coincida con el término de búsqueda, es decir, que empiece por la cadena introducida sin importar si está en minúsculas o mayúsculas.
 * `searchByYear` devuelve los elementos cuyo año sea igual al año de búsqueda.

#### Clase MovieCollection

La clase `MovieCollection` hereda de la clase abstracta genérica `BasicStreamableCollection` y la implementa con el tipo `Movie`, representando una colección de películas. Esta implementa el método`print` de la clase abstracta especializado en películas.

```typescript
export class MovieCollection extends BasicStreamableCollection<Movie> {
  constructor(...movies: Movie[]) {
    super(...movies);
  }

  public print(): string {
    let output = "";
    this.collection.forEach(
      (movie, it) =>
        (output += `${it + 1}. ${movie.name}\nDirector: ${
          movie.director
        }\nDuración: ${movie.duration} minutos\nAño: ${movie.year}\n\n`)
    );
    return output;
  }
}
```

A continuación se describirán los métodos implementados en la clase:

 * `print` devuelve una cadena con el contenido de la colección formateado.
 
Las pruebas para probar la clase son las siguientes:

```typescript
describe("MovieCollection class tests", () => {
  const movie_collection: MovieCollection = new MovieCollection();

  it("MovieCollection constructor", () => {
    expect(movie_collection).to.be.instanceof(MovieCollection);
    expect(movie_collection).to.be.instanceof(BasicStreamableCollection);
    expect(
      new MovieCollection(new Movie("Avatar", "James Cameron", 137, 2009))
    ).to.be.instanceof(MovieCollection);
    expect(
      new MovieCollection(
        new Movie("Avatar", "James Cameron", 137, 2009),
        new Movie("Titanic", "James Cameron", 118, 1997)
      )
    ).to.be.instanceof(MovieCollection);
    expect(movie_collection).to.respondTo("add");
    expect(movie_collection).to.respondTo("searchByName");
    expect(movie_collection).to.respondTo("searchByYear");
    expect(movie_collection).to.respondTo("print");
  });

  it("Function add", () => {
    expect(movie_collection.collection).to.be.eql([]);
    expect(
      movie_collection.add(new Movie("Avatar", "James Cameron", 137, 2009))
    ).to.be.true;
    expect(movie_collection.collection).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(
      movie_collection.add(new Movie("Titanic", "James Cameron", 118, 1997))
    ).to.be.true;
    expect(movie_collection.collection).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
      new Movie("Titanic", "James Cameron", 118, 1997),
    ]);
    expect(
      movie_collection.add(new Movie("Avatar", "James Cameron", 137, 2009))
    ).to.be.false;
  });

  it("Function get", () => {
    expect(movie_collection.get(0)).to.be.eql(
      new Movie("Avatar", "James Cameron", 137, 2009)
    );
    expect(movie_collection.get(1)).to.be.eql(
      new Movie("Titanic", "James Cameron", 118, 1997)
    );
    expect(movie_collection.get(5)).to.be.undefined;
    expect(movie_collection.get(-1)).to.be.undefined;
    expect(movie_collection.get(2.5)).to.be.undefined;
  });

  it("Function remove", () => {
    expect(movie_collection.remove(1)).to.be.eql(
      new Movie("Titanic", "James Cameron", 118, 1997)
    );
    expect(movie_collection.collection).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(movie_collection.remove(0)).to.be.eql(
      new Movie("Avatar", "James Cameron", 137, 2009)
    );
    expect(movie_collection.collection).to.be.eql([]);
    expect(movie_collection.remove(3)).to.be.undefined;
    expect(movie_collection.remove(-1)).to.be.undefined;
    expect(movie_collection.remove(2.5)).to.be.undefined;
  });

  it("Function length", () => {
    expect(movie_collection.length()).to.be.equal(0);
    movie_collection.add(new Movie("Avatar", "James Cameron", 137, 2009));
    movie_collection.add(new Movie("Titanic", "James Cameron", 118, 1997));
    expect(movie_collection.length()).to.be.equal(2);
  });

  it("Function searchByName", () => {
    expect(movie_collection.searchByName("Avatar")).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(movie_collection.searchByName("tit")).to.be.eql([
      new Movie("Titanic", "James Cameron", 118, 1997),
    ]);
    expect(movie_collection.searchByName("al")).to.be.eql([]);
  });

  it("Function searchByYear", () => {
    expect(movie_collection.searchByYear(2009)).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(movie_collection.searchByYear(1997)).to.be.eql([
      new Movie("Titanic", "James Cameron", 118, 1997),
    ]);
    expect(movie_collection.searchByYear(2005)).to.be.eql([]);
  });

  it("Function print", () => {
    expect(movie_collection.print()).to.be.equal(
      "1. Avatar\nDirector: James Cameron\nDuración: 137 minutos\nAño: 2009\n\n2. Titanic\nDirector: James Cameron\nDuración: 118 minutos\nAño: 1997\n\n"
    );
  });
});
```

#### Clase Movie

La clase `Movie` representa una película. Esta clase tiene atributos para guardar el nombre de la película, el director, la duración y el año de publicación. Todos sus atributos son privados para controlar lo que se muestra y modifica de la clase, como en el caso de la duración o el año de publicación que solo pueden ser un entero positivo.

```typescript
export class Movie {
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
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Movie class tests", () => {
  const movie1: Movie = new Movie("Avatar", "James Cameron", 137, 2009);
  const movie2: Movie = new Movie("Titanic", "James Cameron", 118, 1997);

  it("Movie constructor", () => {
    expect(movie1).to.be.instanceof(Movie);
    expect(movie2).to.be.instanceof(Movie);
    expect(() => new Movie("Avatar", "James Cameron", -137, 2009)).to.throw(
      "La duración en minutos debe ser un entero positivo."
    );
    expect(() => new Movie("Avatar", "James Cameron", 137.5, 2009)).to.throw(
      "La duración en minutos debe ser un entero positivo."
    );
    expect(() => new Movie("Avatar", "James Cameron", 137, -2009)).to.throw(
      "El año debe ser un entero positivo."
    );
    expect(() => new Movie("Avatar", "James Cameron", 137, 2009.5)).to.throw(
      "El año debe ser un entero positivo."
    );
  });

  it("Property name", () => {
    expect(movie1.name).to.be.equal("Avatar");
    expect(movie2.name).to.be.equal("Titanic");
    movie1.name = "The Terminator";
    expect(movie1.name).to.be.equal("The Terminator");
  });

  it("Property director", () => {
    expect(movie1.director).to.be.equal("James Cameron");
    expect(movie2.director).to.be.equal("James Cameron");
    movie1.director = "Steven Spielberg";
    expect(movie1.director).to.be.equal("Steven Spielberg");
  });

  it("Property duration", () => {
    expect(movie1.duration).to.be.equal(137);
    expect(movie2.duration).to.be.equal(118);
    movie1.duration = 151;
    expect(movie1.duration).to.be.equal(151);
    expect(() => (movie2.duration = -118)).to.throw(
      "La duración en minutos debe ser un entero positivo."
    );
    expect(() => (movie2.duration = 118.5)).to.throw(
      "La duración en minutos debe ser un entero positivo."
    );
  });

  it("Property year", () => {
    expect(movie1.year).to.be.equal(2009);
    expect(movie2.year).to.be.equal(1997);
    movie1.year = 1984;
    expect(movie1.year).to.be.equal(1984);
    expect(() => (movie2.year = -1997)).to.throw(
      "El año debe ser un entero positivo."
    );
    expect(() => (movie2.year = 1997.5)).to.throw(
      "El año debe ser un entero positivo."
    );
  });
});
```

#### Clase DocumentaryCollection

La clase `DocumentaryCollection` hereda de la clase abstracta genérica `BasicStreamableCollection` y la implementa con el tipo `Documentary`, representando una colección de documentales. Esta implementa el método`print` de la clase abstracta especializado en documentales.

```typescript
export class DocumentaryCollection extends BasicStreamableCollection<Documentary> {
  constructor(...documentaries: Documentary[]) {
    super(...documentaries);
  }

  public print(): string {
    let output = "";
    this.collection.forEach(
      (documentary, it) =>
        (output += `${it + 1}. ${documentary.name}\nCampo: ${
          documentary.field
        }\nDuración: ${documentary.duration} minutos\nAño: ${
          documentary.year
        }\n\n`)
    );
    return output;
  }
}
```

A continuación se describirán los métodos implementados en la clase:

 * `print` devuelve una cadena con el contenido de la colección formateado.
 
Las pruebas para probar la clase son las siguientes:

```typescript
describe("DocumentaryCollection class tests", () => {
  const documentary_collection: DocumentaryCollection =
    new DocumentaryCollection();

  it("DocumentaryCollection constructor", () => {
    expect(documentary_collection).to.be.instanceof(DocumentaryCollection);
    expect(documentary_collection).to.be.instanceof(BasicStreamableCollection);
    expect(
      new DocumentaryCollection(
        new Documentary("Ballenas", "Biología Marina", 125, 2020)
      )
    ).to.be.instanceof(DocumentaryCollection);
    expect(
      new DocumentaryCollection(
        new Documentary("Ballenas", "Biología Marina", 125, 2020),
        new Documentary("Egipto", "Historia", 114, 2010)
      )
    ).to.be.instanceof(DocumentaryCollection);
    expect(documentary_collection).to.respondTo("add");
    expect(documentary_collection).to.respondTo("searchByName");
    expect(documentary_collection).to.respondTo("searchByYear");
    expect(documentary_collection).to.respondTo("print");
  });

  it("Function add", () => {
    expect(documentary_collection.collection).to.be.eql([]);
    expect(
      documentary_collection.add(
        new Documentary("Ballenas", "Biología Marina", 125, 2020)
      )
    ).to.be.true;
    expect(documentary_collection.collection).to.be.eql([
      new Documentary("Ballenas", "Biología Marina", 125, 2020),
    ]);
    expect(
      documentary_collection.add(
        new Documentary("Egipto", "Historia", 114, 2010)
      )
    ).to.be.true;
    expect(documentary_collection.collection).to.be.eql([
      new Documentary("Ballenas", "Biología Marina", 125, 2020),
      new Documentary("Egipto", "Historia", 114, 2010),
    ]);
    expect(
      documentary_collection.add(
        new Documentary("Ballenas", "Biología Marina", 125, 2020)
      )
    ).to.be.false;
  });

  it("Function get", () => {
    expect(documentary_collection.get(0)).to.be.eql(
      new Documentary("Ballenas", "Biología Marina", 125, 2020)
    );
    expect(documentary_collection.get(1)).to.be.eql(
      new Documentary("Egipto", "Historia", 114, 2010)
    );
    expect(documentary_collection.get(5)).to.be.undefined;
    expect(documentary_collection.get(-1)).to.be.undefined;
    expect(documentary_collection.get(2.5)).to.be.undefined;
  });

  it("Function remove", () => {
    expect(documentary_collection.remove(1)).to.be.eql(
      new Documentary("Egipto", "Historia", 114, 2010)
    );
    expect(documentary_collection.collection).to.be.eql([
      new Documentary("Ballenas", "Biología Marina", 125, 2020),
    ]);
    expect(documentary_collection.remove(0)).to.be.eql(
      new Documentary("Ballenas", "Biología Marina", 125, 2020)
    );
    expect(documentary_collection.collection).to.be.eql([]);
    expect(documentary_collection.remove(3)).to.be.undefined;
    expect(documentary_collection.remove(-1)).to.be.undefined;
    expect(documentary_collection.remove(2.5)).to.be.undefined;
  });

  it("Function length", () => {
    expect(documentary_collection.length()).to.be.equal(0);
    documentary_collection.add(
      new Documentary("Ballenas", "Biología Marina", 125, 2020)
    );
    documentary_collection.add(
      new Documentary("Egipto", "Historia", 114, 2010)
    );
    expect(documentary_collection.length()).to.be.equal(2);
  });

  it("Function searchByName", () => {
    expect(documentary_collection.searchByName("Ballenas")).to.be.eql([
      new Documentary("Ballenas", "Biología Marina", 125, 2020),
    ]);
    expect(documentary_collection.searchByName("egi")).to.be.eql([
      new Documentary("Egipto", "Historia", 114, 2010),
    ]);
    expect(documentary_collection.searchByName("al")).to.be.eql([]);
  });

  it("Function searchByYear", () => {
    expect(documentary_collection.searchByYear(2020)).to.be.eql([
      new Documentary("Ballenas", "Biología Marina", 125, 2020),
    ]);
    expect(documentary_collection.searchByYear(2010)).to.be.eql([
      new Documentary("Egipto", "Historia", 114, 2010),
    ]);
    expect(documentary_collection.searchByYear(2005)).to.be.eql([]);
  });

  it("Function print", () => {
    expect(documentary_collection.print()).to.be.equal(
      "1. Ballenas\nCampo: Biología Marina\nDuración: 125 minutos\nAño: 2020\n\n2. Egipto\nCampo: Historia\nDuración: 114 minutos\nAño: 2010\n\n"
    );
  });
});
```

#### Clase Documentary

La clase `Documentary` representa un documental. Esta clase tiene atributos para guardar el nombre del documental, el campo de estudio, la duración y el año de publicación. Todos sus atributos son privados para controlar lo que se muestra y modifica de la clase, como en el caso de la duración o el año de publicación que solo pueden ser un entero positivo.

```typescript
export class Documentary {
  constructor(
    private _name: string,
    private _field: string,
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
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Documentary class tests", () => {
  const documentary1: Documentary = new Documentary(
    "Ballenas",
    "Biología Marina",
    125,
    2020
  );
  const documentary2: Documentary = new Documentary(
    "Egipto",
    "Historia",
    114,
    2010
  );

  it("Movie constructor", () => {
    expect(documentary1).to.be.instanceof(Documentary);
    expect(documentary2).to.be.instanceof(Documentary);
    expect(
      () => new Documentary("Ballenas", "Biología Marina", -125, 2020)
    ).to.throw("La duración en minutos debe ser un entero positivo.");
    expect(
      () => new Documentary("Ballenas", "Biología Marina", 125.1, 2020)
    ).to.throw("La duración en minutos debe ser un entero positivo.");
    expect(
      () => new Documentary("Ballenas", "Biología Marina", 125, -2020)
    ).to.throw("El año debe ser un entero positivo.");
    expect(
      () => new Documentary("Ballenas", "Biología Marina", 125, 2020.5)
    ).to.throw("El año debe ser un entero positivo.");
  });

  it("Property name", () => {
    expect(documentary1.name).to.be.equal("Ballenas");
    expect(documentary2.name).to.be.equal("Egipto");
    documentary1.name = "Monte Everest";
    expect(documentary1.name).to.be.equal("Monte Everest");
  });

  it("Property field", () => {
    expect(documentary1.field).to.be.equal("Biología Marina");
    expect(documentary2.field).to.be.equal("Historia");
    documentary1.field = "Geografía";
    expect(documentary1.field).to.be.equal("Geografía");
  });

  it("Property duration", () => {
    expect(documentary1.duration).to.be.equal(125);
    expect(documentary2.duration).to.be.equal(114);
    documentary1.duration = 151;
    expect(documentary1.duration).to.be.equal(151);
    expect(() => (documentary2.duration = -114)).to.throw(
      "La duración en minutos debe ser un entero positivo."
    );
    expect(() => (documentary2.duration = 114.5)).to.throw(
      "La duración en minutos debe ser un entero positivo."
    );
  });

  it("Property year", () => {
    expect(documentary1.year).to.be.equal(2020);
    expect(documentary2.year).to.be.equal(2010);
    documentary1.year = 2005;
    expect(documentary1.year).to.be.equal(2005);
    expect(() => (documentary2.year = -2010)).to.throw(
      "El año debe ser un entero positivo."
    );
    expect(() => (documentary2.year = 2010.5)).to.throw(
      "El año debe ser un entero positivo."
    );
  });
});
```

#### Clase SerieCollection

La clase `SerieCollection` hereda de la clase abstracta genérica `BasicStreamableCollection` y la implementa con el tipo `Serie`, representando una colección de series. Esta implementa el método`print` de la clase abstracta especializado en series.

```typescript
export class SerieCollection extends BasicStreamableCollection<Serie> {
  constructor(...series: Serie[]) {
    super(...series);
  }

  public print(): string {
    let output = "";
    this.collection.forEach(
      (serie, it) =>
        (output += `${it + 1}. ${serie.name}\nTemporadas: ${
          serie.seasons
        }\nCapítulos: ${serie.chapters}\nAño: ${serie.year}\n\n`)
    );
    return output;
  }
}
```

A continuación se describirán los métodos implementados en la clase:

 * `print` devuelve una cadena con el contenido de la colección formateado.
 
Las pruebas para probar la clase son las siguientes:

```typescript
describe("SerieCollection class tests", () => {
  const serie_collection: SerieCollection = new SerieCollection();

  it("SerieCollection constructor", () => {
    expect(serie_collection).to.be.instanceof(SerieCollection);
    expect(serie_collection).to.be.instanceof(BasicStreamableCollection);
    expect(
      new SerieCollection(new Serie("The Last of Us", 1, 9, 2023))
    ).to.be.instanceof(SerieCollection);
    expect(
      new SerieCollection(
        new Serie("The Last of Us", 1, 9, 2023),
        new Serie("Friends", 10, 236, 1994)
      )
    ).to.be.instanceof(SerieCollection);
    expect(serie_collection).to.respondTo("add");
    expect(serie_collection).to.respondTo("searchByName");
    expect(serie_collection).to.respondTo("searchByYear");
    expect(serie_collection).to.respondTo("print");
  });

  it("Function add", () => {
    expect(serie_collection.collection).to.be.eql([]);
    expect(serie_collection.add(new Serie("The Last of Us", 1, 9, 2023))).to.be
      .true;
    expect(serie_collection.collection).to.be.eql([
      new Serie("The Last of Us", 1, 9, 2023),
    ]);
    expect(serie_collection.add(new Serie("Friends", 10, 236, 1994))).to.be
      .true;
    expect(serie_collection.collection).to.be.eql([
      new Serie("The Last of Us", 1, 9, 2023),
      new Serie("Friends", 10, 236, 1994),
    ]);
    expect(serie_collection.add(new Serie("The Last of Us", 1, 9, 2023))).to.be
      .false;
  });

  it("Function get", () => {
    expect(serie_collection.get(0)).to.be.eql(
      new Serie("The Last of Us", 1, 9, 2023)
    );
    expect(serie_collection.get(1)).to.be.eql(
      new Serie("Friends", 10, 236, 1994)
    );
    expect(serie_collection.get(5)).to.be.undefined;
    expect(serie_collection.get(-1)).to.be.undefined;
    expect(serie_collection.get(2.5)).to.be.undefined;
  });

  it("Function remove", () => {
    expect(serie_collection.remove(1)).to.be.eql(
      new Serie("Friends", 10, 236, 1994)
    );
    expect(serie_collection.collection).to.be.eql([
      new Serie("The Last of Us", 1, 9, 2023),
    ]);
    expect(serie_collection.remove(0)).to.be.eql(
      new Serie("The Last of Us", 1, 9, 2023)
    );
    expect(serie_collection.collection).to.be.eql([]);
    expect(serie_collection.remove(3)).to.be.undefined;
    expect(serie_collection.remove(-1)).to.be.undefined;
    expect(serie_collection.remove(2.5)).to.be.undefined;
  });

  it("Function length", () => {
    expect(serie_collection.length()).to.be.equal(0);
    serie_collection.add(new Serie("The Last of Us", 1, 9, 2023));
    serie_collection.add(new Serie("Friends", 10, 236, 1994));
    expect(serie_collection.length()).to.be.equal(2);
  });

  it("Function searchByName", () => {
    expect(serie_collection.searchByName("The LAst of Us")).to.be.eql([
      new Serie("The Last of Us", 1, 9, 2023),
    ]);
    expect(serie_collection.searchByName("fri")).to.be.eql([
      new Serie("Friends", 10, 236, 1994),
    ]);
    expect(serie_collection.searchByName("al")).to.be.eql([]);
  });

  it("Function searchByYear", () => {
    expect(serie_collection.searchByYear(2023)).to.be.eql([
      new Serie("The Last of Us", 1, 9, 2023),
    ]);
    expect(serie_collection.searchByYear(1994)).to.be.eql([
      new Serie("Friends", 10, 236, 1994),
    ]);
    expect(serie_collection.searchByYear(2005)).to.be.eql([]);
  });

  it("Function print", () => {
    expect(serie_collection.print()).to.be.equal(
      "1. The Last of Us\nTemporadas: 1\nCapítulos: 9\nAño: 2023\n\n2. Friends\nTemporadas: 10\nCapítulos: 236\nAño: 1994\n\n"
    );
  });
});
```

#### Clase Serie

La clase `Serie` representa una serie. Esta clase tiene atributos para guardar el nombre de la serie, el número de temporadas, el número de capítulos totales y el año de publicación. Todos sus atributos son privados para controlar lo que se muestra y modifica de la clase, como en el caso del año de publicación que solo puede ser un entero positivo.

```typescript
export class Serie {
  constructor(
    private _name: string,
    private _seasons: number,
    private _chapters: number,
    private _year: number
  ) {
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
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Serie class tests", () => {
  const serie1: Serie = new Serie("The Last of Us", 1, 9, 2023);
  const serie2: Serie = new Serie("Friends", 10, 236, 1994);

  it("Serie constructor", () => {
    expect(serie1).to.be.instanceof(Serie);
    expect(serie2).to.be.instanceof(Serie);
    expect(() => new Serie("The Last of Us", 0, 9, 2023)).to.throw(
      "El número de temporadas debe ser entero y mayor que cero."
    );
    expect(() => new Serie("The Last of Us", 1.5, 9, 2023)).to.throw(
      "El número de temporadas debe ser entero y mayor que cero."
    );
    expect(() => new Serie("The Last of Us", 1, 0, 2023)).to.throw(
      "El número de capítulos debe ser entero y mayor que cero."
    );
    expect(() => new Serie("The Last of Us", 1, 9.5, 2023)).to.throw(
      "El número de capítulos debe ser entero y mayor que cero."
    );
    expect(() => new Serie("The Last of Us", 1, 9, -1)).to.throw(
      "El año debe ser un entero positivo."
    );
    expect(() => new Serie("The Last of Us", 1, 9, 2023.5)).to.throw(
      "El año debe ser un entero positivo."
    );
  });

  it("Property name", () => {
    expect(serie1.name).to.be.equal("The Last of Us");
    expect(serie2.name).to.be.equal("Friends");
    serie1.name = "Breaking Bad";
    expect(serie1.name).to.be.equal("Breaking Bad");
  });

  it("Property seasons", () => {
    expect(serie1.seasons).to.be.equal(1);
    expect(serie2.seasons).to.be.equal(10);
    serie1.seasons = 5;
    expect(serie1.seasons).to.be.equal(5);
    expect(() => (serie2.seasons = -10)).to.throw(
      "El número de temporadas debe ser entero y mayor que cero."
    );
    expect(() => (serie2.seasons = 10.5)).to.throw(
      "El número de temporadas debe ser entero y mayor que cero."
    );
  });

  it("Property chapters", () => {
    expect(serie1.chapters).to.be.equal(9);
    expect(serie2.chapters).to.be.equal(236);
    serie1.chapters = 150;
    expect(serie1.chapters).to.be.equal(150);
    expect(() => (serie2.chapters = -236)).to.throw(
      "El número de capítulos debe ser entero y mayor que cero."
    );
    expect(() => (serie2.chapters = 236.5)).to.throw(
      "El número de capítulos debe ser entero y mayor que cero."
    );
  });

  it("Property year", () => {
    expect(serie1.year).to.be.equal(2023);
    expect(serie2.year).to.be.equal(1994);
    serie1.year = 1984;
    expect(serie1.year).to.be.equal(1984);
    expect(() => (serie2.year = -1994)).to.throw(
      "El año debe ser un entero positivo."
    );
    expect(() => (serie2.year = 1994.5)).to.throw(
      "El año debe ser un entero positivo."
    );
  });
});
```

### 2. Implementación de una lista y sus operaciones

Este ejercicio trata de diseñar una clase que implemente las operaciones de la clase `Array.prototype` sin utilizar los métodos que esta incluye.

Para esto, se ha creado una clase genérica `MyList` que funciona con cualquier tipo de elemento y contiene un array de elementos. Los métodos que incluye son:
 * `append` añade los elementos de otra lista a la lista.
 * `concatenate` añade los elementos de una o varias listas a la lista.
 * `filter` devuelve una lista con los elementos que cumplen con la función que se le pasa como parámetro.
 * `length` devuelve el número de elementos de la lista. En este caso se utiliza el atributo `length` del array original, ya que no hay otra forma fiable de encontrar la longitud de una colección de elementos. Por ejemplo, podría recorrer el array hasta encontrar *undefined*, pero dependiendo de la configuración del compilador la lista podría tener un valor *undefined* en su interior, dando una longitud incorrecta.
 * `map` devuelve una lista con el resultado de aplicar la función que se le pasa como parámetro a cada elemento de la lista.
 * `reduce` devuelve el resultado final acumulado de aplicar la función que se le pasa como parámetro a cada elemento de la lista.
 * `reverse` devuelve la lista en orden inverso.
 * `forEach` aplica la función que se le pasa como parámetro a cada elemento de la lista.

```typescript
export class MyList<T> {
  private _elements: T[];

  constructor(...elements: T[]) {
    this._elements = elements;
  }

  get elements() {
    return this._elements;
  }

  public append(list: MyList<T>): void {
    const new_elements: T[] = new Array<T>(this.length() + list.length());
    for (let index = 0; index < this.length(); index++) {
      new_elements[index] = this._elements[index];
    }
    for (let index = 0; index < list.length(); index++) {
      new_elements[this.length() + index] = list.elements[index];
    }
    this._elements = new_elements;
  }

  public concatenate(list: MyList<T>, ...other_lists: MyList<T>[]): void {
    let total_length = list.length();
    for (let index = 0; index < other_lists.length; index++) {
      total_length += other_lists[index].length();
    }
    const new_elements: T[] = new Array<T>(this.length() + total_length);
    for (let index = 0; index < this.length(); index++) {
      new_elements[index] = this._elements[index];
    }
    for (let index = 0; index < list.length(); index++) {
      new_elements[this.length() + index] = list.elements[index];
    }
    let counter = list.length();
    for (let i = 0; i < other_lists.length; i++) {
      for (let j = 0; j < other_lists[i].length(); j++) {
        new_elements[this.length() + counter++] = other_lists[i].elements[j];
      }
    }
    this._elements = new_elements;
  }

  public filter(my_function: (a: T) => boolean): MyList<T> {
    const output: MyList<T> = new MyList();
    for (let index = 0; index < this.length(); index++) {
      const current_element: T = this._elements[index];
      if (my_function(current_element)) {
        output.append(new MyList(current_element));
      }
    }
    return output;
  }

  public length(): number {
    return this._elements.length;
  }

  public map(my_function: (a: T) => T): MyList<T> {
    const output: MyList<T> = new MyList();
    for (let index = 0; index < this.length(); index++) {
      const current_element: T = this._elements[index];
      output.append(new MyList<T>(my_function(current_element)));
    }
    return output;
  }

  public reduce(my_function: (a: T, b: T) => T, initial_value: T): T {
    let output: T = initial_value;
    if (this.length() === 0) {
      return output;
    }
    for (let index = 0; index < this.length(); index++) {
      output = my_function(output, this._elements[index]);
    }
    return output;
  }

  public reverse(): MyList<T> {
    const output: MyList<T> = new MyList();
    for (let index = this.length() - 1; index >= 0; index--) {
      const current_element: T = this._elements[index];
      output.append(new MyList<T>(current_element));
    }
    return output;
  }

  public forEach(my_function: (a: T) => T): void {
    const new_elements: T[] = new Array<T>(this.length());
    for (let index = 0; index < this.length(); index++) {
      new_elements[index] = my_function(this._elements[index]);
    }
    this._elements = new_elements;
  }
}
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("MyList class tests", () => {
  it("MyList constructor", () => {
    expect(new MyList()).to.be.instanceof(MyList);
    expect(new MyList()).to.be.instanceof(MyList);
    expect(new MyList(1, 2, 3)).to.be.instanceof(MyList);
    expect(new MyList("hola", "adios", "si", "no")).to.be.instanceof(MyList);
  });

  it("Property elements", () => {
    expect(new MyList().elements).to.be.eql([]);
    expect(new MyList(1, 2, 3).elements).to.be.eql([1, 2, 3]);
    expect(new MyList("hola", "adios", "si", "no").elements).to.be.eql([
      "hola",
      "adios",
      "si",
      "no",
    ]);
  });

  it("Function append string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no"]);
    my_list.append(new MyList("puede"));
    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no", "puede"]);
    my_list.append(new MyList("SI", "NO"));
    expect(my_list.elements).to.be.eql([
      "hola",
      "adios",
      "si",
      "no",
      "puede",
      "SI",
      "NO",
    ]);
  });

  it("Function append number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.elements).to.be.eql([1, 2, 3, 4]);
    my_list.append(new MyList(5));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5]);
    my_list.append(new MyList(6, 7));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5, 6, 7]);
  });

  it("Function append boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false);

    expect(my_list.elements).to.be.eql([true, false]);
    my_list.append(new MyList(true));
    expect(my_list.elements).to.be.eql([true, false, true]);
    my_list.append(new MyList(true, false));
    expect(my_list.elements).to.be.eql([true, false, true, true, false]);
  });

  it("Function concatenate string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no"]);
    my_list.concatenate(new MyList("puede"));
    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no", "puede"]);
    my_list.concatenate(new MyList("SI", "NO"), new MyList("No otra vez"));
    expect(my_list.elements).to.be.eql([
      "hola",
      "adios",
      "si",
      "no",
      "puede",
      "SI",
      "NO",
      "No otra vez",
    ]);
  });

  it("Function concatenate number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.elements).to.be.eql([1, 2, 3, 4]);
    my_list.concatenate(new MyList(5));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5]);
    my_list.concatenate(new MyList(6, 7), new MyList(1, 2, 3, 4));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4]);
  });

  it("Function concatenate boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false);

    expect(my_list.elements).to.be.eql([true, false]);
    my_list.concatenate(new MyList(false));
    expect(my_list.elements).to.be.eql([true, false, false]);
    my_list.concatenate(new MyList(false, true), new MyList(true));
    expect(my_list.elements).to.be.eql([true, false, false, false, true, true]);
  });

  it("Function filter string", () => {
    const my_list: MyList<string> = new MyList(
      "hola",
      "adios",
      "si",
      "no",
      "si",
      "nose",
      "napolitana"
    );

    expect(my_list.filter((a) => a === "si")).to.be.eql(new MyList("si", "si"));
    expect(my_list.filter((a) => a.startsWith("n"))).to.be.eql(
      new MyList("no", "nose", "napolitana")
    );
    expect(my_list.filter((a) => a === "queso")).to.be.eql(new MyList());
  });

  it("Function filter number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 2, 2.5, 4.1, 8, 6);

    expect(my_list.filter((a) => a === 2)).to.be.eql(new MyList(2, 2));
    expect(my_list.filter((a) => a % 2 === 0)).to.be.eql(
      new MyList(2, 2, 8, 6)
    );
    expect(my_list.filter((a) => a === 0)).to.be.eql(new MyList());
  });

  it("Function filter boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, true, false, true, false);

    expect(my_list.filter((a) => a === true)).to.be.eql(
      new MyList(true, true, true)
    );
    expect(my_list.filter((a) => a === false)).to.be.eql(
      new MyList(false, false)
    );
  });

  it("Function length string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.length()).to.be.equal(4);
    my_list.append(new MyList("puede"));
    expect(my_list.length()).to.be.equal(5);
    my_list.append(new MyList("SI", "NO"));
    expect(my_list.length()).to.be.equal(7);
  });

  it("Function length number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.length()).to.be.equal(4);
    my_list.append(new MyList(5));
    expect(my_list.length()).to.be.equal(5);
    my_list.append(new MyList(6, 7));
    expect(my_list.length()).to.be.equal(7);
  });

  it("Function length boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false);

    expect(my_list.length()).to.be.equal(2);
    my_list.append(new MyList(false, true));
    expect(my_list.length()).to.be.equal(4);
    my_list.append(new MyList(true, true, true));
    expect(my_list.length()).to.be.equal(7);
  });

  it("Function map string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(
      my_list.map(function (a) {
        return a + "si";
      })
    ).to.be.eql(new MyList("holasi", "adiossi", "sisi", "nosi"));
    expect(
      my_list.map(function (a) {
        return a.toUpperCase();
      })
    ).to.be.eql(new MyList("HOLA", "ADIOS", "SI", "NO"));
    expect(
      my_list.map(function () {
        return "a";
      })
    ).to.be.eql(new MyList("a", "a", "a", "a"));
  });

  it("Function map number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(
      my_list.map(function (a) {
        return a + 2;
      })
    ).to.be.eql(new MyList(3, 4, 5, 6));
    expect(
      my_list.map(function (a) {
        return a * a;
      })
    ).to.be.eql(new MyList(1, 4, 9, 16));
    expect(
      my_list.map(function () {
        return 0;
      })
    ).to.be.eql(new MyList(0, 0, 0, 0));
  });

  it("Function map boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    expect(
      my_list.map(function (a) {
        return !a;
      })
    ).to.be.eql(new MyList(false, true, false, true));
    expect(
      my_list.map(function () {
        return true;
      })
    ).to.be.eql(new MyList(true, true, true, true));
  });

  it("Function reduce string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(
      my_list.reduce(function (a, b) {
        return a.concat(b);
      }, "")
    ).to.be.equal("holaadiossino");
    expect(
      my_list.reduce(function (a, b) {
        return a.concat(b[0]);
      }, "")
    ).to.be.equal("hasn");
    expect(
      my_list.reduce(function (a, b) {
        return a.concat(b);
      }, "tarta")
    ).to.be.equal("tartaholaadiossino");
    expect(
      new MyList<string>().reduce(function (a, b) {
        return a.concat(b);
      }, "tarta")
    ).to.be.equal("tarta");
  });

  it("Function reduce number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(
      my_list.reduce(function (a, b) {
        return a + b;
      }, 0)
    ).to.be.equal(10);
    expect(
      my_list.reduce(function (a, b) {
        return a * b;
      }, 1)
    ).to.be.equal(24);
    expect(
      my_list.reduce(function (a, b) {
        return a - b;
      }, 10)
    ).to.be.equal(0);
    expect(
      new MyList<number>().reduce(function (a, b) {
        return a - b;
      }, 10)
    ).to.be.equal(10);
  });

  it("Function reduce boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    expect(
      my_list.reduce(function (a, b) {
        return a || b;
      }, true)
    ).to.be.equal(true);
    expect(
      my_list.reduce(function (a, b) {
        return a && b;
      }, false)
    ).to.be.equal(false);
    expect(
      new MyList<boolean>().reduce(function (a, b) {
        return a && b;
      }, true)
    ).to.be.equal(true);
  });

  it("Function reverse string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.reverse()).to.be.eql(
      new MyList("no", "si", "adios", "hola")
    );
    expect(
      my_list
        .map(function (a) {
          return a.toUpperCase();
        })
        .reverse()
    ).to.be.eql(new MyList("NO", "SI", "ADIOS", "HOLA"));
  });

  it("Function reverse number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.reverse()).to.be.eql(new MyList(4, 3, 2, 1));
    expect(
      my_list
        .map(function (a) {
          return a * a;
        })
        .reverse()
    ).to.be.eql(new MyList(16, 9, 4, 1));
  });

  it("Function reverse boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    expect(my_list.reverse()).to.be.eql(new MyList(false, true, false, true));
    expect(
      my_list
        .map(function (a) {
          return !a;
        })
        .reverse()
    ).to.be.eql(new MyList(true, false, true, false));
  });

  it("Function forEach string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    my_list.forEach(function (a) {
      return a + "si";
    });
    expect(my_list).to.be.eql(new MyList("holasi", "adiossi", "sisi", "nosi"));
    my_list.forEach(function (a) {
      return a.toUpperCase();
    });
    expect(my_list).to.be.eql(new MyList("HOLASI", "ADIOSSI", "SISI", "NOSI"));
    my_list.forEach(function () {
      return "a";
    });
    expect(my_list).to.be.eql(new MyList("a", "a", "a", "a"));
  });

  it("Function forEach number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    my_list.forEach(function (a) {
      return a + 2;
    });
    expect(my_list).to.be.eql(new MyList(3, 4, 5, 6));
    my_list.forEach(function (a) {
      return a * a;
    });
    expect(my_list).to.be.eql(new MyList(9, 16, 25, 36));
    my_list.forEach(function () {
      return 0;
    });
    expect(my_list).to.be.eql(new MyList(0, 0, 0, 0));
  });

  it("Function forEach boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    my_list.forEach(function (a) {
      return !a;
    });
    expect(my_list).to.be.eql(new MyList(false, true, false, true));
    my_list.forEach(function () {
      return true;
    });
    expect(my_list).to.be.eql(new MyList(true, true, true, true));
  });
});
```

### 3. Ampliando la biblioteca musical

Este ejercicio trata de extender la biblioteca musical creada en la [práctica 5](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct05-objects-classes-interfaces-alu0101239187/). Para esto tenemos que añadir nuevas clases a la estructura de clases ya creada, añadiendo una nueva clase `Single` que defina los singles de la librería. Por tanto, se tratarán únicamente las clases que hayan sido modificadas debido a este cambio.

#### Clase Single

La nueva clase `Single` representa un single, por lo que tiene una única canción. Esta clase tiene atributos para guardar el nombre del single, el nombre del artista, el año de publicación, la canción y las versiones de esta. Todos sus atributos son privados para controlar lo que se muestra y modifica de la clase, como en el caso del año de publicación que solo puede ser un entero positivo.

```typescript
export class Single {
  private _versions: string[];
  
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
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Single class tests", () => {
  const single1: Single = new Single(
    "Partiendo la Pana",
    "Estopa",
    2002,
    new Song(
      "Partiendo la Pana",
      "Partiendo la Pana",
      150,
      ["Rock español"],
      200
    ),
    ["Original", "Acústico"]
  );
  const single2: Single = new Single(
    "El Polvorete",
    "Pepe Benavente",
    2009,
    new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
  );

  it("Single constructor", () => {
    expect(single1).to.be.instanceof(Single);
    expect(single2).to.be.instanceof(Single);
    expect(
      () =>
        new Single(
          "Master of Puppets",
          "Metallica",
          -1,
          new Song(
            "Master of Puppets",
            "Master of Puppets",
            500,
            ["Rock", "Metal"],
            1000
          )
        )
    ).to.throw("El año de publicación debe ser un entero positivo.");
    expect(
      expect(
        () =>
          new Single(
            "Master of Puppets",
            "Metallica",
            2.5,
            new Song(
              "Master of Puppets",
              "Master of Puppets",
              500,
              ["Rock", "Metal"],
              1000
            )
          )
      ).to.throw("El año de publicación debe ser un entero positivo.")
    );
  });

  it("Property name", () => {
    expect(single1.name).to.be.equal("Partiendo la Pana");
    expect(single2.name).to.be.equal("El Polvorete");
    single1.name = "Graduation";
    expect(single1.name).to.be.equal("Graduation");
  });

  it("Property artist", () => {
    expect(single1.artist).to.be.equal("Estopa");
    expect(single2.artist).to.be.equal("Pepe Benavente");
    single1.artist = "Pink Floyd";
    expect(single1.artist).to.be.equal("Pink Floyd");
  });

  it("Property publication year", () => {
    expect(single1.publication_year).to.be.equal(2002);
    expect(single2.publication_year).to.be.equal(2009);
    single1.publication_year = 2001;
    expect(single1.publication_year).to.be.equal(2001);
    expect(() => (single2.publication_year = -1)).to.throw(
      "El año de publicación debe ser un entero positivo."
    );
    expect(() => (single2.publication_year = 2000.5)).to.throw(
      "El año de publicación debe ser un entero positivo."
    );
  });

  it("Property song", () => {
    expect(single1.song).to.be.eql(
      new Song(
        "Partiendo la Pana",
        "Partiendo la Pana",
        150,
        ["Rock español"],
        200
      )
    );
    expect(single2.song).to.be.eql(
      new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
    );
    single1.song = new Song(
      "Enter Sandman",
      single1.name,
      350,
      ["Metal"],
      12000
    );
    expect(single1.song).to.be.eql(
      new Song("Enter Sandman", single1.name, 350, ["Metal"], 12000)
    );
  });

  it("Property versions", () => {
    expect(single1.versions).to.be.eql(["Original", "Acústico"]);
    expect(single2.versions).to.be.eql(["Original"]);
    single1.versions = ["Remix"];
    expect(single1.versions).to.be.eql(["Remix"]);
  });
});
```

#### Clase genérica Discography

La clase genérica `Discography` representa la discografía de un artista y puede estar formada por discos, singles o ambos. Esta clase contiene un array genérico en el que almacenará los álbumes. Todos sus atributos son privados para que no se puedan modificar directamente los atributos de la clase.

```typescript
export class Discography<D extends Disc, S extends Single> {
  private _elements: (D | S)[];

  constructor(...elements: (D | S)[]) {
    this._elements = elements;
  }

  get elements() {
    return this._elements;
  }

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

  public get(index: number): D | S | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._elements[index];
  }

  public remove(index: number): D | S | undefined {
    if (index < 0 || index >= this.length() || index % 1 !== 0) {
      return undefined;
    }
    return this._elements.splice(index, 1)[0];
  }

  public length(): number {
    return this._elements.length;
  }
}
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Discography class tests", () => {
  const discography: Discography<Disc, Single> = new Discography();

  it("Discography constructor", () => {
    expect(discography).to.be.instanceof(Discography<Disc, Single>);
    expect(
      new Discography(
        new Disc("Graduation", "Kanye West", 2007, []),
        new Single(
          "Yeezus",
          "Kanye West",
          2013,
          new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
          ["Original", "Remix"]
        ),
        new Disc("The Life of Pablo", "Kanye West", 2016, []),
        new Disc("Donda", "Kanye West", 2021, [])
      )
    ).to.be.instanceof(Discography);
  });

  it("Function add", () => {
    expect(discography.elements).to.be.eql([]);
    expect(discography.add(new Disc("Graduation", "Kanye West", 2007, []))).to
      .be.true;
    expect(discography.elements).to.be.eql([
      new Disc("Graduation", "Kanye West", 2007, []),
    ]);
    expect(
      discography.add(
        new Single(
          "Yeezus",
          "Kanye West",
          2013,
          new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
          ["Original", "Remix"]
        )
      )
    ).to.be.true;
    expect(discography.elements).to.be.eql([
      new Disc("Graduation", "Kanye West", 2007, []),
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      ),
    ]);
    expect(discography.add(new Disc("Graduation", "Kanye West", 2007, []))).to
      .be.false;
  });

  it("Function get", () => {
    expect(discography.get(0)).to.be.eql(
      new Disc("Graduation", "Kanye West", 2007, [])
    );
    expect(discography.get(1)).to.be.eql(
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      )
    );
    expect(discography.get(5)).to.be.undefined;
    expect(discography.get(-1)).to.be.undefined;
    expect(discography.get(2.5)).to.be.undefined;
  });

  it("Function remove", () => {
    expect(discography.remove(1)).to.be.eql(
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      )
    );
    expect(discography.elements).to.be.eql([
      new Disc("Graduation", "Kanye West", 2007, []),
    ]);
    expect(discography.remove(0)).to.be.eql(
      new Disc("Graduation", "Kanye West", 2007, [])
    );
    expect(discography.elements).to.be.eql([]);
    expect(discography.remove(3)).to.be.undefined;
    expect(discography.remove(-1)).to.be.undefined;
    expect(discography.remove(2.5)).to.be.undefined;
  });

  it("Function length", () => {
    expect(discography.length()).to.be.equal(0);
    discography.add(new Disc("Graduation", "Kanye West", 2007, []));
    discography.add(
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      )
    );
    expect(discography.length()).to.be.equal(2);
  });
});
```

#### Clase Artist

La clase `Artist` ha sido modificada, sustituyendo el arrays de discos que tenía previamente por la nueva clase `Discography` para almacenar la discografía del artista.

```typescript
export class Artist {
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
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Artist class tests", () => {
  const discography: Discography<Disc, Single> = new Discography(
    new Disc("Graduation", "Kanye West", 2007, []),
    new Disc("Yeezus", "Kanye West", 2013, []),
    new Disc("The Life of Pablo", "Kanye West", 2016, []),
    new Disc("Donda", "Kanye West", 2021, [])
  );
  const artist1: Artist = new Artist("Kanye West", 500, discography);
  const artist2: Artist = new Artist("Estopa", 50000, new Discography());

  it("Artist constructor", () => {
    expect(artist1).to.be.instanceof(Artist);
    expect(artist2).to.be.instanceof(Artist);
    expect(() => new Artist("Estopa", -1, new Discography())).to.throw(
      "El número de oyentes mensuales debe ser un entero positivo."
    );
    expect(() => new Artist("Estopa", 2.5, new Discography())).to.throw(
      "El número de oyentes mensuales debe ser un entero positivo."
    );
  });

  it("Property name", () => {
    expect(artist1.name).to.be.equal("Kanye West");
    expect(artist2.name).to.be.equal("Estopa");
    artist1.name = "Pedro";
    expect(artist1.name).to.be.equal("Pedro");
  });

  it("Property monthly listeners", () => {
    expect(artist1.monthly_listeners).to.be.equal(500);
    expect(artist2.monthly_listeners).to.be.equal(50000);
    artist1.monthly_listeners = 2000;
    expect(artist1.monthly_listeners).to.be.equal(2000);
    expect(() => (artist2.monthly_listeners = -1)).to.throw(
      "El número de oyentes mensuales debe ser un entero positivo."
    );
    expect(() => (artist2.monthly_listeners = 2.5)).to.throw(
      "El número de oyentes mensuales debe ser un entero positivo."
    );
  });

  it("Property discography", () => {
    expect(artist1.discography).to.be.eql(
      new Discography(
        new Disc("Graduation", "Kanye West", 2007, []),
        new Disc("Yeezus", "Kanye West", 2013, []),
        new Disc("The Life of Pablo", "Kanye West", 2016, []),
        new Disc("Donda", "Kanye West", 2021, [])
      )
    );
    expect(artist2.discography).to.be.eql(new Discography());
    artist1.discography = new Discography(
      new Disc("The Dark Side of the Moon", artist1.name, 1973, [])
    );
    expect(artist1.discography).to.be.eql(
      new Discography(
        new Disc("The Dark Side of the Moon", artist1.name, 1973, [])
      )
    );
  });
});
```

#### Clase Solist

La clase `Solist` ha sido modificada para permitir aplicar la herencia respecto a la clase `Artist`.

```typescript
export class Solist extends Artist {
  constructor(
    _name: string,
    _monthly_listeners: number,
    _discography: Discography<Disc, Single>,
    private _voice_type: VoiceTypes
  ) {
    super(_name, _monthly_listeners, _discography);
  }

  get voice_type() {
    return this._voice_type;
  }

  set voice_type(voice_type: VoiceTypes) {
    this._voice_type = voice_type;
  }
}
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Solist class tests", () => {
  const discography: Discography<Disc, Single> = new Discography(
    new Disc("Graduation", "Kanye West", 2007, []),
    new Disc("Yeezus", "Kanye West", 2013, []),
    new Disc("The Life of Pablo", "Kanye West", 2016, []),
    new Disc("Donda", "Kanye West", 2021, [])
  );
  const artist1: Solist = new Solist(
    "Kanye West",
    500,
    discography,
    VoiceTypes.COUNTERTENOR
  );
  const artist2: Solist = new Solist(
    "Pepe Benavente",
    200000,
    new Discography(),
    VoiceTypes.TENOR
  );

  it("Solist constructor", () => {
    expect(artist1).to.be.instanceof(Solist);
    expect(artist1).to.be.instanceof(Artist);
    expect(artist2).to.be.instanceof(Solist);
    expect(artist1).to.be.instanceof(Artist);
  });

  it("Property voice_type", () => {
    expect(artist1.voice_type).to.be.equal(VoiceTypes.COUNTERTENOR);
    expect(artist2.voice_type).to.be.equal(VoiceTypes.TENOR);
    artist1.voice_type = VoiceTypes.BASS;
    expect(artist1.voice_type).to.be.equal(VoiceTypes.BASS);
  });
});
```

#### Clase Group

La clase `Group` ha sido modificada para permitir aplicar la herencia respecto a la clase `Artist`.

```typescript
export class Group extends Artist {
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
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("Group class tests", () => {
  const discography: Discography<Disc, Single> = new Discography(
    new Disc("Master of Puppets", "Metallica", 1986, []),
    new Disc("Metallica", "Metallica", 1991, []),
    new Disc("Death Magnetic", "Metallica", 2008, [])
  );
  const group1: Group = new Group("Metallica", 10, discography, 4);
  const group2: Group = new Group("Estopa", 50000, new Discography(), 2);

  it("Group constructor", () => {
    expect(group1).to.be.instanceof(Group);
    expect(group1).to.be.instanceof(Artist);
    expect(group2).to.be.instanceof(Group);
    expect(group1).to.be.instanceof(Artist);
    expect(() => new Group("Estopa", 50000, new Discography(), -1)).to.throw(
      "El número de miembros debe ser un entero positivo."
    );
    expect(() => new Group("Estopa", 50000, new Discography(), 2.5)).to.throw(
      "El número de miembros debe ser un entero positivo."
    );
  });

  it("Property number of members", () => {
    expect(group1.number_of_members).to.be.equal(4);
    expect(group2.number_of_members).to.be.equal(2);
    group1.number_of_members = 10;
    expect(group1.number_of_members).to.be.equal(10);
    expect(() => (group2.number_of_members = -1)).to.throw(
      "El número de miembros debe ser un entero positivo."
    );
    expect(() => (group2.number_of_members = 2.5)).to.throw(
      "El número de miembros debe ser un entero positivo."
    );
  });
});
```

#### Clase MusicLibrary

La siguiente clase a tratar es la clase `MusicLibrary`, cuyos métodos han sido modificados para poder funcionar con la nueva clase `Discography` y tanto con la clase `Single` como con la clase `Disc`.

```typescript
export class MusicLibrary {
  constructor(private _artists: Artist[]) {}

  get artists() {
    return this._artists;
  }

  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  public addAlbum(artist_name: string, album: Disc | Single): void {
    this.artists.forEach(function (artist) {
      if (artist.name === artist_name) {
        artist.discography.add(album);
      }
    });
  }

  public addSong(artist_name: string, album_name: string, song: Song): void {
    this.artists.forEach(function (artist) {
      if (artist.name === artist_name) {
        for (let index = 0; index < artist.discography.length(); index++) {
          const element = artist.discography.get(index);
          if (element instanceof Disc) {
            if (element.name === album_name) {
              element.songs.push(song);
            }
          } else if (element instanceof Single) {
            if (element.name === album_name) {
              element.song = song;
            }
          }
        }
      }
    });
  }

  public showArtists(): Artist[] {
    console.table(this.artists);
    return this.artists;
  }

  public showAlbums(): (Disc | Single | undefined)[] {
    const elements: (Disc | Single | undefined)[] = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        elements.push(artist.discography.get(index));
      }
    });
    console.table(elements);
    return elements;
  }

  public showSongs(): Song[] {
    const songs: Song[] | undefined = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        const element = artist.discography.get(index);
        if (element instanceof Disc) {
          element.songs.forEach((song) => songs.push(song));
        } else if (typeof element !== "undefined") {
          songs.push(element.song);
        }
      }
    });
    console.table(songs);
    return songs;
  }

  public searchArtists(artist_search: string): Artist[] {
    const result: Artist[] = this.artists.filter(function (artist) {
      return artist.name.toUpperCase().startsWith(artist_search.toUpperCase());
    });
    console.table(result);
    return result;
  }

  public searchAlbums(album_search: string): (Disc | Single | undefined)[] {
    const result: (Disc | Single | undefined)[] = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        const element = artist.discography.get(index);
        if (typeof element !== "undefined") {
          if (
            element.name.toUpperCase().startsWith(album_search.toUpperCase())
          ) {
            result.push(element);
          }
        }
      }
    });
    console.table(result);
    return result;
  }

  public searchSongs(song_search: string): Song[] {
    const result: Song[] | undefined = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        const element = artist.discography.get(index);
        if (element instanceof Disc) {
          element.songs.forEach(function (song) {
            if (song.name.toUpperCase().startsWith(song_search.toUpperCase())) {
              result.push(song);
            }
          });
        } else if (typeof element !== "undefined") {
          if (
            element.song.name
              .toUpperCase()
              .startsWith(song_search.toUpperCase())
          ) {
            result.push(element.song);
          }
        }
      }
    });
    console.table(result);
    return result;
  }

  public countSongs(disc_search: string): number {
    const elements: (Disc | Single | undefined)[] =
      this.searchAlbums(disc_search);
    if (elements.length === 0) {
      return 0;
    }
    if (elements[0] instanceof Disc) {
      return elements[0].songs.length;
    } else {
      return 1;
    }
  }

  public getDuration(disc_search: string): number {
    const elements: (Disc | Single | undefined)[] =
      this.searchAlbums(disc_search);
    let duration = 0;
    if (elements[0] instanceof Disc) {
      elements[0].songs.forEach((song) => (duration += song.duration));
    } else if (typeof elements[0] !== "undefined") {
      duration = elements[0].song.duration;
    }
    return duration;
  }

  public getReproductions(disc_search: string): number {
    const elements: (Disc | Single | undefined)[] =
      this.searchAlbums(disc_search);
    let reproductions = 0;
    if (elements[0] instanceof Disc) {
      elements[0].songs.forEach(
        (song) => (reproductions += song.reproductions_number)
      );
    } else if (typeof elements[0] !== "undefined") {
      reproductions = elements[0].song.reproductions_number;
    }
    return reproductions;
  }
}
```

Las pruebas para probar la clase son las siguientes:

```typescript
describe("MusicLibrary class tests", () => {
  it("Music library constructor", () => {
    expect(new MusicLibrary([])).to.be.instanceof(MusicLibrary);
    expect(
      new MusicLibrary([
        new Group("Estopa", 50000, new Discography(), 2),
        new Solist(
          "Pepe Benavente",
          200000,
          new Discography(),
          VoiceTypes.TENOR
        ),
      ])
    ).to.be.instanceof(MusicLibrary);
  });

  it("Function addArtist", () => {
    const music_library: MusicLibrary = new MusicLibrary([]);
    music_library.addArtist(new Group("Estopa", 50000, new Discography(), 2));
    expect(music_library.artists[0]).to.be.eql(
      new Group("Estopa", 50000, new Discography(), 2)
    );
    music_library.addArtist(
      new Solist("Pepe Benavente", 200000, new Discography(), VoiceTypes.TENOR)
    );
    expect(music_library.artists[1]).to.be.eql(
      new Solist("Pepe Benavente", 200000, new Discography(), VoiceTypes.TENOR)
    );
  });

  it("Function addDisc", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group("Estopa", 50000, new Discography(), 2),
      new Solist("Pepe Benavente", 200000, new Discography(), VoiceTypes.TENOR),
    ]);
    music_library.addAlbum(
      "Estopa",
      new Disc("Destrangis", "Estopa", 2001, [])
    );
    expect(music_library.artists[0]).to.be.eql(
      new Group(
        "Estopa",
        50000,
        new Discography(new Disc("Destrangis", "Estopa", 2001, [])),
        2
      )
    );
    expect(music_library.artists[0].discography.get(0)).to.be.eql(
      new Disc("Destrangis", "Estopa", 2001, [])
    );
    music_library.addAlbum(
      "Pepe Benavente",
      new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [])
    );
    expect(music_library.artists[1]).to.be.eql(
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [])),
        VoiceTypes.TENOR
      )
    );
    expect(music_library.artists[1].discography.get(0)).to.be.eql(
      new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [])
    );
  });

  it("Function addSong", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(new Disc("Destrangis", "Estopa", 2001, [])),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, []),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    music_library.addSong(
      "Estopa",
      "Destrangis",
      new Song("Vino Tinto", "Destrangis", 199, ["Pop", "Rock español"], 50000)
    );
    expect(music_library.artists[0]).to.be.eql(
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      )
    );
    expect(music_library.artists[0].discography.get(0)).to.be.eql(
      new Disc("Destrangis", "Estopa", 2001, [
        new Song(
          "Vino Tinto",
          "Destrangis",
          199,
          ["Pop", "Rock español"],
          50000
        ),
      ])
    );
    music_library.addSong(
      "Pepe Benavente",
      "Grandes Éxitos",
      new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000)
    );
    expect(music_library.artists[1]).to.be.eql(
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
          )
        ),
        VoiceTypes.TENOR
      )
    );
    music_library.addSong(
      "Pepe Benavente",
      "El Polvorete",
      new Song("Tarta", "El Polvorete", 217, ["Verbena"], 200000)
    );
    expect(music_library.artists[1]).to.be.eql(
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("Tarta", "El Polvorete", 217, ["Verbena"], 200000)
          )
        ),
        VoiceTypes.TENOR
      )
    );
    expect(music_library.artists[1].discography.get(0)).to.be.eql(
      new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
        new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      ])
    );
    music_library.addSong(
      "Metallica",
      "Grandes Éxitos",
      new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000)
    );
    expect(music_library.artists).to.be.eql([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("Tarta", "El Polvorete", 217, ["Verbena"], 200000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    music_library.addSong(
      "Pepe Benavente",
      "Si",
      new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000)
    );
    expect(music_library.artists).to.be.eql([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("Tarta", "El Polvorete", 217, ["Verbena"], 200000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
  });

  it("Function showArtists", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.showArtists()).to.be.eql([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
  });

  it("Function showDiscs", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.showAlbums()).to.be.eql([
      new Disc("Destrangis", "Estopa", 2001, [
        new Song(
          "Vino Tinto",
          "Destrangis",
          199,
          ["Pop", "Rock español"],
          50000
        ),
      ]),
      new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
        new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      ]),
    ]);
  });

  it("Function showSongs", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("Tarta", "El Polvorete", 217, ["Verbena"], 200000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.showSongs()).to.be.eql([
      new Song("Vino Tinto", "Destrangis", 199, ["Pop", "Rock español"], 50000),
      new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      new Song("Tarta", "El Polvorete", 217, ["Verbena"], 200000),
    ]);
  });

  it("Function searchArtists", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.searchArtists("Estopa")).to.be.eql([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
    ]);
    expect(music_library.searchArtists("Pepe Benavente")).to.be.eql([
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.searchArtists("estopa")).to.be.eql([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
    ]);
    expect(music_library.searchArtists("Pepe")).to.be.eql([
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.searchArtists("si")).to.be.eql([]);
  });

  it("Function searchDiscs", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ])
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.searchAlbums("Destrangis")).to.be.eql([
      new Disc("Destrangis", "Estopa", 2001, [
        new Song(
          "Vino Tinto",
          "Destrangis",
          199,
          ["Pop", "Rock español"],
          50000
        ),
      ]),
    ]);
    expect(music_library.searchAlbums("Grandes Éxitos")).to.be.eql([
      new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
        new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      ]),
    ]);
    expect(music_library.searchAlbums("destrangis")).to.be.eql([
      new Disc("Destrangis", "Estopa", 2001, [
        new Song(
          "Vino Tinto",
          "Destrangis",
          199,
          ["Pop", "Rock español"],
          50000
        ),
      ]),
    ]);
    expect(music_library.searchAlbums("grandes")).to.be.eql([
      new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
        new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      ]),
    ]);
    expect(music_library.searchAlbums("si")).to.be.eql([]);
  });

  it("Function searchSongs", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
            new Song(
              "El de Prueba",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.searchSongs("Vino Tinto")).to.be.eql([
      new Song("Vino Tinto", "Destrangis", 199, ["Pop", "Rock español"], 50000),
    ]);
    expect(music_library.searchSongs("El Polvorete")).to.be.eql([
      new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000),
    ]);
    expect(music_library.searchSongs("vino")).to.be.eql([
      new Song("Vino Tinto", "Destrangis", 199, ["Pop", "Rock español"], 50000),
    ]);
    expect(music_library.searchSongs("el")).to.be.eql([
      new Song("El Polvorete", "Grandes Éxitos", 217, ["Verbena"], 200000),
      new Song("El de Prueba", "Grandes Éxitos", 217, ["Verbena"], 200000),
      new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000),
    ]);
    expect(music_library.searchSongs("si")).to.be.eql([]);
  });

  it("Function countSongs", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
            new Song(
              "El de Prueba",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.countSongs("Destrangis")).to.be.equal(1);
    expect(music_library.countSongs("Grandes Éxitos")).to.be.equal(2);
    expect(music_library.countSongs("El Polvorete")).to.be.equal(1);
    expect(music_library.countSongs("si")).to.be.equal(0);
  });

  it("Function getDuration", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
            new Song(
              "El de Prueba",
              "Grandes Éxitos",
              222,
              ["Verbena"],
              200000
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.getDuration("Destrangis")).to.be.equal(199);
    expect(music_library.getDuration("Grandes Éxitos")).to.be.equal(439);
    expect(music_library.getDuration("El Polvorete")).to.be.equal(230);
    expect(music_library.getDuration("si")).to.be.equal(0);
  });

  it("Function getReproductions", () => {
    const music_library: MusicLibrary = new MusicLibrary([
      new Group(
        "Estopa",
        50000,
        new Discography(
          new Disc("Destrangis", "Estopa", 2001, [
            new Song(
              "Vino Tinto",
              "Destrangis",
              199,
              ["Pop", "Rock español"],
              50000
            ),
          ])
        ),
        2
      ),
      new Solist(
        "Pepe Benavente",
        200000,
        new Discography(
          new Disc("Grandes Éxitos", "Pepe Benavente", 2009, [
            new Song(
              "El Polvorete",
              "Grandes Éxitos",
              217,
              ["Verbena"],
              200000
            ),
            new Song(
              "El de Prueba",
              "Grandes Éxitos",
              222,
              ["Verbena"],
              200001
            ),
          ]),
          new Single(
            "El Polvorete",
            "Pepe Benavente",
            2009,
            new Song("El Polvorete", "El Polvorete", 230, ["Verbena"], 5000)
          )
        ),
        VoiceTypes.TENOR
      ),
    ]);
    expect(music_library.getReproductions("Destrangis")).to.be.equal(50000);
    expect(music_library.getReproductions("Grandes Éxitos")).to.be.equal(
      400001
    );
    expect(music_library.getReproductions("El Polvorete")).to.be.equal(5000);
    expect(music_library.getReproductions("si")).to.be.equal(0);
  });
});
```
