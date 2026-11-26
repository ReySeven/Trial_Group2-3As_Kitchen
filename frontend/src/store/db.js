const KEY = '3a_kitchen_db';
const SESSION = '3a_kitchen_user';

export const esc = s =>
  String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const M = n =>
  '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const pad = n => String(n).padStart(2, '0');
export const ago = n => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
};

export const today = ago(0);
export const tmr = ago(-1);
export const fd = d => new Date(d + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
export const STEPS = ['Pending', 'Accepted', 'Out for delivery', 'Delivered'];
export const HOME = { c: '/menu', a: '/admin/orders', r: '/rider' };

function seed() {
  return {
    next: 1005,
    users: [
      { e: 'juan@example.com', p: 'demo123', r: 'c', n: 'Juan Dela Cruz' },
      { e: 'admin@3a.ph',      p: 'admin123', r: 'a', n: 'Admin' },
      { e: 'mark@3a.ph',       p: 'rider123', r: 'r', n: 'Mark Reyes' },  
    ],
    riders: [
      { id: 1, n: 'Mark Reyes',   e: 'mark@3a.ph',  m: '0917 000 0001', s: 'Active' },
      { id: 2, n: 'Paolo Cruz',   e: 'paolo@3a.ph', m: '0917 000 0002', s: 'Active' },
      { id: 3, n: 'Leo Mendoza',  e: 'leo@3a.ph',   m: '0917 000 0003', s: 'Active' },
      { id: 4, n: 'Ben Torres',   e: 'ben@3a.ph',   m: '0917 000 0004', s: 'Resigned' },
    ],
    items: [
      { id: 1, n: 'Family Fiesta Tray',  d: 'Serves 8–10: adobo, pancit, lumpia, rice', p: 1850, c: 900,  a: 1 },
      { id: 2, n: 'Birthday Party Set',  d: 'Serves 15–20: four mains and dessert',      p: 3400, c: 1700, a: 1 },
      { id: 3, n: 'Beef Caldereta Tray', d: 'Serves 8–10 in rich tomato sauce',           p: 1600, c: 800,  a: 1 },
      { id: 4, n: 'Pancit Canton Tray',  d: 'Serves 6–8 with vegetables',                 p: 900,  c: 400,  a: 1 },
      { id: 5, n: 'Office Lunch Box',    d: 'Serves 10 · currently sold out',              p: 2200, c: 1100, a: 0 },
    ],
    orders: [
      { id: 1004, e: 'ana@x.com',         cn: 'Ana Garcia',     it: [[1,1]], sub: 1850, disc: 0, fee: 80, total: 1930, st: 'Accepted',        dt: ago(0), addr: 'Sample address, Barangay, City' },
      { id: 1003, e: 'maria@x.com',       cn: 'Maria Santos',   it: [[2,1]], sub: 3400, disc: 0, fee: 80, total: 3480, st: 'Out for delivery', rider: 'Mark Reyes', log: [['Today 9:05 AM','Order placed by customer'],['Today 9:20 AM','Accepted by admin'],['Today 9:35 AM','Assigned to Mark Reyes']], dt: ago(0), addr: 'Sample address, Barangay, City' },
      { id: 1002, e: 'juan@example.com',  cn: 'Juan Dela Cruz', it: [[5,1]], sub: 2200, disc: 0, fee: 80, total: 2280, st: 'Delivered',        rider: 'Mark Reyes', cash: 1, proof: 'photo.jpg', dt: ago(2), addr: 'Sample address' },
      { id: 1001, e: 'juan@example.com',  cn: 'Juan Dela Cruz', it: [[3,1]], sub: 1600, disc: 0, fee: 80, total: 1680, st: 'Declined',         why: 'Item out of stock for the chosen date', dt: ago(5) },
      { id: 999,  e: 'maria@x.com',       cn: 'Maria Santos',   it: [[1,2]], sub: 3700, disc: 0, fee: 80, total: 3780, st: 'Delivered',        rider: 'Mark Reyes', cash: 1, proof: 'p.jpg', dt: ago(4), fb: 1 },
      { id: 997,  e: 'ana@x.com',         cn: 'Ana Garcia',     it: [[2,1],[4,1]], sub: 4300, disc: 0, fee: 80, total: 4380, st: 'Delivered',  rider: 'Leo Mendoza', cash: 1, proof: 'p.jpg', dt: ago(20), fb: 1 },
    ],
    promos: [
      { code: '3A-FIESTA10', t: '%', v: 10, min: 1500, x: '2026-12-31', on: 1, lim: 100, used: 24, once: 1 },
      { code: '3A-BDAY200',  t: '₱', v: 200, min: 2000, x: '2026-12-15', on: 1, lim: 50,  used: 9,  once: 1 },
      { code: '3A-WELCOME',  t: '%', v: 5,   min: 500,  x: '2026-12-31', on: 1, lim: null, used: 3, once: 1 },
      { code: '3A-FULL',     t: '%', v: 10,  min: 500,  x: '2026-12-31', on: 1, lim: 5,   used: 5,  once: 1 },
      { code: '3A-OCT15',    t: '%', v: 15,  min: 1000, x: '2026-10-31', on: 1, lim: 40,  used: 40, once: 1 },
      { code: '3A-TODAY',    t: '₱', v: 100, min: 500,  x: today,        on: 1, lim: null, used: 0, once: 1 },
    ],
    exp: [
      { id: 1, d: 'Gas and equipment use', a: 1400, t: ago(3) },
      { id: 2, d: 'Rider transportation',  a: 900,  t: ago(15) },
    ],
    fb: [
      { o: 999, cn: 'Maria Santos', r: 4, t: 'Arrived a little late, but the food was great.', dt: ago(4) },
      { o: 997, cn: 'Ana Garcia',   r: 5, t: 'Always tasty. Will order again.',                dt: ago(19) },
    ],
  };
}

export function loadDB() {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
    return seed();
  } catch {
    return seed();
  }
}

export function saveDB(db) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
    return true;
  } catch {
    alert('Browser storage is full. Try removing some large photos and save again.');
    return false;
  }
}

export function resetDB() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(SESSION);
  sessionStorage.clear();
}

export function getSession() {
  return localStorage.getItem(SESSION) || null;
}

export function setSession(email) {
  localStorage.setItem(SESSION, email);
}

export function clearSession() {
  localStorage.removeItem(SESSION);
  sessionStorage.removeItem('3a_cart');
}

export function getCurrentUser(db) {
  const email = getSession();
  return email ? db.users.find(u => u.e === email) || null : null;
}

export const getItem = (db, id) =>
  db.items.find(x => x.id == id) || { id, n: '(Removed item)', d: '', p: 0, c: 0, a: 0, del: 1 };

export const done = p => p.x <= today || (p.lim && p.used >= p.lim);
export const live = p => p.on && !done(p);

export const freeRiders = db =>
  db.riders
    .filter(r => r.s === 'Active' && !db.orders.some(o => o.rider === r.n && o.st === 'Out for delivery'))
    .map(r => r.n);

export function chkPromo(db, code, sub, email) {
  const p = db.promos.find(x => x.code === code);
  if (!p || !p.on || p.x <= today) return { err: 'This promo code is invalid or has expired.' };
  if (p.lim && p.used >= p.lim) return { err: 'This promo code has reached its usage limit.' };
  if (p.once && db.orders.some(o => o.e === email && o.code === p.code && o.st !== 'Declined'))
    return { err: 'You have already used this code.' };
  if (sub < p.min) return { err: `Minimum order for this code is ${M(p.min)}.` };
  return { p, disc: Math.min(sub, Math.round(p.t === '%' ? sub * p.v / 100 : p.v)) };
}

export function addLog(order, text) {
  order.log = order.log || [];
  order.log.push([new Date().toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }), text]);
}

export function refund(db, order) {
  const pr = order.code && db.promos.find(x => x.code === order.code);
  if (pr && pr.used > 0) pr.used--;
}

export const flash = msg => sessionStorage.setItem('3a_note', msg);
export const takeNote = () => {
  const m = sessionStorage.getItem('3a_note');
  sessionStorage.removeItem('3a_note');
  return m || '';
};
