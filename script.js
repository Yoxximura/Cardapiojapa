// Lista de pratos do cardápio
const menu = [
  {
    nome: "Hot roll",
    descricao: "Arroz, salmão grelado, cream chesse, cebolinha, gergelim.",
    preco: 32,
    imagem: "hotroll.jpg" //imagem local
  },
  {
    nome: "Temaki grelhado",
    descricao: "Arroz, alga 'nori', salmão grelhado, cream chesse, cebolinha, gergelim. ",
    preco: 32,
    imagem: "temakigrelhado.jpg" //imagem local
}
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
        <input type="number" min="1" value="1" id="qtd-${index}">
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

  if (qtd <= 0 || isNaN(qtd)) return;

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

  if (nome === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let mensagem = `🧾 Pedido de ${nome}:\n\n`;
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    mensagem += `${item.quantidade}x ${item.nome} – R$ ${subtotal.toFixed(2)}\n`;
    total += subtotal;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\nPedido confirmado! Obrigado!`;

    // ENVIAR VIA WHATSAPP
  const telefone = "5515991669521"; // Substitua pelo número do restaurante
  const textoCodificado = encodeURIComponent(mensagem);
  const linkZap = `https://wa.me/${telefone}?text=${textoCodificado}`;
  
  alert(mensagem);

  // Limpa
  carrinho.length = 0;
  atualizarResumo();
  fecharModal();
}