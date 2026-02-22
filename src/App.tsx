/* eslint-disable no-irregular-whitespace */
import { useState } from "react";
import "./App.scss";
import { getTsagaanSarAttributes } from "./utils/bbets/newyrs";
import { Calendar } from "./utils/bbets/zurhai";
// import { RomanNumbers, TSAGAAN_SAR_ATTRIBUTES } from "./utils/bbets/consts";
// import { getTsagaanSarAttributes } from "./utils/bbets/newyrs";
// import { pad2 } from "./utils/bbets/utils";
// import { Calendar } from "./utils/bbets/zurhai";

export const App = () => {
  const [year, setYear] = useState(2026);

  return (
    <>
      <div className="title">
        <h2 className="vertical-mn">
          ᠴᠠᠭᠠᠨ ᠰᠠᠷ᠎ᠠ
          <br />
          ᢈᠡᠵᠢᠶ᠎ᠡ ᠪᠤᠢ?
        </h2>
        <h2>Цагаан сар хэзээ вэ?</h2>
      </div>
      <div className="year-scroller">
        <button className="year-btn" onClick={() => setYear((y) => y - 1)}>
          ‹
        </button>
        <span className="year-display">{year}</span>
        <button className="year-btn" onClick={() => setYear((y) => y + 1)}>
          ›
        </button>
      </div>

      <div>
        <div>Монгол, Буриад (Орос), Тува (Орос) (Төгс буянт)</div>
        <div>
          {getTsagaanSarAttributes(year, Calendar.Mongolian)["он гарах огноо"]}
        </div>
      </div>
      <div>
        <div>Хальмаг (Орос)</div>
        <div>
          {getTsagaanSarAttributes(year, Calendar.Phugpa)["он гарах огноо"]}
        </div>
      </div>
      <div>
        <div>Өвөр Монгол, Хятад (Хятад)</div>
        <div>
          {getTsagaanSarAttributes(year, Calendar.Mongolian)["он гарах огноо"]}
        </div>
      </div>
    </>
  );
};
