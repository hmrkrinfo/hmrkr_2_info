// 현재 페이지의 URL 경로를 가져옵니다.
const currentPagePath = window.location.pathname;

// 경로가 '/index.html'이거나 '/' (루트)일 때만 코드 실행
if (currentPagePath === '/' || currentPagePath.includes('/index.html')) {
  fetch("../data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const mainSection = document.querySelector("main section");
      mainSection.innerHTML = "";

      data.albums.forEach((album) => {
        const albumTableHTML = `
          <table class="album-table">
            <tbody>
              <tr>
                <td class="td-1">
                  <p><span class="bold-text"><i>${album.number}</i></span></p>
                </td>
                <td class="td-2"><span class="bold-text">${album.artist}</span> - ${album.title}</td>
                <td rowspan="3" class="td-3" >
                  <a href="${album.links.buy}">
                    <img class="cover-img" src="${album.image}" alt="${album.title}">
                  </a>
                </td>
                <td rowspan="3" class="td-4">
                  <a href="${album.links.more}"><img class="ol-img" src="assets/images/arrow-trend-up-svgrepo-com.svg"></a>
                </td>
              </tr>
              <tr>
                <td><a href="${album.links.listen}">listen</a></td>
                <td>${album.format} | ${album.tracks} | ${album.genre}</td>
              </tr>
              <tr>
                <td><a href="${album.links.buy}">buy</a></td>
                <td>${album.date}</td>
              </tr>
            </tbody>
          </table>
        `;
        mainSection.innerHTML += albumTableHTML;
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}