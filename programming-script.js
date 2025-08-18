document.addEventListener("DOMContentLoaded", function() {
    const contactFormProgramming = document.getElementById("contact-form-programming");

    if (contactFormProgramming) {
        contactFormProgramming.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Programming & Development Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormProgramming.reset();
        });
    }
});

