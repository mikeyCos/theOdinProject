let formItems = document.querySelectorAll('.form-item');

for (let children of formItems) {
    for (let child of children.children) {
<<<<<<< HEAD
        if (child.tagName === 'INPUT') {
            child.addEventListener('input', (e) => {
                let validationId = e.target.getAttribute('aria-describedby');
                let validationContainer = document.getElementById(validationId);
                console.log('e.target.value:' + e.target.value);
                console.log('test');
                if (e.target.checkValidity()) {
                    e.target.style.border = '2px solid #35b635';
                    validationContainer.innerText = '';
                } else {
                    child.addEventListener('blur', function(e) {
                        let isValid = e.target.validity.valid;
                        let message;
                        if (!isValid) {
                            switch (e.target.getAttribute('id')) {
                                case 'firstname':
                                    message = 'Please enter your first name.';
                                    e.target.setCustomValidity(message);
                                    // only contains letters
                                    // no numbers or symbols
                                    break;
                                case 'lastname':
                                    message = 'Please enter your last name.';
                                    // only contains letters
                                    // no numbers or symbols
                                    break;
                                case 'email':
                                    message = 'Please enter your email.'
                                    // example, example@.a.nl
                                    // 2 periods after one another is not allowed
                                    // local-part max length of 64 characters
                                    // domain-part max length of 63 characters
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
=======
        if (child.tagName === 'INPUT' && child.id !== 'password-confirm') {
            let message;
            if (!child.checkValidity()) {
                switch (child.getAttribute('id')) {
                    case 'firstname':
                        message = 'First name';
                        break;
                    case 'lastname':
                        message = 'Last name';
                        break;
                    case 'email':
                        message = 'Email';
                        break;
                    case 'phone':
                        message = 'Phone';
                    case 'password':
                        message = 'Password';
>>>>>>> sign-up-form-js
                }
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
                }
            });
        } else if (child.tagName === 'INPUT' && child.id == 'password-confirm') {
            let password = document.getElementById('password').value;
            child.addEventListener('input', (e) => {
                if (e.target.value === password) {
                    console.log('passwords match');
                }
            });
        }
    }
}