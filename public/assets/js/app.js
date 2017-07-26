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
                    <button class='btn btn-danger btn-sm favorite' data-url="${url}" data-thumbnail="${thumbnail}" data-title="${title}">Favorite</button>
                </div>
            </div>
        </div>
    `);
    $('#eye-bleach-container').append(eyeBleachDiv);
  });
};

// Sends favoriteObj to /favorite api-route to evaluate for duplicates
let favorite = (event) => {
  let favoriteObj = {
    title: $(event.currentTarget).data('title'), // ES6 needs event.currentTarget = $(this)
    url: $(event.currentTarget).data('url'),
    thumbnail: $(event.currentTarget).data('thumbnail')
  };
  $.post('/favorite', favoriteObj);
};


let getCurrentScrape = function () {
  let url = []
  // Loops through the DOM to get all currently scrapped items
  for (i = 0; i < $('.favorite').length; i++) {
    url.push($($('.favorite')[i]).data('url'));
  }
  // Sends url array to /scrape route to process
  $.get('/scrape', url, (data) => {
    console.log(data);
  })
}

// Event handlers
$('#scrapeBtn').on('click', () => {
  // Sends an array of objects to the sever to process for duplicates
  getCurrentScrape();
  // Scrapes reddit/r/EyeBleach for top 100 posts
  getEyeBleach();
});

$('#bleach-container').on('click', '.favorite', (event) => {
  // Add item to favorites list
  favorite(event);
});