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
                <img class="ol-img" src="assets/images/arrow-trend-up-svgrepo-com.svg">
              </td>
            </tr>
            <tr>
              <td><a href="${album.links.listen}">listen</a></td>
              <td>${album.format} | ${album.tracks} | ${album.genre}</td>
              <td class="td-4"></td>
            </tr>
            <tr>
              <td><a href="${album.links.buy}">buy</a></td>
              <td>${album.date}</td>
              <td class="td-4"></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="td-4"></td>
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
