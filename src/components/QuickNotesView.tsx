import React, { useState } from 'react'
import { useDeck } from '../context/useDeck'
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  FileText,
  Truck,
  Flame,
} from 'lucide-react'

// Types for the notes
interface NoteItem {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  tags: string[]
  isAvailable: boolean
}

const AVAILABLE_NOTES: NoteItem[] = [
  {
    id: 'ht-udlaegning',
    title: 'HT udlægning',
    subtitle: 'Højtryksslangen ud fra sprøjten',
    category: 'Slangeudlægning',
    description: 'Hurtig indsats med højtryksslangen. Komplet bemanding for alle 6 mand (Leder, 1.-4.er, MP), interaktiv taktisk skitse og materielkrav (SOS & BBB).',
    tags: ['Standardprocedure', '6 roller', 'SOS & BBB', 'Taktisk skitse'],
    isAvailable: true,
  },
  {
    id: 'bc-udlaegning',
    title: 'B/C udlægning',
    subtitle: 'B- og C-slangen ud fra sprøjten',
    category: 'Slangeudlægning',
    description: 'Standard slangeudlægning ved bygningsbrande. B-slange til forgrener, C-slange til angreb, bemanding for alle 6 mand og taktisk skitse med evt. 2. udløb.',
    tags: ['Bygningsbrand', 'Forgrener', 'B & C-slange', 'Taktisk skitse'],
    isAvailable: true,
  },
]

interface MaterielItem {
  letter: string
  text: string
}

interface RoleTask {
  roleId: string
  hvem: string
  hvemSub: string
  materiel: string
  materielItems?: MaterielItem[]
  extraMateriel?: string
  hvad: string
  detail?: string
  color: string
}

const HT_TASKS: RoleTask[] = [
  {
    roleId: 'leder',
    hvem: 'Lederen:',
    hvemSub: 'Holdleder',
    materiel: 'Lygte',
    hvad: 'Giver befaling, udpeger slangevej.',
    detail: 'Vurderer adgangsveje, sikrer fornødent tryk og leder indsatsen frem til brandstedet.',
    color: 'amber',
  },
  {
    roleId: 'nr1',
    hvem: '1.er:',
    hvemSub: 'Røgdykker',
    materiel: 'S O S',
    materielItems: [
      { letter: 'S', text: 'Strålerør (HT)' },
      { letter: 'O', text: 'Ophalerline' },
      { letter: 'S', text: 'Slangekrog' },
    ],
    hvad: 'Betjener strålerøret, ved eventuel ophaling betjener han angrebsslangen.',
    detail: 'Fører angrebet frem mod branden med HT-strålerør og vælger passende stråletype.',
    color: 'rose',
  },
  {
    roleId: 'nr2',
    hvem: '2.er:',
    hvemSub: 'Røgdykkermakker',
    materiel: '—',
    hvad: 'Udlægger slangen, medvirker ved eventuel ophaling.',
    detail: 'Sikrer at slangen løber frit uden knæk og følger nr. 1 tæt som røgdykkermakker.',
    color: 'blue',
  },
  {
    roleId: 'nr3',
    hvem: '3.er:',
    hvemSub: 'Hjælper',
    materiel: '—',
    hvad: 'Hjælper med slangeudlægning, går til lederen.',
    detail: 'Trækker slange af tromlen for at aflaste røgdykkerne og melder sig derefter straks til lederen.',
    color: 'emerald',
  },
  {
    roleId: 'nr4',
    hvem: '4.er:',
    hvemSub: 'Vandforsyning',
    materiel: 'B B B',
    materielItems: [
      { letter: 'B', text: 'Brandhanenøgle' },
      { letter: 'B', text: 'Brandhanestykke' },
      { letter: 'B', text: 'B-slange (fødeslange)' },
    ],
    hvad: 'Udlægger eventuelt fødeslange, går til pumpen.',
    detail: 'Etablerer vandforsyning fra brandhane (BBB) til automobilsprøjten og bistår motorpasseren.',
    color: 'purple',
  },
  {
    roleId: 'mp',
    hvem: 'MP:',
    hvemSub: 'Motorpasser / Chauffør',
    materiel: '—',
    hvad: 'Betjener pumpen.',
    detail: 'Starter HT-pumpen, åbner for afgang og overvåger vandbeholdning samt pumpetryk.',
    color: 'cyan',
  },
]

const BC_TASKS: RoleTask[] = [
  {
    roleId: 'leder',
    hvem: 'Lederen:',
    hvemSub: 'Holdleder',
    materiel: 'Forgrener, lygte',
    hvad: 'Giver befaling, udpeger slangevej, betjener forgreneren.',
    detail: 'Leder indsatsen, anviser føringsvejen for B-slangen og betjener forgrenerens ventiler ved tryksætning.',
    color: 'amber',
  },
  {
    roleId: 'nr1',
    hvem: '1.er:',
    hvemSub: 'Røgdykker',
    materiel: 'S O S, C-slange',
    materielItems: [
      { letter: 'S', text: 'Strålerør (C)' },
      { letter: 'O', text: 'Ophalerline' },
      { letter: 'S', text: 'Slangekrog' },
    ],
    extraMateriel: 'C-slange',
    hvad: 'Klargør angrebet, og ved eventuel ophaling betjener han angrebsslangen.',
    detail: 'Klargør angrebet med C-strålerør og betjener angrebsslangen fremme ved ilden samt ved eventuel ophaling.',
    color: 'rose',
  },
  {
    roleId: 'nr2',
    hvem: '2.er:',
    hvemSub: 'Røgdykkermakker',
    materiel: 'C-slange',
    hvad: 'Udlægger C-slange fra forgrener til angrebssted, medvirker ved eventuel ophaling.',
    detail: 'Udlægger C-slangen i bugter (slangereserve) fra forgreneren frem til angrebsstedet og bistår 1.er.',
    color: 'blue',
  },
  {
    roleId: 'nr3',
    hvem: '3.er:',
    hvemSub: 'Slangeudlægger',
    materiel: 'B-slange',
    hvad: 'Udlægger B-slange fra pumpe til forgrener, går til lederen.',
    detail: 'Kobler B-slangen på sprøjtens trykafgang, ruller den ud til forgreneren og stiller sig derefter til rådighed for lederen.',
    color: 'emerald',
  },
  {
    roleId: 'nr4',
    hvem: '4.er:',
    hvemSub: 'Vandforsyning',
    materiel: 'B B B',
    materielItems: [
      { letter: 'B', text: 'Brandhanenøgle' },
      { letter: 'B', text: 'Brandhanestykke' },
      { letter: 'B', text: 'B-slange (fødeslange)' },
    ],
    hvad: 'Udlægger fødeslange, går til pumpen.',
    detail: 'Finder brandhane, tilslutter nøgle og stykke, udlægger B-fødeslange og assisterer MP ved pumpen.',
    color: 'purple',
  },
  {
    roleId: 'mp',
    hvem: 'MP:',
    hvemSub: 'Motorpasser / Chauffør',
    materiel: '—',
    hvad: 'Betjener pumpen, gør klar til fødeslangeudlægning',
    detail: 'Betjener pumpetrykket for B-afgangen og gør sprøjtens fødeindtag klar til modtagelse af vand fra brandhanen.',
    color: 'cyan',
  },
]

export const QuickNotesView: React.FC = () => {
  const { setScreen, toggleSidebar } = useDeck()
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [highlightedRoleId, setHighlightedRoleId] = useState<string | null>(null)

  const activeNote = AVAILABLE_NOTES.find((n) => n.id === selectedNoteId) || AVAILABLE_NOTES[0]
  const isBc = selectedNoteId === 'bc-udlaegning'
  const currentTasks = isBc ? BC_TASKS : HT_TASKS

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full text-slate-100">
      {/* Top Header */}
      <header className="pt-2 pb-3 flex items-center justify-between sticky top-0 bg-slate-950/95 backdrop-blur-md z-20 -mx-4 px-4 border-b border-slate-900/80 mb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSidebar}
            className="p-1.5 -ml-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
            title="Åbn emne-menu"
            aria-label="Åbn emne-menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {selectedNoteId ? (
            <button
              onClick={() => {
                setSelectedNoteId(null)
                setHighlightedRoleId(null)
              }}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors py-1 px-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/30 cursor-pointer"
              title="Tilbage til oversigten"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Valgmenu</span>
            </button>
          ) : (
            <button
              onClick={() => setScreen('decks')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors py-1 px-1.5 rounded-lg cursor-pointer"
              title="Tilbage til spørgsmål"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden xs:inline">C-Spørgsmål</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="text-right">
            <div className="text-xs font-bold text-white flex items-center gap-1 justify-end">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Hurtige Noter</span>
            </div>
            <p className="text-[10px] text-slate-400">
              {selectedNoteId ? activeNote.title : 'Taktik & Udlægninger'}
            </p>
          </div>
        </div>
      </header>

      {/* VIEW 1: SELECTION MENU (Valgmenu) when no note is chosen */}
      {!selectedNoteId ? (
        <div className="space-y-4 pb-8">
          {/* Welcome / Header Banner */}
          <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                Taktisk Bibliotek
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
                {AVAILABLE_NOTES.filter((n) => n.isAvailable).length} aktive emner
              </span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Hurtige Noter & Udlægninger
            </h1>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Vælg et emne herunder for at se detaljeret bemanding, materielopgaver og taktiske skitser til brug ved prøven og i felten.
            </p>
          </div>

          {/* Cards for each note topic */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Vælg emne
              </span>
              <span className="text-[10px] text-slate-500">
                Tryk på et kort for at åbne
              </span>
            </div>

            {AVAILABLE_NOTES.map((note) => {
              const isAvailable = note.isAvailable
              return (
                <div
                  key={note.id}
                  onClick={() => {
                    setSelectedNoteId(note.id)
                    setHighlightedRoleId(null)
                  }}
                  className={`rounded-2xl border p-4 transition-all text-left relative overflow-hidden group cursor-pointer ${isAvailable
                    ? 'bg-slate-900/95 border-amber-500/40 hover:border-amber-500/70 hover:bg-slate-850 shadow-lg shadow-black/40 hover:scale-[1.01]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850/50'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${isAvailable
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
                          }`}
                      >
                        {note.id === 'ht-udlaegning' ? (
                          <Truck className="w-5 h-5" />
                        ) : note.id === 'bc-udlaegning' ? (
                          <Flame className="w-5 h-5" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {note.title}
                          </h2>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {note.subtitle}
                        </p>
                      </div>
                    </div>

                    {isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Klar
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700/60 flex-shrink-0">
                        Kommer snart
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {note.description}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-[11px]">
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] border border-slate-750"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2">
                      <span>{isAvailable ? 'Åbn udlægning' : 'Se info'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: NOTE DETAIL VIEW (Tabs + Content) */
        <div className="space-y-4 pb-8">
          {/* Quick tab bar with return button */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1">
            <button
              onClick={() => {
                setSelectedNoteId(null)
                setHighlightedRoleId(null)
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-400 hover:text-white hover:border-slate-700 flex items-center gap-1 text-xs flex-shrink-0 transition-colors cursor-pointer"
              title="Tilbage til alle noter"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Oversigt</span>
            </button>

            {AVAILABLE_NOTES.map((note) => {
              const isSelected = note.id === selectedNoteId
              return (
                <button
                  key={note.id}
                  onClick={() => {
                    setSelectedNoteId(note.id)
                    setHighlightedRoleId(null)
                  }}
                  className={`px-3 py-1.5 rounded-xl text-left border flex-shrink-0 transition-all cursor-pointer flex items-center gap-2 ${isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isSelected
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                      }`}
                  >
                    {note.id === 'ht-udlaegning' ? 'HT' : note.id === 'bc-udlaegning' ? 'B/C' : note.title.slice(0, 2)}
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">{note.title}</span>
                  {note.isAvailable && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Main Content Area */}
          {selectedNoteId === 'ht-udlaegning' || selectedNoteId === 'bc-udlaegning' ? (
            <div className="space-y-4">
              {/* Note Banner */}
              <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md mb-1.5">
                      {isBc ? 'Standardudlægning' : 'Standardprocedure'}
                    </span>
                    <h1 className="text-lg font-bold text-white tracking-tight">
                      {isBc ? 'Oversigt over B/C udlægning' : 'Oversigt over HT udlægning'}
                    </h1>
                    <p className="text-sm font-semibold text-amber-300 mt-0.5">
                      {isBc ? 'B- og C-slangen ud' : 'HT-slangen ud'}
                    </p>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {isBc
                        ? 'Standard slangeudlægning ved bygningsbrande og større indsatser. B-slange føres fra automobilsprøjten til forgreneren, hvorfra C-angrebsslangen udlægges i bugter mod ilden.'
                        : 'Bruges ved hurtig indsats over for mindre brande eller før 1. angrebsrør er klargjort. Tryk på de enkelte roller herunder for at fremhæve deres placering på skitsen.'}
                    </p>
                  </div>
                </div>

                {/* Quick role filter pills */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-medium text-slate-400 mr-1">Fremhæv rolle:</span>
                  <button
                    onClick={() => setHighlightedRoleId(null)}
                    className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${highlightedRoleId === null
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                  >
                    Alle
                  </button>
                  {currentTasks.map((task) => {
                    const isSelected = highlightedRoleId === task.roleId
                    return (
                      <button
                        key={task.roleId}
                        onClick={() => setHighlightedRoleId(isSelected ? null : task.roleId)}
                        className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${isSelected
                          ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold shadow-sm'
                          : 'bg-slate-800/70 border-slate-750 text-slate-300 hover:text-white hover:bg-slate-750'
                          }`}
                      >
                        <span>{task.hvem.replace(':', '')}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Table Card (Direct representation of picture table) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-3 bg-slate-850/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                      Rollefordeling & Materiel (Tabel)
                    </h2>
                  </div>
                  <span className="text-[10px] text-slate-400">FUI Instruks</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/95 text-[11px] font-bold text-slate-300">
                        <th className="py-2.5 px-3 w-[24%]">Hvem:</th>
                        <th className="py-2.5 px-2.5 w-[38%]">Materiel:</th>
                        <th className="py-2.5 px-3">Hvad:</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {currentTasks.map((task) => {
                        const isHighlighted = highlightedRoleId === task.roleId
                        return (
                          <tr
                            key={task.roleId}
                            onClick={() =>
                              setHighlightedRoleId(isHighlighted ? null : task.roleId)
                            }
                            className={`transition-colors cursor-pointer ${isHighlighted
                              ? 'bg-amber-500/20 text-white'
                              : 'hover:bg-slate-800/50 text-slate-200'
                              }`}
                          >
                            {/* Hvem */}
                            <td className="py-3 px-3 align-top">
                              <div className="font-bold text-white flex items-center gap-1.5 flex-wrap">
                                <span>{task.hvem}</span>
                                {isHighlighted && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {task.hvemSub}
                              </div>
                            </td>

                            {/* Materiel */}
                            <td className="py-3 px-2.5 align-top">
                              {task.materielItems ? (
                                <div>
                                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                                    {task.materielItems.map((item, idx) => (
                                      <li key={idx} className="flex items-center gap-1.5">
                                        <span
                                          className={`w-4 h-4 rounded font-bold flex items-center justify-center text-[10px] flex-shrink-0 ${task.color === 'rose'
                                            ? 'bg-rose-500/25 text-rose-300'
                                            : 'bg-purple-500/25 text-purple-300'
                                            }`}
                                        >
                                          {item.letter}
                                        </span>
                                        <span className="leading-tight">{item.text}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  {task.extraMateriel && (
                                    <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                                      <span className="text-slate-400 font-medium">+</span>
                                      <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-medium">
                                        {task.extraMateriel}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : task.materiel !== '—' ? (
                                <span className="inline-block px-1.5 py-0.5 text-[11px] font-medium rounded bg-slate-800 text-slate-300 border border-slate-700">
                                  {task.materiel}
                                </span>
                              ) : (
                                <span className="text-slate-600 font-mono pl-1">—</span>
                              )}
                            </td>

                            {/* Hvad */}
                            <td className="py-3 px-3 align-top leading-relaxed text-xs">
                              <div className={isHighlighted ? 'font-medium text-amber-100' : 'text-slate-300'}>
                                {task.hvad}
                              </div>
                              {isHighlighted && task.detail && (
                                <p className="text-[11px] text-amber-300/90 mt-1.5 pt-1.5 border-t border-amber-500/30">
                                  <span className="font-semibold">Uddybning: </span>
                                  {task.detail}
                                </p>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visual Schematic Diagram */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isBc ? (
                      <Flame className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Truck className="w-4 h-4 text-amber-400" />
                    )}
                    <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                      {isBc
                        ? 'Fra sprøjten – B/C slangen ud'
                        : 'Fra sprøjten – Højtryksslangen ud'}
                    </h2>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                    Taktisk Skitse
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  {isBc
                    ? 'Visuel placering af mandskab, forgrener og B/C-slangeføring fra sprøjten til angrebsstedet:'
                    : 'Visuel placering af mandskab og slangeføring fra automobilsprøjten til angrebsstedet:'}
                </p>

                {/* Interactive SVG Diagram */}
                <div className="w-full bg-slate-950/80 rounded-xl border border-slate-800/90 p-2 sm:p-3 relative overflow-hidden">
                  {isBc ? (
                    /* B/C Udlægning SVG (Direct recreation of B/C sketch) */
                    <svg
                      viewBox="0 0 580 290"
                      className="w-full h-auto select-none"
                      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                    >
                      <defs>
                        {/* Grid pattern */}
                        <pattern id="grid-bc" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                        </pattern>

                        {/* Marker Arrow for Strålerør */}
                        <marker
                          id="hose-arrow-bc"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
                        </marker>
                      </defs>

                      <rect width="580" height="290" fill="url(#grid-bc)" opacity="0.4" rx="8" />

                      {/* --- 1. WATER SOURCE (Brandhane) on far left --- */}
                      <g transform="translate(18, 175)">
                        <rect x="0" y="8" width="14" height="28" rx="2" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                        <path d="M -4 14 L 0 18 M -4 30 L 0 26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="7" cy="8" r="4" fill="#ef4444" />
                        <text x="7" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">
                          Brandhane
                        </text>
                      </g>

                      {/* --- 2. FEED HOSE (Fødeslange) from Hydrant to Truck (Nr. 4) --- */}
                      <path
                        d="M 32 195 C 45 190, 60 130, 80 120 C 100 110, 115 145, 130 180"
                        fill="none"
                        stroke={highlightedRoleId === 'nr4' ? '#c084fc' : '#64748b'}
                        strokeWidth={highlightedRoleId === 'nr4' ? '4' : '2.5'}
                        strokeDasharray="4 2"
                        className="transition-all duration-300"
                      />

                      {/* Node 4 Label & Interaction */}
                      <g
                        transform="translate(75, 195)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr4' ? null : 'nr4')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr4' ? '15' : '12'}
                          fill={highlightedRoleId === 'nr4' ? '#9333ea' : '#1e1b4b'}
                          stroke={highlightedRoleId === 'nr4' ? '#d8b4fe' : '#a855f7'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                          4.
                        </text>
                        <text x="0" y="24" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Fødeslange (BBB)
                        </text>
                      </g>

                      {/* --- 3. SPRØJTEN (The Fire Truck) --- */}
                      <g transform="translate(130, 110)">
                        {/* Outer Truck outline */}
                        <rect x="0" y="0" width="42" height="90" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        {/* Cab area */}
                        <rect x="0" y="70" width="42" height="20" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                        <text x="21" y="84" fill="#64748b" fontSize="8" textAnchor="middle">
                          Førerhus
                        </text>

                        {/* Pump area */}
                        <circle
                          cx="21"
                          cy="30"
                          r="12"
                          fill="#0f172a"
                          stroke={highlightedRoleId === 'mp' ? '#38bdf8' : '#0284c7'}
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="21"
                          cy="30"
                          r="4"
                          fill={highlightedRoleId === 'mp' ? '#38bdf8' : '#0284c7'}
                        />
                        <text x="21" y="52" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">
                          Sprøjte
                        </text>
                      </g>

                      {/* MP Label & Interaction (Top of truck at pump controls) */}
                      <g
                        transform="translate(151, 90)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'mp' ? null : 'mp')}
                      >
                        <rect
                          x="-18"
                          y="-18"
                          width="36"
                          height="18"
                          rx="4"
                          fill={highlightedRoleId === 'mp' ? '#0284c7' : '#082f49'}
                          stroke={highlightedRoleId === 'mp' ? '#7dd3fc' : '#38bdf8'}
                          strokeWidth="1.5"
                          className="transition-all"
                        />
                        <text x="0" y="-5" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          MP
                        </text>
                        <text x="0" y="-23" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Pumpe
                        </text>
                      </g>

                      {/* --- 4. B-SLANGE (Nr. 3) from Sprøjte to Forgrener --- */}
                      <path
                        d="M 172 115 C 190 95, 205 130, 225 145 C 240 155, 250 145, 265 145"
                        fill="none"
                        stroke={highlightedRoleId === 'nr3' ? '#10b981' : '#94a3b8'}
                        strokeWidth={highlightedRoleId === 'nr3' ? '4.5' : '3.5'}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />

                      {/* Node 3 Label & Interaction */}
                      <g
                        transform="translate(215, 105)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr3' ? null : 'nr3')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr3' ? '14' : '11'}
                          fill={highlightedRoleId === 'nr3' ? '#059669' : '#064e3b'}
                          stroke={highlightedRoleId === 'nr3' ? '#6ee7b7' : '#10b981'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          3.
                        </text>
                        <text x="0" y="-16" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                          B-slange
                        </text>
                      </g>

                      {/* --- 5. FORGRENER & LEDEREN (Dividing Breeching) --- */}
                      <g
                        transform="translate(265, 145)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'leder' ? null : 'leder')}
                      >
                        <path
                          d="M -4 -12 L 14 0 L -4 12 L 0 0 Z"
                          fill={highlightedRoleId === 'leder' ? '#f59e0b' : '#334155'}
                          stroke={highlightedRoleId === 'leder' ? '#fbbf24' : '#94a3b8'}
                          strokeWidth="2"
                          strokeLinejoin="round"
                          className="transition-all"
                        />
                        <circle
                          cx="2"
                          cy="0"
                          r="3"
                          fill={highlightedRoleId === 'leder' ? '#ffffff' : '#64748b'}
                        />
                      </g>

                      {/* Lederen Badge & Interaction */}
                      <g
                        transform="translate(265, 195)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'leder' ? null : 'leder')}
                      >
                        <rect
                          x="-28"
                          y="-12"
                          width="56"
                          height="22"
                          rx="6"
                          fill={highlightedRoleId === 'leder' ? '#d97706' : '#451a03'}
                          stroke={highlightedRoleId === 'leder' ? '#fde68a' : '#f59e0b'}
                          strokeWidth="1.5"
                          className="transition-all"
                        />
                        <text x="0" y="3" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          Lederen
                        </text>
                        <text x="0" y="24" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Forgrener
                        </text>
                      </g>

                      {/* --- 6. UPPER BRANCH: C-SLANGE with serpentine folds (Nr. 2 & Nr. 1) --- */}
                      <path
                        d="M 278 142 C 300 142, 320 150, 335 140 C 350 130, 360 50, 380 45 C 400 40, 410 215, 425 215 C 440 215, 450 60, 465 65 C 480 70, 490 115, 515 115 L 535 115"
                        fill="none"
                        stroke={
                          highlightedRoleId === 'nr1'
                            ? '#f43f5e'
                            : highlightedRoleId === 'nr2'
                            ? '#3b82f6'
                            : '#e2e8f0'
                        }
                        strokeWidth={
                          highlightedRoleId === 'nr1' || highlightedRoleId === 'nr2' ? '4' : '3'
                        }
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />

                      {/* Nozzle / Arrow indicator */}
                      <line
                        x1="535"
                        y1="115"
                        x2="550"
                        y2="115"
                        stroke={highlightedRoleId === 'nr1' ? '#f43f5e' : '#f59e0b'}
                        strokeWidth="3.5"
                        markerEnd="url(#hose-arrow-bc)"
                      />

                      {/* Direction of Attack arrow note */}
                      <text x="540" y="140" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Mod ilden ➔
                      </text>

                      {/* Node 2 Label & Interaction (along C-slange serpentine) */}
                      <g
                        transform="translate(465, 38)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr2' ? null : 'nr2')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr2' ? '14' : '11'}
                          fill={highlightedRoleId === 'nr2' ? '#2563eb' : '#1e3a8a'}
                          stroke={highlightedRoleId === 'nr2' ? '#93c5fd' : '#3b82f6'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          2.
                        </text>
                        <text x="0" y="-16" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">
                          C-slange
                        </text>
                      </g>

                      {/* Node 1 Label & Interaction (at nozzle) */}
                      <g
                        transform="translate(535, 80)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr1' ? null : 'nr1')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr1' ? '14' : '11'}
                          fill={highlightedRoleId === 'nr1' ? '#e11d48' : '#881337'}
                          stroke={highlightedRoleId === 'nr1' ? '#fda4af' : '#f43f5e'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          1.
                        </text>
                        <text x="0" y="-16" fill="#fb7185" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Strålerør (SOS)
                        </text>
                      </g>

                      {/* --- 7. LOWER BRANCH: 2. udløb (Dashed line) --- */}
                      <path
                        d="M 278 150 C 300 170, 305 210, 325 220 C 345 230, 355 255, 375 255 C 395 255, 410 265, 430 265"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="5 3"
                      />
                      <text x="440" y="268" fill="#94a3b8" fontSize="10" fontStyle="italic" textAnchor="start">
                        (evt. 3. og 4. – ved andet udløb)
                      </text>
                    </svg>
                  ) : (
                    /* HT Udlægning SVG */
                    <svg
                      viewBox="0 0 540 260"
                      className="w-full h-auto select-none"
                      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                    >
                      <defs>
                        {/* Grid pattern */}
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                        </pattern>

                        {/* Marker Arrow for Strålerør */}
                        <marker
                          id="hose-arrow"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
                        </marker>
                      </defs>

                      <rect width="540" height="260" fill="url(#grid)" opacity="0.4" rx="8" />

                      {/* --- 1. WATER SOURCE (Brandhane) on far left --- */}
                      <g transform="translate(18, 160)">
                        <rect x="0" y="8" width="14" height="28" rx="2" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                        <path d="M -4 14 L 0 18 M -4 30 L 0 26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="7" cy="8" r="4" fill="#ef4444" />
                        <text x="7" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">
                          Brandhane
                        </text>
                      </g>

                      {/* --- 2. FEED HOSE (Fødeslange) from Hydrant to Truck (Nr. 4) --- */}
                      <path
                        d="M 32 182 C 60 185, 80 170, 95 125 C 110 80, 135 70, 150 95 C 158 108, 160 140, 165 165"
                        fill="none"
                        stroke={highlightedRoleId === 'nr4' ? '#c084fc' : '#64748b'}
                        strokeWidth={highlightedRoleId === 'nr4' ? '4' : '2.5'}
                        strokeDasharray="4 2"
                        className="transition-all duration-300"
                      />

                      {/* Node 4 Label & Interaction */}
                      <g
                        transform="translate(90, 205)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr4' ? null : 'nr4')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr4' ? '15' : '12'}
                          fill={highlightedRoleId === 'nr4' ? '#9333ea' : '#1e1b4b'}
                          stroke={highlightedRoleId === 'nr4' ? '#d8b4fe' : '#a855f7'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text
                          x="0"
                          y="4"
                          fill="#fff"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          4.
                        </text>
                        <text x="0" y="24" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Fødeslange (BBB)
                        </text>
                      </g>

                      {/* --- 3. SPRØJTEN (The Fire Truck) --- */}
                      <g transform="translate(160, 95)">
                        {/* Outer Truck outline */}
                        <rect
                          x="0"
                          y="0"
                          width="42"
                          height="90"
                          rx="6"
                          fill="#1e293b"
                          stroke="#475569"
                          strokeWidth="2"
                        />
                        {/* Cab area */}
                        <rect
                          x="0"
                          y="70"
                          width="42"
                          height="20"
                          rx="4"
                          fill="#0f172a"
                          stroke="#475569"
                          strokeWidth="1.5"
                        />
                        <text x="21" y="84" fill="#64748b" fontSize="8" textAnchor="middle">
                          Førerhus
                        </text>

                        {/* Pump / Hose Reel area in rear */}
                        <circle cx="21" cy="30" r="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                        <circle cx="21" cy="30" r="4" fill="#f59e0b" />
                        <text x="21" y="52" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">
                          Sprøjte
                        </text>
                      </g>

                      {/* MP Label & Interaction (Top of truck at pump controls) */}
                      <g
                        transform="translate(181, 75)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'mp' ? null : 'mp')}
                      >
                        <rect
                          x="-18"
                          y="-18"
                          width="36"
                          height="18"
                          rx="4"
                          fill={highlightedRoleId === 'mp' ? '#0284c7' : '#082f49'}
                          stroke={highlightedRoleId === 'mp' ? '#7dd3fc' : '#38bdf8'}
                          strokeWidth="1.5"
                          className="transition-all"
                        />
                        <text
                          x="0"
                          y="-5"
                          fill="#fff"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          MP
                        </text>
                        <text x="0" y="-23" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Pumpe
                        </text>
                      </g>

                      {/* --- 4. HIGH PRESSURE HOSE (HT-slangen) going out to right --- */}
                      <path
                        d="M 202 100 C 235 102, 275 102, 305 90 C 330 80, 345 110, 360 120 C 375 70, 395 60, 415 130 C 430 180, 450 185, 465 125 C 475 90, 495 90, 515 92"
                        fill="none"
                        stroke={
                          highlightedRoleId === 'nr1' ||
                            highlightedRoleId === 'nr2' ||
                            highlightedRoleId === 'nr3'
                            ? '#f59e0b'
                            : '#e2e8f0'
                        }
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />

                      {/* Nozzle / Arrow indicator on end of hose */}
                      <line
                        x1="515"
                        y1="92"
                        x2="532"
                        y2="92"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        markerEnd="url(#hose-arrow)"
                      />

                      {/* Node 3 Label & Interaction */}
                      <g
                        transform="translate(260, 80)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr3' ? null : 'nr3')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr3' ? '14' : '11'}
                          fill={highlightedRoleId === 'nr3' ? '#059669' : '#064e3b'}
                          stroke={highlightedRoleId === 'nr3' ? '#6ee7b7' : '#10b981'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          3.
                        </text>
                        <text x="0" y="-16" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Hjælper
                        </text>
                      </g>

                      {/* Node 2 Label & Interaction */}
                      <g
                        transform="translate(455, 80)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr2' ? null : 'nr2')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr2' ? '14' : '11'}
                          fill={highlightedRoleId === 'nr2' ? '#2563eb' : '#1e3a8a'}
                          stroke={highlightedRoleId === 'nr2' ? '#93c5fd' : '#3b82f6'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          2.
                        </text>
                        <text x="0" y="-16" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Udlægger
                        </text>
                      </g>

                      {/* Node 1 Label & Interaction */}
                      <g
                        transform="translate(520, 68)"
                        className="cursor-pointer"
                        onClick={() => setHighlightedRoleId(highlightedRoleId === 'nr1' ? null : 'nr1')}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={highlightedRoleId === 'nr1' ? '14' : '11'}
                          fill={highlightedRoleId === 'nr1' ? '#e11d48' : '#881337'}
                          stroke={highlightedRoleId === 'nr1' ? '#fda4af' : '#f43f5e'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          1.
                        </text>
                        <text x="0" y="-16" fill="#fb7185" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Strålerør (SOS)
                        </text>
                      </g>

                      {/* Direction of Attack arrow note */}
                      <text x="515" y="118" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Mod ilden ➔
                      </text>
                    </svg>
                  )}
                </div>

                {/* Quick interactive callout banner when a position is tapped */}
                {highlightedRoleId && (
                  <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs transition-all">
                    {(() => {
                      const role = currentTasks.find((r) => r.roleId === highlightedRoleId)
                      if (!role) return null
                      return (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300">
                              {role.hvem} {role.hvemSub}
                            </span>
                            {role.materiel !== '—' && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded font-semibold">
                                Materiel: {role.materiel}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300">{role.hvad}</p>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Placeholder for other upcoming notes with back button */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{activeNote.title}</h2>
                <p className="text-xs text-amber-300/80 font-medium mt-0.5">{activeNote.subtitle}</p>
              </div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                {activeNote.description}
              </p>
              <div className="p-3 bg-slate-850/80 border border-slate-800 rounded-xl text-xs text-slate-400 max-w-xs mx-auto">
                Denne hurtige note er under forberedelse og tilføjes snart med komplet bemanding, materiel og taktisk skitse.
              </div>
              <button
                onClick={() => setSelectedNoteId(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Tilbage til valgmenu</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
