import React, { useMemo, useState } from "react"; import { motion, AnimatePresence } from "framer-motion"; import { Play, Sword, Users, Gamepad2, Sparkles, Trophy, Settings2 } from "lucide-react";

// Flashy Neon UI Mock — single-file React component // - Tailwind utility classes // - Framer Motion animations // - Theme switcher (Midnight / Neon / Dojo) // - Tabs: Guides / Drills / Community / Arcade // - Character picker + video slot // - Demo content only (no network calls)

const THEMES = { Midnight: { bg: "from-gray-950 via-black to-gray-900", card: "bg-gray-900/70 backdrop-blur", accent: "from-pink-500 via-red-500 to-rose-500", textDim: "text-gray-300", }, Neon: { bg: "from-[#06071a] via-[#0a0f2b] to-[#06071a]", card: "bg-white/5 backdrop-blur border border-white/10", accent: "from-cyan-400 via-fuchsia-500 to-amber-400", textDim: "text-white/80", }, Dojo: { bg: "from-stone-950 via-stone-900 to-stone-950", card: "bg-stone-900/80 backdrop-blur border border-stone-700/60", accent: "from-amber-500 via-red-500 to-rose-600", textDim: "text-stone-200", }, };

const CHARACTERS = [ { name: "Jin", tag: "T8", color: "bg-rose-600" }, { name: "Kazuya", tag: "T8", color: "bg-purple-600" }, { name: "Asuka", tag: "T7", color: "bg-emerald-600" }, { name: "Paul", tag: "T7", color: "bg-amber-600" }, { name: "King", tag: "TTT2", color: "bg-indigo-600" }, { name: "Lili", tag: "T8", color: "bg-pink-600" }, { name: "Hwoarang", tag: "T7", color: "bg-red-600" }, { name: "Nina", tag: "TTT2", color: "bg-blue-600" }, ];

const TABS = [ { id: "guides", label: "Guides", icon: Sword }, { id: "drills", label: "Drills", icon: Trophy }, { id: "community", label: "Community", icon: Users }, { id: "arcade", label: "Arcade", icon: Gamepad2 }, ];

export default function NeonMock() { const [theme, setTheme] = useState("Neon"); const [tab, setTab] = useState("guides"); const [activeChar, setActiveChar] = useState("Jin");

const th = THEMES[theme];

return ( <div className={min-h-screen text-white bg-gradient-to-b ${th.bg} relative overflow-hidden}>
{/* animated background accents */} <motion.div className="pointer-events-none absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, #f0f, transparent 60%)" }} animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} /> <motion.div className="pointer-events-none absolute -bottom-24 -right-20 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle at 70% 70%, #0ff, transparent 60%)" }} animate={{ scale: [1, 1.08, 1], rotate: [0, -12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

{/* header */}
  <header className="relative z-10 max-w-6xl mx-auto px-4 pt-6">
    <div className={`w-full rounded-2xl p-4 ${th.card} flex items-center justify-between shadow-xl`}>          
      <div className="flex items-center gap-3">
        <motion.div whileHover={{ rotate: 8, scale: 1.05 }} className="p-2 rounded-xl bg-white/5">
          <Sparkles className="size-6" />
        </motion.div>
        <div>
          <div className="text-lg font-bold tracking-wide">Tekken Mentor</div>
          <div className={`text-xs ${th.textDim}`}>TTT2 • Tekken 7 • Tekken 8</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Theme switcher */}
        <div className="hidden md:flex items-center gap-1 mr-2">
          {Object.keys(THEMES).map((t) => (
            <button
              key={t}
              className={`px-3 py-1 text-sm rounded-full border border-white/10 ${theme === t ? "bg-white/10" : "bg-transparent"}`}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center gap-2">
          <Settings2 className="size-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </div>

    {/* tabs */}
    <div className="mt-4 flex gap-2">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          className={`group relative overflow-hidden rounded-2xl px-4 py-2 flex items-center gap-2 border border-white/10 ${
            tab === id ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Icon className="size-4 opacity-90" />
          <span className="font-medium">{label}</span>
          {tab === id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, var(--tw-gradient-stops))` }}
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  </header>

  {/* content */}
  <main className="relative z-10 max-w-6xl mx-auto px-4 py-6">
    <AnimatePresence mode="wait">
      {tab === "guides" && <Guides th={th} activeChar={activeChar} setActiveChar={setActiveChar} />}
      {tab === "drills" && <Drills th={th} />}
      {tab === "community" && <Community th={th} />}
      {tab === "arcade" && <Arcade th={th} />}
    </AnimatePresence>
  </main>

  {/* footer glow bar */}
  <div className="fixed bottom-0 left-0 right-0 h-1 opacity-70" style={{ background: "linear-gradient(90deg,#00e5ff,#ff00aa,#ffaa00)" }} />
</div>

); }

function Guides({ th, activeChar, setActiveChar }) { const clip = useMemo(() => { return "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"; // demo clip }, [activeChar]);

return ( <motion.section key="guides" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}> <div className={rounded-2xl p-4 ${th.card} shadow-xl}>
<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold tracking-wide">Character Guides</h2>
<div className={text-xs ${th.textDim}}>Video • Frame Data • Matchups</div>
</div>
{/* character grid */} <div className="grid grid-cols-2 sm:grid-cols-4 gap-3"> {CHARACTERS.map((c) => ( <motion.button key={c.name} whileHover={{ y: -2, scale: 1.02 }} onClick={() => setActiveChar(c.name)} className={relative overflow-hidden rounded-xl p-3 text-left border border-white/10 ${activeChar === c.name ? "ring-2 ring-pink-400/60" : ""} bg-white/5} > <div className="flex items-center justify-between"> <div className="font-semibold">{c.name}</div> <span className={text-[10px] px-2 py-0.5 rounded-full ${c.color}}>{c.tag}</span> </div> <div className={mt-2 text-xs ${th.textDim}}>Tap to load {c.name}'s kit</div> <motion.div className="absolute inset-x-0 -bottom-1 h-1" style={{ background: "linear-gradient(90deg,#00e5ff,#ff00aa,#ffaa00)" }} animate={{ opacity: activeChar === c.name ? [0.4, 1, 0.4] : 0.2 }} transition={{ duration: 2, repeat: Infinity }} /> </motion.button> ))} </div>

{/* video + details */}
    <div className="mt-5 grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
          <video className="w-full aspect-video" src={clip} controls poster="" />
          <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} style={{ background: "radial-gradient(60% 80% at 40% 50%, #fff 0%, transparent 70%)" }} />
        </div>
      </div>
      <div className={`rounded-2xl p-4 ${th.card} space-y-3`}>
        <h3 className="font-semibold">{activeChar} — Quick Data</h3>
        <ul className={`text-sm list-disc pl-5 ${th.textDim}`}>
          <li>Signature: EWGF / Heat Engagers</li>
          <li>Game plan: Mid pressure, whiff punish</li>
          <li>Strengths: Neutral, damage</li>
          <li>Weaknesses: Risk on launchers</li>
        </ul>
        <button className="w-full mt-2 rounded-xl px-4 py-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400 text-black font-semibold">
          Open Full Guide
        </button>
      </div>
    </div>
  </div>
</motion.section>

); }

function Drills({ th }) { return ( <motion.section key="drills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}> <div className={rounded-2xl p-4 ${th.card} shadow-xl}> <div className="flex items-center gap-2 mb-3"> <Trophy className="size-5" /> <h2 className="text-lg font-semibold">Practice Drills</h2> </div> <div className="grid sm:grid-cols-3 gap-3"> {[ { t: "Whiff Punish", d: "React to whiffs within 18f" }, { t: "Heat Route", d: "Optimize Heat juggle routes" }, { t: "Wall Carry", d: "Extend combos to wall" }, ].map((x, i) => ( <motion.div key={i} whileHover={{ y: -2 }} className={rounded-xl p-4 ${th.card}}> <div className="font-semibold">{x.t}</div> <div className={text-sm ${th.textDim}}>{x.d}</div> <button className="mt-3 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20">Start</button> </motion.div> ))} </div> </div> </motion.section> ); }

function Community({ th }) { return ( <motion.section key="community" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}> <div className={rounded-2xl p-4 ${th.card} shadow-xl}> <div className="flex items-center gap-2 mb-3"> <Users className="size-5" /> <h2 className="text-lg font-semibold">Community Hub</h2> </div> <div className="grid lg:grid-cols-3 gap-4"> <div className="lg:col-span-2 space-y-3"> {[1,2,3].map((i) => ( <motion.div key={i} whileHover={{ y: -2 }} className={rounded-xl p-4 ${th.card} border border-white/10}> <div className="font-semibold">Jin Heat Dash — Midscreen Routes</div> <div className={text-sm ${th.textDim}}>by player{i} • 2h ago</div> <p className={mt-2 text-sm ${th.textDim}}>Sharing stable routes off Heat Dash (no counter) with consistent wall carry.</p> <div className="mt-3 flex gap-2"> <button className="rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20">Like</button> <button className="rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20">Comment</button> </div> </motion.div> ))} </div> <aside className={rounded-xl p-4 ${th.card}}> <div className="font-semibold mb-2">Post to Community</div> <input className="w-full mb-2 rounded-lg px-3 py-2 bg-black/30 border border-white/10" placeholder="Title" /> <textarea className="w-full h-24 rounded-lg px-3 py-2 bg-black/30 border border-white/10" placeholder="Share a tip or route..." /> <button className="mt-3 w-full rounded-lg px-3 py-2 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 text-black font-semibold">Share</button> </aside> </div> </div> </motion.section> ); }

function Arcade({ th }) { return ( <motion.section key="arcade" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}> <div className={rounded-2xl p-4 ${th.card} shadow-xl}> <div className="flex items-center gap-2 mb-3"> <Gamepad2 className="size-5" /> <h2 className="text-lg font-semibold">Arcade Stick Mentor</h2> </div> <div className="grid md:grid-cols-2 gap-3"> <div className={rounded-xl p-4 ${th.card}}> <div className="font-semibold">Grip & Movement</div> <div className={text-sm ${th.textDim}}>Learn proper grip, wavedash timing, and microdash drills.</div> <button className="mt-3 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20">Start Module</button> </div> <div className={rounded-xl p-4 ${th.card}}> <div className="font-semibold">Hardware Guide</div> <div className={text-sm ${th.textDim}}>Recommended lever, buttons, and travel for Tekken precision.</div> <button className="mt-3 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20">View Build</button> </div> </div> </div> </motion.section> ); }

