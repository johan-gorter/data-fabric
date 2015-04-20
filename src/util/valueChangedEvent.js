"use strict";

var createValueChangedEvent = function(
  attributeValue, // ReadOnlyAttributeValue
  oldValue, // ValueAndLevel
  oldStoredValue,
	newStoredValue,
	operation,
  // For undo events
  eventToUndo, // ValueChangedEvent
	// For multivalue updates
	multiValueUpdateType, // "insert", "delete"
	index,
	itemValue
) {
  var undoEvent; // ValueChangedEvent, created on demand
  var cachedNewValue; // ValueAndLevel

  var event = {

    isUndoEvent: function() {
  		return eventToUndo!==undefined;
  	},

  	/**
  	 * @return The attribute/relation is multivalue and the value only got updated. (not invalidated)
  	 */
  	isMultivalueUpdate: function() {
  		return multiValueUpdateType !== undefined;
  	},

  	getAttribute: function() {
  		return attributeValue.getModel();
  	},

  	getInstance: function() {
  		return attributeValue.getInstance();
  	},

  	/**
  	 * @return The previous value, if it was ever deduced. (It usually is, because listening for updates on a value that you never retrieved is not very useful)
  	 */
  	getOldValue: function() {
  		return oldValue;
  	},

  	/**
  	 * Use with caution, calling getNewValue can cause loops and inefficiencies.
  	 * Be prepared to receive a temporary value that is not consistent. In this case more events will be fired.
  	 *
  	 * @return the new value
  	 */
  	getNewValue: function() {
  		if (cachedNewValue === undefined) {
  			cachedNewValue = attributeValue.getValueAndLevel();
  		}
  		return cachedNewValue;
  	},

  	getNewStoredValue: function() {
  		return newStoredValue;
  	},

  	getOldStoredValue: function() {
  		return oldStoredValue;
  	},

  	storedValueChanged: function() {
  		return newStoredValue !== oldStoredValue || (multiValueUpdateType !== undefined && oldValue.getValueLevel() !== "stored");
  	},

  	getOperation: function() {
  		return operation;
  	},

  	getUndoEvent: function() {
  		if (undoEvent === undefined) {
  			undoEvent = createValueChangedEvent(attributeValue, cachedNewValue, newStoredValue, oldStoredValue, operation, event, invert(multiValueUpdateType), index, itemValue);
  		}
  		return undoEvent;
  	},

  	isFor: function(valueObserved) {
  		return valueObserved === attributeValue;
  	},

  	getMultiValueUpdateType: function() {
  		return multiValueUpdateType;
  	},

  	getIndex: function() {
  		return index;
  	},

  	getItemValue: function() {
  		return itemValue;
  	},

  	toString: function() {
  		var builder = [];
  		if (multiValueUpdateType !== undefined) {
        builder.push(multiValueUpdateType);
        builder.push(" ");
  			builder.push(attributeValue);
  			builder.push(" ");
  			builder.push(""+itemValue);
  			builder.push(", index=");
        builder.push(index);
  		} else {
  			if (event.storedValueChanged()) {
  				builder.push("setStored ");
  				builder.push(attributeValue);
  				builder.push("=");
  				builder.push(newStoredValue);
  				builder.push(", was ");
  				builder.push(oldStoredValue);
  			} else {
  				builder.push("changed, was ");
  				builder.push(oldValue);
  			}
  		}
  		return builder.join("");
  	}

  };
  return event;
};

var invert = function(multiValueUpdateType) {
  if (multiValueUpdateType === "insert") {
    return "delete";
  }
  if (multiValueUpdateType === "delete") {
    return "insert";
  }
  return undefined;
};

module.exports = {
  createSingleValueChangedEvent: function(attributeValue, oldValue, oldStoredValue, newStoredValue, operation) {
    return createValueChangedEvent(attributeValue, oldValue, oldStoredValue, newStoredValue, operation);
  },
  createOrderedMultiValueChangedEvent: function(attributeValue, value, multiValueUpdateType, index, itemValue, operation) {
    return createValueChangedEvent(attributeValue, value, undefined, undefined, operation, undefined, multiValueUpdateType, index, itemValue);
  },
  createMultiValueChangedEvent: function(attributeValue, value, multiValueUpdateType, itemValue, operation) {
    return createValueChangedEvent(attributeValue, value, undefined, undefined, operation, undefined, multiValueUpdateType, undefined, itemValue);
  }
};
