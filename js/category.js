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

  // ------ category.html 페이지 모달 로직 ------ //
  const modalTriggerButtons = document.querySelectorAll('[data-modal-target]');
  
  modalTriggerButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // 링크의 기본 동작(#으로 이동) 방지
      const modalId = button.dataset.modalTarget;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex'; // 또는 'block', CSS에서 .modal.show 로 제어한다면 클래스 추가
        // 모달이 열릴 때 body 스크롤 방지 (선택 사항)
        // document.body.style.overflow = 'hidden'; 
      }
    });
  });

  // 모든 모달 가져오기
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    // 닫기 버튼 이벤트
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        // document.body.style.overflow = 'auto'; // body 스크롤 복원
      });
    }

    // 모달 외부 클릭 시 닫기 이벤트
    modal.addEventListener('click', (event) => {
      if (event.target === modal) { // 클릭된 요소가 모달 배경 자체인지 확인
        modal.style.display = 'none';
        // document.body.style.overflow = 'auto'; // body 스크롤 복원
      }
    });
  });
  // ------------------------------------------- //
}); 