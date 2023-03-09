export class MyList<T> {
    private _elements: T[];

    constructor(elements?: T[]) {
        if (typeof elements !== "undefined") {
            this._elements = elements
        } else {
            this._elements = []
        }
    }

    get elements() {
        return this._elements;
    }

    public append(list: MyList<T>): void {
        const new_elements: T[] = new Array<T>(this.length() + list.length());
        for (let index = 0; index < this.length(); index++) {
            new_elements[index] = this._elements[index];   
        }
        for (let index = 0; index < list.length(); index++) {
            new_elements[this.length() + index] = list.elements[index];           
        }
        this._elements = new_elements;
    }

    public concatenate(list: MyList<T>, ...other_lists: MyList<T>[]): void {
        let total_length = list.length();
        for (let index = 0; index < other_lists.length; index++) {
            total_length += other_lists[index].length();
        }
        const new_elements: T[] = new Array<T>(this.length() + total_length);
        for (let index = 0; index < this.length(); index++) {
            new_elements[index] = this._elements[index];   
        }
        for (let index = 0; index < list.length(); index++) {
            new_elements[this.length() + index] = list.elements[index];           
        }
        let counter = list.length();
        for (let i = 0; i < other_lists.length; i++) {
            for (let j = 0; j < other_lists[i].length(); j++) {
                new_elements[this.length() + counter++] = other_lists[i].elements[j];        
            }         
        }
        this._elements = new_elements;
    }

    public filter(my_function: (a: T) => boolean): MyList<T> {
        const output: MyList<T> = new MyList();
        for (let index = 0; index < this.length(); index++) {
            const current_element: T = this._elements[index];
            if (my_function(current_element)) {
                output.append(new MyList([current_element]));
            } 
        }
        return output;
    }

    public length(): number {
        return this._elements.length;
    }

    public map(my_function: (a: T) => T): MyList<T> {
        const output: MyList<T> = new MyList();
        for (let index = 0; index < this.length(); index++) {
            const current_element: T = this._elements[index];
            output.append(new MyList<T>([my_function(current_element)]));
        }
        return output;
    }
}