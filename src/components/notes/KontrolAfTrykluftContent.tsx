import React, { useState } from 'react'
import {
  ChevronDown,
  Shield,
  Eye,
  Gauge,
  ShieldCheck,
  Bell,
  Settings,
  ClipboardList,
  CheckSquare,
  AlertTriangle,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface KontrolStep {
  id: string
  step: number
  title: string
  icon: LucideIcon
  color: 'amber' | 'cyan' | 'blue' | 'rose' | 'emerald'
  description: string
  bullets: string[]
}

interface NoteSection {
  id: string
  title: string
  color: 'amber' | 'cyan' | 'blue' | 'rose' | 'emerald' | 'purple'
  icon: LucideIcon
  bullets: string[]
}

export const KontrolAfTrykluftContent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('oversigt')

  const kontrolSteps: KontrolStep[] = [
    {
      id: 'visuel',
      step: 1,
      title: 'Visuel kontrol',
      icon: Eye,
      color: 'amber',
      description: 'Tjek apparatets fysiske tilstand inden brug.',
      bullets: [
        'Kontrollér slanger, stropper, bælte og rygskjold for skader og slitage.',
        'Tjek flaske og evt. overtræk (komposit) for revner, buler eller varmeskader.',
        'Kontrollér at alle lyn- og gevindkoblinger sidder korrekt.',
        'Tjek at manometerglasset er helt, rent og tydeligt aflæsbart.',
        'Sikr at advarselsfløjten er intakt og ikke tilstoppet eller blokeret.',
      ],
    },
    {
      id: 'indhold',
      step: 2,
      title: 'Indholdskontrol',
      icon: Gauge,
      color: 'cyan',
      description: 'Sikrer at flasken har det påkrævede arbejdstryk.',
      bullets: [
        'Luk for systemet på lungeautomaten.',
        'Åbn flaskeventilen HELT op – og drej derefter en halv omgang tilbage.',
        'Aflæs manometeret: Min. 270 bar (90%) for at være fuldt indsatsklar.',
        'Hvis under 270 bar: Flasken skal genopfyldes eller ombyttes.',
        'Luk flaskeventilen igen og observer manometeret i 1 minut (forbered tæthedskontrol).',
      ],
    },
    {
      id: 'taethed',
      step: 3,
      title: 'Tæthedskontrol',
      icon: ShieldCheck,
      color: 'blue',
      description: 'Sikrer at systemet holder trykket uden utætheder.',
      bullets: [
        'Efter indholdskontrol: Luk flaskeventilen og observer trykket i 1 minut.',
        'Manometertryk må MAKS. falde 10-20 bar på 1 minut.',
        'Ved større trykfald: Efterspænd koblinger, tjek slanger, o-ringe og ventiler.',
        'Brug eventuelt sæbevand eller lækagespray ved mistanke om utæthed.',
        'Systemet må KUN tages i brug, når tætheden er fuldt bekræftet.',
      ],
    },
    {
      id: 'floejte',
      step: 4,
      title: 'Fløjtekontrol (alarmtest)',
      icon: Bell,
      color: 'rose',
      description: 'Tester at advarselsfløjten aktiveres ved lavt resttryk.',
      bullets: [
        'Åbn forsigtigt ventilen på lungeautomaten (via by-pass eller udluftning).',
        'Lad systemtrykket falde roligt og kontrolleret.',
        'Fløjten SKAL aktiveres og give tydelig alarmlyd ved 50-60 bar.',
        'Hvis fløjten ikke lyder: Apparatet MÅ IKKE anvendes under nogen omstændigheder!',
        'Luk ventilen igen, når fløjten har afgivet signal.',
      ],
    },
    {
      id: 'funktion',
      step: 5,
      title: 'Funktionskontrol',
      icon: Settings,
      color: 'emerald',
      description: 'Tester at lungeautomat, overtryk og maske fungerer korrekt.',
      bullets: [
        'Åbn flaskeventilen helt (og en halv omgang tilbage).',
        'Tag masken på – tjek tæthed ved at indånde kraftigt (masken skal suge fast mod ansigtet).',
        'Test by-pass / ekstra luft: Tryk på knappen – luften skal strømme frit igennem.',
        'Test "luk/åbn" på lungeautomaten: Luk – luftflow stoppes. Åbn – luft strømmer ved indånding.',
        'Aflæs manometeret igen – trykket skal forblive stabilt under brug.',
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

  const sections: NoteSection[] = [
    {
      id: 'oversigt',
      title: 'Oversigt & Principper',
      color: 'blue',
      icon: ClipboardList,
      bullets: [
        'De 5 kontroller udføres obligatorisk EFTER BRUG og ved FLASKESKIFT.',
        'Rækkefølgen er vigtig: 1 → 2 → 3 → 4 → 5.',
        'Fejl ved blot én kontrol = apparatet MÅ IKKE bruges før autoriseret udbedring.',
        'Alle gennemførte kontroller og flaskeskift noteres i apparatets logbog.',
      ],
    },
    {
      id: 'kontroller',
      title: 'De 5 Kontroller (Detaljeret)',
      color: 'amber',
      icon: CheckSquare,
      bullets: [],
    },
    {
      id: 'fejl',
      title: 'Typiske Fejl & Handlinger',
      color: 'rose',
      icon: AlertTriangle,
      bullets: [
        'Manometer viser under 270 bar → Fyld eller udskift flasken.',
        'Trykfald > 20 bar/min ved tæthedskontrol → Lokaliser lækage, efterspænd eller udskift pakning.',
        'Fløjte lyder IKKE ved 50-60 bar → Udfas apparatet omgående og send til reparation.',
        'Masken suger IKKE fast ved indånding → Tjek tætningskant, maskebånd og ventilklapper.',
        'By-pass knap virker ikke → Udskift lungeautomaten.',
        'Slange har overfladeskader eller revner → Udskift slangen før videre indsats.',
      ],
    },
    {
      id: 'vedligehold',
      title: 'Vedligehold & Intervalkontroller',
      color: 'emerald',
      icon: Wrench,
      bullets: [
        'Daglig / ved vagtskifte: Visuel kontrol + indholdskontrol.',
        'Ugentlig: Komplet 5-trins kontrol (hvis apparatet ikke anvendes dagligt).',
        'Årlig: Autoriseret fageftersyn af hele trykluftapparatet på godkendt værksted.',
        'Hvert 5. år: Periodisk trykprøvning af trykflasken (stemples med godkendelsesdato).',
        'Kompositflasker: Maks. 15 års levetid fra fremstillingsdatoen.',
        'Stålflasker: Ubegrænset levetid forudsat bestået 5-års trykprøvning.',
      ],
    },
  ]

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 border border-amber-500/30 p-2.5 rounded-xl">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
              Materiel
            </span>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Kontrol af Trykluft
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">De 5 kontroller efter brug / flaskeskift</p>
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = expanded === section.id
          const colors = colorMap[section.color as keyof typeof colorMap] || colorMap.blue
          const SectionIcon = section.icon
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
                onClick={() => setExpanded(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${isOpen ? colors.bg : 'bg-slate-800/80'} ${colors.accent}`}>
                    <SectionIcon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      isOpen ? colors.text : 'text-white group-hover:text-amber-200'
                    } transition-colors`}
                  >
                    {section.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-all duration-200 ${
                    isOpen ? `${colors.accent} rotate-180` : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 space-y-4">
                  {section.id === 'oversigt' && (
                    <ul className="space-y-2">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div
                            className={
                              colors.accent +
                              ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'
                            }
                          />
                          <span className="text-xs text-slate-300 leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.id === 'kontroller' && (
                    <div className="space-y-4">
                      {kontrolSteps.map((step) => {
                        const stepColors = colorMap[step.color as keyof typeof colorMap]
                        const StepIcon = step.icon
                        return (
                          <div
                            key={step.id}
                            className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`${stepColors.bg} border ${stepColors.border} p-2.5 rounded-xl ${stepColors.accent}`}
                              >
                                <StepIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                    Kontrol {step.step}
                                  </span>
                                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                              </div>
                            </div>
                            <ul className="space-y-1.5 ml-10 border-l-2 border-slate-700/50 pl-3">
                              {step.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-2 pb-1.5">
                                  <div
                                    className={
                                      stepColors.accent +
                                      ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'
                                    }
                                  />
                                  <span className="text-xs text-slate-300 leading-relaxed">
                                    {bullet}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {section.id === 'fejl' && (
                    <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50">
                      <ul className="space-y-2">
                        {section.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div
                              className={
                                colors.accent +
                                ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'
                              }
                            />
                            <span className="text-xs text-slate-300 leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.id === 'vedligehold' && (
                    <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/50">
                      <ul className="space-y-2">
                        {section.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div
                              className={
                                colors.accent +
                                ' w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0'
                              }
                            />
                            <span className="text-xs text-slate-300 leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick-reference card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Hurtig Reference</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Min. tryk', value: '270 bar', sub: '90% = klar til indsats' },
            { label: 'Tæthed', value: 'Maks 20 bar', sub: 'Fald pr. minut' },
            { label: 'Fløjtealarm', value: '50-60 bar', sub: 'Skal give lyd' },
            { label: 'Daglig kontrol', value: 'Visuel + tryk', sub: 'Ved skifte/efter brug' },
            { label: 'Årlig kontrol', value: 'Fageftersyn', sub: 'Godkendt værksted' },
            { label: 'Trykprøve', value: 'Hvert 5. år', sub: 'Trykprøvning af flaske' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-750 rounded-xl p-2.5 text-center min-w-0"
            >
              <div className="text-[10px] text-slate-400 font-medium truncate">{item.label}</div>
              <div className="text-sm font-bold text-white mt-0.5 truncate">{item.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
