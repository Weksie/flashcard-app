import React, { useState } from 'react'
import { ChevronDown, Truck, Users, Shield, ClipboardList, Target } from 'lucide-react'

export const HTUdlægningContent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('oversigt')

  const rollbeskrivelser = [
    { id: 'leder', titel: 'Lederen / Holdleder', materiel: 'Lygte', opgaver: ['Giver befaling / udpeger slangevej', 'Vurderer adgangsveje og sikrer fornødent tryk', 'Leder indsatsen frem til brandstedet'], color: 'amber', icon: Users },
    { id: 'nr1', titel: '1.er (Røgdykker)', materiel: 'SOS + Slangekrog', opgaver: ['Betjener HT-strålerør frem mod branden', 'Vælger passende stråletype (fuld/sprej)', 'Ved ophaling: Betjener angrebsslangen'], color: 'rose', icon: Target },
    { id: 'nr2', titel: '2.er (Røgdykkermakker)', materiel: '—', opgaver: ['Udlægger slangen frit uden knæk', 'Følger nr. 1 tæt som røgdykkermakker', 'Medvirker ved eventuel ophaling'], color: 'blue', icon: Shield },
    { id: 'nr3', titel: '3.er (Hjælper)', materiel: '—', opgaver: ['Hjælper med slangeudlægning (trækker slange af tromlen)', 'Aflaster røgdykkerne for slangekæden', 'Melder sig derefter straks til lederen'], color: 'emerald', icon: Truck },
    { id: 'nr4', titel: '4.er (Vandforsyning)', materiel: 'BBB (Brandhanenøgle, -stykke, B-slange)', opgaver: ['Udlægger fødeslange fra brandhane til sprøjte', 'Finder brandhane, tilslutter nøgle og stykke', 'Går til pumpen og assisterer motorpasseren'], color: 'purple', icon: ClipboardList },
    { id: 'mp', titel: 'MP (Motorpasser / Chauffør)', materiel: '—', opgaver: ['Betjener pumpen (starter HT-pumpe)', 'Åbner for afgang og overvåger vandbeholdning', 'Overvåger pumpetryk og justerer efter behov'], color: 'cyan', icon: Truck },
  ]

  const materielKrav = [
    { label: 'S - Strålerør', desc: 'HT-strålerør til angreb', icon: Target },
    { label: 'O - Ophalerline', desc: 'Til sikring ved indgåelse', icon: Shield },
    { label: 'S - Slangekrog', desc: 'Til kravletilpasning', icon: ClipboardList },
    { label: 'B - Brandhanenøgle', desc: 'Til åbning af brandhane', icon: Truck },
    { label: 'B - Brandhanestykke', desc: 'Tilslutning til brandhane', icon: Truck },
    { label: 'B - B-slange', desc: 'Fødeslange (typisk 2 stk.)', icon: Truck },
  ]

  const colorMap = {
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300' },
  }

  const sectionIconColor: Record<string, keyof typeof colorMap> = { oversigt: 'blue', roller: 'amber', materiel: 'emerald', taktisk: 'rose' }

  const sections = [
    { id: 'oversigt', title: 'Oversigt & Principper', bullets: ['Hurtig indsats med HT-slange ud fra sprøjten (hurtigst mulige angreb)', 'Komplet bemanding: 6 mand (Leder, 1.-4.er, MP)', 'Standardprocedure ved mindre brande / indledende indsats', 'SOS & BBB materielkrav er obligatorisk'] },
    { id: 'roller', title: 'Rollefordeling (6 mand)', bullets: [] },
    { id: 'materiel', title: 'Materielkrav (SOS & BBB)', bullets: [] },
    { id: 'taktisk', title: 'Taktisk Skitse & Fremgangsmåde', bullets: ['1. Leder giver befaling og udpeger slangevej', '2. 1.er tager SOS, 2.er følger med slangen', '3. 3.er trækker slange af tromle, melder til leder', '4. 4.er etablerer vandforsyning (BBB) fra brandhane', '5. MP starter pumpe, giver tryk på HT-afgangen', '6. Angreb fremføres til brandstedet - stråletype vælges efter situation'] },
  ]

  return (
    <div className='space-y-4'>
      <div className='bg-slate-900/95 rounded-2xl p-4 shadow-xl border border-amber-500/30'>
        <div className='flex items-center gap-3'>
          <div className='bg-amber-500/20 border border-amber-500/30 p-2.5 rounded-xl'><Truck className='w-6 h-6 text-amber-400' /></div>
          <div>
            <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider'>Slangeudlægning</span>
            <h1 className='text-lg font-bold text-white tracking-tight'>HT udlægning</h1>
            <p className='text-sm font-semibold text-amber-300 mt-0.5'>Højtryksslangen ud fra sprøjten</p>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        {sections.map((section) => {
          const isOpen = expanded === section.id
          const c = colorMap[sectionIconColor[section.id as keyof typeof sectionIconColor]]
          return (
            <div key={section.id} className={'rounded-2xl border transition-all overflow-hidden ' + (isOpen ? c.bg + ' ' + c.border + ' shadow-lg' : 'bg-slate-900/90 border-slate-800 hover:border-slate-700')}>
              <button onClick={() => setExpanded(isOpen ? null : section.id)} className='w-full flex items-center justify-between p-3.5 text-left cursor-pointer group'>
                <div className='flex items-center gap-2.5'>
                  <span className='text-base'>{section.id === 'oversigt' && <Target className='w-5 h-5' />}{section.id === 'roller' && <Users className='w-5 h-5' />}{section.id === 'materiel' && <ClipboardList className='w-5 h-5' />}{section.id === 'taktisk' && <Shield className='w-5 h-5' />}</span>
                  <span className={'text-sm font-bold ' + (isOpen ? c.text : 'text-white group-hover:text-amber-200') + ' transition-colors'}>{section.title}</span>
                </div>
                <ChevronDown className={'w-4 h-4 transition-all duration-200 ' + (isOpen ? c.text + ' rotate-180' : 'text-slate-400 group-hover:text-slate-300')} />
              </button>

              {isOpen && (
                <div className='px-3.5 pb-3.5 space-y-4'>
                  {section.id === 'oversigt' && <ul className='space-y-2'>{section.bullets.map((bullet, i) => <li key={i} className='flex items-start gap-2'><div className={'w-1.5 h-1.5 rounded-full ' + c.text + ' bg-current mt-1.5 flex-shrink-0'} /><span className='text-xs text-slate-300 leading-relaxed'>{bullet}</span></li>)}</ul>}
                  {section.id === 'roller' && <div className='space-y-3'>{rollbeskrivelser.map((rolle) => { const Icon = rolle.icon; const rc = colorMap[rolle.color as keyof typeof colorMap]; return <div key={rolle.id} className='bg-slate-950/40 rounded-xl p-3 border border-slate-800/50'><div className='flex items-center gap-2 mb-2'><div className={'bg-' + rolle.color + '-500/20 p-1.5 rounded-lg'}><Icon className={'w-4 h-4 text-' + rolle.color + '-400'} /></div><span className='text-sm font-bold text-white'>{rolle.titel}</span><span className={'text-[10px] font-medium px-2 py-0.5 rounded ' + rc.bg + ' ' + rc.border + ' ' + rc.text}>Materiel: {rolle.materiel}</span></div><ul className='space-y-1 ml-6'>{rolle.opgaver.map((opgave, i) => <li key={i} className='flex items-start gap-1.5'><div className={'w-1 h-1 rounded-full ' + rc.text + ' bg-current mt-2 flex-shrink-0'} /><span className='text-xs text-slate-300 leading-relaxed'>{opgave}</span></li>)}</ul></div> })}</div>}
                  {section.id === 'materiel' && <div className='grid grid-cols-2 gap-2'>{materielKrav.map((item, i) => { const Icon = item.icon; return <div key={i} className='bg-slate-950/40 rounded-xl p-3 border border-slate-800/50'><div className='flex items-center gap-2 mb-1'><Icon className='w-4 h-4 text-amber-400' /><span className='text-xs font-bold text-amber-300'>{item.label}</span></div><p className='text-[11px] text-slate-400'>{item.desc}</p></div> })}</div>}
                  {section.id === 'taktisk' && <ol className='space-y-2'>{section.bullets.map((bullet, i) => <li key={i} className='flex items-start gap-2'><span className={'text-xs font-bold ' + c.text + ' flex-shrink-0 mt-0.5'}>{i + 1}.</span><span className='text-xs text-slate-300 leading-relaxed'>{bullet}</span></li>)}</ol>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className='bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl'>
        <div className='flex items-center gap-2 mb-3'><ClipboardList className='w-4 h-4 text-amber-400' /><h2 className='text-xs font-bold text-white uppercase tracking-wider'>Nøgletal & Hurtig-reference</h2></div>
        <div className='grid grid-cols-2 gap-2'>{[ { label: 'Bemanding', value: '6 mand', sub: 'Leder, 1-4.er, MP' }, { label: 'Strålerør', value: 'HT', sub: 'Fuld/sprej stråle' }, { label: 'Materiel 1.er', value: 'SOS', sub: 'Strålerør, Ophalerline, Slangekrog' }, { label: 'Materiel 4.er', value: 'BBB', sub: 'Nøgle, Stykke, B-slange' } ].map((item, i) => <div key={i} className='bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center'><div className='text-[10px] text-slate-400 font-medium'>{item.label}</div><div className='text-sm font-bold text-white mt-0.5'>{item.value}</div><div className='text-[10px] text-slate-500 mt-0.5'>{item.sub}</div></div>)}</div>
      </div>
    </div>
  )
}
