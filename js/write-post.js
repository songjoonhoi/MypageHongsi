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

  let કોઈActiveButtonFound = true; // 기본적으로 active 버튼을 찾았다고 가정

  navButtons.forEach(btn => {
    const routeAttribute = btn.dataset.route;
    if (routeAttribute) {
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;

      if (currentFullUrl === targetUrl) {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        कोईActiveButtonFound = false; // 정확히 일치하는 버튼을 찾음
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

  // 만약 정확히 일치하는 data-route를 가진 버튼이 없다면, 모든 active 클래스 제거 (선택적)
  // write-post.html이나 notifications.html 같이 하단탭과 직접 매칭 안되는 페이지용
  // if (कोईActiveButtonFound) {
  //   navButtons.forEach(b => b.classList.remove('active'));
  // }
  
  // ------ write-post.html 페이지 특화 로직은 여기에 추가 ------ //
  const writePostForm = document.getElementById('writePostForm');
  if (writePostForm) {
    writePostForm.addEventListener('submit', (e) => {
      e.preventDefault(); // 기본 폼 제출 방지
      // 실제로는 여기서 폼 데이터를 수집하고 서버로 전송하는 로직이 필요합니다.
      alert('등록 기능은 현재 준비 중입니다.');
      // 예시: const formData = new FormData(writePostForm);
      // fetch('/api/posts', { method: 'POST', body: formData }).then(...);
    });
  }
  // ------------------------------------------------------- //
}); 