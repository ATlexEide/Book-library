// Book object constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = false;
    this.displayHasRead = function () {
        if (hasRead === true) { return `Has not read` }
        else if (hasRead === false) { return `Has read` }
        else { return 'ERROR' }
    }
    this.displayed = false;
};

// Push book to library
function addBookToLibrary(book) {
    libraryStorage.push(book);
};



const libraryStorage = [];
const editDialog = document.getElementById('edit-book');
editDialog.innerHTML = `<form id="edit-book-form" method="dialog">
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
            <input type="checkbox" name="edit-has-read" id="edit-has-read">
        </div>
</fieldset>
</form>
<div id="form-buttons">
<button id="edit-book-button">Update</button>
<button id="cancel-edit">Cancel</button>
</div>`


// Display books in libraryStorage on screen
function displayBooks() {
    for (let i = 0; i < libraryStorage.length; i++) {
        const book = libraryStorage[i];
        if (!book.displayed) {
            book.displayed = true;
            // Add Book Card
            const anchor = document.createElement('a');
            if (book.title === '') { book.title = undefined; }
            anchor.setAttribute('onclick', `showUpdateModal(${i})`)
            anchor.setAttribute('id', `${i}`)
            anchor.setAttribute('class', 'card-anchor');


            const newBook = document.createElement('div');
            newBook.setAttribute('class', 'book-listing');
            // Add header to card
            const bookTitle = document.createElement('h2');
            bookTitle.setAttribute('id', `${i}-header`)
            bookTitle.innerHTML = `<span id="${i}-header-title">${book.title}</span> <br>by <span id="${i}-header-author">${book.author}</span>`;
            newBook.appendChild(bookTitle);
            // Add list element to card
            const div = document.createElement('div');
            div.setAttribute('class', 'book-info-div');
            div.innerHTML = `<h3>Info:</h3>`
            const bookInfoList = document.createElement('ul');
            // Add Info to list
            const title = document.createElement('li');
            title.setAttribute('class', 'book-info-title');
            title.setAttribute('id', `${i}-info-title`);
            title.innerHTML = `Title: ${book.title}`
            bookInfoList.appendChild(title);

            const author = document.createElement('li');
            author.setAttribute('class', 'book-info-author');
            author.setAttribute('id', `${i}-info-author`);
            author.innerHTML = `Author: ${book.author}`
            bookInfoList.appendChild(author);

            const pages = document.createElement('li');
            pages.setAttribute('class', 'book-info-pages');
            pages.setAttribute('id', `${i}-info-pages`);
            pages.innerHTML = `Pages: ${book.pages}`
            bookInfoList.appendChild(pages);

            const hasRead = document.createElement('li');
            hasRead.setAttribute('class', 'book-info-has-read');
            hasRead.setAttribute('id', `${i}-info-has-read`);
            hasRead.innerHTML = `Read status: ${book.displayHasRead()}`
            // Append Stuff
            bookInfoList.appendChild(hasRead);
            div.appendChild(bookInfoList);
            newBook.appendChild(div);
            anchor.appendChild(newBook);
            bookList.appendChild(anchor);
        }
    };
};


const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');



// Fake test books for testing
for (let i = 0; i < 10; i++) {
    addBookToLibrary(new Book(`Title${i}`, `Author${i}`, `42${i - i}`))
}


/////////////////////////////////////////////////////////
// Add books
/////////////////////////////////////////////////////////
//// Add Book Form Inputs
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
let hasReadInput = document.getElementById('hasRead');
/////////////////////////////////////////////////////////
// Buttons
const addBookBtn = document.getElementById('add-book');
const modalBtn = document.getElementById('open-modal');
const modalCloseButton = document.getElementById('close');
const cancelEditBtn = document.getElementById('cancel-edit');
const dialog = document.getElementById('add-book-dialog')
/////////////////////////////////////////////////////////
// Misc
const editBookForm = document.getElementById('edit-book-form')
const clickableCards = document.getElementsByClassName('card-anchor');

/////////////////////////////////////////////////////////

// Add book button
addBookBtn.addEventListener('click', () => {
    if (hasReadInput.checked) { hasRead = true }
    else { hasRead = false };
    libraryStorage.push(new Book(titleInput.value, authorInput.value, pagesInput.value));

    displayBooks();
    dialog.close();
    console.log('yipp');
    console.table(libraryStorage);
});
// Show/Open modal
modalBtn.addEventListener('click', () => {
    dialog.showModal()
});
// Close form button logic
modalCloseButton.addEventListener('click', () => {
    editBookForm.reset();
    addBookForm.reset();
    dialog.close();
});
// Cancel edit button
cancelEditBtn.addEventListener('click', () => {
    editDialog.close()
    editBookForm.reset()
})
function closeCard() {
    editDialog.close()
    editBookForm.reset()
};
/////////////////////////////////////////////////////////
// Edit Book info logic
function showUpdateModal(index) {
    console.log(index)
    editDialog.showModal()
    applyChanges(index)
};
function applyChanges(index) {
    const book = libraryStorage[index];
    // Input Fields
    let editTitleInput = document.getElementById('edit-title');
    let editAuthorInput = document.getElementById('edit-author');
    let editPagesInput = document.getElementById('edit-pages');
    let editHasReadInput = document.getElementById('edit-has-read')
    // Info 
    title = document.getElementById(`${index}-info-title`)
    author = document.getElementById(`${index}-info-author`)
    pages = document.getElementById(`${index}-info-pages`)
    hasRead = document.getElementById(`${index}-info-has-read`)
    const updateBtn = document.getElementById('edit-book-button');

    // Default Form Values on open
    editTitleInput.value = book.title;
    editAuthorInput.value = book.author;
    editPagesInput.value = book.pages;
    // Update innerHTML
    updateBtn.addEventListener('click', () => {
        book.title = editTitleInput.value;
        // Header
        cardHeader = document.getElementById(`${index}-header-title`);
        cardHeaderTitle = document.getElementById(`${index}-header-title`);
        cardHeaderAuthor = document.getElementById(`${index}-header-author`);
        // Change Header Text
        cardHeader.innerHTML = `${editTitleInput.value}`;
        cardHeaderTitle.innerHTML = `${editTitleInput.value}`;
        cardHeaderAuthor.innerHTML = `${editAuthorInput.value}`;
        // Info
        title.innerHTML = `Title: ${editTitleInput.value}`;
        author.innerHTML = `Author: ${editAuthorInput.value}`;
        pages.innerHTML = `Pages: ${editPagesInput.value}`;
        if (editHasReadInput.checked) { book.hasRead = true }
        if (book.hasRead) { hasRead.innerHTML = `Read status: Has Read` }
        if (!book.hasRead) { hasRead.innerHTML = `Read status: Not Read` }

        closeCard();
        index = null;
    })


}


displayBooks()