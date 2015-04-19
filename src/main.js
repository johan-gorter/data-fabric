document.addEventListener('DOMContentLoaded', function () {
  var maquette = require("maquette");
  var h = maquette.h;


  var storage = {
    designer: {
      designer: {
        id: "designer",
        name: "designer",
        applicationEntity: "applicationDesign",
        entities: [
          {
            id: "applicationDesign",
            name: "application design",
            relations: [
              {
                id: "entities",
                name: "entities",
                to: "entityDesign",
                owner: true,
                multivalue: true,
                reverseName: "application"
              },
              {
                id: "applicationEntity",
                name: "application entity",
                to: "entityDesign"
              }
            ],
            attributes: [
              {
                id: "applicationName",
                name: "name",
                dataType: {
                  category: "text"
                }
              }
            ]
          },
          {
            id: "entityDesign",
            name: "entity design",
            relations: [
              {
                id: "attributes",
                name: "attributes",
                to: "attributeDesign",
                owner: true,
                multivalue: true,
                reverseName: "attributeOf"
              }
            ],
            attributes: [
              {
                id: "entityName",
                name: "name"
              }
            ]
          },
          {
            id: "attributeDesign",
            name: "attribute design",
            relations: [
              {
                id: "dataType",
                name: "data type",
                to: "dataTypeDesign"
              }
            ],
            attributes: [
              {
                id: "attributeName",
                name: "name",
                dataType: {
                  category: "text"
                }
              }
            ]
          },
          {
            id: "dataTypeDesign",
            name: "data type design",
            attributes: [
              {
                id: "dataTypeCategory",
                name: "category",
                dataType: {
                  category: "text"
                }
              }
            ]
          }
        ]
      },
      helloWorld: {
        id: "helloWorld",
        name: "hello world",
        applicationEntity: "greeter",
        entities: [
          {
            id: "greeter",
            name: "greeter",
            attributes: [
              {
                id: "yourName",
                name: "your name"
              }
            ]
          }
        ]
      }
    },
    helloWorld: {
      instance1: {
        yourName: "you"
      }
    }
  };

  var travelerId = ''+Math.floor(Math.random()*100000000000);

  var renderDetailPage = function(applicationName, instanceName, entityName, instanceId) {
    var designerApplication = createApplication(designerBootstrapper.load(storage.designer.designer));
    var application = createApplication(designerApplication.load(storage.designer[applicationName]));
    var data = application.load(storage[applicationName][instanceName]);
    var entity = application.entities.getValues().filter()[0];
    var instance = data.getInstanceById(instanceId);

    return h("main", [
      h("h1", [ entity.name.getValue() ]),
      h("div.fieldset", [
        entity.attributes.getValues().map(function(attribute) {
          return h("div.field-row", {key: attribute}, [
            h("span.label", [attribute]),
            h("span.value", [
              h("input", {type: "text", value: attribute.getValue(instance)})
            ])
          ]);
        })
      ])
    ]);

  };

  console.log("travelerId", travelerId);
});
