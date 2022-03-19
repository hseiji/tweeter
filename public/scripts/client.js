/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  // function that GET all tweets from route /tweets/ using AJAX
  const loadTweets = () => {
    $(".tweet-container").empty();
    $.ajax({
      method: 'GET',
      url:'/tweets/'
    })
    .then((res) => {
      renderTweets(res);
      $("#tweet-error").hide();
    });
  }

  loadTweets();

  // Escape function to avoid code injection for example: <script>$("body").empty();</script>
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function that creates the template literals for each specific tweet
  const createTweetElement = function(tweetData) {
    const timePassed = timeago.format(tweetData["created_at"]);
    let $tweet = $(`
      <article class="tweet">
        <header>
          <div class="left"><img src=${tweetData["user"].avatars} alt=""><span>${tweetData["user"].name}</span></div>
          <div class="right"><span>${tweetData["user"].handle}</span></div>
        </header>
        <p>${escape(tweetData["content"].text)}</p>
        <footer>
          <span>${timePassed}</span><span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i  class="fa-solid fa-heart"></i></span>
        </footer>
      </article>
    `);
    return $tweet;
  };

  // function that renders all tweets (by appending the mark up html) on index.html
  const renderTweets = function(data) {
    data.forEach(element => {
      const $tweet = createTweetElement(element);
      $(".tweet-container").prepend($tweet);
    });
  };

  // AJAX to POST tweets on route /tweets
  $("#tweet-submit").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetContent = $("#tweet-text").val(); // Checking the textarea content
    console.log(tweetContent);

    // Hiding error element


    // Edge cases: Validation
    if (tweetContent === "" || tweetContent === null) {
      $("#tweet-error").text("Please type something before submitting...");
      $("#tweet-error").show();
      return;
    }
    if (tweetContent.length > 140) {
      $("#tweet-error").text("Please note, your tweet is too long! Maximum characters of 140");
      $("#tweet-error").show();
      return;      
    }

    $.post('/tweets', serializedData)
      .then(() => {
        loadTweets();
        $("#tweet-text").val("") // Clears the textarea
      });
  });

// renderTweets(data);
});
