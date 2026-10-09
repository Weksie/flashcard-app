export interface CompetenceGoal {
  id: string
  text: string
  subItems?: string[]
}

export interface TaskItem {
  title: string
  typeBadge: string
  type: 'praktisk' | 'teoretisk' | 'praktisk/teoretisk'
  command?: string
  note?: string
  goals: CompetenceGoal[]
  relatedNoteId?: string
}

export interface AbQuestion {
  id: number
  questionNumber: number
  title: string
  category: string
  tags: string[]
  taskA: TaskItem
  taskB: TaskItem
  taskC: {
    title: string
    description: string
  }
}

export const AB_QUESTIONS: AbQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    title: 'Mindre forureningsspild & Brandforløb',
    category: 'Miljø & Brandteori',
    tags: ['Kloakstop', 'Tætningspude', 'Rumbrand', 'Røggaseksplosion'],
    taskA: {
      title: 'En indsats med materiel til bekæmpelse af mindre forureningsspild',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om, at eksaminanden skal stoppe spild i kloak og tætne hul i tank med farligt stof.',
      goals: [
        {
          id: '1a-1',
          text: 'Eksaminanden iklæder sig overtræks- eller splashdragt samt apparat og røgdykkerradio.',
        },
        {
          id: '1a-2',
          text: 'Eksaminanden demonstrerer forståelse for faget ved at standse nedsivning af væske i kloak og klargøring af luftpuder - eller tilsvarende - til sikring af hullet mod yderligere udstrømning af væsker.',
        },
        {
          id: '1a-3',
          text: 'Eksaminanden placerer tætningspude – eller tilsvarende - og sikrer den ved hjælp af bånd med spænde, eller tilsvarende. Hjælper kan medvirke ved fastgørelse af båndet.',
        },
        {
          id: '1a-4',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
        {
          id: '1a-5',
          text: 'Eksaminanden redegør for beskyttelsesudstyr uden direkte kontakt med stoffet.',
        },
      ],
    },
    taskB: {
      title: 'Brandforløb',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      relatedNoteId: 'brandforloeb',
      goals: [
        {
          id: '1b-1',
          text: 'Eksaminanden forklarer rumbrandens forløb.',
        },
        {
          id: '1b-2',
          text: 'Eksaminanden kan forklare om forskellige risikoelementer ved brandens forløb, herunder antændelse af røggasser, underventilerede brande og røggaseksplosioner.',
        },
        {
          id: '1b-3',
          text: 'Eksaminanden forklarer forholdsregler ved tegn på antændelse af røggasser i brandrummet.',
        },
        {
          id: '1b-4',
          text: 'Eksaminanden forklarer røgdykkeren risikovurdering før indtrængning.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 2,
    questionNumber: 2,
    title: 'Trykflasker & Konstruktioners anlæg',
    category: 'Brandstedets farer & Bygninger',
    tags: ['Trykflaske', 'Termisk kamera', 'Passive anlæg', 'Aktive anlæg', 'Brandcentral'],
    taskA: {
      title: '1’erens arbejde ved en indsats mod særlige farer på brandstedet – Trykflasker',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'En B/C udlægning er klargjort, og en øvelses trykflaske er placeret således at den kan køles fra dækning. Eksaminator/holdleder giver befaling om indsats mod trykflasker. Der skal vand på angrebet.',
      goals: [
        {
          id: '2a-1',
          text: 'Eksaminanden iklæder sig røgdykkerudstyr og klargør røgdykkerradio.',
        },
        {
          id: '2a-2',
          text: 'Eksaminanden demonstrerer sammen med en hjælper indsatsen mod en varmepåvirket trykflaske på et brandsted.',
        },
        {
          id: '2a-3',
          text: 'Temperaturkontrol skal ske ved hjælp af termisk kamera og fremsender makker ved bekræftet kølet trykflaske.',
        },
        {
          id: '2a-4',
          text: 'Kommunikation mellem eksaminator/holdlederen og eksaminanden foregår ved hjælp af røgdykkerradio jævnfør gældende retningslinjer for brug af SINE svarende til indsatslignende forhold.',
        },
        {
          id: '2a-5',
          text: 'Eksaminanden forklarer inddelingen af trykflasker efter indhold og særlige risici inden for de enkelte grupper.',
        },
        {
          id: '2a-6',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Konstruktioners passive og aktive anlæg',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      relatedNoteId: 'passive-aktive-anlaeg',
      goals: [
        {
          id: '2b-1',
          text: 'Eksaminanden forklarer hvad passive og aktive anlæg i bygninger er, og hvori ligger forskellen.',
        },
        {
          id: '2b-2',
          text: 'Hvordan påvirker de aktive anlæg indsatsen.',
        },
        {
          id: '2b-3',
          text: 'Eksaminanden giver eksempler på hvor passive og aktiver anlæg findes i bygninger.',
        },
        {
          id: '2b-4',
          text: 'Eksaminanden beskriver hvad en brandcentral er, hvad den består af og hvordan finder man brandcentralen.',
        },
        {
          id: '2b-5',
          text: 'Eksaminanden forklarer hvilke oplysninger til brug for brandmandskabet som står i orienteringsplanen.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 3,
    questionNumber: 3,
    title: 'Brandhane (4’eren) & Kædesav',
    category: 'Vandforsyning & Materiel',
    tags: ['4’er rolle', 'Brandhane', 'Frostsikring', 'Kædesav', 'Gennemskæring'],
    taskA: {
      title: '4’erens arbejde ved vandforsyning fra brandhane',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om indsats med B/C-udlægning med efterfølgende klargøring af angrebspakning på 2. rør, og der fokuseres på 4’erens arbejde.',
      goals: [
        {
          id: '3a-1',
          text: 'Eksaminanden etablerer vandforsyning fra brandhane.',
        },
        {
          id: '3a-2',
          text: 'Eksaminanden klargør angrebspakning fra 2. udløb sammen med 3’eren.',
        },
        {
          id: '3a-3',
          text: 'Eksaminanden viser frostsikring af en brandhane.',
        },
        {
          id: '3a-4',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Kædesav',
      typeBadge: 'Praktisk / Teoretisk',
      type: 'praktisk/teoretisk',
      goals: [
        {
          id: '3b-1',
          text: 'Eksaminanden kontrollerer savens driftssikkerhed.',
        },
        {
          id: '3b-2',
          text: 'Eksaminanden forklarer sikkerhedsbestemmelser og ifører sig sikkerhedsudstyr.',
        },
        {
          id: '3b-3',
          text: 'Eksaminanden starter saven og arbejder med den – gennemskærer træ, der er ca. 30 cm i diameter.',
        },
        {
          id: '3b-4',
          text: 'Eksaminanden forklarer et hjemkomsteftersyn.',
        },
        {
          id: '3b-5',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 4,
    questionNumber: 4,
    title: 'Skumudlægning & Redningstaktik',
    category: 'Slukning & Redningstaktik',
    tags: ['Skumudlægning', 'Z-tilblander', 'Skumtal', '5 stadier', 'Løst oplag'],
    taskA: {
      title: '3’erens, 2’erens og 1’erens opgaver ved en skumudlægning',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om en indsats med skumudlægning. Eksaminanden gives besked af eksaminator/holdleder for hver af de enkelte opgaver i dette spørgsmål.',
      relatedNoteId: 'skum-udlaegning',
      goals: [
        {
          id: '4a-1',
          text: 'Eksaminanden udfører 3’erens arbejde. Når arbejdet ved tilblanderen er tilendebragt fortsættes med 2’erens arbejde. Tilblanderen betjenes herefter af en hjælper.',
        },
        {
          id: '4a-2',
          text: 'Eksaminanden udfører 2’erens arbejde.',
        },
        {
          id: '4a-3',
          text: 'Eksaminanden udfører 1’erens arbejde, kalder vand frem og betjener skumrøret. 2’erens arbejde udføres af en hjælper.',
        },
        {
          id: '4a-4',
          text: 'Eksaminanden forklarer om skums slukningsvirkning:',
          subItems: [
            'fordele og ulemper ved brug af skum som slukningsmiddel samt om skums anvendelsesmuligheder.',
            'hvorledes en skumtilblander og et skumrør virker.',
            'skumtallet og skums inddeling.',
          ],
        },
        {
          id: '4a-5',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Indsatstaktik ved redningsindsatser',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '4b-1',
          text: 'Eksaminanden forklarer redningstjenestens overordnede formål.',
        },
        {
          id: '4b-2',
          text: 'Eksaminanden viser forståelse for fremgangsmåden ifølge de 5 stadier.',
        },
        {
          id: '4b-3',
          text: 'Eksaminanden forklarer tilgængelighedsprincippet.',
        },
        {
          id: '4b-4',
          text: 'Eksaminanden forklarer principperne for redning af personer i løst oplag.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 5,
    questionNumber: 5,
    title: 'B/C-udlægning & Følgeskader',
    category: 'Slangeudlægning & Værdiredning',
    tags: ['B/C udlægning', 'Forgrener', 'Angrebspakning', 'Følgeskade', 'Værdiredning'],
    taskA: {
      title: '3’erens, 2’erens og 1’erens opgaver ved en B/C-udlægning',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om en indsats med B/C-udlægning. Eksaminanden gives besked af eksaminator/holdleder for hver af de enkelte opgaver i dette spørgsmål.',
      relatedNoteId: 'bc-udlaegning',
      goals: [
        {
          id: '5a-1',
          text: 'Eksaminanden udfører 3’erens arbejde ved en B/C-udlægning.',
        },
        {
          id: '5a-2',
          text: 'Eksaminanden kalder hurtigst muligt vand frem og betjener forgreneren til der er vand fremme ved denne. Herefter betjenes forgreneren af en hjælper.',
        },
        {
          id: '5a-3',
          text: 'Eksaminanden udfører 2’erens og 1’erens arbejde ved en B/C-udlægning.',
        },
        {
          id: '5a-4',
          text: 'Eksaminanden kalder vand frem og betjener strålerøret.',
        },
        {
          id: '5a-5',
          text: 'Eksaminanden udlægger en angrebspakning (SOS og angrebsslange).',
        },
        {
          id: '5a-6',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Følgeskade og Værdiredning',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '5b-1',
          text: 'Eksaminanden forklarer hvilken taktisk betydning installationerne har for indsatsen.',
        },
        {
          id: '5b-2',
          text: 'Eksaminanden forklarer hvad en ”Taktisk plan” og ”Mål med indsats” er, og hvordan man bruger informationerne fra disse som brandmand.',
        },
        {
          id: '5b-3',
          text: 'Eksaminanden redegør for hvilke overvejelser brandmand skal gøre sig, i forhold til reducering af følgeskade og sikret værdiredning, i forbindelse med egen påvirkning af indsatsen.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 6,
    questionNumber: 6,
    title: 'Frigørelsesværktøj & Slukningsarbejde',
    category: 'Frigørelse & Slukningsteori',
    tags: ['Hydraulisk værktøj', 'Spreder/Saks', 'Opklodsning', 'Risikovurdering', 'Eftersøgning'],
    taskA: {
      title: 'Indsats med frigørelsesværktøj ved frigørelse af fastklemte i køretøj – frigørelsesværktøjet er samlet',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling og leder en indsats til frigørelse af fastklemt i køretøj. Der skal være en figurant eller en dukke placeret i køretøjet. Kan eksaminanden betjener frigørelsesværktøjet.',
      goals: [
        {
          id: '6a-1',
          text: 'Eksaminanden sammen med en hjælper udfører 1’erens arbejde med hydraulisk frigørelsesværktøj ved frigørelse af fastklemte.',
        },
        {
          id: '6a-2',
          text: 'Sikrer og stabiliserer køretøjet (eksaminanden opklodser køretøjet, tager strømmen fra batteriet samt knuser/fjerner en rude).',
        },
        {
          id: '6a-3',
          text: 'Eksaminanden skaber adgang for førstehjælperen via rude.',
        },
        {
          id: '6a-4',
          text: 'Eksaminanden skaber plads omkring den fastklemte for behandleren ved at fjerne en dør i åben dør med spreder.',
        },
        {
          id: '6a-5',
          text: 'Eksaminanden foretager de fornødne klip og spredninger for at frigøre fastklemt mellem sæde og instrumentbord/rat (der skal bruges rem).',
        },
        {
          id: '6a-6',
          text: 'Eksaminanden demonstrerer hensyn til den fastklemtes sikkerhed og tilstand.',
        },
        {
          id: '6a-7',
          text: 'Eksaminanden demonstrerer hensyn til egen og hjælperens sikkerhed ved frigørelsesarbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Slukningsarbejdet på et brandsted',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '6b-1',
          text: 'Eksaminanden forklarer røgdykkerholdets risikovurdering inden indtrængning i en brændende bygning.',
        },
        {
          id: '6b-2',
          text: 'Eksaminanden forklarer, hvorledes slukningsarbejdet udføres og forklarer de forskellige slukningsprincipper og –teknikker.',
        },
        {
          id: '6b-3',
          text: 'Eksaminanden forklarer, hvordan eftersøgning af personer foretages.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 7,
    questionNumber: 7,
    title: 'Røgdykning m. Blændet maske & Akutte kemikalieuheld',
    category: 'Røgdykning & Farlige Stoffer',
    tags: ['Blændet maske', 'Personredning', 'Sporbevaring', 'Fareområde', 'Rensepunkt'],
    taskA: {
      title: 'Røgdykkerens arbejde ved personredning',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver en befaling når eksaminanden har iklædt sig røgdykkerudstyret og er klar til indsats. Hjælperen skal også være iklædt sig røgdykkerudstyret. Eksaminand og hjælper skal have blændet maske under opgaven.',
      note: 'Eksaminand og hjælper skal have blændet maske under opgaven.',
      goals: [
        {
          id: '7a-1',
          text: 'Eksaminanden iklæder sig røgdykkerudstyr og klargør radio.',
        },
        {
          id: '7a-2',
          text: 'Eksaminanden med hjælperen sørger for udlægning og afprøvning af slangen.',
        },
        {
          id: '7a-3',
          text: 'Eksaminanden foretager indtrængning til eftersøgning og slukning af brand i lejlighed i stueetagen.',
        },
        {
          id: '7a-4',
          text: 'Eksaminanden foretager afsøgning af lokalet og redning og flytning af bevidstløs person eller dukke.',
        },
        {
          id: '7a-5',
          text: 'Kommunikation mellem eksaminator/holdlederen og eksaminanden foregår ved hjælp af røgdykkerradio.',
        },
        {
          id: '7a-6',
          text: 'Eksaminanden forklarer hvad der menes med sporbevaring på et skadested.',
        },
        {
          id: '7a-7',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Indsatsforhold ved akutte uheld med farlige stoffer',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '7b-1',
          text: 'Eksaminanden forklarer skadestedets opbygning (fokus på direkte kontakt og fareområde).',
        },
        {
          id: '7b-2',
          text: 'Eksaminanden forklarer brandmandens muligheder for at finde oplysninger om stoffet.',
        },
        {
          id: '7b-3',
          text: 'Eksaminanden forklarer opgaverne i en indsats ved akutte uheld med farlige stoffer.',
        },
        {
          id: '7b-4',
          text: 'Eksaminanden forklarer om et rensepunkt for indsatspersonale og principperne for dets placering.',
        },
        {
          id: '7b-5',
          text: 'Eksaminanden fortæller om det materiel og udstyr som kemikaliedykkeren har til rådighed.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 8,
    questionNumber: 8,
    title: 'Faldsikring & Slukningsmidler / CAFS',
    category: 'Højderedning & Slukningsteori',
    tags: ['Faldsikring', 'EN 795', 'Reblås', 'Vandvirkning', 'CAFS', 'Slukningsteknik'],
    taskA: {
      title: 'Faldsikringsudstyr',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om en indsats, hvortil der skal bruges faldsikringsudstyr.',
      goals: [
        {
          id: '8a-1',
          text: 'Eksaminanden viser, hvorledes forankringsline udlægges og forankres, før der arbejdes i højden.',
        },
        {
          id: '8a-2',
          text: 'Eksaminanden forklarer om krav til ankerpunkter 1200kg (EN 795).',
        },
        {
          id: '8a-3',
          text: 'Eksaminanden iklæder sig faldsikringsudstyr og demonstrerer, hvorledes forankringslinen sikrer brandmanden ved arbejde i højden.',
        },
        {
          id: '8a-4',
          text: 'Eksaminanden viser, hvorledes reblåsen virker.',
        },
        {
          id: '8a-5',
          text: 'Eksaminanden forklarer falddæmperens funktion.',
        },
        {
          id: '8a-6',
          text: 'Eksaminanden sikrer sig korrekt i højden.',
        },
        {
          id: '8a-7',
          text: 'Eksaminanden forklarer, i hvilke situationer brandmandsbælte med støttestrop kan anvendes som holdesikring.',
        },
        {
          id: '8a-8',
          text: 'Eksaminanden forklarer et hjemkomsteftersyn af udstyret.',
        },
        {
          id: '8a-9',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Slukningsmiddel og effekt',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      relatedNoteId: 'cafs',
      goals: [
        {
          id: '8b-1',
          text: 'Eksaminanden forklarer om vands slukningsvirkning.',
        },
        {
          id: '8b-2',
          text: 'Eksaminanden fortæller om fordele og ulemper ved brug af vand som slukningsmiddel.',
        },
        {
          id: '8b-3',
          text: 'Eksaminanden forklarer CAFS som slukningsmiddel.',
        },
        {
          id: '8b-4',
          text: 'Eksaminanden forklarer skæreslukker som slukningsmiddel.',
        },
        {
          id: '8b-5',
          text: 'Eksaminanden forklarer de forskellige slukningsteknikker ved offensiv taktik:',
          subItems: [
            'Direkte slukning',
            'Indirekte slukning',
            'Køling af røggasser',
            'Pensling',
          ],
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 9,
    questionNumber: 9,
    title: 'Bæresprøjte til åbent vand & Dørforcering',
    category: 'Pumper & Indtrængning',
    tags: ['Bæresprøjte', 'Sugeslange', '5 bar', 'Dørforcering', 'Hængsling'],
    taskA: {
      title: 'Motorpasserens arbejde ved opstilling af påhængsbæresprøjte til åbent vandsted',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om en indsats med påhængsbæresprøjte.',
      goals: [
        {
          id: '9a-1',
          text: 'Eksaminanden sammen med en hjælper placerer pumpen stabilt ved vandstedet.',
        },
        {
          id: '9a-2',
          text: 'Eksaminanden sammen med en hjælper udlægger sugeslanger.',
        },
        {
          id: '9a-3',
          text: 'Eksaminanden fastgør suge- og ventilline.',
        },
        {
          id: '9a-4',
          text: 'Eksaminanden leverer vand og 5 bars tryk til et strålerør.',
        },
        {
          id: '9a-5',
          text: 'Eksaminanden har forståelse for betjeningshåndtagenes funktioner.',
        },
        {
          id: '9a-6',
          text: 'Eksaminanden forklarer brugen af pumpens mano- og manovakuummeter.',
        },
        {
          id: '9a-7',
          text: 'Eksaminanden forklarer, hvordan sugeslangen og sugehovedet virker.',
        },
        {
          id: '9a-8',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Dørforcering',
      typeBadge: 'Praktisk / Teoretisk',
      type: 'praktisk/teoretisk',
      note: 'NB: Udføre afslutningsvis en simpel dørforcering med 1 hjælper.',
      goals: [
        {
          id: '9b-1',
          text: 'Eksaminanden beskriver dørens opbygning og identificere dørens hængsling og låsemekanismer.',
        },
        {
          id: '9b-2',
          text: 'Eksaminanden forklarer teknikken ved en forcering ved ind- og udadgående dør.',
        },
        {
          id: '9b-3',
          text: 'Eksaminanden redegør for sikkerheden ved en dørforcering.',
        },
        {
          id: '9b-4',
          text: 'Eksaminanden gennemfører en forcering af en indadgående dør med en hjælper.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 10,
    questionNumber: 10,
    title: 'Udvendig ophaling (2. sal) & Bil på tag/side',
    category: 'Højdeindsats & Køretøjsfrigørelse',
    tags: ['Udvendig ophaling', '2. sals højde', '1’er rolle', 'El- og hybridbiler', 'Bil på taget'],
    taskA: {
      title: '1’erens arbejde ved en B/C-udlægning med udvendig ophaling',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling til udvendig ophaling til slukning af brand i 2. sals højde.',
      goals: [
        {
          id: '10a-1',
          text: 'Eksaminanden iklæder sig røgdykkerpåklædning inklusive trykluftsapparat og røgdykkerradio. Masken anlægges, når eksaminanden finder det hensigtsmæssigt af hensyn til opgaven.',
        },
        {
          id: '10a-2',
          text: 'Eksaminanden befales, at det brænder i højden, og at der skal foretages udvendig ophaling af slanger til etagen under branden.',
        },
        {
          id: '10a-3',
          text: 'Eksaminanden viser 1’erens arbejde ved denne udlægning.',
        },
        {
          id: '10a-4',
          text: 'Kommunikation mellem eksaminator og 1´eren foregår ved hjælp af røgdykkerradio.',
        },
        {
          id: '10a-5',
          text: 'Eksaminanden kontrollerer og indstiller sit strålerør og trækker op til branden på 2. sal.',
        },
        {
          id: '10a-6',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Komplicerende forhold ved frigørelse af fastklemt i køretøj',
      typeBadge: 'Praktisk / Teoretisk',
      type: 'praktisk/teoretisk',
      note: 'NB: Der skal anvendes en bil, der ligger på siden/taget til opgaven.',
      goals: [
        {
          id: '10b-1',
          text: 'Eksaminanden viser og forklarer – ved et forulykket køretøj – særlige sikkerhedsmæssige forhold ved frigørelse fra EL- og hybridbiler.',
        },
        {
          id: '10b-2',
          text: 'Eksaminanden viser og forklarer teknikken ved frigørelse her under hvordan man stabiliser større køretøjer som lastvogne og busser. Dette kan vises på et større ikke-forulykkede køretøj.',
        },
        {
          id: '10b-3',
          text: 'Eksaminanden viser og forklarer faserne ved frigørelse fra et køretøj som ligger siden/taget, herunder særligt ift. sikring af køretøjet og forskellige måder at skabe plads på.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 11,
    questionNumber: 11,
    title: 'Mekanisk brandventilation & Grønne energiformer',
    category: 'Brandventilation & Ny Energi',
    tags: ['Overtryksventilator', 'PPV', 'Fraluftsåbning', 'El-køretøjer', 'BESS anlæg'],
    taskA: {
      title: 'Mekanisk brandventilation',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling til ventilering af bygning efter klarmelding.',
      relatedNoteId: 'brandventilation',
      goals: [
        {
          id: '11a-1',
          text: 'Eksaminanden frembringer overtryksventilatoren med en makker fra køretøjet.',
        },
        {
          id: '11a-2',
          text: 'Eksaminanden opstiller og klargør overtryksventilatoren under indsatslignende forhold ved røgfyldt bygning, og melder klar til Holdleder over røgdykkerradio.',
        },
        {
          id: '11a-3',
          text: 'Eksaminanden indsætter og betjener overtryksventilatoren på Holdleders befaling til ventilering af bygning.',
        },
        {
          id: '11a-4',
          text: 'Eksaminanden udviser forståelse for arbejdsarbejdsmiljøet omkring og i forbindelse anvendelse af overtryksventilatoren.',
        },
        {
          id: '11a-5',
          text: 'Eksaminanden slukker for overtryksventilatoren.',
        },
        {
          id: '11a-6',
          text: 'Eksaminanden forklarer principperne for overtryksventilering, reglerne for etableringen af til- og fraluftsåbningerne og betydningen af eventuel brug af sikringsslange ved fraluftsåbningen.',
        },
        {
          id: '11a-7',
          text: 'Eksaminanden forklarer hvilket former for ventilationsmetoder og -opsætning som kan bruges i forbindelse med indsats.',
        },
        {
          id: '11a-8',
          text: 'Eksaminanden forklarer ændringerne i brandforløbet / påvirkningen ved konstruktionsbrand / sikkerhed overtryksventilatorer.',
        },
        {
          id: '11a-9',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Grønne transportmidler og energiformer',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      relatedNoteId: 'bess',
      goals: [
        {
          id: '11b-1',
          text: 'Eksaminanden redegør for grønne energiformer.',
        },
        {
          id: '11b-2',
          text: 'Eksaminanden giver eksempler på batteripakkers placering i transportmidler.',
        },
        {
          id: '11b-3',
          text: 'Eksaminanden forklarer særlige risici ved brand i grønne transportmidler og BESS anlæg.',
        },
        {
          id: '11b-4',
          text: 'Eksaminanden forklarer offensiv- og defensiv slukningsteknik af batteripakker.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 12,
    questionNumber: 12,
    title: 'Fastklemt i bygningsdele & Særlige objekter',
    category: 'Tung Redning & Særlige Brande',
    tags: ['Løftemateriel', 'Opklodsning', 'Betonbjælke', 'P-kælder', 'Gårdbrande / Landet'],
    taskA: {
      title: 'Frigørelse af fastklemt i bygningsdele',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om en indsats, hvor en fastklemt dukke skal frigøres.',
      goals: [
        {
          id: '12a-1',
          text: 'Eksaminanden samler og klargør udstyret til løft med løftemateriel.',
        },
        {
          id: '12a-2',
          text: 'Eksaminanden løfter sammen med en hjælper – ved hjælp af løftemateriel og to løftepunkter - en tung betonbjælke eller lignende genstand på mindst 2 m² ca. 20 cm fra jorden. Der skal under byrden være placeret en fastklemt dukke.',
        },
        {
          id: '12a-3',
          text: 'Eksaminanden sørger for trinvis opklodsning.',
        },
        {
          id: '12a-4',
          text: 'Eksaminanden forklarer principperne ved og vigtigheden af opklodsningen.',
        },
        {
          id: '12a-5',
          text: 'Eksaminanden skal redegøre for hvor højt byrden skal løftes inden udtagning af personen.',
        },
        {
          id: '12a-6',
          text: 'Når dukken kan trækkes fri og byrden er løftet og opklodset i den ønskede højde, er opgaven løst.',
        },
        {
          id: '12a-7',
          text: 'Eksaminanden demonstrerer hensyn til sikkerhed ved gennemførelse af arbejdet.',
        },
      ],
    },
    taskB: {
      title: 'Brand i særlige objekter',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '12b-1',
          text: 'Eksaminanden redegør for udfordringer ved brande i parkeringskældre og -huse.',
        },
        {
          id: '12b-2',
          text: 'Eksaminanden redegør for udfordringer ved brande på landet.',
        },
        {
          id: '12b-3',
          text: 'Eksaminanden giver yderligere eksempler på brande i særlige objekter, samt hvilke udfordringer som disse har.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 13,
    questionNumber: 13,
    title: 'Kemikalieindsatsdragt & CAFS',
    category: 'Kemi & Avanceret Slukning',
    tags: ['Kemidragt', 'Luftforbrug', 'Rensepunkt', 'CAFS', 'Våd/tør CAFS'],
    taskA: {
      title: 'Kemikalieindsatsdragten',
      typeBadge: 'Praktisk / Demonstration',
      type: 'praktisk',
      note: 'NB: Eksaminanden er hjælper i opgaveløsning, for at kunne illustrere og forklare.',
      goals: [
        {
          id: '13a-1',
          text: 'Eksaminanden forklarer:',
          subItems: [
            'dragtens opbygning.',
            'de generelle regler for arbejde med kemikalieindsatsdragt, herunder luftforbrug, indsatstid og rensning.',
            'sikkerhed for kemikaliedykkeren.',
          ],
        },
        {
          id: '13a-2',
          text: 'Eksaminanden iklæder makker i kemikalieindsatsdragt og forklarer processen undervejs, samt instruerer hvad hjælperen skal gøre i forhold til iklædningen.',
        },
        {
          id: '13a-3',
          text: 'Eksaminanden anlægger trykluftsapparat på makkeren, og tilslutter apparatet til dragtens ventil og viser dragtens funktioner.',
        },
        {
          id: '13a-4',
          text: 'Eksaminanden forklarer sikkerhedsmæssig korrekt færden iklædt kemikalieindsatsdragt, og får makkeren til at demonstrere dette.',
        },
        {
          id: '13a-5',
          text: 'Eksaminanden gør rede for placeringen af rensepunkt for indsatspersonale ved indsats med uheld med farlige stoffer.',
        },
      ],
    },
    taskB: {
      title: 'CAFS',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      relatedNoteId: 'cafs',
      goals: [
        {
          id: '13b-1',
          text: 'Eksaminanden forklarer hvad CAFS er, virkemåden af CAFS og hvori er forskellen fra andre slukningsmidler er.',
        },
        {
          id: '13b-2',
          text: 'Eksaminanden forklarer forskellen imellem tør og våd CAFS, og hvor det bruges.',
        },
        {
          id: '13b-3',
          text: 'Eksaminanden forklarer sikkerhedsbestemmelser for brug af CAFS.',
        },
        {
          id: '13b-4',
          text: 'Eksaminanden forklarer CAFS som et umiddelbar tiltag.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 14,
    questionNumber: 14,
    title: 'Udskydningsstige (11m) & Slukningstaktik',
    category: 'Stiger & Slukningstaktik',
    tags: ['Udskydningsstige', '11 meter', 'Stigeredning', 'Rumbrand', 'Konstruktionsbrand', 'Umiddelbart tiltag'],
    taskA: {
      title: 'Udskydningsstigen',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling for indsats, hvor en figurant på anden sal skal reddes ved hjælp af udskydningsstigen.',
      note: 'NB. Til opgaveløsningen kræves to stiger: En allerede topsikret stige som eksaminanden skal anvende ved demonstration af redning fra stige. En stige der anvendes ved rejsning af stige.',
      goals: [
        {
          id: '14a-1',
          text: 'Eksaminanden frembringer stigen fra køretøj til stigeredningsareal, med hjælp fra 2 hjælpere.',
        },
        {
          id: '14a-2',
          text: 'Eksaminanden med 2 hjælpere rejser minimum 11 meter udskydningsstige i stigeredningsarealer.',
        },
        {
          id: '14a-3',
          text: 'Eksaminanden sikrer stigen og viser redning af person ved bevidsthed fra 2. sal, minimum 3 trin, samt forklarer redning af barn og bevidstløs person. (NB. Eksaminanden og figuranten skal begge være sikret ved brug af faldsikringsudstyr).',
        },
        {
          id: '14a-4',
          text: 'Eksaminanden forklarer arbejdet under hensyntagen til sikkerhedsreglerne ved brug af stiger.',
        },
      ],
    },
    taskB: {
      title: 'Slukningsteknik og -taktik',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '14b-1',
          text: 'Eksaminanden forklarer slukning af en rumbrand.',
        },
        {
          id: '14b-2',
          text: 'Eksaminanden forklarer slukning af en konstruktionsbrand, valg af værktøj og hvor den adskiller sig fra en rumbrand.',
        },
        {
          id: '14b-3',
          text: 'Eksaminanden viser og forklarer røgdykkerens slukningsteknik ved antændelse af røggasser.',
        },
        {
          id: '14b-4',
          text: 'Eksaminanden forklarer hvorledes røgdykkerholdet forholder sig overfor forskellige særlige farer – trykflasker, sammenstyrtningsfare og EL.',
        },
        {
          id: '14b-5',
          text: 'Eksaminanden forklarer betydningen af et ”umiddelbart tiltag” og hvad forsøges opnået ved dette.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
  {
    id: 15,
    questionNumber: 15,
    title: 'Stigrørsudlægning, Armaturer & Skæreslukker',
    category: 'Stigrør & Skæreslukker',
    tags: ['Stigrør', '3’er rolle', 'Armaturer & Overgange', 'Skæreslukker', 'Skæremiddel'],
    taskA: {
      title: '3’erens arbejde ved en stigrørsudlægning samt anvendelse og beskrivelse af forskellige armaturer',
      typeBadge: 'Praktisk',
      type: 'praktisk',
      command: 'Eksaminator/holdleder giver befaling om en indsats med en stigrørsudlægning.',
      relatedNoteId: 'stigroer-udlaegning',
      goals: [
        {
          id: '15a-1',
          text: 'Eksaminanden udfører 3’erens arbejde ved en stigrørsudlægning. Der skal vand på udlægningen frem til stigrøret.',
        },
        {
          id: '15a-2',
          text: 'Eksaminanden efterser, at de stigrørsventiler, som ikke anvendes, er lukkede.',
        },
        {
          id: '15a-3',
          text: 'Eksaminanden forklarer efterfølgende navngivelse og anvendelse på 3 af censor udpegede armaturer og overgangsstykker.',
        },
      ],
    },
    taskB: {
      title: 'Skæreslukker',
      typeBadge: 'Teoretisk',
      type: 'teoretisk',
      goals: [
        {
          id: '15b-1',
          text: 'Eksaminanden forklarer hvad skæreslukker er, virkemåden af skæreslukkeren og hvori forskellen fra andre slukningsmidler er.',
        },
        {
          id: '15b-2',
          text: 'Eksaminanden forklarer forskellen imellem brug af skæreslukker med og uden skæremiddel og tilsætning af skumvæske.',
        },
        {
          id: '15b-3',
          text: 'Eksaminanden forklarer sikkerhedsbestemmelser og særlige risici for brug af skæreslukker.',
        },
        {
          id: '15b-4',
          text: 'Eksaminanden forklarer hvilke typer af brande vil man kunne bruge skæreslukkeren.',
        },
      ],
    },
    taskC: {
      title: 'Opgave C',
      description: '12 spørgsmål, der er udarbejdet af Beredskabsstyrelsen, og som stilles af eksaminator.',
    },
  },
]
