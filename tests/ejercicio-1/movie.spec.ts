import "mocha";
import { expect } from "chai";
import { Movie } from "../../src/ejercicio-1/movie";

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
