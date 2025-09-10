import { elementId, valorElement } from "./utils.js";
import { ClienteService, ClienteList } from "./classes.js";

const API = "https://crudcrud.com/api/591b7ac64b464847a84bd83c52fc8808/clientes";
const service = new ClienteService(API);
const list = new ClienteList(elementId("lista-clientes"), service);

document.addEventListener("DOMContentLoaded", () => {
  list.carregar();
});

elementId("btn-add").addEventListener("click", async () => {
  const nome = valorElement("nome");  
  const email = valorElement("email"); 
  if (!nome || !email) return alert("Preencha os campos");
  await list.adicionar(nome, email);
  list.resetarFormulario();
});

elementId("btn-edit").addEventListener("click", async () => {
  const nome = valorElement("nome");
  const email = valorElement("email");
  if (!nome || !email) return alert("Preencha os campos");
  await list.editar(nome, email);
});
