/* =========================================================
   Ju Valadares Media | Interações v4
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURAÇÃO RÁPIDA — editar somente aqui
   --------------------------------------------------------- */

// WhatsApp da Júlia (55 + 86 + número)
const WHATSAPP_NUMERO = '5586994622236';

// Mensagem pré-preenchida ao abrir o WhatsApp
const WHATSAPP_MENSAGEM = 'Olá Júlia! Vim pela landing page da Ju Valadares Media e gostaria de saber mais sobre seus planos.';

// Instagram
const INSTAGRAM_URL = 'https://www.instagram.com/juvaladares.media/';


// Sequência das fotos do portfólio, exatamente na ordem em que
// estão na pasta /portfolio/. Cada arquivo virou portXX.webp.
const PORTFOLIO_NUMS = [
  '01','02','03','04','05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19',
  '21','22','23','24','25','27','29','30','31','32',
  '33','34','35','36','37','38','39','40','41'
];

// Fotos usadas no slideshow do hero — seleciono as primeiras
// 10 do portfolio para um vídeo curto e impactante.
const HERO_SLIDESHOW_NUMS = ['01','03','08','11','15','19','22','29','31','35'];

// Tempo de cada slide em tela (ms). Mudar aqui se quiser mais
// ou menos tempo. O CSS lê este valor via var --slideshow-duration.
const HERO_SLIDE_DURATION = 4500;


// Mosaico de destaques (logo abaixo de "Cada etapa pensada..."). Cada célula
// alterna entre 3 fotos a cada MOSAIC_INTERVAL ms. Curadoria: 1 de cada ensaio.
// "pos" = object-position p/ manter o ponto de interesse no recorte quadrado.
const MOSAIC_INTERVAL = 4500;
const MOSAIC = [
  { cls: 'm-big', shots: [
    { src: 'feat01.webp', pos: 'center 40%' }, // o beijo no altar (H)
    { src: 'port12.webp', pos: 'center 40%' }, // casal na nave da igreja (H)
    { src: 'feat02.webp', pos: 'center 22%' }, // pai erguendo a filha (V)
  ] },
  { cls: 'm-1', shots: [
    { src: 'port37.webp', pos: 'center 28%' }, // noivos no altar (V)
    { src: 'feat05.webp', pos: 'center 26%' }, // família rindo (V)
    { src: 'feat03.webp', pos: 'center 22%' }, // retrato P&B em estúdio (V)
  ] },
  { cls: 'm-2', shots: [
    { src: 'port07.webp', pos: 'center 32%' }, // beijo na praia (V)
    { src: 'feat04.webp', pos: 'center 50%' }, // alianças, detalhe P&B (H)
    { src: 'port40.webp', pos: 'center 28%' }, // retrato masculino (V)
  ] },
  { cls: 'm-3', shots: [
    { src: 'port38.webp', pos: 'center 30%' }, // casal na parede (V)
    { src: 'feat06.webp', pos: 'center 42%' }, // família ao pôr do sol (H)
    { src: 'port41.webp', pos: 'center 22%' }, // retrato em estúdio (V)
  ] },
  { cls: 'm-4', shots: [
    { src: 'port02.webp', pos: 'center 50%' }, // família no altar da igreja (V)
    { src: 'port39.webp', pos: 'center 28%' }, // casal dançando no jardim (V)
    { src: 'port17.webp', pos: 'center 30%' }, // casal P&B na praia (V)
  ] },
];


/* ---------------------------------------------------------
   1. CTAs: WhatsApp + Instagram
   --------------------------------------------------------- */
function setupCtas() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

  document.querySelectorAll('[data-cta-whatsapp]').forEach((el) => {
    el.setAttribute('href', waUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
  document.querySelectorAll('[data-cta-instagram]').forEach((el) => {
    el.setAttribute('href', INSTAGRAM_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}


/* ---------------------------------------------------------
   2. Reveal on scroll
   --------------------------------------------------------- */
function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.revealDelay || 0);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((el) => io.observe(el));
}


/* ---------------------------------------------------------
   3. Progress bar
   --------------------------------------------------------- */
function setupProgressBar() {
  const fill = document.querySelector('.progress-bar-fill');
  if (!fill) return;
  let ticking = false;
  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    fill.style.width = pct + '%';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}


/* ---------------------------------------------------------
   4. CTAs flutuantes
   --------------------------------------------------------- */
function setupFloatingCta() {
  const group = document.querySelector('.cta-floating-group');
  if (!group) return;
  const hideTargets = [
    document.getElementById('hero'),
    document.getElementById('quem-somos'),
    document.querySelector('.site-footer'),
  ].filter(Boolean);
  const visibleHiders = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleHiders.add(entry.target);
        else visibleHiders.delete(entry.target);
      });
      group.classList.toggle('is-visible', visibleHiders.size === 0);
    },
    { threshold: 0.25 }
  );
  hideTargets.forEach((el) => io.observe(el));
}


/* ---------------------------------------------------------
   5. Hero slideshow (Ken Burns + crossfade automático)
   --------------------------------------------------------- */
function setupHeroSlideshow() {
  const root = document.getElementById('hero-slideshow');
  if (!root) return;

  // Repassa a duração ao CSS para a barra de progresso bater
  root.style.setProperty('--slideshow-duration', HERO_SLIDE_DURATION + 'ms');

  // Cria slides e a barra de progresso
  HERO_SLIDESHOW_NUMS.forEach((num, idx) => {
    const img = document.createElement('img');
    img.className = 'hero-slide';
    img.src = `assets/port${num}.webp`;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.loading = idx === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (idx === 0) img.classList.add('is-active');
    root.appendChild(img);
  });

  const progress = document.createElement('div');
  progress.className = 'hero-slideshow-progress';
  root.appendChild(progress);

  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  if (slides.length <= 1) return;

  let current = 0;
  setInterval(() => {
    const prev = slides[current];
    current = (current + 1) % slides.length;
    const next = slides[current];

    prev.classList.remove('is-active');
    prev.classList.add('is-prev');
    next.classList.add('is-active');

    // Limpa a classe de transição do anterior após a animação
    setTimeout(() => prev.classList.remove('is-prev'), 1300);
  }, HERO_SLIDE_DURATION);
}


/* ---------------------------------------------------------
   6. Carrossel do portfólio (34 fotos, 3 visíveis no desktop)
   --------------------------------------------------------- */
function setupCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  PORTFOLIO_NUMS.forEach((num, idx) => {
    const fig = document.createElement('figure');
    fig.className = 'carousel-item';
    fig.setAttribute('aria-roledescription', 'slide');
    fig.setAttribute('aria-label', `${idx + 1} de ${PORTFOLIO_NUMS.length}`);
    const img = document.createElement('img');
    img.src = `assets/port${num}.webp`;
    img.alt = `Foto ${num} do portfólio Ju Valadares Media`;
    img.loading = idx < 3 ? 'eager' : 'lazy';
    img.decoding = 'async';
    fig.appendChild(img);
    track.appendChild(fig);
  });

  const slides = Array.from(track.querySelectorAll('.carousel-item'));
  const totalEl = document.getElementById('carousel-total');
  const currentEl = document.getElementById('carousel-current');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (totalEl) totalEl.textContent = PORTFOLIO_NUMS.length;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.6) {
          slides.forEach((s) => s.classList.remove('is-active'));
          entry.target.classList.add('is-active');
          const idx = slides.indexOf(entry.target);
          if (currentEl) currentEl.textContent = idx + 1;
        }
      });
    },
    { root: track, threshold: [0.6, 0.9] }
  );
  slides.forEach((s) => obs.observe(s));

  // Quantos cards estão visíveis no momento (determina o "passo" da seta)
  const cardsVisible = () => {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };
  // Setas avançam UMA "página" cheia (3 cards no desktop)
  const scrollByPage = (dir) => {
    const w = slides[0].getBoundingClientRect().width + 16;
    track.scrollBy({ left: dir * w * cardsVisible(), behavior: 'smooth' });
  };
  // Teclado/swipe avança 1 card só (mais granular)
  const scrollByOne = (dir) => {
    const w = slides[0].getBoundingClientRect().width + 16;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  prevBtn && prevBtn.addEventListener('click', () => scrollByPage(-1));
  nextBtn && nextBtn.addEventListener('click', () => scrollByPage(1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByOne(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollByOne(-1); }
  });

  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 60) scrollByOne(dx > 0 ? -1 : 1);
  });
}


/* ---------------------------------------------------------
   Mosaico de destaques: monta as células e faz o crossfade
   automático (1 de cada ensaio, troca a cada 4,5s)
   --------------------------------------------------------- */
function setupMosaic() {
  const root = document.getElementById('portfolio-mosaic');
  if (!root) return;

  const cells = MOSAIC.map((cell, ci) => {
    const fig = document.createElement('figure');
    fig.className = 'm-item ' + cell.cls;
    cell.shots.forEach((shot, si) => {
      const img = document.createElement('img');
      img.src = 'assets/' + shot.src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.loading = (ci === 0 && si === 0) ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (shot.pos) img.style.objectPosition = shot.pos;
      if (si === 0) img.classList.add('is-active');
      fig.appendChild(img);
    });
    root.appendChild(fig);
    return fig;
  });

  // Respeita quem prefere menos movimento: mostra só a 1ª de cada célula
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cells.forEach((fig, ci) => {
    const imgs = Array.from(fig.querySelectorAll('img'));
    if (imgs.length <= 1) return;
    let cur = 0;
    const advance = () => {
      imgs[cur].classList.remove('is-active');
      cur = (cur + 1) % imgs.length;
      imgs[cur].classList.add('is-active');
    };
    // Defasagem entre as células p/ não trocarem todas ao mesmo tempo
    setTimeout(() => setInterval(advance, MOSAIC_INTERVAL), ci * 900);
  });
}


/* ---------------------------------------------------------
   FAQ Accordion (toggle individual)
   --------------------------------------------------------- */
function setupFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Fecha todas as outras (modo accordion exclusivo)
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}


/* ---------------------------------------------------------
   7. Contador animado da régua de autoridade
   Inclui transição especial para "Dezenas" (conta 1→5→12→25
   e depois faz fade-in da palavra)
   --------------------------------------------------------- */
function setupAuthorityCounters() {
  const nums = document.querySelectorAll('[data-count-to]');
  const dezenas = document.querySelector('.auth-num-text');

  const animateNumber = (el) => {
    const target = Number(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || '';
    const duration = 1600;
    const startedAt = performance.now();
    const tick = (now) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const animateDezenas = (el) => {
    const sequence = [1, 5, 12, 25, 40];
    const finalText = el.textContent.trim() || 'Dezenas';
    let i = 0;
    el.textContent = '0';
    el.style.transition = 'opacity .3s ease, font-style .3s ease';
    const step = () => {
      if (i < sequence.length) {
        el.textContent = sequence[i];
        i++;
        setTimeout(step, 320);
      } else {
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = finalText;
          el.style.opacity = '1';
        }, 280);
      }
    };
    setTimeout(step, 200);
  };

  if (nums.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { animateNumber(entry.target); io.unobserve(entry.target); }
        });
      },
      { threshold: 0.4 }
    );
    nums.forEach((el) => io.observe(el));
  }

  if (dezenas) {
    const ioD = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { animateDezenas(entry.target); ioD.unobserve(entry.target); }
        });
      },
      { threshold: 0.4 }
    );
    ioD.observe(dezenas);
  }
}


/* ---------------------------------------------------------
   Cascade entrance dos 4 cards de Medos
   --------------------------------------------------------- */
function setupMedosCascade() {
  const grid = document.querySelector('.medos-grid');
  if (!grid) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          grid.classList.add('is-in-view');
          io.unobserve(grid);
        }
      });
    },
    { threshold: 0.18 }
  );
  io.observe(grid);
}


/* ---------------------------------------------------------
   8. Modal popup na dobra Medos
   Aparece automaticamente ao entrar na seção (uma vez por sessão).
   --------------------------------------------------------- */
function setupMedosModal() {
  const modal = document.getElementById('medos-modal');
  const medosSection = document.getElementById('medos');
  if (!modal || !medosSection) return;

  const closeBtn = modal.querySelector('.modal-close');
  const SESSION_KEY = 'jvm_medos_modal_seen';

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Foco no botão para acessibilidade
    setTimeout(() => modal.querySelector('.btn').focus(), 600);
  };
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Fecha ao clicar no X, no backdrop ou no próprio botão de CTA
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
  modal.querySelector('[data-cta-whatsapp]').addEventListener('click', () => {
    // O link abre normalmente, fechamos o modal logo em seguida
    setTimeout(closeModal, 300);
  });

  // Só abre uma vez por sessão (não fica chato)
  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  // Abre quando o usuário rola até ~30% da seção de medos
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sessionStorage.setItem(SESSION_KEY, '1');
          setTimeout(openModal, 600); // pequeno delay para não ser invasivo
          io.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  io.observe(medosSection);
}


/* ---------------------------------------------------------
   9. Ano dinâmico no rodapé
   --------------------------------------------------------- */
function setupFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupCtas();
  setupCarousel();
  setupMosaic();
  setupFaq();
  setupReveal();
  setupProgressBar();
  setupAuthorityCounters();
  setupMedosCascade();
  setupFloatingCta();
  setupMedosModal();
  setupFooterYear();
});
