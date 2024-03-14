document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");

});
document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});
  $(document).ready(function () {
    // Expand and collapse of the menu bar
    let flag=false;

      $(".menu-btn").click(function () {
        if (flag === false) {
      $(".left_wala").css("display", "block");
    } else {
      $(".left_wala").css("display", "none");
    }
    
    flag = !flag; // Toggle the flag
  });
//   if($(window).width()>1001){
//     $(".left_wala").css("display", "block");
//   }
  
//   else{
//     $(".left_wala").css("display", "none");
// }
    // For toggling sub menus
    $(".sub-btn").click(function () {
      $(this).next(".sub-menu").slideToggle();
      $(this).find(".dropdown").toggleClass("rotate");
    });
    $(".gaming-sub-btn").click(function () {
      $(this).next(".gaming-sub-menu").slideToggle();
      $(this).find(".dropdown").toggleClass("rotate");
    });
    $(".sports-sub-btn").click(function () {
      $(this).next(".sports-sub-menu").slideToggle();
      $(this).find(".dropdown").toggleClass("rotate");
    });
    $(".business-sub-btn").click(function () {
      $(this).next(".business-sub-menu").slideToggle();
      $(this).find(".dropdown").toggleClass("rotate");
    });
    $(".crypto-sub-btn").click(function () {
      $(this).next(".crypto-sub-menu").slideToggle();
      $(this).find(".dropdown").toggleClass("rotate");
    });
  });
  // var del=document.getElementById()
  document.addEventListener("DOMContentLoaded", function () {
    let postId = 0;

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
      modal.style.display = "block";
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    document.getElementById("postForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];

      const userName = "User"; // Replace with actual user information
      const userProfilePic = "Project Images/user.png"; // Replace with actual path

      // Function to create a new post element
const createPostElement = (postId, userName, userProfilePic, title, fileType, file) => {
  const postContainer = document.getElementById("postsContainer");
  const post = document.createElement("div");
  post.className = "post";
  post.id = "post" + postId;
  postId++;

  // Create post elements (user information, title, media, buttons, and count)
  const userInfo = document.createElement("div");
  userInfo.className = "user-info";
  const userImg = document.createElement("img");
  userImg.src = userProfilePic;
  userImg.alt = "User Profile Picture";
  const username = document.createElement("span");
  username.textContent = userName;
  userInfo.appendChild(userImg);
  userInfo.appendChild(username);

  const postTitle = document.createElement("h1");
  postTitle.textContent = title;

  const postMedia = document.createElement("div");
  postMedia.className = "post-media";
  if (fileType === "image") {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    postMedia.appendChild(img);
  } else if (fileType === "video") {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.controls = true;
    postMedia.appendChild(video);
  }

  const likeCount = document.createElement("span");
  likeCount.className = "like-count";
  likeCount.textContent = "0";

  const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      const confirmation = confirm("Are you sure you want to delete this post?");
      if (confirmation) {
        post.remove();
      }
    });


  const commentSection = document.createElement("div");
  commentSection.className = "comment-section";
  commentSection.style.display = "none"; // Hide comment section by default

  const interactionButtons = document.createElement("div");
  interactionButtons.className = "interaction-buttons";
  const likeBtn = document.createElement("button");
  likeBtn.textContent = "Like";

  const commentBtn = document.createElement("button");
  commentBtn.textContent = "Comment";

  const commentInput = document.createElement("div");
  commentInput.className = "comment-input";
  commentInput.style.display = "none"; // Hide comment input by default
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add your comment...";
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.addEventListener("click", function () {
    const commentText = input.value;
    if (commentText) {
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.textContent = `${userName}: ${commentText}`;
      commentSection.appendChild(commentElement);
      input.value = "";
    }
  });
  commentInput.appendChild(input);
  commentInput.appendChild(submitBtn);

  // Add event listeners for like and comment buttons
  let liked = false;
  likeBtn.addEventListener("click", function () {
    // Increment the like count if not liked, else decrement
    const currentLikes = parseInt(likeCount.textContent);
    if (liked) {
      likeCount.textContent = currentLikes - 1;
    } else {
      likeCount.textContent = currentLikes + 1;
    }
    liked = !liked;
  });

  commentBtn.addEventListener("click", function () {
    // Toggle the visibility of the comment section and input
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    commentInput.style.display = commentInput.style.display === "none" ? "block" : "none";
  });

  interactionButtons.appendChild(likeBtn);
  interactionButtons.appendChild(commentBtn);
  interactionButtons.appendChild(likeCount);
  interactionButtons.appendChild(deleteBtn);

  // Append post elements to the post
  post.appendChild(userInfo);
  post.appendChild(postTitle);
  post.appendChild(postMedia);
  post.appendChild(interactionButtons);
  post.appendChild(commentInput);
  post.appendChild(commentSection);

  // Append post to the postsContainer
  postContainer.insertBefore(post, postContainer.firstChild);

};



      // Check if a file is selected
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Determine the file type (image or video)
          const fileType = file.type.split("/")[0];
          // Create a new post with the loaded file
          createPostElement(postId, userName, userProfilePic, title, fileType, file);
        };
        reader.readAsDataURL(file);
      } else {
        // If no file is selected, create a post without media
        createPostElement(postId, userName, userProfilePic, title);
      }

      // Reset form
      this.reset();

      // Close the modal
      modal.style.display = "none";
    });

    // JS for precreated posts
    const lcButtonsPosts = document.querySelectorAll('.LCButtons');

    // Iterate through each element with the LCButtons class
    lcButtonsPosts.forEach(function (post) {
        // Find the specific elements within each LCButtons post
        const likeCount = post.querySelector('.like-count');
        const likeBtn = post.querySelector('.like-btn');
        const commentBtn = post.querySelector('.comment-btn');
        const commentSection = post.querySelector('.comment-section');
        const commentInput = post.querySelector('.comment-input');
        const submitBtn = post.querySelector('.submit-btn');
        const userName="User"

        // Access the input element within the same scope
        const input = commentInput.querySelector('input');

// Add event listeners for like and comment buttons
let liked = false;
likeBtn.addEventListener("click", function () {
    // Increment the like count if not liked, else decrement
    const currentLikes = parseInt(likeCount.textContent);
    if (liked) {
        likeCount.textContent = currentLikes - 1;
    } else {
        likeCount.textContent = currentLikes + 1;
    }
    liked = !liked;
});

commentBtn.addEventListener("click", function () {
    // Toggle the visibility of the comment section and input
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
    commentInput.style.display = commentInput.style.display === "none" ? "block" : "none";

    // Move the comment input to the top of the comment section
    commentSection.insertBefore(commentInput, commentSection.firstChild);
});

submitBtn.addEventListener("click", function () {
    // Your existing comment submission code
    const commentText = input.value;
    if (commentText) {
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.textContent = `${userName}: ${commentText}`;

        // Insert the new comment below the comment input
        // commentSection.insertBefore(commentElement, commentInput.nextSibling);
        commentSection.appendChild(commentElement);

        input.value = "";
    }
    });

      // Initialize the like count with a space
        // updateLikeCount();

        // function updateLikeCount() {
        //     likeCount.textContent = `${parseInt(likeCount.textContent)} Like`;
        // }
    });
});
// });
