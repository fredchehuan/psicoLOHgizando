# psicoLOHgizando 🧠💜

**Landing page da psicóloga Lohraine Souza**  
Atendimento psicológico com abordagem psicanalítica para adolescentes, jovens e adultos.

---

## 📂 Estrutura do projeto

```
psicoLOHgizando/
├── index.html         # Página principal (one page)
├── css/
│   └── style.css      # Estilos (CSS puro com variáveis)
├── js/
│   └── script.js      # JavaScript puro (menu, parallax, formulário)
└── README.md          # Este arquivo
```

---

## 🚀 Como visualizar o site

Basta abrir o arquivo `index.html` no seu navegador — clique duas vezes ou arraste para uma janela do Chrome/Firefox/Edge.

Se preferir um servidor local (para testar em dispositivos móveis na mesma rede):

```bash
# Python 3
python -m http.server 8080 --directory psicoLOHgizando

# Ou com Node.js (npx)
npx serve psicoLOHgizando
```
Depois acesse `http://localhost:8080`.

---

## 📱 Funcionalidades

- **One page** com seções: Hero, Sobre, Atendimento, Depoimentos, Contato
- **Menu hambúrguer** em dispositivos móveis com overlay e animação X
- **Scroll suave** ao clicar nos links internos (com offset do header fixo)
- **Efeito parallax** em 4 elementos decorativos de fundo (via JS com requestAnimationFrame)
- **Botão WhatsApp flutuante** no canto inferior direito com animação de balanço
- **Formulário de contato** com validação em tempo real (visual, sem envio)
- **Responsivo** — 320px até 1920px (breakpoints: 768px, 1024px, 1200px)
- **SEO otimizado** — meta tags (title, description até 160 chars, keywords), heading hierarchy (h1-h2-h3)
- **Header fixo** com efeito de vidro (backdrop-filter) e sombra dinâmica ao scroll

---

## 🎯 Tecnologias

| Camada    | Tecnologia             |
|-----------|------------------------|
| Estrutura | HTML5 semântico        |
| Estilos   | CSS puro (com variáveis CSS custom properties) |
| Scripts   | JavaScript puro (ES6+) |
| Ícones    | Font Awesome 6 (CDN)   |
| Fontes    | Google Fonts (Poppins + Montserrat) |

**Nenhuma dependência de build** — não precisa de Node.js, npm, Sass, nem qualquer ferramenta de compilação. É só abrir o HTML e pronto.

---

## 🔗 Links

- **WhatsApp:** [wa.me/5521967691475](https://wa.me/5521967691475)
- **Instagram:** [@psicologialoh](https://instagram.com/psicologialoh) (perfil fictício)
- **TikTok:** [@lohpsicologia](https://tiktok.com/@lohpsicologia) (perfil fictício)

---

&copy; 2026 psicoLOHgizando — Todos os direitos reservados.