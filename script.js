$('.search-button').on('click', function() {

    $.ajax({
        url: "http://www.omdbapi.com/?apikey=9808d1bf&s=" + $('.input-keyword').val(),
        success: results => {
        const movies = results.Search;
        let cards = '';
        movies.forEach(m => {
          cards += ShowFilm(m);
        });
           $('.movies-container').html(cards);    
    
           //ketika tombol di tekan
           $('.modal-detail-button').on('click', function() {
             $.ajax({
                 url: "http://www.omdbapi.com/?apikey=9808d1bf&i=" + $(this).data('imdbid'),
                 success: m => {
                    const movieDetail = ShowDetailFilm(m);
                    $('.modal-body').html(movieDetail);
                 }
             })
           })
        },
        error: (e) => {
            e.alert('Error');
        }
    });
});


function ShowFilm(film) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${film.Poster}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${film.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${film.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${film.imdbID}">Detail Film</a>
        </div>
      </div>
</div>`;  
}

function ShowDetailFilm(info) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-5">
            <img src="${info.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${info.Title}</h4></li>
                <li class="list-group-item"><strong>Director: ${info.Director}</strong></li>
                <li class="list-group-item"><strong>Actors: ${info.Actors}</strong></li>
                <li class="list-group-item"><strong>Writer: ${info.Writer}r</strong></li>
                <li class="list-group-item"><strong>Plot: ${info.Plot}</strong></li>
              </ul>
        </div>
    </div>
</div>`; 
}
