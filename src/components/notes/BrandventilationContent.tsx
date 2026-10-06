import React, { useState } from 'react'
import {
  ChevronDown,
  Fan,
  Wind,
  ShieldAlert,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react'

interface BVSection {
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

const BV_SECTIONS: BVSection[] = [
  {
    id: 'formaal',
    title: 'Formål & Taktiske Fordele',
    icon: '🎯',
    color: 'amber',
    badge: 'Taktik',
    description:
      'Planlagt og systematisk fjernelse af varm luft, røggasser eller andre forurenende stoffer og erstatning med frisk luft.',
    bullets: [
      'Reducerer røgfaren for indespærrede personer og øger deres flugt- og overlevelsesmuligheder markant.',
      'Øger røgdykkerens sikkerhed gennem markant reduktion i faren for overtænding (flashover) og væsentligt nedsat stressfaktor.',
      'Sænker temperaturen drastisk i brandrum og adgangsveje samt forbedrer sigtbarheden for røgdykkerne.',
      'Muliggør hurtigere lokalisering af selve arnestedet/initialbranden.',
      'Hindrer eller begrænser brandudbredelsen via varme- og røggasspredning til andre rum.',
      'Reducerer følgeskader på løsøre (indbo, inventar) og bygningsdele, herunder skader fra syreholdige røggasser.',
      'Hovedregel: Ventilation skal iværksættes så tidligt som muligt i indsatsen for at opnå maksimal effekt!',
    ],
    highlightBox: {
      type: 'tip',
      title: 'Tidlig indsats er afgørende',
      text: 'I hvor høj grad formålene opfyldes afhænger direkte af metodevalget og hvornår i indsatsen ventilationen iværksættes. Jo hurtigere der ventileres koordineret, jo sikrere bliver røgdykkerindsatsen.',
    },
  },
  {
    id: 'fysik',
    title: 'Brandrummets Fysik, Tryk & Nulplan',
    icon: '🌡️',
    color: 'rose',
    badge: 'Fysik & Teori',
    description:
      'Forståelse af trykforskelle, termisk opdrift, nulplanet og forskellen på brændstof- og ventilationsstyret brand.',
    bullets: [
      'Tryk i brandrummet: Over nulplanet skaber de varme røggasser et lille overtryk på ca. 0,1 mbar pga. deres temperatur og termiske opdrift.',
      'Til sammenligning: Der skal ca. 50 mbar til at sprænge en almindelig tynd glasrude.',
      'Overtryksventilator skaber: Et kunstigt overtryk i bygningen på typisk 0,1 – 0,3 mbar med flow på 8.000 – 50.000 m³/t.',
      'Nulplanet: Den adskillende grænse mellem undertryk (forneden) og overtryk (foroven). Ved en åben dør ses røg ud foroven og luft ind forneden.',
      'Termisk opdrift & densitet: 20°C (300 K) = ca. 1,2 kg/m³ · 320°C (600 K) = ca. 0,6 kg/m³ · 920°C (1200 K) = ca. 0,3 kg/m³ (fordobles den absolutte temperatur i Kelvin, halveres densiteten!).',
      'Pyrolyse: Afgasning fra faste materialer under varmepåvirkning, starter typisk ved 100–250°C.',
      'Brændstofstyret brand: I opstartsfasen er branden lille i forhold til lufttilgangen – brændstofmængden begrænser forbrændingen.',
      'Ventilationsstyret brand: I lukkede rum bliver branden hurtigt ventilationsstyret (luftmangel). Ved beredskabets ankomst vil brande oftest være ventilationsstyrede!',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Vigtig advarsel om ventilationsstyrede brande',
      text: 'Når branden er ventilationsstyret, vil enhver ukontrolleret tilførsel af ilt øge brandens intensitet voldsomt. Overtryksventilation må derfor kun sættes på, når slukningsberedskabet er klar!',
    },
  },
  {
    id: 'metoder',
    title: 'De 4 Hovedformer for Brandventilation',
    icon: '🌪️',
    color: 'cyan',
    badge: 'Metoder',
    description:
      'Opdeling i naturlig ventilation (termisk/aerodynamisk) og mekanisk ventilation (undertryk/overtryk).',
    bullets: [
      '1. Naturlig – Termisk ventilation (vertikal / topventilation): Udnytter røgens naturlige termiske opdrift via åbninger højt i bygningen (tag, ovenlysvinduer, 1-4 tagplader). Fraluftsåbning bør være 2-4 m², tilluft 1-1,5 gange større.',
      '2. Naturlig – Aerodynamisk ventilation (horisontal / udluftning): Udnytter vinden, der danner overtryk på vindsiden (0–0,15 mbar) og undertryk i læsiden (~50% af overtrykket). Gennemtræk ved at åbne døre og vinduer.',
      '3. Mekanisk – Undertryk (røgsuger): Røgen suges ud med røgsuger (typisk 2.000 – 8.000 m³/t). Bruger spiralarmeret sugeslange og blød trykslange. Perfekt til kældre uden direkte udgang, eller hvor tilluft og fraluft er samme åbning.',
      '4. Mekanisk – Overtryk (overtryksventilator / PPV): Store luftmængder blæses ind med ventilator (8.000 – 50.000 m³/t, 0,1–0,3 mbar), som presser røg og varme ud gennem en defineret fraluftsåbning.',
    ],
    highlightBox: {
      type: 'info',
      title: 'Termisk ventilation i høje bygninger',
      text: 'I meget høje bygninger kan røggasser afkøles undervejs og miste deres termiske opdrift halvvejs op igennem bygningen. Her er mekanisk ventilation ofte nødvendig for at gennemtvinge flow.',
    },
  },
  {
    id: 'offensiv-defensiv',
    title: 'Anvendelsesformer for Overtryksventilation (PPV)',
    icon: '⚡',
    color: 'emerald',
    badge: 'Anvendelse',
    description:
      'Offensiv, kontrolleret offensiv, defensiv (til begrænsning) samt efterslukning.',
    bullets: [
      'Offensiv ventilation: Røgdykkerne trænger ind med overtrykket i ryggen og udnytter straks det markante temperaturfald og forbedrede sigt. Kræver stor rutine og en strengt veldefineret luftvej.',
      'Kontrolleret offensiv brug (anbefalet standard): Røgdykkerne foretager temperaturkontrol, køler røggasser, lokaliserer branden og sikrer fraluftsåbning og indespærrede FØR overtrykket aktiveres.',
      'Defensiv ventilation: Bruges til at beskytte tilstødende lokaler, trapperum eller flugtveje mod røgindtrængning ved at sætte de rene rum under overtryk.',
      'Efterslukning: Ventilatoren anvendes efter slukning til at lufte ud for uforbrændte gasser, partikler og skadelige syrer, hvilket minimerer følgeskader markant.',
      'Ulemper og risici: Tilfører ilt (øger brandens intensitet), risiko for brandspredning hvis luftvejen ikke styres, fare for personer mellem brand og fraluft, samt højt støjniveau fra benzinmotorer.',
    ],
  },
  {
    id: 'roller',
    title: 'Roller & Samarbejde ved Kontrolleret Offensiv (HT)',
    icon: '👥',
    color: 'blue',
    badge: 'Bemanding',
    description:
      'Fastlagt ansvarsfordeling for holdet ved kontrolleret offensiv overtryksventilation med HT-udlægning.',
    bullets: [
      'Nr. 1 + Nr. 2 (Røgdykkerhold): Trænger ind, udfører temperaturkontrol/køling af røggasser, lokaliserer initialbrand, udpeger fraluftsåbning og sikrer at ingen personer er i fare. Melder "Klar til ventilation" til HL.',
      'Nr. 3 (Ventilator & Sikringsslange): Henter ventilatoren, placerer den ved tilluftsåbningen (i tomgang, luftkeglen vinklet væk fra døren). Udlægger derefter sikringsslange (HT) til fraluftsåbningen og bemander denne.',
      'Nr. 4 (Vandforsyning & Assistent): Etablerer vandforsyning (BBB fra brandhane til sprøjte) og assisterer herefter nr. 3 med sikringsslangen ved behov.',
      'MP (Motorpasser): Starter pumpe, overvåger vandbeholdning og sikrer korrekt tryk til slangerne.',
      'HL (Holdleder): Koordinerer indsatsen. Når nr. 1+2 melder klar, drejer HL ventilatoren ind mod døråbningen, sætter fulde omdrejninger på og overvåger ventilationens forløb.',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Vigtig regel for sikringsslangen!',
      text: 'Man må ALDRIG sprøjte direkte ind igennem fraluftsåbningen! Dette ødelægger udblæsningsflowet, presser røgen tilbage mod røgdykkerne og kan føre frisk ilt direkte ind i varme røggasser med risiko for overtænding.',
    },
  },
  {
    id: 'opstillinger',
    title: 'Ventilatortyper & Specialopstillinger',
    icon: '⚙️',
    color: 'purple',
    badge: 'Materiel & Opstilling',
    description:
      'Kegleprincip vs. ejektorprincip, serieventilation, parallelventilation og ventilation af kældre.',
    bullets: [
      'Kegleprincippet: Konventionel ventilator danner en konisk luftkegle. Tilluftsåbningen skal forsegles fuldstændigt af keglen. Afstand fra dør = ca. dørens højde (typisk 2-3 meter).',
      'Ejektorprincippet (turboventilator): Den udblæste luft skaber et undertryk omkring sig, der trækker omgivende luft med ind (op til 3× ydelse, f.eks. 10.000 m³/t motor → 30.000 m³/t total luftstrøm).',
      'Serieventilation: To ventilatorer i forlængelse af hinanden. Bruges ved lange transportveje eller op ad trapper (1. sal og højere). Ventilatoren med størst ydelse placeres forrest / ved bygningen!',
      'Parallelventilation: To eller flere ventilatorer side om side foran en meget bred åbning (f.eks. port i lagerhal eller industri), hvor én ventilator ikke kan dække bredden.',
      'Kælder med kun én dør (delt dør): Luft ledes ind i bunden via ventilationsslange, mens varm røg presses ud øverst i døren. Ventilatoren må ikke stå for tæt på for at undgå at sætte røgen i cirkulation.',
    ],
  },
  {
    id: 'huskeliste',
    title: 'Huskeliste: De 7 Gyldne Regler',
    icon: '📋',
    color: 'rose',
    badge: 'Checkliste',
    description:
      'De 7 fundamentale sikkerhedsregler fra Beredskabsstyrelsen, der altid skal overholdes ved overtryksventilation.',
    bullets: [
      '1. Husk altid at lave fraluftsåbning (ventilér aldrig ind i en lukket bygning uden aftræk!).',
      '2. Bemand altid sikringsslangen ved fraluftsåbningen for at hindre brandspredning.',
      '3. Sprøjt ALDRIG direkte ind i fraluftsåbningen udefra.',
      '4. Fraluftsåbningens størrelse bør være 0,75 – 1,5 gange tilluftsåbningens størrelse.',
      '5. Afstanden imellem ventilator og dør skal som hovedregel svare til dørens højde.',
      '6. Luftens vej skal være veldefineret – undgå at presse brand og røg ind i utilskadekomne rum.',
      '7. Overtryksventilér ALDRIG uden at have sikrings- og angrebsslanger fremme, tryksatte og klar til indsats!',
    ],
    highlightBox: {
      type: 'warning',
      title: 'Personsikkerhed først',
      text: 'Pres aldrig brand og varme røggasser imod indespærrede personer eller fremtrængende røgdykkere! Hvis der er tvivl om personers placering, anvendes defensiv ventilation.',
    },
  },
  {
    id: 'faser',
    title: 'Fasedelt Implementering i Beredskabet',
    icon: '📈',
    color: 'indigo',
    badge: 'Uddannelse',
    description:
      'Trinvist forløb for et beredskab, der indfører overtryksventilation i det daglige virke.',
    bullets: [
      'Fase I (Efterslukning & oprydning): Ventilatoren benyttes udelukkende efter branden er slukket. Mandskabet lærer placering, motorbetjening og luftstrømme at kende med minimal risiko.',
      'Fase II (Kontrolleret offensiv indsats): Ventilatoren tages i brug under indsats, når branden er lokaliseret og bragt under kontrol, men endnu ikke fuldt slukket.',
      'Fase III (Fuld taktisk anvendelse): Avanceret brug med offensiv ventilering før indtrængen, defensiv tryksætning, serie- og parallelopstillinger samt kældre og store objekter.',
    ],
  },
  {
    id: 'ordliste',
    title: 'Faglig Ordliste & Begreber',
    icon: '📖',
    color: 'blue',
    badge: 'Ordliste',
    description:
      'Nøglebegreber fra kompendiets autoritative ordliste.',
    bullets: [
      'Flow: Luftmængde (m³/t) der passerer igennem det rum eller den bygning, der ventileres.',
      'Tilluftsåbning: Åbning hvor frisk luft tilføres bygningen (også kaldet erstatningsåbning).',
      'Fraluftsåbning: Åbning hvor varme ventilationsgasser og røg ledes ud i det fri.',
      'Nulplan: Den adskillende grænseflade mellem overtryk (varm røg øverst) og undertryk (indsugning nederst).',
      'Ejektorprincip: Undertryk skabt af en luftstrøm med høj hastighed, som trækker omgivende luftmængder med sig.',
      'Sikringsslange: Vandfyldt slange bemandet ved fraluftsåbningen for at hindre brandudbredelse på facader/tag.',
      'Sektionsvis ventilation: Taktisk metode hvor ét rum eller én sektion udluftes ad gangen ved systematisk at styre døre og vinduer.',
      'Serieventilation: To eller flere ventilatorer opstillet efter hinanden for at øge tryk og flow over længere afstande.',
      'Parallelventilation: Flere ventilatorer side om side for at dække en meget stor tilluftsåbning (porte/haller).',
    ],
  },
]

const bvColorMap: Record<
  string,
  { bg: string; border: string; text: string; badge: string; bullet: string; stepBg: string }
> = {
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
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-300',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    bullet: 'bg-cyan-400',
    stepBg: 'bg-cyan-500 text-slate-950',
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
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    bullet: 'bg-purple-400',
    stepBg: 'bg-purple-500 text-slate-950',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-300',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    bullet: 'bg-indigo-400',
    stepBg: 'bg-indigo-500 text-slate-950',
  },
}

export const BrandventilationContent: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('formaal')
  const [activeDiagramTab, setActiveDiagramTab] = useState<'ppv' | 'nulplan' | 'serie'>('ppv')

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-cyan-600/20 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                Taktisk Brandventilation · BRS
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Kompendium
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Fan className="w-6 h-6 text-cyan-400 animate-spin-slow" />
              Brandventilation & Overtryksventilation
            </h1>
            <p className="text-sm font-semibold text-cyan-300 mt-1">
              Naturlig & Mekanisk · PPV (Positive Pressure Ventilation) · Taktiske Indsatser
            </p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-2xl">
              Gennemgang af taktisk brandventilation baseret på Beredskabsstyrelsens Tekniske Skoles
              kompendium. Omfatter principper, fysik, mandskabsroller ved kontrolleret offensiv brug,
              sikkerhedsregler og specialopstillinger.
            </p>
          </div>
        </div>

        {/* Quick section selector pills */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-medium text-slate-400 mr-1">Hurtig navigation:</span>
          {BV_SECTIONS.map((s) => {
            const colors = bvColorMap[s.color] || bvColorMap.amber
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
                title={s.title}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.title.split('&')[0].trim()}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Tactical Diagram Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Taktisk Skitse & Principper
              </h2>
              <p className="text-[11px] text-slate-400">
                Interaktiv visualisering af ventilationsteknikker
              </p>
            </div>
          </div>

          {/* Diagram Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveDiagramTab('ppv')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeDiagramTab === 'ppv'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PPV Princip (Kegle)
            </button>
            <button
              onClick={() => setActiveDiagramTab('nulplan')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeDiagramTab === 'nulplan'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Nulplan & Trykgradient
            </button>
            <button
              onClick={() => setActiveDiagramTab('serie')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeDiagramTab === 'serie'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Serie & Parallel
            </button>
          </div>
        </div>

        {/* SVG Container */}
        <div className="w-full bg-slate-950/90 rounded-xl border border-slate-800/90 p-2 sm:p-3 relative overflow-hidden">
          {activeDiagramTab === 'ppv' && (
            <div className="flex flex-col items-center">
              <svg
                viewBox="0 0 620 250"
                className="w-full max-w-3xl h-auto select-none"
                style={{ aspectRatio: '620/250' }}
              >
                <defs>
                  <linearGradient id="coneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="smokeFlowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#475569" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#334155" stopOpacity="0.5" />
                  </linearGradient>
                  <marker id="bv-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
                  </marker>
                  <marker id="smoke-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Ground */}
                <line x1="10" y1="210" x2="610" y2="210" stroke="#334155" strokeWidth="2" />

                {/* Building structure */}
                <rect x="180" y="50" width="310" height="160" fill="#0f172a" stroke="#475569" strokeWidth="2" rx="4" />
                <path d="M 170 50 L 335 15 L 500 50 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <text x="335" y="38" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">TAGKONSTRUKTION</text>

                {/* Door Opening (Tilluft) */}
                <rect x="180" y="110" width="16" height="100" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
                <text x="188" y="102" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Tilluft (Dør)</text>

                {/* Ventilator (PPV) */}
                <g transform="translate(60, 160)">
                  {/* Wheel & Frame */}
                  <rect x="0" y="0" width="30" height="42" rx="4" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                  <circle cx="15" cy="20" r="12" fill="#1e293b" stroke="#f87171" strokeWidth="1.5" />
                  {/* Blades */}
                  <line x1="15" y1="10" x2="15" y2="30" stroke="#e2e8f0" strokeWidth="2" />
                  <line x1="5" y1="20" x2="25" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                  {/* Wheels */}
                  <circle cx="5" cy="44" r="5" fill="#475569" />
                  <circle cx="25" cy="44" r="5" fill="#475569" />
                  {/* Label */}
                  <text x="15" y="-8" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Ventilator</text>
                  <text x="15" y="58" fill="#94a3b8" fontSize="8" textAnchor="middle">i tomgang / drift</text>
                </g>

                {/* Distance indicator: Ventilator to Door = Door Height */}
                <line x1="95" y1="225" x2="180" y2="225" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="137" y="238" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">
                  Afstand ≈ Dørens højde (ca. 2 m)
                </text>

                {/* Air Cone (Luftkegle) */}
                <polygon points="90,165 180,105 180,210 90,200" fill="url(#coneGrad)" />
                <text x="135" y="150" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Luftkegle forsegler døren
                </text>

                {/* Fresh air flow inside building */}
                <path d="M 200 170 C 240 175, 270 170, 310 170" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#bv-arrow)" />
                <text x="255" y="195" fill="#38bdf8" fontSize="8" fontWeight="bold">
                  Overtryk (0,1-0,3 mbar)
                </text>

                {/* Fire / Initialbrand */}
                <g transform="translate(340, 160)">
                  <path d="M 0 45 C -15 20, 0 10, -5 0 C 15 10, 10 25, 20 45 Z" fill="#f97316" />
                  <path d="M 3 45 C -5 28, 5 20, 2 12 C 12 20, 8 30, 14 45 Z" fill="#facc15" />
                  <text x="8" y="53" fill="#fb923c" fontSize="8" fontWeight="bold" textAnchor="middle">Arnested</text>
                </g>

                {/* Smoke accumulation & flow towards exhaust */}
                <path d="M 345 150 C 340 110, 370 90, 420 85 C 460 85, 480 80, 490 80" fill="none" stroke="url(#smokeFlowGrad)" strokeWidth="18" strokeLinecap="round" />

                {/* Exhaust Window (Fraluftsåbning) */}
                <rect x="490" y="70" width="10" height="40" fill="#020617" stroke="#f43f5e" strokeWidth="2" />
                <text x="545" y="65" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Fraluftsåbning</text>
                <text x="545" y="77" fill="#cbd5e1" fontSize="8" textAnchor="middle">(0,75 - 1,5 × tilluft)</text>

                {/* Smoke exiting to the leeward side */}
                <path d="M 505 85 C 530 80, 560 65, 595 50" fill="none" stroke="#64748b" strokeWidth="6" markerEnd="url(#smoke-arrow)" />
                <circle cx="560" cy="60" r="14" fill="#475569" opacity="0.4" />
                <circle cx="585" cy="45" r="18" fill="#334155" opacity="0.5" />

                {/* Safety hose (Sikringsslange) & Crew at exhaust */}
                <g transform="translate(545, 140)">
                  {/* Firefighter nr. 3 */}
                  <circle cx="15" cy="15" r="8" fill="#3b82f6" />
                  <text x="15" y="18" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">3</text>
                  <rect x="10" y="24" width="10" height="20" fill="#1e40af" rx="2" />
                  {/* Hose */}
                  <path d="M 0 50 C 10 45, 15 40, 18 35" fill="none" stroke="#ec4899" strokeWidth="2" />
                  <text x="15" y="60" fill="#ec4899" fontSize="8" fontWeight="bold" textAnchor="middle">Sikringsslange</text>
                  <text x="15" y="70" fill="#f87171" fontSize="7" textAnchor="middle">Sprøjt IKKE ind!</text>
                </g>
              </svg>
              <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span><strong>Tilluft:</strong> Dør forseglet af luftkegle (kegle-/ejektorprincip)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span><strong>Fraluft:</strong> Placér i tagets læside (0,75 – 1,5× tilluft)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                  <span><strong>Nr. 3 m. sikringsslange:</strong> Klargjort ved fraluft mod spredning</span>
                </div>
              </div>
            </div>
          )}

          {activeDiagramTab === 'nulplan' && (
            <div className="flex flex-col items-center">
              <svg
                viewBox="0 0 580 230"
                className="w-full max-w-2xl h-auto select-none"
                style={{ aspectRatio: '580/230' }}
              >
                {/* Room frame */}
                <rect x="120" y="20" width="360" height="180" fill="#090d16" stroke="#334155" strokeWidth="2" rx="6" />

                {/* Neutral plane dotted line */}
                <line x1="120" y1="110" x2="480" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                <text x="300" y="105" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">
                  NULPLAN (Normaltryk · Barometerstand)
                </text>

                {/* Over Neutral Plane: Hot smoke & overpressure */}
                <rect x="121" y="21" width="358" height="88" fill="#475569" opacity="0.3" />
                <text x="300" y="55" fill="#f87171" fontSize="13" fontWeight="black" textAnchor="middle">
                  OVERTRYK (+ 0,1 mbar)
                </text>
                <text x="300" y="73" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Varme røggasser · Lav densitet (0,3 - 0,6 kg/m³) · Termisk opdrift
                </text>

                {/* Under Neutral Plane: Cold air & underpressure */}
                <text x="300" y="150" fill="#38bdf8" fontSize="13" fontWeight="black" textAnchor="middle">
                  UNDERTRYK (Sug ind i rummet)
                </text>
                <text x="300" y="168" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  Kølig friskluft · Høj densitet (1,2 kg/m³) trækkes ind mod branden
                </text>

                {/* Door Opening showing pressure gradient */}
                <rect x="470" y="40" width="20" height="160" fill="#020617" stroke="#64748b" strokeWidth="1.5" />
                <text x="510" y="35" fill="#f1f5f9" fontSize="9" fontWeight="bold">Døråbning</text>

                {/* Smoke exiting upper door */}
                <path d="M 460 70 L 530 70" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#smoke-arrow)" />
                <text x="535" y="65" fill="#f43f5e" fontSize="8" fontWeight="bold">Røg ud (+)</text>

                {/* Fresh air entering lower door */}
                <path d="M 530 160 L 460 160" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#bv-arrow)" />
                <text x="535" y="165" fill="#38bdf8" fontSize="8" fontWeight="bold">Luft ind (−)</text>
              </svg>
              <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-2 text-[11px] text-slate-300">
                <strong>Hvorfor udlignes overtrykket ikke nedad?</strong> De varme røggassers termiske opdrift forhindrer overtrykket i at falde ned mod gulvet. Ved døråbningen registreres tydeligt røg, der presses ud øverst, og et luftdrag, der suges ind nederst.
              </div>
            </div>
          )}

          {activeDiagramTab === 'serie' && (
            <div className="flex flex-col items-center">
              <svg
                viewBox="0 0 600 230"
                className="w-full max-w-2xl h-auto select-none"
                style={{ aspectRatio: '600/230' }}
              >
                {/* Serie Ventilation */}
                <g transform="translate(10, 20)">
                  <rect x="0" y="0" width="280" height="190" fill="#090d16" stroke="#334155" strokeWidth="1.5" rx="6" />
                  <text x="140" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    SERIEVENTILATION
                  </text>
                  <text x="140" y="40" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Lange transportveje & etager (1. sal+)
                  </text>

                  {/* Rear Fan */}
                  <rect x="20" y="80" width="24" height="34" rx="3" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                  <circle cx="32" cy="97" r="9" fill="#1e293b" />
                  <text x="32" y="128" fill="#cbd5e1" fontSize="8" textAnchor="middle">Bageste</text>

                  {/* Cone 1 */}
                  <polygon points="45,85 130,55 130,135 45,110" fill="url(#coneGrad)" opacity="0.6" />

                  {/* Front Fan (strongest) */}
                  <rect x="130" y="70" width="30" height="44" rx="3" fill="#ef4444" stroke="#f87171" strokeWidth="1.5" />
                  <circle cx="145" cy="92" r="11" fill="#1e293b" />
                  <text x="145" y="128" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">Forreste (kraftigst)</text>

                  {/* Building entrance */}
                  <rect x="230" y="50" width="10" height="90" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
                  <polygon points="160,75 230,50 230,140 160,115" fill="url(#coneGrad)" />

                  <text x="140" y="160" fill="#fbbf24" fontSize="8" textAnchor="middle" fontWeight="bold">
                    Forreste ventilator yder mest & placeres ved/i bygningen
                  </text>
                  <text x="140" y="174" fill="#94a3b8" fontSize="7" textAnchor="middle">
                    Bageste ventilator forsegler tilluftsåbningen
                  </text>
                </g>

                {/* Parallel Ventilation */}
                <g transform="translate(310, 20)">
                  <rect x="0" y="0" width="280" height="190" fill="#090d16" stroke="#334155" strokeWidth="1.5" rx="6" />
                  <text x="140" y="24" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">
                    PARALLELOPSTILLING
                  </text>
                  <text x="140" y="40" fill="#94a3b8" fontSize="8" textAnchor="middle">
                    Meget store tilluftsåbninger (porte, haller)
                  </text>

                  {/* Fan 1 */}
                  <rect x="30" y="55" width="24" height="34" rx="3" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                  <circle cx="42" cy="72" r="9" fill="#1e293b" />

                  {/* Fan 2 */}
                  <rect x="30" y="105" width="24" height="34" rx="3" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                  <circle cx="42" cy="122" r="9" fill="#1e293b" />

                  {/* Large door / gate */}
                  <rect x="220" y="45" width="12" height="110" fill="#020617" stroke="#c084fc" strokeWidth="2" />
                  <text x="250" y="105" fill="#c084fc" fontSize="9" fontWeight="bold">Bred Port</text>

                  {/* Dual Cones */}
                  <polygon points="55,60 220,45 220,100 55,85" fill="url(#coneGrad)" opacity="0.6" />
                  <polygon points="55,110 220,100 220,155 55,135" fill="url(#coneGrad)" opacity="0.6" />

                  <text x="140" y="165" fill="#c084fc" fontSize="8" textAnchor="middle" fontWeight="bold">
                    To ventilatorer side om side
                  </text>
                  <text x="140" y="178" fill="#94a3b8" fontSize="7" textAnchor="middle">
                    Dækker samlet hele portens areal
                  </text>
                </g>
              </svg>
              <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-2 text-[11px] text-slate-300">
                <strong>Serie vs. Parallel:</strong> Brug serieopstilling, når flowet skal forcere modstand (høje bygninger, lange gange). Brug parallelopstilling, når tilluftsåbningen er for bred til, at én ventilator kan forsegle den med sin luftkegle.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-2.5">
        {BV_SECTIONS.map((section) => {
          const isOpen = expandedSection === section.id
          const colors = bvColorMap[section.color] || bvColorMap.amber

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

      {/* Quick Reference Numbers / Nøgletal Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1 bg-cyan-500/20 rounded-md text-cyan-400">
            <Gauge className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Nøgletal & Tommelfingerregler i Taktisk Brandventilation
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            {
              label: 'Overtryk i bygning (PPV)',
              value: '0,1 – 0,3 mbar',
              sub: 'Skabt af ventilator',
            },
            {
              label: 'Overtryk i brandrum',
              value: 'ca. 0,1 mbar',
              sub: 'Termisk over nulplan',
            },
            {
              label: 'Tynd glasrude revner',
              value: 'ca. 50 mbar',
              sub: 'Til sammenligning',
            },
            {
              label: 'Ventilatorydelse (PPV)',
              value: '8.000 – 50.000 m³/t',
              sub: 'Normal kapacitet',
            },
            {
              label: 'Røgsugerydelse',
              value: '2.000 – 8.000 m³/t',
              sub: 'Undertryksventilation',
            },
            {
              label: 'Fraluft vs. Tilluft',
              value: '0,75 – 1,5 ×',
              sub: 'Optimal åbningsstørrelse',
            },
            {
              label: 'Afstand til døråbning',
              value: '≈ Dørens højde',
              sub: 'Ca. 2 – 3 meter',
            },
            {
              label: 'Termisk fraluft (tag)',
              value: '2 – 4 m²',
              sub: '1-4 tagplader / ovenlys',
            },
            {
              label: 'Pyrolyse temperatur',
              value: '100 – 250 °C',
              sub: 'Afgasning fra materialer',
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
