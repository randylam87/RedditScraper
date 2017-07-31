// Queries for all notes for favorited items and returns an object via callback.
let showNotes = () => {
  $.get('/notes', (notes) => {
    appendNotes(notes);
  });
};

let saveNotes = () => {
    $.post('/notes', (notes) => {

    });
};


// Appends notes the modal-body (#notes-modal)
let appendNotes = (notes) => {

};

// Deletes note from the database
let deleteFavorite = () => {

};

// Event Handlers
$('#append-bleach-container').on('click', '.favorite-notes', (event) => {
    console.log(event.currentTarget);
});

$('#append-bleach-container').on('click', '.remove-favorites', (event) => {
    console.log(event.currentTarget);
});