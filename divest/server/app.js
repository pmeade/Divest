document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    const agreeButton = document.getElementById('agree');
    const maybeButton = document.getElementById('maybe');
    const disagreeButton = document.getElementById('disagree');
    const upvoteButton = document.getElementById('upvote');
    const downvoteButton = document.getElementById('downvote');
    const hashtagForm = document.getElementById('hashtag-form');
    const postForm = document.getElementById('post-form');

    agreeButton.addEventListener('click', () => handleAction('agree'));
    maybeButton.addEventListener('click', () => handleAction('maybe'));
    disagreeButton.addEventListener('click', () => handleAction('disagree'));

    upvoteButton.addEventListener('click', () => handleVote('upvote'));
    downvoteButton.addEventListener('click', () => handleVote('downvote'));

    hashtagForm.addEventListener('submit', handleHashtagSubmit);
    postForm.addEventListener('submit', handlePostSubmit);
});