// API 1 - JSONPlaceholder
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(resposta => resposta.json())
  .then(dados => {
    document.getElementById("post").innerHTML =
      `<p><strong>${dados.title}</strong></p>
       <p>${dados.body}</p>`;
  })
  .catch(() => {
    document.getElementById("post").innerHTML = "Erro ao carregar post.";
  });


// API 2 - SWAPI
fetch("https://swapi.py4e.com/api/people/1/")

  .then(resposta => resposta.json())
  .then(dados => {
    document.getElementById("starwars").innerHTML =
      `<p>Nome: ${dados.name}</p>
       <p>Altura: ${dados.height} cm</p>`;
  })
  .catch(() => {
    document.getElementById("starwars").innerHTML = "Erro ao carregar personagem.";
  });


// API 3 - BrasilAPI (Feriados)
fetch("https://brasilapi.com.br/api/feriados/v1/2025")
  .then(resposta => resposta.json())
  .then(dados => {
    let html = "";
    dados.slice(0, 5).forEach(feriado => {
      html += `<p>${feriado.date} - ${feriado.name}</p>`;
    });
    document.getElementById("feriados").innerHTML = html;
  })
  .catch(() => {
    document.getElementById("feriados").innerHTML = "Erro ao carregar feriados.";
  });
