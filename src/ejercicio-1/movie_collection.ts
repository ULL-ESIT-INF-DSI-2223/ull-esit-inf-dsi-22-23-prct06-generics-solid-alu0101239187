import { Movie } from "./movie"
import { BasicStreamableCollection } from "./basic_streamable_collection"

export class MovieCollection extends BasicStreamableCollection<Movie> {
    constructor(movies: Movie[]) {
        super(movies);
    }

    add(element: Movie): boolean {
        if (this.collection.filter(function (movie) { return movie.name === element.name; }).toString() === "") {
            this.collection.push(element);
            return true;
        }
        return false;
    }

    searchByName(name: string): Movie[] {
        return this.collection.filter(function (movie) {
            return movie.name.toUpperCase().startsWith(name.toUpperCase());
        });;
    }

    searchByYear(year: number): Movie[] {
        return this.collection.filter(function (movie) {
            return movie.year == year;
        });;
    }

    print(): string {
        let output = ""
        this.collection.forEach((movie, it) => output += `${it + 1}. ${movie.name}\nDirector: ${movie.director}\nDuración: ${movie.duration} minutos\nAño: ${movie.year}\n\n`);
        return output;
    }
}