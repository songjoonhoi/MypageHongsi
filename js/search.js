document.addEventListener('DOMContentLoaded', () => {
  // 뒤로가기 버튼 (페이지 공통)
  const backButton = document.querySelector('.btn-back');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }

  // 하단 내비게이션 라우팅 및 active 상태 관리 (페이지 공통)
  const currentFullUrl = window.location.href;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    const routeAttribute = btn.dataset.route;

    if (routeAttribute) {
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;

      if (currentFullUrl === targetUrl) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
        }
      }

      btn.addEventListener('click', (e) => {
        if (currentFullUrl === targetUrl) {
          e.preventDefault();
          return;
        }
        window.location.href = routeAttribute;
      });
    }
  });

  // ------ search.html 페이지 특화 로직은 여기에 추가 ------ //
  // if (window.location.pathname.includes('search.html')) {
  //   console.log('Search page specific JavaScript loaded');
  // }

  // 인기 검색어 태그 클릭 시 검색 실행
  const searchTags = document.querySelectorAll('.search-tag');
  const cseInputField = document.querySelector('input.gsc-input'); // CSE 입력 필드
  const cseSearchButton = document.querySelector('button.gsc-search-button-v2'); // CSE 검색 버튼

  searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const searchTerm = tag.dataset.searchTerm;
      if (searchTerm && cseInputField && cseSearchButton) {
        cseInputField.value = searchTerm; // 입력 필드에 검색어 설정
        cseSearchButton.click(); // 검색 버튼 클릭
      }
    });
  });

  // ------------------------------------------------------- //
}); 