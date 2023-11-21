const libraryStorage = [];
const card = document.getElementById('edit-book');
card.innerHTML = `<form id="edit-book-form" method="dialog">
<fieldset>
    <legend>Edit Book</legend>
        <div>
            <label for="edit-title">Update Title:</label>
            <input  type="text" name="edit-title" id="edit-title" placeholder="">
        </div>
        <div>
            <label for="edit-author">Update Author:</label>
            <input  type="text" name="edit-author" id="edit-author" placeholder="">
        </div>
        <div>
            <label for="edit-pages">Update Pages:</label>
            <input type="number" name="edit-pages" id="edit-pages" placeholder="">
        </div>
        <div>
            <label for="hasRead">Check if you have read the book:</label>
            <input type="checkbox" name="editHasRead" id="editHasRead">
        </div>
</fieldset>
</form>
<div id="form-buttons">
<button id="edit-book-button">Update</button>
<button id="cancel-edit">Cancel</button>
</div>`
// Display books in libraryStorage on screen
function displayBooks() {
    libraryStorage.forEach((book) => {
        if (!book.displayed) {
            book.displayed = true;
            // Add Book Card
            const anchor = document.createElement('a');
            anchor.setAttribute('onclick', 'editCards()');
            anchor.setAttribute('id', `${book.title}`)
            anchor.setAttribute('class', 'card-anchor');


            const newBook = document.createElement('div');
            newBook.setAttribute('class', 'book-listing');
            // Add header to card
            const bookTitle = document.createElement('h2');
            bookTitle.setAttribute('id', `${book.title}-header`)
            bookTitle.innerHTML = `<span id="${book.title}-header-title">${book.title}</span> <br>by <span id="${book.title}-header-author">${book.author}</span>`;
            newBook.appendChild(bookTitle);
            // Add list element to card
            const div = document.createElement('div');
            div.setAttribute('class', 'book-info-div');
            div.innerHTML = `<h3>Info:</h3>`
            const bookInfoList = document.createElement('ul');
            // Add Info to list
            const title = document.createElement('li');
            title.setAttribute('class', 'book-info-title');
            title.setAttribute('id', `${book.title}-info-title`);
            title.innerHTML = `Title: ${book.title}`
            bookInfoList.appendChild(title);

            const author = document.createElement('li');
            author.setAttribute('class', 'book-info-author');
            author.setAttribute('id', `${book.title}-info-author`);
            author.innerHTML = `Author: ${book.author}`
            bookInfoList.appendChild(author);

            const pages = document.createElement('li');
            pages.setAttribute('class', 'book-info-pages');
            pages.setAttribute('id', `${book.title}-info-pages`);
            pages.innerHTML = `Pages: ${book.pages}`
            bookInfoList.appendChild(pages);

            const hasRead = document.createElement('li');
            hasRead.setAttribute('class', 'book-info-has-read');
            hasRead.setAttribute('id', `${book.title}-info-has-read`);
            hasRead.innerHTML = `Read status: ${book.displayHasRead()}`
            // Append Stuff
            bookInfoList.appendChild(hasRead);
            div.appendChild(bookInfoList);
            newBook.appendChild(div);
            anchor.appendChild(newBook);
            bookList.appendChild(anchor);
        }
    });
};
const addBookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');

// Book object constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = null;
    this.displayHasRead = function () {
        if (hasRead === 0) { return `Has not read` }
        else if (hasRead === 1) { return `Has read` }
        else { return 'ERROR' }
    }
    this.displayed = false;
};
/////////////////////////////////////////////////////////
// Push book to library
function addBookToLibrary(book) {
    libraryStorage.push(book);
};

// Fake test books for testing
for (let i = 0; i < 10; i++) {
    addBookToLibrary(new Book(`Title${i}`, `Author${i}`, `42${i - i}`))
}
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
//// Add Book Form Inputs
/////////////////////////////////////////////////////////
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
let hasReadInput = document.getElementById('hasRead');
/////////////////////////////////////////////////////////

// Add book button
const addBookBtn = document.getElementById('add-book');
addBookBtn.addEventListener('click', () => {
    let hasRead = 0
    if (hasReadInput.checked) { hasRead = 1 }
    libraryStorage.push(new Book(titleInput.value, authorInput.value, pagesInput.value, hasRead))

    displayBooks();
    dialog.close()
    addBookForm.reset()
    editCards();
    console.log('yipp');
    console.table(libraryStorage);
});




const modalBtn = document.getElementById('open-modal');
const modalCloseButtons = document.getElementsByClassName('close');
const dialog = document.getElementById('add-book-dialog')

function dialogOpenCheck() {
    dialog.open ? console.log('Dialog is open') : console.log('Dialog is closed')
}


modalBtn.addEventListener('click', () => {
    dialog.showModal()
    dialogOpenCheck();
})

for (let i = 0; i < modalCloseButtons.length; i++) {
    button = modalCloseButtons[i];
    button.addEventListener('click', () => {
        dialog.close()
        dialogOpenCheck()
    })

}

const editBookForm = document.getElementById('edit-book-form')
const clickableCards = document.getElementsByClassName('card-anchor');
function editCards() {
    for (let i = 0; i < clickableCards.length; i++) {
        const clickCard = clickableCards[i];
        clickCard.addEventListener('click', () => {
            const book = libraryStorage[i];
            book.displayed = false;

            const editTitle = document.getElementById('edit-title')
            editTitle.value = `${book.title}`
            const editAuthor = document.getElementById('edit-author')
            editAuthor.value = `${book.author}`
            const editPages = document.getElementById('edit-pages')
            editPages.value = `${book.pages}`
            card.showModal()

            const updateBookBtn = document.getElementById('edit-book-button');
            updateBookBtn.addEventListener('click', () => {
                // Input values
                let listingHeader = document.getElementById(`${book.title}-header`);
                let headerTitleSpan = document.getElementById(`${book.title}-header-title`);
                let headerAuthorSpan = document.getElementById(`${book.title}-header-author`);
                let infoTitle = document.getElementById(`${book.title}-info-title`);
                let infoAuthor = document.getElementById(`${book.title}-info-author`);
                let infoPages = document.getElementById(`${book.title}-info-pages`);
                let infoHasRead = document.getElementById(`${book.title}-info-has-read`);

                // Input fields
                let editTitleInput = document.getElementById('edit-title').value;
                let editAuthorInput = document.getElementById('edit-author').value;
                let editPagesInput = document.getElementById('edit-pages').value;
                let editHasReadInput = document.getElementById('editHasRead');

                if (editTitleInput !== '') {
                    // Change IDs
                    book.title = `${editTitleInput}`;
                    headerTitleSpan.id = `${editTitleInput}-header-title`;
                    headerAuthorSpan.id = `${editTitleInput}-header-author`;
                    listingHeader.id = `${editTitleInput}-header`;
                    infoTitle.id = `${editTitleInput}-info-title`;
                    infoAuthor.id = `${editTitleInput}-info-author`;
                    infoPages.id = `${editTitleInput}-info-pages`;
                    infoHasRead.id = `${editTitleInput}-info-has-read`;

                    infoTitle.innerHTML = `Title: ${editTitleInput}`;
                    headerTitleSpan.innerHTML = `${editTitleInput}`;
                }
                if (editAuthorInput !== '') {
                    book.author = editAuthorInput;
                    infoAuthor.innerHTML = `Author: ${editAuthorInput}`;
                    headerAuthorSpan.innerHTML = `${editAuthorInput}`;
                }
                if (editPagesInput !== '') {
                    book.pages = editPagesInput;
                    infoPages.innerHTML = `Pages: ${editPagesInput}`;
                }
                if (editHasReadInput.checked) { book.hasRead = 1; infoHasRead.innerHTML = `Has read` }
                else { book.hasRead = 0; infoHasRead.innerHTML = `Has not read` };
                console.log('yipp');
                editBookForm.reset();
                card.close();;
            });
        })
    }
}
const cancelEditBtn = document.getElementById('cancel-edit');
cancelEditBtn.addEventListener('click', () => {
    card.close()
    editBookForm.reset();
})
displayBooks()
editCards()