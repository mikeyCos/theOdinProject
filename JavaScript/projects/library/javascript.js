const buttonAddNewBook = document.querySelector('.add-book');

const dialog = document.querySelector('dialog');
const buttonAddBook = document.querySelector('.add');
const buttonCancel = document.querySelector('.cancel');
const buttonReset = document.querySelector('.reset');

const formOne = document.querySelectorAll('#form input');

buttonCancel.addEventListener('click', clearInput);
buttonReset.addEventListener('click', clearInput);

buttonAddNewBook.addEventListener('click', () => {
    dialog.showModal();
    dialog.addEventListener('click', closeDialog); 
})

buttonAddBook.addEventListener('click', addBookToLibrary);

function closeDialog(e) {
    if(e.target.tagName === 'DIALOG') {
        dialog.close();
        dialog.removeEventListener('click', closeDialog);
    }
}

buttonCancel.addEventListener('click', () => {
    dialog.close();
})

function clearInput() {
    formOne.forEach((element) => {
        if(element.value !== '') {
            element.value = '';
        }
    })
}

let myLibrary = []

function Book(title, author, pages, isbn) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isbn = isbn
    myLibrary.push(this);
}

//need to validate input values
//if input is invalid, do NOT close dialog
function addBookToLibrary(e) {
    e.preventDefault();
    const book = new Book()
    formOne.forEach((input) => {
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
        }
    })
    dialog.close();
    displayBook();
    clearInput();
}

function displayBook() {
    const library = document.querySelector('#library');
    let books = library.children;
    //display only new books
    //check if the book 
    //what happens if an item in the array is deleted?
    outer: for(let i=0; i < myLibrary.length; i++) {
        for(let j=1; j < library.children.length - 1;j++) {
            debugger
            // console.log(books[j].dataset.index);
            if(books[j].dataset.index == i) {
                // console.log(books[j]);
                // console.log(books[j].dataset.index);
                continue outer;
            }
        }
        const book = document.createElement('div');
        book.className = `book-${i+1}`;
        book.setAttribute('data-index', i)
        library.appendChild(book);

        const bookContainer = document.createElement('div');
        bookContainer.className = `container`;
        book.appendChild(bookContainer);
        
        const list = document.createElement('ul'); 
        for (let key in myLibrary[i]) {
            if (key === 'title') {
                const title = document.createElement('h2');
                title.textContent = myLibrary[i][key];
                bookContainer.appendChild(title);

                bookContainer.appendChild(list);
            } else {
                const listItem = document.createElement('li');
                list.appendChild(listItem);

                const bookInfo = document.createElement('p');
                bookInfo.textContent = key;
                listItem.appendChild(bookInfo);

                const bookInfoValue = document.createElement('p');
                bookInfoValue.textContent = myLibrary[i][key];
                listItem.appendChild(bookInfoValue);
            }
            console.log(key + ' : ' + myLibrary[i][key]);
        }
    }
}

// testing manual input
const bookOne = new Book(`1984`, `George Orwell`, 328, 9780451524935);
const bookTwo = new Book (`The Hitchhiker's Guide to the Galaxy`, `Douglas Adams`, 224, 9780345391803);

// displayBook();
