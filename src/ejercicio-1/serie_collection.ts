import { Serie } from "./serie";
import { BasicStreamableCollection } from "./basic_streamable_collection";

export class SerieCollection extends BasicStreamableCollection<Serie> {
  /**
   * Constructor of the class SerieCollection
   * @param series Initial series in the collection
   * ```typescript
   * const serie_collection: SerieCollection = new SerieCollection();
   * ```
   */
  constructor(...series: Serie[]) {
    super(...series);
  }

  /**
   * Prints the serie collection as a string
   * @returns String representation of the serie collection
   */
  public print(): string {
    let output = "";
    this.collection.forEach(
      (serie, it) =>
        (output += `${it + 1}. ${serie.name}\nTemporadas: ${
          serie.seasons
        }\nCapítulos: ${serie.chapters}\nAño: ${serie.year}\n\n`)
    );
    return output;
  }
}
