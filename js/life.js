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
      // 상대 경로를 현재 페이지 기준으로 절대 URL로 변환
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;

      // HTML에서 이미 active 클래스가 설정되어 있을 수 있지만, JS에서 한 번 더 확인하여 정확히 일치하는 경우에만 active를 유지/설정
      if (currentFullUrl === targetUrl) {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        // HTML에서 설정된 active가 실제 현재 페이지와 다르면 제거 (혹시 모를 불일치 방지)
        // 단, 이 로직은 모든 nav-btn에 대해 반복되므로, 현재 버튼이 active이고 currentFullUrl !== targetUrl인 경우에만 제거
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
        }
      }

      btn.addEventListener('click', (e) => {
        // 현재 페이지와 동일한 URL로 이동하려 하면 막음 (이미 active 클래스로 처리되지만 중복 방지)
        if (currentFullUrl === targetUrl) {
          e.preventDefault();
          return;
        }
        window.location.href = routeAttribute; // 원래 data-route 값으로 이동
      });
    }
  });

  // ------ life.html 페이지 특화 로직은 여기에 추가 ------ //
  // 예시:
  // if (window.location.pathname.includes('life.html')) {
  //   console.log('Life page specific JavaScript loaded');
  // }
  // ------------------------------------------------------ //
}); 