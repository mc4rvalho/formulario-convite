/**
 * main.js
 * Script responsável pela interatividade da página de convite.
 * Funcionalidades:
 * 1. Troca dinâmica da cor principal (Color Picker).
 * 2. Troca do background baseado no tema escolhido.
 * 3. Alternância entre Modo Claro (Light) e Escuro (Dark).
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. GERENCIAMENTO DA COR PRINCIPAL (COLOR PICKER)
     ========================================================================== */

  const colorInputs = document.querySelectorAll('.color-picker input[type="radio"]');

  colorInputs.forEach(input => {
    input.addEventListener('change', function () {
      if (this.checked) {
        // CORREÇÃO AQUI:
        // Usamos getComputedStyle para garantir que pegamos o valor correto da cor,
        // não importa se foi definida inline ou via CSS externo.
        const computedStyle = getComputedStyle(this);
        const newColor = computedStyle.getPropertyValue('--color').trim();

        // Só aplica se realmente encontrou uma cor
        if (newColor) {
          document.documentElement.style.setProperty('--brand-light', newColor);
        }
      }
    });
  });


  /* ==========================================================================
     2. GERENCIAMENTO DO TEMA (BACKGROUND IMAGE)
     ========================================================================== */

  const themeInputs = document.querySelectorAll('.theme-item input[type="radio"]');
  const body = document.body; // Elemento alvo para aplicar o background

  themeInputs.forEach(input => {
    input.addEventListener('change', function () {
      if (this.checked) {
        // Navegação no DOM: O input está antes do label.
        // Acessamos o próximo irmão (label) e buscamos a tag <img> dentro dele.
        const label = this.nextElementSibling;
        const img = label.querySelector('img');

        if (img) {
          const imgSrc = img.src;

          // Define a imagem selecionada como background do body.
          // Adiciona um gradiente linear preto com 85% de opacidade (overlay)
          // para garantir a legibilidade do texto branco sobre a imagem.
          body.style.backgroundImage = `
            linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), 
            url(${imgSrc})
          `;

          // Ajustes de CSS para garantir que a imagem cubra a tela e não repita
          body.style.backgroundSize = 'cover';       // Preenche todo o espaço
          body.style.backgroundAttachment = 'fixed'; // Imagem fixa ao rolar a página
          body.style.backgroundPosition = 'center';  // Centraliza o foco da imagem
          body.style.backgroundRepeat = 'no-repeat';
        }
      }
    });
  });


  /* ==========================================================================
     3. ALTERNÂNCIA DE MODO CLARO / ESCURO (THEME SWITCHER)
     ========================================================================== */

  const themeToggle = document.getElementById('theme-toggle');

  /**
   * Função: setLightMode
   * Descrição: Sobrescreve as variáveis CSS originais com valores claros.
   * Utiliza 'style.setProperty' para injetar estilos inline na tag <html>.
   */
  function setLightMode() {
    const root = document.documentElement.style;

    // Definição da Paleta Clara (Light Mode)
    // Fundo da página (off-white / gelo)
    root.setProperty('--shape-body', '#F8FAFC');
    // Fundo de cards e botões secundários (cinza muito claro)
    root.setProperty('--shape-button', '#E2E8F0');
    // Cor de estado hover (cinza claro)
    root.setProperty('--shape-hover', '#CBD5E1');

    // Inputs
    root.setProperty('--input-base', '#FFFFFF');       // Fundo branco puro
    root.setProperty('--input-stroke', '#94A3B8');     // Borda cinza médio
    root.setProperty('--input-placeholder', '#64748B');// Texto de ajuda

    // Tipografia
    root.setProperty('--color-heading', '#0F172A');    // Títulos (quase preto)
    root.setProperty('--color-body', '#334155');       // Texto corrido (cinza escuro)
  }

  /**
   * Função: setDarkMode
   * Descrição: Restaura o tema padrão (Escuro) removendo os estilos inline.
   * Ao remover a propriedade, o navegador volta a ler o valor original do arquivo .css.
   */
  function setDarkMode() {
    const root = document.documentElement.style;

    // Lista de variáveis que precisam ser resetadas
    const properties = [
      '--shape-body',
      '--shape-button',
      '--shape-hover',
      '--input-base',
      '--input-stroke',
      '--input-placeholder',
      '--color-heading',
      '--color-body'
    ];

    // Loop para remover cada propriedade injetada anteriormente
    properties.forEach(prop => root.removeProperty(prop));
  }

  // Listener para o Toggle Switch
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      // Se checked = true, ativa modo claro. Caso contrário, reseta para escuro.
      if (this.checked) {
        setLightMode();
      } else {
        setDarkMode();
      }
    });
  }

});