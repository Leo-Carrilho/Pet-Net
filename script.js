// barra verde que indica o quanto o site ja foi visto
window.addEventListener('scroll', function() {
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    const percentScrolled = (scrollPosition / totalHeight) * 100;
    progressBar.style.width = percentScrolled + '%';
});

// animação do carrosel
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.style.display = nav.style.display === 'none' || nav.style.display === '' ? 'block' : 'none';
}

// animação do texto da esquerda para a direita
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elPosition = el.getBoundingClientRect().top;

        if (elPosition < windowHeight) {
            el.classList.add('visible');
        }
    });
});

// botao voltar para cima
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.onscroll = function() {
    const botao = document.getElementById('botao_voltar_para_cima');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        botao.style.display = 'block'; // Mostra o botão
    } else {
        botao.style.display = 'none'; // Esconde o botão
    }
};


// Perguntas frequentes 
const questions = document.querySelectorAll('.faq-question');
  questions.forEach(question => {
    question.addEventListener('click', () => {
      question.classList.toggle('active');
      question.nextElementSibling.classList.toggle('active');
    });
});


// Seleciona o contêiner das imagens
const imagesContainer = document.querySelector('.ajustar_imagens_servicos');

// Cria um Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Adiciona a classe que inicia a animação quando o contêiner entra na tela
      entry.target.classList.add('img-visible');
      
      // Desconecta o observer para que a animação não ocorra mais de uma vez
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); // Ativa a animação quando 10% do contêiner estiver visível

// Inicia o observer para o contêiner das imagens
observer.observe(imagesContainer);