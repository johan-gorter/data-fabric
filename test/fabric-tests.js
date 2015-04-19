"use strict";

var createFabric = require("../src/fabric");
var assert = require("assert");
var expect = require('chai').expect;


var fabric = createFabric([
  {
    name: "period",
    attributes: [
      {
        name: "from",
        type: "Date"
      },
      {
        name: "to",
        type: "Date"
      }
    ]
  }
]);

describe('Fabric', function() {
  describe('entities', function() {

    it('Can be created using createInstance', function() {
      var period = fabric.period.createInstance();
      expect(period).to.be.an.instanceof(fabric.period);
    });

    it('Can be created using new', function() {
      var period = new fabric.period();
      expect(period).to.be.an.instanceof(fabric.period);
    });
  });

  describe('attributes', function() {

    it('Should return the set value upon get', function() {
      var storage = {};
      var period = fabric.period.createInstance(storage);
      period.from = new Date(2014,1,1);
      expect(period.from.getTime()).to.equal(new Date(2014,1,1).getTime());
      expect(storage.from.getTime()).to.equal(new Date(2014,1,1).getTime());
    });

    it('Should not allow custom properties', function() {
      var period = fabric.period.createInstance();
      expect(function(){ period.nonsense = true; }).to.throw(TypeError);
    });
  });
});
