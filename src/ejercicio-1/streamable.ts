import { SearchableByName } from "./searchable_by_name";
import { SearchableByYear } from "./searchable_by_year";
import { Expandable } from "./expandable";
import { Printable } from "./printable";

export interface Streamable<T> extends SearchableByName<T>, SearchableByYear<T>, Expandable<T>, Printable {}