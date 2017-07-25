// Scrape
let getEyeBleach = () =>{
  $.get('/scrape',(scrape)=>{
    appendEyeBleach(scrape);
  });
};

let appendEyeBleach = (scrape) =>{
  scrape.forEach((bleach)=>{
    let eyeBleachDiv = $(`
    <div class="eye-bleach-container col-sm-2 text-center">
            <div class='row'>
                <div class='eye-bleach-title col-sm-12'><strong>${bleach.title}</strong></div>
            </div>
            <div class='row'>
                <div class='eye-bleach-img col-sm-6'>
                    <a href='${bleach.url}'><img class='thumbnail' src='${bleach.thumbnail}'></a>
                </div>
                <div class='favorite-div col-sm-6'>
                    <button class='btn btn-danger btn-sm favorite'>Favorite</button>
                </div>
            </div>
        </div>
    `);
    $('#eye-bleach-container').append(eyeBleachDiv);
  });
};

// Notes
let showNotes = ()=>{
  $.get('/notes',(notes)=>{
    appendNotes(notes);
  });
};

let appendNotes = (queryResults)=>{
  queryResults.forEach((bleach)=>{
    let eyeBleachDiv = $(`
    <div class="eye-bleach-container col-sm-2 text-center">
            <div class='row'>
                <div class='eye-bleach-title col-sm-12'><strong>${bleach.title}</strong></div>
            </div>
            <div class='row'>
                <div class='eye-bleach-img col-sm-6'>
                    <a href='${bleach.url}'><img class='thumbnail' src='${bleach.thumbnail}'></a>
                </div>
                <div class='favorite-div col-sm-6'>
                    <button class='btn btn-danger btn-sm favorite'>Favorite</button>
                </div>
            </div>
        </div>
    `);
    $('#eye-bleach-container').append(eyeBleachDiv);
  });
};


// Event handlers
$('#scrapeBtn').on('click',()=>{
  getEyeBleach();
});

$('.favorite').on('click', 'body', ()=>{
  showNotes();
});