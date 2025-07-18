document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.video-container');
  const videos = container.querySelectorAll('video');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.getElementById('video-dots');

  let current = 0;
  const total = videos.length;
  const dots = [];

  function showVideo(index) {
    // Остановить все видео
    videos.forEach((v, i) => {
      v.pause();
      v.currentTime = 0;
    });

    // Сменить видео
    container.style.transform = `translateX(-${index * 100}vw)`;
    videos[index].play();

    // Сбросить все индикаторы
    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.style.setProperty('--duration', '0s');
    });

    // Установить активную точку и duration
    const duration = videos[index].duration || 5;
    dots[index].classList.add('active');
    dots[index].style.setProperty('--duration', `${duration}s`);

    // Автосмена по окончании
    clearTimeout(showVideo.timeout);
    showVideo.timeout = setTimeout(() => {
      current = (current + 1) % total;
      showVideo(current);
    }, duration * 1000);
  }

  // Создать индикаторы
  videos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      current = i;
      showVideo(current);
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  // Стрелки
  prevBtn.addEventListener('click', () => {
    current = (current - 1 + total) % total;
    showVideo(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % total;
    showVideo(current);
  });

  // Запуск первого
  videos[0].addEventListener('loadedmetadata', () => {
    showVideo(0);
  });
});
