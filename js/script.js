// script.js 내용
document.addEventListener('DOMContentLoaded', () => {
  // 1) 카테고리 active 토글 + data-route 라우팅
  document.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const route = btn.dataset.route;
      // if (route) window.location.href = route; // 현재는 페이지 이동 주석 처리, 필요 시 활성화
    });
  });

  // 2) 하단 내비게이션 클릭 시 active 토글 + 라우팅
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active')); // 모든 버튼에서 active 제거
      btn.classList.add('active'); // 클릭된 버튼에 active 추가
      const route = btn.dataset.route;
      // if (route) window.location.href = route; // 현재는 페이지 이동 주석 처리, 필요 시 활성화

      // 검색 버튼 클릭 시 메시지 표시
      if (route === '/search') {
        alert('검색 기능은 아직 구현되지 않았습니다.');
      }
    });
  });

  // 초기 로드 시 첫 번째 카테고리/하단 내비 버튼에 active 클래스 추가 (선택 사항)
  // if (document.querySelector('.btn-category')) {
  //   document.querySelector('.btn-category').classList.add('active');
  // }
  // if (document.querySelector('.nav-btn')) {
  //   document.querySelector('.nav-btn').classList.add('active');
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

  generateBragBtn.addEventListener('click', async () => {
    const prompt = dogBragInput.value.trim();

    if (!prompt) {
      // alert 대신 메시지 박스 또는 인라인 메시지 사용 권장
      bragOutputText.textContent = '우리 강아지의 특징을 입력해주세요!';
      bragOutputText.style.color = 'red';
      return;
    }

    // Clear previous output and show loading spinner
    bragOutputText.textContent = '';
    bragOutputText.style.color = 'var(--text)'; // 색상 초기화
    bragLoadingSpinner.classList.remove('hidden');
    bragOutputContainer.style.minHeight = '100px'; // 로딩 중 높이 확보

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
        bragOutputText.textContent = text;
      } else {
        bragOutputText.textContent = '자랑글을 생성하는 데 실패했습니다. 다시 시도해주세요.';
        bragOutputText.style.color = 'red';
        console.error('Unexpected API response structure:', result);
      }
    } catch (error) {
      console.error('Error generating bragging post:', error);
      bragOutputText.textContent = '자랑글을 생성하는 중 오류가 발생했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.';
      bragOutputText.style.color = 'red';
    } finally {
      bragLoadingSpinner.classList.add('hidden');
      bragOutputContainer.style.minHeight = '50px'; // 원래 높이로 복원
    }
  });
}); 