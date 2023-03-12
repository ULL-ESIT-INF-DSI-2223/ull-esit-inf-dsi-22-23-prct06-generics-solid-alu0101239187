import "mocha";
import { expect } from "chai";
import { MovieCollection } from "../../src/ejercicio-1/movie_collection";
import { BasicStreamableCollection } from "../../src/ejercicio-1/basic_streamable_collection";
import { Movie } from "../../src/ejercicio-1/movie";

describe("MovieCollection class tests", () => {
  const movie_collection: MovieCollection = new MovieCollection();

  it("MovieCollection constructor", () => {
    expect(movie_collection).to.be.instanceof(MovieCollection);
    expect(movie_collection).to.be.instanceof(BasicStreamableCollection);
    expect(
      new MovieCollection(new Movie("Avatar", "James Cameron", 137, 2009))
    ).to.be.instanceof(MovieCollection);
    expect(
      new MovieCollection(
        new Movie("Avatar", "James Cameron", 137, 2009),
        new Movie("Titanic", "James Cameron", 118, 1997)
      )
    ).to.be.instanceof(MovieCollection);
    expect(movie_collection).to.respondTo("add");
    expect(movie_collection).to.respondTo("searchByName");
    expect(movie_collection).to.respondTo("searchByYear");
    expect(movie_collection).to.respondTo("print");
  });

  it("Function add", () => {
    expect(movie_collection.collection).to.be.eql([]);
    expect(
      movie_collection.add(new Movie("Avatar", "James Cameron", 137, 2009))
    ).to.be.true;
    expect(movie_collection.collection).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(
      movie_collection.add(new Movie("Titanic", "James Cameron", 118, 1997))
    ).to.be.true;
    expect(movie_collection.collection).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
      new Movie("Titanic", "James Cameron", 118, 1997),
    ]);
    expect(
      movie_collection.add(new Movie("Avatar", "James Cameron", 137, 2009))
    ).to.be.false;
  });

  it("Function get", () => {
    expect(movie_collection.get(0)).to.be.eql(
      new Movie("Avatar", "James Cameron", 137, 2009)
    );
    expect(movie_collection.get(1)).to.be.eql(
      new Movie("Titanic", "James Cameron", 118, 1997)
    );
    expect(movie_collection.get(5)).to.be.undefined;
    expect(movie_collection.get(-1)).to.be.undefined;
    expect(movie_collection.get(2.5)).to.be.undefined;
  });

  it("Function remove", () => {
    expect(movie_collection.remove(1)).to.be.eql(
      new Movie("Titanic", "James Cameron", 118, 1997)
    );
    expect(movie_collection.collection).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(movie_collection.remove(0)).to.be.eql(
      new Movie("Avatar", "James Cameron", 137, 2009)
    );
    expect(movie_collection.collection).to.be.eql([]);
    expect(movie_collection.remove(3)).to.be.undefined;
    expect(movie_collection.remove(-1)).to.be.undefined;
    expect(movie_collection.remove(2.5)).to.be.undefined;
  });

  it("Function length", () => {
    expect(movie_collection.length()).to.be.equal(0);
    movie_collection.add(new Movie("Avatar", "James Cameron", 137, 2009));
    movie_collection.add(new Movie("Titanic", "James Cameron", 118, 1997));
    expect(movie_collection.length()).to.be.equal(2);
  });

  it("Function searchByName", () => {
    expect(movie_collection.searchByName("Avatar")).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(movie_collection.searchByName("tit")).to.be.eql([
      new Movie("Titanic", "James Cameron", 118, 1997),
    ]);
    expect(movie_collection.searchByName("al")).to.be.eql([]);
  });

  it("Function searchByYear", () => {
    expect(movie_collection.searchByYear(2009)).to.be.eql([
      new Movie("Avatar", "James Cameron", 137, 2009),
    ]);
    expect(movie_collection.searchByYear(1997)).to.be.eql([
      new Movie("Titanic", "James Cameron", 118, 1997),
    ]);
    expect(movie_collection.searchByYear(2005)).to.be.eql([]);
  });

  it("Function print", () => {
    expect(movie_collection.print()).to.be.equal(
      "1. Avatar\nDirector: James Cameron\nDuración: 137 minutos\nAño: 2009\n\n2. Titanic\nDirector: James Cameron\nDuración: 118 minutos\nAño: 1997\n\n"
    );
  });
});
