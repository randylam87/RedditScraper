let getEyeBleach = () =>{
  $.get('/scrape',(scrape)=>{
    appendEyeBleach(scrape);
  });
};

let appendEyeBleach = (scrape) =>{
  scrape.forEach((bleach)=>{
    let eyeBleachDiv = $(`
    <div class="eye-bleach-div col-sm-3 text-center">
      <img class='img-responsive' src='${bleach.url}'>
    </div>
    `);
    $('#eye-bleach-container').append(eyeBleachDiv);
  });
};

$('#scrapeBtn').on('click',()=>{
  console.log('clicked scrape');
  getEyeBleach();
});