// Konfiguration for rolleopgaver - lettere at vedligeholde og udvide

export interface MaterielItem {
  letter: string
  text: string
}

export interface RoleTask {
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

export const HT_TASKS: RoleTask[] = [
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

export const BC_TASKS: RoleTask[] = [
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
    materielItems: [
      { letter: 'B', text: 'B-slange (forgreningslange)' },
      { letter: 'B', text: 'B-slange (fødeslange)' },
    ],
    hvad: 'Udlægger B-slange fra sprøjte til forgrener, hjælper derefter nr. 4.',
    detail: 'Udlægger B-slangen fra sprøjtens B-afgang til forgreneren og bistår derefter nr. 4 med fødeslange.',
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

// Map for nem adgang
export const ROLE_TASK_MAP = {
  'ht-udlaegning': HT_TASKS,
  'bc-udlaegning': BC_TASKS,
} as const

export type NoteIdWithTasks = keyof typeof ROLE_TASK_MAP

export const getTasksForNote = (noteId: string): RoleTask[] => {
  return ROLE_TASK_MAP[noteId as NoteIdWithTasks] || HT_TASKS
}