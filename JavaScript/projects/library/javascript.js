const buttonAddNewBook = document.querySelector('.add-book');

const dialog = document.querySelector('dialog');
const buttonCancel = document.querySelector('.cancel');
const buttonAddBook = document.querySelector('.add');

const formNode = document.querySelectorAll('#form');
const form = formNode[0];

// let library = document.querySelector('#library');

buttonAddNewBook.addEventListener('click', () => {
    dialog.showModal();
    if(dialog.open) {
        dialog.addEventListener('click', closeDialog);
    }   
})

function closeDialog(e) {
    console.log(e.target) //for debugging
    if(e.target.tagName === 'DIALOG') {
        dialog.close();
        // do I need to removeEventListener?
        // removeEventListener('click', closeDialog)
    }
}

buttonCancel.addEventListener('click', () => {
    dialog.close();
})

let myLibrary = []

function Book(title, author, pages, isbn) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isbn = isbn
    myLibrary.push(this);
}

function addBookToLibrary() {
    
}

function getInput() {

}

function displayBook() {
    let library = document.querySelector('#library');
    for(let i=0; i < myLibrary.length; i++) {
        const book = document.createElement('div');
        book.className = `book-${i+1}`;
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
    //loop through the array 'myLibrary'
    // display books on the page
}

// testing manual input
const bookOne = new Book(`1984`, `George Orwell`, 328, 9780451524935);
const bookTwo = new Book (`The Hitchhiker's Guide to the Galaxy`, `Douglas Adams`, 224, 9780345391803);

displayBook();