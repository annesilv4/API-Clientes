const listaClientes =
  document.getElementById(
    "lista-clientes"
  ); /* PEGANDO O ID ONDE VAI ESTAR A LISTA DE CLIENTES */
const API =
  "https://crudcrud.com/api/459bbf8a525a44a29e8aadb5bfcf9d0c/clientes"; // URL DA API
let clienteAtualId = null;
let clienteAtualElemento = null;

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

      const btnEditar = itemClientes.querySelector(".btn-editar");
      btnEditar.addEventListener("click", () => {
        clienteAtualId = clientes._id;
        clienteAtualElemento = itemClientes;

        document.getElementById("name").value = clientes.nome;
        document.getElementById("email").value = clientes.mail;
        document.getElementById("btn-add").style.display = "none";
        document.getElementById("btn-edit").style.display = "inline";
      });

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

      const btnEditar = itemClientes.querySelector(".btn-editar");
      btnEditar.addEventListener("click", () => {
        clienteAtualId = clientes._id;
        clienteAtualElemento = itemClientes;

        document.getElementById("name").value = clientes.nome;
        document.getElementById("email").value = clientes.mail;
        document.getElementById("btn-add").style.display = "none";
        document.getElementById("btn-edit").style.display = "inline";
      });
      
      listaClientes.appendChild(itemClientes);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
    })
    .catch((erro) => console.error(erro));
});

// ALTERANDO INFORMAÇÕES DE NOME OU EMAIL DE CLIENTES EXISTENTES
document.getElementById("btn-edit").addEventListener("click", () => {
  const inputName = document.getElementById("name").value;
  const inputEmail = document.getElementById("email").value;

  fetch(`${API}/${clienteAtualId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: inputName,
      mail: inputEmail,
    }),
  })
    .then(() => {
      clienteAtualElemento.querySelector(
        ".usuario"
      ).textContent = `Cliente: ${inputName}`;
      clienteAtualElemento.querySelector(
        ".usuario-email"
      ).textContent = `E-mail: ${inputEmail}`;

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("btn-add").style.display = "inline";
      document.getElementById("btn-edit").style.display = "none";
      clienteAtualId = null;
      clienteAtualElemento = null;

      console.log("Informações atualizadas com sucesso!");
    })
    .catch((erro) => console.error("Erro ao atualizar:", erro));
});
