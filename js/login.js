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

  // ------ login.html 페이지 특화 로직 ------ //
  if (window.location.pathname.includes('login.html')) {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 기본 제출 동작 방지
        let isValid = true;

        // 이메일 유효성 검사
        if (!emailInput.value.trim()) {
          emailError.textContent = '이메일을 입력해주세요.';
          isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
          emailError.textContent = '올바른 이메일 형식이 아닙니다.';
          isValid = false;
        } else {
          emailError.textContent = '';
        }

        // 비밀번호 유효성 검사
        if (!passwordInput.value.trim()) {
          passwordError.textContent = '비밀번호를 입력해주세요.';
          isValid = false;
        } else {
          passwordError.textContent = '';
        }

        if (isValid) {
          // 실제 로그인 로직은 여기에 구현 (현재는 알림만)
          alert('로그인 시도 (실제 기능은 준비중입니다.)');
          // loginForm.submit(); // 실제 서버로 제출할 경우
        } else {
            // 첫번째 에러 필드로 포커스 이동 (선택 사항)
            const firstErrorField = loginForm.querySelector('.error-message:not(:empty)');
            if (firstErrorField && firstErrorField.previousElementSibling) {
                firstErrorField.previousElementSibling.focus();
            }
        }
      });
    }

    function isValidEmail(email) {
      // 간단한 이메일 형식 검사 정규식
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailRegex.test(email);
    }
    
    // "준비중" 링크 처리
    document.querySelectorAll('.coming-soon-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('해당 기능은 현재 준비중입니다.');
        });
    });

    // 간편 로그인 버튼 처리 (준비중 알림)
    document.querySelectorAll('.btn-social-login').forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = e.target.classList.contains('kakao') ? '카카오' :
                             e.target.classList.contains('google') ? 'Google' :
                             e.target.classList.contains('naver') ? '네이버' : '소셜';
            alert(platform + ' 로그인 기능은 현재 준비중입니다.\n아이콘 이미지를 직접 추가해주세요. (예: ../assets/kakao_icon.png)');
        });
    });
  }
  // ------------------------------------------------- //
}); 