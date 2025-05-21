// URL 파라미터에서 영화 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie_id');  // 'movie_id'라는 파라미터 값을 가져옵니다.

// console.log(movieId);  // 가져온 'movie_id' 값을 콘솔에 출력

if (movieId === null) {
  console.log("ID 파라미터가 URL에 없습니다.");
} else {
  // 영화 ID에 해당하는 데이터를 화면에 출력하거나 API 호출
  console.log(`선택한 영화 ID는: ${movieId}`);
}

// 영화 ID에 해당하는 영화 찾기
const movie = movieList.results.find(movie => movie.id == parseInt(movieId));
console.log(movie);

if(movie) {
  // 영화의 poster_path 또는 backdrop_path를 선택
  const posterPath = movie.poster_path;
  const backdropPath = movie.backdrop_path;

  const movieDetailContainer = document.querySelector(".movie-detail");
  
  // 카드 생성
  const card = document.createElement("div");
  card.classList.add("card", "d-flex", "flex-row");

  const poster = cardLeft(posterPath, movie.title, backdropPath);

  const cardBody = cardRight(movie);

  // 이미지와 텍스트를 카드에 추가
  card.appendChild(poster);
  card.appendChild(cardBody);

  // 최종적으로 movieDetailContainer에 카드 추가
  movieDetailContainer.appendChild(card);
} else {
  console.log("Movie not found");
}

function cardLeft(posterPath, title, backdropPath) {
  // 왼쪽: 이미지
  const poster = document.createElement("img");
  poster.classList.add("card-img-left");
  poster.src = posterPath
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${posterPath}`
    : backdropPath
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${backdropPath}`
    : "https://via.placeholder.com/440x660?text=No+Image";  // 이미지가 없을 경우 대체 이미지
  poster.alt = title;
  poster.style.width = "50%";  // 이미지 크기 설정 (50% 너비)
  
  return poster;  // poster를 반환하여 호출한 곳에서 사용할 수 있도록 함
}

function cardRight(movie) {
  // 오른쪽: 텍스트
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style.width = "50%";  // 텍스트 영역 크기 설정 (50% 너비)
  cardBody.style.paddingLeft = "15px";

  // 텍스트 내용 (제목, 설명, 버튼 등)
  const title = document.createElement("h2");
  title.classList.add("card-title", "mb-4");
  title.textContent = movie.title;

  // 개봉연도
  const releaseDate = document.createElement("div");
  const releaseDateTitle = document.createElement("h3");
  releaseDateTitle.textContent = "개봉연도";
  const releaseDateText = document.createElement("p");
  releaseDateText.textContent = movie.release_date.slice(0, 4);
  releaseDate.appendChild(releaseDateTitle);
  releaseDate.appendChild(releaseDateText);

  // 장르
  const genreElement = genre(movie);

  // 줄거리
  const overview = document.createElement("div");
  const overviewTitle = document.createElement("h3");
  overviewTitle.textContent = "줄거리";
  const overviewText = document.createElement("p");
  overviewText.textContent = movie.overview || "No description available.";
  overview.appendChild(overviewTitle);
  overview.appendChild(overviewText);

  // 텍스트를 card-body에 추가
  cardBody.appendChild(title);
  cardBody.appendChild(releaseDate);
  cardBody.appendChild(genreElement);
  cardBody.appendChild(overview);
  
  return cardBody;
}

function getGenreNames(genreIds) {
  return genreIds.map(id => {
    const found = genres.find(g => g.id === id);
    return found ? found.name : "Unknown";
  });
}

function genre(movie) {
  // 장르를 화면에 표시할 요소 생성
  const genre = document.createElement("div");

  const genreTitle = document.createElement("h3");
  genreTitle.textContent = "장르";

  const genreText = document.createElement("p");
  const genreNames = getGenreNames(movie.genre_ids);
  genreText.textContent = genreNames.join(", ");  // 배열을 문자열로 변환하여 표시

  genre.appendChild(genreTitle);
  genre.appendChild(genreText);
  
  return genre;  // 장르 정보를 포함한 div 반환
}