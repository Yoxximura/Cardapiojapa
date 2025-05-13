// Lista de pratos do cardápio
const menu = [
  {
    nome: "Hot roll",
    descricao: "Arroz, salmão grelhado, cream cheese, cebolinha, gergelim.",
    preco: 32,
    imagem: "hotroll.jpg" //imagem local
  },
  {
    nome: "Temaki salmão grelhado",
    descricao: "Arroz, salmão grelhado, cream cheese, cebolinha, gergelim. ",
    preco: 32,
    imagem: "temakigrelhado.jpg" //imagem local
  },
  {
    nome: "Temaki salmão cru",
    descricao: "Arroz, salmão cru, cream cheese, cabolinha, gergelim",
    preco: 32,
    imagem: "temakicru.jpg"  //imagem local
  },
  {
    nome: "Combinado 1",
    descricao: "",
    preco: 45,
    imagem: ""
  },
  {
    nome: "Combinado 2",
    descricao: "",
    preco: 45,
    imagem: ""
  },
  {
    nome: "Combinado 3",
    descricao: "",
    preco: 45,
    imagem: ""
  },

];

const container = document.getElementById("menu-container");
const carrinho = [];

menu.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.imagem}" alt="${item.nome}">
    <div class="card-content">
      <h3>${item.nome}</h3>
      <p>${item.descricao}</p>
      <strong>R$ ${item.preco.toFixed(2)}</strong><br>
      <label>Qtd:
        <input type="number" min="1" max="20" value="1" id="qtd-${index}">
      </label>
      <button onclick="adicionarPedido(${index})">Adicionar ao pedido</button>
    </div>
  `;

  container.appendChild(card);
});

// Cria seção de resumo do pedido
const resumo = document.createElement("div");
resumo.id = "resumo";
resumo.innerHTML = "<h2>Resumo do Pedido</h2><p>Nenhum item adicionado ainda.</p>";
document.body.appendChild(resumo);

function adicionarPedido(index) {
  const item = menu[index];
  const qtd = parseInt(document.getElementById(`qtd-${index}`).value);

  if (isNaN(qtd) || qtd < 1 || qtd > 20) {
    alert("Quantidade inválida. Insira um valor entre 1 e 20");
    return;
  }

  carrinho.push({ nome: item.nome, preco: item.preco, quantidade: qtd });
  atualizarResumo();
}

function atualizarResumo() {
  if (carrinho.length === 0) {
    resumo.innerHTML = "<h2>Resumo do Pedido</h2><p>Nenhum item adicionado ainda.</p>";
    return;
  }

  let html = "<h2>Resumo do Pedido</h2><ul>";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    html += `
      <li>
        ${item.quantidade}x ${item.nome} – R$ ${subtotal.toFixed(2)}
        <button onclick="removerItem(${index})" style="margin-left: 10px;">❌</button>
      </li>`;
    total += subtotal;
  });

  html += `</ul><p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
  html += `<button onclick="finalizarPedido()">Finalizar Pedido</button>`;
  resumo.innerHTML = html;
}

function finalizarPedido() {
  if (carrinho.length === 0) return;

  document.getElementById("pedido-modal").classList.remove("hidden");
}

function removerItem(index) {
  carrinho.splice(index, 1); // Remove o item pelo índice
  atualizarResumo(); // Atualiza o resumo
}

function fecharModal() {
  document.getElementById("pedido-modal").classList.add("hidden");
}

function confirmarPedido() {
  const nome = document.getElementById("nome-cliente").value.trim();

  if (!nome) {
    alert("Por favor, preencha seu nome.");
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let mensagem = `🧾 *Pedido de ${nome}*\n\n`;
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    mensagem += `🍽️ ${item.quantidade}x ${item.nome} — R$ ${subtotal.toFixed(2)}\n`;
    total += subtotal;
  });

  mensagem += `\n💰 *Total:* R$ ${total.toFixed(2)}`;
  mensagem += `\n\n✅ Pedido gerado via cardápio digital. Um atendente já irá lhe atender. 😉`;

  const telefone = "5515991669521";
  const texto = encodeURIComponent(mensagem);
  const linkZap = `https://wa.me/${telefone}?text=${texto}`;

  window.open(linkZap, "_blank");

  // Limpa o carrinho após enviar
  carrinho.length = 0;
  atualizarResumo();
  fecharModal();
}

const imagens = [
  'hotroll.jpg',
  'temakigrelhado.jpg',
  'temakicru.jpg'
]; // Adiciona as imagens para gerar a transição de imagem na tela de fundo

let index = 0;
let ativo = true;

const fundo1 = document.getElementById("fundo1");
const fundo2 = document.getElementById("fundo2");

// Define a primeira imagem
fundo1.style.backgroundImage = `url('${imagens[0]}')`;

function trocarFundo() {
  index = (index + 1) % imagens.length;
  const novaImagem = `url('${imagens[index]}')`;

  if (ativo) {
    fundo2.style.backgroundImage = novaImagem;
    fundo2.style.opacity = 1;
    fundo1.style.opacity = 0;
  } else {
    fundo1.style.backgroundImage = novaImagem;
    fundo1.style.opacity = 1;
    fundo2.style.opacity = 0;
  }

  ativo = !ativo;
}

setInterval(trocarFundo, 4000); // troca a cada 4 segundos