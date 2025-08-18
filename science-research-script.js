document.addEventListener("DOMContentLoaded", function() {
    const contactFormScience = document.getElementById("contact-form-science");

    if (contactFormScience) {
        contactFormScience.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Science & Research Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormScience.reset();
        });
    }
});

