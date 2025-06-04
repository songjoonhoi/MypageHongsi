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
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(btn => {
    const routeAttribute = btn.dataset.route;
    if (routeAttribute) {
      // 절대 URL로 변환하여 비교 (현재 페이지 URL 기준)
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;

      // 현재 페이지 URL과 버튼의 data-route를 비교하여 active 클래스 설정
      if (currentFullUrl === targetUrl) {
        // 다른 버튼의 active 클래스 모두 제거
        navButtons.forEach(b => b.classList.remove('active'));
        // 현재 버튼에 active 클래스 추가
        btn.classList.add('active');
      }

      // 버튼 클릭 시 페이지 이동 (현재 페이지와 다른 경우에만)
      btn.addEventListener('click', (e) => {
        if (currentFullUrl === targetUrl) {
          e.preventDefault(); // 현재 페이지와 동일하면 이동 방지
          return;
        }
        window.location.href = routeAttribute;
      });
    }
  });

  // ------ my-page.html 페이지 특화 로직은 여기에 추가 ------ //
  // 예: 프로필 수정 버튼 클릭 이벤트 등
  // if (window.location.pathname.includes('my-page.html')) {
  //   console.log('My Page specific JavaScript loaded');
  // }
  // ------------------------------------------------------- //
}); 