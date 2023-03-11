import "mocha";
import { expect } from "chai";
import { SerieCollection } from "../../src/ejercicio-1/serie_collection";
import { BasicStreamableCollection } from "../../src/ejercicio-1/basic_streamable_collection";
import { Serie } from "../../src/ejercicio-1/serie";

describe("SerieCollection class tests", () => {
    const serie_collection: SerieCollection = new SerieCollection();

    it("SerieCollection constructor", () => {
        expect(serie_collection).to.be.instanceof(SerieCollection);
        expect(serie_collection).to.be.instanceof(BasicStreamableCollection);
        expect(new SerieCollection(new Serie("The Last of Us", 1, 9, 2023))).to.be.instanceof(SerieCollection);
        expect(new SerieCollection(new Serie("The Last of Us", 1, 9, 2023), new Serie("Friends", 10, 236, 1994))).to.be.instanceof(SerieCollection);
        expect(serie_collection).to.respondTo('add');
        expect(serie_collection).to.respondTo('searchByName');
        expect(serie_collection).to.respondTo('searchByYear');
        expect(serie_collection).to.respondTo('print');
    });

    it("Function add", () => {
        expect(serie_collection.collection).to.be.eql([]);
        expect(serie_collection.add(new Serie("The Last of Us", 1, 9, 2023))).to.be.true;
        expect(serie_collection.collection).to.be.eql([new Serie("The Last of Us", 1, 9, 2023)]);
        expect(serie_collection.add(new Serie("Friends", 10, 236, 1994))).to.be.true;
        expect(serie_collection.collection).to.be.eql([new Serie("The Last of Us", 1, 9, 2023), new Serie("Friends", 10, 236, 1994)]);
        expect(serie_collection.add(new Serie("The Last of Us", 1, 9, 2023))).to.be.false;
    });

    it("Function get", () => {
        expect(serie_collection.get(0)).to.be.eql(new Serie("The Last of Us", 1, 9, 2023));
        expect(serie_collection.get(1)).to.be.eql(new Serie("Friends", 10, 236, 1994));
        expect(serie_collection.get(5)).to.be.undefined;
        expect(serie_collection.get(-1)).to.be.undefined;
        expect(serie_collection.get(2.5)).to.be.undefined;
    });

    it("Function remove", () => {
        expect(serie_collection.remove(1)).to.be.eql(new Serie("Friends", 10, 236, 1994));
        expect(serie_collection.collection).to.be.eql([new Serie("The Last of Us", 1, 9, 2023)]);
        expect(serie_collection.remove(0)).to.be.eql(new Serie("The Last of Us", 1, 9, 2023));
        expect(serie_collection.collection).to.be.eql([]);
        expect(serie_collection.remove(3)).to.be.undefined;
        expect(serie_collection.remove(-1)).to.be.undefined;
        expect(serie_collection.remove(2.5)).to.be.undefined;
    });

    it("Function getNumberOfItems", () => {
        expect(serie_collection.getNumberOfItems()).to.be.equal(0);
        expect(serie_collection.add(new Serie("The Last of Us", 1, 9, 2023))).to.be.true;
        expect(serie_collection.add(new Serie("Friends", 10, 236, 1994))).to.be.true;
        expect(serie_collection.getNumberOfItems()).to.be.equal(2);
    });

    it("Function searchByName", () => {
        expect(serie_collection.searchByName("The LAst of Us")).to.be.eql([new Serie("The Last of Us", 1, 9, 2023)]);
        expect(serie_collection.searchByName("fri")).to.be.eql([new Serie("Friends", 10, 236, 1994)]);
        expect(serie_collection.searchByName("al")).to.be.eql([]);
    });

    it("Function searchByYear", () => {
        expect(serie_collection.searchByYear(2023)).to.be.eql([new Serie("The Last of Us", 1, 9, 2023)]);
        expect(serie_collection.searchByYear(1994)).to.be.eql([new Serie("Friends", 10, 236, 1994)]);
        expect(serie_collection.searchByYear(2005)).to.be.eql([]);
    });

    it("Function print", () => {
        expect(serie_collection.print()).to.be.equal("1. The Last of Us\nTemporadas: 1\nCapítulos: 9\nAño: 2023\n\n2. Friends\nTemporadas: 10\nCapítulos: 236\nAño: 1994\n\n");
    });
});
