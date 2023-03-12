import "mocha";
import { expect } from "chai";
import { MusicLibrary } from "../../src/ejercicio-3/music_library";
import { Group } from "../../src/ejercicio-3/group";
import { Solist, VoiceTypes } from "../../src/ejercicio-3/solist";
import { Disc } from "../../src/ejercicio-3/disc";
import { Song } from "../../src/ejercicio-3/song";
import { Discography } from "../../src/ejercicio-3/discography";
import { Single } from "../../src/ejercicio-3/single";

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
