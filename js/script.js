// script.js 내용
document.addEventListener('DOMContentLoaded', () => {
  // 1) 카테고리 active 토글 + data-route 라우팅
  document.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', () => {
      // 기존 카테고리 버튼 active 처리 로직은 유지
      // document.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
      // btn.classList.add('active');
      // -> CSS에서 data-route 값으로 active 스타일을 관리하므로 JS에서 active 클래스 직접 제어 불필요
      const route = btn.dataset.route;
      if (route) window.location.href = route; // 페이지 이동 활성화
    });
  });

  // 2) 하단 내비게이션 라우팅 및 active 상태 관리 (새로운 공통 로직 적용)
  const currentFullUrl = window.location.href;
  document.querySelectorAll('.bottom-nav .nav-btn').forEach(btn => { // .bottom-nav 선택자 추가
    const routeAttribute = btn.dataset.route;
    if (routeAttribute) {
      const targetUrl = new URL(routeAttribute, currentFullUrl).href;

      // 현재 페이지와 버튼의 라우트가 일치하면 active 클래스 추가
      if (currentFullUrl === targetUrl) {
        document.querySelectorAll('.bottom-nav .nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        // 일치하지 않고, 만약 HTML에 active가 실수로 들어가 있다면 제거 (일관성 유지)
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
        }
      }

      btn.addEventListener('click', (e) => {
        if (currentFullUrl === targetUrl) { // 현재 페이지와 목적지가 같으면 이동 방지
          e.preventDefault();
          return;
        }
        window.location.href = routeAttribute;
      });
    }
  });
  // --- 여기까지 공통 네비게이션 로직 ---

  // 초기 로드 시 첫 번째 카테고리 버튼 active 클래스 추가 (선택 사항 - CSS에서 이미 처리하고 있다면 불필요)
  // if (document.querySelector('.btn-category')) {
  //   document.querySelector('.btn-category').classList.add('active');
  // }

  // 3) .popular-list, .product-list, .shoppingmal-list, .family-list 클릭&드래그로 가로 스크롤
  document.querySelectorAll('.popular-list, .product-list, .shoppingmal-list, .family-list').forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('active'); // CSS에서 cursor: grabbing 적용 위함
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      e.preventDefault(); // 이미지 드래그 방지
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // 드래그 속도 조절
      slider.scrollLeft = scrollLeft - walk;
    });
  });

  // Gemini API Integration: Bragging Post Generator Logic
  const dogBragInput = document.getElementById('dog-brag-input');
  const generateBragBtn = document.getElementById('generate-brag-btn');
  const bragOutputContainer = document.getElementById('brag-output-container');
  const bragOutputText = document.getElementById('brag-output-text');
  const bragLoadingSpinner = document.getElementById('brag-loading-spinner');

  if (generateBragBtn) { // generateBragBtn 존재 여부 체크 추가
    generateBragBtn.addEventListener('click', async () => {
      const prompt = dogBragInput.value.trim();

      if (!prompt) {
        if(bragOutputText) bragOutputText.textContent = '우리 강아지의 특징을 입력해주세요!';
        if(bragOutputText) bragOutputText.style.color = 'red';
        return;
      }

      if(bragOutputText) bragOutputText.textContent = '';
      if(bragOutputText) bragOutputText.style.color = 'var(--text)';
      if(bragLoadingSpinner) bragLoadingSpinner.classList.remove('hidden');
      if(bragOutputContainer) bragOutputContainer.style.minHeight = '100px';

      try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: `우리 강아지의 특징은 다음과 같습니다: "${prompt}". 이 정보를 바탕으로 긍정적이고 매력적인 자랑글을 500자 이내로 작성해 주세요. 친근하고 따뜻한 어조로 작성해주세요.` }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Canvas will automatically provide it in runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const text = result.candidates[0].content.parts[0].text;
          if(bragOutputText) bragOutputText.textContent = text;
        } else {
          if(bragOutputText) bragOutputText.textContent = '자랑글을 생성하는 데 실패했습니다. 다시 시도해주세요.';
          if(bragOutputText) bragOutputText.style.color = 'red';
          console.error('Unexpected API response structure:', result);
        }
      } catch (error) {
        console.error('Error generating bragging post:', error);
        if(bragOutputText) bragOutputText.textContent = '자랑글을 생성하는 중 오류가 발생했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.';
        if(bragOutputText) bragOutputText.style.color = 'red';
      } finally {
        if(bragLoadingSpinner) bragLoadingSpinner.classList.add('hidden');
        if(bragOutputContainer) bragOutputContainer.style.minHeight = '50px';
      }
    });
  }

  // My Page: Profile Image Upload Preview
  const profileImageUpload = document.getElementById('profile-image-upload');
  const profilePreviewImage = document.getElementById('profile-preview-image');

  if (profileImageUpload && profilePreviewImage) {
      profileImageUpload.addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (file && file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = function(e) {
                  profilePreviewImage.src = e.target.result;
              }
              reader.readAsDataURL(file);
          }
      });
  }

}); 