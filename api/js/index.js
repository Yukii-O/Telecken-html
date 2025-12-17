document.getElementById("btnBuscar").addEventListener("click", async function () {
  let cep = document.getElementById("cep").value;
  let resultado = document.getElementById("resultado");

  resultado.innerHTML = "";

  if (cep.length !== 8) {
    resultado.innerHTML = "CEP inválido.";
    return;
  }

  try {
    let resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

    if (!resposta.ok) {
      throw new Error("CEP não encontrado");
    }

    let dados = await resposta.json();

    resultado.innerHTML = `
      <p><strong>Rua:</strong> ${dados.street}</p>
      <p><strong>Bairro:</strong> ${dados.neighborhood}</p>
      <p><strong>Cidade:</strong> ${dados.city}</p>
      <p><strong>Estado:</strong> ${dados.state}</p>
    `;
  } catch (erro) {
    resultado.innerHTML = "Erro ao buscar o CEP.";
  }
});
