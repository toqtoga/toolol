/* eslint-disable no-irregular-whitespace */
import { useMemo, useState } from "react";
import "./App.scss";
import { getTsagaanSarAttributes } from "./utils/bbets/newyrs";
import { Calendar } from "./utils/bbets/zurhai";
import { CalendarChinese } from "date-chinese";
import { pad2 } from "./utils/bbets/utils";

export const App = () => {
  const [year, setYear] = useState(2026);

  // const chineseNewYear = Temporal.PlainMonthDay.from({
  //   monthCode: "M01",
  //   day: 1,
  //   calendar: "chinese",
  // });
  // let nextCNY = chineseNewYear.toPlainDate({
  //   year: Temporal. .plainDateISO().withCalendar("chinese").year,
  // });

  const chineseNewYear = useMemo(() => {
    const cal = new CalendarChinese();
    const jde = cal.newYear(year); // Chinese New Year in JDE
    cal.fromJDE(jde); // load that date
    const g = cal.toGregorian(year); // { year, month, day }
    return `${g.year}-${pad2(g.month)}-${pad2(g.day)}`;
  }, [year]);

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
        <div className="calendarTitle">
          Монгол, Буриад (Орос), Тува (Орос) (Төгс буянт)
        </div>
        <div className="calendarDate">
          {getTsagaanSarAttributes(year, Calendar.Mongolian)["он гарах огноо"]}
        </div>
      </div>
      <div>
        <div className="calendarTitle">Хальмаг (Орос) (Пүг) </div>
        <div className="calendarDate">
          {getTsagaanSarAttributes(year, Calendar.Phugpa)["он гарах огноо"]}
        </div>
      </div>
      <div>
        <div className="calendarTitle">Өвөр Монгол, Хятад (Хятад) (Шар)</div>
        <div className="calendarDate">{chineseNewYear}</div>
      </div>
    </>
  );
};
