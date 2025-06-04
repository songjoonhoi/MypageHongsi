document.addEventListener('DOMContentLoaded', () => {
      // 뒤로가기 버튼
      document.querySelector('.btn-back').addEventListener('click', () => {
          history.back();
      });

      // 하단 내비게이션 라우팅 (새로운 HTML 파일 경로에 맞게 수정)
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const route = btn.dataset.route;
          if (route) {
            window.location.href = route;
          }
        });
      });

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
      const bragOutputContainer = document.getElementById('brag-output-container');
      const bragOutputText = document.getElementById('brag-output-text');
      const bragLoadingSpinner = document.getElementById('brag-loading-spinner');

      generateBragBtn.addEventListener('click', async () => {
        const prompt = dogBragInput.value.trim();

        if (!prompt) {
          bragOutputText.textContent = '우리 강아지의 특징을 입력해주세요!';
          bragOutputText.style.color = 'red';
          return;
        }

        bragOutputText.textContent = '';
        bragOutputText.style.color = 'var(--text)';
        bragLoadingSpinner.classList.remove('hidden');
        bragOutputContainer.style.minHeight = '100px';

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
          bragOutputContainer.style.minHeight = '50px';
        }
      });
    }); 