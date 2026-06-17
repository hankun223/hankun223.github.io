// 滚动时导航高亮当前 section
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// 卡片入场动画
const fadeEls = document.querySelectorAll('.about-card, .hobby-item, .timeline-item');

const fadeIn = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      fadeIn.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease';
  fadeIn.observe(el);
});

// 语录轮播：点击头像切换下一句
const quotes = [
  '喜欢我的头像吗，他叫利姆鲁，本体是一只可爱的史莱姆哦。',
  '要有最朴素的生活，与最遥远的梦想。',
  '即使明日天寒地冻，路远马亡。',
  '我站在那里望春天的山坡，望了很久。风把碎花吹进我的头发里，我想，活着本身就是一首还没有写完的诗。',
  '我偏爱那未被命名的晨光，偏爱天真，偏爱不设防的柔软。像初雪覆盖的原野，像四月第一朵开错花期的桃——不问来路，只管盛放。',
  '去想无关紧要的事吧，去想想风吧。',
  '且将新火试新茶，诗酒趁年华。'
];
let quoteIndex = 0;
const bubbleText = document.querySelector('.bubble-text');
const avatarRing = document.querySelector('.avatar-ring');
if (avatarRing && bubbleText) {
  avatarRing.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    bubbleText.style.opacity = '0';
    setTimeout(() => {
      bubbleText.textContent = quotes[quoteIndex];
      bubbleText.style.opacity = '1';
    }, 180);
  });
}
