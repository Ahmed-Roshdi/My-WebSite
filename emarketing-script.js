document.addEventListener("DOMContentLoaded", function() {
    const contactFormEmarketing = document.getElementById("contact-form-emarketing");

    if (contactFormEmarketing) {
        contactFormEmarketing.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("E-Marketing Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormEmarketing.reset();
        });
    }
});

