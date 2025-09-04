const listaClientes =
  document.getElementById(
    "lista-clientes"
  ); /* PEGANDO O ID ONDE VAI ESTAR A LISTA DE CLIENTES */
const API =
  "https://crudcrud.com/api/e126524ee58d405ba2b0070b557aca71/clientes"; // URL DA API

// CARREGANDO CLIENTES JÁ EXISTENTES
fetch(API)
  .then((response) => response.json())
  .then((clientesCadastrados) => {
    clientesCadastrados.forEach((clientes) => {
      const itemClientes = document.createElement("li");
      itemClientes.classList.add("item-clientes");
      itemClientes.innerHTML = `
      <div class="info-clientes">
          <span class="usuario">Cliente: ${clientes.nome}</span>
          <span class="usuario-email"
            >E-mail: ${clientes.mail}</span
          >
        </div>
        <div class="btn-infos">
          <button class="btn-editar" data-id="${clientes._id}">
            <i class="fa-solid fa-pen-to-square"></i>Editar
          </button>
          <button class="btn-delete" data-id="${clientes._id}">
            <i class="fa-solid fa-minus"></i>Excluir
          </button>
        </div>`;
      listaClientes.appendChild(itemClientes);
    });
  })
  .catch((erro) => console.error(erro));

// ADICIONANDO NOVOS CLIENTES
document.getElementById("btn-add").addEventListener("click", () => {
  const nameClientes = document.getElementById("name").value;
  const emailClientes = document.getElementById("email").value;

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nameClientes,
      mail: emailClientes,
    }),
  })
    .then((response) => response.json())
    .then((clientes) => {
      const itemClientes = document.createElement("li");
      itemClientes.classList.add("item-clientes");
      itemClientes.innerHTML = `
      <div class="info-clientes">
          <span class="usuario">Cliente: ${clientes.nome}</span>
          <span class="usuario-email"
            >E-mail: ${clientes.mail}</span
          >
        </div>
        <div class="btn-infos">
          <button class="btn-editar" data-id="${clientes._id}">
            <i class="fa-solid fa-pen-to-square"></i>Editar
          </button>
          <button class="btn-delete" data-id="${clientes._id}">
            <i class="fa-solid fa-minus"></i>Excluir
          </button>
        </div>`;
      listaClientes.appendChild(itemClientes);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
    })
    .catch((erro) => console.error(erro));
});
