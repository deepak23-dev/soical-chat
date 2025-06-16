const likeButtons = document.querySelectorAll('.like');
const postImages = document.querySelectorAll('.post-img');

likeButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const postId = button.getAttribute('data-post-id');

    // Toggle the heart icon between regular and solid
    let isLiked = false;
    if (button.classList.contains('fa-solid')) {
      button.className = 'fa-regular fa-heart'; // Unliked state
      button.style.color = ''; // Reset color
      isLiked = false;
    } else {

      button.className = 'fa-solid fa-heart'; // Liked state
      button.style.color = '#fe0000'; // Red color for liked state
      isLiked = true;
    }

    try {
      const response = await fetch(`/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLiked }) // Optional: send like/unlike state
      });

      // const data = await response.json();

      // console.log(data);
      
     
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
});
