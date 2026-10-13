# Contributing to Personal Portfolio Showcase

Thank you for your interest in the portfolio site! This repository contains the zero-dependency vanilla HTML5/CSS/JS engineering showcase featuring the interactive terminal REPL, 2D KD-Tree spatial simulator, and Cmd+K command palette.

---

## 🛠️ Development Workflow

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ronitgupta138/ronitgupta138.github.io.git
   cd ronitgupta138.github.io
   ```

2. **Local Preview**:
   Since the site has zero build steps and zero dependencies, you can serve it with any local static server:
   ```bash
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in your browser.

3. **Invariants**:
   - **Zero External Framework Dependencies**: Keep runtime vanilla HTML, CSS, and modern JS.
   - **Accessibility & Contrast**: Maintain WCAG AA text contrast standards across dark surfaces.
   - **Performance**: Retain instant loading and sub-50ms interactive REPL response times.

---

## ⚖️ License
By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
