document.addEventListener('DOMContentLoaded', () => {
      // 뒤로가기 버튼
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

          // dang-jarang.html 페이지는 특정 하단 탭을 active로 하지 않음 (필요시 수정)
          // HTML 구조상 active 클래스가 미리 지정되어 있지 않다고 가정
          // if (currentFullUrl === targetUrl) { 
          //   document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          //   btn.classList.add('active');
          // } else {
          //   if (btn.classList.contains('active')) {
          //       btn.classList.remove('active');
          //   }
          // }

          btn.addEventListener('click', (e) => {
            // 현재 페이지와 목적지가 같으면 이동 방지 (dang-jarang 페이지는 특정 탭과 일치하지 않음)
            // if (currentFullUrl === targetUrl) { 
            //   e.preventDefault();
            //   return;
            // }
            window.location.href = routeAttribute;
          });
        }
      });
      // --- 여기까지 공통 네비게이션 로직 (dang-jarang.html용으로 active 설정 부분은 주석 처리) ---

      // 기존 가로 스크롤 로직 (이 페이지에서는 필요 없지만, index.html에서 복사되어 있을 수 있음)
      document.querySelectorAll('.popular-list, .product-list, .shoppingmal-list, .family-list').forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', e => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
          e.preventDefault();
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
          const walk = (x - startX) * 1.5;
          slider.scrollLeft = scrollLeft - walk;
        });
      });

      // Gemini API Integration: Bragging Post Generator Logic
      const dogBragInput = document.getElementById('dog-brag-input');
      const generateBragBtn = document.getElementById('generate-brag-btn');
      if (generateBragBtn) {
        const bragOutputContainer = document.getElementById('brag-output-container');
        const bragOutputText = document.getElementById('brag-output-text');
        const bragLoadingSpinner = document.getElementById('brag-loading-spinner');

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
    }); 