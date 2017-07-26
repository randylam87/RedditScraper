// Queries for all notes for favorited items
let showNotes = () => {
  $.get('/notes', (notes) => {
    // Appends div with all scraped data to #eye-bleach-container
    appendNotes(notes);
  });
};


let appendNotes = (queryResults) => {
  queryResults.forEach((bleach) => {
    let title = bleach.title;
    let url = bleach.url;
    let thumbnail = bleach.thumbnail;
    let eyeBleachDiv = $(`
    <div class="eye-bleach-container col-sm-2 text-center">
            <div class='row'>
                <div class='eye-bleach-title col-sm-12'><strong>${title}</strong></div>
            </div>
            <div class='row'>
                <div class='eye-bleach-img col-sm-6'>
                    <a href='${url}'><img class='thumbnail' src='${thumbnail}'></a>
                </div>
                <div class='favorite-div col-sm-6'>
                    <button class='btn btn-danger btn-sm favorite' data-url="${url}" data-thumbnail="${thumbnail}" data-title="${title}">Favorite</button>
                </div>
            </div>
        </div>
    `);
    $('#eye-bleach-container').append(eyeBleachDiv);
  });
};