const { useState, useEffect, useRef } = React;

/* ---------- Icons ---------- */
const ip = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "var(--accent-icon)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const IconHouse = (p) => (<svg {...ip} {...p}><path d="M3 11 12 4l9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>);
const IconCap = (p) => (<svg {...ip} {...p}><path d="M12 4 2 9l10 5 10-5-10-5Z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" /><path d="M22 9v6" /></svg>);
const IconTest = (p) => (<svg {...ip} {...p}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" /><path d="m9 13 2 2 4-4" /></svg>);
const IconArbeit = (p) => (<svg {...ip} {...p}><path d="M12 6c-1.8-1.3-4.2-2-7-2v13c2.8 0 5.2.7 7 2 1.8-1.3 4.2-2 7-2V4c-2.8 0-5.2.7-7 2Z" /><path d="M12 6v13" /></svg>);
const IconGrid = (p) => (<svg {...ip} {...p}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>);
const IconList = (p) => (<svg {...ip} {...p}><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="3" cy="6" r="1" /><circle cx="3" cy="12" r="1" /><circle cx="3" cy="18" r="1" /></svg>);
const IconCheck = (p) => (<svg {...ip} {...p}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="m8 12 3 3 5-6" /></svg>);
const IconBoard = (p) => (<svg {...ip} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M15 4v16" /></svg>);
const IconExpand = (p) => (<svg {...ip} {...p}><path d="M9 4H5a1 1 0 0 0-1 1v4M15 4h4a1 1 0 0 1 1 1v4M9 20H5a1 1 0 0 1-1-1v-4M15 20h4a1 1 0 0 0 1-1v-4" /></svg>);
const IconImage = (p) => (<svg {...ip} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="m4 17 5-5 3 3 4-4 4 4" /></svg>);
const IconNote = (p) => (<svg {...ip} {...p}><path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M15 3v4h4" /></svg>);
const IconMenu = (p) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.4" strokeLinecap="round" {...p}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="14" y2="15" /></svg>);

/* ---------- Data / constants ---------- */
const SUBJECT_COLORS = { mathe: "#2563EB", mathematik: "#2563EB", deutsch: "#DC2626", englisch: "#EAB308", spanisch: "#F97316", sport: "#FFFFFF" };
const DEFAULT_SUBJECT_COLOR = "#9CA3AF";
const SUBJECT_SUGGESTIONS = ["Mathe", "Deutsch", "Englisch", "Spanisch", "Sport", "Physik", "Chemie", "Biologie", "Geschichte", "Erdkunde", "Musik", "Kunst"];
const subjectColor = (fach) => !fach ? DEFAULT_SUBJECT_COLOR : (SUBJECT_COLORS[fach.trim().toLowerCase()] || DEFAULT_SUBJECT_COLOR);
const isWhiteSubject = (fach) => !!fach && fach.trim().toLowerCase() === "sport";
const chipStyle = (fach) => {
  const c = subjectColor(fach);
  if (isWhiteSubject(fach)) return { background: "#FFFFFF", color: "#333333", border: "1.5px solid #9CA3AF" };
  if (!fach) return { background: "#E4E4E9", color: "#333338", border: "1px solid #D2D2D8" };
  return { background: c + "2E", color: c, border: `1px solid ${c}77`, fontWeight: 800 };
};
const highlightStyle = (fach) => {
  if (!fach) return {};
  if (isWhiteSubject(fach)) return { background: "#FFFFFF", border: "1.5px solid #9CA3AF" };
  const c = subjectColor(fach);
  return { background: c + "30" };
};
const fachTextColor = (fach) => (isWhiteSubject(fach) ? "#4B5563" : subjectColor(fach));

const ART_TYPES = [
  { id: "test", label: "Test", Icon: IconTest },
  { id: "arbeit", label: "Arbeit", Icon: IconArbeit },
  { id: "auswertung", label: "Studienzeit-Auswertung", Icon: IconCap },
  { id: "hausaufgabe", label: "Hausaufgabe", Icon: IconHouse },
  { id: "sonstiges", label: "Sonstiges", Icon: null },
];
const artById = (id) => ART_TYPES.find((a) => a.id === id) || ART_TYPES[ART_TYPES.length - 1];
const STATUSES = [{ id: "upcoming", label: "Upcoming" }, { id: "progress", label: "In Progress" }, { id: "submitted", label: "Submitted" }];
const PRIORITIES = [
  { id: "low", label: "Low", bg: "#EAF4FD", ink: "#2F6690" },
  { id: "medium", label: "Medium", bg: "#FDF8E8", ink: "#8A6D1E" },
  { id: "high", label: "High", bg: "#FDEDEC", ink: "#B23B35" },
];
const prioById = (id) => PRIORITIES.find((p) => p.id === id);
const HW_MODES = [
  { id: "itslearning", label: "Auf Itslearning hochladen", bg: "#EAF4FD", ink: "#2F6690" },
  { id: "unterricht", label: "Im Unterricht auswerten", bg: "#FDF8E8", ink: "#8A6D1E" },
];
const hwModeById = (id) => HW_MODES.find((m) => m.id === id);
const QUICK_ADD_TYPES = [
  { id: "exam", label: "Add new Exam" },
  { id: "assignment", label: "Add new Assignment" },
  { id: "task", label: "Add new Task" },
  { id: "studienzeit", label: "Add new Studienzeit" },
  { id: "hausaufgabe", label: "Add new Homework" },
];

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKDAYS_FULL = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const WEEKDAY_LONG = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const MONTHS = ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const MONTHS_EN_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_EN_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const pad = (n) => String(n).padStart(2, "0");
const isoOf = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const isoFromDate = (d) => isoOf(d.getFullYear(), d.getMonth(), d.getDate());
const todayDate = new Date();
const TODAY_ISO = isoFromDate(todayDate);
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const addDays = (d, n) => { const nd = new Date(d); nd.setDate(nd.getDate() + n); return nd; };
const mondayOf = (d) => { const nd = new Date(d); const dow = (nd.getDay() + 6) % 7; nd.setDate(nd.getDate() - dow); return nd; };
const dueShort = (iso) => { const d = new Date(iso + "T00:00:00"); return `Due: ${MONTHS_EN_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
const examDateLong = (iso) => { const d = new Date(iso + "T00:00:00"); return `${MONTHS_EN_FULL[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
const shortBadge = (iso) => { const d = new Date(iso + "T00:00:00"); return `${MONTHS_EN_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
const daysUntil = (iso) => { const d = new Date(iso + "T00:00:00"); const t = new Date(TODAY_ISO + "T00:00:00"); return Math.round((d - t) / 86400000); };

function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function buildMonthMatrix(year, month) {
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const total = daysInMonth(year, month);
  const prevTotal = daysInMonth(year, month - 1 < 0 ? 11 : month - 1);
  const prevYear = month - 1 < 0 ? year - 1 : year, prevMonth = month - 1 < 0 ? 11 : month - 1;
  const nextYear = month + 1 > 11 ? year + 1 : year, nextMonth = month + 1 > 11 ? 0 : month + 1;
  const cells = [];
  for (let i = firstDow - 1; i >= 0; i--) { const d = prevTotal - i; cells.push({ y: prevYear, m: prevMonth, d, cur: false, iso: isoOf(prevYear, prevMonth, d) }); }
  for (let d = 1; d <= total; d++) cells.push({ y: year, m: month, d, cur: true, iso: isoOf(year, month, d) });
  let nd = 1;
  while (cells.length < 42) { cells.push({ y: nextYear, m: nextMonth, d: nd, cur: false, iso: isoOf(nextYear, nextMonth, nd) }); nd++; }
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function resizeImageFile(file, maxW = 1200, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const isDoneAuswertung = (e) => (e.art === "auswertung" && e.status === "submitted") || (e.art === "hausaufgabe" && e.done);

/* ---------- App ---------- */
function App() {
  const [data, setData] = useState({ events: [], todos: {}, bannerImg: null });
  const [loaded, setLoaded] = useState(false);
  const [saveErr, setSaveErr] = useState(false);
  const [calMode, setCalMode] = useState("monat");
  const [curYear, setCurYear] = useState(todayDate.getFullYear());
  const [curMonth, setCurMonth] = useState(todayDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(TODAY_ISO);
  const [weekStart, setWeekStart] = useState(mondayOf(todayDate));
  const [calFull, setCalFull] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState(null);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [szModalStatus, setSzModalStatus] = useState(null); // status id or null
  const [entryModal, setEntryModal] = useState(null); // {date, event|null}
  const [viewAll, setViewAll] = useState(null);
  const [confirmDeleteSz, setConfirmDeleteSz] = useState(false);
  const [szFullOpen, setSzFullOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("planner-data", false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setData({ events: parsed.events || [], todos: parsed.todos || {}, bannerImg: parsed.bannerImg || null });
        }
      } catch (e) { /* noch keine gespeicherten Daten */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.set("planner-data", JSON.stringify(data), false);
        if (!cancelled) setSaveErr(!res);
      } catch (e) {
        try { const retry = await window.storage.set("planner-data", JSON.stringify(data), false); if (!cancelled) setSaveErr(!retry); }
        catch (e2) { if (!cancelled) setSaveErr(true); }
      }
    })();
    return () => { cancelled = true; };
  }, [data, loaded]);

  const addEvent = ({ date, fach, art, title, time, info, status, priority, mode, done }) => setData((p) => ({
    ...p, events: [...p.events, { id: uid(), date, fach: fach || "", art, title, time: time || "", info: info || "", status: status || (art === "auswertung" ? "upcoming" : undefined), priority: priority || null, mode: mode || null, done: done || false }],
  }));
  const deleteEvent = (id) => setData((p) => ({ ...p, events: p.events.filter((e) => e.id !== id) }));
  const updateEvent = (id, patch) => setData((p) => ({ ...p, events: p.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  const setStatus = (id, statusId) => setData((p) => ({ ...p, events: p.events.map((e) => (e.id === id ? { ...e, status: statusId } : e)) }));
  const addTodo = (date, todo) => setData((p) => ({ ...p, todos: { ...p.todos, [date]: [...(p.todos[date] || []), { id: uid(), done: false, ...todo }] } }));
  const updateTodo = (date, id, patch) => setData((p) => ({ ...p, todos: { ...p.todos, [date]: (p.todos[date] || []).map((t) => (t.id === id ? { ...t, ...patch } : t)) } }));
  const toggleTodo = (date, id) => setData((p) => ({ ...p, todos: { ...p.todos, [date]: (p.todos[date] || []).map((t) => (t.id === id ? { ...t, done: !t.done } : t)) } }));
  const deleteTodo = (date, id) => setData((p) => ({ ...p, todos: { ...p.todos, [date]: (p.todos[date] || []).filter((t) => t.id !== id) } }));
  const setBannerImg = (img) => setData((p) => ({ ...p, bannerImg: img }));
  const clearAllStudienzeiten = () => setData((p) => ({ ...p, events: p.events.map((e) => (e.art === "auswertung" ? { ...e, hiddenFromKanban: true } : e)) }));
  const eventsFor = (iso) => data.events.filter((e) => e.date === iso);

  const goMonth = (delta) => { let m = curMonth + delta, y = curYear; if (m < 0) { m = 11; y -= 1; } if (m > 11) { m = 0; y += 1; } setCurMonth(m); setCurYear(y); };
  const openFullCal = (iso, y, m) => { if (iso) { setSelectedDate(iso); setCurYear(y); setCurMonth(m); } setCalMode("monat"); setCalFull(true); setSideOpen(false); };

  const handleQuickAdd = (title, info, mode, fach, date, art) => {
    const t = quickAddType;
    if (t === "exam") addEvent({ date: date || TODAY_ISO, art: art || "test", title, info, fach });
    else if (t === "assignment") addEvent({ date: TODAY_ISO, art: "arbeit", title, info, fach, priority: null });
    else if (t === "task") addTodo(TODAY_ISO, { title });
    else if (t === "hausaufgabe") addEvent({ date: TODAY_ISO, art: "hausaufgabe", title, info, mode, fach });
    setQuickAddType(null);
    setSideOpen(false);
  };

  const handleStudienzeitSave = ({ title, fach, date, time }) => {
    addEvent({ date, fach, time, art: "auswertung", title, status: szModalStatus || "upcoming" });
    setSzModalStatus(null);
    setSideOpen(false);
  };

  const openSidebarQuickAdd = (typeId) => {
    if (typeId === "studienzeit") setSzModalStatus("upcoming");
    else setQuickAddType(typeId);
  };

  const openNewEntry = (iso) => { setSelectedDate(iso); setEntryModal({ date: iso, event: null }); };
  const openEditEntry = (e) => { setSelectedDate(e.date); setEntryModal({ date: e.date, event: e }); };
  const saveEntry = (payload) => {
    if (entryModal.event) updateEvent(entryModal.event.id, payload);
    else addEvent({ date: entryModal.date, ...payload });
    setEntryModal(null);
  };

  return (
    <div className="db-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap');
        html, body { margin:0; }
        .db-root { --bg:#FFFFFF; --card:#FFFFFF; --rowbg:#F8F8F9; --dayblock:#F6F6F8; --border:#EFEFF2;
          --ink:#1A1A1A; --soft:#6B6B72; --pill-pink:#FCEEF1; --pill-pink-ink:#9C4F68;
          --pill-blue:#EAF4FD; --pill-blue-ink:#2F6690; --pill-yellow:#FDF8E8; --pill-yellow-ink:#8A6D1E;
          --primary:#2A2A2A; --primary-dark:#000000; --accent-icon:#4A4A50; --due:#FCEEF1; --due-ink:#9C4F68; --done:#2A2A2A;
          height:100dvh; width:100%; background:var(--bg); color:var(--ink); font-family:'Work Sans',sans-serif;
          overflow:hidden; }
        .db-root * { box-sizing:border-box; }
        .db-main { display:grid; height:100%; padding:10px; gap:9px;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 130px 1fr 1fr;
          grid-template-areas:
            "banner banner banner banner banner banner banner banner banner banner banner banner"
            "mini mini week week week week week upcoming upcoming upcoming exams exams"
            "homework homework homework todos todos todos kanban kanban kanban kanban kanban kanban";
        }
        .w-banner{grid-area:banner;} .w-mini{grid-area:mini;} .w-week{grid-area:week;}
        .w-upcoming{grid-area:upcoming;} .w-exams{grid-area:exams;} .w-kanban{grid-area:kanban;} .w-todos{grid-area:todos;} .w-homework{grid-area:homework;}
        .db-cardwrap { display:flex; flex-direction:column; min-height:0; }
        .db-title { font-family:'Fraunces',serif; font-weight:700; font-size:19px; margin:0; }
        .db-sub { color:var(--soft); font-size:11.5px; margin:0; }
        .db-pillrow { display:flex; align-items:center; justify-content:space-between; border-radius:11px 11px 0 0; background:var(--pill-blue); padding:8px 12px; flex-shrink:0; }
        .db-pillrow.pink { background:var(--pill-pink); }
        .db-pillrow.yellow { background:var(--pill-yellow); }
        .db-pill { display:flex; align-items:center; gap:7px; font-family:'Fraunces',serif; font-weight:700; font-size:12.5px; color:var(--pill-blue-ink); }
        .db-pillrow.pink .db-pill { color:var(--pill-pink-ink); }
        .db-pillrow.yellow .db-pill { color:var(--pill-yellow-ink); }
        .db-pill svg { width:14px; height:14px; }
        .view-all { font-size:10.5px; font-weight:700; cursor:pointer; color:inherit; opacity:.85; }
        .db-card { background:var(--card); border:1px solid var(--border); border-top:none; border-radius:0 0 11px 11px;
          padding:10px; flex:1; min-height:0; overflow-y:auto; }
        .db-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .db-between { justify-content:space-between; }
        .db-btn { font-family:'Work Sans',sans-serif; font-weight:700; font-size:11.5px; cursor:pointer; border:1px solid var(--border);
          background:#fff; color:var(--ink); border-radius:7px; padding:4px 9px; }
        .db-btn:hover { border-color:var(--primary); }
        .db-btn.primary { background:var(--primary); border-color:var(--primary); color:#fff; }
        .db-btn.primary:hover { background:var(--primary-dark); }
        .db-chip { display:inline-flex; align-items:center; gap:3px; font-size:9.5px; font-weight:700; border-radius:5px; padding:1px 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .db-chip svg { width:9px; height:9px; flex-shrink:0; }
        .db-eventline { display:flex; align-items:center; gap:7px; padding:6px 7px; border-radius:8px; background:var(--rowbg); margin-bottom:6px; font-size:12.5px; font-weight:600; cursor:pointer; }
        .db-eventline svg { width:14px; height:14px; flex-shrink:0; }
        .db-todo input[type=checkbox] { width:15px; height:15px; accent-color:var(--done); cursor:pointer; flex-shrink:0; }
        .db-badge { font-size:9.5px; font-weight:700; background:var(--rowbg); color:var(--soft); border-radius:5px; padding:2px 7px; white-space:nowrap; }
        .db-badge.due { background:var(--due); color:var(--due-ink); }
        .db-iconbtn { background:none; border:none; cursor:pointer; color:var(--soft); font-size:13px; padding:1px 4px; }
        .db-iconbtn:hover { color:var(--pill-pink-ink); }
        .db-empty { color:var(--soft); font-size:11.5px; padding:6px 0; }
        .db-savewarn { position:fixed; bottom:8px; right:8px; font-size:11px; color:var(--pill-pink-ink); background:#fff; padding:4px 9px; border-radius:7px; border:1px solid var(--border); z-index:60; }
        .add-link { color:var(--pill-pink-ink); font-size:12px; font-weight:700; cursor:pointer; padding:6px 2px; }
        /* list-style widgets */
        .lw-item { background:var(--rowbg); border-radius:9px; padding:8px 10px; margin-bottom:7px; display:flex; align-items:flex-start; gap:8px; }
        .lw-item svg { width:16px; height:16px; flex-shrink:0; margin-top:2px; }
        .lw-item.done .lw-title { text-decoration:line-through; color:var(--soft); }
        .lw-main { flex:1; min-width:0; }
        .lw-fach { font-size:9.5px; font-weight:800; text-transform:uppercase; letter-spacing:.03em; margin-bottom:2px; }
        .lw-title { font-weight:700; font-size:13px; cursor:text; color:var(--ink); }
        .lw-sub { color:var(--soft); font-size:10.5px; margin-top:2px; cursor:text; font-weight:600; }
        .lw-right { display:flex; flex-direction:column; align-items:flex-end; gap:2px; flex-shrink:0; }
        .lw-days { font-family:'Fraunces',serif; font-weight:700; font-size:17px; cursor:text; }
        .lw-days-label { font-size:9.5px; color:var(--soft); font-weight:600; }
        .prio-picker { display:flex; gap:4px; }
        .prio-opt { border:none; border-radius:5px; padding:3px 8px; font-size:10px; font-weight:700; cursor:pointer; }
        /* press animation */
        .db-btn, .db-iconbtn, .fc-cell, .mc-day,
        .kb-card, .np-title span, .lw-title, .lw-sub, .lw-days, .add-link, .prio-opt, .qa-row, .side-item, .view-all, .db-chip {
          transition: transform .16s cubic-bezier(.4,0,.2,1);
        }
        .db-btn:active, .db-iconbtn:active, .fc-cell:active, .mc-day:active, .kb-card:active,
        .np-title span:active, .lw-title:active, .lw-sub:active, .lw-days:active, .add-link:active, .prio-opt:active,
        .qa-row:active, .side-item:active, .view-all:active, .db-chip:active {
          transform: scale(.94);
        }
        /* notepad (to-dos) */
        .notepad { position:relative; min-height:100%; padding-left:16px;
          background-image:
            repeating-linear-gradient(to bottom, transparent 0 27px, var(--border) 27px 28px),
            linear-gradient(var(--pill-pink), var(--pill-pink));
          background-repeat:repeat, no-repeat;
          background-size:100% 28px, 1px 100%;
          background-position:0 0, 9px 0;
        }
        .np-row { display:flex; align-items:center; gap:7px; height:28px; font-size:12.5px; font-weight:600; }
        .np-row.done .np-title span { text-decoration:line-through; color:var(--soft); }
        .np-row input[type=checkbox] { width:14px; height:14px; accent-color:var(--done); cursor:pointer; flex-shrink:0; }
        .np-title { flex:1; min-width:0; overflow:hidden; }
        .np-title span { cursor:text; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .np-title input { border:none; background:transparent; outline:none; width:100%; font:inherit; color:inherit; padding:0; }
        /* banner */
        .banner-box { position:relative; height:100%; border-radius:11px; overflow:hidden; border:1px solid var(--border); background:var(--dayblock);
          background-size:cover; background-position:center; display:flex; align-items:center; justify-content:center; min-height:56px; }
        .banner-btn { position:absolute; top:6px; right:8px; font-size:10.5px; font-weight:700; background:rgba(255,255,255,.9); color:var(--ink);
          border:1px solid var(--border); border-radius:7px; padding:4px 9px; cursor:pointer; }
        .banner-empty { display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--soft); font-size:11.5px; cursor:pointer; font-weight:600; }
        /* week table */
        .wk-table { width:100%; border-collapse:collapse; table-layout:fixed; font-size:11px; }
        .wk-table th { font-family:'Fraunces',serif; font-weight:700; font-size:11px; color:var(--soft); padding:5px 3px; text-align:center; border-bottom:1px solid var(--border); }
        .wk-table td { vertical-align:top; padding:5px 4px; }
        .wk-table td.today { background:#FDF7F8; border-radius:0 0 8px 8px; }
        .wk-table th.today { color:var(--pill-pink-ink); font-weight:700; border-bottom:2px solid var(--pill-pink-ink); }
        .wk-chip { display:flex; align-items:center; gap:3px; font-size:9.5px; font-weight:700; border-radius:5px; padding:2px 4px; margin-bottom:3px; background:#fff; }
        .wk-chip svg { width:9px; height:9px; flex-shrink:0; }
        /* kanban */
        .kb-cols { display:flex; gap:7px; height:100%; }
        .kb-col { flex:1; min-width:0; display:flex; flex-direction:column; background:var(--dayblock); border-radius:8px; padding:6px; }
        .kb-col-title { font-size:10.5px; font-weight:700; padding:3px 7px; border-radius:6px; margin-bottom:6px; display:inline-block; }
        .kb-col-body { flex:1; overflow-y:auto; min-height:0; }
        .kb-card { background:#fff; border:1px solid var(--border); border-radius:8px; padding:7px 8px; margin-bottom:6px; font-size:11.5px; touch-action:none; cursor:grab; }
        .kb-card.dragging { opacity:.32; transform:scale(.94); }
        .kb-card-top { display:flex; justify-content:space-between; align-items:flex-start; gap:4px; }
        .kb-info { color:var(--soft); font-size:10px; margin:3px 0; font-weight:600; }
        .kb-card-bottom { display:flex; align-items:center; justify-content:space-between; margin-top:5px; flex-wrap:wrap; gap:4px; }
        .kb-ghost { position:fixed; pointer-events:none; z-index:80; transform:scale(1.05) rotate(-1.2deg);
          box-shadow:0 10px 24px rgba(26,26,26,.18); border-radius:8px; }
        /* mini calendar */
        .mini-cal { background:var(--pill-pink); border-radius:14px; padding:14px 12px; flex:1; min-height:0; cursor:pointer; display:flex; flex-direction:column; }
        .mc-head { display:flex; align-items:center; justify-content:space-between; }
        .mc-head button { background:none; border:none; color:var(--pill-pink-ink); font-size:16px; cursor:pointer; padding:2px 6px; }
        .mc-month { font-family:'Fraunces',serif; font-weight:700; font-size:14px; color:var(--pill-pink-ink); }
        .mc-weekdays { display:grid; grid-template-columns:repeat(7,1fr); margin-top:8px; }
        .mc-weekdays span { text-align:center; font-size:10px; color:var(--pill-pink-ink); font-weight:700; }
        .mc-days { display:grid; grid-template-columns:repeat(7,1fr); grid-auto-rows:1fr; gap:2px; flex:1; margin-top:4px; }
        .mc-day { display:flex; align-items:center; justify-content:center; font-size:11px; color:#1A1A1A; font-weight:600; }
        .mc-day.other { color:#D9BCC4; }
        .mc-day .mc-badge { width:22px; height:22px; border-radius:7px; display:flex; align-items:center; justify-content:center; }
        .mc-day.today .mc-badge { background:var(--pill-pink-ink); color:#fff; font-weight:700; }
        /* full-screen calendar (centered, no side panel) */
        .full-cal { position:fixed; inset:0; background:#fff; z-index:90; display:flex; flex-direction:column; padding:20px 30px; }
        .full-cal-head { display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
        .full-cal-title { font-family:'Fraunces',serif; font-weight:700; font-size:22px; color:#111; }
        .full-cal-modesel { display:flex; justify-content:center; margin-top:12px; flex-shrink:0; }
        .full-cal-modesel select { font-family:'Fraunces',serif; font-weight:700; font-size:15px; padding:8px 30px 8px 16px; border-radius:10px; border:1px solid var(--border); background:var(--pill-pink); color:var(--pill-pink-ink); cursor:pointer; }
        .full-cal-datelabel { text-align:center; color:#111; font-weight:700; font-size:14px; margin:10px 0 0; }
        .full-cal-body { flex:1; min-height:0; display:flex; flex-direction:column; max-width:920px; margin:0 auto; width:100%; }
        .fc-nav { display:flex; align-items:center; justify-content:space-between; flex-shrink:0; margin-top:10px; }
        .fc-monthnav { font-family:'Fraunces',serif; font-weight:700; font-size:18px; min-width:160px; text-align:center; color:#111; }
        .fc-weekdays { display:grid; grid-template-columns:repeat(7,1fr); flex-shrink:0; margin-top:10px; }
        .fc-weekdays span { text-align:center; font-size:11.5px; font-weight:700; color:#333; }
        .fc-days { flex:1; min-height:0; display:grid; grid-template-columns:repeat(7,1fr); grid-template-rows:repeat(6,1fr); gap:8px; margin-top:6px; }
        .fc-cell { border:1px solid var(--border); border-radius:10px; padding:7px; cursor:pointer; text-align:left; overflow:hidden;
          display:flex; flex-direction:column; gap:3px; background:#fff; }
        .fc-cell.other { background:var(--rowbg); color:#A8A8AE; }
        .fc-cell.today { border:2px solid var(--pill-pink-ink); }
        .fc-cell.selected { outline:2px solid var(--primary); outline-offset:-2px; }
        .fc-cell .num { font-size:13px; font-weight:700; color:#111; }
        .fc-cell.other .num { color:#A8A8AE; }
        .fc-year-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; flex:1; min-height:0; overflow-y:auto; margin-top:10px; max-width:920px; margin-left:auto; margin-right:auto; width:100%; }
        .fc-mini-title { font-family:'Fraunces',serif; font-weight:700; font-size:13px; margin-bottom:4px; cursor:pointer; color:#111; }
        .fc-mini-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:1px; }
        .fc-mini-day { font-size:8.5px; text-align:center; padding:2px 0; border-radius:3px; cursor:pointer; color:var(--soft); font-weight:600; }
        .fc-mini-day.cur { color:#111; }
        .fc-mini-day.has { font-weight:800; box-shadow:inset 0 -2px 0 var(--dotcolor); }
        .fc-mini-day.today { background:var(--pill-pink-ink); color:#fff; }
        /* generic centered modal */
        .db-modal-backdrop { position:fixed; inset:0; background:rgba(26,26,26,.4); display:flex; align-items:center; justify-content:center; padding:16px; z-index:95; }
        .qa-modal { background:#fff; border-radius:16px; width:380px; max-width:92vw; padding:24px; position:relative; animation: modalPop .2s cubic-bezier(.34,1.56,.64,1); max-height:88vh; overflow-y:auto; }
        @keyframes modalPop { from { transform:scale(.9); opacity:.3; } to { transform:scale(1); opacity:1; } }
        .db-modal-close { position:absolute; top:14px; right:14px; background:#fff; border:1px solid var(--border); border-radius:50%; width:30px; height:30px; cursor:pointer; font-size:15px; color:var(--ink); }
        .qa-modal h3 { font-family:'Fraunces',serif; margin:0 0 14px; font-size:17px; font-weight:700; }
        .qa-field { margin-bottom:12px; }
        .qa-field label { display:block; font-size:11px; color:var(--soft); font-weight:700; margin-bottom:4px; }
        .qa-field input, .qa-field select { width:100%; font-family:'Work Sans',sans-serif; font-size:14px; padding:8px 10px; border-radius:8px; border:1px solid var(--border); background:#fff; color:var(--ink); }
        .qa-row2 { display:flex; gap:10px; }
        .qa-row2 .qa-field { flex:1; }
        .qa-actions { display:flex; justify-content:space-between; align-items:center; margin-top:6px; }
        .va-modal { background:#fff; border-radius:16px; width:460px; max-width:92vw; max-height:80vh; overflow-y:auto; padding:22px; position:relative; animation: modalPop .2s cubic-bezier(.34,1.56,.64,1); }
        .va-modal h3 { font-family:'Fraunces',serif; margin:0 0 14px; font-size:17px; font-weight:700; }
        .sz-full-modal { background:#fff; border-radius:18px; width:92vw; max-width:1050px; height:85vh; padding:24px 26px; position:relative;
          display:flex; flex-direction:column; animation: modalPop .2s cubic-bezier(.34,1.56,.64,1); }
        .sz-full-modal h3 { font-family:'Fraunces',serif; margin:0 0 12px; font-size:19px; font-weight:700; flex-shrink:0; }
        /* sidebar trigger — top-left */
        .side-tab { position:fixed; top:14px; left:14px; background:#fff; border:1px solid var(--border); border-radius:50%;
          width:44px; height:44px; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:55;
          box-shadow:0 2px 8px rgba(26,26,26,.12); transition:transform .16s ease; }
        .side-tab:active { transform:scale(.9); }
        .side-backdrop { position:fixed; inset:0; background:rgba(26,26,26,.28); z-index:75; display:flex; justify-content:flex-start; }
        .side-panel { width:300px; max-width:85vw; height:100%; background:var(--bg); border-right:1px solid var(--border);
          box-shadow:10px 0 26px rgba(26,26,26,.14); padding:22px; position:relative; overflow-y:auto;
          animation: sideSlide .38s ease; }
        @keyframes sideSlide { from { transform:translateX(-100%); } to { transform:translateX(0); } }
        .side-item { display:flex; align-items:center; gap:9px; width:100%; text-align:left; padding:12px 14px; border-radius:10px;
          background:var(--pill-pink); color:var(--pill-pink-ink); font-family:'Fraunces',serif; font-weight:700; font-size:13.5px; cursor:pointer; border:none; margin-bottom:10px; }
        .qa-row { background:var(--pill-pink); color:var(--pill-pink-ink); border-radius:9px; padding:10px 12px; font-size:12.5px; font-weight:700;
          cursor:pointer; margin-bottom:7px; margin-left:6px; }

        @media (max-width:900px), (orientation:portrait) {
          .db-root { height:auto; min-height:100dvh; overflow-y:auto; }
          .db-main { display:block; height:auto; padding:16px 12px 50px; }
          .w-banner,.w-mini,.w-week,.w-upcoming,.w-exams,.w-kanban,.w-todos,.w-homework { margin-bottom:16px; height:280px; display:flex; flex-direction:column; }
          .w-banner { height:150px; }
          .kb-cols { flex-direction:column; }
          .kb-col-body { max-height:160px; }
        }
      `}</style>

      <div className="db-main">
        <div className="db-cardwrap w-banner">
          <BannerWidget img={data.bannerImg} setImg={setBannerImg} />
        </div>

        <div className="db-cardwrap w-mini">
          <MiniKalenderWidget year={curYear} month={curMonth} eventsFor={eventsFor} onOpen={openFullCal} onNav={goMonth} />
        </div>

        <div className="db-cardwrap w-week">
          <div className="db-pillrow pink"><div className="db-pill"><IconGrid />Week at a Glance</div></div>
          <div className="db-card">
            <WeekAtAGlanceWidget eventsFor={eventsFor} weekStart={weekStart} setWeekStart={setWeekStart} />
          </div>
        </div>

        <div className="db-cardwrap w-upcoming">
          <div className="db-pillrow yellow"><div className="db-pill"><IconList />Upcoming Assignments</div><span className="view-all" onClick={() => setViewAll("assignments")}>View all ›</span></div>
          <div className="db-card">
            <UpcomingAssignmentsWidget events={data.events} updateEvent={updateEvent} limit={4} onAddClick={() => openSidebarQuickAdd("assignment")} />
          </div>
        </div>

        <div className="db-cardwrap w-exams">
          <div className="db-pillrow"><div className="db-pill"><IconGrid />Exams Calendar</div><span className="view-all" onClick={() => setViewAll("exams")}>View all ›</span></div>
          <div className="db-card">
            <ExamsCalendarWidget events={data.events} updateEvent={updateEvent} limit={3} onAddClick={() => openSidebarQuickAdd("exam")} />
          </div>
        </div>

        <div className="db-cardwrap w-homework">
          <div className="db-pillrow pink"><div className="db-pill"><IconHouse />Homework</div></div>
          <div className="db-card">
            <HomeworkWidget events={data.events} updateEvent={updateEvent} onAddClick={() => openSidebarQuickAdd("hausaufgabe")} />
          </div>
        </div>

        <div className="db-cardwrap w-kanban">
          <div className="db-pillrow"><div className="db-pill"><IconBoard />Studienzeiten</div>
            <div className="db-row" style={{ gap: 10 }}>
              <span className="view-all" onClick={() => setSzFullOpen(true)} title="Groß anzeigen"><IconExpand /></span>
              <span className="view-all" onClick={() => setConfirmDeleteSz(true)}>Delete all</span>
            </div>
          </div>
          <div className="db-card">
            <StudienzeitenWidget events={data.events.filter((e) => e.art === "auswertung" && !e.hiddenFromKanban)} deleteEvent={deleteEvent} setStatus={setStatus} updateEvent={updateEvent}
              onAddClick={(colId) => setSzModalStatus(colId)} />
          </div>
        </div>

        <div className="db-cardwrap w-todos">
          <div className="db-pillrow yellow"><div className="db-pill"><IconCheck />To Do List</div></div>
          <div className="db-card">
            <ToDosWidget todos={data.todos[TODAY_ISO] || []} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} onAddClick={() => openSidebarQuickAdd("task")} />
          </div>
        </div>
      </div>

      <button className="side-tab" onClick={() => setSideOpen(true)} aria-label="Seitenansicht öffnen"><IconMenu /></button>
      {sideOpen && (
        <div className="side-backdrop" onClick={() => setSideOpen(false)}>
          <div className="side-panel" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close" onClick={() => setSideOpen(false)} aria-label="Schließen">✕</button>
            <button className="side-item" onClick={() => openFullCal(null, curYear, curMonth)}><IconGrid />Kalender</button>
            <button className="side-item" onClick={() => setQuickAddOpen((o) => !o)}><IconNote />Quick Add {quickAddOpen ? "▾" : "▸"}</button>
            {quickAddOpen && QUICK_ADD_TYPES.map((t) => (
              <div key={t.id} className="qa-row" onClick={() => openSidebarQuickAdd(t.id)}>+ {t.label}</div>
            ))}
          </div>
        </div>
      )}

      {quickAddType && <QuickAddModal typeId={quickAddType} onClose={() => setQuickAddType(null)} onSave={handleQuickAdd} />}
      {szModalStatus && <StudienzeitModal onClose={() => setSzModalStatus(null)} onSave={handleStudienzeitSave} />}

      {confirmDeleteSz && (
        <div className="db-modal-backdrop" onClick={() => setConfirmDeleteSz(false)}>
          <div className="qa-modal" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close" onClick={() => setConfirmDeleteSz(false)} aria-label="Schließen">✕</button>
            {data.events.filter((e) => e.art === "auswertung" && !e.hiddenFromKanban).length === 0 ? (
              <>
                <h3>Aktuell nichts zu löschen</h3>
                <p className="db-sub" style={{ marginBottom: 16 }}>Im Studienzeiten-Widget stehen gerade keine Einträge.</p>
                <div className="qa-actions"><span /><button className="db-btn primary" onClick={() => setConfirmDeleteSz(false)}>Okay</button></div>
              </>
            ) : (
              <>
                <h3>Wirklich alle Studienzeiten löschen?</h3>
                <p className="db-sub" style={{ marginBottom: 16 }}>Sie verschwinden nur aus diesem Widget — im Kalender und bei den Assignments bleiben sie erhalten.</p>
                <div className="qa-actions">
                  <button className="db-btn" onClick={() => setConfirmDeleteSz(false)}>Nein</button>
                  <button className="db-btn primary" onClick={() => { clearAllStudienzeiten(); setConfirmDeleteSz(false); }}>Ja, löschen</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {szFullOpen && (
        <div className="db-modal-backdrop" onClick={() => setSzFullOpen(false)}>
          <div className="sz-full-modal" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close" onClick={() => setSzFullOpen(false)} aria-label="Schließen">✕</button>
            <h3>Studienzeiten</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <StudienzeitenWidget events={data.events.filter((e) => e.art === "auswertung" && !e.hiddenFromKanban)} deleteEvent={deleteEvent} setStatus={setStatus} updateEvent={updateEvent}
                onAddClick={(colId) => setSzModalStatus(colId)} />
            </div>
          </div>
        </div>
      )}

      {viewAll && (
        <div className="db-modal-backdrop" onClick={() => setViewAll(null)}>
          <div className="va-modal" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close" onClick={() => setViewAll(null)} aria-label="Schließen">✕</button>
            <h3>{viewAll === "assignments" ? "Alle Assignments" : "Alle Exams"}</h3>
            {viewAll === "assignments"
              ? <UpcomingAssignmentsWidget events={data.events} updateEvent={updateEvent} onAddClick={() => openSidebarQuickAdd("assignment")} />
              : <ExamsCalendarWidget events={data.events} updateEvent={updateEvent} onAddClick={() => openSidebarQuickAdd("exam")} />}
          </div>
        </div>
      )}

      {entryModal && (
        <CalendarEntryModal target={entryModal} onClose={() => setEntryModal(null)} onSave={saveEntry}
          onDelete={entryModal.event ? () => { deleteEvent(entryModal.event.id); setEntryModal(null); } : null} />
      )}

      {saveErr && <p className="db-savewarn">Speichern hat gerade nicht geklappt.</p>}

      {calFull && (
        <div className="full-cal">
          <div className="full-cal-head">
            <span className="full-cal-title">Kalender</span>
            <button className="db-modal-close" style={{ position: "static" }} onClick={() => setCalFull(false)} aria-label="Schließen">✕</button>
          </div>
          <div className="full-cal-modesel">
            <select value={calMode} onChange={(e) => setCalMode(e.target.value)}>
              <option value="monat">Monat</option>
              <option value="jahr">Jahr</option>
            </select>
          </div>
          {calMode === "monat" && (
            <p className="full-cal-datelabel">{(() => { const d = new Date(selectedDate + "T00:00:00"); return `${WEEKDAY_LONG[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; })()}</p>
          )}

          {calMode === "monat" ? (
            <div className="full-cal-body">
              <div className="fc-nav">
                <button className="db-btn" onClick={() => goMonth(-1)} aria-label="Vorheriger Monat">←</button>
                <div className="fc-monthnav">{MONTHS[curMonth]} {curYear}</div>
                <button className="db-btn" onClick={() => goMonth(1)} aria-label="Nächster Monat">→</button>
              </div>
              <div className="fc-weekdays">{WEEKDAYS_FULL.map((w) => <span key={w}>{w}</span>)}</div>
              <div className="fc-days">
                {buildMonthMatrix(curYear, curMonth).flat().map((cell) => {
                  const evs = eventsFor(cell.iso);
                  return (
                    <div key={cell.iso + cell.cur}
                      className={`fc-cell ${cell.cur ? "" : "other"} ${cell.iso === TODAY_ISO ? "today" : ""} ${cell.iso === selectedDate ? "selected" : ""}`}
                      onClick={() => openNewEntry(cell.iso)}>
                      <span className="num">{cell.d}</span>
                      {evs.slice(0, 3).map((e) => { const Icon = artById(e.art).Icon; return <span key={e.id} className="db-chip" style={{ ...chipStyle(e.fach), textDecoration: isDoneAuswertung(e) ? "line-through" : "none" }} onClick={(ev) => { ev.stopPropagation(); openEditEntry(e); }}>{Icon && <Icon />}{e.title}</span>; })}
                      {evs.length > 3 && <span className="db-chip" style={{ color: "var(--soft)" }}>+{evs.length - 3}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="fc-year-grid">
              {MONTHS.map((mName, mIdx) => {
                const weeks = buildMonthMatrix(curYear, mIdx);
                return (
                  <div key={mName}>
                    <div className="fc-mini-title" onClick={() => { setCurMonth(mIdx); setCalMode("monat"); }}>{mName}</div>
                    <div className="fc-mini-grid">
                      {WEEKDAYS_FULL.map((w) => <div key={w} className="fc-mini-day" style={{ fontWeight: 700 }}>{w[0]}</div>)}
                      {weeks.flat().map((cell) => {
                        const evs = eventsFor(cell.iso);
                        const dotColor = evs[0] ? subjectColor(evs[0].fach) : "transparent";
                        return (
                          <div key={cell.iso + cell.cur}
                            className={`fc-mini-day ${cell.cur ? "cur" : ""} ${evs.length ? "has" : ""} ${cell.iso === TODAY_ISO ? "today" : ""}`}
                            style={{ "--dotcolor": dotColor }}
                            onClick={() => { setCurYear(cell.y); setCurMonth(cell.m); setCalMode("monat"); openNewEntry(cell.iso); }}>
                            {cell.d}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- calendar entry modal (title + 2 dropdowns) ---------- */
function CalendarEntryModal({ target, onClose, onSave, onDelete }) {
  const existing = target.event;
  const [title, setTitle] = useState(existing ? existing.title : "");
  const [fach, setFach] = useState(existing ? existing.fach || "" : "");
  const [art, setArt] = useState(existing ? existing.art : "sonstiges");
  const [time, setTime] = useState(existing ? existing.time || "" : "");
  const d = new Date(target.date + "T00:00:00");

  const submit = () => {
    const v = title.trim();
    if (!v) return;
    onSave({ title: v, fach, art, time, date: target.date });
  };

  return (
    <div className="db-modal-backdrop" onClick={onClose}>
      <div className="qa-modal" onClick={(e) => e.stopPropagation()}>
        <button className="db-modal-close" onClick={onClose} aria-label="Schließen">✕</button>
        <h3>{WEEKDAY_LONG[d.getDay()]}, {d.getDate()}. {MONTHS[d.getMonth()]} {d.getFullYear()}</h3>
        <div className="qa-field">
          <label>Titel</label>
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
        </div>
        <div className="qa-row2">
          <div className="qa-field">
            <label>Fach</label>
            <select value={fach} onChange={(e) => setFach(e.target.value)}>
              <option value="">Kein Fach</option>
              {SUBJECT_SUGGESTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="qa-field">
            <label>Art</label>
            <select value={art} onChange={(e) => setArt(e.target.value)}>
              {ART_TYPES.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
          </div>
        </div>
        <div className="qa-field">
          <label>Uhrzeit (optional)</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="qa-actions">
          {onDelete ? <button className="db-iconbtn" onClick={onDelete}>Löschen</button> : <span />}
          <button className="db-btn primary" onClick={submit}>Speichern</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- studienzeit modal (Fach-Dropdown, Datum, Uhrzeit) ---------- */
function StudienzeitModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [fach, setFach] = useState("");
  const [date, setDate] = useState(TODAY_ISO);
  const [time, setTime] = useState("");

  const submit = () => {
    const v = title.trim();
    if (!v) return;
    onSave({ title: v, fach, date, time });
  };

  return (
    <div className="db-modal-backdrop" style={{ zIndex: 100 }} onClick={onClose}>
      <div className="qa-modal" onClick={(e) => e.stopPropagation()}>
        <button className="db-modal-close" onClick={onClose} aria-label="Schließen">✕</button>
        <h3>Neue Studienzeit</h3>
        <div className="qa-field">
          <label>Titel</label>
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
        </div>
        <div className="qa-field">
          <label>Fach</label>
          <select value={fach} onChange={(e) => setFach(e.target.value)}>
            <option value="">Kein Fach</option>
            {SUBJECT_SUGGESTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="qa-row2">
          <div className="qa-field"><label>Datum</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          <div className="qa-field"><label>Uhrzeit (optional)</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
        </div>
        <button className="db-btn primary" onClick={submit}>Hinzufügen</button>
      </div>
    </div>
  );
}

/* ---------- quick add modal ---------- */
function QuickAddModal({ typeId, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [mode, setMode] = useState("");
  const [fach, setFach] = useState("");
  const [date, setDate] = useState(TODAY_ISO);
  const [art, setArt] = useState("test");
  const meta = QUICK_ADD_TYPES.find((t) => t.id === typeId);
  const showFach = typeId === "exam" || typeId === "assignment" || typeId === "hausaufgabe";
  const showDate = typeId === "exam";
  const showArt = typeId === "exam";

  const submit = () => {
    const v = title.trim();
    if (!v) return;
    onSave(v, info.trim(), mode || null, fach, date, art);
  };

  return (
    <div className="db-modal-backdrop" onClick={onClose}>
      <div className="qa-modal" onClick={(e) => e.stopPropagation()}>
        <button className="db-modal-close" onClick={onClose} aria-label="Schließen">✕</button>
        <h3>{meta ? meta.label : "Neuer Eintrag"}</h3>
        <div className="qa-field">
          <label>Überschrift</label>
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
        </div>
        <div className="qa-field">
          <label>Info (optional)</label>
          <input value={info} onChange={(e) => setInfo(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
        </div>
        {showArt && (
          <div className="qa-field">
            <label>Art</label>
            <select value={art} onChange={(e) => setArt(e.target.value)}>
              <option value="test">Test</option>
              <option value="arbeit">Arbeit</option>
            </select>
          </div>
        )}
        {showFach && (
          <div className="qa-field">
            <label>Fach</label>
            <select value={fach} onChange={(e) => setFach(e.target.value)}>
              <option value="">Kein Fach</option>
              {SUBJECT_SUGGESTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
        {showDate && (
          <div className="qa-field">
            <label>Datum</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        )}
        {typeId === "hausaufgabe" && (
          <div className="qa-field">
            <label>Auswertung</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="">Noch offen</option>
              {HW_MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
        )}
        <button className="db-btn primary" onClick={submit}>Hinzufügen</button>
      </div>
    </div>
  );
}

/* ---------- banner ---------- */
function BannerWidget({ img, setImg }) {
  const inputRef = useRef(null);
  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try { const dataUrl = await resizeImageFile(file); setImg(dataUrl); } catch (err) { /* ignore */ }
    e.target.value = "";
  };
  return (
    <div className="banner-box" style={img ? { backgroundImage: `url(${img})` } : undefined}>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFile} />
      {!img && (
        <div className="banner-empty" onClick={() => inputRef.current && inputRef.current.click()}>
          <IconImage />
          <span>Bild aus der Galerie hinzufügen</span>
        </div>
      )}
      {img && <button className="banner-btn" onClick={() => inputRef.current && inputRef.current.click()}>Bild ändern</button>}
    </div>
  );
}

/* ---------- mini calendar widget ---------- */
function MiniKalenderWidget({ year, month, eventsFor, onOpen, onNav }) {
  const weeks = buildMonthMatrix(year, month);
  return (
    <div className="mini-cal" onClick={() => onOpen(null, year, month)}>
      <div className="mc-head">
        <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} aria-label="Vorheriger Monat">‹</button>
        <span className="mc-month">{MONTHS_EN_FULL[month]} {year}</span>
        <button onClick={(e) => { e.stopPropagation(); onNav(1); }} aria-label="Nächster Monat">›</button>
      </div>
      <div className="mc-weekdays">{WEEKDAYS.map((w, i) => <span key={i}>{w}</span>)}</div>
      <div className="mc-days">
        {weeks.flat().map((cell) => (
          <div key={cell.iso + cell.cur} className={`mc-day ${cell.cur ? "" : "other"} ${cell.iso === TODAY_ISO ? "today" : ""}`}
            onClick={(e) => { e.stopPropagation(); onOpen(cell.iso, cell.y, cell.m); }}>
            <span className="mc-badge">{cell.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- week at a glance (no truncation) ---------- */
function WeekAtAGlanceWidget({ eventsFor, weekStart, setWeekStart }) {
  const weekDates = [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(weekStart, i));
  const first = weekDates[0], last = weekDates[6];
  const rangeLabel = `${first.getDate()}. ${MONTHS_EN_SHORT[first.getMonth()]} – ${last.getDate()}. ${MONTHS_EN_SHORT[last.getMonth()]}`;
  return (
    <div>
      <div className="db-row db-between" style={{ marginBottom: 6 }}>
        <span className="db-sub">{rangeLabel}</span>
        <div className="db-row" style={{ gap: 4 }}>
          <button className="db-btn" onClick={() => setWeekStart(addDays(weekStart, -7))}>←</button>
          <button className="db-btn" onClick={() => setWeekStart(mondayOf(todayDate))}>Heute</button>
          <button className="db-btn" onClick={() => setWeekStart(addDays(weekStart, 7))}>→</button>
        </div>
      </div>
      <table className="wk-table">
        <thead><tr>{weekDates.map((d, i) => <th key={i} className={isoFromDate(d) === TODAY_ISO ? "today" : ""}>{WEEKDAYS_FULL[i]}</th>)}</tr></thead>
        <tbody>
          <tr>
            {weekDates.map((d, i) => {
              const iso = isoFromDate(d);
              const evs = eventsFor(iso);
              return (
                <td key={i} className={iso === TODAY_ISO ? "today" : ""}>
                  {evs.map((e) => { const Icon = artById(e.art).Icon; return <div key={e.id} className="wk-chip" style={{ ...chipStyle(e.fach), textDecoration: isDoneAuswertung(e) ? "line-through" : "none" }}>{Icon && <Icon />}{e.title}</div>; })}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------- priority pill ---------- */
function PriorityPill({ value, onCommit }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <span className="prio-picker">
        {PRIORITIES.map((o) => (
          <button key={o.id} className="prio-opt" style={{ background: o.bg, color: o.ink }}
            onClick={() => { onCommit(o.id); setEditing(false); }}>{o.label}</button>
        ))}
      </span>
    );
  }
  const cur = prioById(value);
  return (
    <span className="db-badge" style={cur ? { background: cur.bg, color: cur.ink } : {}} onClick={() => setEditing(true)}>
      {cur ? cur.label : "Priority"}
    </span>
  );
}

/* ---------- homework mode pill ---------- */
function ModePill({ value, onCommit }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <span className="prio-picker">
        {HW_MODES.map((o) => (
          <button key={o.id} className="prio-opt" style={{ background: o.bg, color: o.ink }}
            onClick={() => { onCommit(o.id); setEditing(false); }}>{o.label}</button>
        ))}
      </span>
    );
  }
  const cur = hwModeById(value);
  return (
    <span className="db-badge" style={cur ? { background: cur.bg, color: cur.ink } : {}} onClick={() => setEditing(true)}>
      {cur ? cur.label : "Auswertung"}
    </span>
  );
}

/* ---------- upcoming assignments (Arbeiten + Studienzeiten) ---------- */
function UpcomingAssignmentsWidget({ events, updateEvent, limit, onAddClick }) {
  let upcoming = events.filter((e) => (e.art === "arbeit" || e.art === "auswertung") && e.date >= TODAY_ISO).sort((a, b) => a.date.localeCompare(b.date));
  if (limit) upcoming = upcoming.slice(0, limit);

  return (
    <div>
      {upcoming.length === 0 && <p className="db-empty">Keine anstehenden Assignments.</p>}
      {upcoming.map((e) => {
        const Icon = artById(e.art).Icon;
        return (
          <div key={e.id} className="lw-item" style={highlightStyle(e.fach)}>
            {Icon && <Icon />}
            <div className="lw-main">
              {e.fach && <div className="lw-fach" style={{ color: fachTextColor(e.fach) }}>{e.fach}</div>}
              <EditableText value={e.title} onCommit={(v) => updateEvent(e.id, { title: v })} className="lw-title" style={{ textDecoration: isDoneAuswertung(e) ? "line-through" : "none" }} />
              <EditableDate value={e.date} onCommit={(v) => updateEvent(e.id, { date: v })} render={dueShort} className="lw-sub" />
            </div>
            <PriorityPill value={e.priority} onCommit={(p) => updateEvent(e.id, { priority: p })} />
          </div>
        );
      })}
      <div className="add-link" onClick={onAddClick}>+ Add new assignment</div>
    </div>
  );
}

/* ---------- exams calendar (Tests) ---------- */
function ExamsCalendarWidget({ events, updateEvent, limit, onAddClick }) {
  let upcoming = events.filter((e) => e.art === "test" && e.date >= TODAY_ISO).sort((a, b) => a.date.localeCompare(b.date));
  if (limit) upcoming = upcoming.slice(0, limit);

  return (
    <div>
      {upcoming.length === 0 && <p className="db-empty">Keine anstehenden Exams.</p>}
      {upcoming.map((e) => {
        const Icon = artById(e.art).Icon;
        const days = daysUntil(e.date);
        return (
          <div key={e.id} className="lw-item" style={highlightStyle(e.fach)}>
            {Icon && <Icon />}
            <div className="lw-main">
              {e.fach && <div className="lw-fach" style={{ color: fachTextColor(e.fach) }}>{e.fach}</div>}
              <EditableText value={e.title} onCommit={(v) => updateEvent(e.id, { title: v })} className="lw-title" />
              <EditableDate value={e.date} onCommit={(v) => updateEvent(e.id, { date: v })} render={examDateLong} className="lw-sub" />
            </div>
            <div className="lw-right">
              <span className="lw-days">{days}</span>
              <span className="lw-days-label">days</span>
            </div>
          </div>
        );
      })}
      <div className="add-link" onClick={onAddClick}>+ Add new exam</div>
    </div>
  );
}

/* ---------- homework (Hausaufgaben) ---------- */
function HomeworkWidget({ events, updateEvent, onAddClick }) {
  const upcoming = events.filter((e) => e.art === "hausaufgabe").sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      {upcoming.length === 0 && <p className="db-empty">Keine offenen Hausaufgaben.</p>}
      {upcoming.map((e) => (
        <div key={e.id} className={`lw-item ${e.done ? "done" : ""}`} style={highlightStyle(e.fach)}>
          <input type="checkbox" checked={!!e.done} onChange={() => updateEvent(e.id, { done: !e.done })} style={{ marginTop: 3, width: 15, height: 15, accentColor: "var(--done)", cursor: "pointer", flexShrink: 0 }} />
          <div className="lw-main">
            {e.fach && <div className="lw-fach" style={{ color: fachTextColor(e.fach) }}>{e.fach}</div>}
            <EditableText value={e.title} onCommit={(v) => updateEvent(e.id, { title: v })} className="lw-title" />
            <EditableText value={e.info || "+ Info"} onCommit={(v) => updateEvent(e.id, { info: v })} className="lw-sub" />
          </div>
          <ModePill value={e.mode} onCommit={(m) => updateEvent(e.id, { mode: m })} />
        </div>
      ))}
      <div className="add-link" onClick={onAddClick}>+ Add new Homework</div>
    </div>
  );
}

/* ---------- small inline-edit helpers ---------- */
function EditableText({ value, onCommit, className, style }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  if (editing) {
    return <input autoFocus className={className} value={draft === "+ Info" ? "" : draft} onChange={(e) => setDraft(e.target.value)}
      onBlur={() => { setEditing(false); const v = draft.trim(); if (v !== value) onCommit(v); else setDraft(value); }}
      onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }} style={{ width: "100%", ...style }} />;
  }
  return <div className={className} style={style} onClick={() => { setDraft(value === "+ Info" ? "" : value); setEditing(true); }}>{value}</div>;
}
function EditableDate({ value, onCommit, render, className }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return <input type="date" autoFocus value={value} onChange={(e) => onCommit(e.target.value)} onBlur={() => setEditing(false)} />;
  }
  return <div className={className} onClick={() => setEditing(true)}>{render(value)}</div>;
}

/* ---------- to-dos (notepad style, click-to-write) ---------- */
function TodoLine({ t, onToggle, onDelete, onUpdate }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [draft, setDraft] = useState(t.title);

  const commitTitle = () => {
    setEditingTitle(false);
    const v = draft.trim();
    if (v && v !== t.title) onUpdate({ title: v });
    else setDraft(t.title);
  };

  return (
    <div className={`np-row ${t.done ? "done" : ""}`}>
      <input type="checkbox" checked={t.done} onChange={onToggle} />
      <span className="np-title">
        {editingTitle ? (
          <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
            onBlur={commitTitle} onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }} />
        ) : (
          <span onClick={() => { setDraft(t.title); setEditingTitle(true); }}>{t.title}</span>
        )}
      </span>
      <button className="db-iconbtn" onClick={onDelete} aria-label="Aufgabe löschen">✕</button>
    </div>
  );
}

function ToDosWidget({ todos, toggleTodo, deleteTodo, updateTodo, onAddClick }) {
  return (
    <div>
      <div className="notepad">
        {todos.map((t) => (
          <TodoLine key={t.id} t={t}
            onToggle={() => toggleTodo(TODAY_ISO, t.id)}
            onDelete={() => deleteTodo(TODAY_ISO, t.id)}
            onUpdate={(patch) => updateTodo(TODAY_ISO, t.id, patch)} />
        ))}
      </div>
      <div className="add-link" onClick={onAddClick}>+ Add new task</div>
    </div>
  );
}

/* ---------- studienzeiten kanban ---------- */
function SzDateSlot({ value, onCommit }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return <input type="date" autoFocus value={value || ""} onChange={(e) => onCommit(e.target.value)} onBlur={() => setEditing(false)} />;
  }
  return <span className="db-badge due" onClick={() => setEditing(true)} style={{ cursor: "text" }}>{value ? shortBadge(value) : "Datum"}</span>;
}
function SzTimeSlot({ value, onCommit }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return <input type="time" autoFocus value={value || ""} onChange={(e) => onCommit(e.target.value)} onBlur={() => setEditing(false)} />;
  }
  return <span className="db-badge" onClick={() => setEditing(true)} style={{ cursor: "text" }}>{value || "--:--"}</span>;
}

function StudienzeitenCard({ e, deleteEvent, onUpdate, dragging, onGrab }) {
  const isSource = dragging && dragging.id === e.id;
  const cardRef = useRef(null);
  const startRef = useRef(null);
  const [editTitle, setEditTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(e.title);
  const [editInfo, setEditInfo] = useState(false);
  const [draftInfo, setDraftInfo] = useState(e.info || "");

  const commitTitle = () => { setEditTitle(false); const v = draftTitle.trim(); if (v && v !== e.title) onUpdate({ title: v }); else setDraftTitle(e.title); };
  const commitInfo = () => { setEditInfo(false); const v = draftInfo.trim(); if (v !== (e.info || "")) onUpdate({ info: v }); };

  const cleanup = () => {
    startRef.current = null;
    window.removeEventListener("pointermove", onMoveCheck);
    window.removeEventListener("pointerup", onUpCancel);
  };
  const onMoveCheck = (ev) => {
    if (!startRef.current) return;
    const dx = ev.clientX - startRef.current.x, dy = ev.clientY - startRef.current.y;
    if (Math.hypot(dx, dy) > 6) {
      const rect = cardRef.current.getBoundingClientRect();
      try { cardRef.current.setPointerCapture(startRef.current.id); } catch (err) { /* ignore */ }
      onGrab(e, rect, ev.clientX - rect.left, ev.clientY - rect.top);
      cleanup();
    }
  };
  const onUpCancel = () => cleanup();
  const onPointerDown = (ev) => {
    if (ev.target.closest("button, input, select")) return;
    startRef.current = { x: ev.clientX, y: ev.clientY, id: ev.pointerId };
    window.addEventListener("pointermove", onMoveCheck);
    window.addEventListener("pointerup", onUpCancel);
  };
  useEffect(() => () => cleanup(), []);

  return (
    <div ref={cardRef} className={`kb-card ${isSource ? "dragging" : ""}`} onPointerDown={onPointerDown}>
      <div className="kb-card-top">
        {editTitle ? (
          <input autoFocus value={draftTitle} onChange={(ev) => setDraftTitle(ev.target.value)}
            onBlur={commitTitle} onKeyDown={(ev) => { if (ev.key === "Enter") ev.currentTarget.blur(); }} style={{ flex: 1 }} />
        ) : (
          <strong style={{ cursor: "text", textDecoration: isDoneAuswertung(e) ? "line-through" : "none" }}
            onClick={() => { setDraftTitle(e.title); setEditTitle(true); }}>{e.title}</strong>
        )}
        <button className="db-iconbtn" onClick={() => deleteEvent(e.id)} aria-label="Löschen">✕</button>
      </div>
      {editInfo ? (
        <input autoFocus value={draftInfo} onChange={(ev) => setDraftInfo(ev.target.value)}
          onBlur={commitInfo} onKeyDown={(ev) => { if (ev.key === "Enter") ev.currentTarget.blur(); }}
          style={{ width: "100%", fontSize: 10.5, marginTop: 3 }} />
      ) : (
        <p className="kb-info" style={{ cursor: "text" }} onClick={() => { setDraftInfo(e.info || ""); setEditInfo(true); }}>{e.info || "+ Info"}</p>
      )}
      <div className="kb-card-bottom">
        {e.fach && <span className="db-chip" style={chipStyle(e.fach)}>{e.fach}</span>}
        <SzDateSlot value={e.date} onCommit={(v) => onUpdate({ date: v })} />
        <SzTimeSlot value={e.time} onCommit={(v) => onUpdate({ time: v })} />
      </div>
    </div>
  );
}

function StudienzeitenWidget({ events, deleteEvent, setStatus, updateEvent, onAddClick }) {
  const [dragging, setDragging] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const onGrab = (e, rect, offX, offY) => {
    setDragging({ id: e.id, title: e.title, info: e.info, date: e.date, time: e.time, x: rect.left, y: rect.top, w: rect.width, offX, offY });
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (ev) => {
      const x = ev.clientX - dragging.offX, y = ev.clientY - dragging.offY;
      setDragging((d) => (d ? { ...d, x, y } : d));
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const colEl = el && el.closest("[data-colid]");
      setDragOverCol(colEl ? colEl.getAttribute("data-colid") : null);
    };
    const up = () => {
      setDragOverCol((col) => { if (col) setStatus(dragging.id, col); return null; });
      setDragging(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging && dragging.id]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="kb-cols" style={{ flex: 1, minHeight: 90 }}>
        {STATUSES.map((col, colIdx) => (
          <div key={col.id} data-colid={col.id} className="kb-col" style={dragOverCol === col.id ? { background: "#F5EAEE" } : undefined}>
            <span className="kb-col-title" style={{ background: colIdx === 0 ? "var(--pill-pink)" : colIdx === 1 ? "var(--pill-yellow)" : "#EDEDF0", color: colIdx === 0 ? "var(--pill-pink-ink)" : colIdx === 1 ? "var(--pill-yellow-ink)" : "#4A4A50" }}>{col.label}</span>
            <div className="kb-col-body">
              {events.filter((e) => (e.status || "upcoming") === col.id).sort((a, b) => (a.date || "").localeCompare(b.date || "")).map((e) => (
                <StudienzeitenCard key={e.id} e={e} deleteEvent={deleteEvent} onUpdate={(patch) => updateEvent(e.id, patch)} dragging={dragging} onGrab={onGrab} />
              ))}
            </div>
            <div className="add-link" style={{ fontSize: 11, flexShrink: 0 }} onClick={() => onAddClick(col.id)}>+ Add new Studienzeit</div>
          </div>
        ))}
      </div>

      {dragging && (
        <div className="kb-ghost" style={{ left: dragging.x, top: dragging.y, width: dragging.w }}>
          <div className="kb-card">
            <div className="kb-card-top"><strong>{dragging.title}</strong></div>
            {dragging.info && <p className="kb-info">{dragging.info}</p>}
            <div className="kb-card-bottom"><span className="db-badge due">{shortBadge(dragging.date)}{dragging.time ? ` · ${dragging.time}` : ""}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
