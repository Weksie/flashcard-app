import React, { useState } from 'react'
import { ChevronDown, Shield } from 'lucide-react'

export const KontrolAfTrykluftContent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('oversigt')

  const kontrolSteps = [
    {
      id: 'visuel',
      step: 1,
      title: 'Visuel kontrol',
      icon: 'ðŸ‘ï¸',
      color: 'amber',
      description: 'Tjek apparatets fysiske tilstand inden brug.',
      bullets: [
        'KontrollÃ©r slanger, stropper, bÃ¦lte og rygskjold for skader.',
        'Tjek flaske og evt. overtrÃ¦k (komposit) for revner, buler eller varmeskader.',
        'KontrollÃ©r at alle koblinger sidder korrekt.',
        'Tjek at manometerglas er hel og aflÃ¦sbart.',
        'Sikr at flÃ¸jte/intakt og ikke blokeret.',
      ],
    },
    {
      id: 'indhold',
      step: 2,
      title: 'Indholdskontrol',
      icon: 'ðŸ“Š',
      color: 'cyan',
      description: 'Sikrer at flasken har tilstrÃ¦kkeligt tryk.',
      bullets: [
        'Luk for systemet pÃ¥ lungeautomaten.',
        'Ã…bn flasken HELT op â€“ derefter en halv omgang tilbage.',
        'AflÃ¦s manometer: Min. 270 bar (90%) for at vÃ¦re klar til indsats.',
        'Hvis under 270 bar: Flaske skal fyldes/udskiftes.',
        'Luk flasken igen og observer manometer i 1 min (tÃ¦thedskontrol).',
      ],
    },
    {
      id: 'taethed',
      step: 3,
      title: 'TÃ¦thedskontrol',
      icon: 'ðŸ”’',
      color: 'blue',
      description: 'Sikrer at systemet er tÃ¦dt efter indholdskontrol.',
      bullets: [
        'Efter indholdskontrol: Luk flasken og vent 1 minut.',
        'Manometer mÃ¥ MÃ…X falde 10-20 bar pÃ¥ 1 minut.',
        'Ved stÃ¸rre fald: Tjek koblinger, slange og ventil for lÃ¤kkage.',
        'Brug eventuelt saponifieret vand ved mistÃ¦nkt lÃ¤k.',
        'Systemet mÃ¥ KUN bruges hvis tÃ¦thed er bekrÃ¦ftet.',
      ],
    },
    {
      id: 'floejte',
      step: 4,
      title: 'FlÃ¸jtekontrol (alarmtest)',
      icon: 'ðŸ””',
      color: 'rose',
      description: 'Tester at alarmflÃ¸jten virker ved lavt tryk.',
      bullets: [
        'Ã…bn ventil pÃ¥ lungeautomat (by-pass eller maske).',
        'Lad tryk falde roligt nedad.',
        'FlÃ¸jten MÃ…TTE stÃ¸tte/lyde ved 50-60 bar.',
        'Hvis flÃ¸jte ikke virker: Apparat MÃ… IKKE bruges!',
        'Luk ventil nÃ¥r flÃ¸jte har larmet.',
      ],
    },
    {
      id: 'funktion',
      step: 5,
      title: 'Funktionskontrol',
      icon: 'âš™ï¸',
      color: 'emerald',
      description: 'Tester at lungeautomat og maske fungerer korrekt.',
      bullets: [
        'Ã…bn flasken helt (halv omgang tilbage).',
        'SÃ¦t maske pÃ¥ â€“ tjek tÃ¦thed ved at indÃ¥ndes Kraftigt (maske skal suge fast).',
        'Test by-pass: Tryk pÃ¥ knap â€“ luft skal strÃ¸mme frit.',
        'Test "luk/Ã¥bn" hÃ¥ndtag pÃ¥ lungeautomat: Luk â€“ luft stoppes. Ã…bn â€“ luft flyder.',
        'AflÃ¦s manometer igen â€“ tryk skal vÃ¦re stabil.',
      ],
    },
  ]

  const colorMap = {
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', accent: 'text-amber-400' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300', accent: 'text-rose-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300', accent: 'text-blue-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300', accent: 'text-emerald-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300', accent: 'text-cyan-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300', accent: 'text-purple-400' },
  }

  const sections = [
    { id: 'oversigt', title: 'Oversigt & Principper', color: 'blue', icon: 'ðŸ“‹', bullets: [
      'De 5 kontroller udfÃ¸res EFTER BRUG og ved FLASKESKIFT.',
      'RÃ¦kkefÃ¸lge er vigtig: 1â†’2â†’3â†’4â†’5.',
      'Fejl ved EN kontrol = apparat MÃ… IKKE bruges fÃ¸r reparation.',
      'Alle kontroller logges i apparatlogbogen.',
    ]},
    { id: 'kontroller', title: 'De 5 Kontroller (Detaljeret)', color: 'amber', icon: 'âœ…', bullets: [] },
    { id: 'fejl', title: 'Typiske Fejl & Handlinger', color: 'rose', icon: 'âš ï¸', bullets: [
      'Manometer viser under 270 bar â†’ Fyld/udskift flaske.',
      'Trykfalder >20 bar/min ved tÃ¦thedskontrol â†’ Find lÃ¤k, ret/udskift.',
      'FlÃ¸jte larmÃ©r IKKE ved 50-60 bar â†’ UDFASE apparat straks.',
      'Maske sukker IKKE fast ved indÃ¥nding â†’ Tjek tÃ¦thed/nosecup.',
      'By-pass virker ikke â†’ Udskift lungeautomat.',
      'Slange har revner/slid â†’ Udskift slange.',
    ]},
    { id: 'vedligehold', title: 'Vedligehold & Intervalkontroller', color: 'emerald', icon: 'ðŸ”§', bullets: [
      'Daglig/ved skifte: Visuel kontrol + indholdskontrol.',
      'Ugentlig: Komplet 5-kontrol (hvis ikke brugt dagligt).',
      'Ã…rlig: Faglig kontrol af hel apparat (godkendt virksomhed).',
      '5-Ã¥rligt: TrykprÃ¸ve af flaske (stempel/dato).',
      'Kompositflasker: Maks 15 Ã¥r levetid fra fremstillingsdato.',
      'StÃ¥lflasker: UbegrÃ¦nset levetid ved bestÃ¥et trykprÃ¸ve.',
    ]},
  ]

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/90 rounded-2xl p-4 shadow-xl border border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-[10px] font-bold text-amber-200 uppercase tracking-wider">
              Materiel
            </span>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Kontrol af Trykluft
            </h1>
            <p className="text-xs text-amber-100/80 mt-0.5">De 5 kontroller efter brug / flaskeskift</p>
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
                  <span className={`text-sm font-bold ${isOpen ? colors.text : 'text-white group-hover:text-amber-200'} transition-colors`}>
                    {section.title}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-all duration-200 ${isOpen ? `${colors.accent} rotate-180` : 'text-slate-400 group-hover:text-slate-300'}`} />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 space-y-4">
                  {section.id === 'oversigt' && <ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={colors.accent + ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul>}
                  {section.id === 'kontroller' && <div className="space-y-4">{kontrolSteps.map((step) => { const stepColors = colorMap[step.color as keyof typeof colorMap]; return <div key={step.id} className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50"><div className="flex items-center gap-3 mb-3"><div className={stepColors.bg + " border " + stepColors.border + " p-2 rounded-xl"}><span className="text-2xl">{step.icon}</span></div><div><div className="flex items-center gap-2"><span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">Kontrol {step.step}</span><h3 className="text-sm font-bold text-white">{step.title}</h3></div><p className="text-xs text-slate-400 mt-0.5">{step.description}</p></div></div><ul className="space-y-1.5 ml-10 border-l-2 border-slate-700/50 pl-3">{step.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2 pb-1.5"><div className={stepColors.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div> })}</div>}
                  {section.id === 'fejl' && <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50"><ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={colors.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div>}
                  {section.id === 'vedligehold' && <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50"><ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={colors.accent + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul></div>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick-reference card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-amber-400" /><h2 className="text-xs font-bold text-white uppercase tracking-wider">Hurtig Reference</h2></div>
        <div className="grid grid-cols-2 gap-2">{
          [
            { label: 'Min. tryk', value: '270 bar', sub: '90% = klar til indsats' },
            { label: 'TÃ¦thed', value: 'Max 20 bar', sub: 'Fald pr. minut' },
            { label: 'FlÃ¸jte alarm', value: '50-60 bar', sub: 'MÃ…TTE lyde' },
            { label: 'Daglig kontrol', value: 'Visuel + tryk', sub: 'Ved skifte/brug' },
            { label: 'Ã…rlig kontrol', value: 'Faglig', sub: 'Godkendt virksomhed' },
            { label: 'TrykprÃ¸ve', value: 'Hver 5 Ã¥r', sub: 'Flaske' },
          ].map((item, i) => <div key={i} className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center"><div className="text-[10px] text-slate-400 font-medium">{item.label}</div><div className="text-sm font-bold text-white mt-0.5">{item.value}</div><div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div></div>)
        }</div>
      </div>
    </div>
  )
}

