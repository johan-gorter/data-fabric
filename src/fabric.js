"use strict";

var createEntity = function(spec) {

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

var createAttribute = function(spec) {
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

var createRelation = function(name) {

};

var createFabric = function(entitySpecs) {
  var entitiesPerName = {};
  var entities = entitySpecs.map(function(spec){
    var entity = createEntity(spec);
    entitiesPerName[spec.name] = entity;
    return entity;
  });

  return entitiesPerName;
};

module.exports = createFabric;
