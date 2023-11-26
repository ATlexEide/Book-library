// Storage
let storage = [];
// Book object constructor
function Book(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.returnHasRead = function () {
                if (this.hasRead) { return 'Yes' }
                else { return 'No' }
        }
};

// Add a Book to Storage
function addBookToStorage(book) {
        storage.push(book);
};
// Buttons
//// Main Buttons
const openAddBookFormBtn = document.getElementById('open-add-book-form-button');
//// Form Buttons
const addBookBtn = document.getElementById('add-book-button');
const closeFormBtn = document.getElementById('close-form-button');
const applyEditsBtn = document.getElementById('apply-edits-button');
const cancelEditBtn = document.getElementById('cancel-edits-button');
const deleteBookBtn = document.getElementById('delete-book-button');

// HTML Elements
//// Book list
const bookList = document.getElementById('book-list');
//// Forms
const addBookForm = document.getElementById('add-book-form');
const editBookForm = document.getElementById('edit-book-form');
////Dialogs
const addBookDialog = document.getElementById('add-book-form-dialog');
const editBookDialog = document.getElementById('edit-book-form-dialog');

// Inputs
//// Add Book Form Inputs
const addBookTitleInput = document.getElementById('add-book-title-input');
const addBookAuthorInput = document.getElementById('add-book-author-input');
const addBookPagesInput = document.getElementById('add-book-pages-input');
const addBookHasReadInput = document.getElementById('add-book-has-read-input');
//// Edit Book Form Inputs
const editBookTitleInput = document.getElementById('edit-title-input');
const editBookAuthorInput = document.getElementById('edit-author-input');
const editBookPagesInput = document.getElementById('edit-pages-input');
const editBookHasReadInput = document.getElementById('edit-has-read-input');

// Open Add Book Form
openAddBookFormBtn.addEventListener('click', () => {
        addBookDialog.showModal();
});

// Add New Book to Storage
addBookBtn.addEventListener('click', () => {
        hasReadValue = false;
        if (addBookHasReadInput.checked) { hasReadValue = true }
        if (addBookTitleInput.value === '') {
                addBookTitleInput.setCustomValidity('Please enter a title');
                addBookTitleInput.reportValidity(); return
        }
        addBookTitleInput.setCustomValidity('');
        if (addBookAuthorInput.value === '') {
                addBookAuthorInput.setCustomValidity('Please enter a name');
                addBookAuthorInput.reportValidity(); return
        }
        addBookAuthorInput.setCustomValidity('');
        if (addBookPagesInput.value === '' || addBookPagesInput.value < 1 || addBookPagesInput.value > 50000) {
                addBookPagesInput.setCustomValidity('Please enter a number from 1 to 50000');
                addBookPagesInput.reportValidity(); return
        }
        addBookPagesInput.setCustomValidity('');
        if (hasReadInput.checked) { hasRead = true }
        else { hasRead = false };
        addBookToStorage(new Book(addBookTitleInput.value, addBookAuthorInput.value, addBookPagesInput.value, hasReadValue))
        bookList.innerHTML = '';
        display();
        addBookForm.reset();
});

closeFormBtn.addEventListener('click', () => {
        event.preventDefault();
        addBookForm.reset();
        addBookDialog.close();
});
cancelEditBtn.addEventListener('click', () => {
        event.preventDefault();
        editBookForm.reset();
        editBookDialog.close();
});
// Display Storage as Cards
function display() {
        // Empty Book List to avoid multiples
        bookList.innerHTML = '';
        // Add New Card
        for (let i = 0; i < storage.length; i++) {
                let currentBook = storage[i];
                const newCard = document.createElement('a');
                newCard.setAttribute('id', `${i}`);
                newCard.setAttribute('class', `card`);
                newCard.innerHTML = `
                <h2>${currentBook.title} <br>by ${currentBook.author}</h2>
                <ul>
                <li>Title: ${currentBook.title}</li>
                <li>Author: ${currentBook.author}</li>
                <li>Pages: ${currentBook.pages}</li>
                <li>Has Read: ${currentBook.returnHasRead()}</li>
                </ul>`;
                bookList.appendChild(newCard);

        };
        getIndexOfClickedCardAndOpenModal();
};

let currIndex = null;
function getIndexOfClickedCardAndOpenModal() {
        const cards = document.getElementsByClassName('card');
        const cardPressed = e => {
                index = e.currentTarget.id;  // Get ID of Clicked Element
                currIndex = index
                showModalOnClick(currIndex)
        }
        for (let card of cards) {
                card.addEventListener("click", cardPressed);
        }
};



function showModalOnClick(index) {
        editBookDialog.showModal();
        editBookTitleInput.value = storage[index].title;
        editBookAuthorInput.value = storage[index].author;
        editBookPagesInput.value = storage[index].pages;
        if (storage[index].hasRead) { editBookHasReadInput.checked = true }
        else { editBookHasReadInput.checked = false }
};

function applyEdits(index) {
        if (editBookTitleInput.value !== storage[index].title) { storage[index].title = editBookTitleInput.value };
        if (editBookAuthorInput.value !== storage[index].author) { storage[index].author = editBookAuthorInput.value };
        if (editBookPagesInput.value !== storage[index].pages) { storage[index].pages = editBookPagesInput.value };
        if (editBookHasReadInput.checked) { storage[index].hasRead = true } else { storage[index].hasRead = false };
        display();
};
applyEditsBtn.addEventListener('click', () => {
        applyEdits(currIndex);
});
function deleteBook(index) {
        console.log(`Deleted ${storage[index].title}`);
        storage.splice(index, 1);
        display();
};
deleteBookBtn.addEventListener('click', () => {
        deleteBook(currIndex);
});




// Fake books for testing
for (let i = 0; i < 10; i++) {
        titles = ['OMG, a book', 'Look a book', 'How to understand women', 'How to sleep', 'Help i overslept', 'JS for babies', 'How i ruined my dev career', 'Kebab', 'The beautiful land of CSS', 'My little blue haired man']
        authors = ['Maya', 'Mila', 'Griffin', 'Alex', 'Alex', 'Griffin', 'Giraffe', 'Daniel', 'No one', 'Maya']
        addBookToStorage(new Book(titles[i], authors[i], 69, false))

}
display()
