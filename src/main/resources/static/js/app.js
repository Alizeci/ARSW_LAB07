var Module = (function () {
  var _blueprints;
  var author;
  var _blueprintName;
  var _mockdata;
  var _newPoints = [];
  var url = "js/apiclient.js";

  const _toObject = function (author, mockdata) {
    _blueprints = [];
    _mockdata = mockdata;
    mockdata.map(function (bp) {
      _blueprints.push({ name: bp.name, numPoints: bp.points.length });
    });
    _completeTable();
    _calculatePoints();
  };

  const _calculatePoints = function () {
    const points = _blueprints.map(({ numPoints }) => numPoints);
    const acumular = (acumulador, numero) => acumulador + numero;
    let totalPoints = points.length > 0 ? points.reduce(acumular, 0) : 0;
    document.getElementById("lbTotal").innerHTML =
      "Total user points: " + totalPoints;
  };

  const _completeTable = function () {
    $(document).ready(function () {
      _blueprints.map(function (bp) {
        let fields =
          "<tr><td>" +
          bp.name +
          "</td><td>" +
          bp.numPoints +
          "</td><td><input id='boton' type='button' value='Open' onclick=" +
          'Module.getBlueprintsByNameAndAuthor("' +
          bp.name +
          '")' +
          "></td></tr>";
        $("table").append(fields);
      });
    });
  };

  const _drawInCanvas = function (name, blueprint) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    _cleanCanvas(c, ctx);
    let blueprintPoints = blueprint.points.slice(1, blueprint.points.length);
    console.log(blueprintPoints);
    let initx = blueprint.points[0].x;
    let inity = blueprint.points[0].y;
    blueprintPoints.forEach((element) => {
      ctx.moveTo(initx, inity);
      ctx.lineTo(element.x, element.y);
      ctx.stroke();
      initx = element.x;
      inity = element.y;
    });
  };

  const _cleanTable = function () {
    $(document).ready(function () {
      $("table")
        .find("td")
        .each(function () {
          $(this).parents("tr").remove();
        });
    });
    document.getElementById("lbTotal").innerHTML = "Total user points: ";
  };

  const _cleanCanvas = function (c, ctx) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
  };

  const getBlueprintsByAuthor = function () {
    _cleanTable();
    $.getScript(url, function () {
      author = $("#authorName").val();
      document.getElementById("lbAuthor").innerHTML = author + " blueprints:";
      apiclient.getBlueprintsByAuthor(author, _toObject);
    });
  };

  const getBlueprintsByNameAndAuthor = function (blueprintName) {
    _blueprintName = blueprintName;
    document.getElementById("lbName").innerHTML =
      "Current Blueprint: " + blueprintName;
    $.getScript(url, function () {
      apiclient.getBlueprintsByNameAndAuthor(
        blueprintName,
        author,
        _drawInCanvas
      );
    });
  };

  const addNewPoints = function (event) {
    var canvas = document.getElementById("myCanvas");
    clientRect = canvas.getBoundingClientRect();
    if (_blueprintName != null) {
      _newPoints.push({
        x: Math.round(event.clientX - clientRect.left),
        y: Math.round(event.clientY - clientRect.top),
      });
      console.log(_newPoints);
    }
  };

  const updateBlueprint = function () {
    var oldBlueprint = _mockdata.find((bp) => bp.name == _blueprintName); //devuelve el valor del primer elemento que cumpla la condición
    console.log(oldBlueprint);

    _newPoints.forEach((element) => {
      oldBlueprint.points.push({ x: element.x, y: element.y });
    });
    console.log(oldBlueprint);
    apiclient.updateBlueprint(oldBlueprint, author, _blueprintName).then(
      function () {
        getBlueprintsByAuthor();
        getBlueprintsByNameAndAuthor(_blueprintName);
      },
      function () {
        alert("$.get failed!");
      }
    );
  };

  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    updateBlueprint: updateBlueprint,
    _cleanCanvas: _cleanCanvas,
    init: function () {
      var canvas = document.getElementById("myCanvas");

      if (window.PointerEvent) {
        canvas.addEventListener(
          "pointerdown",
          addNewPoints,
          function (event) {}
        );
      } else {
        canvas.addEventListener("mousedown", addNewPoints, function (event) {});
      }
    },
  };
})();
