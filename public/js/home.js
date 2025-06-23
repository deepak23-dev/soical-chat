const likeButtons = document.querySelectorAll('.like');
const postImages = document.querySelectorAll('.post-img');

likeButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const postId = button.getAttribute('data-post-id');

    // Toggle the heart icon between regular and solid
    let isLiked = false;
    

    try {
      const response = await fetch(`/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLiked }) // Optional: send like/unlike state
      });

      const data = await response.json();

      // console.log(data);
      if(data.success){
           button.className = 'fa-solid fa-heart'; // Liked state
          button.style.color = '#fe0000'; // Red color for liked state
          isLiked = true;
      }else{
            button.className = 'fa-regular fa-heart'; // Unliked state
            button.style.color = ''; // Reset color
            isLiked = false;
      }
      
     
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
});

const likesData=async()=>{
   try {
      const response = await fetch(`/like`, {
        method: 'GET',
    
     // Optional: send like/unlike state
      });

      const data = await response.json();

// console.log(data);



 likeButtons.forEach(button => {
  const postId = button.getAttribute('data-post-id');
  let matched = false;

  for (const el of data.data) {
    if (el.postId.toString() === postId && el.isliked && data.id.id === el.userId) {
      button.className = 'fa-solid fa-heart';
      button.style.color = '#fe0000';
      matched = true;
      break; // Stop checking once matched
    }
  }

  if (!matched) {
    button.className = 'fa-regular fa-heart';
    button.style.color = '';
  }
});
     
    } catch (error) {
      console.error('Fetch error:', error);
    }
}


likesData();


