var apiclient = (function () {
  var getBlueprintsByAuthor = function (author, callback) {
    $.getJSON("http://localhost:8080/blueprints/" + author, function (data) {
      callback(null, data);
    });
  };

  var getBlueprintsByNameAndAuthor = function (name, author, callback) {
    $.getJSON(
      "http://localhost:8080/blueprints/" + author + "/" + name,
      function (data) {
        callback(null, data);
      }
    );
  };

  var updateBlueprint = function (blueprint, author, name) {
    return $.ajax({
      url: "http://localhost:8080/blueprints/" + author + "/" + name,
      type: "PUT",
      data: JSON.stringify(blueprint),
      contentType: "application/json",
    });
  };

  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    updateBlueprint: updateBlueprint,
  };
})();
