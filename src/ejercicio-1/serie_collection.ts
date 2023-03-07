import { Serie } from "./serie"
import { BasicStreamableCollection } from "./basic_streamable_collection"

export class SerieCollection extends BasicStreamableCollection<Serie> {
    constructor(series: Serie[]) {
        super(series);
    }

    add(element: Serie): boolean {
        if (this.collection.filter(function (serie) { return serie.name === element.name; }).toString() === "") {
            this.collection.push(element);
            return true;
        }
        return false;
    }

    searchByName(name: string): Serie[] {
        return this.collection.filter(function (serie) {
            return serie.name.toUpperCase().startsWith(name.toUpperCase());
        });;
    }

    searchByYear(year: number): Serie[] {
        return this.collection.filter(function (serie) {
            return serie.year == year;
        });;
    }

    print(): string {
        let output = ""
        this.collection.forEach((serie, it) => output += `${it + 1}. ${serie.name}\nTemporadas: ${serie.seasons}\nCapítulos: ${serie.chapters}\nAño: ${serie.year}\n\n`);
        return output;
    }
}