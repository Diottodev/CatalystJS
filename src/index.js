import { useState, Catalyst } from "../catalyst";

export default function App() {
  const [num, setNum] = useState(0);

  return (
    <section>
      <h1 ui={{ color: "blue", backgroundColor: "green" }}>Contador</h1>
      <div>
        <div>{num}</div>
        <button
          onClick={() => {
            setNum(num + 1);
          }}
        >
          Incrementar
        </button>
        <button
          onClick={() => {
            setNum(num - 1);
          }}
        >
          Decrementar
        </button>
      </div>
    </section>
  );
}

Catalyst.render(
  Catalyst.createElement(App, null),
  document.querySelector("#root")
);

export function rerender() {
  document.querySelector("#root").innerHTML = "";
  Catalyst.render(
    Catalyst.createElement(App, null),
    document.querySelector("#root")
  );
}
