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
          ᠬᠡᠵᠢᠶ᠎ᠡ ᠪᠤᠢ?
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

      <div className="calendar-grid">
        <div className="calendar-card">
          <div className="calendarTitle">
            Монгол, Буриад, Тува
            <span className="calendarSubtitle">Төгс буянт</span>
          </div>
          <div className="calendarDate">
            {
              getTsagaanSarAttributes(year, Calendar.Mongolian)[
                "он гарах огноо"
              ]
            }
          </div>
        </div>
        <div className="calendar-card">
          <div className="calendarTitle">
            Хальмаг
            <span className="calendarSubtitle">Пүг</span>
          </div>
          <div className="calendarDate">
            {getTsagaanSarAttributes(year, Calendar.Phugpa)["он гарах огноо"]}
          </div>
        </div>
        <div className="calendar-card">
          <div className="calendarTitle">
            Өвөр Монгол, Хятад
            <span className="calendarSubtitle">Шар</span>
          </div>
          <div className="calendarDate">{chineseNewYear}</div>
        </div>
      </div>
    </>
  );
};
