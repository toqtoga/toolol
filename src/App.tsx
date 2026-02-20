import "./App.css";
// @ts-expect-error import JS
import * as MoonPhase from "./utils/bbe/newyrs.js";

function App() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: MoonPhase.newyrs(1990, 2026) }}
    ></div>
  );
}

export default App;
