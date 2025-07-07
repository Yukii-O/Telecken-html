// Função para colorir a segunda palavra do texto
function colorirTexto() {
    const span = document.querySelector('.letter');  // Seleciona o span com a classe 'letter'
    const texto = span.innerText;  // Obtém o texto do span
    const palavras = texto.split(' ');  // Divide o texto em palavras com base no espaço
    if (palavras.length > 1) {  // Verifica se existem pelo menos 2 palavras
      const segundaPalavra = palavras[1];  // Pega a segunda palavra
      let palavraColorida = '';  // Variável para armazenar a segunda palavra colorida
  
      // Loop para percorrer cada letra da segunda palavra e aplicar uma cor aleatória
      for (let i = 0; i < segundaPalavra.length; i++) {
        const corAleatoria = getCorAleatoria();  // Função para gerar uma cor aleatória
        palavraColorida += `<span style="color: ${corAleatoria};">${segundaPalavra[i]}</span>`;
      }
  
      // Substitui a segunda palavra pela versão colorida
      palavras[1] = palavraColorida;
  
      // Junta as palavras de volta em uma string, com a segunda palavra colorida
      span.innerHTML = palavras.join(' ');
    }
  }
  
  // Função para gerar uma cor aleatória no formato RGB
  function getCorAleatoria() {
    const r = Math.floor(Math.random() * 256);  // Gera valor aleatório para o vermelho
    const g = Math.floor(Math.random() * 256);  // Gera valor aleatório para o verde
    const b = Math.floor(Math.random() * 256);  // Gera valor aleatório para o azul
    return `rgb(${r}, ${g}, ${b})`;  // Retorna a cor no formato RGB
  }
  
  // Chama a função colorirTexto quando a página carregar
  window.onload = function() {
    colorirTexto();  // Aplica a coloração na segunda palavra assim que a página for carregada
  };
  