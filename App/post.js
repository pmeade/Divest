const posts = [];

function handleAction(actionType) {
    console.log(`User action: ${actionType}`);
    if (actionType === 'agree') {
        currentPost.style.transform = `translateX(-100%)`;
    } else if (actionType === 'maybe') {
        currentPost.style.transform = `translateY(-100%)`;
    } else if (actionType === 'disagree') {
        currentPost.style.transform = `translateX(100%)`;
    }

    currentPost.style.opacity = '0';
    setTimeout(() => {
        currentPost.remove();
        const posts = document.querySelectorAll('.post');
        if (posts.length > 0) {
            currentPost = posts[posts.length - 1];
        }
    }, 300);
}

function handleVote(voteType) {
    const postId = parseInt(currentPost.dataset.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.votes[voteType]++;
        savePost(post);
        console.log(`User voted: ${voteType} on post ${postId}`);
        console.log(post);
    }
}

function handleHashtagSubmit(event) {
    event.preventDefault();
    const hashtagInput = document.getElementById('hashtag-input').value;
    const postId = parseInt(currentPost.dataset.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.hashtags.push(`#${hashtagInput}`);
        currentPost.innerHTML += `<p>#${hashtagInput}</p>`;
        savePost(post);
        console.log(`Added hashtag: #${hashtagInput} to post ${postId}`);
        console.log(post);
    }
    document.getElementById('hashtag-form').reset();
}

function handlePostSubmit(event) {
    event.preventDefault();
    const postText = document.getElementById('post-text').value;
    const postHashtags = document.getElementById('post-hashtags').value.split(',').map(tag => tag.trim());

    const newPost = {
        id: posts.length + 1,
        text: postText,
        hashtags: postHashtags,
        votes: { upvote: 0, downvote: 0 }
    };
    posts.push(newPost);
    savePost(newPost);

    const newPostElement = document.createElement('div');
    newPostElement.className = 'post';
    newPostElement.dataset.id = newPost.id;
    newPostElement.innerHTML = `<p>${newPost.text}</p><p>${newPost.hashtags.join(' ')}</p>`;
    document.getElementById('post-container').appendChild(newPostElement);

    document.getElementById('post-form').reset();
    currentPost = newPostElement;
}