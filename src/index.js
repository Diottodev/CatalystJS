import { Catalyst } from "../index";

function App() {
  return (
    <section>
      <h1 ui={{ color: "blue", backgroundColor: "green" }}>Contador</h1>
      <div>
        <div>0</div>
        <button onClick={() => alert("click do botao")}>Incrementar</button>
        <button>Decrementar</button>
      </div>
    </section>
  );
}

Catalyst.render(
  Catalyst.createElement(App, null),
  document.querySelector("#root")
);
