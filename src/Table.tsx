import "./App.scss";
import { RomanNumbers, TSAGAAN_SAR_ATTRIBUTES } from "./utils/bbets/consts";
import { getTsagaanSarAttributes } from "./utils/bbets/newyrs";
import { pad2 } from "./utils/bbets/utils";
import { Calendar } from "./utils/bbets/zurhai";

function Table() {
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
        {Array.from({ length: 200 }, (_, i) => i + 1450).map((y) => {
          const ret = getTsagaanSarAttributes(y, Calendar.Phugpa);
          const dateStr = `${y}/${RomanNumbers[new Date(Number(ret["он гарах огноо"])).getMonth()]}/${pad2(new Date(Number(ret["он гарах огноо"])).getDate())}`;
          return (
            <tr key={y}>
              {TSAGAAN_SAR_ATTRIBUTES.map((key) => (
                <td key={key}>
                  {key === "он гарах огноо" ? dateStr : ret[key]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
