document.addEventListener('DOMContentLoaded', () => {
  // 뒤로가기 버튼 (페이지 공통)
  const backButton = document.querySelector('.btn-back');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }

  // 하단 내비게이션 라우팅 및 active 상태 관리 (페이지 공통) - 현재 로직 유지
  const currentFullUrl = window.location.href;
  const navButtons = document.querySelectorAll('.nav-btn'); // navButtons 변수 추가
  navButtons.forEach(btn => {
    const routeAttribute = btn.dataset.route;
    if (routeAttribute) {
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;
      // 현재 페이지와 버튼의 data-route를 비교하여 active 클래스 부여
      if (currentFullUrl.endsWith(routeAttribute.substring(2))) { // ../ 고려
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      // 회원가입 페이지에서 "로그인" 버튼이 활성화되도록 하는 로직은 register.js에 이미 있음

      btn.addEventListener('click', (e) => {
        const currentPath = window.location.pathname;
        const targetPath = new URL(routeAttribute, window.location.href).pathname;
        if (currentPath === targetPath) { // 현재 페이지와 목적지가 같으면 이동 방지
          e.preventDefault();
          return;
        }
        window.location.href = routeAttribute;
      });
    }
  });
  // --- 여기까지 공통 네비게이션 로직 ---

  // ------ login.html 페이지 특화 로직 ------ //
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const showError = (inputElement, message) => {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    inputElement.classList.add('invalid');
    errorElement.textContent = message;
  };

  const clearError = (inputElement) => {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    inputElement.classList.remove('invalid');
    errorElement.textContent = '';
  };

  const validateField = (inputElement, errorMessage) => {
    if (!inputElement.checkValidity()) {
        showError(inputElement, inputElement.validationMessage || errorMessage);
        return false;
    }
    clearError(inputElement);
    return true;
  };

  const validateEmail = () => {
    if (emailInput.value.trim() === '') {
        showError(emailInput, '이메일을 입력해주세요.');
        return false;
    } else if (!emailInput.checkValidity()) {
        showError(emailInput, '올바른 이메일 형식이 아닙니다.');
        return false;
    }
    clearError(emailInput);
    return true;
  };

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      if (!validateEmail()) isFormValid = false;
      if (!validateField(passwordInput, '비밀번호를 입력해주세요.')) isFormValid = false;

      if (isFormValid) {
        console.log('Login attempt:', { email: emailInput.value, password: passwordInput.value });
        alert('로그인 성공! (실제 서버 제출 로직은 여기에 구현)');
        // loginForm.submit(); // 실제 서버로 폼 데이터 전송 시
      } else {
        console.log('Login form invalid');
      }
    });

    // 입력 시 오류 메시지 실시간 제거
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                if (input.checkValidity()) { 
                    clearError(input);
                }
            }
        });
    });
  }

  const findCredentialsLink = document.getElementById('find-credentials');
  if (findCredentialsLink) {
    findCredentialsLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('아이디/비밀번호 찾기 기능은 준비 중입니다.');
    });
  }

  // registerLink 이벤트 리스너는 HTML href로 동작하므로 유지 또는 필요시 수정
  // const registerLink = document.getElementById('register');

  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.classList.contains('kakao') ? '카카오'
                     : button.classList.contains('google') ? '구글'
                     : button.classList.contains('naver') ? '네이버'
                     : '알 수 없음';
      console.log(platform + ' 로그인 시도');
      alert(platform + '으로 로그인합니다. (준비 중)');
    });
  });
  // ---------------------------------------------------- //
}); 