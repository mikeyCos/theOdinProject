let formItems = document.querySelectorAll('.form-item');

for (let children of formItems) {
    for (let child of children.children) {
        if (child.tagName === 'INPUT' && child.getAttribute('id') !== 'password-confirm') {
            let message;
            if (!child.checkValidity()) {
                message = setErrorMessage(child.getAttribute('id'));
                child.setCustomValidity(message);
            }
            child.setCustomValidity('');
            
            child.addEventListener('blur', (e) => {
                let validationId = e.target.getAttribute('aria-describedby');
                let validationMessageContainer = document.getElementById(validationId);
                if (!e.target.checkValidity()) {
                    e.target.style.border = '2px solid #FF0000';

                    validationMessageContainer.innerText = message;
                    
                    child.addEventListener('input', (e) => {
                        e.target.setCustomValidity('');
                        if (e.target.checkValidity()) {
                            validationMessageContainer.innerText = '';
                            e.target.removeAttribute('style');
                        } else {
                            e.target.style.border = '2px solid #FF0000';
                            validationMessageContainer.innerText = message;
                        }
                    });
                } else {
                    validationMessageContainer.innerText = '';
                    e.target.removeAttribute('style');
                }
            });
        } else if (child.tagName === 'INPUT' && child.getAttribute('id') === 'password-confirm') {     
            let password = document.getElementById('password');
            let validationId = child.getAttribute('aria-describedby');
            let validationMessageContainer = document.getElementById(validationId);
            
            child.addEventListener('blur', (e) => {
                if (e.target.value !== password.value) {
                    e.target.style.border = '2px solid #FF0000';
                    password.style.border = '2px solid #FF0000';
                    validationMessageContainer.innerText = 'Passwords do not match.';
                } else if (password.checkValidity() && e.target.value === password.value) {
                    e.target.removeAttribute('style');
                    password.removeAttribute('style');
                    validationMessageContainer.innerText = '';
                }
            });
        }
    }
}

let submitButton = document.getElementById('form-button');
submitButton.addEventListener('click', validateInputs);

function validateInputs(e) {
    for (let children of formItems) {
        for (let child of children.children) {
            let message;
            if (child.tagName === 'INPUT' && child.getAttribute('id') !== 'password-confirm') {
                if (!child.checkValidity()) {
                    message = setErrorMessage(child.getAttribute('id'));
                    child.setCustomValidity(message);
                    child.style.border = '2px solid #FF0000';

                    let validationId = child.getAttribute('aria-describedby');
                    let validationMessageContainer = document.getElementById(validationId);
                    validationMessageContainer.innerText = message;

                    child.setCustomValidity('');
                }
            }
        }
    }
}

function setErrorMessage (id) {
    switch (id) {
        case 'firstname':
            return 'First name required. Must be between 1 or 50 characters long; lowercase and uppercase letters only.';
            // break;
        case 'lastname':
            return 'Last name required. Must be between 1 or 50 characters long; lowercase and uppercase letters only.';
            // break;
        case 'email':
            return 'Email required. Must include only 1 \'@\' character.';
            // break;
        case 'phone':
            return 'Phone number required. Must be at least 10 characters long.';
            // break;
        case 'password':
            return 'Password required. Must be at least 8 characters long consisting with at least 1 capital letter, 1 lowercase letter, 1 number and 1 symbol.';
            // break;
        case 'password-confirm':
            return 'Confirm password required. Passwords do not match.';
        default:
            break;
    }
}