import "mocha";
import { expect } from "chai";
import { Song } from "../../src/ejercicio-3/song";

describe("Song class tests", () => {
  const song1: Song = new Song(
    "Wolves",
    "The Life of Pablo",
    239,
    ["Hip hop"],
    1567
  );
  const song2: Song = new Song(
    "Pt. 2",
    "The Life of Pablo",
    129,
    ["Hip hop", "Trap"],
    200
  );

  it("Song constructor", () => {
    expect(song1).to.be.instanceof(Song);
    expect(song2).to.be.instanceof(Song);
    expect(
      () => new Song("Pt. 2", "The Life of Pablo", -1, ["Hip hop", "Trap"], 200)
    ).to.throw("La duración debe ser un número entero positivo.");
    expect(
      () =>
        new Song("Pt. 2", "The Life of Pablo", 2.5, ["Hip hop", "Trap"], 200)
    ).to.throw("La duración debe ser un número entero positivo.");
    expect(
      () => new Song("Pt. 2", "The Life of Pablo", 129, ["Hip hop", "Trap"], -1)
    ).to.throw("El número de reproducciones debe ser un entero positivo.");
    expect(
      () =>
        new Song("Pt. 2", "The Life of Pablo", 129, ["Hip hop", "Trap"], 2.5)
    ).to.throw("El número de reproducciones debe ser un entero positivo.");
  });

  it("Property name", () => {
    expect(song1.name).to.be.equal("Wolves");
    expect(song2.name).to.be.equal("Pt. 2");
    song1.name = "Enter Sandman";
    expect(song1.name).to.be.equal("Enter Sandman");
  });

  it("Property album", () => {
    expect(song1.album).to.be.equal("The Life of Pablo");
    expect(song2.album).to.be.equal("The Life of Pablo");
    song1.album = "Graduation";
    expect(song1.album).to.be.equal("Graduation");
  });

  it("Property duration", () => {
    expect(song1.duration).to.be.equal(239);
    expect(song2.duration).to.be.equal(129);
    song1.duration = 300;
    expect(song1.duration).to.be.equal(300);
    expect(() => (song2.duration = -1)).to.throw(
      "La duración debe ser un número entero positivo."
    );
    expect(() => (song2.duration = 2.5)).to.throw(
      "La duración debe ser un número entero positivo."
    );
  });

  it("Property genres", () => {
    expect(song1.genres).to.be.eql(["Hip hop"]);
    expect(song2.genres).to.be.eql(["Hip hop", "Trap"]);
    song1.genres = ["Rock"];
    expect(song1.genres).to.be.eql(["Rock"]);
  });

  it("Property number of reproductions", () => {
    expect(song1.reproductions_number).to.be.equal(1567);
    expect(song2.reproductions_number).to.be.equal(200);
    song1.reproductions_number = 2000;
    expect(song1.reproductions_number).to.be.equal(2000);
    expect(() => (song2.reproductions_number = -1)).to.throw(
      "El número de reproducciones debe ser un entero positivo."
    );
    expect(() => (song2.reproductions_number = 2.5)).to.throw(
      "El número de reproducciones debe ser un entero positivo."
    );
  });
});
