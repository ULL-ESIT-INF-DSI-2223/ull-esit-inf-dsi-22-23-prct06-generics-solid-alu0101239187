import "mocha";
import { expect } from "chai";
import { Single } from "../../src/ejercicio-3/single";
import { Song } from "../../src/ejercicio-3/song";

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
