let formItems = document.querySelectorAll('.form-item');

for (let children of formItems) {
    for (let child of children.children) {
        if (child.tagName === 'INPUT') {
            // let isValid = child.validity.valid;

            child.addEventListener('blur', function(e) {
                let isValid = e.target.validity.valid;
                let message;
                let validationId = e.target.getAttribute('aria-describedby');
                let validationContainer = document.getElementById(validationId);
                if (!isValid) {
                    switch (e.target.getAttribute('id')) {
                        case 'firstname':
                            message = 'Please enter your first name.';
                            break;
                        case 'lastname':
                            message = 'Please enter your last name.';
                            break;
                        case 'email':
                            message = 'Please enter your email.'
                            break;
                        case 'phone':
                            message = 'Please enter your phone number.'
                            break;
                        case 'password':
                            message = 'Please enter a password.'
                            break;
                        case '':

                            break;
                        default: 
                            return;
                    }
                    e.target.style.border = '2px solid #FF0000';
                    validationContainer.innerText = message;
                } else {
                    validationContainer.innerText = '';
                    e.target.style.border = '2px solid #35b635';
                }
            })
        }
    }
}