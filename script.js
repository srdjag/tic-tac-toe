jQuery.fn.extend({
  disable: function(state) {
    return this.each(function() {
      var $this = $(this);
      $this.toggleClass("disabled", state);
    });
  }
});

var ticTac = true;
var winningCombinations;
var content = [];
var content2 = [];

function empty() {
  $(".notice").css("opacity", "0");
  $(".notice").css("transform", "translateY(0px)");
  $(".grid p").empty();
  $(".switch").prop("disabled", false);
  resetContent();
  ticTac = true;
  $(".current-player").html("X");
  $("p").click(write);
  $(".winner")
    .hide()
    .html("")
    .fadeIn("fast");
  $(".grid p").css("color", "white");
  document.title = "Tic-tac-toe";
}

function switchit() {
  ticTac = !ticTac;
  console.log(ticTac);
  if (!ticTac) {
    $(".current-player")
      .hide()
      .html("O")
      .fadeIn("fast");
    document.title = "Tic-tac-toe | O";
  } else if (ticTac) {
    $(".current-player")
      .hide()
      .html("X")
      .fadeIn("fast");
    document.title = "Tic-tac-toe | X";
  }
}

function write() {
  $(".switch").prop("disabled", true);

  var _this = $(this);
  var _id = this.id;

  if (ticTac) {
    if (_this.is(":empty")) {
      _this
        .hide()
        .append("X")
        .fadeIn("fast");
      writeContent(_id, ticTac);
      ticTac = !ticTac;
      $(".current-player")
        .hide()
        .html("O")
        .fadeIn("fast");
      document.title = "Tic-tac-toe | O";
    } else if (!_this.is(":empty")) {
      return;
    }
  } else if (!ticTac) {
    if (_this.is(":empty")) {
      _this
        .hide()
        .append("O")
        .fadeIn("fast");
      writeContent(_id, ticTac);
      ticTac = !ticTac;
      $(".current-player")
        .hide()
        .html("X")
        .fadeIn("fast");
      document.title = "Tic-tac-toe | X";
    } else if (!_this.is(":empty")) {
      return;
    }
  }
  checkForWinner();
}

function writeContent(_id, ticTac) {
  if (ticTac) {
    content.push(_id);
    console.log(content);
  } else if (!ticTac) {
    content2.push(_id);
    console.log(content2);
  }
}

function colorWinner(a, b, c) {
  $("#" + a).css("color", "red");
  $("#" + b).css("color", "red");
  $("#" + c).css("color", "red");
}

function combination(a, b, c) {
  if (
    content.indexOf(a) > -1 &&
    content.indexOf(b) > -1 &&
    content.indexOf(c) > -1
  ) {
    $(".winner")
      .hide()
      .append("X player won!")
      .fadeIn("fast");
    colorWinner(a, b, c);
    $("p").off("click");
    $(".notice").css("opacity", "1");
    $(".notice").css("transform", "translateY(30px)");
  }
  if (
    content2.indexOf(a) > -1 &&
    content2.indexOf(b) > -1 &&
    content2.indexOf(c) > -1
  ) {
    $(".winner")
      .hide()
      .append("O player won!")
      .fadeIn("fast");
    colorWinner(a, b, c);
    $("p").off("click");
    $(".notice").css("opacity", "1");
    $(".notice").css("transform", "translateY(30px)");
  }
}

function checkForWinner() {
  combination("1", "2", "3");
  combination("4", "5", "6");
  combination("7", "8", "9");
  combination("1", "4", "7");
  combination("2", "5", "8");
  combination("3", "6", "9");
  combination("1", "5", "9");
  combination("3", "5", "7");

  if (!$(".grid p").is(":empty") && $(".winner").is(":empty")) {
    $(".winner")
      .hide()
      .append("Draw!")
      .fadeIn("fast");
    $(".notice").css("opacity", "1");
    $(".notice").css("transform", "translateY(30px)");
  }
}

function resetContent() {
  content = [];
  content2 = [];
}

document.addEventListener("keyup", event => {
  if (event.keyCode == 82) {
    empty();
  }
});

$(document).ready(function() {
  $(".grid p").click(write);
  var ticTac = true;
  $(".current-player").html("X");
});
