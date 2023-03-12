import "mocha";
import { expect } from "chai";
import { Disc } from "../../src/ejercicio-3/disc";
import { Song } from "../../src/ejercicio-3/song";

describe("Disc class tests", () => {
  const songs: Song[] = [
    new Song(
      "Real Friends",
      "The Life of Pablo",
      251,
      ["Hip hop", "Cloud rap"],
      23
    ),
    new Song("Wolves", "The Life of Pablo", 239, ["Hip hop"], 1567),
    new Song("Pt. 2", "The Life of Pablo", 129, ["Hip hop", "Trap"], 200),
    new Song(
      "Father Stretch My Hands Pt. 1",
      "The Life of Pablo",
      135,
      ["Rap"],
      15000
    ),
  ];
  const disc1: Disc = new Disc("The Life of Pablo", "Kanye West", 2016, songs);
  const disc2: Disc = new Disc("Master of Puppets", "Metallica", 1986, []);

  it("Disc constructor", () => {
    expect(disc1).to.be.instanceof(Disc);
    expect(disc2).to.be.instanceof(Disc);
    expect(() => new Disc("Master of Puppets", "Metallica", -1, [])).to.throw(
      "El año de publicación debe ser un entero positivo."
    );
    expect(
      () => new Disc("Master of Puppets", "Metallica", 1986.5, [])
    ).to.throw("El año de publicación debe ser un entero positivo.");
  });

  it("Property name", () => {
    expect(disc1.name).to.be.equal("The Life of Pablo");
    expect(disc2.name).to.be.equal("Master of Puppets");
    disc1.name = "Graduation";
    expect(disc1.name).to.be.equal("Graduation");
  });

  it("Property artist", () => {
    expect(disc1.artist).to.be.equal("Kanye West");
    expect(disc2.artist).to.be.equal("Metallica");
    disc1.artist = "Pink Floyd";
    expect(disc1.artist).to.be.equal("Pink Floyd");
  });

  it("Property publication year", () => {
    expect(disc1.publication_year).to.be.equal(2016);
    expect(disc2.publication_year).to.be.equal(1986);
    disc1.publication_year = 2001;
    expect(disc1.publication_year).to.be.equal(2001);
    expect(() => (disc2.publication_year = -1)).to.throw(
      "El año de publicación debe ser un entero positivo."
    );
    expect(() => (disc2.publication_year = 2000.5)).to.throw(
      "El año de publicación debe ser un entero positivo."
    );
  });

  it("Property songs", () => {
    expect(disc1.songs).to.be.eql([
      new Song(
        "Real Friends",
        "The Life of Pablo",
        251,
        ["Hip hop", "Cloud rap"],
        23
      ),
      new Song("Wolves", "The Life of Pablo", 239, ["Hip hop"], 1567),
      new Song("Pt. 2", "The Life of Pablo", 129, ["Hip hop", "Trap"], 200),
      new Song(
        "Father Stretch My Hands Pt. 1",
        "The Life of Pablo",
        135,
        ["Rap"],
        15000
      ),
    ]);
    expect(disc2.songs).to.be.eql([]);
    disc1.songs = [
      new Song("Enter Sandman", disc1.name, 350, ["Metal"], 12000),
    ];
    expect(disc1.songs).to.be.eql([
      new Song("Enter Sandman", disc1.name, 350, ["Metal"], 12000),
    ]);
  });
});
