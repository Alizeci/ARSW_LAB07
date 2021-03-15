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
  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
  };
})();
