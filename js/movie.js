// DOM 요소
const movieResultsContainer = document.querySelector('.movie-list');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

// 초기 로딩 시 전체 리스트 표시
window.addEventListener('DOMContentLoaded', () => {
  displayMovies(movieList.results);
});

// 검색 기능
document.getElementById("search").addEventListener('click', function(e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim();

  if(query == '') {
    displayMovies(movieList.results); // 검색어가 없으면 전체 출력
  } else {
    const filtered = movieList.results.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    displayMovies(filtered);
  }
});

// 영화 리스트 출력 함수 (전체 or 필터링된 결과)
function displayMovies(movies) {
  movieResultsContainer.innerHTML = '';

  if(movies.length === 0) {
    movieResultsContainer.innerHTML = '<p>검색 결과가 없습니다.<p>';
    return;
  }

  movies.forEach(movie => {
    const card = createMovieCard(movie);
    movieResultsContainer.appendChild(card);
  });
}

// 영화 카드 생성
function createMovieCard(movie) {
  // 카드 전체
  const card = document.createElement("div");
  card.classList.add("card", "m-2");
  card.style.width = "14rem";

  // 포스터 이미지
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`
    : movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${movie.backdrop_path}`
    : `https://via.placeholder.com/440x660?text=No+Image`;
  img.alt = movie.title;

  // 카드 바디
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // 제목
  const title = document.createElement("h5");
  title.classList.add("card-title", "text-center");
  title.textContent = movie.title;

  // 개봉 연도
  const release = document.createElement("p");
  release.classList.add("card-text", "text-center");
  release.textContent = movie.release_date.slice(0, 4);

  // 버튼
  const btn = document.createElement("a");
  btn.href = `MovieDetail.html?movie_id=${movie.id}`;
  btn.classList.add("btn", "btn-primary", "d-block", "mx-auto");
  btn.textContent = "상세 보기";

  cardBody.appendChild(title);
  cardBody.appendChild(release);
  cardBody.appendChild(btn);
  card.appendChild(img);
  card.appendChild(cardBody);

  return card;
}