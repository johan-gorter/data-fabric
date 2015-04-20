"use strict";

var createEntity = require('./entity');

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
