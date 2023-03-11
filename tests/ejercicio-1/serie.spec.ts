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
