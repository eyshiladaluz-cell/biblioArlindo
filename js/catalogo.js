const campoTermo = document.getElementById('termo');
const botaoBuscar = document.getElementById('buscar');
const botaoLimpar = document.getElementById('limpar');
const listaLivros = document.getElementById('lista-livros');
const mensagem = document.getElementById('mensagem');

// Protege os textos antes de colocá-los no HTML.
function seguro(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, caractere => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[caractere]));
}

// Busca os livros no banco de dados.
async function carregarCatalogo(termo = '') {
  mensagem.textContent = 'Buscando livros...';
  listaLivros.innerHTML = '';

  const { data, error } = await db.rpc(
    'catalogo_publico',
    {
      p_termo: termo
    }
  );

  if (error) {
    mensagem.textContent =
      'Não foi possível carregar o catálogo: ' + error.message;
    return;
  }

  if (!data || data.length === 0) {
    mensagem.textContent = 'Nenhum livro encontrado.';
    return;
  }

  mensagem.textContent =
    data.length + ' livro(s) encontrado(s).';

  // Cria um cartão para cada livro.
  data.forEach(livro => {
    const cartao = document.createElement('article');

    cartao.className = 'cartao';

    cartao.innerHTML = `
      <h3>${seguro(livro.title)}</h3>

      <p>
        <strong>Autor:</strong>
        ${seguro(livro.author_name)}
      </p>

      <p>
        <strong>Assunto:</strong>
        ${seguro(livro.subject_name)}
      </p>

      <p>${seguro(livro.description)}</p>

      <p>
        <strong>Ano:</strong>
        ${seguro(livro.publication_year || 'Não informado')}
      </p>

      <p>
        <strong>Disponíveis:</strong>
        ${Number(livro.available_copies)}
      </p>

      <p>
        <strong>Total no acervo:</strong>
        ${Number(livro.total_copies)}
      </p>
    `;

    listaLivros.appendChild(cartao);
  });
}

// Botão Buscar.
botaoBuscar.addEventListener('click', () => {
  carregarCatalogo(campoTermo.value.trim());
});

// Botão Limpar.
botaoLimpar.addEventListener('click', () => {
  campoTermo.value = '';
  carregarCatalogo();
});

// Permite pesquisar usando Enter.
campoTermo.addEventListener('keydown', evento => {
  if (evento.key === 'Enter') {
    carregarCatalogo(campoTermo.value.trim());
  }
});

// Carrega todos os livros quando a página abre.
carregarCatalogo();