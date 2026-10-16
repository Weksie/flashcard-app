import React, { useState } from 'react'
import {
  ChevronDown,
  BatteryCharging,
  Zap,
  ShieldAlert,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

interface BESSSection {
  id: string
  title: string
  icon: string
  color: string
  badge: string
  description: string
  bullets: string[]
  highlightBox?: {
    title: string
    text: string
    type: 'warning' | 'tip' | 'info'
  }
}

const BESS_SECTIONS: BESSSection[] = [
  {
    id: 'farer-abc',
    title: 'De 3 Særlige Farer (A - B - C)',
    icon: '⚠️',
    color: 'rose',
    badge: 'Hovedfarer',
    description:
      'Brand i litiumionbatterier adskiller sig markant fra almindelige brande på 3 kritiske punkter.',
    bullets: [
      'A. Elektrisk stød: Battericeller kan IKKE gøres spændingsløse. Tilsluttede solceller leverer strøm ved al belysning. Pas på "stranded energy" (restspænding efter brand) og strømførende slukningsvand.',
      'B. Afgasning & Eksplosion: Før antændelse udledes hvidlige, ildelugtende gasser (brint/H₂, CO, metan). I lukkede rum eller containere opbygges hurtigt en eksplosiv atmosfære!',
      'C. Atypisk brand (Thermal Runaway): Kemisk kædereaktion starter ved 65–70 °C. Cellen producerer selv ilt og varme – branden kan IKKE kvæles med pulver, skum eller gas!',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Lukkede rum = Eksplosionsfare!',
      text: 'Gå ALDRIG ind i et lukket rum eller en container med uantændt afgasning fra et BESS-anlæg. Risikoen for en pludselig gas-eksplosion er ekstrem!',
    },
  },
  {
    id: 'huskeregel-bess',
    title: 'Taktisk Huskeregel: B - E - S - S',
    icon: '📋',
    color: 'amber',
    badge: 'Indsatstaktik',
    description:
      'Beredskabsstyrelsens 4-trins model for sikker og struktureret indsats mod batterianlæg.',
    bullets: [
      'B – Betragt situationen: Er anlægget i det fri eller et lukket rum? Ses hvid afgasning (eksplosionsfare) eller åbne flammer? Er der personer i fare?',
      'E – Evaluer dine muligheder: Vurder adgangs- og retræteveje. Find teknisk ressourceperson/installatør. Planlæg udluftning på sikker afstand.',
      'S – Sluk for strømmen: Afbryd ekstern strømforsyning (hovedafbryder, solceller, lader). Husk: Selve batteriet har fortsat intern spænding!',
      'S – Sænk temperaturen: Køl med store mængder vand på afstand for at forhindre spredning. Hold dig væk fra døre og svage punkter på containere.',
    ],
    highlightBox: {
      type: 'tip',
      title: 'Taktisk tilgang',
      text: 'Hvis anlægget er i et lukket rum eller container: Vælg en defensiv taktik med køling udefra på sikker afstand eller kontrolleret udbrænding.',
    },
  },
  {
    id: 'risikoniveauer',
    title: 'Risikoniveauer 1 til 4 & Sikkerhedsafstande',
    icon: '📏',
    color: 'cyan',
    badge: 'Niveauer',
    description:
      'Kategorisering efter energimængde (kWh/MWh) og placering (i det fri vs. lukket rum).',
    bullets: [
      'Niveau 1 (Mindre batterier i det fri / produkter): Telefoner, el-cykler. Sikkerhedsafstand: 10 m (fare for fragmenter).',
      'Niveau 2 (Køretøjer / oplag i det fri): Elbiler, carporte, udendørs BESS. Sikkerhedsafstand: 25–50 m (køling på afstand).',
      'Niveau 3 (BESS i bygning el. container): Privat BESS i kælder/teknikrum eller container i det fri. Sikkerhedsafstand: 50 m (akut eksplosionsfare ved afgasning).',
      'Niveau 4 (Stort BESS / industri / færger): Store anlæg i MWh-klassen, underjordiske P-kældre. Sikkerhedsafstand: 50–100 m. Kræver stab og ressourcepersoner.',
      'Fremkørsel / Opstart: Hold altid 50–100 m afstand, indtil situationen og afgasningen er afklaret.',
    ],
  },
  {
    id: 'kritiske-regler',
    title: 'Kritiske Regler for Mandskabet',
    icon: '🛑',
    color: 'purple',
    badge: 'Do & Don\'t',
    description:
      'Vigtige operative retningslinjer til feltbrug.',
    bullets: [
      '1. Gå aldrig ind i et lukket rum/container før der er ventileret og målt for eksplosiv atmosfære.',
      '2. Stå ALDRIG foran containerdøre, ventilationslemme eller ruder (størst risiko ved trykaflastning).',
      '3. Fuld åndedrætsbeskyttelse er obligatorisk – batterirøg indeholder ekstremt giftige gasser (bl.a. flussyre / HF-gas og CO).',
      '4. Elektriske sikkerhedsafstande ved slukning med ferskvand: Samlet stråle = 5 m (lavspænding) / 10 m (højspænding). Spredt stråle = 1 m / 5 m.',
      '5. Termisk kamera måler kun overfladetemperatur – ikke intern celletemperatur! Brug det til at vurdere temperaturtrenden (stiger/falder den?).',
      '6. Genantændelse kan ske i op til 48 timer efter slukning pga. intern restvarme og "stranded energy".',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Skadestedsoverdragelse',
      text: 'Indpak ALDRIG et beskadiget BESS-anlæg lufttæt i presenning ved overdragelse. Det fanger restafgasning og genskaber eksplosionsfaren!',
    },
  },
]

const bessColorMap: Record<
  string,
  { bg: string; border: string; text: string; badge: string; bullet: string; stepBg: string }
> = {
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-300',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    bullet: 'bg-rose-400',
    stepBg: 'bg-rose-500 text-slate-950',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bullet: 'bg-amber-400',
    stepBg: 'bg-amber-500 text-slate-950',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-300',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bullet: 'bg-cyan-400',
    stepBg: 'bg-cyan-500 text-slate-950',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bullet: 'bg-purple-400',
    stepBg: 'bg-purple-500 text-slate-950',
  },
}

export const BESSContent: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('farer-abc')

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                BRS Temahæfte · December 2024
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                <Sparkles className="w-3 h-3" /> Kompakt Taktikguide
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <BatteryCharging className="w-6 h-6 text-amber-400" />
              Indsats ved Brand i BESS-anlæg
            </h1>
            <p className="text-sm font-semibold text-amber-300 mt-1">
              Battery Energy Storage Systems · Litiumionbatterier · Eksplosionsfare & Taktik
            </p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-2xl">
              Hurtigt overblik over de vigtigste indsatsmæssige prioriteter: Hovedfarerne (A-B-C),
              huskereglen B-E-S-S, risikoniveauer og de absolutte sikkerhedskrav for mandskabet.
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-medium text-slate-400 mr-1">Hurtig navigation:</span>
          {BESS_SECTIONS.map((s) => {
            const colors = bessColorMap[s.color] || bessColorMap.amber
            const isActive = expandedSection === s.id
            return (
              <button
                key={s.id}
                onClick={() => setExpandedSection(isActive ? null : s.id)}
                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                  isActive
                    ? `${colors.stepBg} border-transparent shadow-sm`
                    : 'bg-slate-850/90 text-slate-300 border-slate-750 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.badge}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* B-E-S-S 4-Step Grid Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <Zap className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            B - E - S - S Modellen (Hurtigt Overblik)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black text-sm flex items-center justify-center mx-auto mb-1.5">
              B
            </div>
            <div className="text-xs font-bold text-white">Betragt</div>
            <div className="text-[10px] text-amber-300/90 font-medium mt-0.5">Situationen</div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Er det lukket rum? Røg eller afgasning? Eksplosionsfare!
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center mx-auto mb-1.5">
              E
            </div>
            <div className="text-xs font-bold text-white">Evaluer</div>
            <div className="text-[10px] text-blue-300/90 font-medium mt-0.5">Muligheder</div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Adgangsveje, retræte, ressourceperson & ventilering på afstand.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-black text-sm flex items-center justify-center mx-auto mb-1.5">
              S
            </div>
            <div className="text-xs font-bold text-white">Sluk</div>
            <div className="text-[10px] text-rose-300/90 font-medium mt-0.5">Strømmen</div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Afbryd elnet & solceller. Batterier er ALTID strømførende!
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center mx-auto mb-1.5">
              S
            </div>
            <div className="text-xs font-bold text-white">Sænk</div>
            <div className="text-[10px] text-emerald-300/90 font-medium mt-0.5">Temperaturen</div>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Køl omgivelser på afstand. Gå ikke ind i lukkede rum!
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sektioner */}
      <div className="space-y-2.5">
        {BESS_SECTIONS.map((section) => {
          const isOpen = expandedSection === section.id
          const colors = bessColorMap[section.color] || bessColorMap.amber

          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? `${colors.bg} ${colors.border} shadow-lg`
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setExpandedSection(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                    {section.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm font-bold ${
                          isOpen ? colors.text : 'text-white group-hover:text-amber-200'
                        } transition-colors`}
                      >
                        {section.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${colors.badge}`}>
                        {section.badge}
                      </span>
                    </div>
                    {!isOpen && (
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{section.description}</p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <p className={`text-xs ${colors.text} font-medium border-l-2 ${colors.border} pl-2.5`}>
                    {section.description}
                  </p>

                  <div className="space-y-2 mt-2">
                    {section.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bullet} mt-1.5 flex-shrink-0`} />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {section.highlightBox && (
                    <div
                      className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                        section.highlightBox.type === 'warning'
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                          : section.highlightBox.type === 'tip'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
                      }`}
                    >
                      {section.highlightBox.type === 'warning' ? (
                        <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      ) : section.highlightBox.type === 'tip' ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <strong className="font-bold block mb-0.5">{section.highlightBox.title}</strong>
                        {section.highlightBox.text}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Nøgletal Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1 bg-amber-500/20 rounded-md text-amber-400">
            <Gauge className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Nøgletal & Sikkerhedsafstande for BESS
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            {
              label: 'Thermal Runaway start',
              value: '65 – 70 °C',
              sub: 'Selvnærende reaktion',
            },
            {
              label: 'Opstart/fremkørsel',
              value: '50 – 100 m',
              sub: 'Konservativ afstand',
            },
            {
              label: 'BESS i bygning/container',
              value: '50 – 100 m',
              sub: 'Niveau 3 & 4 afstand',
            },
            {
              label: 'El-sikkerhed (samlet)',
              value: '5 m / 10 m',
              sub: 'Lav- / Højspænding',
            },
            {
              label: 'El-sikkerhed (spredt)',
              value: '1 m / 5 m',
              sub: 'Lav- / Højspænding',
            },
            {
              label: 'Genantændelse',
              value: 'Op til 48 timer',
              sub: 'Stranded energy / varme',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center hover:border-slate-700 transition-colors"
            >
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
