const email  = document.getElementById('mail');

email.addEventListener('input', (event) => {
    if (email.validity.typeMismatch) {
        email.setCustomValidity('Invalid email address. Example, example@123.com');
    } else if (email.validity.tooShort) {
        email.setCustomValidity('Email is too short. Enter a minimum of 10 characters.');
    } else {
        email.setCustomValidity('');
    }
});