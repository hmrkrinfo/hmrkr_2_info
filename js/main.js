document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch the JSON data
  fetch("/data/data.json")
    .then((response) => {
      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // 2. Select the parent container where the albums will be displayed
      const container = document.querySelector(".flex-row.gap-row-2");
      container.innerHTML = ""; // Clear existing content to prevent duplicates

      // 3. Loop through each item in the JSON data array
      data.forEach((album) => {
        // 4. Create the HTML elements dynamically
        const albumDiv = document.createElement("div");
        albumDiv.classList.add("flex-row", "gap-row-1");

        albumDiv.innerHTML = `
          <div>
            <img src="${album.image}" class="img-cover-3rem">
          </div>
          <div class="flex-col">
            <div>${album.artist} - ${album.album}</div>
            <div>${album.format} | ${album.genre}</div>
            <div>${album.date}</div>
          </div>
          <div class="font-500">
            <a href="#">&rarr;</a>
          </div>
        `;

        // 5. Append the newly created elements to the container
        container.appendChild(albumDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
