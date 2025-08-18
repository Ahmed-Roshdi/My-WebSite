document.addEventListener("DOMContentLoaded", function() {
    const contactFormWritingTranslation = document.getElementById("contact-form-writing-translation");

    if (contactFormWritingTranslation) {
        contactFormWritingTranslation.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Content Writing & Translation Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormWritingTranslation.reset();
        });
    }
});

