const buttonAddNewBook = document.querySelector('.add-book');

const modal = document.querySelector('#modal');
const buttonCancel = document.querySelector('.cancel');
const buttonReset = document.querySelector('.reset');

const library = document.querySelector('#library');
let books = library.children;

buttonAddNewBook.addEventListener('click', () => {
    modal.showModal();
    modal.focus()
    validateForm('#form');
})

const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector);

    const validationRules = [
        {
            attribute: 'required',
            isValid: (input) => {
                return input.value.trim() !== '';
            },
            errorMessage: (input, label) => {
                return `${label.textContent} is required`;
            }
        }
    ];

    const validateInput = formItem => {
        const label = formItem.querySelector('label');
        const input = formItem.querySelector('input');
        const errorContainer = formItem.querySelector('.error');
        let inputError = false;

        for (const rule of validationRules) {
            if(input.hasAttribute(rule.attribute) && !rule.isValid(input)) {
                errorContainer.textContent = rule.errorMessage(input, label);
                inputError = true;
            }
        }

        if (!inputError && errorContainer) {
            errorContainer.textContent = '';
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
            removeBlurEvents();
            addBookToLibrary();
            clearInput();
        }
    });

    const validateAllFormItems = formToValidate => {
        const formItems = Array.from(formToValidate.querySelectorAll('.form-item'));

        formItems.forEach(formItem => {
            validateInput(formItem);
        });

        return formItems.every(formItem => validateInput(formItem));
    }

    function validateOnBlur(e) {
        validateInput(e.target.parentElement);
        if(!validateInput(e.srcElement.parentElement)) {
            e.srcElement.addEventListener('input', validateOnInput);
        }
    }

    function validateOnInput(e) {
        console.log(e.srcElement);
        validateInput(e.srcElement.parentElement);
    }

    buttonCancel.addEventListener('click', () => {
        clearInput();
        removeBlurEvents()
    });

    modal.addEventListener('click', (e) => {
        if (e.target.tagName === 'DIALOG') {
            removeBlurEvents();
        }
    });

    function removeBlurEvents() {
        Array.from(formElement.elements).forEach(element => {
            element.removeEventListener('blur', validateOnBlur);
            modal.close()
        });
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
            if (input.getAttribute('id') === prop) {
                if (input.getAttribute('type') !== 'checkbox') {
                    book[prop] = input.value
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

    displayBook(book);
    clearInput();
}

function displayBook(book) {
    outer: for (let i = 0; i < myLibrary.length; i++) {
        for (let j = 1; j < books.length; j++) {
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
                if(myLibrary[i].hasOwnProperty(key)) {
                    createBookInfo(newText, key, list, i);
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
    library.appendChild(bookElement)

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

function createBookInfo(text, key, list, index) {
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
        } else {
            newText = document.createTextNode('✘');
        }
        bookInfoValue.appendChild(newText);
    } else {
        newText = document.createTextNode(myLibrary[index][key]);
        bookInfoValue.appendChild(newText);
    }
    listItem.appendChild(bookInfoValue);
}

function createBookButtons(text, bookContainer) {
    const textValues = ['Remove', 'Read']
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    bookContainer.appendChild(buttonContainer);
    for (i = 0; i < textValues.length; i++) {
        const buttonWrapper = document.createElement('div');
        const button = document.createElement('button');
        text = document.createTextNode(textValues[i]);
        button.appendChild(text);
        buttonContainer.appendChild(buttonWrapper);
        buttonWrapper.appendChild(button);
        if (textValues[i] === 'Remove') {
            button.addEventListener('click', removeBook);
        } else {
            button.addEventListener('click', toggleReadStatus);
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
    for (let j = 1; j < books.length; j++) {
        books[j].dataset.index = newIndex++;
    }
}

function toggleReadStatus() {
    console.log(this.parentElement)
    console.log(this.parentElement.parentElement)
    console.log(this.parentElement.parentElement.parentElement)
    console.log(this.parentElement.parentElement.parentElement.children[1])
    console.log(this.parentElement.parentElement.parentElement.children[1].children[3])
    console.log(this.parentElement.parentElement.parentElement.children[1].children[3].children[1])
    
    let readStatusElement = this.parentElement.parentElement.parentElement.children[1].children[3].children[1];

    for (let i = 0; i < myLibrary.length; i++) {
        if (this.parentElement.parentElement.parentElement.parentElement.dataset.index == i) {
            let readStatus;
            if (myLibrary[i].read) {
                readStatus = false;
                readStatusElement.textContent = '✘';
            } else {
                readStatusElement.textContent = '✔';
                readStatus = true;
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
        }
    });
}

// testing manual input
const bookOne = new Book(`1984`, `George Orwell`, 328, 9780451524935, true);
const bookTwo = new Book (`The Hitchhiker's Guide to the Galaxy`, `Douglas Adams`, 224, 9780345391803, false);

console.log(document.activeElement);