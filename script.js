// ===== script.js =====

// Variáveis globais para o carrossel
let imagemAtual = 0;
let imagensAtuais = [];

// Função para mudar imagem do carrossel
function mudarImagem(direcao) {
  if (!imagensAtuais.length) return;
  imagensAtuais[imagemAtual].style.display = 'none';
  imagemAtual = (imagemAtual + direcao + imagensAtuais.length) % imagensAtuais.length;
  imagensAtuais[imagemAtual].style.display = 'block';
}

// Função para mostrar os detalhes do veículo
function mostrarDetalhes(veiculo) {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');

  const imagensHtml = veiculo.imagens
    .map((img, index) => `
      <img src="${img}" class="img-detalhe" style="display:${index === 0 ? 'block' : 'none'}">
    `)
    .join('');

  const mensagem = encodeURIComponent(`Olá! Tenho interesse no veículo ${veiculo.marca} ${veiculo.modelo} (${veiculo.ano}).`);
  const linkWhatsApp = `https://wa.me/message/4KDYLFSY74OGJ1?text=${mensagem}`;

  modalContent.innerHTML = `
    <span class="fechar" onclick="fecharModal()">&times;</span>
    <div class="carrossel">
      ${imagensHtml}
      <button class="btn-anterior" onclick="mudarImagem(-1)">&#10094;</button>
      <button class="btn-proximo" onclick="mudarImagem(1)">&#10095;</button>
    </div>
    <h2>${veiculo.marca} ${veiculo.modelo} (${veiculo.ano})</h2>
    <p class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</p>
    <p class="descricao">${veiculo.descricao}</p>
    <a href="${linkWhatsApp}" target="_blank" class="btn-whatsapp">
      💬 Tenho Interesse via WhatsApp
    </a>
  `;

  modal.style.display = 'flex';
  imagemAtual = 0;
  imagensAtuais = modalContent.querySelectorAll('.img-detalhe');
}

// Fechar modal
function fecharModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// =============================
// Início principal
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const veiculos = [
    {
      id: 1,
      marca: 'Audi',
      modelo: 'Q5 Sportback',
      ano: 2024,
      preco: 500000,
      imagens: [
        './Carros/Q5/Q5.png',
        './Carros/Q5/Captura de tela 2025-11-09 095805.png'
      ],
      descricao: `Motorização Híbrida Plug-in (PHEV)
Acabamento de painel em Black Piano
Banco em couro Branco com ajuste elétrico
Multimídia com espelhamento de celular
Possui todos sensores de segurança como:
- Sensor de frenagem emergencial
- Sensor de pista
- Sensor de estacionamento frontal e traseiro
- Alerta de colisão
- Controle de tração e estabilidade
- Alerta de ponto cego
Pneus novos
Carro impecável, sem detalhes.
Possui manual e chave reserva.
Vistoria cautelar Aprovada 100%.`
    },
    {
      id: 2,
      marca: 'Honda',
      modelo: 'HRV EX 1.8',
      ano: 2021,
      preco: 200000,
      imagens: ['./Carros/HRV/HVR.png'],
      descricao: `Controle de tração e estabilidade.
Banco de couro.
Sensor de ré.`
    },
    {
      id: 3,
      marca: 'Chevrolet',
      modelo: 'Cruze Premiere Turbo',
      ano: 2020,
      preco: 250000,
      imagens: ['./Carros/Chevrolet/Cruze/Captura de tela 2025-11-09 094738.png'],
      descricao: 'Cautelar 100% Aprovada. Completo, sem detalhes.'
    },
    {
      id: 4,
      marca: 'Volkswagen',
      modelo: 'Jetta TSI 2.0T',
      ano: 2013,
      preco: 250000,
      imagens: ['./Carros/VW/Jetta/Jetta.png'],
      descricao: 'Teto solar, Bancos de couro caramelo, Revisões em dia.'
    },
    {
      id: 5,
      marca: 'Nissan',
      modelo: 'Frontier Platinum',
      ano: 2023,
      preco: 350000,
      imagens: ['./Carros/Nissan/Frontier/Frontier.png'],
      descricao: 'Vendida.'
    }
  ];

  const lista = document.getElementById('listaVeiculos');
  const modal = document.getElementById('modal');

  // Renderizar lista de veículos
  function renderVeiculos() {
    lista.innerHTML = '';
    veiculos.forEach(v => {
      const card = document.createElement('div');
      card.className = 'veiculo';
      card.innerHTML = `
        <img src="${v.imagens[0]}" alt="${v.modelo}">
        <div class="info">
          <h3>${v.marca} ${v.modelo}</h3>
          <p>Ano: ${v.ano}</p>
          <p class="preco">R$ ${v.preco.toLocaleString('pt-BR')}</p>
          <button onclick="abrirModal(${v.id})">Ver Detalhes</button>
        </div>
      `;
      lista.appendChild(card);
    });
  }

  window.abrirModal = (id) => {
    const veiculo = veiculos.find(v => v.id === id);
    mostrarDetalhes(veiculo);
  };

  window.onclick = e => {
    if (e.target === modal) fecharModal();
  };

  renderVeiculos();
});
