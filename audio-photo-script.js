document.addEventListener("DOMContentLoaded", function() {
    const contactFormAudioPhoto = document.getElementById("contact-form-audio-photo");

    if (contactFormAudioPhoto) {
        contactFormAudioPhoto.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Audio, Photo & Lighting Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormAudioPhoto.reset();
        });
    }
});

