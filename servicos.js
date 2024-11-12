let trilho = document.getElementById('trilho');
let body = document.querySelector('body');
let texto = document.getElementsByClassName('texto');
let carousel_slide = document.getElementsByClassName('carousel__slide');
let img_destaque_servicos = document.getElementById('img_destaque_servicos'); // Corrigido
let faq_container = document.getElementsByClassName('faq_container');

trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark');
  body.classList.toggle('dark');
  img_destaque_servicos.classList.toggle('dark'); // Aplicando a classe no elemento correto

  // Iterar pela coleção de elementos com a classe 'texto'
  for (let i = 0; i < texto.length; i++) {
    texto[i].classList.toggle('dark');
  }
  
  // Iterar pela coleção de elementos com a classe 'carousel__slide'
  for (let i = 0; i < carousel_slide.length; i++) {
    carousel_slide[i].classList.toggle('dark');
  }

  // Iterar pela coleção de elementos com a classe 'faq-container'
  for (let i = 0; i < faq_container.length; i++) {
    faq_container[i].classList.toggle('dark');
  }
});

//Link telefone no header
  // Número do WhatsApp (inclua o código do país e DDD, ex: +55XXXXXXXXXXX)
  const phoneNumber = '+5519996204031';

  // Verifica se o usuário está em um dispositivo móvel ou desktop
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // URL para WhatsApp sem texto
  const whatsappUrl = isMobile 
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}` // Mobile
      : `https://web.whatsapp.com/send?phone=${phoneNumber}`; // Desktop

  // Atualiza o link do WhatsApp
  document.getElementById('whatsapp-link').setAttribute('href', whatsappUrl);