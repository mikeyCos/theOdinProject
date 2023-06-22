const buttonAddNewBook = document.querySelector('.button-add-book');

const modal = document.querySelector('#modal');
const buttonCancel = document.querySelector('.cancel');
const buttonReset = document.querySelector('.reset');

const library = document.querySelector('#library');
let books = library.children;

buttonAddNewBook.addEventListener('click', () => {
    modal.inert = true;
    modal.showModal();
    modal.inert = false;
    modal.focus()
    validateForm('#form');
})

let counter = 0;

const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector);

    const validationRules = [
        {
            attribute: 'minlength',
            isValid: input => {
                return input.value && input.value.length >= parseInt(input.minLength, 10);
            },
            errorMessage: (input, label) => {
                return `${label.textContent} needs to be at least ${input.minLength} characters long.`;
            }
        },
        {
            attribute: 'customMaxLength',
            isValid: input => {
                return input.value && input.value.length <= parseInt(input.getAttribute('customMaxLength'), 10);
            },
            errorMessage: (input, label) => {
                return `${label.textContent} needs to be less than ${input.getAttribute('customMaxLength')} characters long.`;
            }
        },
        {
            attribute: 'pattern',
            isValid: (input) =>  {
                const patternRegex = new RegExp(input.pattern);
                return patternRegex.test(input.value);
            },
            errorMessage: (input, label) => {
                if (input.id === 'isbn') {
                    return `Not a valid value for ${label.textContent}. (E.g. 978-1-86197-876-9)`;
                } else {
                    return `Not a valid value for ${label.textContent}.`;
                }
            }
        },
        {
            attribute: 'required',
            isValid: input => {
                return input.value.trim() !== '';
            },
            errorMessage: (input, label) => {
                return `${label.textContent} is required`;
            }
        }
    ];

    const validateInput = formItem => {
        const validity = formItem.querySelector('.validity');
        let inputError = false;
        // check if an element with class named validity exists
        if (validity) {
            const label = formItem.querySelector('label');
            const input = formItem.querySelector('input');
            const errorContainer = formItem.querySelector('.error');
            const validityIcon = validity.querySelector('img');  
            for (const rule of validationRules) {
                if(input.hasAttribute(rule.attribute) && !rule.isValid(input)) {
                    errorContainer.textContent = rule.errorMessage(input, label);
                    inputError = true;
                    validityIcon.setAttribute('src', './assets/invalid_close_FILL0_wght400_GRAD0_opsz48.svg');
                    validity.style.display = 'grid';
                    input.className = 'invalid';
                }
            }

            if (!inputError && errorContainer) {
                errorContainer.textContent = '';
                validityIcon.setAttribute('src', './assets/valid_check_FILL0_wght400_GRAD0_opsz48.svg');
                validity.style.display = 'grid';
                input.className = 'valid';
            }
        }
        return !inputError;
    }

    formElement.setAttribute('novalidate', '');

    Array.from(formElement.elements).forEach(element => {
        if (element.tagName !== 'BUTTON') {
            element.addEventListener('blur', validateOnBlur)
        }
    });

    formElement.addEventListener('submit', e => {
        e.preventDefault();
        const formValidity = validateAllFormItems(formElement);
        if (formValidity) {
            removeEvents();
            addBookToLibrary();
            e.stopImmediatePropagation();
            buttonAddNewBook.scrollIntoView();
        }
    }, false);

    const validateAllFormItems = formToValidate => {
        const formItems = Array.from(formToValidate.querySelectorAll('.form-item'));

        formItems.forEach(formItem => {
            validateInput(formItem);
        });

        return formItems.every(formItem => validateInput(formItem));
    }

    function validateOnBlur(e) {
        validateInput(e.target.parentElement.parentElement);
        e.stopImmediatePropagation();
        if(!validateInput(e.srcElement.parentElement.parentElement)) {
            e.srcElement.addEventListener('input', validateOnInput);
        }
    }

    function validateOnInput(e) {
        validateInput(e.srcElement.parentElement.parentElement);
        e.stopImmediatePropagation();
    }

    buttonCancel.addEventListener('click', () => {
        clearInput();
        removeEvents()
    });

    modal.addEventListener('click', (e) => {
        if (e.target.tagName === 'DIALOG') {
            removeEvents();
        }
    });

    function removeEvents() {
        Array.from(formElement.elements).forEach(element => {
            element.removeEventListener('blur', validateOnBlur);
            element.removeEventListener('input', validateOnInput);
        });
        modal.close();
    }
}

let myLibrary = []

function Book(title, author, pages, isbn, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isbn = isbn
    this.read = read;
    myLibrary.push(this);
}

Book.prototype.toggleReadStatus = function(readStatus) {
    this.read = readStatus;
    console.log(this) //for debugging
}

function addBookToLibrary() {
    const formInputs = document.querySelectorAll('#form input');
    const book = new Book()
    for (let input of formInputs) {
        for (let prop in book) {
            if (input.id === prop) {
                if (input.getAttribute('type') !== 'checkbox') {
                    book[prop] = input.value
                    if (input.id === 'isbn') {
                        book[prop] = parseInt(input.value.replace(/-/g, ''), 10);
                    }
                } else if (input.getAttribute('type') === 'checkbox') {
                    if (input.checked) {
                        book[prop] = true;
                    } else {
                        book[prop] = false;
                    }
                }
            }
        }
    }

    displayBook();
    clearInput();
}

function displayBook() {
    outer: for (let i = 0; i < myLibrary.length; i++) {
        for (let j = 0; j < books.length - 1; j++) {
            //checks if a book in myLibrary[] currently exists on the DOM
            if (books[j].dataset.index == i) {
                continue outer;
            }
        }

        const bookContainer = createBookContainer(i);
        const list = document.createElement('ul');
        let newText;
        for (let key in myLibrary[i]) {
            if (key === 'title') {
                createBookHeader(newText, myLibrary[i][key], bookContainer);
                bookContainer.appendChild(list);
            } else {
                if (myLibrary[i].hasOwnProperty(key)) {
                    createBookInfo(bookContainer, newText, key, list, i);
                }
            }
            // console.log(key + ' : ' + myLibrary[i][key]); //for debugging
        }
        createBookButtons(newText, bookContainer);
    }
}

function createBookContainer(index) {
    const bookElement = document.createElement('div');
    bookElement.className = `book`;
    bookElement.setAttribute('data-index', index);
    library.insertBefore(bookElement, buttonAddNewBook)

    const bookContainer = document.createElement('div');
    bookContainer.className = `container`;
    return bookElement.appendChild(bookContainer);
}

function createBookHeader(text, title, bookContainer) {
    const titleElement = document.createElement('h2');
    newText = document.createTextNode(title)
    titleElement.appendChild(newText);
    bookContainer.appendChild(titleElement);
}

function createBookInfo(bookContainer, text, key, list, index) {
    const listItem = document.createElement('li');
    list.appendChild(listItem);

    const bookInfo = document.createElement('p');
    newText = document.createTextNode(key);
    bookInfo.appendChild(newText);
    listItem.appendChild(bookInfo);

    const bookInfoValue = document.createElement('p');

    if (key === 'read') {
        if (myLibrary[index][key] === true) {
            newText = document.createTextNode('✔');
            bookInfoValue.style.color = 'green';
            bookContainer.classList.add('read');
        } else {
            newText = document.createTextNode('✘');
            bookInfoValue.style.color = 'red';
        }
        bookInfoValue.appendChild(newText);
    } else {
        newText = document.createTextNode(myLibrary[index][key]);
        bookInfoValue.appendChild(newText);
    }
    listItem.appendChild(bookInfoValue);
}

function createBookButtons(text, bookContainer) {
    const imageURL = ['./assets/delete_FILL0_wght400_GRAD0_opsz48.svg', './assets/mark_unread_chat_alt_FILL0_wght400_GRAD0_opsz48.svg']
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    bookContainer.appendChild(buttonContainer);
    for (i = 0; i < imageURL.length; i++) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'wrapper';
        const button = document.createElement('button');
        const image = document.createElement('img');
        image.setAttribute('src', imageURL[i]);

        button.appendChild(image);
        buttonContainer.appendChild(buttonWrapper);
        buttonWrapper.appendChild(button);

        if (imageURL[i].includes('delete')) {
            button.addEventListener('click', removeBook);
            button.className = 'remove';
        } else {
            button.addEventListener('click', toggleReadStatus);
            button.className = 'toggle-read-status';
        }
    }
}

function removeBook() {
    console.log(this.parentElement.parentElement.parentElement)
    for (let i = 0; i < myLibrary.length; i++) {
        if (this.parentElement.parentElement.parentElement.parentElement.dataset.index == i) {
            myLibrary.splice(i, 1);
            this.parentElement.parentElement.parentElement.parentElement.remove()
            updateDataIndex();
        }
    }
}

// updates books' attributes data-index
function updateDataIndex() {
    let newIndex = 0;
    for (let j = 0; j < books.length - 1; j++) {
        books[j].dataset.index = newIndex++;
    }
}

function toggleReadStatus() {    
    let readStatusElement = this.parentElement.parentElement.parentElement.children[1].children[3].children[1];
    let bookContainer = this.parentElement.parentElement.parentElement;
    for (let i = 0; i < myLibrary.length; i++) {
        if (this.parentElement.parentElement.parentElement.parentElement.dataset.index == i) {
            let readStatus;
            if (myLibrary[i].read) {
                readStatus = false;
                readStatusElement.textContent = '✘';
                readStatusElement.style.color = 'red';
                bookContainer.classList.remove('read');
            } else {
                readStatus = true;
                readStatusElement.textContent = '✔';
                readStatusElement.style.color = 'green';
                bookContainer.classList.add('read');
            }
            myLibrary[i].toggleReadStatus(readStatus);
        }
    }
}

buttonReset.addEventListener('click', clearInput);

function clearInput() {
    const formElement = document.querySelector('#form');
    Array.from(formElement.querySelectorAll('.form-item')).forEach(formItem => {
        formItem.querySelector('input').value = '';
        if (formItem.querySelector('.error')) {
            formItem.querySelector('.error').textContent = '';
            formItem.querySelector('.validity').style.display = 'none';
            formItem.querySelector('input').classList.remove('valid', 'invalid');
        } else if (formItem.querySelector('#read')) {
            formItem.querySelector('#read').checked = false;
        }
    });
}

// testing manual input
const bookOne = new Book(`1984`, `George Orwell`, 328, 9780451524935, true);
const bookTwo = new Book (`The Hitchhiker's Guide to the Galaxy`, `Douglas Adams`, 224, 9780345391803, false);
displayBook();