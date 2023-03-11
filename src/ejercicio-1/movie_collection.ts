import { Movie } from "./movie";
import { BasicStreamableCollection } from "./basic_streamable_collection";

export class MovieCollection extends BasicStreamableCollection<Movie> {
  /**
   * Constructor of the class MovieCollection
   * @param movies Initial movies in the collection
   * ```typescript
   * const movie_collection: MovieCollection = new MovieCollection();
   * ```
   */
  constructor(...movies: Movie[]) {
    super(...movies);
  }

  /**
   * Prints the movie collection as a string
   * @returns String representation of the movie collection
   */
  public print(): string {
    let output = "";
    this.collection.forEach(
      (movie, it) =>
        (output += `${it + 1}. ${movie.name}\nDirector: ${
          movie.director
        }\nDuración: ${movie.duration} minutos\nAño: ${movie.year}\n\n`)
    );
    return output;
  }
}
