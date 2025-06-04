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
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;

      if (currentFullUrl === targetUrl) {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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
  
  // ------ notifications.html 페이지 특화 로직은 여기에 추가 ------ //
  // 예: 알림 읽음 처리, 더 보기 버튼 등
  // if (window.location.pathname.includes('notifications.html')) {
  //   console.log('Notifications page specific JavaScript loaded');
    
    // 알림 목록 예시를 보여주고 싶다면 아래 주석 해제
    // const noNotificationsDiv = document.querySelector('.no-notifications');
    // const notificationsListUl = document.querySelector('.notifications-list');
    // if (notificationsListUl && noNotificationsDiv) {
    //   // 실제로는 알림 데이터 유무에 따라 토글해야 함
    //   // noNotificationsDiv.style.display = 'none'; 
    //   // notificationsListUl.style.display = 'block'; 
    // }
  // }
  // ------------------------------------------------------- //
}); 