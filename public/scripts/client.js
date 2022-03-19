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

const createTweetElement = function(tweetData) {
  let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="left"><img src=${tweetData["user"].avatars} alt=""><span>${tweetData["user"].name}</span></div>
        <div class="right"><span>${tweetData["user"].handle}</span></div>
      </header>
      <p>${tweetData["content"].text}</p>
      <footer>
        <span>${tweetData["created_at"]}</span><span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i  class="fa-solid fa-heart"></i></span>
      </footer>
    </article>
  `);

  return $tweet;
};

const renderTweets = function(data) {
  data.forEach(element => {
    const $tweet = createTweetElement(element);
    $(".tweet-container").append($tweet);
  });
};

// AJAX to POST tweets on route /tweets
$("#tweet-submit").submit(function(event) {
  event.preventDefault();

  alert("Handler called");
  const serializedData = $(this).serialize();
  console.log(serializedData);

  $.post('/tweets', serializedData);

  // $.ajax('more-posts.html', { method: 'GET' })
  // .then(function (morePostsHtml) {
  //   console.log('Success: ', morePostsHtml);
  //   $button.replaceWith(morePostsHtml);
  // });  
});


renderTweets(data);
});
