/* =========================================================
   Ju Valadares Media | Interações v4
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURAÇÃO RÁPIDA — editar somente aqui
   --------------------------------------------------------- */

// WhatsApp da Júlia (55 + 86 + número)
const WHATSAPP_NUMERO = '5586994622236';

// Mensagem padrão pré-preenchida ao abrir o WhatsApp.
// Botões específicos podem sobrescrever com o atributo data-wa-msg no HTML.
const WHATSAPP_MENSAGEM = 'Oi, Ju! Vim pelo site e gostaria de fazer um orçamento para um ensaio fotográfico.';

// Instagram
const INSTAGRAM_URL = 'https://www.instagram.com/juvaladares.media/';


// Tags discretas por foto do portfólio (num do arquivo → categoria).
// Mostram a versatilidade dos ensaios sem poluir. Fotos sem entrada
// aqui simplesmente não recebem tag. Ju: ajuste livremente as categorias.
const PORTFOLIO_TAGS = {
  '01': 'Gestante',  '02': 'Casamento', '03': 'Gestante',  '04': 'Gestante',
  '05': 'Gestante',  '06': 'Gestante',  '07': 'Casal',     '08': 'Casal',
  '09': 'Casal',     '10': 'Casal',     '11': 'Casal',     '12': 'Casamento',
  '13': 'Casamento', '14': 'Casamento', '15': 'Casamento', '16': 'Casal',
  '17': 'Casal',     '18': 'Casal',     '19': 'Casal',     '21': 'Casal',
  '22': 'Família',   '23': 'Detalhes',  '24': 'Casamento', '25': 'Casal',
  '27': 'Casal',     '29': 'Retrato',   '30': 'Família',   '31': 'Casamento',
  '32': 'Casamento', '33': 'Casamento', '34': 'Batizado',  '35': 'Detalhes',
  '36': 'Gestante',  '37': 'Casamento', '38': 'Casal',     '39': 'Casal',
  '40': 'Retrato',   '41': 'Retrato'
};


// Sequência das fotos do portfólio, exatamente na ordem em que
// estão na pasta /portfolio/. Cada arquivo virou portXX.webp.
const PORTFOLIO_NUMS = [
  '01','02','03','04','05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19',
  '21','22','23','24','25','27','29','30','31','32',
  '33','34','35','36','37','38','39','40','41'
];

// Carrossel da primeira dobra. A foto da Júlia (dobra.jpeg) já está no
// HTML e é sempre a primeira; estas entram na sequência depois dela.
const HERO_SLIDESHOW_NUMS = ['02','07','22','31','12','38'];

// Tempo de cada foto em tela (ms).
const HERO_SLIDE_DURATION = 5000;


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
  document.querySelectorAll('[data-cta-whatsapp]').forEach((el) => {
    // Cada botão pode ter uma mensagem própria via data-wa-msg;
    // sem isso, cai na mensagem padrão de orçamento.
    const msg = el.getAttribute('data-wa-msg') || WHATSAPP_MENSAGEM;
    const waUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
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
   5. Carrossel da primeira dobra (crossfade + Ken Burns)
   As fotos passam dentro da mesma moldura de sempre. A primeira
   já vem no HTML, então a dobra nunca aparece vazia.
   --------------------------------------------------------- */
function setupHeroSlideshow() {
  const root = document.getElementById('hero-photo');
  if (!root) return;

  const tag = root.querySelector('.hero-photo-tag');

  HERO_SLIDESHOW_NUMS.forEach((num) => {
    const img = document.createElement('img');
    img.className = 'hero-slide';
    img.src = `assets/port${num}.webp`;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.loading = 'lazy';
    img.decoding = 'async';
    // Entram antes da tag para a legenda continuar por cima das fotos
    root.insertBefore(img, tag);
  });

  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  if (slides.length <= 1) return;

  // Respeita quem prefere menos movimento: fica só na primeira foto
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
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

    // Tag discreta de categoria (se houver mapeamento para esta foto)
    const tag = PORTFOLIO_TAGS[num];
    if (tag) {
      const cap = document.createElement('figcaption');
      cap.className = 'carousel-tag';
      cap.textContent = tag;
      fig.appendChild(cap);
    }

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
    if (window.innerWidth >= 1200) return 5;
    if (window.innerWidth >= 900) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };
  // Setas avançam UMA "página" cheia (4 ou 5 cards no desktop)
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

  const animateNumber = (el) => {
    const target = Number(el.dataset.countTo);
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const duration = 1600;
    const startedAt = performance.now();
    const tick = (now) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
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
}


/* ---------------------------------------------------------
   8. Pop-up estratégico
   Um único gatilho: quando a pessoa passa de POPUP_SCROLL_PCT da
   página. Não abre na chegada e não volta a aparecer na mesma visita.
   --------------------------------------------------------- */
const POPUP_SCROLL_PCT = 45;

function setupCtaModal() {
  const modal = document.getElementById('cta-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const SESSION_KEY = 'jvm_cta_modal_seen';

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

  const onScroll = () => {
    const rolado = window.scrollY || document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    if ((rolado / total) * 100 < POPUP_SCROLL_PCT) return;

    window.removeEventListener('scroll', onScroll);
    sessionStorage.setItem(SESSION_KEY, '1');
    setTimeout(openModal, 400); // pequeno respiro para não ser invasivo
  };
  window.addEventListener('scroll', onScroll, { passive: true });
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
  setupHeroSlideshow();
  setupCarousel();
  setupMosaic();
  setupFaq();
  setupReveal();
  setupProgressBar();
  setupAuthorityCounters();
  setupFloatingCta();
  setupCtaModal();
  setupFooterYear();
});
