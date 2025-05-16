document.addEventListener('DOMContentLoaded', () => {
  // 1) 카테고리 active 토글 + data-route 라우팅
  document.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const route = btn.dataset.route;
      if (route) window.location.href = route;
    });
  });

  // 2) 하단 내비게이션 클릭 시 라우팅
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.dataset.route;
      if (route) window.location.href = route;
    });
  });

  // 3) .popular-list, .product-list 클릭&드래그로 가로 스크롤
  document.querySelectorAll('.popular-list, .product-list, .family-list').forEach(slider => {
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
      const walk = (x - startX) * 1.5; // 드래그 속도 조절
      slider.scrollLeft = scrollLeft - walk;
    });
  });
});
