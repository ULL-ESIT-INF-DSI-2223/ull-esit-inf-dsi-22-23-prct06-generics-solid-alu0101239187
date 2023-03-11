import "mocha";
import { expect } from "chai";
import { DocumentaryCollection } from "../../src/ejercicio-1/documentary_collection";
import { BasicStreamableCollection } from "../../src/ejercicio-1/basic_streamable_collection";
import { Documentary } from "../../src/ejercicio-1/documentary";

describe("DocumentaryCollection class tests", () => {
    const documentary_collection: DocumentaryCollection = new DocumentaryCollection();

    it("DocumentaryCollection constructor", () => {
        expect(documentary_collection).to.be.instanceof(DocumentaryCollection);
        expect(documentary_collection).to.be.instanceof(BasicStreamableCollection);
        expect(new DocumentaryCollection(new Documentary("Ballenas", "Biología Marina", 125, 2020))).to.be.instanceof(DocumentaryCollection);
        expect(new DocumentaryCollection(new Documentary("Ballenas", "Biología Marina", 125, 2020), new Documentary("Egipto", "Historia", 114, 2010))).to.be.instanceof(DocumentaryCollection);
        expect(documentary_collection).to.respondTo('add');
        expect(documentary_collection).to.respondTo('searchByName');
        expect(documentary_collection).to.respondTo('searchByYear');
        expect(documentary_collection).to.respondTo('print');
    });

    it("Function add", () => {
        expect(documentary_collection.collection).to.be.eql([]);
        expect(documentary_collection.add(new Documentary("Ballenas", "Biología Marina", 125, 2020))).to.be.true;
        expect(documentary_collection.collection).to.be.eql([new Documentary("Ballenas", "Biología Marina", 125, 2020)]);
        expect(documentary_collection.add(new Documentary("Egipto", "Historia", 114, 2010))).to.be.true;
        expect(documentary_collection.collection).to.be.eql([new Documentary("Ballenas", "Biología Marina", 125, 2020), new Documentary("Egipto", "Historia", 114, 2010)]);
        expect(documentary_collection.add(new Documentary("Ballenas", "Biología Marina", 125, 2020))).to.be.false;
    });

    it("Function get", () => {
        expect(documentary_collection.get(0)).to.be.eql(new Documentary("Ballenas", "Biología Marina", 125, 2020));
        expect(documentary_collection.get(1)).to.be.eql(new Documentary("Egipto", "Historia", 114, 2010));
        expect(documentary_collection.get(5)).to.be.undefined;
        expect(documentary_collection.get(-1)).to.be.undefined;
        expect(documentary_collection.get(2.5)).to.be.undefined;
    });

    it("Function remove", () => {
        expect(documentary_collection.remove(1)).to.be.eql(new Documentary("Egipto", "Historia", 114, 2010));
        expect(documentary_collection.collection).to.be.eql([new Documentary("Ballenas", "Biología Marina", 125, 2020)]);
        expect(documentary_collection.remove(0)).to.be.eql(new Documentary("Ballenas", "Biología Marina", 125, 2020));
        expect(documentary_collection.collection).to.be.eql([]);
        expect(documentary_collection.remove(3)).to.be.undefined;
        expect(documentary_collection.remove(-1)).to.be.undefined;
        expect(documentary_collection.remove(2.5)).to.be.undefined;
    });

    it("Function getNumberOfItems", () => {
        expect(documentary_collection.getNumberOfItems()).to.be.equal(0);
        expect(documentary_collection.add(new Documentary("Ballenas", "Biología Marina", 125, 2020))).to.be.true;
        expect(documentary_collection.add(new Documentary("Egipto", "Historia", 114, 2010))).to.be.true;
        expect(documentary_collection.getNumberOfItems()).to.be.equal(2);
    });

    it("Function searchByName", () => {
        expect(documentary_collection.searchByName("Ballenas")).to.be.eql([new Documentary("Ballenas", "Biología Marina", 125, 2020)]);
        expect(documentary_collection.searchByName("egi")).to.be.eql([new Documentary("Egipto", "Historia", 114, 2010)]);
        expect(documentary_collection.searchByName("al")).to.be.eql([]);
    });

    it("Function searchByYear", () => {
        expect(documentary_collection.searchByYear(2020)).to.be.eql([new Documentary("Ballenas", "Biología Marina", 125, 2020)]);
        expect(documentary_collection.searchByYear(2010)).to.be.eql([new Documentary("Egipto", "Historia", 114, 2010)]);
        expect(documentary_collection.searchByYear(2005)).to.be.eql([]);
    });

    it("Function print", () => {
        expect(documentary_collection.print()).to.be.equal("1. Ballenas\nCampo: Biología Marina\nDuración: 125 minutos\nAño: 2020\n\n2. Egipto\nCampo: Historia\nDuración: 114 minutos\nAño: 2010\n\n");
    });
});
