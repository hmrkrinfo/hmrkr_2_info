fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const mainSection = document.querySelector("main section");
    mainSection.innerHTML = "";

    data.albums.forEach((album) => {
      const albumGridHTML = `
        <div class="grid-container">
          <div class="grid-item">
            <p><span class="bold-text"><i>${album.number}</i></span></p>
          </div>
          <div class="grid-item">
            <span class="bold-text">${album.artist}</span> - ${album.title}
          </div>
          <div class="grid-item"></div>
          <div class="grid-item">${album.format} | ${album.tracks} | ${album.genre}</div>
          <div class="grid-item"></div>
          <div class="grid-item">${album.date}</div>
          <div class="grid-item merged-column">
            <img src="${album.image}" alt="${album.title} 앨범 커버">
          </div>
        </div>
      `;
      mainSection.innerHTML += albumGridHTML;
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
