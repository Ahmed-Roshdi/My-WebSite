document.addEventListener('DOMContentLoaded', function() {
    const contactFormAI = document.getElementById('contact-form-ai');

    if (contactFormAI) {
        contactFormAI.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('AI Contact Form submitted! (This is a placeholder. In a real application, this would send data to a backend service.)');
            // In a real application, you would send this data to a backend service or EmailJS
            // Example using EmailJS (assuming you have it set up):
            /*
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    alert('Message sent successfully!');
                }, function(error) {
                    alert('Failed to send message: ' + error);
                });
            */
            contactFormAI.reset();
        });
    }
});

