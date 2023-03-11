import { Documentary } from "./documentary";
import { BasicStreamableCollection } from "./basic_streamable_collection";

export class DocumentaryCollection extends BasicStreamableCollection<Documentary> {
  /**
   * Constructor of the class DocumentaryCollection
   * @param documentaries Initial documentaries in the collection
   * ```typescript
   * const documentary_collection: DocumentaryCollection = new DocumentaryCollection();
   * ```
   */
  constructor(...documentaries: Documentary[]) {
    super(...documentaries);
  }

  /**
   * Prints the documentary collection as a string
   * @returns String representation of the documentary collection
   */
  public print(): string {
    let output = "";
    this.collection.forEach(
      (documentary, it) =>
        (output += `${it + 1}. ${documentary.name}\nCampo: ${
          documentary.field
        }\nDuración: ${documentary.duration} minutos\nAño: ${
          documentary.year
        }\n\n`)
    );
    return output;
  }
}
