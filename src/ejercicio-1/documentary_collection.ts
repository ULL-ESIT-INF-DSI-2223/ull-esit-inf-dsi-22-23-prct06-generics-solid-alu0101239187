import { Documentary } from "./documentary"
import { BasicStreamableCollection } from "./basic_streamable_collection"

export class DocumentaryCollection extends BasicStreamableCollection<Documentary> {
    constructor(documentaries: Documentary[]) {
        super(documentaries);
    }

    add(element: Documentary): boolean {
        if (this.collection.filter(function (documentary) { return documentary.name === element.name; }).toString() === "") {
            this.collection.push(element);
            return true;
        }
        return false;
    }

    searchByName(name: string): Documentary[] {
        return this.collection.filter(function (documentary) {
            return documentary.name.toUpperCase().startsWith(name.toUpperCase());
        });;
    }

    searchByYear(year: number): Documentary[] {
        return this.collection.filter(function (documentary) {
            return documentary.year == year;
        });;
    }

    print(): string {
        let output = ""
        this.collection.forEach((documentary, it) => output += `${it + 1}. ${documentary.name}\nCampo: ${documentary.field}\nDuración: ${documentary.duration} minutos\nAño: ${documentary.year}\n\n`);
        return output;
    }
}