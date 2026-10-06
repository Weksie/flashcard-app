import React, { useState } from 'react'
import {
  ChevronDown,
  Droplets,
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

export const SkumUdlaegningContent: React.FC = () => {
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
        'Giver befaling: "Fra sprøjten skumslangen ud".',
        'Fremtager lygte og udpeger slangevejen.',
        'Begiver sig til angrebsstedet og leder angrebet mod branden.',
      ],
    },
    {
      id: 'nr1',
      titel: 'Nr. 1',
      hvemSub: 'Røgdykker / Strålefører',
      materiel: 'S O S (skumrør) + C el. B-slange',
      color: 'rose',
      icon: Target,
      opgaver: [
        'Fremtager S O S (Skumrør, Ophalerline, Slangekrog) og C eller B-slange.',
        'Begiver sig til angrebsstedet.',
        'Klargør angrebet med skumrøret.',
        'Ved en eventuel ophaling betjener han angrebsslangen.',
      ],
    },
    {
      id: 'nr2',
      titel: 'Nr. 2',
      hvemSub: 'Røgdykkermakker / Slangeudlægger fremme',
      materiel: 'C eller B-slanger',
      color: 'blue',
      icon: Shield,
      opgaver: [
        'Fremtager C eller B-slanger.',
        'Udlægger slangerne fra tilblanderen til angrebsstedet.',
        'Sørger for en hensigtsmæssig placering af slangerne uden skarpe knæk.',
        'Hjælper nr. 1 med slangens videre fremføring og medvirker ved evt. ophaling.',
      ],
    },
    {
      id: 'nr3',
      titel: 'Nr. 3',
      hvemSub: 'Tilblanderbetjener',
      materiel: 'C/B-slange, Tilblander, Skumslange, Dunk',
      color: 'emerald',
      icon: Truck,
      opgaver: [
        'Fremtager sammen med motorpasseren C eller B-slange, tilblander, skumvæskeslange og skumvæskedunk.',
        'Udlægger slangen fra pumpen til tilblanderen.',
        'Tilkobler slangen og skumvæskeslangen (sugerør i dunken).',
        'Betjener tilblanderen og justerer iblandingsprocenten.',
      ],
    },
    {
      id: 'nr4',
      titel: 'Nr. 4',
      hvemSub: 'Vandforsyning & Skumlogistik',
      materiel: 'B B B',
      color: 'purple',
      icon: ClipboardList,
      opgaver: [
        'Fremtager B B B (Brandhanenøgle, Brandhanestykke, B-fødeslange).',
        'Udlægger fødeslange fra brandhane til automobilsprøjten.',
        'Hjælper derefter nr. 3 med fremtagning af skumvæske og betjening af tilblander.',
      ],
    },
    {
      id: 'mp',
      titel: 'Motorpasseren',
      hvemSub: 'Pumpebetjening & Materiel',
      materiel: '—',
      color: 'cyan',
      icon: Wrench,
      opgaver: [
        'Hjælper nr. 3 med at fremtage C eller B-slange, tilblander, skumvæskeslange og skumvæskedunk.',
        'Betjener pumpen og tilkobler C eller B-slangen til sprøjtens trykafgang.',
        'Åbner for afgangen ved givet signal og holder korrekt driftstryk for tilblanderen.',
      ],
    },
  ]

  const materielKrav = [
    { label: 'S O S m. Skumrør (Nr. 1)', desc: 'Skumrør (tung-/mellemskum), Ophalerline, Slangekrog', icon: Target },
    { label: 'C- el. B-angrebsslanger (1 + 2)', desc: 'Slangelinje fra tilblanderen frem til skumrøret', icon: Shield },
    { label: 'Skumtilblander (Nr. 3 + MP)', desc: 'Z-tilblander med ejektorprincip og %-indstilling', icon: Droplets },
    { label: 'Skumvæskeslange (Nr. 3)', desc: 'Sugeslange med dykrør til opsugning fra dunk', icon: Wrench },
    { label: 'Skumvæskedunk(e) (Nr. 3 + 4)', desc: 'Skumvæske (Klasse A el. B) til kontinuerlig forsyning', icon: Layers },
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
        'Kommando: "Fra sprøjten skumslangen ud".',
        'Standardprocedure ved væskebrande (Klasse B), spild, tanke og faste stoffer, hvor der kræves skumtæppe.',
        'Skumblandingen opnås via en mellemkoblet tilblander (Z-blander), der suger skumvæske op ved ejektorprincippet.',
        'Samarbejde er afgørende: MP og nr. 3 etablerer tilblanderstationen, mens nr. 4 sikrer vand og bistår med skumlogistikken.',
        'Kontinuerlig skumforsyning: Skumtæppet må ikke brydes under slukningen, hvorfor rettidig udskiftning af dunke er vital.',
      ],
    },
    { id: 'roller', title: 'Rollefordeling (Alle 6 mand)', bullets: [] },
    { id: 'materiel', title: 'Materielkrav (SOS m. Skumrør, Tilblander & Dunke)', bullets: [] },
    {
      id: 'fremgangsmaade',
      title: 'Taktisk Fremgangsmåde & Skumteknik',
      bullets: [
        '1. Befaling: Holdlederen beordrer "Fra sprøjten skumslangen ud", fremtager lygte og udpeger slangevejen.',
        '2. Angrebshold: Nr. 1 og 2 rykker frem til angrebsstedet med SOS (skumrør) og angrebsslanger.',
        '3. Tilblanderstation: MP og nr. 3 fremtager tilblander, tilslutningsslange og skumvæskedunk. Nr. 3 kobler og betjener tilblanderen.',
        '4. Slangeføring fremme: Nr. 2 udlægger slanger fra tilblanderen frem til nr. 1 uden skarpe knæk for at minimere modtryk.',
        '5. Vandforsyning & Skumstøtte: Nr. 4 etablerer BBB og assisterer straks nr. 3 med at hente ekstra skumvæskedunke.',
        '6. Tryksætning: MP sætter korrekt pumpetryk på afgangen og åbner ved givet signal.',
        '7. Påføring: Skummet påføres blødt (f.eks. roll-back eller rain-down) for at opbygge et sammenhængende tæppe uden at plaske i væsken.',
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                Slangeudlægning · Skumindsats
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <Sparkles className="w-3 h-3" /> Standardprocedure
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Droplets className="w-6 h-6 text-amber-400" />
              Skumudlægning
            </h1>
            <p className="text-sm font-semibold text-amber-200 mt-1">
              "Fra sprøjten skumslangen ud"
            </p>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
              Standardprocedure ved væskebrande og skumindsatser. Komplet bemanding for alle 6 mand,
              tilblanderbetjening, skumvæskeforsyning og korrekt slangeføring.
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
                ? 'bg-amber-500 text-slate-950 font-bold border-transparent'
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
            <Droplets className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Taktisk Skitse: Skumudlægning
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            Fra sprøjten skumslangen ud
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">
          Opstilling af slangeforløb fra sprøjte over tilblander (m. dunk) frem til skumrør og brandsted:
        </p>

        <div className="w-full bg-slate-950/90 rounded-xl border border-slate-800/90 p-2 sm:p-3 relative overflow-hidden flex justify-center">
          <svg
            viewBox="0 0 620 260"
            className="w-full max-w-3xl h-auto select-none"
            style={{ aspectRatio: '620/260' }}
          >
            <defs>
              <marker id="foam-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Ground */}
            <line x1="10" y1="230" x2="610" y2="230" stroke="#334155" strokeWidth="2" />

            {/* Brandhane (BBB) */}
            <g transform="translate(25, 185)">
              <rect x="5" y="15" width="14" height="30" fill="#dc2626" rx="2" />
              <rect x="0" y="22" width="24" height="6" fill="#991b1b" rx="1" />
              <text x="12" y="8" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Brandhane</text>
            </g>

            {/* Nr. 4 ved brandhane / fødeslange */}
            <g transform="translate(55, 190)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr4' ? '#c084fc' : '#7e22ce'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">4.</text>
              <text x="12" y="32" fill="#c084fc" fontSize="8" textAnchor="middle" fontWeight="bold">BBB</text>
            </g>

            {/* Fødeslange */}
            <path d="M 40 215 C 65 220, 85 210, 110 210" fill="none" stroke="#a855f7" strokeWidth="3" />

            {/* Sprøjten (Fire Truck) */}
            <g transform="translate(110, 145)">
              <rect x="0" y="25" width="65" height="55" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <rect x="40" y="45" width="25" height="35" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
              <circle cx="15" cy="80" r="7" fill="#334155" />
              <circle cx="50" cy="80" r="7" fill="#334155" />
              <text x="30" y="55" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Sprøjte</text>
            </g>

            {/* Motorpasseren */}
            <g transform="translate(135, 110)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'mp' ? '#38bdf8' : '#0284c7'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">MP</text>
              <text x="12" y="-2" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Pumpe</text>
            </g>

            {/* Slange fra sprøjte til tilblander */}
            <path d="M 175 185 C 195 180, 220 185, 245 185" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <text x="210" y="178" fill="#93c5fd" fontSize="8" textAnchor="middle">Vand</text>

            {/* Tilblander Station (Nr. 3) */}
            <g transform="translate(245, 160)">
              {/* Tilblander box */}
              <rect x="0" y="20" width="30" height="15" rx="3" fill="#e2e8f0" stroke="#475569" />
              <text x="15" y="31" fill="#0f172a" fontSize="7" fontWeight="bold" textAnchor="middle">TILBL.</text>
              {/* Skumdunk */}
              <rect x="5" y="40" width="20" height="25" rx="2" fill="#f59e0b" stroke="#b45309" />
              <rect x="10" y="37" width="10" height="4" fill="#78350f" />
              <text x="15" y="55" fill="#78350f" fontSize="7" fontWeight="bold" textAnchor="middle">SKUM</text>
              {/* Sugeslange */}
              <path d="M 15 35 L 15 42" stroke="#475569" strokeWidth="2" />
            </g>

            {/* Nr. 3 ved tilblander */}
            <g transform="translate(248, 110)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr3' ? '#34d399' : '#059669'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">3.</text>
              <text x="12" y="-2" fill="#34d399" fontSize="8" textAnchor="middle" fontWeight="bold">Tilblander</text>
            </g>

            {/* Nr. 4 hjælper nr. 3 med skumdunke */}
            <g transform="translate(285, 175)">
              <circle cx="10" cy="10" r="8" fill={highlightedRole === 'nr4' ? '#c084fc' : '#7e22ce'} />
              <text x="10" y="13" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">4.</text>
              <text x="10" y="28" fill="#c084fc" fontSize="7" textAnchor="middle">Ekstra dunk</text>
            </g>

            {/* Skumslange fra tilblander til skumrør */}
            <path d="M 275 172 C 320 170, 360 160, 410 155 C 440 150, 470 145, 490 140" fill="none" stroke="#f59e0b" strokeWidth="4" />
            <text x="350" y="155" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">Skumvæskeblanding (C el. B)</text>

            {/* Nr. 2 (udlægger & støtter) */}
            <g transform="translate(420, 100)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr2' ? '#60a5fa' : '#2563eb'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">2.</text>
              <text x="12" y="32" fill="#60a5fa" fontSize="8" textAnchor="middle" fontWeight="bold">Slangeudlægger</text>
            </g>

            {/* Holdleder ved angrebsstedet */}
            <g transform="translate(465, 80)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'leder' ? '#fbbf24' : '#d97706'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">HL</text>
              <text x="12" y="32" fill="#fbbf24" fontSize="8" textAnchor="middle" fontWeight="bold">Leder</text>
            </g>

            {/* Nr. 1 med SOS (Skumrør) */}
            <g transform="translate(490, 115)">
              <circle cx="12" cy="12" r="9" fill={highlightedRole === 'nr1' ? '#fb7185' : '#e11d48'} />
              <text x="12" y="15" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">1.</text>
              {/* Skumrør */}
              <rect x="22" y="9" width="22" height="7" rx="1" fill="#e2e8f0" stroke="#64748b" />
              <text x="12" y="32" fill="#fb7185" fontSize="8" textAnchor="middle" fontWeight="bold">SOS (Skumrør)</text>
            </g>

            {/* Skumstråle mod ilden */}
            <path d="M 535 128 C 555 125, 570 145, 580 185" fill="none" stroke="#fef08a" strokeWidth="6" strokeDasharray="6,3" />

            {/* Skumtæppe og brandsted */}
            <g transform="translate(560, 195)">
              {/* Skumtæppe */}
              <ellipse cx="20" cy="20" rx="30" ry="10" fill="#fef08a" opacity="0.8" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="20" y="23" fill="#854d0e" fontSize="7" fontWeight="bold" textAnchor="middle">SKUMTÆPPE</text>
              {/* Flammer */}
              <path d="M 10 15 C 5 5, 12 -5, 10 -15 C 20 -5, 18 5, 25 15 Z" fill="#f97316" />
              <path d="M 22 15 C 18 5, 25 -2, 22 -8 C 28 -2, 26 5, 30 15 Z" fill="#facc15" />
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
                  ? 'bg-amber-500/10 border-amber-500/30 shadow-lg'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-xl bg-slate-800 border border-slate-700/60 text-amber-400">
                    {section.id === 'oversigt' && <Droplets className="w-4 h-4" />}
                    {section.id === 'roller' && <Users className="w-4 h-4" />}
                    {section.id === 'materiel' && <ClipboardList className="w-4 h-4" />}
                    {section.id === 'fremgangsmaade' && <ArrowUpRight className="w-4 h-4" />}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isOpen ? 'text-amber-300' : 'text-white group-hover:text-amber-200'
                    } transition-colors`}
                  >
                    {section.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {section.id === 'oversigt' && (
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-200">
                        Kommando: <span className="font-mono text-white">"Fra sprøjten skumslangen ud"</span>
                      </div>
                      {section.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
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
                                ? `${colors.bg} ${colors.border} ring-1 ring-amber-400/30`
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
                            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-0.5">
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
                          <span className="font-bold text-amber-400 flex-shrink-0 mt-0.5 min-w-[16px]">{i + 1}.</span>
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
          <ClipboardList className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Hurtig Reference: Skumudlægning
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Kommando', value: 'Skumslangen ud', sub: 'Fra sprøjten' },
            { label: 'Strålerør', value: 'SOS m. Skumrør', sub: 'Tung- el. mellemskum' },
            { label: 'Tilblander', value: 'Z-blander', sub: 'Ejektorprincip (Nr. 3)' },
            { label: 'Skumstøtte', value: 'Nr. 4 & MP', sub: 'Vand + skumlogistik' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center">
              <div className="text-[10px] text-slate-400 font-medium">{item.label}</div>
              <div className="text-sm font-bold text-amber-300 mt-0.5">{item.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
