import React, { useState } from 'react'
import { ChevronDown, Thermometer } from 'lucide-react'

interface BFSection {
  id: string
  title: string
  icon: string
  color: string
  description: string
  bullets: string[]
}

const BF_SECTIONS: BFSection[] = [
  {
    id: 'initialbrand',
    title: 'Initialbrand & Det tidlige brandforløb',
    icon: '🕯️',
    color: 'amber',
    description: 'Branden starter i et enkelt objekt. Røg stiger op og danner røggaslag under loftet.',
    bullets: [
      'Initialbranden er selve startpunktet – f.eks. en sofa der antændes.',
      'Røg og varme gasser stiger op som en "fane" og rammer loftet.',
      'Røgen bøjer af ud mod siderne og begynder at danne et røggaslag.',
      'Røggaslaget sænker sig over tid og bliver mørkere efterhånden som flere sodpartikler ophobes.',
      'Processen er overstået inden ca. 1-2 minutter afhængigt af rum, materiale og placering.',
      'Varmen i røggaslaget øger varmestrålingen ned mod gulvet og opvarmer alle overflader i rummet.',
      'Når overfladetemperaturen nærmer sig 100–300°C starter pyrolysen – materialerne afgiver brandbare gasser.',
    ],
  },
  {
    id: 'overtaending',
    title: 'Overtændingsfasen',
    icon: '💥',
    color: 'rose',
    description: 'Overgangen fra det tidlige brandforløb til den fuldt udviklede rumbrand. Meget kritisk fase.',
    bullets: [
      'Overtændingen er en FASE (ikke et enkelt øjeblik) – den repræsenterer overgangen til fuldt développé rumbrand.',
      'Strålevarmen fra branden og røggaslaget er nu tilstrækkelig til at antænde ALT brandbart i rummet.',
      'Omfang, temperatur og tryk stiger hurtigt – røggaslaget sænkes hastigt mod gulvet.',
      'Fasen varer fra få sekunder til ca. 1 minut.',
      'For røgdykkere i rummet: fasen kan opleves dramatisk, men med korrekt beskyttelse og teknik kan den håndteres.',
      'For ubeskyttede personer er overlevelsesudsigterne meget begrænsede.',
      'Røggasserne kan antændes i denne fase – typisk som "flammetunger" nær loftet.',
    ],
  },
  {
    id: 'fuldt-udviklet',
    title: 'Fuldt udviklet rumbrand & Afkølingsfasen',
    icon: '🔥',
    color: 'orange',
    description: 'Alt brandbart brænder. Herefter falder temperaturen gradvist i afkølingsfasen.',
    bullets: [
      'Den fuldt udviklede rumbrand: ALT brandbart materiale i rummet brænder.',
      'Fasen kan vare fra få minutter til flere timer afhængigt af brandbelastning og ventilation.',
      'Temperaturen i røggaslaget er på sit højeste – risiko for konstruktionsskader.',
      'Branden kan brede sig til tilstødende rum og bygninger.',
      'Afkølingsfasen: størstedelen af det brandbare materiale er opbrændt.',
      'Effektudvikling og temperatur falder gradvist – afkølingsfasen kan vare mange timer eller dage.',
      'Rumbrand med begrænset ventilation: iltmangel kan bremse branden inden overtændingsfasen nås (underventileret brand).',
    ],
  },
  {
    id: 'backdraft',
    title: 'Backdraft',
    icon: '🌪️',
    color: 'purple',
    description: 'Hurtig, voldsom forbrænding når luft tilføres en kraftig underventileret rumbrand med uforbrændte røggasser.',
    bullets: [
      'Def.: "Backdraft er den hurtige, og til tider voldsomme forbrænding, som kan opstå, når man tilfører luft til en kraftig underventileret rumbrand, der har produceret store mængder uforbrændte røggasser."',
      'Forløbet: (1) uforbrændte røggasser ophobes → (2) luft strømmer ind → (3) blanding af luft og røggasser → (4) en tændkilde antænder gasblandingen → (5) deflagration → ildkugle presses ud.',
      'Resulterer i en turbulent, meget hurtig flammeforbrænding (deflagration) – en ildkugle presses ud af rummet.',
      'En backdraft er IKKE en eksplosion, men en hurtig forbrænding (deflagration, 3-5 m/s).',
      'En backdraft er IKKE det samme som en overtænding – overtænding er en fase, backdraft er et fysisk fænomen.',
      'Advarselstegn: ingen synlige flammer, kraftig sort røg, pulserende røgudvikling, hede døre og vinduer, "indsugende" luftbevægelse ved åbninger.',
    ],
  },
  {
    id: 'roggaseksplosion',
    title: 'Røggaseksplosion',
    icon: '💢',
    color: 'red',
    description: 'Antændelse af en forblandet gas/luft-blanding i et mere eller mindre lukket rum – typisk i tilstødende rum.',
    bullets: [
      'Def.: "En røggaseksplosion opstår, når en blanding mellem luft og røggasser er indenfor antændelsesområdet og antændes i et mere eller mindre lukket rum."',
      'Sker typisk i et TILSTØDENDE rum til brandrummet – ikke i selve brandrummet.',
      'Røggasser siver ind i det tilstødende rum og blandes med luft (turbulens fremmer blandingen).',
      'Forudsætninger: (1) rummet er mere eller mindre lukket (tæt), (2) gasblanding indenfor antændelsesgrænser, (3) forblandede flammer ved antændelse.',
      'Forskel fra backdraft: røggaseksplosion sker uden ventilationsforholdene aktivt påvirkes (f.eks. ingen åbnet dør), og typisk i tilstødende rum.',
      'Konsekvenser: alvorlige personskader, konstruktionsskader, sammenstyrtningsfare og uforudsigelig brandspredning.',
      'Meget svær at forudsige – kendetegnet ved kraftig overtændingsfase eller meget hurtig brandtilvækst.',
    ],
  },
]

const bfColorMap: Record<string, { bg: string; border: string; text: string; badge: string; bullet: string; stepBg: string }> = {
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bullet: 'bg-amber-400',
    stepBg: 'bg-amber-500 text-slate-950',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-300',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    bullet: 'bg-rose-400',
    stepBg: 'bg-rose-500 text-slate-950',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-300',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    bullet: 'bg-orange-400',
    stepBg: 'bg-orange-500 text-slate-950',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bullet: 'bg-purple-400',
    stepBg: 'bg-purple-500 text-slate-950',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-300',
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
    bullet: 'bg-red-400',
    stepBg: 'bg-red-500 text-slate-950',
  },
}

export const BrandforloebContent: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('initialbrand')

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-gradient-to-br from-rose-500/15 via-slate-900 to-slate-900/90 border border-rose-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-md mb-1.5">
              Brandteori · BRS
            </span>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Brandforløb
            </h1>
            <p className="text-sm font-semibold text-rose-300 mt-0.5">
              Rumbrandens faser · Backdraft · Røggaseksplosion
            </p>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Overblik over hvordan en rumbrand udvikler sig fra initialbrand til afkøling, samt særlige fænomener som kan opstå under særlige omstændigheder.
            </p>
          </div>
        </div>

        {/* Phase pills */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-medium text-slate-400 mr-1">Afsnit:</span>
          {BF_SECTIONS.map((s) => {
            const colors = bfColorMap[s.color] || bfColorMap.amber
            const isActive = expandedSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => setExpandedSection(isActive ? null : s.id)}
                className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer font-medium ${isActive
                    ? `${colors.stepBg} border-transparent shadow-sm`
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                title={s.title}
              >
                {s.icon}
              </button>
            )
          })}
        </div>
      </div>

      {/* SVG Brandforløbsdiagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-rose-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Brandforløbsdiagrammet
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            Temp vs. Tid
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">
          Temperatur i røggaslaget over tid · y-aksen = temp, x-aksen = tid
        </p>
        <div className="w-full bg-slate-950/80 rounded-xl border border-slate-800/90 p-2 sm:p-3 relative overflow-hidden">
          <div className="flex justify-center">
            <svg
              viewBox="0 0 560 195"
              className="w-full max-w-2xl h-auto select-none"
              style={{ 
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                aspectRatio: '560/195'
              }}
            >
            <defs>
              <pattern id="grid-bf" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
              </pattern>
              <marker id="arrow-bf" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#94a3b8" />
              </marker>
            </defs>
            <rect width="560" height="195" fill="url(#grid-bf)" opacity="0.4" rx="8" />

            {/* Axes */}
            <line x1="55" y1="165" x2="542" y2="165" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-bf)" />
            <line x1="55" y1="165" x2="55" y2="8" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-bf)" />
            <text x="300" y="182" fill="#64748b" fontSize="9" textAnchor="middle">Tid</text>
            <text x="30" y="90" fill="#64748b" fontSize="9" textAnchor="middle" transform="rotate(-90,30,90)">Temp</text>

            {/* Brandforløbskurven */}
            <path
              d="M 60 150
                 C 120 148, 160 146, 200 140
                 C 220 135, 240 125, 260 110"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Dashed line for overtændingsfase */}
            <path
              d="M 260 110 C 275 85, 290 50, 310 30"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
            />

            {/* Solid line for fuldt udviklet rumbrand and afkølingsfase */}
            <path
              d="M 310 30
                 C 330 22, 350 20, 370 22
                 C 390 25, 410 35, 430 50
                 C 450 70, 470 95, 490 120
                 C 505 135, 515 145, 530 155"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Labels */}
            <text x="70" y="135" fill="white" fontSize="9" fontWeight="600">Det tidlige</text>
            <text x="70" y="147" fill="white" fontSize="9" fontWeight="600">brandforløb</text>
            <text x="180" y="65" fill="white" fontSize="9" fontWeight="600">Overtændingsfase</text>
            <text x="270" y="15" fill="white" fontSize="9" textAnchor="middle" fontWeight="600">Fuldt udviklet rumbrand</text>
            <text x="460" y="50" fill="white" fontSize="9" fontWeight="600">Afkølingsfase</text>

            {/* Arrows */}
            <path d="M 125 132 L 140 142" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow-bf)" />
            <path d="M 220 68 L 275 75" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow-bf)" />
            <path d="M 320 18 L 320 22" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow-bf)" />
            <path d="M 440 60 L 455 80" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow-bf)" />
          </svg>
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-2">
        {BF_SECTIONS.map((section) => {
          const isOpen = expandedSection === section.id
          const colors = bfColorMap[section.color] || bfColorMap.amber
          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition-all overflow-hidden ${isOpen
                  ? `${colors.bg} ${colors.border} shadow-lg`
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
            >
              <button
                onClick={() => setExpandedSection(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{section.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${isOpen ? colors.text : 'text-white group-hover:text-amber-200'
                          } transition-colors`}
                      >
                        {section.title}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${colors.badge}`}>
                        {section.bullets.length} punkter
                      </span>
                    </div>
                    {!isOpen && (
                      <p className="text-[10px] text-slate-500 mt-0.5">{section.description}</p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-amber-400' : 'text-slate-500'
                    }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 space-y-2">
                  <p className={`text-[11px] ${colors.text} font-medium mb-2 ml-7`}>{section.description}</p>
                  {section.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs leading-relaxed ml-7">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.bullet} mt-1.5 flex-shrink-0`} />
                      <span className="text-slate-200">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick-reference card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Nøglebegreber</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Initialbrand', value: 'Startpunkt', sub: 'Ét brændende objekt' },
            { label: 'Overtænding', value: 'En FASE', sub: 'Sek. til ~1 min.' },
            { label: 'Fuldt udviklet', value: 'Alt brænder', sub: 'Min. til timer' },
            { label: 'Afkølingsfase', value: 'Temp. falder', sub: 'Timer til dage' },
            { label: 'Backdraft', value: 'Deflagration', sub: '~3-5 m/s flammeudbredelse' },
            { label: 'Røggaseksplosion', value: 'Tilstødende rum', sub: 'Forblandet gasblanding' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center"
            >
              <div className="text-[10px] text-slate-400 font-medium">{item.label}</div>
              <div className="text-sm font-bold text-white mt-0.5">{item.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
