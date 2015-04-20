"use strict";


module.exports = function createAttribute(spec) {
  var name = spec.name;
  var calculation = spec.calculation;

  var attribute = {
    name: name,
    getAttribute: function() {
      return attribute;
    },
    createGet: function(storage) {
      return function() {
        if (calculation) {
          //TODO
        }
        if (storage.hasOwnProperty(name)) {
          return storage[name];
        }
        return undefined;
      };
    },
    createSet: function(storage) {
      return function(value) {
        // todo: type check
        storage[name] = value;
      };
    }
  };
  return attribute;
};
