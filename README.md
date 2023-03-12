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
import "mocha";
import { expect } from "chai";
import { Serie } from "../../src/ejercicio-1/serie";

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
