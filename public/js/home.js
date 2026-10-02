async function loadMovies() {
    const res = await fetch('data/movies.json');
    if (!res.ok) {
        throw new Error(`Не удалось загрузить фильмы: ${res.status}`);
    }
    return res.json();
}

function renderMovieCard(movie) {
    return `
    <article class="movie-card">
      <div class="movie-card__poster-wrapper">
        <img src="${movie.poster}" alt="${movie.title}" class="movie-card__poster">
      </div>
      <div class="movie-card__meta">
        <span class="movie-card__age-rating">${movie.ageRating}</span>
        <div class="movie-card__rating">
          <img src="assets/star.svg" alt="звезда">
          <span class="movie-card__user-rating">${movie.rating}</span>
        </div>
      </div>
      <div class="movie-card__description">
        <h3 class="movie-card__title">${movie.title}</h3>
        <p class="movie-card__info">${movie.description}</p>
      </div>
      <button class="movie-card__button" data-movie-id="${movie.id}">Buy Tickets</button>
    </article>
  `;
}

function renderMovieGrid(movieList) {
    const grid = document.querySelector('.movie-grid');
    grid.innerHTML = movieList.map(renderMovieCard).join('');
}

async function init() {
    const grid = document.querySelector('.movie-grid');
    try {
        grid.innerHTML = '<p>Загрузка...</p>'; 
        const movies = await loadMovies();
        renderMovieGrid(movies);
    } catch (err) {
        grid.innerHTML = '<p>Не получилось загрузить фильмы. Попробуй позже.</p>';
        console.error(err);
    }
}

init();