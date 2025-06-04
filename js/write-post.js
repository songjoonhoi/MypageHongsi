document.addEventListener('DOMContentLoaded', () => {
  // 뒤로가기 버튼 (페이지 공통)
  const backButton = document.querySelector('.btn-back');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }

  // 하단 내비게이션 라우팅 (페이지 공통)
  const currentFullUrl = window.location.href;
  const navButtons = document.querySelectorAll('.nav-btn');

  navButtons.forEach(btn => {
    // write-post.html 페이지에서는 어떤 하단 탭도 활성화하지 않습니다.
    btn.classList.remove('active');

    const routeAttribute = btn.dataset.route;
    if (routeAttribute) {
      btn.addEventListener('click', (e) => {
        const targetUrl = new URL(routeAttribute, currentFullUrl).href;
        if (currentFullUrl === targetUrl) { // 현재 페이지와 목적지가 같으면 이동 방지
          e.preventDefault();
          return;
        }
        window.location.href = routeAttribute;
      });
    }
  });
  // --- 여기까지 공통 네비게이션 로직 ---

  // ------ write-post.html 페이지 특화 로직 ------ //
  const writePostForm = document.getElementById('writePostForm');
  const postCategorySelect = document.getElementById('postCategory');
  const postTitleInput = document.getElementById('postTitle');
  const postContentTextarea = document.getElementById('postContent');

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

  const validateSelectField = (selectElement, errorMessage) => {
    if (selectElement.value === '') {
        showError(selectElement, errorMessage);
        return false;
    }
    clearError(selectElement);
    return true;
  };

  const validateInputField = (inputElement, errorMessage) => {
    if (!inputElement.checkValidity()) { // HTML5 required 속성 등 활용
        showError(inputElement, inputElement.validationMessage || errorMessage);
        return false;
    }
    clearError(inputElement);
    return true;
  };

  if (writePostForm) {
    writePostForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      
      let isFormValid = true;
      if (!validateSelectField(postCategorySelect, '게시판을 선택해주세요.')) isFormValid = false;
      if (!validateInputField(postTitleInput, '제목을 입력해주세요.')) isFormValid = false;
      if (!validateInputField(postContentTextarea, '내용을 입력해주세요.')) isFormValid = false;

      if (isFormValid) {
        alert('게시글이 성공적으로 등록되었습니다! (실제 서버 제출 로직은 여기에 구현)');
        // const formData = new FormData(writePostForm);
        // console.log(...formData.entries());
        // writePostForm.reset(); // 폼 초기화
      } else {
        console.log('Write post form invalid');
      }
    });

    // 입력/변경 시 오류 메시지 실시간 제거
    [postCategorySelect, postTitleInput, postContentTextarea].forEach(input => {
        const eventType = input.tagName.toLowerCase() === 'select' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            if (input.classList.contains('invalid')) {
                if (input.tagName.toLowerCase() === 'select') {
                    if (input.value !== '') clearError(input);
                } else {
                    if (input.checkValidity()) clearError(input);
                }
            }
        });
    });
  }
  // ------------------------------------------------------- //
}); 