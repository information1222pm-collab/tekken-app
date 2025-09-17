import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Sword,
  Users,
  Gamepad2,
  Sparkles,
  Trophy,
  Settings2,
} from "lucide-react";

// Flashy Neon UI Mock — single-file React component
// - Tailwind utility classes
// - Framer Motion animations
// - Theme switcher (Midnight / Neon / Dojo)
// - Tabs: Guides / Drills / Community / Arcade

const THEMES = {
  Midnight: {
    bg: "from-gray-950 via-black to-gray-900",
    card: "bg-gray-900/70 backdrop-blur",
    accent: "from-pink-500 via-red-500 to-rose-500",
    textDim: "text-gray-300",
  },
  Neon: {
    bg: "from-fuchsia-950 via-black to-gray-900",
    card: "bg-fuchsia-900/60 backdrop-blur",
    accent: "from-cyan-400 via-fuchsia-500 to-pink-400",
    textDim: "text-fuchsia-200",
  },
  Dojo: {
    bg: "from-yellow-900 via-amber-900 to-yellow-800",
    card: "bg-yellow-900/70 backdrop-blur",
    accent: "from-amber-500 via-orange-400 to-yellow-400",
    textDim: "text-yellow-200",
  },
};

const CHARACTERS = [
  { name: "Jin", tag: "T8", color: "bg-rose-600" },
  { name: "Kazuya", tag: "T8", color: "bg-purple-600" },
  { name: "Asuka", tag: "T7", color: "bg-emerald-600" },
  { name: "Paul", tag: "T8", color: "bg-yellow-500" },
  { name: "King", tag: "T7", color: "bg-orange-600" },
  { name: "Lili", tag: "T8", color: "bg-pink-500" },
  { name: "Hwoarang", tag: "T8", color: "bg-red-600" },
  { name: "Law", tag: "T7", color: "bg-lime-500" },
];

const TABS = [
  { id: "guides", label: "Guides", icon: Sword },
  { id: "drills", label: "Drills", icon: Trophy },
  { id: "community", label: "Community", icon: Users },
  { id: "arcade", label: "Arcade", icon: Gamepad2 },
];

export default function NeonMock() {
  const [theme, setTheme] = useState("Neon");
  const [tab, setTab] = useState("guides");
  const [activeChar, setActiveChar] = useState("Jin");

  const th = THEMES[theme];

  return (
    <div
      className={`min-h-screen text-white bg-gradient-to-b ${th.bg} relative overflow-hidden`}
    >
      {/* animated background accents */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, #f0f 0%, #00e5ff 80%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 6, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
      />

      {/* header */}
      <header className="relative z-10 max-w-6xl mx-auto px-4 pt-6">
        <div
          className={`w-full rounded-2xl p-4 ${th.card} flex items-center justify-between shadow-xl`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="p-2 rounded-xl bg-white/5"
            >
              <Sparkles className="size-6" />
            </motion.div>
            <div>
              <div className="text-lg font-bold tracking-wide">
                Tekken Mentor
              </div>
              <div className={`text-xs ${th.textDim}`}>
                TTT2 • Tekken 7 • Tekken 8
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme switcher */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              {Object.keys(THEMES).map((t) => (
                <button
                  key={t}
                  className={`px-3 py-1 text-sm rounded-full border border-white/10 ${
                    theme === t ? "bg-white/10" : "bg-transparent"
                  }`}
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
                tab === id
                  ? "bg-white/10"
                  : "bg-white/5 hover:bg-white/10 transition"
              }`}
            >
              <Icon className="size-4 opacity-90" />
              <span className="font-medium">{label}</span>
              {tab === id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--tw-gradient-stops))",
                  }}
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
          {tab === "guides" && (
            <Guides
              th={th}
              activeChar={activeChar}
              setActiveChar={setActiveChar}
            />
          )}
          {tab === "drills" && <Drills th={th} />}
          {tab === "community" && <Community th={th} />}
          {tab === "arcade" && <Arcade th={th} />}
        </AnimatePresence>
      </main>

      {/* footer glow bar */}
      <div
        className="fixed bottom-0 left-0 right-0 h-1 opacity-70"
        style={{
          background: "linear-gradient(90deg,#00e5ff,#ff00aa,#ffaa00)",
        }}
      />
    </div>
  );
}

function Guides({ th, activeChar, setActiveChar }) {
  const clip = useMemo(() => {
    return "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"; // demo clip
  }, [activeChar]);

  return (
    <motion.section
      key="guides"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`rounded-2xl p-4 ${th.card}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-wide">
            Character Guides
          </h2>
          <div className={`text-xs ${th.textDim}`}>
            Video • Frame Data • Matchups
          </div>
        </div>
        {/* character grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CHARACTERS.map((c) => (
            <motion.button
              key={c.name}
              whileHover={{ y: -2, scale: 1.02 }}
              onClick={() => setActiveChar(c.name)}
              className={`rounded-xl p-3 flex flex-col items-center gap-1 ${c.color} bg-opacity-80 ${
                activeChar === c.name
                  ? "ring-2 ring-white/90"
                  : "opacity-80 hover:opacity-100"
              } transition`}
            >
              <span className="text-md font-semibold">{c.name}</span>
              <span className="text-xs">{c.tag}</span>
            </motion.button>
          ))}
        </div>
        {/* video + details */}
        <div className="mt-5 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <video
                className="w-full aspect-video"
                src={clip}
                controls
                poster=""
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                style={{
                  background:
                    "radial-gradient(60% 80% at 40% 50%, #fff 0%, transparent 100%)",
                }}
              />
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
  );
}

function Drills({ th }) {
  return (
    <motion.section
      key="drills"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`rounded-2xl p-4 ${th.card}`}>
        <h2 className="text-lg font-semibold tracking-wide mb-2">Drills</h2>
        <ul className={`space-y-2 ${th.textDim}`}>
          <li>Execution Trainer</li>
          <li>Reaction Time</li>
          <li>Combo Trials</li>
          <li>Movement Practice</li>
        </ul>
        <button className="mt-4 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-400 text-black font-semibold">
          Start Drill
        </button>
      </div>
    </motion.section>
  );
}

function Community({ th }) {
  return (
    <motion.section
      key="community"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`rounded-2xl p-4 ${th.card}`}>
        <h2 className="text-lg font-semibold tracking-wide mb-2">
          Community
        </h2>
        <ul className={`space-y-2 ${th.textDim}`}>
          <li>Discord</li>
          <li>Reddit</li>
          <li>Leaderboards</li>
          <li>Events</li>
        </ul>
        <button className="mt-4 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-400 text-black font-semibold">
          Join Community
        </button>
      </div>
    </motion.section>
  );
}

function Arcade({ th }) {
  return (
    <motion.section
      key="arcade"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`rounded-2xl p-4 ${th.card}`}>
        <h2 className="text-lg font-semibold tracking-wide mb-2">
          Arcade Mode
        </h2>
        <ul className={`space-y-2 ${th.textDim}`}>
          <li>Play vs CPU</li>
          <li>Challenge Mode</li>
          <li>Mini-games</li>
        </ul>
        <button className="mt-4 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-400 text-black font-semibold">
          Enter Arcade
        </button>
      </div>
    </motion.section>
  );
}
