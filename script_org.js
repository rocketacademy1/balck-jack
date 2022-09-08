var convertKmToMiles = function (distanceInKm) {
  var distanceInMiles = distanceInKm * 0.62;
  return distanceInMiles;
};

var main = function (input) {
  //var myOutputValue = `${input} is in a template literal!`;
  //return myOutputValue;
  var myOutputValue = convertKmToMiles(input);
  return myOutputValue;
};
