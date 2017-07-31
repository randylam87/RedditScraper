// Queries for all notes for favorited items and returns an object via callback.
let showNotes = (event) => {
    $('#notes-content').empty();
    $('#notes-content').data('url', $(event.currentTarget).data('url'));
    $.get('/notes', {
        url: $(event.currentTarget).data('url')
    }, (data) => {
        console.log(data);
        appendNotes(data);
    });
};

let saveNotes = (event) => {
    let note = $('#notes-content').val();
    let url = $('#notes-content').data('url');
    $.post('/notes', {
        notes: note,
        url: url
    }, (data) => {
        console.log(data);
        $('#noteModal').modal('toggle');
    });
};


// Appends notes the modal-body (#notes-modal)
let appendNotes = (notes) => {
    if (notes.length === 0) {
        console.log('no notes found');
    } else {
        $('#notes-content').val(`${notes}`);
    }

};

// Deletes note from the database
let deleteFavorite = (event) => {
    console.log($(event.currentTarget).data('url'));
    $.post('/delete', {
        url: $(event.currentTarget).data('url')
    }, (data) => {
        console.log(data);
    })
    $($(event.currentTarget).parents('div.eye-bleach-container')[0]).remove();
};

// Event Handlers
$('body').on('click', '.favorite-notes', (event) => {
    showNotes(event);
});

$('#noteModal').on('click', '#save-notes', (event) => {
    saveNotes(event);
});

$('#append-bleach-container').on('click', '.remove-favorites', (event) => {
    deleteFavorite(event);
});