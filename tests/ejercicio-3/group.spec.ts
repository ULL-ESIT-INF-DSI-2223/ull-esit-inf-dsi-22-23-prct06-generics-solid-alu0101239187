import "mocha";
import { expect } from "chai";
import { Artist } from "../../src/ejercicio-3/artist";
import { Group } from "../../src/ejercicio-3/group";
import { Disc } from "../../src/ejercicio-3/disc";
import { Discography } from "../../src/ejercicio-3/discography";
import { Single } from "../../src/ejercicio-3/single";

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
