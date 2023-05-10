let formItems = document.querySelectorAll('.form-item');

for (let children of formItems) {
    for (let child of children.children) {
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