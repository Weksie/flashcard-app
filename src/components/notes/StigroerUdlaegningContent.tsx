import React, { useState } from 'react'
import {
  ChevronDown,
  Building2,
  Users,
  Shield,
  ClipboardList,
  Target,
  Truck,
  ArrowUpRight,
  Sparkles,
  Layers,
  Wrench,
} from 'lucide-react'

export const StigroerUdlaegningContent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('oversigt')
  const [highlightedRole, setHighlightedRole] = useState<string | null>(null)

  const rollbeskrivelser = [
    {
      id: 'leder',
      titel: 'Holdlederen',
      hvemSub: 'Leder indsatsen',
      materiel: 'Lygte',
      color: 'amber',
      icon: Users,
      opgaver: [
        'Giver befaling og fremtager lygte.',
        'Begiver sig sammen med nr. 1 og nr. 2 – eventuelt med elevator – til angrebsstedet.',
        'Åbner for stigrørsventilen på signal fra nr. 1, når angrebet er klargjort.',
      ],
    },
    {
      id: 'nr1',
      titel: 'Nr. 1',
      hvemSub: 'Røgdykker / Angrebsrør',
      materiel: 'S O S + C-slange',
      color: 'rose',
      icon: Target,
      opgaver: [
        'Fremtager S O S (Strålerør, Ophalerline, Slangekrog) og C-slange.',
        'Begiver sig til angrebsstedet (sammen med leder og nr. 2).',
        'Klargør angrebet og giver signal til holdlederen om at åbne for stigrørsventilen.',
      ],
    },
    {
      id: 'nr2',
      titel: 'Nr. 2',
      hvemSub: 'Røgdykkermakker / Slangefører',
      materiel: 'C-slanger + Slangenøgle',
      color: 'blue',
      icon: Shield,
      opgaver: [
        'Fremtager C-slanger samt slangenøgle og begiver sig til angrebsstedet.',
        'Sikrer sig, at stigrørsventilen på etagen er LUKKET før tilkobling.',
        'Tilkobler slange til stigrøret og udlægger den frem til nr. 1.',
        'Hjælper nr. 1 med slangens videre fremføring mod ilden.',
      ],
    },
    {
      id: 'nr3',
      titel: 'Nr. 3',
      hvemSub: 'Trykfødelinjer til stigrør',
      materiel: 'Stigrørsstykke, Slangenøgle, B-slanger',
      color: 'emerald',
      icon: Truck,
      opgaver: [
        'Fremtager stigrørsstykke, slangenøgle og B-slanger.',
        'Udlægger slanger fra pumpen til indløbet på stigrøret og påsætter stigrørsstykke.',
        'Tilkobler B-slange til højre indløb og melder: "Luk op for 1. slange".',
        'Tilkobler derefter B-slange til venstre indløb, udlægger B-slanger tilbage til pumpen og melder: "Luk op for 2. slange".',
        'Efterser at alle stigrørsventiler, der ikke benyttes, er lukket.',
        'Melder sig derefter til holdlederen.',
      ],
    },
    {
      id: 'nr4',
      titel: 'Nr. 4',
      hvemSub: 'Vandforsyning',
      materiel: 'B B B',
      color: 'purple',
      icon: ClipboardList,
      opgaver: [
        'Fremtager B B B (Brandhanenøgle, Brandhanestykke, B-fødeslange).',
        'Udlægger fødeslange fra brandhane til automobilsprøjten.',
        'Melder sig derefter ved motorpasseren og assisterer denne.',
      ],
    },
    {
      id: 'mp',
      titel: 'Motorpasseren',
      hvemSub: 'Pumpebetjening',
      materiel: '—',
      color: 'cyan',
      icon: Wrench,
      opgaver: [
        'Hjælper nr. 4 med at fremtage B B B.',
        'Sørger for tilkobling af B-slangerne fra stigrøret.',
        'Åbner for vandet, når signalerne gives for henholdsvis: "Luk op for 1. slange" og "Luk op for 2. slange".',
        'Overvåger pumpetrykket for at sikre det nødvendige tryk op gennem stigrøret til etagen.',
      ],
    },
  ]

  const materielKrav = [
    { label: 'S O S (Nr. 1)', desc: 'Strålerør (C), Ophalerline, Slangekrog', icon: Target },
    { label: 'C-slanger (1 + 2)', desc: 'C-angrebsslanger på brandetagen', icon: Shield },
    { label: 'Slangenøgle (Nr. 2 & 3)', desc: 'Til spænding af koblinger ved stigrør & stykke', icon: Wrench },
    { label: 'Stigrørsstykke (Nr. 3)', desc: 'Dobbelt B-indløb med tilbageslagsklapper', icon: Building2 },
    { label: 'B-slanger (Nr. 3)', desc: '2 stk. trykfødelinjer (højre og venstre indløb)', icon: Layers },
    { label: 'B B B (Nr. 4)', desc: 'Brandhanenøgle, Brandhanestykke, B-fødeslange', icon: ClipboardList },
  ]

  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  }

  const sections = [
    {
      id: 'oversigt',
      title: 'Oversigt & Kommando',
      bullets: [
        'Kommando: "Fra stigrøret C-slangen ud".',
        'Anvendes ved bygningsbrande i etageejendomme og højhuse med tørt stigrør.',
        'Effektiv taktik: Undgår lang slangeføring op ad trapperum – vandet pumpes direkte op i bygningens faste rørføring.',
        'To uafhængige B-slanger (højre og venstre indløb) sikrer maksimal kapacitet og redundans, hvis én slange sprænger.',
        'Sikkerhedskontrol: Nr. 2 kontrollerer altid etageventilen før tilkobling, og nr. 3 efterser alle ubrugte ventiler.',
      ],
    },
    { id: 'roller', title: 'Rollefordeling (Alle 6 mand)', bullets: [] },
    { id: 'materiel', title: 'Materielkrav (SOS, BBB & Stigrørsstykke)', bullets: [] },
    {
      id: 'fremgangsmaade',
      title: 'Trin-for-trin Fremgangsmåde & Signaler',
      bullets: [
        '1. Befaling: Holdlederen beordrer "Fra stigrøret C-slangen ud" og går med 1.er og 2.er til etagen (evt. elevator).',
        '2. Angrebsklargøring: Nr. 2 sikrer lukket etageventil, tilkobler C-slange og udlægger frem til nr. 1.',
        '3. Fødelinje 1: Nr. 3 monterer stigrørsstykke på bygningens indløb, kobler højre B-slange og melder: "Luk op for 1. slange".',
        '4. Fødelinje 2: Nr. 3 kobler venstre B-slange, ruller tilbage til pumpen og melder: "Luk op for 2. slange".',
        '5. Vandforsyning: Nr. 4 udlægger BBB fra brandhane til automobilsprøjten og bistår motorpasseren.',
        '6. Vandalarm/Tryk: MP åbner for vandet til B-slangerne efterhånden som meldinger gives.',
        '7. Angreb startes: Nr. 1 melder klar, og holdlederen åbner for etagens stigrørsventil.',
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-slate-900/95 border border-blue-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-md">
                Slangeudlægning · Højhustaktik
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Sparkles className="w-3 h-3" /> Standardprocedure
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-400" />
              Stigrørsudlægning
            </h1>
            <p className="text-sm font-semibold text-blue-200 mt-1">
              "Fra stigrøret C-slangen ud"
            </p>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
              Standardprocedure ved brand i etagebyggeri med tørt stigrør. Komplet bemanding for alle 6 mand,
              dobbelt B-fødelinje, signalsystem og sikring af ventiler.
            </p>
          </div>
        </div>

        {/* Quick Role Highlight Pills */}
        <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-medium text-slate-400 mr-1">Fremhæv rolle:</span>
          <button
            onClick={() => setHighlightedRole(null)}
            className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
              highlightedRole === null
                ? 'bg-blue-500 text-slate-950 font-bold border-transparent'
                : 'bg-slate-850 text-slate-400 border-slate-750 hover:text-white'
            }`}
          >
            Alle
          </button>
          {rollbeskrivelser.map((r) => {
            const isHl = highlightedRole === r.id
            const colors = colorMap[r.color]
            return (
              <button
                key={r.id}
                onClick={() => setHighlightedRole(isHl ? null : r.id)}
                className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  isHl
                    ? `${colors.badge} border-transparent font-bold`
                    : 'bg-slate-850 text-slate-300 border-slate-750 hover:bg-slate-800'
                }`}
              >
                {r.titel}
              </button>
            )
          })}
        </div>
      </div>

      {/* Taktisk Skitse Diagram (SVG) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Taktisk Skitse: Stigrørsudlægning
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            Bygning m. tørt stigrør
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">
          Princippet for tilkobling i bunden (2× B-slange) og angreb på etagen (C-slange fra stigrørsventil):
        </p>

        <div className="w-full bg-slate-950/90 rounded-xl border border-slate-800/90 p-2 sm:p-3 relative overflow-hidden flex justify-center">
          <svg
            viewBox="0 0 620 280"
            className="w-full max-w-3xl h-auto select-none"
            style={{ aspectRatio: '620/280' }}
          >
            <defs>
              <marker id="hose-arrow-st" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="fire-arrow-st" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#f43f5e" />
              </marker>
            </defs>

            {/* Ground */}
            <line x1="10" y1="240" x2="610" y2="240" stroke="#334155" strokeWidth="2" />

            {/* Brandhane (BBB) */}
            <g transform="translate(30, 195)">
              <rect x="5" y="15" width="14" height="30" fill="#dc2626" rx="2" />
              <rect x="0" y="22" width="24" height="6" fill="#991b1b" rx="1" />
              <text x="12" y="8" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Brandhane</text>
            </g>

            {/* Nr. 4 ved brandhane */}
            <g transform="translate(60, 200)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr4' ? '#c084fc' : '#7e22ce'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">4.</text>
              <text x="12" y="32" fill="#c084fc" fontSize="8" textAnchor="middle" fontWeight="bold">BBB (Føde)</text>
            </g>

            {/* Fødeslange fra brandhane til sprøjte */}
            <path d="M 44 225 C 70 230, 90 220, 120 220" fill="none" stroke="#a855f7" strokeWidth="3" />

            {/* Sprøjten (Fire Truck) */}
            <g transform="translate(120, 155)">
              <rect x="0" y="25" width="65" height="55" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <rect x="40" y="45" width="25" height="35" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
              <circle cx="15" cy="80" r="7" fill="#334155" />
              <circle cx="50" cy="80" r="7" fill="#334155" />
              <text x="30" y="55" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Sprøjte</text>
            </g>

            {/* Motorpasseren */}
            <g transform="translate(145, 120)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'mp' ? '#38bdf8' : '#0284c7'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">MP</text>
              <text x="12" y="-2" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Pumpe</text>
            </g>

            {/* Bygning med etager */}
            <rect x="330" y="20" width="260" height="220" fill="#090d16" stroke="#475569" strokeWidth="2" rx="4" />
            <line x1="330" y1="95" x2="590" y2="95" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="330" y1="170" x2="590" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
            <text x="560" y="50" fill="#64748b" fontSize="9" textAnchor="end">3. Sal (Brandsted)</text>
            <text x="560" y="125" fill="#64748b" fontSize="9" textAnchor="end">2. Sal</text>
            <text x="560" y="200" fill="#64748b" fontSize="9" textAnchor="end">Stueetage</text>

            {/* Det tørre stigrør (rødt rør gennem bygningen) */}
            <line x1="365" y1="35" x2="365" y2="235" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
            <text x="365" y="18" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Tørt Stigrør</text>

            {/* Stigrørsstykke i bunden med 2 indløb */}
            <g transform="translate(345, 205)">
              <rect x="10" y="0" width="20" height="25" fill="#e2e8f0" stroke="#475569" rx="2" />
              <circle cx="5" cy="18" r="5" fill="#3b82f6" />
              <circle cx="35" cy="18" r="5" fill="#3b82f6" />
              <text x="20" y="38" fill="#94a3b8" fontSize="8" textAnchor="middle">Stigrørsstykke</text>
            </g>

            {/* 2 stk B-slanger fra sprøjte til stigrør (Nr. 3) */}
            {/* 1. slange (højre indløb) */}
            <path d="M 185 190 C 230 185, 270 205, 350 223" fill="none" stroke="#10b981" strokeWidth="3" />
            {/* 2. slange (venstre indløb) */}
            <path d="M 185 205 C 230 205, 270 225, 380 223" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="4,2" />

            {/* Nr. 3 ved stigrørsindløb */}
            <g transform="translate(290, 185)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr3' ? '#34d399' : '#059669'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">3.</text>
              <text x="12" y="-3" fill="#34d399" fontSize="8" textAnchor="middle" fontWeight="bold">2x B-slanger</text>
              <text x="12" y="32" fill="#a7f3d0" fontSize="7" textAnchor="middle">"Luk op 1 & 2"</text>
            </g>

            {/* Stigrørsventil på etagen (3. sal) */}
            <g transform="translate(365, 55)">
              <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              <line x1="0" y1="0" x2="20" y2="0" stroke="#f59e0b" strokeWidth="3" />
              <text x="25" y="-3" fill="#fbbf24" fontSize="8" fontWeight="bold">Ventil (åbnes af HL)</text>
            </g>

            {/* Holdlederen på brandetagen */}
            <g transform="translate(415, 35)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'leder' ? '#fbbf24' : '#d97706'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">HL</text>
              <text x="12" y="30" fill="#fbbf24" fontSize="8" textAnchor="middle">Åbner ventil</text>
            </g>

            {/* Nr. 2 (tilkobler C-slange) */}
            <g transform="translate(450, 45)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr2' ? '#60a5fa' : '#2563eb'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">2.</text>
              <text x="12" y="30" fill="#60a5fa" fontSize="8" textAnchor="middle">C-slanger</text>
            </g>

            {/* C-angrebsslange på etagen */}
            <path d="M 385 55 C 410 65, 440 60, 485 55" fill="none" stroke="#f43f5e" strokeWidth="2.5" />

            {/* Nr. 1 med SOS mod branden */}
            <g transform="translate(490, 35)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr1' ? '#fb7185' : '#e11d48'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">1.</text>
              <text x="12" y="30" fill="#fb7185" fontSize="8" textAnchor="middle">SOS</text>
            </g>

            {/* Ild på 3. sal */}
            <g transform="translate(540, 30)">
              <path d="M 0 30 C -10 15, 0 5, -3 0 C 10 5, 8 18, 15 30 Z" fill="#f97316" />
              <path d="M 2 30 C -4 18, 3 12, 1 7 C 8 12, 5 20, 10 30 Z" fill="#facc15" />
            </g>
          </svg>
        </div>
      </div>

      {/* Accordion Sektioner */}
      <div className="space-y-2.5">
        {sections.map((section) => {
          const isOpen = expanded === section.id
          const isRoller = section.id === 'roller'
          const isMateriel = section.id === 'materiel'

          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-blue-500/10 border-blue-500/30 shadow-lg'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-xl bg-slate-800 border border-slate-700/60 text-blue-400">
                    {section.id === 'oversigt' && <Building2 className="w-4 h-4" />}
                    {section.id === 'roller' && <Users className="w-4 h-4" />}
                    {section.id === 'materiel' && <ClipboardList className="w-4 h-4" />}
                    {section.id === 'fremgangsmaade' && <ArrowUpRight className="w-4 h-4" />}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isOpen ? 'text-blue-300' : 'text-white group-hover:text-blue-200'
                    } transition-colors`}
                  >
                    {section.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {section.id === 'oversigt' && (
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-xs font-semibold text-blue-200">
                        Kommando: <span className="font-mono text-white">"Fra stigrøret C-slangen ud"</span>
                      </div>
                      {section.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {isRoller && (
                    <div className="space-y-3">
                      {rollbeskrivelser.map((rolle) => {
                        const Icon = rolle.icon
                        const colors = colorMap[rolle.color]
                        const isHigh = highlightedRole === rolle.id
                        return (
                          <div
                            key={rolle.id}
                            className={`rounded-xl p-3 border transition-all ${
                              isHigh
                                ? `${colors.bg} ${colors.border} ring-1 ring-blue-400/30`
                                : 'bg-slate-950/40 border-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
                                  <Icon className={`w-4 h-4 ${colors.text}`} />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-white">{rolle.titel}</span>
                                  <span className="text-[10px] text-slate-400 ml-1.5">({rolle.hvemSub})</span>
                                </div>
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${colors.badge}`}>
                                Materiel: {rolle.materiel}
                              </span>
                            </div>
                            <ul className="space-y-1 ml-6">
                              {rolle.opgaver.map((opg, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                                  <span className={`w-1 h-1 rounded-full ${colors.text} bg-current mt-2 flex-shrink-0`} />
                                  <span>{opg}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {isMateriel && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {materielKrav.map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={idx}
                            className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5"
                          >
                            <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{item.label}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {section.id === 'fremgangsmaade' && (
                    <div className="space-y-2">
                      {section.bullets.map((trin, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                          <span className="font-bold text-blue-400 flex-shrink-0 mt-0.5 min-w-[16px]">{i + 1}.</span>
                          <span>{trin}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Hurtig-reference Nøgletal */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Hurtig Reference: Stigrørsudlægning
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Kommando', value: 'C-slangen ud', sub: 'Fra stigrøret' },
            { label: 'Fødelinjer', value: '2x B-slanger', sub: 'Højre + venstre indløb' },
            { label: 'Angrebsslange', value: 'C-slange', sub: 'På brandetagen' },
            { label: 'Åbner ventil', value: 'Holdlederen', sub: 'På signal fra Nr. 1' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400 font-medium">{item.label}</div>
              <div className="text-sm font-bold text-blue-300 mt-0.5">{item.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
