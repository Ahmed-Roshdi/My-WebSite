document.addEventListener("DOMContentLoaded", function() {
    const contactFormDesign = document.getElementById("contact-form-design");

    if (contactFormDesign) {
        contactFormDesign.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Graphic Design Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormDesign.reset();
        });
    }
});

