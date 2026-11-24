function renderCards(list) {
  const board = document.getElementById("board");
  const count = document.getElementById("count");

  board.innerHTML = list.map((m) => `
    <article class="card">
      <img
        class="poster"
        src="${m.poster}"
        alt="${m.title} 포스터"
        loading="lazy"
      >

      <div class="card-content">
        <h2>${m.title}</h2>
        <p class="year">${m.year}년 ${m.releaseDate.slice(5)}</p>
        <p class="rating">평점 ${Number(m.rating).toFixed(1)}</p>
        <p class="overview">${m.overview}</p>

        <button
          class="like"
          type="button"
          aria-label="${m.title} 찜하기"
        >♥</button>
      </div>
    </article>
  `).join("");

  count.textContent = `${list.length}편`;

  if (list.length === 0) {
    board.classList.add("is-empty");
  } else {
    board.classList.remove("is-empty");
  }

  updateLikeCount();
}

function getView() {
  const keyword = document.getElementById("q").value.trim().toLowerCase();

  const found = movies.filter((m) =>
    m.title.toLowerCase().includes(keyword)
  );

  const key = document.getElementById("sort").value;

  return sortBy(found, key, key !== "title");
}

function sortBy(list, key, descending) {
  return [...list].sort((a, b) => {
    let result;

    if (key === "title") {
      result = a.title.localeCompare(b.title, "ko");
    } else {
      result = Number(a[key]) - Number(b[key]);
    }

    return descending ? -result : result;
  });
}

function applySort() {
  renderCards(getView());
}

document.getElementById("q").addEventListener("input", () => {
  renderCards(getView());
});

document.getElementById("sort").addEventListener("change", applySort);

// 일반 함수의 this는 이벤트가 등록된 요소(.board)를 가리킨다.
// 화살표 함수의 this는 바깥쪽 this를 사용하며, 클릭한 요소는 e.target으로 찾는다.



document.querySelector(".board").addEventListener("click", (e) => {
  if (e.target.classList.contains("like")) {
    e.target.classList.toggle("liked");
    updateLikeCount();
  }
});

function updateLikeCount() {
  document.getElementById("likeCount").textContent =
    document.querySelectorAll(".like.liked").length;
}

document.getElementById("q").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
    renderCards(getView());
  }
});

renderCards(getView());