import React, { useState } from 'react'
import { ChevronDown, Shield } from 'lucide-react'

export const PassiveAktiveAnlaegContent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('oversigt')

  const passiveData = [
    {
      id: 'brandsektioner',
      title: 'Brandsektioner & Brandceller',
      icon: '🧱',
      color: 'amber',
      description: 'Opdeling af bygningen i adskilte brandområder.',
      bullets: [
        'Brandsektion: Større del af bygning adskilt med brandskilleveje (EI 60-120).',
        'Brandcelle: Mindre enhed (fx lejlighed, gang) med EI 30-60 skillekonstruktioner.',
        'Formål: Begræns brandudbredelse i tid og rum.',
        'Krav: Brandskilleveje, -døre, -lukker i installationer (rør, kabler).',
        'Maks. areal pr. brandsektion afhænger af anvendelse/højde (BR18).',
      ],
    },
    {
      id: 'branddoere',
      title: 'Branddøre & -lukker',
      icon: '🚪',
      color: 'orange',
      description: 'Sikrer at brand ikke spreder gennem åbninger i skillekonstruktioner.',
      bullets: [
        'Klassificeret EI 30 / EI 60 / EI 90 / EI 120 (E=Integritet, I=Isolering).',
        'Selvlukkende (lukket indeholder brand, åben = fejl).',
        'Må IKKE blokere/låse i åben position (undtagen magnetlukker med brandcentral).',
        'Dørtætning (intumescent strip) udvider ved varme → tætter fugen.',
        'Kontrol: Årlig visuel + funktionstest (lukker den selv?).',
      ],
    },
    {
      id: 'konstruktion',
      title: 'Konstruktiv Brandsikring',
      icon: '🏗️',
      color: 'blue',
      description: 'Bygningens bæreevne og inddæmningsevne under brand.',
      bullets: [
        'Bæreevne (R): Konstruktion holder sig oppe (R 30/60/90/120/180/240).',
        'Inddæmning (EI): Forhindrer brandspredning (EI 30-240).',
        'Stålkonstruktioner: Kræver brandbeskyttelse (malting, kasseter, beton).',
        'Trækonstruktioner: Kan bruges til bæreevne (charring rate beregning).',
        'Genemføringer: Rør, kabler, ventilation skal tættes brandsikret (fire stopping).',
      ],
    },
  ]

  const aktiveData = [
    {
      id: 'aba',
      title: 'ABA - Automatisk Brandalarmanlæg',
      icon: '🔔',
      color: 'rose',
      description: 'Opdager brand tidligt og alarmerer automatisk.',
      bullets: [
        'Røg- og varmedetekterere i bestemte områder (ifh. risiko).',
        'Alarmerer lokalt (sirene/blink) OG sender alarm til brandcentral (BMA).',
        'Krav i: Høje bygninger, soveanlæg, samlingslokaler, underjordisk, speciale.',
        'Standard: DS/EN 54 (anlæg), DS 443 (projektering i DK).',
        'Vedligehold: Månedlig selvtest, årlig faglig kontrol.',
      ],
    },
    {
      id: 'sprinkler',
      title: 'Sprinkleranlæg',
      icon: '💧',
      color: 'cyan',
      description: 'Automatisk slukning/begrænsning ved varme fra brand.',
      bullets: [
        'Hvert sprinklerhoved har glasampulle/smelteled (typisk 68°C / 79°C / 93°C).',
        'KUN hovedet OVER branden åbner (ikke alle samtidig som i film).',
        'Virkning: Slukker/begrænser brand i opstodelsesrummet.',
        'Vandforsyning: Byværk (tilstrækkeligt tryk/flow) ELLER tank + pumpe.',
        'Krav i: Høje huse (>22m), indkøbscentre, industri, parkeringshuse, m.fl.',
        'Standard: DS/EN 12845. Kontrol: Ugentlig (pumpe), månedlig, årlig faglig.',
      ],
    },
    {
      id: 'roegudluftning',
      title: 'Røgudluftning / Røgkontrol',
      icon: '💨',
      color: 'emerald',
      description: 'Fjerner røg/varme for at skabe synlighed og redningsveje.',
      bullets: [
        'Naturlig: Røgvinduer/lukker i tag/fasad (åbnes automatisk/manuelt).',
        'Mekanisk: Ventilatorer presser/rækker røg ud (positiv/negativ tryk).',
        'Røgfri redningsvej: Overtryk i trappehus/korridor (hold røg ude).',
        'Krav i: Høje trappehuse, atria, underjordiske anlæg, samlingslokaler.',
        'Koordination med ABA: Røgudluftning starter ved alarm.',
      ],
    },
    {
      id: 'rumslukning',
      title: 'Rumslukningsanlæg (Gasslukning)',
      icon: '☁️',
      color: 'purple',
      description: 'Slukker brand uden vandskader – til specielle områder.',
      bullets: [
        'Gasser: CO2, Inert gasser (IG-541, IG-55, N2), Novec 1230, FM-200.',
        'Princippet: Iltfordriving (CO2/inert) ELLER kemisk hæmmelse (Novec/FM-200).',
        'Anvendelse: Serverrum, arkiver, elastikcentraler, teknikrum, skibe.',
        'ADVARSEL: CO2/Inert = LIVSFARLIG for personer (iltsult) – advarsel + udskydelse!',
        'Krav: Tæt rum (dørelukning, klaplukning), gassikring før udløsning.',
      ],
    },
  ]

  const colorMap = {
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', accent: 'text-amber-400' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300', accent: 'text-orange-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300', accent: 'text-blue-400' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300', accent: 'text-rose-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300', accent: 'text-cyan-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300', accent: 'text-emerald-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300', accent: 'text-purple-400' },
  }

const sections = [
    { id: 'oversigt', title: 'Oversigt & Principper', color: 'blue', icon: '📋', bullets: [
      'Passiv brandsikring = Bygningens indbyggede evne til at inddæmme brand (konstruktioner, døre).',
      'Aktiv brandsikring = Tekniske anlæg der REAGERER på brand (detekterer, alarmerer, slukker).',
      'BEGGE nødvendige: Passiv giver tid, aktiv giver handling.',
      'BR18 / DS standarder definerer krav i DK.',
      'Brandcentral (BMA) = Hjernen der modtager alarmer fra ABA/sprinkler.',
    ]},
    { id: 'passiv', title: 'Passiv Brandsikring (3 hovedområder)', color: 'amber', icon: '🛡️', bullets: [] },
    { id: 'aktiv', title: 'Aktive Anlæg (4 hovedtyper)', color: 'rose', icon: '⚙️', bullets: [] },
    { id: 'brandcentral', title: 'Brandcentral & Overvågning', color: 'cyan', icon: '🖥️', bullets: [
      'BMA (Brandcentral) modtager alarmer fra ABA, sprinkler, manuelle alarmer.',
      'Viser zone/placering, sender signal til brandvæsen (ofte via alarmmodtager).',
      'Styrer: Røgudluftning, dørmagneter (lukker branddøre), ventilationsstop, lysevejledning.',
      'Log: Alle hændelser logges med tidspunkt (vigtig ved efterforskning).',
      'Reserveforsyning: Min. 24/72 timer batteri ved netudsæt.',
    ]},
    { id: 'taktik', title: 'Taktisk Betydning for Indsats', color: 'emerald', icon: '🎯', bullets: [
      'ABA: Tidlig varsling = hurtigere indsats, mindre skade.',
      'Sprinkler: Ofte har slukket/begrænset FØR ankomst – gå ind for efterslukning.',
      'Røgudluftning: Bedre synlighed, lavere temperaturer – MEN kan sprede brand ved fejl.',
      'Rumslukning (gas): IKKE gå ind uden trykluft – iltsult! Ventilér grundigt efter.',
      'Branddøre: Hold dem LUKKET – de er din sikkerhedsbarriere og inddæmning.',
      'Brandsektioner: Indsats i én sektion – overvåg nabosektioner for brandspredning.',
    ]},
  ]
return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-2xl p-4 shadow-xl border border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/20 border border-blue-400/30 text-[10px] font-bold text-blue-200 uppercase tracking-wider">
              Brandsikring
            </span>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Passive & Aktive Anlæg
            </h1>
            <p className="text-xs text-blue-100/80 mt-0.5">Brandsikringsanlæg i bygninger</p>
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = expanded === section.id
          const colors = colorMap[section.color as keyof typeof colorMap] || colorMap.blue
          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition-all overflow-hidden ${isOpen
                ? `${colors.bg} ${colors.border} shadow-lg`
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
<button
                onClick={() => setExpanded(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{section.icon}</span>
                  <span className={`text-sm font-bold ${isOpen ? colors.text : 'text-white group-hover:text-blue-200'} transition-colors`}>
                    {section.title}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-all duration-200 ${isOpen ? `${colors.accent} rotate-180` : 'text-slate-400 group-hover:text-slate-300'}`} />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 space-y-4">
                  {section.id === 'oversigt' && <ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={colors.accent + ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul>}
                  {section.id === 'passiv' && <div className="space-y-3">{passiveData.map((item) => { const ic = colorMap[item.color as keyof typeof colorMap]; return <div key={item.id} className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50"><div className="flex items-center gap-3 mb-3"><div className={ic.bg + " border " + ic.border + " p-2 rounded-xl"}><span className="text-2xl">{item.icon}</span></div><div><h3 className="text-sm font-bold text-white">{item.title}</h3><p className="text-xs text-slate-400 mt-0.5">{item.description}</p></div></div><ul className="space-y-1.5 ml-10 border-l-2 border-slate-700/50 pl-3">{item.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2 pb-1.5"><div className={ic.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div> })}</div>}
                  {section.id === 'aktiv' && <div className="space-y-3">{aktiveData.map((item) => { const ic = colorMap[item.color as keyof typeof colorMap]; return <div key={item.id} className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50"><div className="flex items-center gap-3 mb-3"><div className={ic.bg + " border " + ic.border + " p-2 rounded-xl"}><span className="text-2xl">{item.icon}</span></div><div><h3 className="text-sm font-bold text-white">{item.title}</h3><p className="text-xs text-slate-400 mt-0.5">{item.description}</p></div></div><ul className="space-y-1.5 ml-10 border-l-2 border-slate-700/50 pl-3">{item.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2 pb-1.5"><div className={ic.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div> })}</div>}
                  {section.id === 'brandcentral' && <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50"><ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={colors.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div>}
                  {section.id === 'taktik' && <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50"><ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={colors.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick-reference card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-blue-400" /><h2 className="text-xs font-bold text-white uppercase tracking-wider">Hurtig Reference</h2></div>
        <div className="grid grid-cols-2 gap-2">{
          [
            { label: 'Passiv', value: 'Konstruktion', sub: 'EI 30-240, R 30-240' },
            { label: 'Branddøre', value: 'EI 30-120', sub: 'Selvlukkende!' },
            { label: 'ABA', value: 'Detektering', sub: 'Alarm → BMA' },
            { label: 'Sprinkler', value: '68-93°C', sub: 'Kun 1 hoved åbner' },
            { label: 'Røgudluftn.', value: 'Naturlig/Mek.', sub: 'Synlighed + redning' },
            { label: 'Gasslukning', value: 'CO2/Inert/Novec', sub: 'ILTSULT FARE!' },
          ].map((item, i) => <div key={i} className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center"><div className="text-[10px] text-slate-400 font-medium">{item.label}</div><div className="text-sm font-bold text-white mt-0.5">{item.value}</div><div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div></div>)
        }</div>
      </div>
    </div>
  )
}