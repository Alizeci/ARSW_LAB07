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

  var addNewBlueprint = function (blueprint) {
    return $.ajax({
      url: "http://localhost:8080/blueprints",
      type: "POST",
      data: JSON.stringify(blueprint),
      contentType: "application/json",
    });
  };

  var deleteBlueprint = function (author, name) {
    return $.ajax({
      url: "http://localhost:8080/blueprints/" + author + "/" + name,
      type: "DELETE",
    });
  };

  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    updateBlueprint: updateBlueprint,
    addNewBlueprint: addNewBlueprint,
    deleteBlueprint: deleteBlueprint,
  };
})();
