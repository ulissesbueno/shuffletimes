const api = "https://api.shuffletime.devphp.com.br"

function Participantes() {
  // Faz uma solicitação GET para a API
  fetch(api+'/api/participantes')
      .then(response => response.json())
      .then(data => {
          // Obtém a referência da div #main
          const mainDiv = document.getElementById('main');

          // Cria uma tabela e o cabeçalho
          const table = document.createElement('table');
          const thead = document.createElement('thead');
          const trHead = document.createElement('tr');
          const thNome = document.createElement('th');
          const thTelefone = document.createElement('th');

          thNome.textContent = 'Nome';
          thTelefone.textContent = 'Telefone';

          trHead.appendChild(thNome);
          trHead.appendChild(thTelefone);
          thead.appendChild(trHead);
          table.appendChild(thead);

          // Cria as linhas da tabela com os dados da API
          data.forEach(participante => {
              const tr = document.createElement('tr');
              const tdNome = document.createElement('td');
              const tdTelefone = document.createElement('td');

              tdNome.textContent = participante.nome;
              tdTelefone.textContent = participante.telefone;

              tr.appendChild(tdNome);
              tr.appendChild(tdTelefone);
              table.appendChild(tr);
          });

          // Limpa o conteúdo atual da div #main e adiciona a nova tabela
          mainDiv.innerHTML = '';
          mainDiv.appendChild(table);
      })
      .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
      });
}

function CarregarFormulario() {
  // Obtém a referência da div #main
  const mainDiv = document.getElementById('main');

  // Faz uma solicitação fetch para carregar o arquivo formulario.html
  fetch('/form.html')
      .then(response => response.text())
      .then(data => {
          // Define o conteúdo da div #main com o conteúdo do arquivo carregado
          mainDiv.innerHTML = data;
      })
      .catch(error => {
          console.error('Erro ao carregar o formulário:', error);
      });
}

function gravarParticipante() {
  // Obtém os valores dos campos de entrada do formulário
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;

  // Dados a serem enviados para a API
  const data = {
      nome: nome,
      telefone: telefone
  };

  // Configura a requisição POST para a API
  fetch(api+'/api/participantes/adicionar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(responseData => {
      // Verifica se a resposta da API indica sucesso
      if (responseData.success) {
          //alert('Participante gravado com sucesso.');
          // Chama o método Participantes para atualizar a lista
          Participantes();
      } else {
          alert('Erro ao gravar participante');
      }
  })
  .catch(error => {
      console.error('Erro na requisição para a API:', error);
  });
}

function CarregarShufle() {
  // Obtém a referência da div #main
  const mainDiv = document.getElementById('main');

  // Faz uma solicitação fetch para carregar o arquivo formulario.html
  fetch('/shufle.html')
      .then(response => response.text())
      .then(data => {
          // Define o conteúdo da div #main com o conteúdo do arquivo carregado
          mainDiv.innerHTML = data;
      })
      .catch(error => {
          console.error('Erro ao carregar o formulário:', error);
      });
}

function gerarTimes() {
  // Obtém os valores dos campos de entrada do formulário
  const numeroDeTimes = document.getElementById('numeroDeTimes').value;
  const dataDoJogo = document.getElementById('dataDoJogo').value;

  // Dados a serem enviados para a API
  const data = {
      numeroDeTimes: numeroDeTimes
  };

  // Configura a requisição POST para a API
  fetch(api+'/api/shuffletime', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(responseData => {
      // Verifica se a resposta da API indica sucesso
      if (responseData.success) {
          // Chama a função GerarTabelaTimes com os dados dos times retornados pela API
          GerarTabelaTimes(responseData, dataDoJogo);
      } else {
          alert('Erro ao gerar time');
      }
  })
  .catch(error => {
      console.error('Erro na requisição para a API:', error);
  });
}


function GerarTabelaTimes(times, dataDoJogo) {
  // Obtém a referência da div #main
  const mainDiv = document.getElementById('main');

  // Cria um elemento <p> para exibir a data do jogo
  const dataElement = document.createElement('p');
  dataElement.textContent = 'Data do Jogo: ' + dataDoJogo;

  // Cria uma tabela
  const table = document.createElement('table');

  // Cria o cabeçalho da tabela
  const thead = document.createElement('thead');
  const trHeader = document.createElement('tr');
  const thNome = document.createElement('th');
  const thTelefone = document.createElement('th');
  const thTime = document.createElement('th');

  thNome.textContent = 'Nome';
  thTelefone.textContent = 'Telefone';
  thTime.textContent = 'Time';

  trHeader.appendChild(thNome);
  trHeader.appendChild(thTelefone);
  trHeader.appendChild(thTime);
  thead.appendChild(trHeader);
  table.appendChild(thead);

  // Itera pelos times e seus participantes para preencher a tabela
  times.forEach(time => {
      time.forEach(participante => {
          const tr = document.createElement('tr');
          const tdNome = document.createElement('td');
          const tdTelefone = document.createElement('td');
          const tdTime = document.createElement('td');

          tdNome.textContent = participante.nome;
          tdTelefone.textContent = participante.telefone;
          tdTime.textContent = time[0].nome; // O nome do time é o mesmo para todos os participantes

          tr.appendChild(tdNome);
          tr.appendChild(tdTelefone);
          tr.appendChild(tdTime);
          table.appendChild(tr);
      });
  });

  // Limpa o conteúdo atual da div #main e adiciona a data e a tabela de times
  mainDiv.innerHTML = '';
  mainDiv.appendChild(dataElement);
  mainDiv.appendChild(table);
}


// Chamando a função Participantes para carregar os dados
window.onload = function(){
  Participantes();
}
