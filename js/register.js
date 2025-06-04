document.addEventListener('DOMContentLoaded', () => {
  // 뒤로가기 버튼 (페이지 공통)
  const backButton = document.querySelector('.btn-back');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }

  // 하단 내비게이션 라우팅 및 active 상태 관리 (페이지 공통) - 새로운 로직으로 교체
  const currentFullUrl = window.location.href;
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const routeAttribute = btn.dataset.route;
    if (routeAttribute) {
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;
      // register.html에서는 어떤 하단 탭도 active로 만들지 않음 (필요시 로직 수정)
      // 따라서 active 클래스 추가/제거 로직은 이 페이지에 맞게 조정되거나, HTML에 의존
      // 여기서는 HTML에 active 클래스가 없다고 가정하고, 클릭 시 이동만 처리
      // 만약 특정 버튼을 active로 해야 한다면 아래 if (currentFullUrl === targetUrl) 블록 활성화 필요
      
      // if (currentFullUrl === targetUrl) { // register.html에서는 보통 특정 탭을 active로 하지 않음
      //   document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      //   btn.classList.add('active');
      // } else {
      //   if (btn.classList.contains('active')) {
      //       btn.classList.remove('active');
      //   }
      // }

      btn.addEventListener('click', (e) => {
        // register.html에서는 어떤 nav-btn도 active 상태가 아니므로, 아래 조건은 항상 false
        // if (currentFullUrl === targetUrl) { 
        //   e.preventDefault();
        //   return;
        // }
        window.location.href = routeAttribute;
      });
    }
  });
  // --- 여기까지 공통 네비게이션 로직 (register.html용으로 active 설정 부분은 주석 처리) ---

  // ------ register.html 페이지 특화 로직 (기존 로직 유지) ------ //
  const registerForm = document.getElementById('register-form');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const termsCheckbox = document.getElementById('terms');

  // 현재 페이지에 맞는 하단 네비게이션 버튼 활성화
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-btn').forEach(button => {
    const route = button.getAttribute('data-route');
    if (route && currentPath.includes(route.substring(route.lastIndexOf('/') + 1))) {
      // 로그인/회원가입의 경우, login.html로 통일되어 있으므로,
      // register.html에서도 login.html 경로를 가진 버튼을 active 시킵니다.
      if ( (currentPath.includes('register.html') || currentPath.includes('login.html')) && route.includes('login.html')) {
        button.classList.add('active');
      } else if (currentPath.includes(route.substring(route.lastIndexOf('/') + 1)) && !route.includes('login.html')) {
        button.classList.add('active');
      }
    } else {
      button.classList.remove('active');
    }
  });

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
  
  const validatePassword = () => {
    if (passwordInput.value === '') {
      showError(passwordInput, '비밀번호를 입력해주세요.');
      return false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, '비밀번호는 8자 이상이어야 합니다.');
      return false;
    }
    clearError(passwordInput);
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPasswordInput.value === '') {
      showError(confirmPasswordInput, '비밀번호를 다시 입력해주세요.');
      return false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, '비밀번호가 일치하지 않습니다.');
      return false;
    }
    clearError(confirmPasswordInput);
    return true;
  };

  const validateTerms = () => {
    if (!termsCheckbox.checked) {
      showError(termsCheckbox, '이용약관 및 개인정보처리방침에 동의해주세요.');
      return false;
    }
    clearError(termsCheckbox);
    return true;
  };

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault(); // 기본 제출 동작 방지

      let isFormValid = true;

      // 개별 필드 유효성 검사
      if (!validateField(usernameInput, '이름(닉네임)을 입력해주세요.')) isFormValid = false;
      if (!validateEmail()) isFormValid = false;
      if (!validatePassword()) isFormValid = false;
      if (!validateConfirmPassword()) isFormValid = false;
      if (!validateTerms()) isFormValid = false;
      

      if (isFormValid) {
        alert('회원가입 성공! (실제 서버 제출 로직은 여기에 구현)');
        // registerForm.submit(); // 실제 서버로 폼 데이터 전송 시
      }
    });

    // 사용자가 입력을 시작하면 오류 메시지 제거 (UX 개선)
    [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
      input.addEventListener('input', () => {
        // checkValidity는 실시간으로 유효성을 검사하지만, 여기서는 단순 clear만.
        // 좀 더 적극적으로 실시간 유효성 검사를 하고 싶다면 validateField 등을 호출할 수 있음.
        if (input.classList.contains('invalid')) {
          if (input.checkValidity()) { // HTML5 기본 유효성 통과 시 에러 지움
            clearError(input);
          }
        }
      });
    });
    
    passwordInput.addEventListener('input', () => {
      // 비밀번호가 변경되면 확인 필드의 유효성도 다시 체크될 수 있도록 (선택적)
      if (confirmPasswordInput.value.trim() !== '') {
        validateConfirmPassword();
      }
    });

    termsCheckbox.addEventListener('change', () => {
      if (termsCheckbox.classList.contains('invalid')) {
        validateTerms();
      }
    });
  }

  const goToLoginLink = document.getElementById('go-to-login');
  if (goToLoginLink) {
    goToLoginLink.addEventListener('click', (e) => {
      // HTML href로 이동
      console.log('Navigating to login page via href.');
    });
  }
  // --------------------------------------------------------- //
}); 