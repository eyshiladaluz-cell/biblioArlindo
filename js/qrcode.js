const campoEndereco = document.getElementById('endereco');
const areaCodigo = document.getElementById('codigo');

let gerador = null;

document.getElementById('gerar').addEventListener('click', () => {
  const endereco = campoEndereco.value.trim();

  // Verifica se o endereço é válido e utiliza HTTPS.
  let url;

  try {
    url = new URL(endereco);
  } catch {
    alert('Digite um endereço válido.');
    return;
  }

  if (url.protocol !== 'https:') {
    alert('O endereço precisa começar com https://');
    return;
  }

  // O QR Code deve abrir o catálogo público.
  if (
    url.pathname.endsWith('/login.html') ||
    url.pathname.endsWith('/admin.html') ||
    url.pathname.endsWith('/qrcode.html')
  ) {
    alert('Use o endereço do catálogo público, não o endereço administrativo.');
    return;
  }

  // Limpa o código anterior.
  areaCodigo.innerHTML = '';

  gerador = new QRCode(areaCodigo, {
    text: url.href,
    width: 260,
    height: 260,
    correctLevel: QRCode.CorrectLevel.H
  });
});

document.getElementById('baixar').addEventListener('click', () => {
  const canvas = areaCodigo.querySelector('canvas');
  const imagem = areaCodigo.querySelector('img');

  let enderecoImagem = '';

  if (canvas) {
    enderecoImagem = canvas.toDataURL('image/png');
  } else if (imagem) {
    enderecoImagem = imagem.src;
  } else {
    alert('Gere o QR Code primeiro.');
    return;
  }

  const link = document.createElement('a');
  link.href = enderecoImagem;
  link.download = 'qrcode-biblioArlindo.png';
  link.click();
});