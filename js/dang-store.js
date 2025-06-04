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

          // dang-store.html 페이지는 특정 하단 탭을 active로 하지 않음 (필요시 수정)
          // if (currentFullUrl === targetUrl) { 
          //   document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          //   btn.classList.add('active');
          // } else {
          //   if (btn.classList.contains('active')) {
          //       btn.classList.remove('active');
          //   }
          // }

          btn.addEventListener('click', (e) => {
            // if (currentFullUrl === targetUrl) { 
            //   e.preventDefault();
            //   return;
            // }
            window.location.href = routeAttribute;
          });
        }
      });
      // --- 여기까지 공통 네비게이션 로직 (dang-store.html용으로 active 설정 부분은 주석 처리) ---

      // 가로 스크롤 리스트 (주석 처리된 상태 유지)
      /*
      document.querySelectorAll('.content-list').forEach(slider => {
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
      */
    }); 