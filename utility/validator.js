// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;


exports.validate_request = function(request_object, required_parameters) {
    var missing_parameters = [];
    for (var i = 0; i < required_parameters.length; i++) {
        if (!request_object.hasOwnProperty(required_parameters[i]) || request_object[required_parameters[i]] === null)
            missing_parameters.push(required_parameters[i]);
    }
    if (missing_parameters.length === 0) {
        return false;
    }
    else {
        return missing_parameters;
    }
};


exports.is_empty_value = function(value){
    if (typeof value === "undefined") return true;
    if(value == null)return true;
    if(value.length == 0)return true;
    return false;
}



exports.is_empty = function is_empty(obj) {

    // null and undefined are "empty"
    if (typeof obj === "undefined") return true;
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


 exports.is_valid_object = function (obj, requiredProperties){
  
    // null and undefined are "empty"
    if (typeof obj === "undefined") return false;
    if (obj == null) return false;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length === 0)  return false;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    

    if (typeof requiredProperties !== "undefined"){
        for (var i = 0; i < requiredProperties.length; i++) {
            //console.log(!hasOwnProperty.call(obj, requiredProperties[i]));
            if (!hasOwnProperty.call(obj, requiredProperties[i])) {
                return false;
                //missing_parameters.push(requiredProperties[i]);
            }
        }
    }

    return true;
};

exports.is_valid_array = function(array, requiredProperties){
    if (typeof array === "undefined") return false
    if (array === null) return false
    if (array.length === 0) return false
    
    if(requiredProperties !== undefined){
        for (var i = 0; i < requiredProperties.length; i++) {
            for(var j=0; j<array.length; j++){                
                if (!hasOwnProperty.call(array[j], requiredProperties[i])) return false
            }
        }
    }
    return true;
}


exports.in_array= function(value,array) {
    if(array.indexOf(value) > -1){
        return true;
    } else {
        return false;
    }
}

exports.findIndexs = function(array, nameWeAreLookingFor) {
    var indexes = []
    for(var i = 0; i<array.length; i++) {
        if(array[i].name === nameWeAreLookingFor) indexes.push(i);
    }
    
    if(indexes.length == 0)
        indexes.push-1;

    return indexes

}