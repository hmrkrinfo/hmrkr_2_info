// main.js

document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.getElementById('release-table-body');

    // 앨범 타입과 색상을 짝지어주는 객체
    const typeColorMap = {
        "Full-Length": "#CD2E3A",
        "EP": "#0047A0",
        "Single": "#FFD700",
        "Project": "#000000"
    };

    function getColorForType(type) {
        return typeColorMap[type] || "#000000";
    }

    async function populateReleaseTable() {
        // ▼▼▼ 화면 너비에 따라 colspan 값을 동적으로 결정 ▼▼▼
        const colspanValue = window.innerWidth <= 800 ? 6 : 8;

        try {
            const response = await fetch('data/data.json');
            const data = await response.json();
            const releases = data.releases;

            if (!releases || releases.length === 0) {
                // 동적으로 결정된 colspan 값을 사용
                tableBody.innerHTML = `<tr><td colspan="${colspanValue}">릴리즈 정보가 없습니다.</td></tr>`;
                return;
            }

            releases.forEach(release => {
                const row = document.createElement('tr');
                const color = getColorForType(release.type);
                const listenHtml = release.listenLink ? `<a href="${release.listenLink}" target="_blank"><font>Listen</font></a>` : '';
                const buyHtml = release.buyLink ? `<a href="${release.buyLink}" target="_blank"><font>Buy</font></a>` : '';

                row.innerHTML = `
                    <td><font color="${color}">${release.releaseDate}</font></td>
                    <td><font>${release.artistName}</font></td>
                    <td><font>${release.releaseName}</font></td>
                    <td><font>${release.type}</font></td>
                    <td><font>${release.genre}</font></td>
                    <td><font>${release.duration}</font></td>
                    <td>${listenHtml}</td>
                    <td>${buyHtml}</td>
                `;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error('릴리즈 데이터를 불러오는 데 실패했습니다:', error);
            // 동적으로 결정된 colspan 값을 사용
            tableBody.innerHTML = `<tr><td colspan="${colspanValue}">데이터를 불러올 수 없습니다.</td></tr>`;
        }
    }

    populateReleaseTable();
});