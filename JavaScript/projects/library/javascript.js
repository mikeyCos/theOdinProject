const buttonAddNewBook = document.querySelector('.add-book');

const dialog = document.querySelector('dialog');
const buttonCancel = document.querySelector('.cancel');
const buttonReset = document.querySelector('.reset');

const formInputs = document.querySelectorAll('#form input');

const library = document.querySelector('#library');
let books = library.children;

buttonAddNewBook.addEventListener('click', () => {
    dialog.showModal();
    dialog.addEventListener('click', closeDialog); 
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

        for(const rule of validationRules) {
            if(input.hasAttribute(rule.attribute) && !rule.isValid(input)) {
                errorContainer.textContent = rule.errorMessage(input, label);
                inputError = true;
            }
        }

        if(!inputError && errorContainer) {
            errorContainer.textContent = '';
        }

        return !inputError;
    }

    formElement.setAttribute('novalidate', '');

    Array.from(formElement.elements).forEach(element => {
        element.addEventListener('blur', e => {
            validateInput(e.srcElement.parentElement);
        });
    });

    formElement.addEventListener('submit', e => {
        e.preventDefault();
        
        const formValidity = validateAllFormItems(formElement);

        if(formValidity) {
            addBookToLibrary();
        }
    });

    const validateAllFormItems = formToValidate => {
        const formItems = Array.from(formToValidate.querySelectorAll('.form-item'));

        formItems.forEach(formItem => {
            validateInput(formItem);
        })

        return formItems.every(formItem => validateInput(formItem));
    }

    buttonReset.addEventListener('click', () => {
        Array.from(formElement.elements).forEach(element => {
            element.value = '';
        })
    });
}

validateForm('#form');

function closeDialog(e) {
    if(e.target.tagName === 'DIALOG') {
        dialog.close();
        dialog.removeEventListener('click', closeDialog);
    }
}

buttonCancel.addEventListener('click', () => {
    dialog.close();
})

let myLibrary = []

function Book(title, author, pages, isbn, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isbn = isbn
    this.read = read;
    myLibrary.push(this);
}

//need to validate input values
//if input is invalid, do NOT close dialog
function addBookToLibrary() {
    const book = new Book()
    formInputs.forEach((input) => {
        switch (input.name) {
            case 'title':
                book.title = input.value;
                break;
            case 'author':
                book.author = input.value;
                break;
            case 'pages':
                book.pages = input.value;
                break;
            case 'isbn':
                book.isbn = input.value;
                break;
            case 'read':
                if(input.checked) {
                    book.read = true;
                } else {
                    book.read = false;
                }
                break;
        }
    })
    dialog.close();
    displayBook();
    clearInput();
}

function displayBook() {
    outer: for(let i = 0; i < myLibrary.length; i++) {
        for(let j = 1; j < books.length; j++) {
            if(books[j].dataset.index == i) {
                continue outer;
            }
        }
        const book = document.createElement('div');
        book.className = `book`;
        book.setAttribute('data-index', i)
        library.appendChild(book);

        const bookContainer = document.createElement('div');
        bookContainer.className = `container`;
        book.appendChild(bookContainer);
        
        const list = document.createElement('ul');
        let newText;
        for (let key in myLibrary[i]) {
            if (key === 'title') {
                const title = document.createElement('h2');
                newText = document.createTextNode(myLibrary[i][key])
                title.appendChild(newText);
                bookContainer.appendChild(title);

                bookContainer.appendChild(list);
            } else {
                const listItem = document.createElement('li');
                list.appendChild(listItem);

                const bookInfo = document.createElement('p');
                newText = document.createTextNode(key);
                bookInfo.appendChild(newText);
                listItem.appendChild(bookInfo);

                const bookInfoValue = document.createElement('p');
                if (key === 'read') {
                    if (myLibrary[i][key] === true) {
                        newText = document.createTextNode('✔');
                    } else {
                        newText = document.createTextNode('✘');
                    }
                    bookInfoValue.appendChild(newText);
                } else {
                    newText = document.createTextNode(myLibrary[i][key]);
                    bookInfoValue.appendChild(newText);
                }
                listItem.appendChild(bookInfoValue);
            }
            console.log(key + ' : ' + myLibrary[i][key]);
        }

        const buttonRemoveBook = document.createElement('button');
        newText = document.createTextNode('Remove');
        buttonRemoveBook.appendChild(newText);
        bookContainer.appendChild(buttonRemoveBook)
        buttonRemoveBook.addEventListener('click', removeBook);

        const buttonReadStatus = document.createElement('button');
        newText = document.createTextNode('Read');
        buttonReadStatus.appendChild(newText);
        bookContainer.appendChild(buttonReadStatus);
        buttonReadStatus.addEventListener('click', toggleReadStatus);
    }
}

function removeBook() {
    for(let i = 0; i < myLibrary.length; i++) {
        if (this.parentElement.parentElement.dataset.index == i) {
            myLibrary.splice(i, 1);
            this.parentElement.parentElement.remove()
            updateDataIndex();
        }
    }
}

// updates books' attributes class and data-index
function updateDataIndex() {
    let newIndex = 0;
    for(let j = 1; j < books.length; j++) {
        books[j].dataset.index = newIndex++;
    }
}

function toggleReadStatus() {
    console.log(myLibrary[Number(this.parentElement.parentElement.dataset.index)].read);
    let readStatusNode = this.parentElement.children[1].children[3].children[1]
    let readStatus = myLibrary[Number(this.parentElement.parentElement.dataset.index)].read;
    if (readStatus) {
        myLibrary[Number(this.parentElement.parentElement.dataset.index)].read = false;
        readStatusNode.textContent = '✘';
    } else {
        myLibrary[Number(this.parentElement.parentElement.dataset.index)].read = true;
        readStatusNode.textContent = '✔';
    }
}

// buttonCancel.addEventListener('click', clearInput);
// buttonReset.addEventListener('click', clearInput);

// function clearInput() {
//     // const errorContainer = document.querySelectorAll('.error');
//     // formInputs.forEach((element) => {
//     //     if(element.value !== '') {
//     //         element.value = '';
//     //         errorContainer.textContent = '';
//     //     }
//     // });
// }

// testing manual input
const bookOne = new Book(`1984`, `George Orwell`, 328, 9780451524935, true);
const bookTwo = new Book (`The Hitchhiker's Guide to the Galaxy`, `Douglas Adams`, 224, 9780345391803, false);
