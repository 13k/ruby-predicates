(function($) {
  var results = [
    "3.141592653589793",
    "\"no\"",
    "0",
    "nil",
    "#<Enumerator: ...>",
    "Exception: NoMethodError"
  ];

  var flashes = [
    "hell, yes",
    "well, maybe",
    "you bet",
    "certainly",
    "sure",
    "can be",
    "sometimes",
    "not in <code>fixed-width</code> font"
  ];

  function randomString(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomResult() {
    return randomString(results);
  }

  function randomFlash() {
    return randomString(flashes);
  }

  $(function() {
    $("#hero").on('mouseenter', function() {
      var flash = randomFlash(),
          content = $("<span/>").html(flash),
          timeout = (content.text().length/2) * 100;

      $("#eval-result").empty().append(content);

      setTimeout(function() {
        $("#eval-result").empty().text(randomResult());
      }, timeout);
    });

    $("#source-toggle").on('click', function(ev) {
      ev.preventDefault();
      $("#source").toggle();
    });

    $("#eval-result").text(randomResult());
  });
}(jQuery));
