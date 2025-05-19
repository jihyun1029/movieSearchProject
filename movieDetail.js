// URL 파라미터에서 영화 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie_id');  // 'movie_id'라는 파라미터 값을 가져옵니다.

console.log(movieId);  // 가져온 'movie_id' 값을 콘솔에 출력

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
  card.classList.add("card", "d-flex");

  // 왼쪽: 이미지
  const poster = document.createElement("img");
  poster.classList.add("card-img-left");
  poster.src = posterPath
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${posterPath}`
    : backdropPath
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${backdropPath}`
    : "https://via.placeholder.com/440x660?text=No+Image";  // 이미지가 없을 경우 대체 이미지
  poster.alt = movie.title;
  poster.style.width = "50%";  // 이미지 크기 설정 (50% 너비)
  // 오른쪽: 텍스트
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style.width = "50%";  // 텍스트 영역 크기 설정 (50% 너비)
  cardBody.style.paddingLeft = "15px";

  // 텍스트 내용 (제목, 설명, 버튼 등)
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = movie.title;

  const overview = document.createElement("p");
  overview.classList.add("card-text");
  overview.textContent = movie.overview || "No description available.";

  const button = document.createElement("a");
  button.classList.add("btn", "btn-primary");
  button.href = "#";
  button.textContent = "Go somewhere";  // 버튼 텍스트 (상세 페이지 링크 등으로 수정 가능)

  // 텍스트를 card-body에 추가
  cardBody.appendChild(title);
  cardBody.appendChild(overview);
  cardBody.appendChild(button);

  // 이미지와 텍스트를 카드에 추가
  card.appendChild(poster);
  card.appendChild(cardBody);

  // 최종적으로 movieDetailContainer에 카드 추가
  movieDetailContainer.appendChild(card);
} else {
  console.log("Movie not found");
}






// if(movie) {
//   const movieDetailContainer = document.getElementById('movie-detail');

//   const title = document.createElement("h1");
//   title.textContent = movie.title;
  
//   const poster = document.createElement('img');
//   poster.src = movie.backdrop_path 
//   ? `https://image.tmdb.org/t/p/w440_and_h660_face${movie.backdrop_path}`
//   : movie.poster_path 
//   ? `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`
//   : 'https://via.placeholder.com/440x660?text=No+Image';  // 기본 이미지 URL
//   poster.alt = movie.title;

//   const overview = document.createElement('p');
//   overview.textContent = movie.overview;

//   const releaseDate = document.createElement('p');
//   releaseDate.textContent = `Release Date: ${movie.release_date}`;

//   // 상세 정보 화면에 추가
//   movieDetailContainer.appendChild(title);
//   movieDetailContainer.appendChild(poster);
//   movieDetailContainer.appendChild(overview);
//   movieDetailContainer.appendChild(releaseDate);
// } else {
//   // 영화가 존재하지 않으면 에러 메시지 출력
//   document.getElementById('movie-detail').textContent = 'Movie not found.';
// }