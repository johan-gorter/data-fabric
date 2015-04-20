"use strict";

var createAttribute = require('./attribute');
var createRelation = require('./relation');

module.exports = function createEntity(spec) {

  var attributesPerName = {};
  var relationsPerName = {};
  var reverseRelationsPerName = {};

  var attributes = spec.attributes ? spec.attributes.map(function(attributeSpec) {
    var attribute = createAttribute(attributeSpec);
    attributesPerName[attributeSpec.name] = attribute;
    return attribute;
  }) : [];

  var relations = spec.relations ? spec.relations.map(function(relationSpec) {
    var relation = createRelation(relationSpec);
    relationsPerName[relationSpec.name] = relation;
    return relation;
  }) : [];

  var reverseRelations = [];

  var Entity = function(storage) {
    storage = storage || {};
    var instance = this;
    attributes.forEach(function(attribute) {
      Object.defineProperty(instance, attribute.name, {
        get: attribute.createGet(storage),
        set: attribute.createSet(storage)
      });
    });
    return Object.freeze(instance);
  };

  Entity.prototype.getEntity = function() {
    return Entity;
  };

  Entity.entityName = spec.name; // function.name cannot be overwritten in strict mode
  Entity.attributes = attributes;
  Entity.relations = relations;
  Entity.reverseRelations = reverseRelations;

  Entity.getAttribute = function() {

  };

  Entity.getRelation = function() {

  };

  Entity.getAttributeOrRelation = function() {

  };
  Entity.createInstance = function(storage) {
    return new Entity(storage);
  };
  return Entity;
};
