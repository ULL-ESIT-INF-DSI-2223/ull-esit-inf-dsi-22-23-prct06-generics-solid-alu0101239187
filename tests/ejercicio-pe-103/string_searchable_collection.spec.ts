import "mocha";
import { expect } from "chai";
import { StringSearchableCollection } from "../../src/ejercicio-pe-103/string_searchable_collection";
import { SearchableCollection } from "../../src/ejercicio-pe-103/searchable_collection";

describe("StringSearchableCollection class tests", () => {
  const string_searchable_collection: StringSearchableCollection =
    new StringSearchableCollection([]);

  it("StringSearchableCollection constructor", () => {
    expect(string_searchable_collection).to.be.instanceof(
      StringSearchableCollection
    );
    expect(string_searchable_collection).to.be.instanceof(SearchableCollection);
  });

  it("Function addItem", () => {
    expect(string_searchable_collection.collection).to.be.eql([]);
    string_searchable_collection.addItem("hola");
    expect(string_searchable_collection.collection).to.be.eql(["hola"]);
    string_searchable_collection.addItem("queso");
    string_searchable_collection.addItem("tarta");
    string_searchable_collection.addItem("que");
    string_searchable_collection.addItem("abierto");
    expect(string_searchable_collection.collection).to.be.eql([
      "hola",
      "queso",
      "tarta",
      "que",
      "abierto",
    ]);
  });

  it("Function getItem", () => {
    expect(string_searchable_collection.getItem(0)).to.be.equal("hola");
    expect(string_searchable_collection.getItem(2)).to.be.equal("tarta");
    expect(string_searchable_collection.getItem(4)).to.be.equal("abierto");
    expect(string_searchable_collection.getItem(5)).to.be.undefined;
    expect(string_searchable_collection.getItem(-1)).to.be.undefined;
    expect(string_searchable_collection.getItem(2.5)).to.be.undefined;
  });

  it("Function removeItem", () => {
    expect(string_searchable_collection.removeItem(0)).to.be.equal("hola");
    expect(string_searchable_collection.removeItem(3)).to.be.equal("abierto");
    expect(string_searchable_collection.removeItem(3)).to.be.undefined;
    expect(string_searchable_collection.removeItem(-1)).to.be.undefined;
    expect(string_searchable_collection.removeItem(2.5)).to.be.undefined;
  });

  it("Function getNumberOfItems", () => {
    expect(string_searchable_collection.getNumberOfItems()).to.be.equal(3);
    string_searchable_collection.addItem("cerrado");
    string_searchable_collection.addItem("torta");
    string_searchable_collection.addItem("hola");
    string_searchable_collection.addItem("hola");
    expect(string_searchable_collection.getNumberOfItems()).to.be.equal(7);
  });

  it("Function search", () => {
    expect(string_searchable_collection.search("hola")).to.be.eql([
      "hola",
      "hola",
    ]);
    expect(string_searchable_collection.search("queso")).to.be.eql(["queso"]);
    expect(string_searchable_collection.search("tortilla")).to.be.eql([]);
  });
});
