import "mocha";
import { expect } from "chai";
import { Artist } from "../../src/ejercicio-3/artist";
import { VoiceTypes, Solist } from "../../src/ejercicio-3/solist";
import { Disc } from "../../src/ejercicio-3/disc";
import { Discography } from "../../src/ejercicio-3/discography";
import { Single } from "../../src/ejercicio-3/single";

describe("Solist class tests", () => {
  const discography: Discography<Disc, Single> = new Discography(
    new Disc("Graduation", "Kanye West", 2007, []),
    new Disc("Yeezus", "Kanye West", 2013, []),
    new Disc("The Life of Pablo", "Kanye West", 2016, []),
    new Disc("Donda", "Kanye West", 2021, [])
  );
  const artist1: Solist = new Solist(
    "Kanye West",
    500,
    discography,
    VoiceTypes.COUNTERTENOR
  );
  const artist2: Solist = new Solist(
    "Pepe Benavente",
    200000,
    new Discography(),
    VoiceTypes.TENOR
  );

  it("Solist constructor", () => {
    expect(artist1).to.be.instanceof(Solist);
    expect(artist1).to.be.instanceof(Artist);
    expect(artist2).to.be.instanceof(Solist);
    expect(artist1).to.be.instanceof(Artist);
  });

  it("Property voice_type", () => {
    expect(artist1.voice_type).to.be.equal(VoiceTypes.COUNTERTENOR);
    expect(artist2.voice_type).to.be.equal(VoiceTypes.TENOR);
    artist1.voice_type = VoiceTypes.BASS;
    expect(artist1.voice_type).to.be.equal(VoiceTypes.BASS);
  });
});
