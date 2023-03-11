export class MyList<T> {
  private _elements: T[];

  /**
   * Constructor of the class MyList
   * @param elements Initial elements of the list
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * ```
   */
  constructor(...elements: T[]) {
    this._elements = elements;
  }

  get elements() {
    return this._elements;
  }

  /**
   * Appends a list of elements to the list
   * @param list List to append
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.append(new MyList("puede"));
   * ```
   */
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

  /**
   * Concatenates one or various lists to the list
   * @param list First list to concat
   * @param other_lists Rest of lists to concat
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.concatenate(new MyList("SI", "NO"), new MyList("No otra vez"));
   * ```
   */
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

  /**
   * Returns a new list with the elements that satisfy the condition in the function
   * @param my_function The evaluation function
   * @returns New list with the elements that satisfy the condition in the function
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no", "si", "nose", "napolitana");
   * my_list.filter((a) => a.startsWith("n")); // returns new MyList("no", "nose", "napolitana")
   * ```
   */
  public filter(my_function: (a: T) => boolean): MyList<T> {
    const output: MyList<T> = new MyList();
    for (let index = 0; index < this.length(); index++) {
      const current_element: T = this._elements[index];
      if (my_function(current_element)) {
        output.append(new MyList(current_element));
      }
    }
    return output;
  }

  /**
   * Returns the length of the list
   * @returns the length of the list
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.length(); // returns 5
   * ```
   */
  public length(): number {
    return this._elements.length;
  }

  /**
   * Returns a list with the result of applying the function to the elements of the list
   * @param my_function Function to apply
   * @returns List with the result of applying the function to the elements of the list
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.map(function (a) { return a + "si" }); // returns new MyList("holasi", "adiossi", "sisi", "nosi")
   * ```
   */
  public map(my_function: (a: T) => T): MyList<T> {
    const output: MyList<T> = new MyList();
    for (let index = 0; index < this.length(); index++) {
      const current_element: T = this._elements[index];
      output.append(new MyList<T>(my_function(current_element)));
    }
    return output;
  }

  /**
   * Returns the accumulated result of applying the function to the elements of the list
   * @param my_function Function to apply
   * @param initial_value The initial accumulator
   * @returns Accumulated result of applying the function to the elements of the list
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.reduce(function (a, b) { return a.concat(b) }, ""); // returns "holaadiossino"
   * ```
   */
  public reduce(my_function: (a: T, b: T) => T, initial_value: T): T {
    let output: T = initial_value;
    if (this.length() === 0) {
      return output;
    }
    for (let index = 0; index < this.length(); index++) {
      output = my_function(output, this._elements[index]);
    }
    return output;
  }

  /**
   * Returns the list with his elements reversed
   * @returns The list with his elements reversed
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.reverse(); // returns new MyList("no", "si", "adios", "hola")
   * ```
   */
  public reverse(): MyList<T> {
    const output: MyList<T> = new MyList();
    for (let index = this.length() - 1; index >= 0; index--) {
      const current_element: T = this._elements[index];
      output.append(new MyList<T>(current_element));
    }
    return output;
  }

  /**
   * Applies a function to each element of the list
   * @param my_function Function to apply
   * ```typescript
   * const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");
   * my_list.forEach(function (a) { return a + "si" });
   * ```
   */
  public forEach(my_function: (a: T) => T): void {
    const new_elements: T[] = new Array<T>(this.length());
    for (let index = 0; index < this.length(); index++) {
      new_elements[index] = my_function(this._elements[index]);
    }
    this._elements = new_elements;
  }
}
