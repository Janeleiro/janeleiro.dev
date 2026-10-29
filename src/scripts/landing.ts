// Comportamentos da landing: entrada ao rolar, menu que acompanha a seção,
// texto digitado no diálogo e barra de XP. Tudo opcional: sem JS a página fica completa.

// O script de preferências (Base.astro) já resolveu o sistema e a escolha do painel
const root = document.documentElement;
const reduced = root.dataset.motion === 'reduce' || root.dataset.reading === 'on';

// Atraso escalonado para os filhos de [data-stagger]
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  [...group.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
});

// Entrada ao rolar (.reveal) e barra de XP ([data-xp])
const targets = document.querySelectorAll<HTMLElement>('.reveal, [data-xp]');
// Observa mesmo com animação reduzida: se a pessoa religar as animações no painel,
// os blocos ainda não vistos entram normalmente.
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        if ((e.target as HTMLElement).dataset.xp !== undefined) countLevel(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add('in'));
}

function countLevel(el: HTMLElement) {
  const years = (Date.now() - Number(el.dataset.start)) / (365.25 * 24 * 3600 * 1000);
  const level = Math.floor(years);
  const pct = Math.max(Math.round((years - level) * 100), 4);
  el.querySelector<HTMLElement>('.fill')!.style.setProperty('--pct', `${pct}%`);
  el.querySelector('.track')!.setAttribute('aria-valuenow', String(pct));
  const lv = el.querySelector<HTMLElement>('[data-lv]')!;
  let n = reduced ? level : 0;
  const tick = () => {
    lv.textContent = String(n);
    if (n++ < level) setTimeout(tick, 90);
  };
  tick();
}

// Menus (topo e barra do celular) acompanham a seção visível
const spyLinks = [...document.querySelectorAll<HTMLElement>('[data-spy]')];
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        spyLinks.forEach((a) => (a.dataset.spy === e.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  new Set(spyLinks.map((a) => a.dataset.spy!)).forEach((id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

// Borda no menu depois de rolar
const onScroll = () => document.documentElement.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Texto digitado. Percorre os nós de texto para manter <strong>, links etc.
document.querySelectorAll<HTMLElement>('[data-typing]').forEach((box) => {
  const say = box.querySelector<HTMLElement>('.say');
  if (!say || reduced) return box.classList.add('done');

  // Reserva a altura final para a caixa não crescer enquanto digita
  say.style.minHeight = `${say.offsetHeight}px`;
  const spoken = document.createElement('div');
  spoken.className = 'sr-only';
  spoken.innerHTML = say.innerHTML;
  say.before(spoken);
  say.setAttribute('aria-hidden', 'true');
  const walker = document.createTreeWalker(say, NodeFilter.SHOW_TEXT);
  const nodes: { node: Text; text: string }[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    nodes.push({ node, text: node.data });
    node.data = '';
  }

  let n = 0, c = 0, timer = 0;
  const finish = () => {
    clearTimeout(timer);
    nodes.forEach(({ node, text }) => (node.data = text));
    box.classList.add('done');
    spoken.remove();
    say.removeAttribute('aria-hidden');
    removeEventListener('keydown', finish);
  };
  const step = () => {
    if (n >= nodes.length) return finish();
    const { node, text } = nodes[n];
    node.data = text.slice(0, ++c);
    if (c >= text.length) { n++; c = 0; }
    const ch = text[c - 1];
    timer = window.setTimeout(step, ch === '.' || ch === '!' ? 260 : ch === ',' ? 120 : 22);
  };
  box.addEventListener('click', finish, { once: true });
  addEventListener('beforeprint', finish, { once: true });
  // Se a pessoa ligar "reduzir animações" ou o modo leitura no meio da digitação
  document.addEventListener('prefs-change', () => {
    if (root.dataset.motion === 'reduce' || root.dataset.reading === 'on') finish();
  });
  addEventListener('keydown', finish, { once: true });
  timer = window.setTimeout(step, 450);
});


// Filtro de projetos (Todos / Clientes / Pessoais)
const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
filterButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    const kind = btn.dataset.filter;
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    document.querySelectorAll<HTMLElement>('.project[data-kinds]').forEach((card) => {
      const kinds = card.dataset.kinds!.split(' ');
      // "Próprios" junta produtos e projetos pessoais
      const match = kind === 'proprio' ? kinds.some((k) => k !== 'cliente') : kinds.includes(kind!);
      card.hidden = kind !== 'todos' && !match;
      if (!card.hidden) card.classList.add('in');
    });
    const shown = document.querySelectorAll('.project[data-kinds]:not([hidden])').length;
    const status = document.getElementById('filter-status')!;
    status.textContent = (status.dataset.template ?? '{n}').replace('{n}', String(shown));
  }),
);
