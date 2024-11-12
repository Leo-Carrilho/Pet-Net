// modo claro e modo escuro
let trilho = document.getElementById('trilho');
let body = document.querySelector('body');
let texto = document.getElementsByClassName('texto');
let carousel_slide = document.getElementsByClassName('carousel__slide');
let marquee = document.getElementsByClassName('marquee');
let borda_branca_agendar = document.getElementById('borda_branca_agendar');
let svg = document.querySelector('svg');

trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark');
  body.classList.toggle('dark');
  borda_branca_agendar.classList.toggle('dark');
  svg.classList.toggle('dark')

  // Iterar pela coleção de elementos com a classe 'texto'
  for (let i = 0; i < texto.length; i++) {
    texto[i].classList.toggle('dark');
  }
  
  // Iterar pela coleção de elementos com a classe 'carousel__slide'
  for (let i = 0; i < carousel_slide.length; i++) {
    carousel_slide[i].classList.toggle('dark');
  }

  for (let i = 0; i < marquee.length; i++) {
    marquee[i].classList.toggle('dark');
  }
});

// animação do carrosel embaixo do header
var radio = document.querySelector('.manual-btn')
var cont = 1
document.getElementById('radio1').checked = true
setInterval(() => {
  proximaImg()
}, 5000)

function proximaImg(){
  cont++
  if(cont > 3) {
    cont = 1
  }

  document.getElementById('radio' + cont).checked = true
}

// animação das marcas que trabalhamos
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// mais vendidos
const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    items[currentItem].classList.add("current-item");
  });
});

// aba de carrinho de compras
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close')
let listProductHTML = document.querySelector('.listCart');
let listCartHTML = document.querySelector('.listCart')
let iconCartSpan = document.querySelector('.icon-cart span')

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart')
})


let cartItems = [];

// Função para adicionar item ao carrinho
document.querySelectorAll('.addCart').forEach(function(button) {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Evita comportamento padrão do link

    // Captura as informações do produto
    const productElement = this.closest('.gallery');
    const productImg = productElement.querySelector('img').src;
    const productName = productElement.querySelector('.titulo_mais_vendidos').innerText;
    const productPrice = productElement.querySelector('.preco').innerText;

    // Verifica se o item já está no carrinho
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity += 1; // Aumenta a quantidade se o item já existir
    } else {
      // Adiciona o produto ao carrinho (array)
      cartItems.push({
        img: productImg,
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }

    // Atualiza a quantidade de itens no ícone do carrinho
    const cartIcon = document.querySelector('.icon-cart span');
    cartIcon.innerText = cartItems.length;

    // Verifica se há itens no carrinho e ajusta a visibilidade do ícone
    if (cartItems.length > 0) {
      cartIcon.classList.add('show'); // Mostra o ícone se houver itens
    } else {
      cartIcon.classList.remove('show'); // Esconde o ícone se não houver itens
    }

    // Atualiza a interface do carrinho
    updateCart();
  });
});

// Função para atualizar o carrinho na interface
function updateCart() {
  const cartList = document.querySelector('.listCart');
  cartList.innerHTML = ''; // Limpa o carrinho antes de adicionar novamente

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('item');
    cartItem.innerHTML = `
      <div class="image"><img src="${item.img}" alt=""></div>
      <div class="name">${item.name}</div>
      <div class="totalPrice">${item.price}</div>
      <div class="quantity">
        <span class="minus" data-index="${index}">-</span>
        <span>${item.quantity}</span>
        <span class="plus" data-index="${index}">+</span>
      </div>
    `;
    cartList.appendChild(cartItem);
  });

  // Adiciona eventos de clique para as setas de aumentar e diminuir
  document.querySelectorAll('.plus').forEach(function(plusButton) {
    plusButton.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      cartItems[index].quantity += 1; // Aumenta a quantidade
      updateCart(); // Atualiza o carrinho
    });
  });

  document.querySelectorAll('.minus').forEach(function(minusButton) {
    minusButton.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1; // Diminui a quantidade, se maior que 1
      } else {
        cartItems.splice(index, 1); // Remove o item se a quantidade for 1
      }

      // Verifica se há itens no carrinho e ajusta a visibilidade do ícone
      const cartIcon = document.querySelector('.icon-cart span');
      cartIcon.innerText = cartItems.length;
      if (cartItems.length > 0) {
        cartIcon.classList.add('show'); // Mostra o ícone se houver itens
      } else {
        cartIcon.classList.remove('show'); // Esconde o ícone se não houver itens
      }

      updateCart(); // Atualiza o carrinho
    });
  });
}

// Finalizar Compra: Redirecionar para o WhatsApp com os itens do carrinho
document.querySelector('.checkout').addEventListener('click', function() {
  if (cartItems.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  // Número do WhatsApp (inclua o código do país e DDD, ex: +55XXXXXXXXXXX)
  const phoneNumber = '+5519996204031';

  // Montar a mensagem com os itens do carrinho
  let message = 'Olá! Gostaria de finalizar a compra com os seguintes produtos:\n\n';
  cartItems.forEach(item => {
    message += `*Produto*: ${item.name}\n*Preço*: ${item.price}\n*Quantidade*: ${item.quantity}\n*Imagem*: ${item.img}\n\n`; // Inclui o link da imagem
  });

  // Verifica se o usuário está em um dispositivo móvel ou desktop
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // URL codificada para WhatsApp (mobile ou web)
  const whatsappUrl = isMobile 
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}` // Mobile
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`; // Desktop

  // Redirecionar para o WhatsApp
  window.location.href = whatsappUrl;
});

// Mostrar/Esconder o carrinho
document.querySelector('.icon-cart').addEventListener('click', function() {
  document.querySelector('.cartTab').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
  document.querySelector('.cartTab').style.display = 'none';
});


// qual a melhor raça 
document.getElementById('enviar-pedido').addEventListener('click', function(event) {
  event.preventDefault(); // Impede o comportamento padrão do link

  // Captura as seleções dos inputs tipo "radio"
  const caracteristicaEmocional = document.querySelector('input[name="caracteristica-emocional"]:checked');
  const deficiencia = document.querySelector('input[name="deficiencia"]:checked');
  const espaco = document.querySelector('input[name="espaco"]:checked');

  // Verifica se todas as opções foram preenchidas
  if (!caracteristicaEmocional || !deficiencia || !espaco) {
    alert('Por favor, preencha todas as opções.');
    return;
  }

  // Inicializa as variáveis para mensagem e imagem
  let mensagem = '';
  let imagemSrc = '';

  // Lógica para determinar a melhor raça de cachorro
  if (deficiencia.value === 'sim') {
    mensagem = 'Um Golden Retriever pode ser uma ótima escolha para você. Eles são ótimos cães-guia.';
    imagemSrc = 'imagens/golden-retriever.jpg'; // Altere para o caminho correto
  } else if (caracteristicaEmocional.value === 'calmo') {
    mensagem = 'Baseado no seu perfil calmo, um Buldogue Inglês seria uma ótima escolha.';
    imagemSrc = 'imagens/buldog_ingles.jpg'; // Altere para o caminho correto
  } else if (caracteristicaEmocional.value === 'ativo' && espaco.value === 'muito') {
    mensagem = 'Você tem bastante espaço e é ativo, um Labrador Retriever seria ideal para você.';
    imagemSrc = 'imagens/Labrador_Retriever.jpg'; // Altere para o caminho correto
  } else if (caracteristicaEmocional.value === 'irrita') {
    mensagem = 'Para quem se irrita facilmente, um Shih Tzu pode ser uma boa escolha.';
    imagemSrc = 'imagens/shitzu.jpg'; // Altere para o caminho correto
  } else {
    mensagem = 'Um Poodle seria uma ótima companhia para você.';
    imagemSrc = 'imagens/podle.jpg'; // Altere para o caminho correto
  }

  // Exibe a mensagem e a imagem após o envio
  const mensagemElement = document.getElementById('mensagem');
  mensagemElement.innerText = mensagem;
  mensagemElement.style.display = 'block'; // Exibe o texto

  const imagemAnimal = document.getElementById('imagem-animal');
  imagemAnimal.src = imagemSrc;
  imagemAnimal.style.display = 'block'; // Exibe a imagem

  const resultado = document.getElementById('resultado');
  resultado.style.display = 'block'; // Mostra o resultado

  // Aumenta a altura da div de fundo cinza para acomodar o conteúdo extra
  const entrarEmContato = document.getElementById('entrar_em_contato');
  entrarEmContato.style.paddingBottom = '50px'; // Adiciona mais espaço para imagem e texto
});