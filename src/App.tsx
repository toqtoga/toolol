import "./App.css";
import { TSAGAAN_SAR_ATTRIBUTES } from "./utils/bbets/consts";
import { getTsagaanSarAttributes } from "./utils/bbets/newyrs";

function App() {
  return (
    <table className="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          {TSAGAAN_SAR_ATTRIBUTES.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 20 }, (_, i) => i + 2010).map((y) => {
          const ret = getTsagaanSarAttributes(y, 2);
          return (
            <tr key={y}>
              {TSAGAAN_SAR_ATTRIBUTES.map((key) => (
                <td key={key}>{ret[key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
