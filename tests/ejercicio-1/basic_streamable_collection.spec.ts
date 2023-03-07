import "mocha";
import { expect } from "chai";
import { BasicStreamableCollection } from "../../src/ejercicio-1/basic_streamable_collection";
import { MovieCollection } from "../../src/ejercicio-1/movie_collection";
import { Movie } from "../../src/ejercicio-1/movie";

describe("BasicStreamableCollection abstract class tests", () => {
    const basic_streamable_collection: BasicStreamableCollection<Movie> = new MovieCollection([]);

    it("Property collection ", () => {
        expect(basic_streamable_collection.collection).to.be.eql([]);
        basic_streamable_collection.collection = [new Movie("Avatar", "James Cameron", 137, 2009), new Movie("Titanic", "James Cameron", 118, 1997)];
        expect(basic_streamable_collection.collection).to.be.eql([new Movie("Avatar", "James Cameron", 137, 2009), new Movie("Titanic", "James Cameron", 118, 1997)]);
    });
});
