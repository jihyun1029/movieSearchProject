movieList.results.forEach((movie, index) => {
  const movieListElement = document.querySelector(".movie-list");

  // 카드 전체
  const card = document.createElement("div");
  card.classList.add("card", "m-2");
  card.style.width = "14rem";

  // 포스터 이미지
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`;
  img.alt = movie.title;

  // 카드 바디
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // 제목
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-center");
  cardTitle.textContent = movie.title;

  // 개봉 연도
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "text-center");
  cardText.textContent = movie.release_date.slice(0, 4);

  // 버튼
  const btn = document.createElement("a");
  btn.href = `MovieDetail.html?movie_id=${movie.id}`;
  btn.classList.add("btn", "btn-primary", "d-block", "mx-auto");
  btn.textContent = "상세 보기";

  // 조립
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(btn);
  card.appendChild(img);
  card.appendChild(cardBody);
  movieListElement.appendChild(card);
});
