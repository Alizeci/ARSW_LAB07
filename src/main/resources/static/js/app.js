var Module = (function () {
  var _blueprints;
  var author;
  var blueprintName;
  var url = "js/apimock.js";

  const _toObject = function (author, mockdata) {
    _blueprints = [];
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
      apimock.getBlueprintsByAuthor(author, _toObject);
    });
  };

  const getBlueprintsByNameAndAuthor = function (blueprintName) {
    blueprintName = blueprintName;
    document.getElementById("lbName").innerHTML =
      "Current Blueprint: " + blueprintName;
    $.getScript(url, function () {
      apimock.getBlueprintsByNameAndAuthor(
        blueprintName,
        author,
        _drawInCanvas
      );
    });
  };

  const addNewPoints = function (event){
    let blueprintPoints;
      for (let bp of _blueprints){
        console.log(bp.name);
        console.log(blueprintName);
        if (bp.name == blueprintName){
          bp.points.push( { x: event.pageX , y: event.pageY});
          console.log(blueprintPoints);
          _drawInCanvas(bp.name,bp);
        }
      }
  }

  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    init:function(){
      var canvas = document.getElementById("myCanvas"); 
      var context = canvas.getContext("2d");

      if(window.PointerEvent) {
        canvas.addEventListener("pointerdown", function(event){
          console.log('x: ' + event.pageX + ', y: ' + event.pageY);
          canvas.addEventListener("pointerdown", addNewPoints, false);
          
        });
      }
      else {
        canvas.addEventListener("mousedown", function(event){
          console.log('x: ' + event.pageX + ', y: ' + event.pageY);
          }
        );
      }
    }  
  };
})();
