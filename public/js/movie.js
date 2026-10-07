function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id'));
}

async function loadMovies() {
    const res = await fetch('data/movies.json');
    if (!res.ok) {
        throw new Error(`Не удалось загрузить фильмы: ${res.status}`);
    }
    return res.json();
}

function renderHero(movie) {
    document.getElementById('movie-backdrop').src = movie.backdrop;
    document.getElementById('movie-poster').src = movie.detailPoster;
    document.getElementById('movie-poster').alt = movie.title;

    document.getElementById('movie-info').innerHTML = `
    <div class="movie-hero__badges">
      <span class="movie-hero__age-rating">${movie.ageRating}</span>
      <span class="movie-hero__meta">${movie.description}</span>
    </div>

    <h1 class="movie-hero__title">${movie.title}</h1>

    <div class="movie-hero__rating">
      <img src="assets/star.svg" alt="">
      <span class="movie-hero__rating-value">${movie.rating}</span>
      <span class="movie-hero__rating-source">/ 10 IMDb</span>
      <span class="movie-hero__audience-score">${movie.audienceScore}% Audience Score</span>
    </div>

    <div class="movie-hero__credits">
      <p class="movie-hero__director"><strong>Director:</strong> ${movie.director}</p>
      <p class="movie-hero__cast"><strong>Cast:</strong> ${movie.cast}</p>
    </div>

    <p class="movie-hero__description">${movie.synopsis}</p>

    <div class="movie-hero__actions">
      <button class="buy-btn">Buy Tickets</button>
      <a class="more-info" href="#">Watch Trailer</a>
    </div>
  `;
}

function getUniqueDates(sessions) {
    const seen = new Map();
    sessions.forEach(s => {
        if (!seen.has(s.date)) seen.set(s.date, s.dateLabel);
    });
    return [...seen.entries()]; // [[date, label], [date, label], ...]
}

function renderDateTabs(dates, activeDate, sessions) {
    const box = document.getElementById('session-dates');

    box.innerHTML = dates.map(([date, label]) => `
    <button class="date-tab ${date === activeDate ? 'date-tab--active' : ''}" data-date="${date}">
      ${label}
    </button>
  `).join('');

    box.querySelectorAll('.date-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            renderDateTabs(dates, btn.dataset.date, sessions);
            renderSessions(sessions, btn.dataset.date);
        });
    });
}

function renderSessions(sessions, date) {
    const list = sessions.filter(s => s.date === date);

    document.getElementById('session-times').innerHTML = list.map(s => `
    <article class="session-card">
      <div class="session-card__top">
        <span class="session-card__time">${s.time}</span>
        <span class="session-card__format">${s.format}</span>
      </div>
      <p class="session-card__hall">${s.hall}</p>
      <p class="session-card__price">from €${s.price}.00</p>
      <a class="session-card__button" href="session.html?id=${s.id}">Choose Seats</a>
    </article>
  `).join('');
}

async function init() {
    const main = document.querySelector('main');

    try {
        const id = getMovieId();
        const movies = await loadMovies();
        const movie = movies.find(m => m.id === id);

        if (!movie) {
            main.innerHTML = '<p style="padding: 64px; text-align: center;">Фильм не найден.</p>';
            return;
        }

        renderHero(movie);

        const dates = getUniqueDates(movie.sessions);
        const firstDate = dates[0][0];
        renderDateTabs(dates, firstDate, movie.sessions);
        renderSessions(movie.sessions, firstDate);

    } catch (err) {
        main.innerHTML = '<p style="padding: 64px; text-align: center;">Не удалось загрузить данные фильма.</p>';
        console.error(err);
    }
}

init();