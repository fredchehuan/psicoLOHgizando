/**
 * psicoLOHgizando — Scripts
 *
 * Funcionalidades:
 * - Menu hambúrguer (mobile)
 * - Scroll suave para links internos
 * - Efeitos parallax em todas as seções (blobs decorativos)
 * - Reveal on scroll (textos e cards aparecem com fade-in)
 * - Validação do formulário de contato
 * - Ano automático no rodapé
 * - Sombra dinâmica no header
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========== ELEMENTOS DO DOM ==========
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');
  const body      = document.body;

  // Todos os elementos com parallax (hero + blobs genéricos em qualquer seção)
  const parallaxEls = document.querySelectorAll(
    '.hero__parallax, .servicos__parallax, .parallax-bg'
  );

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const formContato   = document.getElementById('form-contato');
  const anoAtual      = document.getElementById('ano-atual');

  // ========== OVERLAY DO MENU MOBILE ==========
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  body.appendChild(overlay);

  // ========== MENU HAMBURGUER ==========
  function openMenu() {
    nav.classList.add('nav--open');
    hamburger.classList.add('hamburger--active');
    overlay.classList.add('nav-overlay--visible');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav--open');
    hamburger.classList.remove('hamburger--active');
    overlay.classList.remove('nav-overlay--visible');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    nav.classList.contains('nav--open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // ========== SCROLL SUAVE PARA LINKS INTERNOS ==========
  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      if (nav.classList.contains('nav--open')) closeMenu();

      const headerHeight = header.offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  // ========== EFEITOS PARALLAX (todas as seções) ==========
  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;

    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.18;
      // Multiplica por -1 para os blobs se moverem na direção oposta ao scroll
      const yOffset = scrollY * speed * -1;
      el.style.transform = `translateY(${yOffset}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        updateHeaderShadow();
      });
      ticking = true;
    }
  }, { passive: true });

  // ========== SOMBRA DO HEADER NO SCROLL ==========
  function updateHeaderShadow() {
    header.classList.toggle('header--scrolled', window.pageYOffset > 10);
  }

  // ========== REVEAL ON SCROLL (fade-in nos cards e textos) ==========
  const revealTargets = document.querySelectorAll(
    '.sobre__card, .servico-card, .depoimento-card, .sobre__text, .contato__form'
  );

  // Adiciona a classe .reveal via JS (HTML permanece limpo)
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          // Para de observar depois que o elemento aparece
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,      // 15% do elemento visível já dispara
      rootMargin: '0px 0px -40px 0px' // Pequeno offset para suavizar
    }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  // ========== VALIDAÇÃO DO FORMULÁRIO ==========
  if (formContato) {
    const nomeInput     = document.getElementById('nome');
    const emailInput    = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    const erroNome     = document.getElementById('erro-nome');
    const erroEmail    = document.getElementById('erro-email');
    const erroMensagem = document.getElementById('erro-mensagem');

    function showError(input, errorEl, message) {
      input.classList.add('form__input--error');
      errorEl.textContent = message;
    }

    function clearError(input, errorEl) {
      input.classList.remove('form__input--error');
      errorEl.textContent = '';
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearAllErrors() {
      clearError(nomeInput, erroNome);
      clearError(emailInput, erroEmail);
      clearError(mensagemInput, erroMensagem);
    }

    // Blur: valida ao sair do campo
    nomeInput.addEventListener('blur', () => {
      nomeInput.value.trim() === ''
        ? showError(nomeInput, erroNome, 'Por favor, digite seu nome.')
        : nomeInput.value.trim().length < 2
          ? showError(nomeInput, erroNome, 'Nome muito curto.')
          : clearError(nomeInput, erroNome);
    });

    emailInput.addEventListener('blur', () => {
      emailInput.value.trim() === ''
        ? showError(emailInput, erroEmail, 'Por favor, digite seu e-mail.')
        : !isValidEmail(emailInput.value.trim())
          ? showError(emailInput, erroEmail, 'E-mail inválido. Use o formato: nome@exemplo.com')
          : clearError(emailInput, erroEmail);
    });

    mensagemInput.addEventListener('blur', () => {
      mensagemInput.value.trim() === ''
        ? showError(mensagemInput, erroMensagem, 'Por favor, escreva uma mensagem.')
        : mensagemInput.value.trim().length < 10
          ? showError(mensagemInput, erroMensagem, 'Mensagem muito curta. Conte um pouco mais :)')
          : clearError(mensagemInput, erroMensagem);
    });

    // Limpa erros ao digitar
    nomeInput.addEventListener('input', () => {
      if (nomeInput.value.trim().length >= 2) clearError(nomeInput, erroNome);
    });
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value.trim())) clearError(emailInput, erroEmail);
    });
    mensagemInput.addEventListener('input', () => {
      if (mensagemInput.value.trim().length >= 10) clearError(mensagemInput, erroMensagem);
    });

    // Submit
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors();

      let isValid = true;

      if (nomeInput.value.trim() === '') {
        showError(nomeInput, erroNome, 'Por favor, digite seu nome.');
        isValid = false;
      } else if (nomeInput.value.trim().length < 2) {
        showError(nomeInput, erroNome, 'Nome muito curto.');
        isValid = false;
      }

      if (emailInput.value.trim() === '') {
        showError(emailInput, erroEmail, 'Por favor, digite seu e-mail.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, erroEmail, 'E-mail inválido.');
        isValid = false;
      }

      if (mensagemInput.value.trim() === '') {
        showError(mensagemInput, erroMensagem, 'Por favor, escreva uma mensagem.');
        isValid = false;
      } else if (mensagemInput.value.trim().length < 10) {
        showError(mensagemInput, erroMensagem, 'Mensagem muito curta. Conte um pouco mais :)');
        isValid = false;
      }

      if (isValid) {
        const btn = formContato.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✓ Mensagem validada!';
        btn.style.background = '#B39CD0';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          formContato.reset();
        }, 2500);
      } else {
        const firstError = formContato.querySelector('.form__input--error');
        if (firstError) firstError.focus();
      }
    });
  }

  // ========== ANO AUTOMÁTICO NO RODAPÉ ==========
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // ========== INICIALIZAÇÃO ==========
  updateParallax();
  updateHeaderShadow();
});