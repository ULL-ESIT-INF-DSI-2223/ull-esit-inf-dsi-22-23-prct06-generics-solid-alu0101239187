import "mocha";
import { expect } from "chai";
import { NumericSearchableCollection } from "../../src/ejercicio-pe-103/numeric_searchable_collection";
import { SearchableCollection } from "../../src/ejercicio-pe-103/searchable_collection";

describe("NumericSearchableCollection class tests", () => {
    const numeric_searchable_collection: NumericSearchableCollection = new NumericSearchableCollection([]);

    it("NumericSearchableCollection constructor", () => {
        expect(numeric_searchable_collection).to.be.instanceof(NumericSearchableCollection);
        expect(numeric_searchable_collection).to.be.instanceof(SearchableCollection);
    });

    it("Function addItem", () => {
        expect(numeric_searchable_collection.collection).to.be.eql([]);
        numeric_searchable_collection.addItem(1);
        expect(numeric_searchable_collection.collection).to.be.eql([1]);
        numeric_searchable_collection.addItem(1);
        numeric_searchable_collection.addItem(2);
        numeric_searchable_collection.addItem(1);
        numeric_searchable_collection.addItem(3);
        expect(numeric_searchable_collection.collection).to.be.eql([1, 1, 2, 1, 3]);
    });

    it("Function getItem", () => {
        expect(numeric_searchable_collection.getItem(0)).to.be.equal(1);
        expect(numeric_searchable_collection.getItem(2)).to.be.equal(2);
        expect(numeric_searchable_collection.getItem(4)).to.be.equal(3);
        expect(numeric_searchable_collection.getItem(5)).to.be.undefined;
        expect(numeric_searchable_collection.getItem(-1)).to.be.undefined;
        expect(numeric_searchable_collection.getItem(2.5)).to.be.undefined;
    });

    it("Function removeItem", () => {
        expect(numeric_searchable_collection.removeItem(0)).to.be.equal(1);
        expect(numeric_searchable_collection.removeItem(3)).to.be.equal(3);
        expect(numeric_searchable_collection.removeItem(3)).to.be.undefined;
        expect(numeric_searchable_collection.removeItem(-1)).to.be.undefined;
        expect(numeric_searchable_collection.removeItem(2.5)).to.be.undefined;
    });

    it("Function getNumberOfItems", () => {
        expect(numeric_searchable_collection.getNumberOfItems()).to.be.equal(3);
        numeric_searchable_collection.addItem(1);
        numeric_searchable_collection.addItem(3);
        expect(numeric_searchable_collection.getNumberOfItems()).to.be.equal(5);
    });

    it("Function search", () => {
        expect(numeric_searchable_collection.search(1)).to.be.eql([1, 1, 1]);
        expect(numeric_searchable_collection.search(3)).to.be.eql([3]);
        expect(numeric_searchable_collection.search(0)).to.be.eql([]);
    });
});
