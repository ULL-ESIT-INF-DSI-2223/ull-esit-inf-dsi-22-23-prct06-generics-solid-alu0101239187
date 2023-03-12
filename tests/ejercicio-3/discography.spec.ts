import "mocha";
import { expect } from "chai";
import { Discography } from "../../src/ejercicio-3/discography";
import { Disc } from "../../src/ejercicio-3/disc";
import { Single } from "../../src/ejercicio-3/single";
import { Song } from "../../src/ejercicio-3/song";

describe("Discography class tests", () => {
  const discography: Discography<Disc, Single> = new Discography();

  it("Discography constructor", () => {
    expect(discography).to.be.instanceof(Discography<Disc, Single>);
    expect(
      new Discography(
        new Disc("Graduation", "Kanye West", 2007, []),
        new Single(
          "Yeezus",
          "Kanye West",
          2013,
          new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
          ["Original", "Remix"]
        ),
        new Disc("The Life of Pablo", "Kanye West", 2016, []),
        new Disc("Donda", "Kanye West", 2021, [])
      )
    ).to.be.instanceof(Discography);
  });

  it("Function add", () => {
    expect(discography.elements).to.be.eql([]);
    expect(discography.add(new Disc("Graduation", "Kanye West", 2007, []))).to
      .be.true;
    expect(discography.elements).to.be.eql([
      new Disc("Graduation", "Kanye West", 2007, []),
    ]);
    expect(
      discography.add(
        new Single(
          "Yeezus",
          "Kanye West",
          2013,
          new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
          ["Original", "Remix"]
        )
      )
    ).to.be.true;
    expect(discography.elements).to.be.eql([
      new Disc("Graduation", "Kanye West", 2007, []),
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      ),
    ]);
    expect(discography.add(new Disc("Graduation", "Kanye West", 2007, []))).to
      .be.false;
  });

  it("Function get", () => {
    expect(discography.get(0)).to.be.eql(
      new Disc("Graduation", "Kanye West", 2007, [])
    );
    expect(discography.get(1)).to.be.eql(
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      )
    );
    expect(discography.get(5)).to.be.undefined;
    expect(discography.get(-1)).to.be.undefined;
    expect(discography.get(2.5)).to.be.undefined;
  });

  it("Function remove", () => {
    expect(discography.remove(1)).to.be.eql(
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      )
    );
    expect(discography.elements).to.be.eql([
      new Disc("Graduation", "Kanye West", 2007, []),
    ]);
    expect(discography.remove(0)).to.be.eql(
      new Disc("Graduation", "Kanye West", 2007, [])
    );
    expect(discography.elements).to.be.eql([]);
    expect(discography.remove(3)).to.be.undefined;
    expect(discography.remove(-1)).to.be.undefined;
    expect(discography.remove(2.5)).to.be.undefined;
  });

  it("Function length", () => {
    expect(discography.length()).to.be.equal(0);
    discography.add(new Disc("Graduation", "Kanye West", 2007, []));
    discography.add(
      new Single(
        "Yeezus",
        "Kanye West",
        2013,
        new Song("On Sight", "Yeezus", 120, ["Trap", "Hip hop"], 10000),
        ["Original", "Remix"]
      )
    );
    expect(discography.length()).to.be.equal(2);
  });
});
