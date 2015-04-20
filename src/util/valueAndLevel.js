"use strict";

var createValueAndLevel = function(value, level) {
  return {
    getValue: function() {
      return value;
    },
    getValueLevel: function() {
      return level;
    },
    isConclusive: function() {
      return level !== "inconclusive";
    },
    hasValue: function() {
      return value !== undefined;
    },
    toString: function() {
      return ""+value+" ("+level+")";
    }
  };
};

module.exports = {
  irrelevant: function() {
    return createValueAndLevel(undefined, "irrelevant");
  },
  rule: function(value) {
    return createValueAndLevel(value, "rule");
  },
  stored: function(value) {
    return createValueAndLevel(value, "stored");
  },
  "default": function(value) {
    return createValueAndLevel(value, "default");
  },
  inconclusive: function() {
    return createValueAndLevel(undefined, "inconclusive");
  }
};
