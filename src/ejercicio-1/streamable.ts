import { SearchableByName } from "./searchable_by_name";
import { SearchableByYear } from "./searchable_by_year";
import { Collectable } from "./collectable";
import { Printable } from "./printable";

export interface Streamable<T extends { name: string; year: number }>
  extends SearchableByName<T>,
    SearchableByYear<T>,
    Collectable<T>,
    Printable {}
