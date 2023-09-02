// Get all the menu links
const menuLinks = document.querySelectorAll('nav ul li a');
// Add click event listeners to each menu link
menuLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Get the target section ID from the link's href attribute
    const targetSectionId = link.getAttribute('href'); 

    // Scroll to the target section using smooth scrolling
    const targetSection = document.querySelector(targetSectionId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener("DOMContentLoaded", function() {
  var scrollDownIcon = document.querySelector(".scroll-down-icon");
  scrollDownIcon.addEventListener("click", function(event) {
    event.preventDefault();
    var aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
});

  window.addEventListener('scroll', function() {
    const navBar = document.querySelector('.nav-bar');
    const contentSections = document.querySelectorAll('.content-section');

    if (window.pageYOffset > 0) {
        navBar.classList.add('fixed-nav');
        contentSections.forEach(function(section) {
            section.style.paddingTop = '70px'; // Adjust the padding to match the height of the navigation bar
        });
    } else {
        navBar.classList.remove('fixed-nav');
        contentSections.forEach(function(section) {
            section.style.paddingTop = '0';
        });
    }
});


//ChatGPT Feature
// Get references to HTML elements
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");

// Event listener for user input submission
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const userQuestion = userInput.value;
    appendMessage("user", userQuestion);
    sendQuestionToChatbot(userQuestion);
    userInput.value = "";
  }
});

// Function to append a message to the chat window
function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
  chatWindow.appendChild(messageElement);
}

// Function to send user question to the backend and receive the response
function sendQuestionToChatbot(question) {
  // Set up the API endpoint URL
  const apiUrl = "YOUR_BACKEND_API_URL"; // Replace with your actual backend API URL
  // Define the request body
  const requestBody = {
    question: question
  };
  
  // Make the API request using the Fetch API
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      // Get the chatbot's response from the data
      const chatbotResponse = data.response;

      // Call the appendMessage function to append the response to the chat window
      appendMessage("chatbot", chatbotResponse);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    });
}

