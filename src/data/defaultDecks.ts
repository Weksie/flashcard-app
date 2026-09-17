import type { Deck, Flashcard } from '../types'

// All 111 questions from Beredskabsstyrelsen - Funktionsuddannelse Indsats (Mulige C-spørgsmål)
export const ALL_QUESTIONS: Flashcard[] = [
  // --- Brandkemi & Brandventilation (1-19) ---
  {
    id: 'bk-1',
    category: 'Brandkemi',
    question: 'Hvad kræves for at en forbrænding kan foregå?',
    answer: 'Et brændbart stof, ilt og tilstrækkelig høj temperatur',
  },
  {
    id: 'bk-2',
    category: 'Brandkemi',
    question: 'Hvad er en ufuldstændig forbrænding og hvad dannes primært?',
    answer: 'En forbrænding hvor der ikke er nok ilt og der dannes primært CO (carbonmonooxid)',
  },
  {
    id: 'bk-3',
    category: 'Brandkemi',
    question: 'Hvad forstås ved overtændingsfasen?',
    answer: 'Overtændingen er den hurtige overgangsfase fra det tidlige brandforløb til den fuldt udviklede rumbrand',
  },
  {
    id: 'bk-4',
    category: 'Brandkemi',
    question: 'Hvad kan der ske hvis der tilføres luft til en ventilationsstyret brand?',
    answer: 'Branden vil tiltage i intensitet',
  },
  {
    id: 'bk-5',
    category: 'Brandkemi',
    question: 'Hvilken risiko kan der være forbundet med at tilføre luft til en kraftig underventileret brand?',
    answer: 'Der vil kunne ske en MEGET hurtig antændelse af røggasser, eller en backdraft',
  },
  {
    id: 'bk-6',
    category: 'Brandkemi',
    question: 'Nævn to faremomenter i forbindelse med ufuldstændig forbrænding',
    answer: 'Ved tilførsel af ilt kan der forekomme overtænding og Kulilte er giftigt',
  },
  {
    id: 'bk-7',
    category: 'Brandkemi',
    question: 'Hvad er antændelsesområdet?',
    answer: 'Der hvor blandingen mellem ilt og gas er brændbar (forblandede røggasser forekommer oftest ved røggaseksplosioner, og kun MEGET sjældent ved en rumbrand)',
  },
  {
    id: 'bk-8',
    category: 'Brandkemi',
    question: 'Nævn en typisk rumbrands faser',
    answer: '1. Det tidlige brandforløb\n2. Overtændingsfasen\n3. Den fuldt udviklede rumbrand\n4. Afkølingsfasen',
  },
  {
    id: 'bk-9',
    category: 'Brandkemi',
    question: 'Hvad er de typiske tegn på en fuldt udviklet rumbrand?',
    answer: 'Alle flader i brandrummet brænder, og flammer står typisk ud af vinduerne',
  },
  {
    id: 'bv-10',
    category: 'Brandventilation',
    question: 'Hvor kan der opstå fare for en røggaseksplosion i forbindelse med en rumbrand?',
    answer: 'En røggaseksplosion opstår typisk i tilstødende rum, hulrum mv., og ikke i selve brandrummet',
  },
  {
    id: 'bv-11',
    category: 'Brandventilation',
    question: 'Hvad er formålet med brandventilation?',
    answer: '• Forhindre røggaseksplosion\n• Fjerne røgfaren for evt. indespærrede\n• Øge sigtbarheden og lette indtrængningen for røgdykkeren\n• Begrænse brandens udbredelse\n• Mindske korrosion\n• Forbedre arbejdsmiljøet for røgdykkerne',
  },
  {
    id: 'bv-12',
    category: 'Brandventilation',
    question: 'Nævn hovedgrupperne som brandventilation opdeles i',
    answer: 'Naturlig- og mekanisk brandventilation',
  },
  {
    id: 'bv-13',
    category: 'Brandventilation',
    question: 'Hvad forstås ved termisk ventilation af en brand?',
    answer: 'Termisk ventilation udnytter at røggasserne er varme og at der er overtryk øverst i bygningen ved at der ventileres så højt op over branden som muligt',
  },
  {
    id: 'bv-14',
    category: 'Brandventilation',
    question: 'Beskriv ventilationsmetoder',
    answer: '• Offensiv\n• Kontrolleret offensiv\n• Defensiv\n• Sektionsvis',
  },
  {
    id: 'bv-15',
    category: 'Brandventilation',
    question: 'Beskriv opstilling af overtryksventilator',
    answer: '• Afstand fra tilluftsåbningen\n• Serie-opstilling\n• Parallel-opstilling\n• Delt dør',
  },
  {
    id: 'bv-16',
    category: 'Brandventilation',
    question: 'Nævn de personlige værnemidler ved brug af overtryksventilation?',
    answer: 'Sikkerhedsbriller og høreværn',
  },
  {
    id: 'bv-17',
    category: 'Brandventilation',
    question: 'Hvad forstås ved mekanisk brandventilation?',
    answer: 'Ventilation med overtryksventilator, strålerør eller røgsuger',
  },
  {
    id: 'bv-18',
    category: 'Brandventilation',
    question: 'I hvilken rækkefølge skal tillufts- og fraluftshul som udgangspunkt etableres i forbindelse med overtryksventilation af en brand?',
    answer: 'Fraluftshul, derefter tilluftshul',
  },
  {
    id: 'bv-19',
    category: 'Brandventilation',
    question: 'Hvilke uhensigtsmæssigheder skal røgdykkeren være opmærksom på ved overtryksventilering af en brand?',
    answer: 'Der kan ske en opblusning af branden og dermed en større brandspredning',
  },

  // --- Slukningsteori og -midler (20-33) ---
  {
    id: 'st-20',
    category: 'Slukningsteori',
    question: 'Hvilke hovedgrupper opdeles slukningsmidler i?',
    answer: 'Kølende og kvælende',
  },
  {
    id: 'st-21',
    category: 'Slukningsteori',
    question: 'Hvilken slukningsvirkning udnyttes ved direkte slukning med vand?',
    answer: 'Kølende',
  },
  {
    id: 'st-22',
    category: 'Slukningsteori',
    question: 'Hvilken slukningsteknik anvendes ved risiko for antændelse af røggasser?',
    answer: 'Køling af røggasser ved pensling ved omgivelser i brandrummet',
  },
  {
    id: 'st-23',
    category: 'Slukningsteori',
    question: 'Hvornår anvendes Rainbow?',
    answer: 'For at stoppe afgasning fra overflader',
  },
  {
    id: 'st-24',
    category: 'Slukningsteori',
    question: 'Hvordan udføres indirekte slukning?',
    answer: 'Man slukker med spredt stråle/tågestråle på det varmeste sted i lokalet i nogle sekunder, i et delvis lukket rum.',
  },
  {
    id: 'st-25',
    category: 'Slukningsteori',
    question: 'Nævn de 2 typer af tågesøm',
    answer: 'Defense og Attack',
  },
  {
    id: 'st-26',
    category: 'Slukningsteori',
    question: 'Nævn minimum fire fordele ved at anvende vand som slukningsmiddel',
    answer: 'Stor kølende virkning, forekommer mange steder, stor kastelængde og spredning, kan transporteres over store afstande, ugiftig og kemisk neutral, vandets damp har kølende effekt, billigt',
  },
  {
    id: 'st-27',
    category: 'Slukningsteori',
    question: 'Nævn de personlige værnemidler ved brug af skæreslukker',
    answer: '- Brandhandsker\n- Sikkerhedsbriller/visir\n- Filtermaske eller fuld åndedrætsbeskyttelse\n- Evt. ørepropper eller lign. hvis producenten af skæreslukker anbefaler dette',
  },
  {
    id: 'st-28',
    category: 'Slukningsteori',
    question: 'Nævn minimum fire ulemper ved at anvende vand som slukningsmiddel',
    answer: 'Fryser ved 0°C, vandskade især i etagebyggeri, korrosionsskade, vandets vægt ved slukning af skibsbrand, elektrisk ledende, vandets damp kan skade mandskab og evt. indespærrede',
  },
  {
    id: 'st-29',
    category: 'Slukningsteori',
    question: 'Nævn 2 former for CAFS',
    answer: 'Våd CAFS og Tør CAFS',
  },
  {
    id: 'st-30',
    category: 'Slukningsteori',
    question: 'Hvad hedder de 4 forskellige slukningsteknikker?',
    answer: 'Direkte slukning - indirekte slukning – køling af røggasser - pensling',
  },
  {
    id: 'st-31',
    category: 'Slukningsteori',
    question: 'Hvad betyder A, B, C, D, E og F mærkningen på en håndslukker?',
    answer: 'A. Faste stoffer\nB. Væsker\nC. Gasser\nD. Letmetaller\nE. Elektriske installationer\nF. Fedtbrande',
  },
  {
    id: 'st-32',
    category: 'Slukningsteori',
    question: 'Hvilken slukningsvirkning udnyttes primært ved brug af en pulverslukker?',
    answer: 'Antikatalytisk effekt (accepteres også at det er kvælende effekt)',
  },
  {
    id: 'st-33',
    category: 'Slukningsteori',
    question: 'Nævn to fordele ved brug af en CO2 slukker',
    answer: 'Stor kvælende virkning og efterlader ingen skadelige spor efter slukning',
  },

  // --- Bygningskonstruktioner (34-38) ---
  {
    id: 'byg-34',
    category: 'Bygningskonstruktioner',
    question: 'Nævn minimum to ulemper ved jern som bygningsmateriale under brand',
    answer: 'Udvides ved opvarmning – styrken reduceres ved opvarmning – stor varmeledningsevne',
  },
  {
    id: 'byg-35',
    category: 'Bygningskonstruktioner',
    question: 'Nævn to egenskaber ved træ som bygningsmateriale ved brand',
    answer: 'Det er brændbart med lav antændelsestemperatur – Hurtig brandudbredelse – Indbrændingshastigheden er konstant – Træ svækkes direkte i forhold til indbrændingen',
  },
  {
    id: 'byg-36',
    category: 'Bygningskonstruktioner',
    question: 'Nævn to ulemper ved beton som bygningsmateriale ved brand',
    answer: 'Forskydning af betonelementer – afskalling af dæklag på jernbeton',
  },
  {
    id: 'byg-37',
    category: 'Bygningskonstruktioner',
    question: 'Nævn forskellen mellem konstruktionsbrand og rumbrand?',
    answer: '- Rumbrand er brand i inventar og beklædning\n- Konstruktionsbrand er brand i hulrum i bygningskonstruktionen',
  },
  {
    id: 'byg-38',
    category: 'Bygningskonstruktioner',
    question: 'Hvad er de 5 sikre tegn på sammenstyrtningsfare?',
    answer: '1. Stærk bortbrænding af træværk\n2. Udvidelse af ståldele\n3. Revner i mure\n4. Afskalning af dæklag på jernbeton\n5. Forskydning af jernbetonelementer',
  },

  // --- CBRN og akutte uheld med farlige stoffer (39-47) ---
  {
    id: 'cbrn-39',
    category: 'CBRN & Farlige Stoffer',
    question: 'Nævn minimum fire måder et stof kan være farligt på?',
    answer: 'Ætsende – giftigt – brandfarligt – eksplosionsfarligt - radioaktivt',
  },
  {
    id: 'cbrn-40',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvorfor skal miljømateriel være gnistfri?',
    answer: 'Der skal kunne arbejdes med materiellet i eksplosionsfarlige miljøer.',
  },
  {
    id: 'cbrn-41',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvad fortæller fareskiltets/-tavlens øverste felt?',
    answer: 'Stoffets farenummer eller stoffets farlige egenskaber',
  },
  {
    id: 'cbrn-42',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvad fortæller fareskiltets/-tavlens nederste felt?',
    answer: 'Et stofs firecifrede identifikations-nummer (FN/UN-nummer)',
  },
  {
    id: 'cbrn-43',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvad betyder bogstavet ”X” foran et farenummer?',
    answer: 'Stoffet reagerer farligt, hvis det kommer i kontakt med vand.',
  },
  {
    id: 'cbrn-44',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvor kan kemikaliedykkeren forvente at finde transportdokumenter?',
    answer: 'I førerkabinen på køretøjet',
  },
  {
    id: 'cbrn-45',
    category: 'CBRN & Farlige Stoffer',
    question: 'Nævn minimum to forhold der gør, at en person i kemikalieindsatsdragt har mindre indsatstid end en røgdykker',
    answer: 'Arbejdet i dragten føles hårdere - der anvendes luft til kemikalieindsatsdragten afhængig af dragttype - der skal være tid til tilbagetrækning til rensepunkt og rensning',
  },
  {
    id: 'cbrn-46',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvad er en kemikalieindsatsdragt?',
    answer: 'En gastæt totalbeskyttelsesdragt lavet af gummi, anvendelig med røgdykkerapparat og overtryk i dragten, anvendelig i sundhedsskadelige miljøer',
  },
  {
    id: 'cbrn-47',
    category: 'CBRN & Farlige Stoffer',
    question: 'Hvor opstilles personelrensepunkt?',
    answer: 'På kanten af området for direkte kontakt',
  },

  // --- Redningsrelaterede emner (48-64) ---
  {
    id: 'red-48',
    category: 'Redningsrelateret',
    question: 'Hvad er formålet med redningstjenestens 5 stadier?',
    answer: 'At redde flest mulige mennesker på kortest mulig tid',
  },
  {
    id: 'red-49',
    category: 'Redningsrelateret',
    question: 'I hvilke situationer anvendes redningstjenestens 5 stadier?',
    answer: 'Ved større ulykker med mange tilskadekomne',
  },
  {
    id: 'red-50',
    category: 'Redningsrelateret',
    question: 'Hvordan udformes gennembrydningshullet ved murgennembrydning i en bærende mur?',
    answer: 'Trekantet med hullet størst for neden',
  },
  {
    id: 'red-51',
    category: 'Redningsrelateret',
    question: 'I hvilke situationer anvendes en søjleafstivning?',
    answer: 'Hvor en etage truer med at styrte sammen',
  },
  {
    id: 'red-52',
    category: 'Redningsrelateret',
    question: 'Hvad er de tre anvendelsesmuligheder for håndbårne stiger?',
    answer: 'Adgangsstiger – arbejdsstiger – redningsstiger',
  },
  {
    id: 'red-53',
    category: 'Redningsrelateret',
    question: 'Hvilket arbejde foretages i redningstjenestens 1. stadie?',
    answer: 'Opsamling af frit tilgængelige tilskadekomne samtidig med en rekognoscering for skadens art og omfang',
  },
  {
    id: 'red-54',
    category: 'Redningsrelateret',
    question: 'Hvilket arbejde foretages i redningstjenestens 2. stadie?',
    answer: 'Befrielse af let tilgængelige',
  },
  {
    id: 'red-55',
    category: 'Redningsrelateret',
    question: 'Hvilket arbejde foretages i redningstjenestens 3. stadie?',
    answer: 'Befrielse af svært tilgængelige',
  },
  {
    id: 'red-56',
    category: 'Redningsrelateret',
    question: 'Hvilket arbejde foretages i redningstjenestens 4. stadie?',
    answer: 'Eftersøgning af savnede personer',
  },
  {
    id: 'red-57',
    category: 'Redningsrelateret',
    question: 'Hvilket arbejde foretages i redningstjenestens 5. stadie?',
    answer: 'Afsøgning af hele skadestedet',
  },
  {
    id: 'red-58',
    category: 'Redningsrelateret',
    question: 'Nævn principperne for opklodsning ved løft af byrder',
    answer: 'Der opklodses så stabilt som muligt, og der opklodses for hver 10 centimeter',
  },
  {
    id: 'red-59',
    category: 'Redningsrelateret',
    question: 'Hvornår skal der bruges falddæmper?',
    answer: 'Falddæmperen bruges til faldsikringsudstyret ved fare hvor man kan bringes til fald',
  },
  {
    id: 'red-60',
    category: 'Redningsrelateret',
    question: 'Hvornår skal der benyttes faldsikring?',
    answer: 'Der skal altid benyttes egnet faldsikringsudstyr hvor der kan være fare for et fald, hvis arbejde i højden ikke kan planlægges på anden måde',
  },
  {
    id: 'red-61',
    category: 'Redningsrelateret',
    question: 'Hvorfor kan der ikke benyttes Y-falddæmper under en højde på 6,75m og hvad skal bruges i stedet?',
    answer: 'Fordi du rammer jorden, da minimumsfrihøjden er lig med linelængde + falddæmper udfoldelse + sikkerhedsbuffer. Der bruges faldblok i stedet.',
  },
  {
    id: 'red-62',
    category: 'Redningsrelateret',
    question: 'Hvilket personligt sikkerhedsudstyr skal bæres ved brug af kædesav?',
    answer: 'Skærebukser – skærestøvler – ansigtsskærm – høreværn – hjelm – arbejdshandsker',
  },
  {
    id: 'red-63',
    category: 'Redningsrelateret',
    question: 'Hvilket personligt sikkerhedsudstyr skal bæres ved anvendelse af skæreskive?',
    answer: 'Indsatsdragt, beskyttelsesbriller, handsker og høreværn. Støvmaske anvendes tillige ved skæring i beton og murværk (og trykluftsapparat ved skæring i aluminium og ved anvendelse i lukkede rum)',
  },
  {
    id: 'red-64',
    category: 'Redningsrelateret',
    question: 'Hvilket materiel kan anvendes til løft af tunge og mindre tunge byrder?',
    answer: 'Manuelle-, mekaniske- og hydrauliske løfteværktøjer',
  },

  // --- Brandmateriel (65-71) ---
  {
    id: 'mat-65',
    category: 'Brandmateriel',
    question: 'Hvad er vandføringen ved et tryktab på 1mvs. i A-, B- og C-slanger?',
    answer: 'A-slanger: 1200 l/min\nB-slanger: 600 l/min\nC-slanger: 200 l/min',
  },
  {
    id: 'mat-66',
    category: 'Brandmateriel',
    question: 'Hvad hedder det armatur man bruger i forbindelse med udlægning til stigrør?',
    answer: 'Stigrørsstykke',
  },
  {
    id: 'mat-67',
    category: 'Brandmateriel',
    question: 'Hvilket udstyr skal der bruges til at lave et skumangreb?',
    answer: 'Slanger, tilblander, sugeslange til tilblander, skumrør',
  },
  {
    id: 'mat-68',
    category: 'Brandmateriel',
    question: 'Hvad består en angrebspakning af?',
    answer: '30m C-slange, strålerør, bespændinger for pakningen.',
  },
  {
    id: 'mat-69',
    category: 'Brandmateriel',
    question: 'Nævn fire kvælende slukningsmidler',
    answer: 'Pulverslukker, CO2 slukker, skum og brandtæppe',
  },
  {
    id: 'mat-70',
    category: 'Brandmateriel',
    question: 'Hvad er slukningsmidlet i CAFS?',
    answer: 'Vand, Skum, Tryk',
  },
  {
    id: 'mat-71',
    category: 'Brandmateriel',
    question: 'Hvad består en skæreslukker af?',
    answer: 'Højtrykspumpe, højtrykslange, skærelance, skæremiddel (abrasiv)',
  },

  // --- Brandmandens (røgdykkerens) arbejde & Sikkerhed (72-101) ---
  {
    id: 'rd-72',
    category: 'Brandmandens Arbejde',
    question: 'Hvordan kan brandmanden under indsats reducere risikoen for dehydrering og varmekollaps?',
    answer: 'Tilføre luft til huden ved at lukke dragten op, når det er sikkerhedsmæssigt forsvarligt – drikke væske mellem røg- og kemikaliedykningerne (minimum 1/2 l) – holde pause mellem røg- og kemikaliedykningerne (minimum 1/2 t)',
  },
  {
    id: 'rd-73',
    category: 'Brandmandens Arbejde',
    question: 'Hvad er røgdykkerens personlige beskyttelsesudstyr?',
    answer: 'Indsatsdragt – indsatshjelm – røgdykkerhætte – indsatsstøvler – beskyttelseshandsker – røgdykkerapparat - underbeklædning (efter producentens anvisninger)',
  },
  {
    id: 'rd-74',
    category: 'Brandmandens Arbejde',
    question: 'Nævn to ting som forårsager at et røgdykkerhold øjeblikkeligt skal søge ud af bygningen',
    answer: 'Ved ordre udefra – ved tegn på sammenstyrtningsfare – når fløjten på røgdykkerapparatet lyder',
  },
  {
    id: 'rd-75',
    category: 'Brandmandens Arbejde',
    question: 'Hvad foretager 2’eren sig ved en stigrørsudlægning?',
    answer: 'Sikrer stigrørsventil er lukket - udlægger slange fra stigrørsventil til angrebssted - hjælper 1’eren med angrebsslangens fremføring og betjening.',
  },
  {
    id: 'rd-76',
    category: 'Brandmandens Arbejde',
    question: 'Hvad foretager 3’eren sig ved en stigrørsudlægning?',
    answer: 'Udlægger B-slange fra pumpe til stigrør (højre indløb) - fra stigrør (venstre indløb) til pumpe - sikrer, at ikke anvendte stigrørsventiler er lukkede - melder sig hos lederen',
  },
  {
    id: 'rd-77',
    category: 'Brandmandens Arbejde',
    question: 'Hvad foretager 3’eren sig ved en skumudlægning?',
    answer: 'Udlægger slange(r) fra pumpe til tilblander, påsætter skumvæskeslange og betjener tilblanderen.',
  },
  {
    id: 'rd-78',
    category: 'Brandmandens Arbejde',
    question: 'Hvad foretager 4’eren sig ved en B/C udlægning med et enkelt C-rør?',
    answer: 'Fremtager ”BBB” udstyret (brandhanestykke, brandhanenøgle og B-slange), udlægger B-slange og betjener brandhanen. Derefter melder han sig ved pumpen.',
  },
  {
    id: 'rd-79',
    category: 'Brandmandens Arbejde',
    question: 'Hvordan kan brandmanden løbende forberede sig på røgdykning og dermed reducere risikoen for dehydrering og varmekollaps?',
    answer: 'Holde sig i god fysisk form – ikke være overvægtig – opretholde væskebalance i det daglige – drikke væske på vej ud til indsatsen',
  },
  {
    id: 'rd-80',
    category: 'Brandmandens Arbejde',
    question: 'Hvad forstås ved klasse 1 personer i forbindelse med redningsarbejdet på brandstedet?',
    answer: 'Personer, der er direkte truet af flammer eller røg, og som ikke selv kan forlade deres opholdssted. De skal øjeblikkeligt REDDES',
  },
  {
    id: 'rd-81',
    category: 'Brandmandens Arbejde',
    question: 'Hvad forstås ved klasse 2 personer i forbindelse med redningsarbejdet på brandstedet?',
    answer: 'Personer, der ved en udbredelse af branden kan blive truet af flammer eller røg, men som på nuværende tidspunkt kan bringe sig selv i sikkerhed. De skal snarest muligt EVAKUERES',
  },
  {
    id: 'rd-82',
    category: 'Brandmandens Arbejde',
    question: 'Hvad forstås ved klasse 3 personer i forbindelse med redningsarbejdet på brandstedet?',
    answer: 'Personer, der ikke og som ikke vil blive truet af flammer eller røg, men som på anden måde kan blive berørt af branden. De skal INFORMERES',
  },
  {
    id: 'rd-83',
    category: 'Brandmandens Arbejde',
    question: 'Hvad er formålet med sporbevaring på brandstedet?',
    answer: 'At sikre mindst mulig forstyrrelse af brandstedet i forhold til brandefterforskningen',
  },
  {
    id: 'rd-84',
    category: 'Brandmandens Arbejde',
    question: 'Hvornår bør røgdykkeren tilslutte luft på sin maske før røgdykkerindsats?',
    answer: 'Så sent som muligt',
  },
  {
    id: 'rd-85',
    category: 'Brandmandens Arbejde',
    question: 'Hvad forstås ved varmeledning?',
    answer: 'Det er når varmen spreder sig gennem varmeledende stoffer som fx jern',
  },
  {
    id: 'rd-86',
    category: 'Brandmandens Arbejde',
    question: 'Hvad forstås ved varmestråling?',
    answer: 'Det er når varmen spreder sig gennem luften som lyset ville gøre det',
  },
  {
    id: 'rd-87',
    category: 'Brandmandens Arbejde',
    question: 'Hvad forstås ved varmestrømning?',
    answer: 'Det er når varmen spreder sig gennem luften særligt pga. at varm luft stiger',
  },
  {
    id: 'rd-88',
    category: 'Brandmandens Arbejde',
    question: 'Hvor er det farligt at opholde sig ved brand i en ståltankvogn?',
    answer: 'Ud for tankens ender',
  },
  {
    id: 'rd-89',
    category: 'Brandmandens Arbejde',
    question: 'Hvornår skal en stige topsikres?',
    answer: 'Når stigen benyttes som arbejdsstige-/platform',
  },
  {
    id: 'rd-90',
    category: 'Brandmandens Arbejde',
    question: 'Nævn 4 advarselssignaler på varmeophobning hos røgdykkeren',
    answer: 'Træthed – svimmelhed – hovedpine – kvalme – manglende koncentrationsevne – sløvhed – virker uklar – døsig',
  },
  {
    id: 'rd-91',
    category: 'Brandmandens Arbejde',
    question: 'Hvad er indsatsen over for trykflasker med oxiderende, brandfarlige eller giftige gasser?',
    answer: 'Køle – lukke – fjerne',
  },
  {
    id: 'rd-92',
    category: 'Brandmandens Arbejde',
    question: 'Nævn 4 særlige farer, der kan optræde på indsatsstedet?',
    answer: 'Bygningskonstruktioners forhold under brand – trykflasker – radioaktivitet - elektricitet - farlige stoffer',
  },
  {
    id: 'rd-93',
    category: 'Brandmandens Arbejde',
    question: 'Nævn 5 iagttagelser som redningsmandskabet bør være opmærksomme på under slukningsarbejde af hensyn til sporbevaring?',
    answer: 'Prioritering af slukningsarbejdet – indtrængen på brandstedet – unaturlig brandspredning – lugte – flere arnesteder – brandens laveste punkt – møbler og anden inventars placering – elektriske installationer – forbrugsapparater – indebrændte personer',
  },
  {
    id: 'rd-94',
    category: 'Brandmandens Arbejde',
    question: 'Hvad er indsatsen over for trykflasker med inaktive gasser?',
    answer: 'Køle – fjerne',
  },
  {
    id: 'rd-95',
    category: 'Brandmandens Arbejde',
    question: 'Hvad gør indsatsen ved skibsbrande vanskelig?',
    answer: '• Vanskelige adgangsforhold\n• Manglende ventilationsforhold\n• Materialernes varmeledningsevne\n• Slukningens indflydelse på skibets stabilitet',
  },
  {
    id: 'rd-96',
    category: 'Brandmandens Arbejde',
    question: 'Hvilke kontroller skal en røgdykker foretage i forbindelse med klargøring af et trykluftsapparat?',
    answer: 'Visuel kontrol – indholdskontrol – tæthedskontrol – kontrol af tilbagetrækningssignal (advarselsfløjte)',
  },
  {
    id: 'rd-97',
    category: 'Brandmandens Arbejde',
    question: 'Hvordan sikrer du at røgdykkermasken er tæt?',
    answer: '• At maskestropperne er spændt korrekt\n• At læberne på masken har direkte kontakt til huden og ikke hår og skæg eller røgdykkerhætte',
  },
  {
    id: 'rd-98',
    category: 'Brandmandens Arbejde',
    question: 'Hvordan kan brandmanden efter indsats reducere risikoen for dehydrering og varmekollaps?',
    answer: 'Tilføre luft til huden ved at lukke dragten op - drikke væske (to l med 0,6 l pr. time)',
  },
  {
    id: 'rd-99',
    category: 'Brandmandens Arbejde',
    question: 'Hvad er indsatsen over for trykflaske med acetylen?',
    answer: 'Køle – lukke – fjerne – tømme. Kontrol af flaskens temperatur gennemføres i forbindelse med nævnte faser',
  },
  {
    id: 'rd-100',
    category: 'Brandmandens Arbejde',
    question: 'Hvad er minimumsafstanden med samlet stråle og tågestråle, når der undtagelsesvis sprøjtes på højspændingsledninger?',
    answer: '15 m med samlet stråle og 4 – 5 m med vandtåge',
  },
  {
    id: 'rd-101',
    category: 'Brandmandens Arbejde',
    question: 'Trykflasker inddeles farvemæssigt i fire hovedgrupper efter gasindholdet, nævn farver og tilhørende gruppe?',
    answer: 'Grøn = inaktiv\nBlå = oxiderende\nRød = brandfarlig\nGul = giftig',
  },

  // --- SINE & Radiokommunikation (102-106) ---
  {
    id: 'sine-102',
    category: 'SINE & Ledelse',
    question: 'Hvilken farve har en acetylenflaske?',
    answer: 'Rødbrun krop og skuldre',
  },
  {
    id: 'sine-103',
    category: 'SINE & Ledelse',
    question: 'Hvem varetager den tekniske og koordinerende ledelse på skadestedet?',
    answer: 'Teknisk ledelse: Redningsberedskabets indsatsleder\nKoordinerende ledelse: Politiets indsatsleder',
  },
  {
    id: 'sine-104',
    category: 'SINE & Ledelse',
    question: 'Hvad består startende opkald SINE af?',
    answer: '- 2 gange ”modtager”\n- ”Melding”\n- ”Afsender” (eget kaldenavn)\n- ”Skift”',
  },
  {
    id: 'sine-105',
    category: 'SINE & Ledelse',
    question: 'Hvad er en SINE Gateway?',
    answer: 'En radio som opretter en overgang imellem TMO (Trunked mode) og DMO (Direct mode), så de to tilstande kan tale sammen',
  },
  {
    id: 'sine-106',
    category: 'SINE & Ledelse',
    question: 'Hvad er en SINE repeater?',
    answer: 'En radio som modtager og forstærker SINE signalet (DMO tilstand)',
  },

  // --- Frigørelse af fastklemte i køretøjer (107-111) ---
  {
    id: 'frig-107',
    category: 'Frigørelse af Fastklemte',
    question: 'Nævn de overordnede faser ved frigørelse af fastklemte i køretøjer',
    answer: '• Overblik og sikring af skadested\n• Skab adgang\n• Skab plads\n• Endelig frigørelse\n• Teknisk evaluering',
  },
  {
    id: 'frig-108',
    category: 'Frigørelse af Fastklemte',
    question: 'Hvad er formålet med opklodsning af et køretøj, hvor der skal foretages frigørelse?',
    answer: 'Sikre køretøjet er stabilt under klipning, således at den fastklemte ikke skades yderligere',
  },
  {
    id: 'frig-109',
    category: 'Frigørelse af Fastklemte',
    question: 'Hvilke 3 depoter skal der oprettes ved frigørelse af fastklemte i køretøjer?',
    answer: '• Materiel-, personel-, og affaldsdepot',
  },
  {
    id: 'frig-110',
    category: 'Frigørelse af Fastklemte',
    question: 'Hvad skal man sørge for inden der klippes i en elbil?',
    answer: 'At batteripakkens sikkerhedsafbryder er afbrudt',
  },
  {
    id: 'frig-111',
    category: 'Frigørelse af Fastklemte',
    question: 'Hvad er forskellen mellem fysisk og teknisk fastklemt?',
    answer: 'Fysisk fastklemt: Kan ikke udtages uden at klippe i bilen.\nTeknisk fastklemt: Sidder ikke fysisk klemt, men klippes udelukkende fri pga. skader som den uheldsramte har pådraget sig.',
  },
]

// Interleave questions evenly across categories so questions alternate between topics
export function interleaveByCategory(cards: Flashcard[]): Flashcard[] {
  const groups: Record<string, Flashcard[]> = {}
  for (const c of cards) {
    const cat = c.category || 'Generelt'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(c)
  }
  const result: Flashcard[] = []
  const keys = Object.keys(groups)
  let hasMore = true
  let idx = 0
  while (hasMore) {
    hasMore = false
    for (const k of keys) {
      if (idx < groups[k].length) {
        result.push(groups[k][idx])
        hasMore = true
      }
    }
    idx++
  }
  return result
}

// Modular decks structured by official subject sections + one comprehensive deck
export const DEFAULT_DECKS: Deck[] = [
  {
    id: 'alle-spoergsmaal',
    title: 'Alle C-Spørgsmål (Samlet Prøve)',
    description: 'Komplet samling af samtlige 111 spørgsmål i original rækkefølge fra pensum',
    icon: 'Flame',
    color: 'from-amber-600 to-red-600',
    cards: ALL_QUESTIONS,
  },
  {
    id: 'brandkemi-ventilation',
    title: 'Brandkemi & Brandventilation',
    description: 'Forbrænding, røggasser, overtænding og overtryksventilation',
    icon: 'Flame',
    color: 'from-orange-600 to-amber-500',
    cards: ALL_QUESTIONS.slice(0, 19),
  },
  {
    id: 'slukningsteori-midler',
    title: 'Slukningsteori & -midler',
    description: 'Slukningsmetoder, vand, CAFS, tågesøm, CO2 og pulverslukkere',
    icon: 'Droplet',
    color: 'from-blue-600 to-cyan-500',
    cards: ALL_QUESTIONS.slice(19, 33),
  },
  {
    id: 'bygningskonstruktioner',
    title: 'Bygningskonstruktioner',
    description: 'Jern, træ, beton og de 5 sikre tegn på sammenstyrtningsfare',
    icon: 'Building2',
    color: 'from-stone-600 to-zinc-500',
    cards: ALL_QUESTIONS.slice(33, 38),
  },
  {
    id: 'cbrn-farlige-stoffer',
    title: 'CBRN & Farlige Stoffer',
    description: 'Fareskilte, farenumre, kemikaliedragter og sikkerhed ved akutte uheld',
    icon: 'AlertTriangle',
    color: 'from-yellow-600 to-amber-500',
    cards: ALL_QUESTIONS.slice(38, 47),
  },
  {
    id: 'redning-faldsikring',
    title: 'Redningstjeneste & Faldsikring',
    description: 'Redningstjenestens 5 stadier, stiger, falddæmper og kædesav',
    icon: 'Shield',
    color: 'from-emerald-600 to-teal-500',
    cards: ALL_QUESTIONS.slice(47, 64),
  },
  {
    id: 'brandmateriel-pumper',
    title: 'Brandmateriel & Slanger',
    description: 'Vandføring, A/B/C slanger, stigrør, skumudstyr og skæreslukker',
    icon: 'Wrench',
    color: 'from-indigo-600 to-blue-500',
    cards: ALL_QUESTIONS.slice(64, 71),
  },
  {
    id: 'roegdykning-sikkerhed',
    title: 'Røgdykkerens Arbejde & Sikkerhed',
    description: 'Sikkerhed, dehydrering, personklasser, trykflasker og skibsbrande',
    icon: 'HeartPulse',
    color: 'from-rose-600 to-red-500',
    cards: ALL_QUESTIONS.slice(71, 101),
  },
  {
    id: 'sine-radiokommunikation',
    title: 'SINE Radio & Ledelse',
    description: 'SINE opkaldsprocedurer, Gateway, Repeater og ledelse på skadestedet',
    icon: 'Radio',
    color: 'from-violet-600 to-purple-500',
    cards: ALL_QUESTIONS.slice(101, 106),
  },
  {
    id: 'frigoerelse-koerettoejer',
    title: 'Frigørelse i Køretøjer',
    description: 'Faser, opklodsning, depoter, elbiler og fysisk/teknisk fastklemte',
    icon: 'Car',
    color: 'from-red-600 to-orange-500',
    cards: ALL_QUESTIONS.slice(106, 111),
  },
]
