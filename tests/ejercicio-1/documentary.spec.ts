import "mocha";
import { expect } from "chai";
import { Documentary } from "../../src/ejercicio-1/documentary";

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
