// Select all like buttons
const likeButtons = document.querySelectorAll('.like ');
const post=document.querySelectorAll('.post-img')
// console.log(post);

// Iterate over each like button to add an event listener
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle the heart icon between regular and solid
        if (button.classList.contains('fa-solid')) {
            button.className = 'fa-regular fa-heart'; // Unliked state
            button.style.color = ''; // Reset color
        } else {
            button.className = 'fa-solid fa-heart'; // Liked state
            button.style.color = '#fe0000'; // Red color for liked state
        // }
       
    }});
});

// post.forEach((el)=>{
//     el.addEventListener('dblclick',()=>{
//         likeButtons.forEach(button => {
//       // Toggle the heart icon between regular and solid
//         if (button.classList.contains('fa-solid')) {
//             button.className = 'fa-regular fa-heart'; // Unliked state
//             button.style.color = ''; // Reset color
//         } else {
//             button.className = 'fa-solid fa-heart'; // Liked state
//             button.style.color = '#fe0000'; // Red color for liked state
//         // }
       
//     }
// });
// })
// })