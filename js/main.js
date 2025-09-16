document.addEventListener('DOMContentLoaded', () => {
  const langOptions = document.querySelectorAll('.lang-option');
  const langTexts = document.querySelectorAll('.lang-text');

  langOptions.forEach(option => {
    option.addEventListener('click', (event) => {
      // 현재 활성화된 언어 링크에서 'active' 클래스 제거
      document.querySelector('.lang-option.active').classList.remove('active');

      // 클릭된 링크에 'active' 클래스 추가
      event.target.classList.add('active');

      const selectedLang = event.target.dataset.lang;

      // 모든 텍스트 div를 숨김
      langTexts.forEach(textDiv => {
        textDiv.classList.add('hidden');
      });

      // 선택된 언어에 해당하는 텍스트 div만 보이게 함
      document.querySelector(`.lang-text[data-lang="${selectedLang}"]`).classList.remove('hidden');
    });
  });
});