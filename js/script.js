/**
 * psicoLOHgizando — Scripts
 * 
 * Funcionalidades:
 * - Menu hambúrguer (mobile)
 * - Scroll suave para links internos
 * - Efeitos parallax no scroll
 * - Validação do formulário de contato
 * - Ano automático no rodapé
 * - Classe de scroll no header
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========== ELEMENTOS DO DOM ==========
  const header       = document.getElementById('header');
  const hamburger    = document.getElementById('hamburger');
  const nav          = document.getElementById('nav');
  const body         = document.body;

  // Elementos parallax
  const parallaxEls  = document.querySelectorAll('.hero__parallax, .servicos__parallax');

  // Links internos (scroll suave)
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  // Formulário
  const formContato  = document.getElementById('form-contato');

  // Ano do rodapé
  const anoAtual     = document.getElementById('ano-atual');

  // ========== OVERLAY DO MENU MOBILE ==========
  // Cria overlay dinamicamente
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
    if (nav.classList.contains('nav--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha menu ao clicar no overlay
  overlay.addEventListener('click', closeMenu);

  // Fecha menu ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // ========== SCROLL SUAVE PARA LINKS INTERNOS ==========
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Ignorar links que não são âncoras internas válidas
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Fecha o menu mobile se estiver aberto
      if (nav.classList.contains('nav--open')) {
        closeMenu();
      }

      // Calcula offset considerando o header fixo
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ========== EFEITOS PARALLAX ==========
  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;

    parallaxEls.forEach((el) => {
      // Cada elemento se move em uma velocidade diferente
      // baseado no atributo data-speed ou em um fallback
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.15;

      // Direção: negativo = move mais devagar (efeito parallax clássico)
      const yOffset = scrollY * speed * -1;

      el.style.transform = `translateY(${yOffset}px)`;
    });

    ticking = false;
  }

  // Usa requestAnimationFrame para performance
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
    if (window.pageYOffset > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  // ========== VALIDAÇÃO DO FORMULÁRIO ==========
  if (formContato) {
    const nomeInput     = document.getElementById('nome');
    const emailInput    = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    const erroNome      = document.getElementById('erro-nome');
    const erroEmail     = document.getElementById('erro-email');
    const erroMensagem  = document.getElementById('erro-mensagem');

    /**
     * Exibe mensagem de erro em um campo
     */
    function showError(input, errorEl, message) {
      input.classList.add('form__input--error');
      errorEl.textContent = message;
    }

    /**
     * Remove erro de um campo
     */
    function clearError(input, errorEl) {
      input.classList.remove('form__input--error');
      errorEl.textContent = '';
    }

    /**
     * Valida formato de email com regex simples
     */
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Limpa todos os erros
     */
    function clearAllErrors() {
      clearError(nomeInput, erroNome);
      clearError(emailInput, erroEmail);
      clearError(mensagemInput, erroMensagem);
    }

    // Validação em tempo real ao perder o foco
    nomeInput.addEventListener('blur', () => {
      if (nomeInput.value.trim() === '') {
        showError(nomeInput, erroNome, 'Por favor, digite seu nome.');
      } else if (nomeInput.value.trim().length < 2) {
        showError(nomeInput, erroNome, 'Nome muito curto.');
      } else {
        clearError(nomeInput, erroNome);
      }
    });

    emailInput.addEventListener('blur', () => {
      if (emailInput.value.trim() === '') {
        showError(emailInput, erroEmail, 'Por favor, digite seu e-mail.');
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, erroEmail, 'E-mail inválido. Use o formato: nome@exemplo.com');
      } else {
        clearError(emailInput, erroEmail);
      }
    });

    mensagemInput.addEventListener('blur', () => {
      if (mensagemInput.value.trim() === '') {
        showError(mensagemInput, erroMensagem, 'Por favor, escreva uma mensagem.');
      } else if (mensagemInput.value.trim().length < 10) {
        showError(mensagemInput, erroMensagem, 'Mensagem muito curta. Conte um pouco mais :)');
      } else {
        clearError(mensagemInput, erroMensagem);
      }
    });

    // Limpa erros ao digitar
    nomeInput.addEventListener('input', () => {
      if (nomeInput.value.trim().length >= 2) {
        clearError(nomeInput, erroNome);
      }
    });

    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value.trim())) {
        clearError(emailInput, erroEmail);
      }
    });

    mensagemInput.addEventListener('input', () => {
      if (mensagemInput.value.trim().length >= 10) {
        clearError(mensagemInput, erroMensagem);
      }
    });

    // Submit do formulário (visual apenas)
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors();

      let isValid = true;

      // Valida nome
      if (nomeInput.value.trim() === '') {
        showError(nomeInput, erroNome, 'Por favor, digite seu nome.');
        isValid = false;
      } else if (nomeInput.value.trim().length < 2) {
        showError(nomeInput, erroNome, 'Nome muito curto.');
        isValid = false;
      }

      // Valida email
      if (emailInput.value.trim() === '') {
        showError(emailInput, erroEmail, 'Por favor, digite seu e-mail.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, erroEmail, 'E-mail inválido.');
        isValid = false;
      }

      // Valida mensagem
      if (mensagemInput.value.trim() === '') {
        showError(mensagemInput, erroMensagem, 'Por favor, escreva uma mensagem.');
        isValid = false;
      } else if (mensagemInput.value.trim().length < 10) {
        showError(mensagemInput, erroMensagem, 'Mensagem muito curta. Conte um pouco mais :)');
        isValid = false;
      }

      if (isValid) {
        // Como é apenas visual, exibe um feedback amigável
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
        // Foca no primeiro campo com erro
        const firstError = formContato.querySelector('.form__input--error');
        if (firstError) firstError.focus();
      }
    });
  }

  // ========== ANO AUTOMÁTICO NO RODAPÉ ==========
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // ========== ATUALIZA PARALLAX NO CARREGAMENTO ==========
  updateParallax();
  updateHeaderShadow();
});