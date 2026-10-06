import React, { useState } from 'react'
import {
  ChevronDown,
  Layers,
  ShieldAlert,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Droplets,
} from 'lucide-react'

interface CAFSSection {
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

const CAFS_SECTIONS: CAFSSection[] = [
  {
    id: 'hvad-er-cafs',
    title: 'Hvad er CAFS? (Opbygning & Princip)',
    icon: '⚡',
    color: 'cyan',
    badge: 'Grundprincip',
    description:
      'Compressed Air Foam System: Vand, skumvæske og trykluft blandes direkte i sprøjtens blandekammer.',
    bullets: [
      'Trykluft iblandes i sprøjtens pumpe, FØR afgangen – i modsætning til traditionelt skum, hvor luft suges ind ude ved skumrøret.',
      'Slangen indeholder færdigekspanderet skum under tryk (typisk ca. 7 bar, auto 5–10 bar).',
      'Skumprocent: Fast sat til 0,5% (STHAMEX-class A) til både faste stoffer, spild og væskebrande.',
      'Homogen skumstruktur giver overlegen sluknings- og kvæleeffekt med markant reduceret vandforbrug.',
      'Kardinalregel: Vi røgdykker IKKE med CAFS! CAFS kan medbringes som supplement til HT- eller C-rør.',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Husk altid!',
      text: 'Vi røgdykker aldrig med CAFS alene. CAFS bruges som et hurtigt, målrettet taktisk værktøj til Knock Down udefra, konstruktionsbrande eller begrænsning.',
    },
  },
  {
    id: 'vaad-vs-toer',
    title: 'Våd-CAFS vs. Tør-CAFS',
    icon: '⚖️',
    color: 'amber',
    badge: 'Skumtyper',
    description:
      'Styres af luftmængden i sprøjtens blandekammer. Bestemmer skumtal, vandindhold og formål.',
    bullets: [
      'Våd-CAFS (Skumtal 3–10 | "Pladderskum"): Mere vand, højere vægt, maksimal kastelængde (op til 3.-4. sal / 20–25 m). Anvendes til: Knock Down udefra og væskebrande (nonpolære).',
      'Tør-CAFS (Skumtal 10–20 | "Flødeskum"): Mindre vand, danner et tykt isolerende lag (~15 mm) med høj vedhæftningsevne. Anvendes til: Konstruktionsbrande (etageadskillelser, lofter, vægge) og Begrænsning (beskytte truede nabobygninger).',
      'Valg ved opstart: Det skal besluttes ved indsatsens start, hvilken type CAFS der skal leveres til røret.',
      'Efterslukning: CAFS bruges IKKE til efterslukning – her anvendes direkte vand eller mekanisk frilægning.',
    ],
    highlightBox: {
      type: 'info',
      title: 'Våd til rækkevidde – Tør til vedhæftning',
      text: 'Våd-CAFS knækker flammerne hurtigt på afstand. Tør-CAFS klistrer på overflader og kvæler ilttilførsel og pyrolyse i konstruktioner.',
    },
  },
  {
    id: 'forsatser-spyd',
    title: 'AWG-rør, Forsatser & Spyd',
    icon: '🎯',
    color: 'purple',
    badge: 'Materiel',
    description:
      'AWG grundenhed (C-rør med Turbo Twist lynkobling) monteres med 4 forskellige forsatser.',
    bullets: [
      'Glat forsats: Standard til Knock Down, Begrænsning og Væskebrand. Giver maksimal kastelængde og slår ikke skummet i stykker. Velegnet i blæsevejr.',
      'Tågeforsats: KUN til våd-CAFS (tør-CAFS slås i stykker!). Giver justerbart strålebillede på kortere afstand. Start altid med samlet stråle og max vandydelse (400 l/min).',
      'Defensivt spyd (Tør-CAFS): Til smalle/tynde konstruktioner (etageadskillelser, gulve, vægge). Føres ind vinkelret (90°) og fordeler skummet 360° rundt i flankerne.',
      'Offensivt spyd (Tør-CAFS): Til konstruktioner i spyddets længderetning (skunke, spidslofter, luftspalter). Skummet flyder fremad langs spærfag.',
      'Røret SKAL altid have en forsats monteret – kan ikke bruges uden!',
    ],
  },
  {
    id: 'sikkerhed-betjening',
    title: 'Sikkerhed, Modtryk & Betjening',
    icon: '🛡️',
    color: 'rose',
    badge: 'Sikkerhed',
    description:
      'Fysiske kræfter, personlige værnemidler og forholdsregler ved trykluftskum.',
    bullets: [
      'ALTID 2 mand ved strålerøret: Blandingen af luft og vand giver næsten intet tryktab i slangen – derfor opleves et voldsomt, pludseligt modtryk (rekyl) ved åbning!',
      'Hjelm og visir: Skal altid benyttes ved arbejde med CAFS.',
      'Slangevalg: Brug 15 m dobbeltoprullet C-slange eller C-slangekurv. HØJHUSSLANGER (30 m) MÅ IKKE BRUGES (risiko for snoning og blokering).',
      'Spydbetjening: Helst to mand – én styrer spyddet op/ned i hullet, én drejer spyddet og åbner/lukker hanen.',
      'Vinkelboremaskine eller Halligan tool anbefales til hurtig hulboring i konstruktioner.',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Stærkt modtryk ved åbning!',
      text: '1.er holder strålerøret solidt med begge hænder, mens 2.er støtter både 1.er og slangen bagved for at optage det pludselige rekyl.',
    },
  },
  {
    id: 'taktiske-indsatser',
    title: 'De 4 Taktiske Anvendelsesområder',
    icon: '🚒',
    color: 'emerald',
    badge: 'Taktik',
    description:
      'Knock Down, Begrænsning, Konstruktionsbrand og Væskebrand.',
    bullets: [
      '1. Knock Down (Våd-CAFS | Glat forsats): Hurtigt tiltag udefra ved flammer ud af vinduer eller svære adgangsveje. Sigt mod loftet for sprinklereffekt. Stopper pyrolysen på 10–15 sekunder – LUK strålerøret, så snart der er effekt!',
      '2. Begrænsning (Tør-CAFS | Glat forsats): Udlæg ca. 15 mm skumlag på truede nabobygninger, stråtage eller havehuse. Beskytter mod strålevarme og flyveild med minimalt vandforbrug.',
      '3. Konstruktionsbrand (Tør-CAFS | Spyd): "Mød branden – jagt den ikke!". PÅVIRK ALTID BRANDEN FØR DU SKABER ADGANG (huller tilfører ilt og trækker ilden mod åbningen). Bor 2–3 huller pr. spærfag og mæt hulrummet.',
      '4. Væskebrand (Våd-CAFS | Glat forsats): KUN til nonpolære væsker (benzin, diesel). Polære væsker (sprit/alkohol) nedbryder skummet og kræver specialskum. Brug "Rain down" eller "Roll back" – sprøjt ALDRIG direkte ned i væsken!',
    ],
    highlightBox: {
      type: 'tip',
      title: 'Vandforsyning er kritisk!',
      text: 'Sprøjtens 2.000 l vandtank tømmes på under 5 minutter ved fuld CAFS-ydelse (400 l/min). Etablér fødeslange tidligt ved større brande!',
    },
  },
  {
    id: 'miljoe',
    title: 'Miljøhensyn & Beslutningsgrundlag',
    icon: '🌱',
    color: 'blue',
    badge: 'Miljø',
    description:
      'Brug af skum skal altid være en bevidst beslutning afvejet mod miljøpåvirkning.',
    bullets: [
      'Vurder recipient: Hvor løber skummet hen? Pas særligt på ved småhuse/kolonihaver med ubefæstede arealer, åer, søer og separatkloak.',
      'Etagebyggeri/Industri: Befæstede arealer med spildevandskloak er mere velegnede til opsamling. Kontakt rensningsanlæg ved større mængder.',
      'Overvej alternativer: Til mindre brande (bil, affaldscontainer) bør vand eller skumforsats til HT (Foscar) overvejes i stedet for fuldt CAFS-angreb.',
    ],
  },
]

const cafsColorMap: Record<
  string,
  { bg: string; border: string; text: string; badge: string; bullet: string; stepBg: string }
> = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-300',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bullet: 'bg-cyan-400',
    stepBg: 'bg-cyan-500 text-slate-950',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    bullet: 'bg-amber-400',
    stepBg: 'bg-amber-500 text-slate-950',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bullet: 'bg-purple-400',
    stepBg: 'bg-purple-500 text-slate-950',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-300',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    bullet: 'bg-rose-400',
    stepBg: 'bg-rose-500 text-slate-950',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    bullet: 'bg-emerald-400',
    stepBg: 'bg-emerald-500 text-slate-950',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    bullet: 'bg-blue-400',
    stepBg: 'bg-blue-500 text-slate-950',
  },
}

export const CAFSContent: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('hvad-er-cafs')

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-gradient-to-br from-cyan-600/20 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                Trykluftskum · HBR Retningslinje
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <Sparkles className="w-3 h-3" /> Taktisk Hurtigguide
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Droplets className="w-6 h-6 text-cyan-400" />
              Slukning med CAFS
            </h1>
            <p className="text-sm font-semibold text-cyan-300 mt-1">
              Compressed Air Foam System · Våd- & Tør-CAFS · AWG-rør & Spyd
            </p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-2xl">
              Kort og præcis oversigt over praktiske og taktiske principper for trykluftskum.
              Dækker hurtigt overblik over skumkvaliteter, forsatser, modtryk, de 4 indsatstyper og sikkerhedsregler.
            </p>
          </div>
        </div>

        {/* Hurtig Navigation Pills */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-medium text-slate-400 mr-1">Afsnit:</span>
          {CAFS_SECTIONS.map((s) => {
            const colors = cafsColorMap[s.color] || cafsColorMap.cyan
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

      {/* Visuel Sammenligning: Våd vs Tør CAFS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-amber-400" /> Våd-CAFS (Skumtal 3–10)
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
              Pladderskum
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
            Højt vandindhold og maksimal kastelængde (op til 20–25 m / 3.-4. sal).
          </p>
          <div className="space-y-1 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span><strong>Anvendelse:</strong> Knock Down udefra & Væskebrand</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span><strong>Forsats:</strong> Glat forsats (alt. tågeforsats ved nærkamp)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span><strong>Vandydelse:</strong> ca. 400 l/min</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-3.5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-400" /> Tør-CAFS (Skumtal 10–20)
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
              Flødeskum
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
            Lavt vandindhold, stor vedhæftning og danner et tykt isolerende lag (~15 mm).
          </p>
          <div className="space-y-1 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span><strong>Anvendelse:</strong> Konstruktionsbrand & Begrænsning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span><strong>Forsats:</strong> CAFS-spyd (offensivt/defensivt) & Glat rør</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span><strong>Vandydelse:</strong> 50–100 l/min (skåner for vandskader)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Sektioner */}
      <div className="space-y-2.5">
        {CAFS_SECTIONS.map((section) => {
          const isOpen = expandedSection === section.id
          const colors = cafsColorMap[section.color] || cafsColorMap.cyan

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
                          isOpen ? colors.text : 'text-white group-hover:text-cyan-200'
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
                    isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
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
          <div className="p-1 bg-cyan-500/20 rounded-md text-cyan-400">
            <Gauge className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Nøgletal & Tommelfingerregler for CAFS
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            {
              label: 'Skumvæske (Klasse A)',
              value: '0,5 %',
              sub: 'STHAMEX standardtilblanding',
            },
            {
              label: 'Systemtryk',
              value: 'ca. 7 bar',
              sub: 'Automatisk (5–10 bar)',
            },
            {
              label: 'Max kastelængde',
              value: 'op til 3.-4. sal',
              sub: '20–25 meter lodret',
            },
            {
              label: 'Knock Down tid',
              value: '10–15 sek.',
              sub: 'Effekt på pyrolyse',
            },
            {
              label: 'Lagtykkelse tør-CAFS',
              value: 'ca. 15 mm',
              sub: 'Til begrænsning',
            },
            {
              label: 'Vandtank tømmes',
              value: '< 5 minutter',
              sub: 'Ved 400 l/min (2000 l tank)',
            },
            {
              label: 'Betjening',
              value: 'Altid 2 mand',
              sub: 'Kraftigt rekyl/modtryk',
            },
            {
              label: 'Højhusslanger (30m)',
              value: 'FORBUDT',
              sub: 'Risiko for snoning',
            },
            {
              label: 'Røgdykning m. CAFS',
              value: 'NEJ',
              sub: 'Kun som supplement',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center hover:border-slate-700 transition-colors"
            >
              <div className="text-[10px] text-slate-400 font-medium">{item.label}</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">{item.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
