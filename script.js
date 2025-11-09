// ===== script.js ===== //
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
  const imagensHtml = veiculo.imagens.map(
    (img, index) =>
      `<img src="${img}" class="img-detalhe" style="display:${index === 0 ? 'block' : 'none'};" alt="Foto do veículo">`
  ).join('');
  const mensagem = encodeURIComponent(`Olá! Tenho interesse no veículo ${veiculo.marca} ${veiculo.modelo} (${veiculo.ano}).`);
  const linkWhatsApp = `https://wa.me/message/4KDYLFSY74OGJ1?text=${mensagem}`;
  modalContent.innerHTML = `
    <span id="fecharModal" class="fechar">&times;</span>
    <h2>${veiculo.marca} ${veiculo.modelo}</h2>
    <div class="carrossel" style="position: relative;">
      ${imagensHtml}
      <button class="btn-anterior" style="left: 10px; position:absolute;">&#8592;</button>
      <button class="btn-proximo" style="right: 10px; position:absolute;">&#8594;</button>
    </div>
    <p>${veiculo.descricao}</p>
    <p class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</p>
    <a href="${linkWhatsApp}" target="_blank" id="interesseWhatsApp" class="btn">💬 Tenho Interesse via WhatsApp</a>
  `;
  modal.style.display = 'flex';
  modal.classList.remove('oculto');
  imagemAtual = 0;
  imagensAtuais = modalContent.querySelectorAll('.img-detalhe');

  // Garante navegação do carrossel
  modalContent.querySelector('.btn-anterior').onclick = () => mudarImagem(-1);
  modalContent.querySelector('.btn-proximo').onclick = () => mudarImagem(1);

  // Fechar modal (botão)
  modalContent.querySelector('#fecharModal').onclick = fecharModal;
}

// Fechar modal
function fecharModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  modal.classList.add('oculto');
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
      descricao: `Motorização Híbrida Plug-in (PHEV)<br>
      Acabamento de painel em Black Piano<br>
      Banco em couro Branco com ajuste elétrico<br>
      Multimídia com espelhamento de celular<br>
      Possui todos sensores de segurança como:<br>
      - Sensor de frenagem emergencial<br>
      - Sensor de pista<br>
      - Sensor de estacionamento frontal e traseiro<br>
      - Alerta de colisão<br>
      - Controle de tração e estabilidade<br>
      - Alerta de ponto cego<br>
      Pneus novos<br>
      Carro impecável, sem detalhes.<br>
      Possui manual e chave reserva.<br>
      Vistoria cautelar Aprovada 100%.`
    },
    {
      id: 2,
      marca: 'Honda',
      modelo: 'HRV EX 1.8',
      ano: 2021,
      preco: 200000,
      imagens: ['./Carros/HRV/HVR.png'],
      descricao: `Controle de tração e estabilidade.<br>
      Banco de couro.<br>
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
        <img src="${v.imagens[0]}" alt="Foto do veículo">
        <div class="info">
          <h3>${v.marca} ${v.modelo}</h3>
          <p>Ano: ${v.ano}</p>
          <p class="preco">R$ ${v.preco.toLocaleString('pt-BR')}</p>
          <button onclick="mostrarDetalhes(${JSON.stringify(v).replace(/"/g, '&quot;')})">Detalhes</button>
        </div>
      `;
      lista.appendChild(card);
    });
  }

  renderVeiculos();

  // Fecha modal ao clicar fora da área
  window.onclick = function(event) {
    if (event.target === modal) {
      fecharModal();
    }
  };

  // Sidebar de interesses responsiva para mobile
  const btnMostrar = document.getElementById('btnMostrarInteresses');
  const interesses = document.querySelector('.interesses');
  if (btnMostrar && interesses) {
    btnMostrar.addEventListener('click', () => {
      interesses.classList.toggle('hide');
    });
    window.addEventListener('click', function(e) {
      if (
        window.innerWidth <= 700 &&
        !interesses.contains(e.target) &&
        !btnMostrar.contains(e.target) &&
        !interesses.classList.contains('hide')
      ) {
        interesses.classList.add('hide');
      }
    });
  }
});

