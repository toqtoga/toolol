import Decimal from "decimal.js";
import { Animal, Animalin, Element, Colour, Colour9 } from "./consts";
import { amod, int_div } from "./math";

// Shorthand for creating Decimal instances.
const D = (v: Decimal.Value) => new Decimal(v);

// Month offset constant used in the M* (true month count) calculation.
// This is traditional
// https://arxiv.org/pdf/1401.6285 Page 14
const Mzero = 3;

// Tibetan Buddhist calendar system variants.
// See: https://en.wikipedia.org/wiki/Tibetan_calendar
export const Calendar = {
  Phugpa: 0, // Phugpa tradition (dominant in Gelug school)
  Tsurphu: 1, // Tsurphu tradition (Karma Kagyu school)
  Mongolian: 2, // Mongolian calendar (based on Phugpa)
  Bhutanese: 3, // Bhutanese calendar
  Tsurphu1852: 4, // Tsurphu with 1852 epoch
  Phugpa1927: 5, // Phugpa with 1927 epoch
  Phugpa1987: 6, // Phugpa with 1987 epoch
  Karana: 7, // Karana Tantra system (see: https://en.wikipedia.org/wiki/Kalachakra)
};

// Returns epoch, intercalation parameters, and mean motion constants for a given
// calendar variant. These constants drive the lunisolar date calculations in the
// Tibetan astronomical system (rtsis). Returns undefined for unknown calendar types.
// See: https://en.wikipedia.org/wiki/Tibetan_calendar#Astronomical_calculations
export function get_cal_data(calendarId: number) {
  switch (calendarId) {
    case Calendar.Phugpa: //Phugpa
      return {
        cal_type: 0,
        epoch: 806,
        ixx: 48,
        betastar: 61,
        beta: 184 - 61,
        cnst: {
          m0: D(2015501).plus(D(4783).div(5656)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312),
          s0: D(743).div(804),
          s1: D(65).div(804),
          s2: D(13).div(4824),
          a0: D(475).div(3528),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
    case Calendar.Tsurphu: //Tsurphu
      return {
        cal_type: 1,
        epoch: 1732,
        ixx: 0,
        betastar: 59,
        beta: 142,
        cnst: {
          m0: D(2353745).plus(D(1795153).div(7635600)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312), // ?
          s0: D(-5983).div(108540),
          // s0: D(809).div(810),
          s1: D(65).div(804),
          // s1: D(1277).div(15795),
          s2: D(13).div(4824), // ?
          a0: D(207).div(392),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
    case Calendar.Mongolian: //Mongolian
      return {
        cal_type: 2,
        epoch: 1747,
        ixx: 46,
        betastar: 10,
        beta: 172,
        cnst: {
          m0: D(2359237).plus(D(2603).div(2828)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312),
          s0: D(397).div(402),
          s1: D(65).div(804),
          s2: D(13).div(4824),
          a0: D(1523).div(1764),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };

    case Calendar.Bhutanese: //Bhutanese
      return {
        cal_type: 3,
        epoch: 1754,
        ixx: 59,
        betastar: 2,
        beta: 191,
        cnst: {
          m0: D(2361807).plus(D(52).div(707)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312),
          s0: D(1).div(67),
          s1: D(65).div(804),
          s2: D(13).div(4824),
          a0: D(17).div(147),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
    case Calendar.Tsurphu1852: //Tsurphu
      return {
        cal_type: 1,
        epoch: 1852,
        ixx: 0,
        betastar: 14,
        beta: 187,
        cnst: {
          m0: D(2397598).plus(D(1197103).div(7635600)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312),
          s0: D(23).div(27135),
          s1: D(65).div(804),
          s2: D(13).div(4824),
          a0: D(1).div(49),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
    case Calendar.Phugpa1927: //Phugpa
      return {
        cal_type: 0,
        epoch: 1927,
        ixx: 48,
        betastar: 55,
        beta: 184 - 55,
        cnst: {
          m0: D(2424972).plus(D(5457).div(5656)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312),
          s0: D(749).div(804),
          s1: D(65).div(804),
          s2: D(13).div(4824),
          a0: D(1741).div(3528),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
    case Calendar.Phugpa1987: //Phugpa
      return {
        cal_type: 0,
        epoch: 1987,
        ixx: 48,
        betastar: 0,
        beta: 184 - 0,
        cnst: {
          m0: D(2446914).plus(D(135).div(707)),
          m1: D(167025).div(5656),
          m2: D(11135).div(11312),
          s0: D(0),
          s1: D(65).div(804),
          s2: D(13).div(4824),
          a0: D(38).div(49),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
    case Calendar.Karana: //Karana
      return {
        cal_type: 4,
        epoch: 806,
        ixx: 65,
        betastar: 0,
        beta: 4,
        cnst: {
          m0: D(2015531).plus(D(1).div(2)),
          m1: D(29).plus(D(191).div(360)),
          m2: D(29).plus(D(191).div(360)).div(30),
          s0: D(809).div(810),
          s1: D(1277).div(15795),
          s2: D(1277).div(15795).div(30),
          a0: D(53).div(252),
          a1: D(253).div(3528),
          a2: D(1).div(28), //+1/105840,
        },
      };
  }
}

// Computes the "month count" (M*) — the number of months elapsed since the
// calendar epoch. Used as the basis for intercalation and true month calculations.
export function Mstar(Y: number, M: number, calendarId: number) {
  const calData = get_cal_data(calendarId);
  const epoch = calData!.epoch; // TODO Fix
  return 12 * (Y - epoch) + M - Mzero;
}

// Computes the intercalation index for a given year/month. This index determines
// whether a month is a leap (intercalary) month in the Tibetan lunisolar calendar.
export function intercal_ind(Y: number, M: number, calendarId: number) {
  const calData = get_cal_data(calendarId);
  const betastar = calData!.betastar; // TODO Fix
  let ix = (67 * Mstar(Y, M, calendarId) + betastar) % 65;
  if (ix < 0) ix += 65;
  return ix;
}

// Computes the "true month number" n, which is the count of mean lunar months
// since the epoch. Accounts for intercalary (leap) months. The parameter L
// indicates whether this is a leap month. Different calendar traditions handle
// the leap month offset differently (before vs after the regular month).
export function true_month(
  Y: number,
  M: number,
  L: boolean,
  calendarId: number,
) {
  const calData = get_cal_data(calendarId);
  const betastar = calData!.betastar; // TODO Fix
  const ixx = calData!.ixx; // TODO Fix
  const p = 67 * Mstar(Y, M, calendarId) + betastar;
  let ix = (67 * Mstar(Y, M, calendarId) + betastar) % 65;
  if (ix < 0) ix += 65;
  const pp = (p - ix) / 65;
  switch (calData?.cal_type) {
    case 1:
      if (L) return pp - 1;
      else return pp; //Tsurphu
    case 3:
      if (!L && ix < ixx) return pp;
      else return pp + 1; //Bhutan
    case 4:
      if (!L) return pp;
      else return pp + 1; //Karana
    default:
      if (L || ix < ixx) return pp;
      else return pp + 1;
  }
}

// Inverse of true_month: given a true month number n, recovers the Tibetan
// year (Y), month (M), and whether it is a leap month (L). Writes the result
// into the `dat` output parameter.
export function inv_month(n: number, calendarId: number) {
  const calData = get_cal_data(calendarId);
  const epoch = calData!.epoch; // TODO Fix
  const beta = calData!.beta; // TODO Fix
  const x = Math.ceil((65 * n + beta) / 67);
  const t = (65 * n + beta) % 67;

  return {
    M: amod(x, 12),
    Y: Math.ceil(x / 12) - 1 + epoch,
    L: t == 1 || t == 2,
  };
}

// Determines whether the given month in a Tibetan year is an intercalary
// (leap) month. Leap months keep the lunisolar calendar aligned with the
// tropical year. See: https://en.wikipedia.org/wiki/Intercalation_(timekeeping)
export function leap_month(Y: number, M: number, calendarId: number) {
  const calData = get_cal_data(calendarId);
  const epoch = calData!.epoch; // TODO Fix
  const beta = calData!.beta; // TODO Fix
  let t = (24 * (Y - epoch) + 2 * M - beta) % 65;
  if (t < 0) t += 65;
  return t == 0 || t == 1;
}

// Determines whether the given Tibetan year contains an intercalary (leap)
// month. A year is a leap year if its intercalation index >= 41.
export function leap_year(Y: number, calendarId: number) {
  const calData = get_cal_data(calendarId);
  const epoch = calData!.epoch; // TODO Fix
  const beta = calData!.beta; // TODO Fix
  let t = (24 * (Y - epoch) - beta) % 65;
  if (t < 0) t += 65;
  return t >= 41;
}

// Returns which month number (1-12) is the leap month in a given leap year.
// Only meaningful when leap_year(Y) returns true.
export function leap_month_number(Y: number, calendarId: number) {
  const calData = get_cal_data(calendarId);
  const epoch = calData!.epoch; // TODO Fix
  const beta = calData!.beta; // TODO Fix
  let t = (24 * (Y - epoch) - beta) % 65;
  if (t < 0) t += 65;
  return 1 + Math.floor((64 - t) / 2);
}

// Moon equation table: returns the lunar anomaly correction (in sixtieths of a
// day) via linear interpolation over a 28-entry sine-like lookup table.
// This models the equation of centre for the Moon's orbit.
// See: https://en.wikipedia.org/wiki/Equation_of_the_center
export function moon_tab(i: Decimal): Decimal {
  let idx = i.mod(28);
  if (idx.isNeg()) idx = idx.plus(28);
  let s = D(1);
  if (idx.gte(14)) {
    idx = idx.minus(14);
    s = D(-1);
  }
  if (idx.gt(7)) idx = D(14).minus(idx);
  const a = idx.floor();
  const b = idx.ceil();
  const v = [0, 5, 10, 15, 19, 22, 24, 25];
  if (a.eq(b)) return s.times(v[a.toNumber()]);
  return s
    .times(
      b
        .minus(idx)
        .times(v[a.toNumber()])
        .plus(idx.minus(a).times(v[b.toNumber()])),
    )
    .div(b.minus(a));
}

// Sun equation table: returns the solar anomaly correction (in sixtieths of a
// day) via linear interpolation over a 12-entry sine-like lookup table.
// This models the equation of centre for the Sun's apparent orbit.
// See: https://en.wikipedia.org/wiki/Equation_of_the_center
export function sun_tab(i: Decimal): Decimal {
  let idx = i.mod(12);
  if (idx.isNeg()) idx = idx.plus(12);
  let s = D(1);
  if (idx.gte(6)) {
    idx = idx.minus(6);
    s = D(-1);
  }
  if (idx.gt(3)) idx = D(6).minus(idx);
  const a = idx.floor();
  const b = idx.ceil();
  const v = [0, 6, 10, 11];
  if (a.eq(b)) return s.times(v[a.toNumber()]);
  return s
    .times(
      b
        .minus(idx)
        .times(v[a.toNumber()])
        .plus(idx.minus(a).times(v[b.toNumber()])),
    )
    .div(b.minus(a));
}

// Computes the "true date" — the Julian day number (as a fractional Decimal)
// for lunar day d in true month n. Combines the mean date with corrections
// from both the lunar and solar equations of centre.
export function true_date(d: number, n: number, calendarId: number): Decimal {
  const calData = get_cal_data(calendarId);
  const cnst = calData!.cnst; // TODO Fix
  const mean_date = cnst.m1.times(n).plus(cnst.m2.times(d)).plus(cnst.m0);

  const mean_sun = cnst.s1.times(n).plus(cnst.s2.times(d)).plus(cnst.s0);
  const anomaly_moon = cnst.a1.times(n).plus(cnst.a2.times(d)).plus(cnst.a0);
  const moon_equ = moon_tab(D(28).times(anomaly_moon));
  const anomaly_sun = mean_sun.minus("0.25");
  const sun_equ = sun_tab(D(12).times(anomaly_sun));

  return mean_date.plus(moon_equ.div(60)).minus(sun_equ.div(60));
}

// Computes the previous Tibetan month, accounting for intercalary months.
// Writes the result (year, month, leap flag) into `dat`.
// Calendar types 0-2 place the leap month before the regular month;
// calendar types 3+ place it after.
export function prev_month(
  Y: number,
  M: number,
  L: boolean,
  dat: { Y: number; M: number; L: boolean },
  calendarId: number,
) {
  dat.Y = Y;
  dat.M = M;
  dat.L = L;
  const calData = get_cal_data(calendarId);
  if (calData!.cal_type <= 2) {
    if (leap_month(Y, M, calendarId))
      if (L) {
        dat.L = false;
        dat.M--;
      } else dat.L = true;
    else dat.M--;
    if (dat.M <= 0) {
      dat.M = 12;
      dat.Y--;
    }
  } else {
    if (leap_month(Y, M, calendarId))
      if (L) dat.L = false;
      else dat.M--;
    else dat.M--;
    if (dat.M <= 0) {
      dat.M = 12;
      dat.Y--;
    }
    if (dat.M != M) dat.L = leap_month(dat.Y, dat.M, calendarId);
  }
}

// Computes the next Tibetan month, accounting for intercalary months.
// Writes the result (year, month, leap flag) into `dat`.
export function next_month(
  Y: number,
  M: number,
  L: boolean,
  dat: { Y: number; M: number; L: boolean },
  calendarId: number,
) {
  dat.Y = Y;
  dat.M = M;
  dat.L = L;
  const calData = get_cal_data(calendarId);
  if (calData!.cal_type <= 2) {
    if (leap_month(Y, M, calendarId))
      if (L) dat.L = false;
      else dat.M++;
    else dat.M++;
    if (dat.M > 12) {
      dat.M = 1;
      dat.Y++;
    }
    if (dat.M != M) dat.L = leap_month(dat.Y, dat.M, calendarId);
  } else {
    if (leap_month(Y, M, calendarId))
      if (L) {
        dat.L = false;
        dat.M++;
      } else dat.L = true;
    else dat.M++;
    if (dat.M > 12) {
      dat.M = 1;
      dat.Y++;
    }
  }
}

// Converts a Tibetan lunar date (year, month, leap flag, day) to a Julian day
// number by computing the true month and true date, then flooring.
// See: https://en.wikipedia.org/wiki/Julian_day
export function julian_day(
  Y: number,
  M: number,
  L: boolean,
  d: number,
  calendarId: number,
) {
  const n = true_month(Y, M, L, calendarId);
  const t = true_date(d, n, calendarId);
  return t.floor().toNumber();
}

// Returns the Julian day number of the first day of the Tibetan/Mongolian new
// year (Losar/Tsagaan Sar). This is the day after the last day of the 12th
// month of the previous year.
// See: https://en.wikipedia.org/wiki/Losar
// See: https://en.wikipedia.org/wiki/Tsagaan_Sar
export function new_year_jd(Y: number, calendarId: number): number {
  const calData = get_cal_data(calendarId);
  if (calData!.cal_type <= 2)
    return julian_day(Y - 1, 12, false, 30, calendarId) + 1;
  else {
    const d = { Y: 0, M: 0, L: false };
    prev_month(Y, 1, false, d, calendarId);
    return julian_day(d.Y, d.M, d.L, 30, calendarId) + 1;
  }
}

// Returns the Julian day number of the last day (30th lunar day) of a Tibetan month.
export function last_day_jd(
  Y: number,
  M: number,
  L: boolean,
  calendarId: number,
) {
  return julian_day(Y, M, L, 30, calendarId);
}

// Returns the Julian day number of the first day of a Tibetan month
// (the day after the last day of the previous month).
export function first_day_jd(
  Y: number,
  M: number,
  L: boolean,
  calendarId: number,
) {
  const d = { Y: 0, M: 0, L: false };
  prev_month(Y, M, L, d, calendarId);
  return julian_day(d.Y, d.M, d.L, 30, calendarId) + 1;
}

// Returns the astrological attributes of a Tibetan year: the 60-year cycle
// position, 12-year animal, 5-element, 10-colour, 9-mewa number, and cycle number.
// These form the Tibetan sexagenary cycle (rabjung).
// See: https://en.wikipedia.org/wiki/Sexagenary_cycle
// See: https://en.wikipedia.org/wiki/Chinese_zodiac
type YearAttributes = {
  year: number;
  cycle: number;
  animal: string;
  animalin: string;
  element: string;
  colour: string;
  elcor: string;
  number: number;
  colour9: string;
};
export function attrib_year(Y: number, calendarId: number): YearAttributes {
  const colour = Colour[amod(Y - 3, 10) - 1];
  const element = Element[Math.ceil(amod(Y - 3, 10) / 2) - 1];
  const number = amod(2 - Y, 9);

  const calData = get_cal_data(calendarId);

  return {
    year: amod(Y - 6, 60),
    cycle: Math.ceil((Y - 1026) / 60),
    animal: Animal[amod(Y - 3, 12) - 1],
    animalin: Animalin[amod(Y - 3, 12) - 1],
    element,
    colour,
    elcor: calData!.cal_type == 2 ? colour : element,
    number,
    colour9: Colour9[number - 1],
  };
}

// Returns the astrological attributes of a Tibetan month: animal, element,
// colour, and 9-mewa number. Phugpa (calendarType 0) uses a different animal
// mapping than other traditions.
type MonthAttributes = {
  animal: string;
  element: string;
  colour: string;
  elcor: string;
  number: number;
  colour9: string;
};
export function attrib_month(
  Y: number,
  M: number,
  calendarType: number,
): MonthAttributes {
  let t = amod(Y - 2 + Math.floor((M - 1) / 2), 5);
  if (calendarType == 0)
    if (M <= 10) t = amod(Math.ceil((Y - 1) / 2) + Math.floor((M + 1) / 2), 5);
    else t = amod(Math.ceil(Y / 2) + Math.floor((M - 11) / 2), 5);

  const element = Element[t - 1];
  const colour = Colour[2 * (t - 1) + ((M - 1) % 2)];
  const number = amod(3 - 12 * Y - M, 9);

  return {
    animal: calendarType == 0 ? Animal[(M + 3) % 12] : Animal[(M + 1) % 12],
    element,
    colour,
    elcor: calendarType == 2 ? colour : element,
    number,
    colour9: Colour9[number - 1],
  };
}

// Returns the astrological attributes of a day given its Julian day number:
// animal (12-cycle), element, colour (10-cycle), mewa number (9-cycle),
// trigram (8-cycle), and day of week.
// See: https://en.wikipedia.org/wiki/Mewa_(astrology)
// See: https://en.wikipedia.org/wiki/Bagua
type DayAttributes = {
  animal: number;
  element: string;
  colour: string;
  elcor: string;
  number: number;
  colour9: string;
  trigram: number;
  day: number;
};
export function attrib_day(jd: number, calendarType: number): DayAttributes {
  const t = amod(jd, 10);

  const colour = Colour[t - 1];
  const element = Element[Math.ceil(t / 2) - 1];
  const number = amod(-jd, 9);

  return {
    animal: amod(jd + 2, 12),
    colour,
    element,
    number,
    elcor: calendarType == 2 ? colour : element,
    colour9: Colour9[number - 1],
    trigram: amod(jd + 2, 8),
    day: (jd + 1) % 7, //0=Sunday,1=Monday
  };
}

// Converts a Western year to the Tibetan Royal Year (bod rgyal lo) by adding
// the 127-year offset (the Tibetan calendar epoch is 127 BC).
// See: https://en.wikipedia.org/wiki/Tibetan_calendar#Years
export function tibetan_year(Y: number) {
  return Y + 127;
}

// Finds the Tibetan lunar month containing a given Gregorian date.
// Searches backwards from the given month until the JD falls within a month's
// range. Writes the result into `dat`.
// WARNING: This loop has no upper bound on iterations — if the initial guess
// is far from the target, it could loop many times. Consider adding a guard.
export function lunar_month(
  y: number,
  m: number,
  d: number,
  dat: { Y: number; M: number; L: boolean },
  calendarType: number,
) {
  const jd = g2jdn(y, m, d);
  dat.Y = y;
  dat.M = m;
  dat.L = false;

  const dat1 = { Y: 0, M: 0, L: false };
  while (true) {
    const jd1 = first_day_jd(dat.Y, dat.M, dat.L, calendarType);
    const jd2 = last_day_jd(dat.Y, dat.M, dat.L, calendarType);

    if (jd1 <= jd) {
      if (jd <= jd2) {
        return;
      }
    }
    prev_month(dat.Y, dat.M, dat.L, dat1, calendarType);
    dat.Y = dat1.Y;
    dat.M = dat1.M;
    dat.L = dat1.L;
  }
}

// Converts a Gregorian date and time (hour as fraction of 24) to a Julian day
// number (fractional Decimal). Uses the algorithm from the US Naval Observatory.
// See: https://en.wikipedia.org/wiki/Julian_day#Converting_Gregorian_calendar_date_to_Julian_Day_Number
export function psa_jd(
  year: number,
  month: number,
  day: number,
  hour: number,
): Decimal {
  const a = int_div(month - 14, 12);
  return D(int_div(1461 * (year + 4800 + a), 4))
    .plus(int_div(367 * (month - 2 - 12 * a), 12))
    .minus(int_div(3 * int_div(year + 4900 + a, 100), 4))
    .plus(day)
    .minus(32075)
    .minus("0.5")
    .plus(D(hour).div(24));
}

// Converts a Gregorian date to a Julian day number (integer).
// See: https://en.wikipedia.org/wiki/Julian_day#Converting_Gregorian_calendar_date_to_Julian_Day_Number
export function g2jdn(yy: number, mm: number, dd: number) {
  const a = int_div(14 - mm, 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  return (
    dd +
    int_div(153 * m + 2, 5) +
    365 * y +
    int_div(y, 4) -
    int_div(y, 100) +
    int_div(y, 400) -
    32045
  ); //+68/86400??
}

// Converts a Julian day number to day of week (0=Sunday, 1=Monday, ..., 6=Saturday).
// See: https://en.wikipedia.org/wiki/Julian_day#Finding_day_of_week_given_Julian_day_number
export function day_of_week(jdn: number) {
  return (jdn + 1) % 7;
}

// Converts a Julian day number to a Gregorian date {year, month, day}.
// Uses the algorithm from Richards (2013) via the proleptic Gregorian calendar.
// See: https://en.wikipedia.org/wiki/Julian_day#Julian_or_Gregorian_calendar_from_Julian_day_number
export function gregorian_date(jdn: number) {
  const f = jdn + 1401 + int_div(int_div(4 * jdn + 274277, 146097) * 3, 4) - 38;
  const e = 4 * f + 3;
  let h = int_div(e % 1461, 4);
  h = 5 * h + 2;
  const d = int_div(h % 153, 5) + 1;
  const m = ((int_div(h, 153) + 2) % 12) + 1;
  const y = int_div(e, 1461) - 4716 + int_div(14 - m, 12);
  const dat = { year: y, month: m, day: d };
  return dat;
}

// Alternative Julian day number to Gregorian date conversion.
// NOTE: This duplicates `gregorian_date()` using a different algorithm.
// Consider removing one to avoid inconsistencies.
// See: https://en.wikipedia.org/wiki/Julian_day#Julian_or_Gregorian_calendar_from_Julian_day_number
export function jd2g(jd: number) {
  const gg = Math.floor(Math.floor((jd - 4479.5) / 36524.25) * 0.75 + 0.5) - 37;
  const n = jd + gg;
  const dd = Math.floor((n - 59.25) % 365.25);
  return {
    year: Math.floor(n / 365.25) - 4712,
    month: ((Math.floor((dd + 0.5) / 30.6) + 2) % 12) + 1,
    day: Math.floor((dd + 0.5) % 30.6) + 1,
  };
}

// Alternative Julian day number to Gregorian date conversion that correctly handles
// dates before the Gregorian reform (October 15, 1582). Uses the proleptic
// Gregorian calendar for all dates, ensuring consistency across the reform boundary.
// See: https://en.wikipedia.org/wiki/Julian_day#Julian_or_Gregorian_calendar_from_Julian_day_number
export function jd2g_actual(jd: number) {
  const isGregorian = jd >= 2299161;
  let year, month, day;

  if (isGregorian) {
    const gg =
      Math.floor(Math.floor((jd - 4479.5) / 36524.25) * 0.75 + 0.5) - 37;
    const n = jd + gg;
    const dd = Math.floor((n - 59.25) % 365.25);
    year = Math.floor(n / 365.25) - 4712;
    month = ((Math.floor((dd + 0.5) / 30.6) + 2) % 12) + 1;
    day = Math.floor((dd + 0.5) % 30.6) + 1;
  } else {
    // Julian calendar
    const n = jd;
    const dd = Math.floor((n - 59.25) % 365.25);
    year = Math.floor(n / 365.25) - 4712;
    month = ((Math.floor((dd + 0.5) / 30.6) + 2) % 12) + 1;
    day = Math.floor((dd + 0.5) % 30.6) + 1;
  }

  return { year, month, day };
}
