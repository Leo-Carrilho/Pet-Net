document.getElementById("dogForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Limpa o container de imagens para evitar adições duplicadas
    document.getElementById("imagesContainer").innerHTML = "";

    const raca = document.getElementById("raca_cao").value;
    const idade = parseInt(document.getElementById("idade").value);
    let recomendacao = "";
    let fase = "";

    // Determinando a fase da vida e a recomendação com base na idade
    if (idade >= 0 && idade <= 5) {
        fase = "Filhote (0 a 5 ano(s))";
        recomendacao = "Ração para filhotes, rica em nutrientes para o crescimento.";
    } else if (idade >= 6 && idade <= 12) {
        fase = "Adulto jovem (6 a 12 anos)";
        recomendacao = "Ração para adultos, balanceada para manter a energia e saúde.";
    } else {
        fase = "Idade fora do intervalo";
        recomendacao = "Recomendação não disponível.";
    }

   

    // Limpar conteúdo anterior
    const resultDiv = document.getElementById("result");
const imagesContainer = document.getElementById("imagesContainer");

    // Mapeamento de rações de acordo com a raça e idade
    const racoes = {
        "bulldog-ingles": { "0-5": "Royal Canin Bulldog Adulto", "6-12": "Royal Canin Medium Adult" },
        "bulldog-frances": { "0-5": "Royal Canin French Bulldog Adult", "6-12": "Hill's Science Diet Light Adult" },
        "beagle": { "0-5": "Purina Pro Plan Small Breed", "6-12": "Hill's Science Diet Adulto Cães Médios" },
        "border-collie": { "0-5": "Premier Raças Específicas Border Collie", "6-12": "Royal Canin Maxi Adult" },
        "chihuahua": { "0-5": "Royal Canin Chihuahua Adult", "6-12": "Hill's Science Diet Light Adult" },
        "golden-retriever": { "0-5": "Hill's Science Diet Adulto Cães Médios", "6-12": "Royal Canin Golden Retriever Adult" },
        "labrador-retriever": { "0-5": "Premier Raças Específicas Labrador", "6-12": "Royal Canin Labrador Retriever Adult" },
        "poodle": { "0-5": "Royal Canin Poodle Adulto", "6-12": "Premier Ambientes Internos Poodle" },
        "rottweiler": { "0-5": "Royal Canin Rottweiler Adult", "6-12": "Premier Raças Específicas Rottweiler" },
        "shih-tzu": { "0-5": "Premier Shih Tzu Adulto", "6-12": "Royal Canin Shih Tzu Adult" },
        "yorkshire": { "0-5": "Royal Canin Yorkshire Adult", "6-12": "Hill's Science Diet Light Adult" },
        "dachshund": { "0-5": "Royal Canin Dachshund Adult", "6-12": "Premier Raças Específicas Dachshund" },
        "schnauzer": { "0-5": "Hill's Science Diet Adult Small & Mini", "6-12": "Royal Canin Schnauzer Adult" },
        "pitbull": { "0-5": "Premier Raças Específicas Pitbull", "6-12": "Royal Canin Maxi Adult" },
        "akita": { "0-5": "Royal Canin Maxi Adult", "6-12": "Hill's Science Diet Large Breed" },
        "maltes": { "0-5": "Royal Canin Maltese Adult", "6-12": "Premier Ambientes Internos Maltês" },
        "boxer": { "0-5": "Royal Canin Boxer Adult", "6-12": "Premier Raças Específicas Boxer" },
        "husky-siberiano": { "0-5": "Premier Raças Específicas Husky", "6-12": "Royal Canin Maxi Adult" },
        "cocker-spaniel": { "0-5": "Royal Canin Cocker Adult", "6-12": "Hill's Science Diet Adult Medium" },
        "pug": { "0-5": "Royal Canin Pug Adult", "6-12": "Premier Ambientes Internos Pug" },
        "dalmata": { "0-5": "Royal Canin Maxi Adult", "6-12": "Hill's Science Diet Adulto Cães Médios" },
        "boston-terrier": { "0-5": "Royal Canin Bulldog Francês Adult", "6-12": "Hill's Science Diet Light Adult" },
        "weimaraner": { "0-5": "Royal Canin Maxi Adult", "6-12": "Premier Raças Específicas Weimaraner" },
        "samoyed": { "0-5": "Royal Canin Maxi Adult", "6-12": "Hill's Science Diet Large Breed" },
        "doberman": { "0-5": "Royal Canin Doberman Adult", "6-12": "Premier Raças Específicas Doberman" }
    };

    // Mapeamento de rações para URLs de imagens
    const imagensDeRacas = { 
        "bulldog-ingles": "https://i.pinimg.com/originals/32/eb/41/32eb419833f25bc24732c8da29261f5b.jpg",
        "bulldog-frances": "https://th.bing.com/th/id/OIP.l7LW62m5qcz20LF1CtERtgHaFS?rs=1&pid=ImgDetMain",
        "beagle": "https://th.bing.com/th/id/OIP.aE2DaPPRSwuhWiVOaTQuvQHaEW?rs=1&pid=ImgDetMain",
        "border-collie": "https://th.bing.com/th/id/OIP.X9AiS7ogTf1ab2NkYmreEwHaE7?rs=1&pid=ImgDetMain",
        "chihuahua": "https://th.bing.com/th/id/OIP.yhBItwbs9R78a0eA98BMEQHaEo?rs=1&pid=ImgDetMain",
        "golden-retriever": "https://th.bing.com/th/id/R.9ef8cb37ff325e3cf8e0e2c08ba93583?rik=VCMV3sKZ6J%2bIqA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-AI2fhTCbWQ4%2fT26wCp9yk3I%2fAAAAAAAACTI%2f6O88_7A0txo%2fs1600%2fgolden-retriever-picture.jpg&ehk=o5AIwvcpHapUYotcpJR%2b5GFgvSl0QK6k3%2fOI2sE7OwM%3d&risl=&pid=ImgRaw&r=0",
        "labrador-retriever": "https://th.bing.com/th/id/OIP.g0p9GzecZBmWjsSYrsvt1AAAAA?rs=1&pid=ImgDetMain",
        "poodle": "https://th.bing.com/th/id/OIP.TyKyBJAMvajx-1E13nrqTwHaF7?rs=1&pid=ImgDetMain",
        "rottweiler": "https://th.bing.com/th/id/OIP.AazP6kEpK1bT1vJPoCDf2wHaE5?rs=1&pid=ImgDetMain",
        "shih-tzu": "https://th.bing.com/th/id/OIP.4ldscM77Gk_1-DKgcAZRqwHaFC?rs=1&pid=ImgDetMain",
        "yorkshire": "https://highlandcanine.com/wp-content/uploads/2021/05/yorkshire-terrier-sitting-on-decking.jpg",
        "dachshund": "https://th.bing.com/th/id/R.d38f254a1866691e297760f77715ab82?rik=IbbOu%2fRyFU4RaQ&riu=http%3a%2f%2fwww.dog-learn.com%2fdog-breeds%2fdachshund%2fimages%2fblack-and-tan-dachshund.jpg&ehk=zlBt9NANCKgV%2br5JTndelpPbdlZwisTFZ83mSAYoNnU%3d&risl=&pid=ImgRaw&r=0",
        "schnauzer": "https://th.bing.com/th/id/OIP.yFowNp2Buc3MRRhXsPCOpgHaEK?rs=1&pid=ImgDetMain",
        "pitbull": "https://th.bing.com/th/id/OIP.4g7SKXTM-4KqffYRH1KHiQHaFj?rs=1&pid=ImgDetMain",
        "akita": "https://th.bing.com/th/id/OIP.2RoBdDN6gRmnvnAo-mthkAHaE6?rs=1&pid=ImgDetMain",
        "maltes": "https://th.bing.com/th/id/OIP.FDpOB8rmgmyAr5_gHgCWygHaEc?rs=1&pid=ImgDetMain",
        "boxer": "https://th.bing.com/th/id/OIP.mLXNO9H_KXbGiZ5HjAyR_AHaEK?rs=1&pid=ImgDetMain",
        "husky-siberiano": "https://th.bing.com/th/id/OIP.cCzgrrjsa5J9LUM9IBrHDAHaFA?rs=1&pid=ImgDetMain",
        "cocker-spaniel": "https://th.bing.com/th/id/OIP.mYHqR4RUunQsVcpVZIj1TgHaEo?rs=1&pid=ImgDetMain",
        "pug": "https://th.bing.com/th/id/OIP.TtYeKwvMYaOB3nZyHq3WiQHaE8?rs=1&pid=ImgDetMain",
        "dalmata": "https://th.bing.com/th/id/OIP.dCPN6G5z-dfJ4bFcjJkwbAHaFH?rs=1&pid=ImgDetMain",
        "boston-terrier": "https://th.bing.com/th/id/OIP.m1Sk8MAIT6G-RHJm9Mf1DAHaFA?rs=1&pid=ImgDetMain",
        "weimaraner": "https://th.bing.com/th/id/OIP.eNS0L9BSMggVC9y5MSd7rQHaE8?rs=1&pid=ImgDetMain",
        "samoyed": "https://th.bing.com/th/id/OIP.R7-jJHtfhrz7SVBwE2c8HQHaE8?rs=1&pid=ImgDetMain",
        "doberman": "https://th.bing.com/th/id/OIP.Z_oMbJ0RVxww9IjXB2H_iwHaJQ?rs=1&pid=ImgDetMain"
    };

    // Faixa etária do cão
    let faixaEtaria = idade >= 0 && idade <= 5 ? "0-5" : idade >= 6 && idade <= 12 ? "6-12" : null;

    // Verificar se a faixa etária é válida
    if (!faixaEtaria) {
        resultDiv.innerHTML = `<p>Faixa etária inválida. Informe uma idade entre 1 e 6 anos.</p>`;
        return;
    }

    // Ração recomendada com base na raça e faixa etária
    let racaoRecomendada = racoes[raca] ? racoes[raca][faixaEtaria] : null;

    if (racaoRecomendada) {
        resultDiv.innerHTML = `<p>Ração recomendada para ${raca.replace(/-/g, ' ')} de ${idade} ano(s): ${racaoRecomendada}</p>`;
    } else {
        resultDiv.innerHTML = `<p>Ração não encontrada para a raça ${raca.replace(/-/g, ' ')} e idade ${idade} ano(s).</p>`;
    }

    // Exibir imagem da raça do cão
    if (imagensDeRacas[raca]) {
        let dogImage = document.createElement('img');
        dogImage.src = imagensDeRacas[raca];
        dogImage.alt = `Imagem de um ${raca.replace(/-/g, ' ')}`;
        dogImage.id = "dogImage";
        imagesContainer.appendChild(dogImage);
    } else {
        resultDiv.innerHTML += `<p>Imagem da raça do cão não encontrada.</p>`;
    }

    // Exibir imagem da ração (caso disponível)
    const imagensDeRacoes = {
        "Royal Canin Bulldog Adulto": "https://cdn.pacifiko.com/image/cache/catalog/p/OGUxM2U4MD_196-1000x1000.png",
        "Royal Canin Medium Adult": "https://th.bing.com/th/id/OIP.7ECZOCqWAKSQt49PK1BnXQHaIx?rs=1&pid=ImgDetMain",
        "Royal Canin French Bulldog Adult": "https://th.bing.com/th/id/OIP._fN9G-i-dcPSLFC0ZvxVZwHaE8?rs=1&pid=ImgDetMain",
        "Hill's Science Diet Light Adult": "https://th.bing.com/th/id/R.d0522ec4d4cc3cf25cf82b8b2121744c?rik=3rhwhGlNrrW9qw&pid=ImgRaw&r=0",
        "Purina Pro Plan Small Breed": "https://th.bing.com/th/id/OIP.Yz82D-JwSO0Xyb-SRfNLeAHaHZ?rs=1&pid=ImgDetMain",
        "Hill's Science Diet Adulto Cães Médios": "https://images.petz.com.br/fotos/1613058041791.jpg",
        "Premier Raças Específicas Border Collie": "https://link-para-imagem-racao-border-collie.jpg",
        "Royal Canin Maxi Adult": "https://link-para-imagem-racao-maxi-adult.jpg",
        "Royal Canin Chihuahua Adult": "https://link-para-imagem-racao-chihuahua.jpg",
        "Royal Canin Golden Retriever Adult": "https://link-para-imagem-racao-golden-retriever.jpg",
        "Premier Raças Específicas Labrador": "https://link-para-imagem-racao-labrador.jpg",
        "Royal Canin Poodle Adulto": "https://link-para-imagem-racao-poodle.jpg",
        "Premier Ambientes Internos Poodle": "https://link-para-imagem-racao-ambientes-internos.jpg",
        "Royal Canin Rottweiler Adult": "https://link-para-imagem-racao-rottweiler.jpg",
        "Premier Shih Tzu Adulto": "https://link-para-imagem-racao-shih-tzu.jpg",
        "Royal Canin Shih Tzu Adult": "https://link-para-imagem-racao-royal-shih-tzu.jpg",
        "Royal Canin Yorkshire Adult": "https://link-para-imagem-racao-yorkshire.jpg",
        "Royal Canin Dachshund Adult": "https://link-para-imagem-racao-dachshund.jpg",
        "Premier Raças Específicas Dachshund": "https://link-para-imagem-racao-premier-dachshund.jpg",
        "Hill's Science Diet Adult Small & Mini": "https://link-para-imagem-racao-hills-small-mini.jpg",
        "Premier Raças Específicas Pitbull": "https://link-para-imagem-racao-pitbull.jpg",
        "Royal Canin Doberman Adult": "https://link-para-imagem-racao-doberman.jpg",
        "Premier Raças Específicas Weimaraner": "https://link-para-imagem-racao-weimaraner.jpg"
    };

    if (imagensDeRacoes[racaoRecomendada]) {
        let racaoImage = document.createElement('img');
        racaoImage.src = imagensDeRacoes[racaoRecomendada];
        racaoImage.alt = `Imagem da ração ${racaoRecomendada}`;
        racaoImage.id = "racaoImage";
        imagesContainer.appendChild(racaoImage);
    } else {
        resultDiv.innerHTML += `<p>Imagem da ração não encontrada.</p>`;
    }

        document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('dogForm').reset(); // Limpa o formulário
        document.getElementById('result').innerHTML = ''; // Limpa o texto do resultado
        document.getElementById('imagesContainer').innerHTML = ''; // Limpa as imagens exibidas
        });
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
