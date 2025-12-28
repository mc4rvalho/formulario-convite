/**
 * main.js
 * Script de controle de interatividade para o formulário de convite.
 * * Funcionalidades principais:
 * 1. Gerenciamento de Cores: Captura a cor selecionada e aplica globalmente via variáveis CSS.
 * 2. Gerenciamento de Tema Visual: Altera o background da página baseado na imagem do tema.
 * 3. Controle de Modo Claro/Escuro: Alterna paletas de cores manipulando variáveis no :root.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. GERENCIAMENTO DA COR PRINCIPAL (COLOR PICKER)
     ========================================================================== */

  // Seleciona todos os inputs do tipo radio dentro do container de cores
  const colorInputs = document.querySelectorAll('.color-picker input[type="radio"]');

  colorInputs.forEach(input => {
    input.addEventListener('change', function () {
      if (this.checked) {
        // Utilizamos getComputedStyle(this) em vez de this.style.
        // Isso garante que o valor da variável '--color' seja lido corretamente,
        // independentemente se foi definido via atributo 'style' inline ou em arquivo CSS externo.
        const computedStyle = getComputedStyle(this);
        
        // .trim() remove espaços em branco acidentais que poderiam invalidar a cor no CSS
        const newColor = computedStyle.getPropertyValue('--color').trim();

        // Validação de segurança: só aplica se uma cor válida for encontrada
        if (newColor) {
          // Aplica a nova cor na variável global --brand-light do elemento <html> (:root).
          // Isso reflete a mudança instantaneamente em todos os elementos que usam essa variável.
          document.documentElement.style.setProperty('--brand-light', newColor);
        }
      }
    });
  });


  /* ==========================================================================
     2. GERENCIAMENTO DO TEMA (BACKGROUND IMAGE)
     ========================================================================== */

  const themeInputs = document.querySelectorAll('.theme-item input[type="radio"]');
  const body = document.body; // Referência ao elemento <body> para aplicação do fundo

  themeInputs.forEach(input => {
    input.addEventListener('change', function () {
      if (this.checked) {
        // Navegação DOM: O input radio está posicionado antes do label no HTML.
        // Acessamos o próximo elemento irmão (label) para encontrar a tag <img> interna.
        const label = this.nextElementSibling;
        const img = label.querySelector('img');

        if (img) {
          const imgSrc = img.src;

          // Construção do Background:
          // 1. linear-gradient: Cria uma camada escura (overlay) com 85% de opacidade
          //    para garantir contraste suficiente para leitura dos textos brancos.
          // 2. url(): Define a imagem do tema selecionado.
          body.style.backgroundImage = `
            linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), 
            url(${imgSrc})
          `;

          // Propriedades para garantir visualização correta em qualquer tamanho de tela
          body.style.backgroundSize = 'cover';       // Preenche todo o viewport
          body.style.backgroundAttachment = 'fixed'; // Efeito parallax (imagem fixa ao rolar)
          body.style.backgroundPosition = 'center';  // Centraliza o ponto focal da imagem
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
   * Ativa o Modo Claro (Light Mode).
   * Estratégia: Injeta valores de cores claras nas variáveis CSS globais via estilo inline.
   * Isso sobrescreve os valores padrões definidos no arquivo CSS.
   */
  function setLightMode() {
    const root = document.documentElement.style;

    // Paleta de Cores Claras
    root.setProperty('--shape-body', '#F8FAFC');       // Fundo da página (Cinza Gelo)
    root.setProperty('--shape-button', '#E2E8F0');     // Elementos de UI (Cinza Claro)
    root.setProperty('--shape-hover', '#CBD5E1');      // Estado de hover

    // Inputs e Formulários
    root.setProperty('--input-base', '#FFFFFF');       // Fundo branco
    root.setProperty('--input-stroke', '#94A3B8');     // Bordas mais visíveis
    root.setProperty('--input-placeholder', '#64748B');// Texto de ajuda

    // Tipografia
    root.setProperty('--color-heading', '#0F172A');    // Títulos (Preto Azulado)
    root.setProperty('--color-body', '#334155');       // Texto (Cinza Escuro)
  }

  /**
   * Restaura o Modo Escuro (Dark Mode - Padrão).
   * Estratégia: Remove as propriedades inline injetadas no elemento <html>.
   * Ao remover, o navegador volta a ler os valores originais do arquivo index.css (Dark Mode).
   */
  function setDarkMode() {
    const root = document.documentElement.style;

    // Lista de variáveis manipuladas que precisam ser resetadas
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

    // Limpeza das propriedades inline
    properties.forEach(prop => root.removeProperty(prop));
  }

  // Listener de evento para o Switch
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      // Se checked (ativo) = Modo Claro
      // Se unchecked (inativo) = Modo Escuro
      if (this.checked) {
        setLightMode();
      } else {
        setDarkMode();
      }
    });
  }

});