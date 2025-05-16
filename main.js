const scrollRevealOption = {
    distance: "50",
    origin: "bottom",
    duration: 1000,
};

scrollRevealOption().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
});
scrollRevealOption(),reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 500,
});
scrollRevealOption(),reveal(".header__content p", {
    ...scrollRevealOption,
    delay: 1000,
});
scrollRevealOption(),reveal(".header__content form", {
    ...scrollRevealOption,
    delay: 1500,
});

// Display the current year dynamically
const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// Interactivity for social links
const socialLinks = document.querySelectorAll(".social-link");
socialLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.color = "#ff5733"; // Changes color on hover
    });
    link.addEventListener("mouseout", () => {
        link.style.color = ""; // Reverts back to default color
    });
});

// Function for the "Start Learning" button
function showAlert() {
    alert("Welcome! Ready to start learning?");
}

// Function for login button
function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        alert(`Welcome back, ${username}!`);
    } else {
        alert("Please fill out all required fields.");
    }
}