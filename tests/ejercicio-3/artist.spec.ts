import "mocha";
import { expect } from "chai";
import { Artist } from "../../src/ejercicio-3/artist";
import { Disc } from "../../src/ejercicio-3/disc";
import { Discography } from "../../src/ejercicio-3/discography";
import { Single } from "../../src/ejercicio-3/single";

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
