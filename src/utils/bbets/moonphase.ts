const EPOCH = {
  JD: 2451545, //J2000
} as const;

const PHASE = {
  EPS: 0.0001,
  EPSD: 0.001,
} as const;

export const MICHID = {
  RA: 0.9922, //rad
  RAR: 0.1579, //rev
  DEC: 0.4209,
};

//Julian date to JS date object
export function JSDate(jd: number): Date {
  const jj = jd - 2440587.5; //days since 1970/1/1 00:00:00
  const dat = new Date(jj * 86400000); //milliseconds since 1970/1/1 00:00:00
  return dat;
}

//fractional part
export function frac_part(a: number): number {
  return a - Math.floor(a);
}

//Moon phase, n = jd - 2451545
export function moonphase_fast(n: number): number {
  const Omega = 2.1429 - 0.0010394594 * n;
  const mls = 4.895063 + 0.017202791698 * n; //mean longitude
  const mas = 6.24006 + 0.0172019699 * n; //mean anomaly
  const els =
    mls +
    0.03341607 * Math.sin(mas) +
    0.00034894 * Math.sin(mas * 2) -
    0.0001134 -
    0.0000203 * Math.sin(Omega); //ecliptic longitude
  const t = n / 36525.0;
  const mlm = 0.606433 + 1336.855225 * t; //mean longitude
  const l = Math.PI * 2 * frac_part(0.374897 + 1325.55241 * t); //mean anomaly
  const ls = Math.PI * 2 * frac_part(0.993133 + 99.997361 * t); //Sun's mean anomaly
  const D = Math.PI * 2 * frac_part(0.827361 + 1236.853086 * t); //diff
  const F = Math.PI * 2 * frac_part(0.259086 + 1342.227825 * t); //distance from ascending node
  const dL =
    22640 * Math.sin(l) -
    4586 * Math.sin(l - 2 * D) +
    2370 * Math.sin(2 * D) +
    769 * Math.sin(2 * l) -
    668 * Math.sin(ls) -
    412 * Math.sin(2 * F) -
    212 * Math.sin(2 * l - 2 * D) -
    206 * Math.sin(l + ls - 2 * D) +
    192 * Math.sin(l + 2 * D) -
    165 * Math.sin(ls - 2 * D) -
    125 * Math.sin(D) -
    110 * Math.sin(l + ls) +
    148 * Math.sin(l - ls) -
    55 * Math.sin(2 * F - 2 * D);
  const elm = mlm + dL / 1296000.0; //ecliptic longitude
  const p = frac_part(elm - els / (Math.PI * 2));
  return p;
}

//Moon right ascension, n = jd - 2451545
export function moon_ra(n: number): number {
  const t = n / 36525;
  const mlon = (0.606433 + 1336.855225 * t) * Math.PI * 2; //mean longitude
  const man = (0.374897 + 1325.55241 * t) * Math.PI * 2; //mean anomaly
  const l = man % (Math.PI * 2);
  const ls = Math.PI * 2 * frac_part(0.993133 + 99.997361 * t); //Sun's mean anomaly
  const D = Math.PI * 2 * frac_part(0.827361 + 1236.853086 * t); //diff
  const F = Math.PI * 2 * frac_part(0.259086 + 1342.227825 * t); //distance from ascending node
  const dL =
    22640 * Math.sin(l) -
    4586 * Math.sin(l - 2 * D) +
    2370 * Math.sin(2 * D) +
    769 * Math.sin(2 * l) -
    668 * Math.sin(ls) -
    412 * Math.sin(2 * F) -
    212 * Math.sin(2 * l - 2 * D) -
    206 * Math.sin(l + ls - 2 * D) +
    192 * Math.sin(l + 2 * D) -
    165 * Math.sin(ls - 2 * D) -
    125 * Math.sin(D) -
    110 * Math.sin(l + ls) +
    148 * Math.sin(l - ls) -
    55 * Math.sin(2 * F - 2 * D);
  const S =
    F + ((dL + 412 * Math.sin(2 * F) + 541 * Math.sin(ls)) * Math.PI) / 648000;
  const h = F - 2 * D;
  const N =
    -526 * Math.sin(h) +
    44 * Math.sin(l + h) -
    31 * Math.sin(-l + h) -
    23 * Math.sin(ls + h) +
    11 * Math.sin(-ls + h) -
    25 * Math.sin(-2 * l + F) +
    21 * Math.sin(-l + F);
  let lon = mlon + (dL * Math.PI) / 648000; //ecliptic longitude
  lon %= Math.PI * 2;
  const lat = ((18520 * Math.sin(S) + N) * Math.PI) / 648000; //ecliptic latitude
  const Omega = 2.1429 - 0.0010394594 * n;
  const eps = 0.4090928 - 6.214e-9 * n + 0.0000396 * Math.cos(Omega); //obliquity
  const sl = Math.sin(lon);
  const cl = Math.cos(lon);
  const sb = Math.sin(lat);
  const cb = Math.cos(lat);
  const se = Math.sin(eps);
  const ce = Math.cos(eps);
  const ra = Math.atan2(ce * sl * cb - se * sb, cl * cb);
  return frac_part(ra / (Math.PI * 2)); //rev
}

//Moon ecliptic longitude, n = jd - 2451545
export function moon_lon(n: number): number {
  const t = n / 36525;
  const mlon = (0.606433 + 1336.855225 * t) * Math.PI * 2; //mean longitude
  const man = (0.374897 + 1325.55241 * t) * Math.PI * 2; //mean anomaly
  const l = man % (Math.PI * 2);
  const ls = Math.PI * 2 * frac_part(0.993133 + 99.997361 * t); //Sun's mean anomaly
  const D = Math.PI * 2 * frac_part(0.827361 + 1236.853086 * t); //diff
  const F = Math.PI * 2 * frac_part(0.259086 + 1342.227825 * t); //distance from ascending node
  const dL =
    22640 * Math.sin(l) -
    4586 * Math.sin(l - 2 * D) +
    2370 * Math.sin(2 * D) +
    769 * Math.sin(2 * l) -
    668 * Math.sin(ls) -
    412 * Math.sin(2 * F) -
    212 * Math.sin(2 * l - 2 * D) -
    206 * Math.sin(l + ls - 2 * D) +
    192 * Math.sin(l + 2 * D) -
    165 * Math.sin(ls - 2 * D) -
    125 * Math.sin(D) -
    110 * Math.sin(l + ls) +
    148 * Math.sin(l - ls) -
    55 * Math.sin(2 * F - 2 * D);
  let lon = mlon + (dL * Math.PI) / 648000; //ecliptic longitude
  lon %= Math.PI * 2;
  return lon; //rad
}

//solve moonphase(j-2451545)=pp where j1<=j<=j2
export function find_event(j1: number, j2: number, pp: number): number {
  let n1 = j1 - 2451545;
  let n2 = j2 - 2451545;
  let p1 = moonphase_fast(n1) - pp;
  if (Math.abs(p1) <= PHASE.EPS) return n1;
  let p2 = moonphase_fast(n2) - pp;
  if (Math.abs(p2) <= PHASE.EPS) return n2;
  if (p1 * p2 > 0) return -EPOCH.JD - 1;
  let nn = n1 - (p1 * (n2 - n1)) / (p2 - p1);
  let pn = moonphase_fast(nn) - pp;
  while (Math.abs(pn) > PHASE.EPS) {
    if (p1 * pn > 0) {
      p1 = pn;
      n1 = nn;
    } else {
      p2 = pn;
      n2 = nn;
    }
    nn = n1 - (p1 * (n2 - n1)) / (p2 - p1);
    if (n2 - n1 <= PHASE.EPSD) break;
    pn = moonphase_fast(nn) - pp;
  }
  return nn + 2451545;
}

//range in (-0.5,0.5)
export function moonphase0(n: number): number {
  return frac_part(moonphase_fast(n) + 0.5) - 0.5;
}

//solve moonphase(j-2451545)=pp where j1<=j<=j2
export function find_newmoon(j1: number, j2: number, pp: number): number {
  let n1 = j1 - 2451545;
  let n2 = j2 - 2451545;
  let p1 = moonphase0(n1) - pp;
  if (Math.abs(p1) <= PHASE.EPS) return n1;
  let p2 = moonphase0(n2) - pp;
  if (Math.abs(p2) <= PHASE.EPS) return n2;
  if (p1 * p2 > 0) return -EPOCH.JD - 1;
  let nn = n1 - (p1 * (n2 - n1)) / (p2 - p1);
  let pn = moonphase0(nn) - pp;
  while (Math.abs(pn) > PHASE.EPS) {
    if (p1 * pn > 0) {
      p1 = pn;
      n1 = nn;
    } else {
      p2 = pn;
      n2 = nn;
    }
    nn = n1 - (p1 * (n2 - n1)) / (p2 - p1);
    if (n2 - n1 <= PHASE.EPSD) break;
    pn = moonphase0(nn) - pp;
  }
  return nn + 2451545;
}

//solve moon_ra(j-2451545)=pp where j1<=j<=j2
export function find_moon_ra(j1: number, j2: number, pp: number): number {
  if (j1 > j2) return -EPOCH.JD - 1;
  let n1 = j1 - 2451545;
  let n2 = j2 - 2451545;
  let p1 = moon_ra(n1) - pp;
  if (Math.abs(p1) <= PHASE.EPS) return n1;
  let p2 = moon_ra(n2) - pp;
  if (Math.abs(p2) <= PHASE.EPS) return n2;
  if (p2 < p1) p1 -= 1;
  while (p1 * p2 > 0) {
    n2 -= 5;
    if (n2 < n1) return -EPOCH.JD - 1;
    p2 = moon_ra(n2) - pp;
    if (p2 < p1) p1 -= 1;
  }
  let nn = n1 - (p1 * (n2 - n1)) / (p2 - p1);
  let pn = moon_ra(nn) - pp;
  if (p2 < pn) pn -= 1;
  while (Math.abs(pn) > PHASE.EPS) {
    if (p1 * pn > 0) {
      p1 = pn;
      n1 = nn;
    } else {
      p2 = pn;
      n2 = nn;
    }
    nn = n1 - (p1 * (n2 - n1)) / (p2 - p1);
    if (n2 - n1 <= PHASE.EPSD) break;
    pn = moon_ra(nn) - pp;
    if (p2 < pn) pn -= 1;
  }
  return nn + 2451545;
}
