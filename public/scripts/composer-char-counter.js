$(document).ready(function() {
  // The counter updates its value in the output
  let counter = 140;
  $("#tweet-text").on('input', function() {
    const total = counter - this.value.length;
    if (total < 0) {
      $("output").css({"color": "red"});
    } else {
      $("output").css({"color": "gray"});
    }
    $("output").html(total);
  });

  
});