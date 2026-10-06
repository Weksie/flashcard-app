// Konfiguration for hurtige noter - lettere at vedligeholde og udvide

export interface NoteItem {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  tags: string[]
  isAvailable: boolean
  iconName: string // Referencer til ikon-navne i lucide-react
}

export const AVAILABLE_NOTES: NoteItem[] = [
  {
    id: 'ht-udlaegning',
    title: 'HT udlægning',
    subtitle: 'Højtryksslangen ud fra sprøjten',
    category: 'Slangeudlægning',
    description: 'Hurtig indsats med højtryksslangen. Komplet bemanding for alle 6 mand (Leder, 1.-4.er, MP), interaktiv taktisk skitse og materielkrav (SOS & BBB).',
    tags: ['Standardprocedure', '6 roller', 'SOS & BBB', 'Taktisk skitse'],
    isAvailable: true,
    iconName: 'Truck',
  },
  {
    id: 'bc-udlaegning',
    title: 'B/C udlægning',
    subtitle: 'B- og C-slangen ud fra sprøjten',
    category: 'Slangeudlægning',
    description: 'Standard slangeudlægning ved bygningsbrande. B-slange til forgrener, C-slange til angreb, bemanding for alle 6 mand og taktisk skitse med evt. 2. udløb.',
    tags: ['Bygningsbrand', 'Forgrener', 'B & C-slange', 'Taktisk skitse'],
    isAvailable: true,
    iconName: 'Flame',
  },
  {
    id: 'trykluftapparat',
    title: 'Trykluftapparat',
    subtitle: 'Rygmejse, flaske, maske & lungeautomat',
    category: 'Materiel',
    description: 'Komplet oversigt over trykluftapparatets dele: rygmejse med reduktionsventil, 300 bar flasker (komposit/stål), maske med overtryk og lungeautomat.',
    tags: ['Rygmejse', 'Maske', 'Flaske', 'Lungeautomat'],
    isAvailable: true,
    iconName: 'Wind',
  },
  {
    id: 'kontrol-trykluft',
    title: 'Kontrol af trykluft',
    subtitle: 'De 5 kontroller efter brug / flaskeskift',
    category: 'Materiel',
    description: 'Kontrolprocedure for trykluftapparatet: visuel kontrol, indholdskontrol, tæthedskontrol, fløjtekontrol og funktionskontrol.',
    tags: ['5 kontroller', 'Tæthed', 'Fløjte', 'Manometer'],
    isAvailable: true,
    iconName: 'ClipboardCheck',
  },
  {
    id: 'brandforloeb',
    title: 'Brandforløb',
    subtitle: 'Faserne i en rumbrand',
    category: 'Brandteori',
    description: 'Rumbrandens udvikling fra initialbrand til afkøling. Inkluderer overtændingsfasen, fuldt udviklet rumbrand samt særlige fænomener: Backdraft og Røggaseksplosion.',
    tags: ['Rumbrand', 'Overtændingsfase', 'Backdraft', 'Røggaseksplosion'],
    isAvailable: true,
    iconName: 'Thermometer',
  },
  {
    id: 'passive-aktive-anlaeg',
    title: 'Passive & Aktive Anlæg',
    subtitle: 'Brandsikringsanlæg i bygninger',
    category: 'Brandsikring',
    description: 'Oversigt over passive brandsikring (brandsektioner, brandceller, branddøre) og aktive brandsikringsanlæg (ABA, sprinkler, røgudluftning, rumslukningsanlæg).',
    tags: ['ABA-anlæg', 'Sprinkler', 'Brandsektioner', 'Røgudluftning', 'Brandcentral'],
    isAvailable: true,
    iconName: 'Shield',
  },
  {
    id: 'brandventilation',
    title: 'Brandventilation',
    subtitle: 'Taktisk ventilation & overtryk (PPV)',
    category: 'Brandteori',
    description: 'Systematisk fjernelse af varme og røggasser. Gennemgang af naturlig vs. mekanisk ventilation (PPV), kontrolleret offensiv indsats, serie/parallel, kegle- vs. ejektorprincip og de 7 gyldne regler.',
    tags: ['Overtryksventilation', 'PPV', 'Kontrolleret offensiv', 'Ventilatortyper', '7 gyldne regler'],
    isAvailable: true,
    iconName: 'Fan',
  },
  {
    id: 'cafs',
    title: 'Slukning med CAFS',
    subtitle: 'Compressed Air Foam System (Trykluftskum)',
    category: 'Brandteori',
    description: 'Hurtig guide til CAFS: Våd- vs. tør-CAFS, AWG-rør med forsatser og spyd, modtryk ved åbning (2 mand), de 4 indsatstyper (Knock Down, begrænsning, konstruktionsbrand, væskebrand) og forbuddet mod røgdykning.',
    tags: ['Trykluftskum', 'Våd-CAFS', 'Tør-CAFS', 'Knock Down', 'Spyd'],
    isAvailable: true,
    iconName: 'Droplets',
  },
  {
    id: 'bess',
    title: 'Brand i BESS-anlæg',
    subtitle: 'Battery Energy Storage Systems (Litiumion)',
    category: 'Brandteori',
    description: 'Kompakt guide til BESS: De 3 hovedfarer (elektrisk stød, afgasning/eksplosion i lukkede rum, thermal runaway), B-E-S-S huskereglen, risikoniveauer 1-4 og sikkerhedsafstande.',
    tags: ['BESS', 'Litiumion', 'Thermal Runaway', 'B-E-S-S', 'Eksplosionsfare'],
    isAvailable: true,
    iconName: 'BatteryCharging',
  },
  {
    id: 'skum-udlaegning',
    title: 'Skumudlægning',
    subtitle: 'Fra sprøjten skumslangen ud',
    category: 'Slangeudlægning',
    description: 'Standardprocedure ved væskebrande og skumindsatser. Z-tilblander med ejektorprincip, skumvæskeforsyning, komplet bemanding for alle 6 mand og taktisk skitse.',
    tags: ['Skumrør', 'Z-tilblander', 'Skumvæske', 'Væskebrand', 'Taktisk skitse'],
    isAvailable: true,
    iconName: 'Droplets',
  },
  {
    id: 'stigroer-udlaegning',
    title: 'Stigrørsudlægning',
    subtitle: 'Fra stigrøret C-slangen ud',
    category: 'Slangeudlægning',
    description: 'Standardprocedure ved brand i etagebyggeri med tørt stigrør. Dobbelt B-fødelinje, signalsystem, sikring af ventiler og komplet bemanding for alle 6 mand.',
    tags: ['Tørt stigrør', '2x B-fødelinje', 'Dobbelt indløb', 'Højhustaktik', 'Ventilkontrol'],
    isAvailable: true,
    iconName: 'Building2',
  },
]




// Kategorier for gruppering i UI
export const NOTE_CATEGORIES = Array.from(
  new Set(AVAILABLE_NOTES.map(n => n.category))
).sort()

// Filtrerede tilgængelige noter
export const getAvailableNotes = () => AVAILABLE_NOTES.filter(n => n.isAvailable)

// Find note by ID
export const getNoteById = (id: string) => AVAILABLE_NOTES.find(n => n.id === id)