import { elementId } from "./utils.js";

// INFORMAÇÕES DO CLIENTE
class Cliente {
  #id;
  #nome;
  #email;
  constructor(id, nome, email) {
    this.#id = id;
    this.#nome = nome;
    this.#email = email;
  }

  // Getters
  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get email() { return this.#email; }

  // Setters
  set nome(n) { this.#nome = n; }
  set email(e) { this.#email = e; }
}

// AÇÕES DENTRO DA API { GET, POST, PUT, DELETE}
export class ClienteService {
  #apiURL;

  constructor(apiURL) {
    this.#apiURL = apiURL;
  }

  async listar() {
    const resp = await fetch(this.#apiURL);
    return resp.json();
  }

  async criar(cliente) {
    const resp = await fetch(this.#apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: cliente.nome,
        email: cliente.email,
      }),
    });
    return resp.json();
  }

  async atualizar(id, cliente) {
    return fetch(`${this.#apiURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: cliente.nome,
        email: cliente.email,
      }),
    });
  }

  async excluir(id) {
    return fetch(`${this.#apiURL}/${id}`, { method: "DELETE" });
  }
}

export class ClienteList {
  #listaElement;
  #service;
  #clienteAtual;
  #clienteAtualElement;

  constructor(listaElement, service) {
    this.#listaElement = listaElement;
    this.#service = service;
    this.#clienteAtual = null;
    this.#clienteAtualElement = null;
  }

  async carregar() {
    const dados = await this.#service.listar();
    this.#listaElement.innerHTML = "";
    dados.forEach((c) => {
      const cliente = new Cliente(c._id, c.nome, c.email);
      const li = this._criarItem(cliente);
      this.#listaElement.appendChild(li);
    });

    this._toggleLista();
  }

  _toggleLista() {
    this.#listaElement.style.display =
      this.#listaElement.children.length > 0 ? "flex" : "none";
  }

  _criarItem(cliente) {
    const li = document.createElement("li");
    li.classList.add("item-clientes");
    li.innerHTML = `
      <div class="info-clientes">
          <span class="usuario">Cliente: ${cliente.nome}</span>
          <span class="usuario-email">E-mail: ${cliente.email}</span>
        </div>
        <div class="btn-infos">
          <button class="btn-editar" data-id="${cliente.id}">
            <i class="fa-solid fa-pen-to-square"></i>Editar
          </button>
          <button class="btn-delete" data-id="${cliente.id}">
            <i class="fa-solid fa-minus"></i>Excluir
          </button>
        </div>`;

    // Botão editar
    li.querySelector(".btn-editar").addEventListener("click", () => {
      this.#clienteAtual = cliente;
      this.#clienteAtualElement = li;

      elementId("nome").value = cliente.nome;
      elementId("email").value = cliente.email;
      elementId("btn-add").style.display = "none";
      elementId("btn-edit").style.display = "inline";
    });

    // Botão excluir
    li.querySelector(".btn-delete").addEventListener("click", async () => {
      await this.#service.excluir(cliente.id);
      this.#listaElement.removeChild(li);
      this._toggleLista();
      console.log("Cliente Excluído");
    });

    return li;
  }

  async adicionar(nome, email) {
    const novo = new Cliente(null, nome, email);
    const salvo = await this.#service.criar(novo);
    const cliente = new Cliente(salvo._id, salvo.nome, salvo.email);
    const li = this._criarItem(cliente);
    this.#listaElement.appendChild(li);
    this._toggleLista();
  }

  async editar(nome, email) {
    if (!this.#clienteAtual) return;

    this.#clienteAtual.nome = nome;
    this.#clienteAtual.email = email;
    await this.#service.atualizar(this.#clienteAtual.id, this.#clienteAtual);

    if (this.#clienteAtualElement) {
      this.#clienteAtualElement.querySelector(".usuario").textContent = `Cliente: ${nome}`;
      this.#clienteAtualElement.querySelector(".usuario-email").textContent = `E-mail: ${email}`;
    }

    this.resetarFormulario();
  }

  resetarFormulario() {
    elementId("nome").value = "";
    elementId("email").value = "";
    elementId("btn-add").style.display = "inline";
    elementId("btn-edit").style.display = "none";
    this.#clienteAtual = null;
    this.#clienteAtualElement = null;
  }
}
