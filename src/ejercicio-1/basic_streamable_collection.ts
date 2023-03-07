import { Streamable } from "./streamable";

export abstract class BasicStreamableCollection<T> implements Streamable<T> {
    constructor(private _collection: T[]) {}

    get collection(){
        return this._collection;
    }

    set collection(collection: T[]){
        this._collection = collection;
    }

    abstract add(element: T): boolean;
    abstract searchByName(name: string): T[];
    abstract searchByYear(year: number): T[];
    abstract print(): string;
}