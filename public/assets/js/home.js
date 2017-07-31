// Scrape
let getEyeBleach = () => {
  // scrape returns an array of objects that contain 
  $.get('/scrape', (scrape) => {
    // Appends div with all scraped data to #eye-bleach-container
    appendEyeBleach(scrape);
  });
};

let appendEyeBleach = (scrape) => {
  scrape.forEach((bleach) => {
    let eyeBleachDiv = $(`
    <div class="eye-bleach-container col-sm-3 text-center">
            <div class='row'>
                <div class='eye-bleach-title col-sm-12'><strong>${title}</strong></div>
            </div>
            <div class='row'>
                <div class='eye-bleach-img col-sm-6'>
                    <a href='${url}'><img class='thumbnail' src='${thumbnail}'></a>
                </div>
                <div class='favorite-div col-sm-6'>
                    <button class='btn btn-danger btn-sm favorite' data-url="${url}" data-thumbnail="${thumbnail}" data-title="${title}" data-upvotes="${upvotes}" data-commentsUrl="${commentsUrl}">Favorite</button>
                </div>
            </div>
        </div>
    `);
    $('#eye-bleach-container').append(eyeBleachDiv);
  });
};

// Sends favoriteObj to /favorite api-route to evaluate for duplicates
let favorite = (event) => {
  $.post('/favorite', {
    title: $(event.currentTarget).data('title'), // ES6 needs event.currentTarget = $(this)
    url: $(event.currentTarget).data('url'),
    thumbnail: $(event.currentTarget).data('thumbnail'),
    upvotes: $(event.currentTarget).data('upvotes'),
    comments: $(event.currentTarget).data('comments')
  })
  .done((results)=>{
    console.log(results);
  });
  $($(event.currentTarget).parents('div.eye-bleach-container')[0]).remove();
  
};

let getCurrentScrape = function () {
  let urls = [];
  // Loops through the DOM to get all currently scrapped items
  for (i = 0; i < $('.favorite').length; i++) {
    urls.push($($('.favorite')[i]).data('url'));
  }
  // Sends url array to /scrape route to process
  let urlsObj = {
    "urls": urls
  };
  $.get('/scrape', urlsObj)
  .done((data) => {
    // Data returns an object with an array of new urls (newlyScraped) and the length of the array (numofItems)
    console.log(`return data: ${data.numOfItems}`);
    if(data.numOfItems === 0 ) {
      $('#scraped-results-modal-body').html(`<h2>No new items to be scraped<br /><br />Please try again later.<h2>`);
    } else {
      $('#scraped-results-modal-body').html(`<h2>Newly scraped items: ${data.numOfItems}<h2>`);
    }
    
  }, JSON);
};

// Event handlers
// Sends an array of objects to the sever to process for duplicates
$('#btn-scrape').on('click', () => {
  getCurrentScrape();
});

  // Add item to favorites list
$('#append-bleach-container').on('click', '.favorite', (event) => {
  favorite(event);
});