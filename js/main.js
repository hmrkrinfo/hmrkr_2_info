// main.js

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("release-table-body");
  const tableHead = document.querySelector("table thead");

  const typeColorMap = {
    "Full-Length": "#db1a28",
    EP: "#0047A0",
    Single: "#FFD700",
    Project: "#000000",
  };

  function getColorForType(type) {
    return typeColorMap[type] || "#000000";
  }

  async function populateReleaseTable() {
    try {
      const response = await fetch("data/data.json");
      const data = await response.json();
      const releases = data.releases;

      if (!releases || releases.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9">릴리즈 정보가 없습니다.</td></tr>`;
        return;
      }
      
      // 테이블 헤더 생성
      tableHead.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Artist</th>
            <th>Release</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Listen</th>
            <th>Buy</th>
            <th>More</th>
        </tr>
      `;

      // 기존 tbody 내용을 비워줍니다.
      tableBody.innerHTML = '';

      releases.forEach((release) => {
        const row = document.createElement("tr");
        const color = getColorForType(release.type);
        const listenHtml = release.listenLink ? `<a href="${release.listenLink}" target="_blank">Listen</a>` : "";
        const buyHtml = release.buyLink ? `<a href="${release.buyLink}" target="_blank">Buy</a>` : "";
        const moreHtml = release.moreLink ? `<a href="${release.moreLink}" target="_blank">More</a>` : "";

        row.innerHTML = `
            <td><font color="${color}">${release.releaseDate}</font></td>
            <td>${release.artistName}</td>
            <td>${release.releaseName}</td>
            <td>${release.type}</td>
            <td>${release.genre}</td>
            <td>${release.duration}</td>
            <td>${listenHtml}</td>
            <td>${buyHtml}</td>
            <td>${moreHtml}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("릴리즈 데이터를 불러오는 데 실패했습니다:", error);
      tableBody.innerHTML = `<tr><td colspan="9">데이터를 불러올 수 없습니다.</td></tr>`;
    }
  }

  populateReleaseTable();
});