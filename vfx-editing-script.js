document.addEventListener("DOMContentLoaded", function() {
    const contactFormVFXEditing = document.getElementById("contact-form-vfx-editing");

    if (contactFormVFXEditing) {
        contactFormVFXEditing.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("VFX & Editing Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)");
            contactFormVFXEditing.reset();
        });
    }
});

