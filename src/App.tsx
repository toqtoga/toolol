/* eslint-disable no-irregular-whitespace */
import { useState } from "react";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Яагаад цагаан сар өөр өөр өдрүүдэд тохиодог вэ?",
    a: "Монгол, Буриад, Тувачууд Төгс буянт тооллыг, Хальмагчууд Пүг тооллыг, Өвөр Монгол болон Хятадууд Шар тооллыг ашигладаг. Эдгээр нь сарны хөдөлгөөнийг тооцоолох өөр өөр астрономийн аргуудад суурилдаг тул он гарах өдөр хоорондоо ялгаатай байдаг.",
  },
  {
    q: "Төгс буянт, Пүг, Шар гэж юу вэ?",
    a: "Эдгээр нь нар, сарны хөдөлгөөнийг тооцоолох билгийн тооллын төрлүүд юм. Төгс буянт (Монгол) ба Пүг (Хальмаг) нь Төвд, Шар (Өвөр Монгол, Хятад) нь Хятад.",
  },
  {
    q: "Жаран гэж юу вэ?",
    a: "Жаран бол 60 жилийн мөчлөг юм. 12 амьтан (хулгана, үхэр, бар, туулай, луу, могой, морь, хонь, бич, тахиа, нохой, гахай) болон 5 элемент (мод, гал, шороо, төмөр, ус) хосолсноор 60 давтагдашгүй хослол үүсдэг.",
  },
  {
    q: "Жилийн мэнгэ гэж юу вэ?",
    a: "Жилийн мэнгэ нь тухайн жилд харгалзах тоо (1–9) болон өнгийн хослол юм. Энэ нь Зурхайн тооллоор тодорхойлогдох бөгөөд жилийн аз жаргал, энерги, шинж чанарыг илэрхийлдэг.",
  },
  {
    q: "Битүүний сар гэж юу вэ?",
    a: "Битүүний сар нь Цагаан сарын өмнөх шинийн нэгний шөнө буюу сарны шинэ үе юм.",
  },
];

import "./App.scss";
import { getTsagaanSarAttributes } from "./utils/bbets/newyrs";
import { Calendar } from "./utils/bbets/zurhai";
import { getChineseNewYear } from "./utils/bbets/utils";

export const App = () => {
  const [year, setYear] = useState(2026);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <input
          className="year-display"
          type="number"
          value={year}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v)) setYear(v);
          }}
        />
        <button className="year-btn" onClick={() => setYear((y) => y + 1)}>
          ›
        </button>
      </div>
      <p className="year-tagline">
        <span className="year-tagline-name">
          {getTsagaanSarAttributes(year, Calendar.Mongolian)["илт өгүүлэх нэр"]}
        </span>
        {" хэмээх "}
        <span className="year-tagline-animal">
          {getTsagaanSarAttributes(year, Calendar.Mongolian)["жил"]}
        </span>
        {" жил"}
      </p>

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
          <div className="calendarDate">{getChineseNewYear(year)}</div>
        </div>
      </div>

      <div className="year-attrs">
        {(
          [
            ["жилийн мэнгэ", "Жилийн мэнгэ"],
            ["жаран", "Жаран"],
          ] as const
        ).map(([key, label]) => (
          <div className="year-attr-item" key={key}>
            <span className="year-attr-label">{label}</span>
            <span className="year-attr-value">
              {getTsagaanSarAttributes(year, Calendar.Mongolian)[key]}
            </span>
          </div>
        ))}
      </div>

      <div className="faq">
        <h3 className="faq-title">Түгээмэл асуулт</h3>
        {FAQ.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{item.q}</span>
              <span className={`faq-chevron${openFaq === i ? " open" : ""}`}>
                ▼
              </span>
            </button>
            <div className={`faq-body${openFaq === i ? " open" : ""}`}>
              <p className="faq-answer">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
