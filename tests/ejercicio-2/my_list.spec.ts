import "mocha";
import { expect } from "chai";
import { MyList } from "../../src/ejercicio-2/my_list";

describe("MyList class tests", () => {
  it("MyList constructor", () => {
    expect(new MyList()).to.be.instanceof(MyList);
    expect(new MyList()).to.be.instanceof(MyList);
    expect(new MyList(1, 2, 3)).to.be.instanceof(MyList);
    expect(new MyList("hola", "adios", "si", "no")).to.be.instanceof(MyList);
  });

  it("Property elements", () => {
    expect(new MyList().elements).to.be.eql([]);
    expect(new MyList().elements).to.be.eql([]);
    expect(new MyList(1, 2, 3).elements).to.be.eql([1, 2, 3]);
    expect(new MyList("hola", "adios", "si", "no").elements).to.be.eql([
      "hola",
      "adios",
      "si",
      "no",
    ]);
  });

  it("Function append string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no"]);
    my_list.append(new MyList("puede"));
    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no", "puede"]);
    my_list.append(new MyList("SI", "NO"));
    expect(my_list.elements).to.be.eql([
      "hola",
      "adios",
      "si",
      "no",
      "puede",
      "SI",
      "NO",
    ]);
  });

  it("Function append number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.elements).to.be.eql([1, 2, 3, 4]);
    my_list.append(new MyList(5));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5]);
    my_list.append(new MyList(6, 7));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5, 6, 7]);
  });

  it("Function append boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false);

    expect(my_list.elements).to.be.eql([true, false]);
    my_list.append(new MyList(true));
    expect(my_list.elements).to.be.eql([true, false, true]);
    my_list.append(new MyList(true, false));
    expect(my_list.elements).to.be.eql([true, false, true, true, false]);
  });

  it("Function concatenate string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no"]);
    my_list.concatenate(new MyList("puede"));
    expect(my_list.elements).to.be.eql(["hola", "adios", "si", "no", "puede"]);
    my_list.concatenate(new MyList("SI", "NO"), new MyList("No otra vez"));
    expect(my_list.elements).to.be.eql([
      "hola",
      "adios",
      "si",
      "no",
      "puede",
      "SI",
      "NO",
      "No otra vez",
    ]);
  });

  it("Function concatenate number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.elements).to.be.eql([1, 2, 3, 4]);
    my_list.concatenate(new MyList(5));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5]);
    my_list.concatenate(new MyList(6, 7), new MyList(1, 2, 3, 4));
    expect(my_list.elements).to.be.eql([1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4]);
  });

  it("Function concatenate boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false);

    expect(my_list.elements).to.be.eql([true, false]);
    my_list.concatenate(new MyList(false));
    expect(my_list.elements).to.be.eql([true, false, false]);
    my_list.concatenate(new MyList(false, true), new MyList(true));
    expect(my_list.elements).to.be.eql([true, false, false, false, true, true]);
  });

  it("Function filter string", () => {
    const my_list: MyList<string> = new MyList(
      "hola",
      "adios",
      "si",
      "no",
      "si",
      "nose",
      "napolitana"
    );

    expect(my_list.filter((a) => a === "si")).to.be.eql(new MyList("si", "si"));
    expect(my_list.filter((a) => a.startsWith("n"))).to.be.eql(
      new MyList("no", "nose", "napolitana")
    );
    expect(my_list.filter((a) => a === "queso")).to.be.eql(new MyList());
  });

  it("Function filter number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 2, 2.5, 4.1, 8, 6);

    expect(my_list.filter((a) => a === 2)).to.be.eql(new MyList(2, 2));
    expect(my_list.filter((a) => a % 2 === 0)).to.be.eql(
      new MyList(2, 2, 8, 6)
    );
    expect(my_list.filter((a) => a === 0)).to.be.eql(new MyList());
  });

  it("Function filter boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, true, false, true, false);

    expect(my_list.filter((a) => a === true)).to.be.eql(
      new MyList(true, true, true)
    );
    expect(my_list.filter((a) => a === false)).to.be.eql(
      new MyList(false, false)
    );
  });

  it("Function length string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.length()).to.be.equal(4);
    my_list.append(new MyList("puede"));
    expect(my_list.length()).to.be.equal(5);
    my_list.append(new MyList("SI", "NO"));
    expect(my_list.length()).to.be.equal(7);
  });

  it("Function length number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.length()).to.be.equal(4);
    my_list.append(new MyList(5));
    expect(my_list.length()).to.be.equal(5);
    my_list.append(new MyList(6, 7));
    expect(my_list.length()).to.be.equal(7);
  });

  it("Function length boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false);

    expect(my_list.length()).to.be.equal(2);
    my_list.append(new MyList(false, true));
    expect(my_list.length()).to.be.equal(4);
    my_list.append(new MyList(true, true, true));
    expect(my_list.length()).to.be.equal(7);
  });

  it("Function map string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(
      my_list.map(function (a) {
        return a + "si";
      })
    ).to.be.eql(new MyList("holasi", "adiossi", "sisi", "nosi"));
    expect(
      my_list.map(function (a) {
        return a.toUpperCase();
      })
    ).to.be.eql(new MyList("HOLA", "ADIOS", "SI", "NO"));
    expect(
      my_list.map(function () {
        return "a";
      })
    ).to.be.eql(new MyList("a", "a", "a", "a"));
  });

  it("Function map number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(
      my_list.map(function (a) {
        return a + 2;
      })
    ).to.be.eql(new MyList(3, 4, 5, 6));
    expect(
      my_list.map(function (a) {
        return a * a;
      })
    ).to.be.eql(new MyList(1, 4, 9, 16));
    expect(
      my_list.map(function () {
        return 0;
      })
    ).to.be.eql(new MyList(0, 0, 0, 0));
  });

  it("Function map boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    expect(
      my_list.map(function (a) {
        return !a;
      })
    ).to.be.eql(new MyList(false, true, false, true));
    expect(
      my_list.map(function () {
        return true;
      })
    ).to.be.eql(new MyList(true, true, true, true));
  });

  it("Function reduce string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(
      my_list.reduce(function (a, b) {
        return a.concat(b);
      }, "")
    ).to.be.equal("holaadiossino");
    expect(
      my_list.reduce(function (a, b) {
        return a.concat(b[0]);
      }, "")
    ).to.be.equal("hasn");
    expect(
      my_list.reduce(function (a, b) {
        return a.concat(b);
      }, "tarta")
    ).to.be.equal("tartaholaadiossino");
    expect(
      new MyList<string>().reduce(function (a, b) {
        return a.concat(b);
      }, "tarta")
    ).to.be.equal("tarta");
  });

  it("Function reduce number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(
      my_list.reduce(function (a, b) {
        return a + b;
      }, 0)
    ).to.be.equal(10);
    expect(
      my_list.reduce(function (a, b) {
        return a * b;
      }, 1)
    ).to.be.equal(24);
    expect(
      my_list.reduce(function (a, b) {
        return a - b;
      }, 10)
    ).to.be.equal(0);
    expect(
      new MyList<number>().reduce(function (a, b) {
        return a - b;
      }, 10)
    ).to.be.equal(10);
  });

  it("Function reduce boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    expect(
      my_list.reduce(function (a, b) {
        return a || b;
      }, true)
    ).to.be.equal(true);
    expect(
      my_list.reduce(function (a, b) {
        return a && b;
      }, false)
    ).to.be.equal(false);
    expect(
      new MyList<boolean>().reduce(function (a, b) {
        return a && b;
      }, true)
    ).to.be.equal(true);
  });

  it("Function reverse string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    expect(my_list.reverse()).to.be.eql(
      new MyList("no", "si", "adios", "hola")
    );
    expect(
      my_list
        .map(function (a) {
          return a.toUpperCase();
        })
        .reverse()
    ).to.be.eql(new MyList("NO", "SI", "ADIOS", "HOLA"));
  });

  it("Function reverse number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    expect(my_list.reverse()).to.be.eql(new MyList(4, 3, 2, 1));
    expect(
      my_list
        .map(function (a) {
          return a * a;
        })
        .reverse()
    ).to.be.eql(new MyList(16, 9, 4, 1));
  });

  it("Function reverse boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    expect(my_list.reverse()).to.be.eql(new MyList(false, true, false, true));
    expect(
      my_list
        .map(function (a) {
          return !a;
        })
        .reverse()
    ).to.be.eql(new MyList(true, false, true, false));
  });

  it("Function forEach string", () => {
    const my_list: MyList<string> = new MyList("hola", "adios", "si", "no");

    my_list.forEach(function (a) {
      return a + "si";
    });
    expect(my_list).to.be.eql(new MyList("holasi", "adiossi", "sisi", "nosi"));
    my_list.forEach(function (a) {
      return a.toUpperCase();
    });
    expect(my_list).to.be.eql(new MyList("HOLASI", "ADIOSSI", "SISI", "NOSI"));
    my_list.forEach(function () {
      return "a";
    });
    expect(my_list).to.be.eql(new MyList("a", "a", "a", "a"));
  });

  it("Function forEach number", () => {
    const my_list: MyList<number> = new MyList(1, 2, 3, 4);

    my_list.forEach(function (a) {
      return a + 2;
    });
    expect(my_list).to.be.eql(new MyList(3, 4, 5, 6));
    my_list.forEach(function (a) {
      return a * a;
    });
    expect(my_list).to.be.eql(new MyList(9, 16, 25, 36));
    my_list.forEach(function () {
      return 0;
    });
    expect(my_list).to.be.eql(new MyList(0, 0, 0, 0));
  });

  it("Function forEach boolean", () => {
    const my_list: MyList<boolean> = new MyList(true, false, true, false);

    my_list.forEach(function (a) {
      return !a;
    });
    expect(my_list).to.be.eql(new MyList(false, true, false, true));
    my_list.forEach(function () {
      return true;
    });
    expect(my_list).to.be.eql(new MyList(true, true, true, true));
  });
});
