import React, { useState } from 'react'
import { ChevronDown, Shield, Fuel, Waves, Settings, Wind } from 'lucide-react'

export const TrykluftapparatContent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('oversigt')

  const rollbeskrivelser = [
    { id: 'rygmejse', titel: 'Rygmejse med reduktionsventil', materiel: 'Rygskjold, bælte, reduktionsventil', opgaver: ['Bærer flaske og reducerer tryk fra 300 bar til 7,5 bar (mellemtryk)', 'Har manometer til aflæsning af flasketryk', 'Automatisk fløjte ved 50-60 bar (alarm)', 'Har hurtigkobling til slange til lungeautomat'], color: 'amber', icon: Shield },
    { id: 'flaske', titel: 'Flaske (300 bar)', materiel: 'Stål (6L) eller Komposit (6,8L)', opgaver: ['Stålflaske: 6 L × 300 bar = 1.800 L luft', 'Kompositflaske: 6,8 L × 300 bar = 2.040 L luft', 'Må fyldes til maks 300 bar ved 15°C (15+5 bar ved 20°C)', 'Årlig visuel kontrol, 5-årig trykprøve'], color: 'cyan', icon: Fuel },
    { id: 'slange', titel: 'Mellemtryksslange', materiel: 'Slange 7,5 bar', opgaver: ['Fører luft fra reduktionsventil til lungeautomat', 'Har hurtigkoblinger i begge ender', 'Mål for tæthed og skader ved kontrol', 'Udskiftes ved tegn på slid eller skader'], color: 'blue', icon: Waves },
    { id: 'lungeautomat', titel: 'Lungeautomat (andemanderventil)', materiel: 'Hus, membran, fortryksfjeder, by-pass', opgaver: ['Reducerer mellemtryk (7,5 bar) til masketryk (~10 mbar overtryk)', 'Leverer luft KUN ved indånding (efterspørgelsestyrret)', 'By-pass knap: manuel luftgivning (nødtilfælde)', 'Har "luk/åbn" håndtag til afkobling af luftforsyning'], color: 'rose', icon: Wind },
    { id: 'maske', titel: 'Maske med overtryk', materiel: 'Maskekro, nosecup, rørtilslutning, hovedbånd', opgaver: ['Sikrer tæthed mod ansigtet med overtryk (forhindrer røgintrådelse)', 'Nosecup forhindrer dimning og CO2-ophobning', 'Tilkobles lungeautomat via hurtigkobling', 'Hovedbånd justeres for optimal tæthed og komfort'], color: 'purple', icon: Settings },
  ]

  const colorMap = {
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300' },
  }

  const sectionIconColor: Record<string, keyof typeof colorMap> = { oversigt: 'blue', komponenter: 'amber', tryk: 'cyan', sikkerhed: 'rose' }

  const sections = [
    { id: 'oversigt', title: 'Oversigt & Principper', bullets: ['Trykluftapparat (BA) = Selvindeholdt åndedrætsbeskyttelse', 'Åben system: Udløst luft blæses ud i omgivelserne', 'Overtryk i maske forhindrer giftig røg/gas i at træde ind', 'Standard: EN 137 (Type 2, 300 bar)'] },
    { id: 'komponenter', title: 'Komponenter (5 hoveddele)', bullets: [] },
    { id: 'tryk', title: 'Trykniveauer & Flyd', bullets: ['1. Flaske: 300 bar (arbejdstryk) – 1.800/2.040 L luft', '2. Reduktionsventil: 300 bar → 7,5 bar (mellemtryk)', '3. Mellemtryksslange: 7,5 bar til lungeautomat', '4. Lungeautomat: 7,5 bar → ~10 mbar overtryk i maske', '5. Maske: Overtryk sikrer tæthed mod ansigtet'] },
    { id: 'sikkerhed', title: 'Sikkerhedsfunktioner', bullets: ['Fløjte/alarm ved 50-60 bar (ca. 10 min tilbage)', 'Overtryk i maske = beskyttelse mod indtrængen', 'By-pass på lungeautomat = nødluft manuelt', 'Hurtigkoblinger = hurtig montering/demontering', 'Manometer = løbende overvågning af resttid'] },
  ]

return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 border border-amber-500/30 p-2.5 rounded-xl">
            <Wind className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
              Materiel
            </span>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Trykluftapparat
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">Rygmejse, flaske, maske & lungeautomat</p>
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = expanded === section.id
          const c = colorMap[sectionIconColor[section.id] || 'blue']
          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition-all overflow-hidden ${isOpen
                ? `${c.bg} ${c.border} shadow-lg`
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{section.id === 'oversigt' && '📋'}{section.id === 'komponenter' && '🔧'}{section.id === 'tryk' && '📊'}{section.id === 'sikkerhed' && '🛡️'}</span>
                  <span className={`text-sm font-bold ${isOpen ? c.text : 'text-white group-hover:text-amber-200'} transition-colors`}>
                    {section.title}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-all duration-200 ${isOpen ? c.text + ' rotate-180' : 'text-slate-400 group-hover:text-slate-300'}`} />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 space-y-4">
                  {section.id === 'oversigt' && <ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={c.text + ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul>}
                  {section.id === 'komponenter' && <div className="space-y-3">{rollbeskrivelser.map((rolle) => { const Icon = rolle.icon; const rc = colorMap[rolle.color as keyof typeof colorMap]; return <div key={rolle.id} className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50"><div className="flex items-center gap-2 mb-2"><div className={"bg-" + rolle.color + "-500/20 p-1.5 rounded-lg"}><Icon className={"w-4 h-4 text-" + rolle.color + "-400"} /></div><span className="text-sm font-bold text-white">{rolle.titel}</span><span className={"text-[10px] font-medium px-2 py-0.5 rounded " + rc.bg + " " + rc.border + " " + rc.text}>Materiel: {rolle.materiel}</span></div><ul className="space-y-1 ml-6">{rolle.opgaver.map((opgave, i) => <li key={i} className="flex items-start gap-1.5"><div className={rc.text + " w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{opgave}</span></li>)}</ul></div> })}</div>}
                  {section.id === 'tryk' && <ol className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><span className={c.text + " text-xs font-bold flex-shrink-0 mt-0.5"}>{i + 1}.</span><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ol>}
                  {section.id === 'sikkerhed' && <ul className="space-y-2">{section.bullets.map((bullet, i) => <li key={i} className="flex items-start gap-2"><div className={c.text + " w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"} /><span className="text-xs text-slate-300 leading-relaxed">{bullet}</span></li>)}</ul>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick-reference card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3"><Wind className="w-4 h-4 text-amber-400" /><h2 className="text-xs font-bold text-white uppercase tracking-wider">Nøgletal & Hurtig-reference</h2></div>
        <div className="grid grid-cols-2 gap-2">{
          [
            { label: 'Arbejdstryk', value: '300 bar', sub: 'Flaske' },
            { label: 'Mellemtryk', value: '7,5 bar', sub: 'Reduktionsventil → slange' },
            { label: 'Masketryk', value: '~10 mbar', sub: 'Overtryk (lungeautomat)' },
            { label: 'Alarm', value: '50-60 bar', sub: 'Fløjte i manometer' },
            { label: 'Stål 6L', value: '1.800 L', sub: '6 × 300 bar' },
            { label: 'Komposit 6,8L', value: '2.040 L', sub: '6,8 × 300 bar' },
          ].map((item, i) => <div key={i} className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center"><div className="text-[10px] text-slate-400 font-medium">{item.label}</div><div className="text-sm font-bold text-white mt-0.5">{item.value}</div><div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div></div>)
        }</div>
      </div>
    </div>
  )
}