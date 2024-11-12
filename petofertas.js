// modo claro e modo escuro
let trilho = document.getElementById('trilho');
let body = document.querySelector('body');
let texto = document.getElementsByClassName('texto');
let carousel_slide = document.getElementsByClassName('carousel__slide');
let marquee = document.getElementsByClassName('marquee');
let borda_branca_agendar = document.getElementById('borda_branca_agendar');
let svg = document.querySelector('svg');
let iconcasa = document.getElementById('iconcasa');

trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark');
  body.classList.toggle('dark');
  borda_branca_agendar.classList.toggle('dark');
  svg.classList.toggle('dark');
  iconcasa.classList.toggle('dark');

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


// aba de carrinho de compras
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');

// Adicione evento de clique ao ícone do carrinho
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart'); // Alterna a classe showCart no body
});

// Adicione evento de clique ao botão de fechar
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart'); // Remove a classe showCart no body
});

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
