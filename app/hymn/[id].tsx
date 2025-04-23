import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useFavorites } from '@/hooks/useFavorites';

const hymns = {
  '1': {
    title: 'Mulungu Dalitsani Malawi',
    number: '1',
    lyrics: `[Hymn lyrics removed for copyright reasons]`,
  },
  '2': {
    title: 'Yesu Ndinu Mbusa Wanga',
    number: '2',
    lyrics: `[Hymn lyrics removed for copyright reasons]`,
  },
  '3': {
    title: 'Tikondane',
    number: '3',
    lyrics: `[Hymn lyrics removed for copyright reasons]`,
  },
  '62': {
    title: 'Wizengeso Fumu',
    number: '403',
    lyrics: `
1. Wizengeso Fumu Yesu uyo wakatifwira
Wizamkwiza na ŵatuŵa ŵakulizga zimbata
Mchindikeni, Mchindikeni
Tizamkondwa kumwona

2. Maso ghose ghizammwona wavwara mphumphu yake
ŵakumkana, na kumgoska na kumkhoma pakhuni
ŵizamlira, kuska mino
pakumwona Yesu yo

3. Charu chose chizamluta, nyanja na mapiri so
aŵo ŵakumtinkha Yesu, ŵizampulika mbata
wizamchema Fumu Yesu
zaninge ku cheruzgo

4. Chiponosko cha Chiuta sono chizamwoneka
Ŵanthu ŵake ŵizamkwera kukumana na Fumu
Mtumbikeni, Mtumbikeni
Liza zuŵa la Fumu
  `},

  '58': {
    title: 'Ulinda wa Chikhristu',
    number: '404',
    lyrics: `
Rev. J.W. Kamanga

1. Ulinda wa Chikhristu ukupenja mawoko
pamoza na malundi kuteŵetera Yesu. (2x)

*Ulinda ulinda
Ulinda ulinda wa Fumu yithu Yesu*

2. Ulinda wa Chikhristu wuchema ŵanthu ŵose
Kwiza naŵo kwa Yesu mwakuti waŵachizge. (2x)

3. Ulinda wa Chikhristu ukupenja vinjeru
Pamoza na nkhongono kuteŵetera Yesu. (2x)

4. Ulinda wa Chikhristu ukukhumba kaŵiro
Kinu kose mwa ŵanthu kupereka kwa Yesu. (2x)

5. Ulinda wa Chikhristu wukhumba mphango zinu
Mwize nazo kwa Yesu kuchita nchito zake. (2x)

6. Aŵo ŵali m’visuzgo ŵize navyo kwa Yesu
Muponoski wa charu wati waŵachizgenge. (2x)

7. Mutima wa Chiuta wavumbukwira ise
Zaninge muwuwone watipa mwana wake. (2x)
`
  },

  '39': {
    title: 'Ndine Muliska Muweme',
    number: '405',
    lyrics: `
Anonymous

Nyimbo Za Mulungu 361

1. Ndine muliska muweme, nkhazifwira mberere,
ndayipenja yakuzgeŵa ndapereka umoyo

*Mabamba mwe! M’mbambo zane, mphumphi yandipweteka!
Vyakuvwara vyaparuka, ndazgoka mkavu nadi*

2. Para ndachema mberere, zane zikupulika,
Nkhuzitumbika na ‘moyo, Dada wakuzisunga

3. M’ngalaŵiskanga kuwalo, mkati ndi chimbwe nadi,
Rekani kupusikika, ndine mliska muweme

4. Chiuta mwene nkhongono mazaza wali nagho,
kuzipwererera zose, na kuzisungilira

5. Tegherezgani mwaŵanthu, ndine mliska muweme,
ndine nthowa, ndine m’ryango, gwenthani murwani’yo
`
  },

  '66': {
    title: 'Zaninge Mose',
    number: '406',
    lyrics: `
Rev. C.C. Mhango

1. Zaninge Mose Mwa ŵanthu timchindike
Pakuti ngwakwenerera nchindi zose
Ndiyo wakalenga vyose kuchanya na pasi
Wakathutira mwa ise umoyo wa ndanda

2. Zaninge tisekelere timuwonge
Wali kuyitonda nyifwa pamphinjika
Wali kujura vipata vyakuya kuchanya
Wali kudumura vyose vikondo vya nyifwa

3. Zaninge timrondezgenge ndi mponoski
Ndiyo nthowa unenesko, na umoyo
Yose wakumronda iyo wamnjira kuchanya
Mu chikaya chaŵatuŵa pamo na ŵangelo

4. Zaninge tim’lindizgenge wakwizaso
Wizamkuwoneka nadi Mlengalenga
Mbata zizamlira nadi pakwiza kwa Fumu
Kwananga kwizamkumara uchindami pera
`
  },

  '49': {
    title: 'Pakwenda na Yesu',
    number: '407',
    lyrics: `
(Trust And Obey)
Rev. J.H. Sammis & D.B. Towner

1. Pakwenda na Yesu, mu ungweru wake, uchindami ukutizira,
Pakufiska mazgu wakukhara nase pamo na ŵakumpulikira

*Pulikana nthowa njimo pera,
yakusangwa mwa Yesu, gomezga Chiuta.*

2. Pakwenda na iyo, wakutilaŵiska, nkhayiko wofi vikumara,
Nyengo ya masozi, chimwemwe chikwiza, kugomezga kumpulikira.

3. Viphyo vithu vyose, na vitima vyose, ndi Yesu wakutiyeghera,
Pakunyekezgeka, kuyegha mphinjika, gomezgeka kumpulikira.

4. Tingafiska chara kuphara vya iyo, kujithereska nchakuzirwa,
Wakuŵatemwera, wakupa chimwemwe kwa wose ŵakumpulikira.

5. Pamo na ŵatuŵa, tikharenge nayo, tendenge nayo nyengo zose,
Titorenge mazgu kuya kosekose kumpulikira na chikanga.
`
  },

  '21': {
    title: 'Kale Pa Kalivari',
    number: '408',
    lyrics: `
Rev. C.C. Mhango

1. Kale pa Kalivari Yesumwe wakafwa wakayegha nthembo zane 
Wakabangura nadi kwamara kwamara wakamazga suzgo zane.
Uchizi wafika charu chaponoskeka para pamphinjika
Nkhongono zapika kwa Yesu Fumu yithu
Watonda nyifwa waruska

2. Vyakuzizwiska nadi padindi ŵangelo libwe ŵasezgapo nadi 
Pazuŵa lachitatu Yesu wakawuka wakafumamo wamoyo.

3. Maria na ŵanyake ŵakazizikika kuwona Yesu wamoyo.
Ŵakayegha makani na chimwemwe chose kumanyiska ŵasambiri.

4. Wakalayizga Yesu kwa ŵakum’rondezga, rutaninge charu chose 
Mukapharazge mazgu na kubabatiza ndizengeso kum’torani.
`
  },

  '14': {
      title: 'Fumu Yane',
      number: '409',
      lyrics: `
  Mr. P.F.K. Zgambo

  1. Fumu yane Fumu yane m’ngandisidanga ndekha
  Nawezgekera ku nyuma na charu’ chi chapasi.
  Mponoski mcharu ntha nkhum’wona, Yesu ndiponoskani
  Chiponosko chiri mwa imwe, Yesu ndiponoskani

  2. Fumu yane Fumu Yane mndibanthiske makora,
  Ndipo ndingatchintha nadi para mukwenda nane.

  3. Yewo Dada wa lusungu mwanipa Yesu Khristu,
  Yewo Yesu Muponoski mwanipa Mzimu Mtuŵa.
  `
    },

  '34': {
      title: 'Mwe A Fumu',
      number: '410',
      lyrics: `
  (O Lord, my God)
  Stuart K. Hine

  1. Mwe a Fumu ine nkhuzizwa nadi,
  para nkhuranguruka za imwe, zinyenyezi, 
  mphepo vula na vyose vikurongora ukuru winu.
  Moyo wane uchindike imwe mwabatuŵa kwakuruska
  Moyo wane uchindike imwe mwabakuru kwakuruska

  2. Pakulaŵiska vilengiwa vyose,
  nkhuzukuma na ukuru winu, viyuni para vikwimba mthengere,
  mwaruska nadi mu vinthu vyose.

  3. Kutuma Yesu kwiza mcharu chino, 
  Nchakukondweska mmaghanoghano, Pamphinjika wakayegha 
  kwananga, 
  na nthimbo zake tapona nadi.

  4. Apo Yesu wizengeso m’mabingu
  kuti ndirute nayo kukaya, Chimwemwe chizamzura mtima wane, 
  ndizamulambira Fumu yane.
  `
    },

  '57': {
      title: 'Uchizi',
      number: '411',
      lyrics: `
  (Amazing Grace)
  John Newton & Roland Fudge

  1. Uchizi wakuzizwiska waponoska ine, 
  Nkhaŵa mchisi ndaponamwe, ndasanga umoyo.

  2. Uchizi wasezga nadi, wofi wa nyifwa mwe, 
  Pakupulikana nayo Yesu Fumu yane.

  3. Mu vyakofya na viyezgo, nkhugomezga iyo,
  Mnthowa zose wadangira, na uchizi wake.

  4. Para ndamfika kukaya, ndayamkwimba sumu, 
  Yakumchindikira Fumu, kwa myirayira swi.
  `
    },

  '42': {
      title: 'Nkhujipereka',
      number: '412',
      lyrics: `
  (I surrender All)
  Lyrics: J. W. Van de Venter. Music: W.S. Weeden

  1. Nkhujipereka kwa Yesu , vyose nkhumupa Iyo, 
  Ndimtemwe na kum’gomezga ndikharenge mwa Iyo.
  Nkhujipereka, nkhujipereka, 
  Kwa Yesu mponoski wane nkhujipereka.

  2. Nkhujipereka kwa Yesu, nkhuwa m’marundi ghake, 
  Vya mcharu ndareka vyose munditore a Yesu

  3. Nkhujipereka kwa Yesu, m’ndizgore ndiŵe winu. 
  Mzimu mtuŵa waŵe nkhoswe, ndine winu na winu

  4. Nkhujipereka kwa Yesu, a Fumu m’ndipokere, 
  Nchimwemwe kponoskeka, uchindami kwa imwe
  `
    },

  '19': {
      title: 'Iwe Tiphalirapo',
      number: '413',
      lyrics: `
  F.J. Crosby & W.H. Doane

  1. Iwe tiphalirapo na za Yesu wako,
  Zanga utimanyiske wakuchitirachi?
  Mazgu ghake gha Yesu ghamkutirongozga.
  Munthowa zithu zose yimba na kuromba.

  2. Kwananga kukumara na mazgu gha Yesu,
  M’lusungu lwake mpaka tamfika ku chanya.

  3. Kwambura mazgu ghake mphinjika njawaka,
  Nanga ungayowoya, "wakafwira ine".

  4. 'We ku mazgu gha Yesu ungaŵanga mkata,
  Uyo wakughakana wakanaso moyo.

  5. Yowoyanga za Yesu na musuzgo wuwo
  Nanga ungafowoka gomezganga iyo.
  `
    },

  '47': {
      title: 'Pakulira Zimbata',
      number: '414',
      lyrics: `
  J.M. Black

  1. Pakulira zimbata padazi la umaliro 
  Tizamwona ungweru wakutowa
  Apo ŵakuwomboreka ŵizam’wungana kura
  Pakuchema mazina namkuŵapo
  Pakuchema namkuŵapo (x3)
  Pakuchema mazina ndamkuŵapo

  2. Muzuŵa la uchindami ŵatuŵa ŵizamwuka
  Kusangana m’uchindami wa Fumu
  Ŵakusoreka ŵam’kongana m’uFumu wa ndanda 
  Pakuchema mazina nda mkuŵapo

  3. Ndiyiteŵeterenge Fumu mlenji mpaka mise
  Ndipharazgenge za kutemwa kwake
  Para umoyo wamara na mlimo namalizga
  Pakuchema mazina namkuŵapo
  `
    },

  '38': {
      title: 'Ndimwe Yesu Nkhoswe Ya Ŵanthu',
      number: '415',
      lyrics: `
  Petros Mkandaŵire

  1. Ndimwe Yesu nkhoswe ya ŵanthu (x2)
  Mukizira kuwombola ise tose ku kwananga. (x2)

  2. Charu chose chikanangika (x2)
  Nyifwa nayo yikawusa m’charu chose pano pasi. (x2)

  3. Yewo Yesu mwatiwombola (x2)
  M’nyifwa yira pa mphinjika kuti tiŵe na umoyo. (x2)
  `
    },

  '48': {
      title: 'Pakuryapo Chingwa',
      number: '416',
      lyrics: `
  Music by D.R.K. Mwakasungula

  1. Bass: Pakuryapo chingwa ichi
  All: Pakuryapo chingwa ichi
  Pakuryapo chingwa ichi
  Ujinyumwenge wamwene

  2. Bass: Thupi laYesu ndakofya.
  All: Thupi laYesu ndakofya.
  Thupi laYesu ndakofya.
  Ujinyumwenge wamwene.

  3. Bass: Pakumwapo nkhombo iyi.
  All: Pakumwapo nkhombo iyi.
  Pakumwapo nkhombo iyi.
  Ujinyumwenge wamwene.

  4. Bass: Ndopa za Yesu nzakofya.
  All: Ndopa za Yesu nzakofya.
  Ndopa za Yesu nzakofya.
  Ujinyumwenge wamwene.

  5. Bass: Tilengereni Lusungu.
  All: Tilengereni Lusungu.
  Tilengereni Lusungu.
  Yesu mwana wa Chiuta.
  `
    },

  '28': {
      title: `M'ngandiruwanga`,
      number: '417',
      lyrics: `
  (Pass me not, O gentle Saviour)
  F.J. Crosby & W.H. Doane

  1. M'ngandiruwanga Mponoski, nkhumuŵeyani, 
  Para mukuchema ŵanji mundikumbuke.
  Yesu, Yesu, Munditumbike, para mukuzgora ŵanji, mundikumbuke

  2. Nkhujikama pasi pinu m'ndizomerezge, 
  Nadi ndine wakwananga, m'ndipokerere.

  3. Nkhutamira imwe Yesu ntha nkhwenerera, 
  Mwe muchizge Mzimu wane mundiponoske.

  4. Ndimwe mbwiwi ya Chimwemwe, cha moyo wane, 
  Ntha nkhukhumbaso munyake, ndine wa imwe.
  `
    },

  '22': {
      title: 'Kasi Ukukhumba Chiponosko',
      number: '418',
      lyrics: `
  (There is power)
  L.E. Jones

  1. Kasi ukukhumba chiponosko, muli nkhongono m'ndopa zake, 
  Ukukhumba kureka kwananga, nkhongono ziri m'ndopazo.
  Muli nkhongono m'ndopa zake za mwana mberere,
  Muli nkhongono m'ndopa zake za mwana'yo wa mberere.

  2. Makhumbo gha mcharu ghangamara, muli nkhongono m'ndopa zake,
  Zanga utozgeke pa Kalvari, muli nkhongono m'ndopazo.

  3. Ukukhumba kutowa kwenecho, muli nkhongono m'ndopa zake, 
  Kwananga kukusukika nadi nkhongono ziri m'ndopazo.

  4. Kuti ufike kumteŵetera, muli nkhongono m'ndopa zake, 
  Kuti um'chindike nyengo zose, nkhongono ziri m'ndopazo.
  `
    },

  '60': {
      title: 'Vyose Vikumara',
      number: '419',
      lyrics: `
  Mrs. J.C. Bonar & T.E. Perkins

  1. Vyose vikumara, Yesu ngwane
  Tikupatukana, Yesu'yo ngwane
  Mcharu muli chisi, mutende mulije
  Yesu ngwalusungu wakundithaska.

  2. Mwe mungayezganga, Yesu ngwane
  Niŵenge mwake swi, mwa Yesu wane 
  Vyose vyamucharu, nadi vizam'mara
  Muvitaye vyose, Yesu'yo ngwane.

  3. Nkhujighanaghana Yesu ngwane,
  Nkhumanyiska nadi, Yesu'yo ngwane
  Ivyo nachitanga vyanguŵa vyawaka,
  ndakhorwa mwa Fumu, Yesu'yo ngwane.

  4. Wamara umoyo, Yesu ngwane
  Zanga we chiuka, Yesu'yo ngwane
  Zanga m'bwezi wane, zanga upumule
  Eya! Mthaski wane Yesu'yo ngwane.
  `
    },

  '20': {
      title: 'Ka Mwaruta Kwa Yesu?',
      number: '420',
      lyrics: `
  Rev. E.A. Hoffman

  1. Ka mwaruta kwa Yesu kutozgeka ka mwatozgeka m'ndopa zake?
  Ka mwagomezga mu uchizi wake ka mwatozgeka m'ndopa zake?
  Mwatowa mundopa, m'ndopa'zo za mwana mberere
  Ka mwatoweskeka m'mitima yinu m'ndopa'zo za mwana mberere.

  2. Ka mazuŵa ghose mukwenda nayo ka mwatozgeka m'ndopa zake?
  Nyengo zose mkupumula mwa Yesu ka mwatozgeka m'ndopa zake.

  3. Para wakwiza mwamvwala vituŵa, kutozgeka na ndopa zake
  'Moyo winu kasi wanozgekera, towaninge mu ndopa zake.

  4. Mtaye Malaya ghinu ghakubinkha ka mwatozgeka m'ndopa zake
  Chiziŵa chakubiramo ŵaheni, towaninge mu ndopa zake.
  `
    },

  '41': {
      title: `Ng'anga yikulu`,
      number: '421',
      lyrics: `
  Anonymous

  1. Ng'anga yikulu ndiyo Yesu, mwana wa Chiuta, 
  Msanguruski wa ŵavitima, nadi ngwalusungu.
  Zina la Yesu ndakunozga, kulije zina linyakeso, 
  lakuruska zina lake, Yesu inya Yesu.

  2. Zakwananga wagowokera, Yesu ngwakutemwa, 
  Tendenge pamoza na iyo, tisuke tifike.

  3. Nkhugomezga pa zina lake, zina lake Yesu,
  Ine nkhutemwa zina lake, zina lake Yesu.

  4. Mwaŵarara imwe zaninge, ŵana namwe zani, 
  Yesu ndiyo wakumchemani zomerani mose.
  `
    },

  '45': {
      title: 'Nkhutemwa Kupulikira',
      number: '422',
      lyrics: `
  Anonymous

  1. Nkhutemwa kupulikira Chiuta
  Para nkhuromba wakundipulika
  Para nkhuchemerezga wakukhazga
  Wakundovwira wakundiponoska

  2. Chiuta wane nadi ngwalusungu
  Iyo ndi mtuŵa mtima ndi muweme
  Ŵakudindiŵala wakuŵakhozga
  Kwenjerwa kose wakumazga nadi

  3. Mtima wane zanga upumulenge
  Wakuchitira viwemi Yehova
  Wasezga nyifwa nadi na masozi
  Wakwenda nane para nagongowa

  4. Nchichi ndiyiwezgere Fumu Yane
  Paviwemi vyose yandichitira
  Chiponosko chake ine nkhuwonga
  Vyose nkhapangana ndimpenge nadi

  5. Nyifwa ya ŵatuŵa yikumunozgera
  Wakuŵapokerera m'nyumba yake
  Fumu ndamuzga winu nkhupereka
  Umoyo wane kwa imwe Chiuta
  `
    },

  '36': {
      title: 'Nako Nkhunozga',
      number: '423',
      lyrics: `
  Rev. C.C. Mhango

  1. Nako nkhunozga kwa mazgu ghinu Chiuta
  Ghakunowa para ghanjiramo mumtima.
  Ghakundisanguruska ghakundikhozga nadi
  Yowoyani sono mtisambizge a Mzimu.

  2. Para mwayowoya nkhusanga mtende nadi.
  Para mwandichenya nkhuponoskeka nadi.

  3. Mazgu ghinu ndi nyali ku malundi ghane
  Para nkhurondezga nkhuwusanga umoyo.

  4. Yowoyani Fumu ndipulike ndipone
  Mundiwezge ku viyezgo vya muno m'charu.

  5. Satana mwe wakuchimbirako kwa ine
  Para wawona mazgu ghinu m'kati mwane.
  `
    },

  '8': {
      title: 'Charu Nkhwithu Chara',
      number: '424',
      lyrics: `
  Anonymous

  1. Charu nkhwithu chara, nkhujumphamo waka,
  vyuma vyane vyose vili mwe kuchanya
  Ŵangelo ŵakuti nadi ndirutenge 
  charu'mwe chapasi nadi nkhwithu chara.
  Yesu ndimwe mubwezi muweme, 
  ndilije kukaya kuruska kuchanya
  Wakundicheuzga, m'ryango wakuchanya, 
  charu'mwe chapasi nadi nkhwithu chara

  2. Ŵakundilindizga, ichi nkhuchimanya, 
  ndiri kuphemana nayo Yesu wane,
  Ndamporota vyose, pamoza na iyo,
  charu'mwe chapasi nadi nkhwithu chara.

  3. Mama wadangira, mura m'uchindami,
  nkhukhumba kukora chasa chake nadi
  Wakundirindizga pa m'ryango kuchanya,
  charu'mwe chapasi nadi nkhwithu chara.

  4. Mura m'uchindami tamkhalilira swi,
  ŵatuŵa ŵakwimba kuti ŵarwa nadi
  Sumu zakunozga zamkupulikikwa,
  charu'mwe chapasi nadi nkhwithu chara.
  `
    },

  '52': {
      title: 'Rombanga',
      number: '425',
      lyrics: `
  Anonymous

  1. Rombanga na mulenje, rombanga na mhanya,
  rombangaso na mise kweniso usiku,
  ghanaghana viwemi uruwe vya m'charu,
  rombanga ku udesi jikama mu nyumba.

  2. Ukumbuke ŵabale na ŵakutemweka
  Urombere ŵarwani para uli nawo
  Urombe kwa Chiuta wati wakovwire
  Usange ukuromba rombera mwa Yesu.

  3. Usange watondeka kuromba pawekha,
  maghanoghano ghako ghaŵenge ghawemi,
  Usange urombenge mumutima wako,
  Vyose vyayamkufika kura kwa Chiuta.
  `
    },

  '53': {
      title: 'Teŵeta Na Lwana Lose',
      number: '426',
      lyrics: `
  Anonymous

  1. Teŵeta na lwana lose
  Teŵeta mwa khumbo lake
  Ndimo Yesu wakendamo
  Kasi iwe ukukana?

  2. Kuteŵeta kwako nganya
  Njombe yiriko kuchanya
  Viwongo vya ŵanthu nvyachi
  Wakuwongenge n'Chiuta

  3. Teŵetanga na muhanya
  We chisi chiri pafupi
  Teŵeta ukata yayi
  Uwovwirenge ŵanyako

  4. Mbanandi ŵafwa mu chisi
  Ŵambura na chigomezgo
  Sono nyamura ndembera
  Ŵa mu chisi ŵayiwone.

  5. Teŵetani na kufwasa
  mwamkukhara mu mutende
  Para Yesu wakuchema
  Zanga kuno mwana wane.
  `
    },

  '23': {
      title: 'Kuli Chikaya Cha Vyose',
      number: '427',
      lyrics: `
  Anonymous

  1. Kuli chikaya cha vyose, chituŵa! Chituŵa!
  Icho nchambura na suzgo, chituŵa! Chituŵa!
  Zisumu'zo zikwimbika ni za zinthumi zituŵa,
  Zinyumba nazo nziwemi, zituŵa! Zituŵa.

  2. Na visuzgo ntha virimo, mura mwe! Mura mwe!
  Masozi nagho mulije, mura mwe! Mura mwe!
  Ŵakumwa maji gha moyo ŵakumwona Yesu waŵo,
  Na uweme wake wose, mura mwe! Mura mwe!

  3. Nanga uli'se tananganga, tirute! Tirute!
  Wayamukutipokerera, tirute! Tirute!
  Tikagezemo mwa Yesu, ndiyo wamkutitoweska,
  Yesu wakafwira ise, tirute! Tirute!
  `
    },

  '24': {
      title: 'Kuli Chikaya Chituŵa',
      number: '428',
      lyrics: `
  J.B. Dykes

  1. Kuli chikaya chituŵa, chikaya cha moyo,
  uko chisi ntha chiliko, nthendaso kulije.

  2. Uko kuli na chiziŵa cha muyirayira,
  nyifwa ndi jambuko lithu la kwambukirako.

  3. Uko chiliko chikaya ku sirya la kura,
  Tikufika pa jambuko, na kulaŵiskako.

  4. Ŵanyakhe mbofi chomene, ŵakopa kwambuka,
  ŵakofiwa na kaŵiro, ka muronga wura.

  5. Tingawereranga nyuma, kweni tambukenge,
  tisuke tikafikeko, ku charu cha wumi.

  6. Mwe tiyane na Moses munthu wa Chiuta,
  wakawonako kusirya nase tiruteko.
  `
    },

  '15': {
      title: 'Fumu Yikusungilirenge',
      number: '429',
      lyrics: `
  J.E. Rankin & W.G. Tomer

  1. Fumu yikusungirirenge, mpaka tizakakumane;
  yikurongozgenge iwe, Fumu yikusungirirenge.
  Tisuke tisuke tizakakumane mwa Yesu,
  tisuke tisuke, Fumu yikusungirirenge.

  2. Fumu yikusungirirenge, yikufukatire iwe;
  yikurere m'yirayira, Fumu yikusungirirenge.

  3. Fumu yikusungirirenge, para wasanga urwani;
  yikufukatire iwe, Fumu yikusungirirenge.

  4. Fumu yikusungirirenge, yikutemwe nyengo zose;
  yisezge ŵofi na nyifwa, Fumu yikusungirirenge.
  `
    },

  '7': {
      title: 'A Yehova Vwirani',
      number: '430',
      lyrics: `
  Robert M. Banda

  1. A Yehova vwirani, ise tiri mu visuzgo,
  satana wachinanga charu chose na uheni.
  Mwe nadi mwe uyu Yesu ndiyo wakapayikika,
  mwe para pa champhinjika kutithaska taŵaheni.

  2. Ŵakamuyuzgayuzga, ŵa Yuda ŵakamhoyera,
  ŵakamutimba mapi kwa Pilato pa kweruzga.

  3. Yesu wakatitemwa, wakazomerezga kufwa,
  wakathiska na ndopa, mwakuti tiponoskeke.

  4. Wakalenga chitima, Yesu para pa mphinjika,
  kweni nkhwananga kwithu ndiko kukamupayika.

  5. Pakukumbuka nyifwa ya Muwomboli withu mwe,
  wakayowoya kuti mujilirire mwaŵene.

  6. Yesu mulije m'dindi, ŵamama ŵakayowoya
  wonani libwe nalo lasezgekapo pa dindi.

  7. Yesu uyo mkumwona wakukwerera m'maŵingu,
  ndipo wizamkwizaso ŵangelo ŵakayoŵoya.
  `
    },

  '17': {
      title: 'Ine Ndananga Dada',
      number: '431',
      lyrics: `
  Anonymous

  1. Ine ndananga Dada ndazgeŵera mu thondo,
  narya na vya satana, ndine mwana muheni.
  Nkhwiza kwa imwe Dada, m'ndipokerere;
  mundinjizge pa wumba winu wa ŵakutowa.

  2. Khumbiro la mu mtima, kudokera kwa maso;
  na zinchindi za mcharu ndivyo vyandinangiska.

  3. Nkhwiza kwa imwe Dada, mu mphinjika ya Yesu;
  m'ndilengere lusungu, m'ndipokerere Fumu.
  `
    },

  '43': {
      title: 'Nkhumuchindikani',
      number: '432',
      lyrics: `
  Anonymous

  1. Nkhumuchindikani mwe Fumu,
  pakuti mwandilengera lusungu.
  Nkhuchindika Fumu yane,
  yandithaska ku nyifwa ya muyaya.

  2. Kwambura imwe Yesu wane,
  nkhazgeŵa, nkhapuruka ndipo nkhafwa.

  3. Nkhaŵa muchisi na m'kwananga,
  na chiponosko nacho nkhaŵavyaso.

  4. Sono nkhumuŵeyani Dada,
  muŵe nane na kundisungilira.

  5. Viwongo vikukwana chara,
  vyakuti nimuwongerani Dada.
  `
    },

  '44': {
    title: 'Nkhuromba Mponoski',
    number: '433',
    lyrics: `
Darson Mkandaŵire

1. Nkhuromba Mponoski wane kuti ndiŵe nga ndimwe,
mwakuti muzimu winu wize waŵe mwa ine.
Mkumanya kaŵiro kane, na usauchi wane;
lekani nkhumurombani pulikani zgorani.

2. Nkhuromba Mponoski wane kuti ndipulikire;
ndimanye ukuru winu nakovwirika kwane.

3. Nkhuromba mwakujichefya kwa imwe ŵalusungu;
mwakuti ndizize mtima ndimuteŵeterani.
`
    },

  '9': {
      title: 'Chiuta Dada',
      number: '434',
      lyrics: `
  Joyo Nyirenda

  1. Chiuta Dada na Mwana na imwe a Mzimu Mtuŵa
  litumbikike jarawe lane.
  Ŵatatu njumoza pera ndimwe mwakubisamamo
  litumbikike mwe zina linu.

  2. Ine nkhuzomera nadi kuti ndiri wakwananga,
  A Yesu zani mundithaske.

  3. Yehova m'ngweruski wane, ndiposo na mponoski
  kasi ine ndopenge njani?

  4. Mwimbirani mwe Yehova, imwe mwaŵatuŵa ŵake
  thuŵuskani kaŵiro kake.
  `
    },

  '12': {
      title: 'Fumu Ndi Muliska',
      number: '435',
      lyrics: `
  Mjura Mkandaŵire

  1. Fumu ndi muliska ntha nditopenge
  nkhumugomezga ntha nkhopaso.
  Nditisankhenge Yesu
  Ndiyo wanganditorera ku kaya.

  2. Baraba munkhungu ŵa kamsutura
  Yesu Khristu ŵa kampayika.

  3. Kwambura Chiuta waŵusa m'charu,
  muŵuso ŵose mwe ngwa waka.

  4. Fumu ndi muthaski wamtiponoska,
  gomezgani'mwe mwamthaskika.
  `
    },

  '29': {
      title: 'Mazgu Ghinu Fumu',
      number: '436',
      lyrics: `
  Loudon B. Mwanyongo

  1. Mazgu ghinu Fumu ghakundipa umoyo,
  nanga ndi m'visuzgo ghakundipa nkhongono,
  chitima chikumara na wofi nawo ukumara.

  2. Nako nkhutemwa kwa Fumu kwakuzizwiska,
  ndiriwakwananga nanga mukunditemwa,
  ine mukandifwira mwakuti ndiŵenge wa moyo.

  3. Na nchindi zose nkhwizaso kwa imwe Yesu,
  mukathaska ine ku nyifwa ya muyaya,
  Yesu nkhum'ŵeyani mkharenge mwa ine kwa ndanda.
  `
    },

  '51': {
      title: 'Penjaninge Yehova',
      number: '437',
      lyrics: `
  Mr. P.F.K. Zgambo & Mr. G. Ngwendu

  1. Penjaninge Yehova apo iyo wangasangika
  Mwe chemani kwa iye apo wachari pafupi chemani mwe.
  Wakwananga waside nthowa zose ziheni 
  wawerere kwa Yehova ngwa lusungu.

  2. Yehova withu wakuti mwe maghanoghano ghinu 
  Kuti ndi ghane chara panji nthowa zinu pera nzane chara.

  3. Mitambo na maghanoghano, umo viliri kuchanya
  Kucharu ndimo ziriri nthowa zane kwakuruska zinu.
  `
    },

  '55': {
      title: 'Tikuwonga Ŵa Chiuta',
      number: '438',
      lyrics: `
  Mr. P.F.K. Zgambo

  1. Tikuwonga ŵa Chiuta pa ivyo mwat'chitira
  mwatifiska m'chaka chino, mwe yewo Chiuta.
  Ŵabale ŵithu ŵandanjiremo
  m'chaka chipya'chi mchaka chipya'chi
  ise mwatiwona vichi, ipo pali kanthu.

  2. Tatuka tanyoza ŵanyithu, tapereka chitima,
  taloŵera na kwenda bweka, tangwenera kufwa.

  3. Tambeko mlimo upya, pakwenda mcharu chino,
  kuti imwe a Chiuta, mukondwere nase.
  `
    },

  '31': {
      title: 'Munthu Watiwasidenge',
      number: '439',
      lyrics: `
  Mr. P.F.K. Zgambo

  1. Munthu wati wasidenge ŵawiske na ŵanyina
  Kuya kademerera kumwanakazi wake.
  Icho iyo Chiuta wagumanya
  munthu wangayezganga kuti wa paturanye

  2. Nthengwa nja ŵanthu ŵaŵiri aŵa ŵiza pamoza
  kuŵa nga n'thupi limoza mwa Yesu Khristu Fumu.

  3. Mwaŵaŵiri 'mwe sono mwatorana mu Fumu,
  mu suzgo na mum'tende chemani Fumu Yesu.

  4. Mwa ŵaKhristu muliso na urato m'nthengwa'yi,
  kurombera nthengwa'yi, satana watondeke.
  `
    },

  '13': {
      title: 'Fumu Yakutemwa Yikuchema',
      number: '440',
      lyrics: `
  Anonymous

  1. Fumu yakutemwa yikuchema
  yikuti zanga wa mwana wane
  wona ndakunozgera chakurya
  nchakupa mkhuto wa myirayira.
  Eh! Nadi wanozga Gome
  pali chingwa ndiposo na vinyo
  Ndivyo thupi na ndopa'zo
  Nkhuthaskikira mumkhuto wake.

  2. Tiryeskeni ndipo timweskeni, 
  thupi linu pamoza na ndopa
  kuti tikathaskike muyaya, 
  na kuleka kuŵaso na njala.

  3. Mukayowoya na yura mama, 
  pa chisimi chira ku Sukare
  para umwenge maji kwa ine 
  wamkupulikaso nyota chara.
  `
    },

  '10': {
      title: 'Chiziŵa Cha Zura',
      number: '441',
      lyrics: `
  W. Cowper

  1. Chiziŵa chira chazura na ndopa za Yesu
  Aŵo ŵageza mwa icho ŵakutoweskeka
  ŵakutoweskeka
  ŵakutoweskeka
  Aŵo ŵageza mwa icho ŵakutoweskeka

  2. Chigeŵenga chikapona para pamphinjika
  nane ndibirenge mumo kuti nditaskike. (x3)

  3. Ndopa za Fumu Yesu mwe ziri na nkhongono
  zakuthaskira wakupulikana na iyo. (x3)

  4. Mchipulikano nawona mabamba gha Yesu
  nditi ndirumbenge iyo mpaka nyifwa yane. (x3)

  5. Myaya ndizamkwimba uko za nkhongono zake
  Zakuthaskira ŵaheni para ŵamzomera. (x3)
  `
    },

  '30': {
      title: 'Mbanjani Ŵavwara Vituŵa',
      number: '442',
      lyrics: `
  V. Thole

  1. Leader: Mbanjani awo
  All: Ŵakwimba (x3)
  Leader: ŵavwala vituŵa mwe
  All: kura kuchanya
  Eh! Ŵakwimba (x3)
  Kura kuchanya (x2)

  2. Leader: Imwe ndi aŵo
  All: Ŵafuma (x3)
  Leader: m'visuzgo vyakofya mwe
  All: muno mu charu
  Eh! Ŵakwimba (x3)
  Kura kuchanya (x2)

  3. Leader: Nase tamkwimba
  All: Tamkwimba (x3)
  Leader: Para tafumamo mwe
  All: muno mu charu
  Eh! Tamkwimba (x3)
  Kura kuchanya (x2)
  `
    },

  '61': {
      title: 'Ŵakamkhomera Yesu',
      number: '443',
      lyrics: `
  Mr. F. Chirwa

  1. Ŵakamkhomera Yesu para pa mphinjika
  Yesu ngwa moyo, Yesu ngwa moyo wawuka.

  2. Wizampenjachiso iwe Maria pano
  Ruta kaphare, Yesu ngwa moyo wawuka

  3. Mukuchimbirirankhu mwa ŵasambiri mwe,
  Yesu ngwa moyo, Yesu ngwa moyo wawuka.

  4. Wonani malo agho ŵakamugoneka,
  Yesu ngwa moyo, Yesu ngwa moyo wawuka.

  5. Wizengeso Yesu yura ŵakamukoma
  Yesu ngwa moyo, Yesu ngwa moyo wawuka.

  6. Wizenge pamo na ŵangelo ŵakuchanya
  Kweruzga charu, kweruzga charu chapasi.

  7. Yesu wizamtora ŵose aŵo mbatuŵa
  Ŵakumutemwa ŵamkhara nayo kuchanya
  `
    },

    '64': {
    title: 'Zaninge A Fumu',
    number: '444',
    lyrics: `
Anonymous

1. Zaninge a Fumu mwe zaninge zaninge a Fumu
zaninge a Fumu zaninge a Fumu zaninge a Fumu

2. Laŵiskani ise taŵaheni, laŵiskani ise,
laŵiskani ise.

3. Sono tikuromba, tikuromba, sono tikuromba,
tikuromba imwe.

4. Tumizgani Mzimu mumutume, tumizgani Mzimu,
tumizgani Mzimu.

5. Tumizgani moto muwutume, tumizgani moto,
tumizgani moto.

6. Wotche viheni mukati mwithu, uwotche viheni,
Uwotche viheni

7. Kuti tiŵe ŵinu tiŵe ŵinu kuti tiŵe ŵinu,
kuti tiŵe ŵinu.

8. Khristu Fumu Nkhoswe Mthaski wane Muponoski wane,
Muponoski wane.
`
    },

  '50': {
      title: 'Pamphinjika Mthaski Wakafwa',
      number: '445',
      lyrics: `
  Anonymous

  1. Pamphinjika mthaski wakafwa
  Ndopa zake zikunisuka
  Mtima wane ndopa zatozga 
  Zina la'chindami.
  La uchindami, la uchindami
  Mtima wane ndopa zatozga
  Zina la'chindami.

  2. Ndathaskika kwakuziziswa
  Yesu wali mumtima wane,
  Wakatondera pa mphinjika
  Zina la'chindami.

  3. Chiziŵa cha ndopa za Yesu
  Chikusuka mtima uheni
  Ine ndatoweskeka nacho 
  Zina la'chindami

  4. Zanga mheni kuchiziŵa,chi
  Ŵika moyo wako kwa mthaski,
  Utowenge m'ndopa za Yesu
  Zina la'chindami.
  `
    },

  '26': {
      title: 'Kuŵamkhristu',
      number: '446',
      lyrics: `
  Anonymous

  1. Kuŵa mkhristu mtima wane nkhudoka
  Kuŵa mkhristu mtima wane nkhudoka
  Mtima wane mtima wane
  Kuŵa mkhristu mtima wane nkhudoka.

  2. Nkhung'anamuka mumtima ng'anamu
  Nkhung'anamuka mumtima ng'anamu
  Mtima wane mtima wane
  Nkhung'anamuka mumtima ng'anamu

  3. Nkhumwemwetera mumtima mwe mwe mwe
  Nkhumwemwetera mumtima mwe mwe mwe
  Mtima wane mtima wane 
  Nkhumwemwetera mumtima mwe mwe mwe.

  4. Ndadumura mumtima kumrondezga
  Ndadumura mumtima kumrondezga
  Mtima wane mtima wane
  Ndadumura mumtima kumrondezga.
  `
    },

  '32': {
      title: 'Murongozgi Wa Ulendo Wa Moyo',
      number: '447',
      lyrics: `
  Anonymous

  1. Murongozgi wa ulendo wa moyo zina lake Yesu
  Wakurongozga makora makora kuruta kuchanya
  Para nthowa yane yikandisoŵa wakandirongora
  Waningweruskira vya kunikhazga wavimbininiska.

  2. Para nkhwenda mu ulendo wa moyo wali nane mfupi
  Nanga viheni vikundizingizga,Yesu wali nane
  Para umoyo wukukweŵeskeka, wakundizikiska
  Wakundirongora nthowa ya 'moyo nakundisangwiska.

  3. Para nkhwenda munthowa 'zo zakofya, Yesu wali nane
  Para ŵarwani ŵakupenja ine wakuŵa pafupi
  Wakunibisa, kunivikirira, nakunipamphuska,
  Na lusungu lwakunozga, wathaska nakunitchinthiska.

  4. Ndayamkwambuka muronga wa nyifwa ulendo wamara
  Ndayamkuwoneka kwakungweruka namkuwona Fumu
  Moyo wane wampumura na kusekerera mwa Yesu
  Ndamkhara mumtende muyirayira pamoza na Fumu.
  `
    },

  '37': {
      title: 'Nakukondwa Timrumbe',
      number: '448',
      lyrics: `
  B. Milgrove

  1. Nakukondwa timrumbe, ngwa lusungu Chiuta.
  Tithuwuske zinalo iyo ndiyo Yehova.

  2. Nankhongono zikuru, wakangweruska charu.

  3. Wakaŵa na lusungu, na mura mumapopa.

  4. Wakulaŵiska vyose mu umoyo wa sono.

  5. Wakuviliska vyose, na woko la nkhongono.

  6. Nakukondwa timrumbe, ngwa lusungu Chiuta.
  `
    },

  '59': {
      title: 'Vitumbiko Virimo',
      number: '449',
      lyrics: `
  Petros M. Mkandaŵire

  1. Vitumbiko virimo mwe muwoko la ŵa Dada,
  Virikwizira ŵa m'charu; ŵasange tumbiko.
  Zaninge mose mwa ŵanthu, kwa Yesu Mponoski withu,
  Mupokere chipumulo, para mwiza kwake.

  2. Vitumbiko viriko mwe kura kwa Yehova,
  Vikurindirira wose ŵapoke thumbiko.
  Vikusangika nadi' mwe ku aŵo ŵiza kwa Yesu,
  Vikuwoneka nadi 'mwe ku aŵo mbarunji.

  3. Ndinjani mupi thumbiko'lo, ndi Yesu Mponoski
  Ndilo woko la Chiuta, kufuma ku chanya.
  Vikusangika chara nadi ku aŵo mbakwananga
  Vikusangika chara mwe ku aŵo mbasovyi.

  4. Vitumbiko vyam'soŵa mwe, para mukwananga,
  Vyamchimbira nga maŵingu, kwambura chiteku.
  Ŵam'kusokwa ŵakwananga, nakutayika kuwaro,
  Ŵamukukhumba chipumulo kwambura kusanga.
  `
    },

  '33': {
      title: 'Mwa Ŵanthu Mose Tiwongenge Chiuta',
      number: '450',
      lyrics: `
  Petros M. Mkandaŵire

  1. Mwa ŵanthu mose tiŵongenge Chiuta withu,
  Vyose tirinavyo virikufuma kwa Iye.
  Nkhanthu wuli tingamupa,
  Kuŵa iyo mwene vyose,
  Tipereke mitima yakupera ku viheni.

  2. Mendero ghithu ghose ngambura na kwenera,
  Chifukwa tirije Yesu Mponoski m'mitima.

  3. Chiuta uyo sono tikumkayikira,
  Mwa Iyo yekha pera ndimo muli umoyo.

  4. Milimo yithu yose yikondweske Chiuta,
  Para yakwana nyengo tamkupoka umoyo.

  5. Tiyeni ise tose na vyose tirinavyo,
  Tivithure vyose kwa Chiuta uyo nvyakhe.
  `
    },

  '40': {
      title: 'Ndopa Za Yesu',
      number: '451',
      lyrics: `
  Petros M. Mkandaŵire

  1. Ndopa za Yesu zathika pa charu chose chapasi,
  Kuti ŵaheni ŵatowe ku uheni ŵose.

  2. Tiyeni tose timwenge nzituŵa zathika nadi,
  Nadi tiŵenge ŵatuŵa ku uheni wose.

  3. Nyifwa ya Yesu ndi mwaŵi kwa ise tose ta ŵanthu,
  Tikafwanga ndise nadi kwambura nyifwa'yo.

  4. Tiyeni tiwonge Fumu Chiuta mulengi withu,
  Pakuti watiponoska mu ndopa za Yesu.

  5. Marumbo, nchindi kuwonga vikwenera kwa Chiuta,
  Pakutuma Fumu Yesu kwiza katifwira.
  `
    },

  '56': {
      title: 'Tiri Pa Ulendo',
      number: '452',
      lyrics: `
  Petros M. Mkandaŵire

  1. Tiri pa ulendo ise;
  Kuruta ku chanya kwa Chiuta,
  Tam'wonanga Fumu Yesu,
  Nakurumba iyo kwa myaya swi.
  Tam'mwimbira sumu;
  Na kuwonga Iyo,
  Tamkusekera kuŵa nayo 'mwe.

  2. Warumbike ndi Yehova; 
  Imwe mkatuma Yesu Mponoski,
  Nthowa ya'nenesko ndimwe,
  Nakufika ku 'moyo wa ndanda.

  3. Vitumbiko vya mucharu;
  Ncheruzgiro cha ivyo tampoka,
  Vya m'charu vikuchekura;
  Vikuvunda ndiposo kwibika.

  4. Mzimu mtuŵa ndiyo nyali;
  Kutingweruskira nthowa iyo;
  Yakurata kwa Mponoski,
  Mupi umoyo wa m'yirayira.

  5. Para tafika ku chanya;
  Tampoka mphumphu'yo ya umoyo,
  Tam'ŵara nga zinyenyezi;
  Tam'ŵaso chikozgo cha Chiuta.

  6. Tam'poka 'moyo wandanda;
  Kwa Yesu uyo ndi mtonda nyifwa;
  Nyifwa nayo tam'yiruwa;
  Chifukwa tamkuŵa na umoyo.
  `
    },

  '18': {
      title: 'Ise Tikupenja Imwe',
      number: '453',
      lyrics: `
  Anonymous

  1. Ise tikupenja imwe wakuzikiska mitima
  Yesu kwimba kwithu kose nkhwakukwezga zina linu
  Mukasida uchindami kwiza nadi muno m'charo
  Kutiponoska ku wuzga, kusutula ŵanthu ŵinu

  2. Lusungu lwinu a Yesu, mukakhira kwiza m'charo
  Taŵanthu ŵakavu nadi, soka mukatisezgera
  Ndopa na masozi ghinu, mukathiska m'Getsemane
  Kunozgera ise nthowa, yakurutira kuchanya

  3. Mtima winu ukasweka, nakutombozgeka kwinu
  Ukali wake Chiuta, ukamalira pa imwe
  Nkhombo'yo yakofya nadi, mukamwapo pamphinjika
  Apo mukazomerezga, kutifwira pamphinjika

  4. A Yesu ndimwe umoyo, chuma chithu chakuruska
  Nadi para pamphinjika, umoyo mukapereka
  A Yesu tikumtemwani, Ndimwe mwenecho wa vyose
  Na mitima na milomo, tikumchindikani tose
  `
    },

  '27': {
      title: 'Laŵiska Pa Mphinjika',
      number: '454',
      lyrics: `
  Anonymous

  1. Laŵiska pamphinjika usange umoyo
  Inya nadi umoyo wandanda
  Wakwananga iwe laŵiska kwa Yesu'yo
  Wakafwa kuponoska iwe
  Wona wona wona 'we, kuli njombe kwa uyo wazomera Yesu
  Wakatifwira pamphinjika

  2. Pamphinjika Yesu wakaponoska ise
  Ku mulandu wa kwananga kwithu
  Ndopa'zo zikathika kuponoska tose 
  Chiponosko chafika nadi.

  3. Vyose vikutondeka kugula umoyo
  Kweni ndopa za Yesu mponoski
  Gomezga mwa Chiuta wankhongono zose
  Watozgenge iwe mu mtima

  4. Mlimo wose ukafiskika pamphinjika
  Wakuponoska mizimu yithu
  Iwe zanga kwa iyo na Chimwemwe chose
  Usange umoyo wandanda
  `
    },

  '16': {
      title: 'Imwe Mose Mwasuzgika',
      number: '455',
      lyrics: `
  Anonymous

  1. Imwe mose mwasuzgika, Yesu wali pafupi
  Mmaso mwazura masozi, zaninge kwa Yesu'yo.
  Yesu wana lusungu, nadi wakamfwirani
  nadi wakamfwirani

  2. M'bwezi muweme ndi Yesu, wakumtemwani nadi
  kasi muchali kukana, zgokani mumzomere

  3. Nyifwa'mwe yaneng'enera, dindi liri pafupi
  Sono ni nyengo yiwemi, mzomerani Yesu'yo.

  4. Ŵangelo ŵalulutire, kuchanya kwa Chiuta
  kuti yunji wazomera, kurondezga Yesu'yo.
  `
    },

  '46': {
      title: 'Nchichi Chingatozga Ine',
      number: '456',
      lyrics: `
  Rev. R. Lowry

  1. Nchichi chingatozga ine, n'ndopa'zo za Yesu Pera
  Nchichi chingandinyoroska n'ndopa'zo za Yesu pera
  M'ndopa zake Yesu, nkhusukika nadi
  khumbo lane lose n'ndopa'zo za Yesu pera.

  2. Icho nkhukhumbiska ine, n'ndopazo za Yesu Pera
  Kugowokereka kwane, n'ndopa'zo za Yesu pera.

  3. Vyose vingafiska chara, n'ndopa'zo za Yesu pera
  Milimo yane njawaka, n'ndopa'zo za Yesu pera.

  4. Chigomezgo chane chose, n'ndopa'zo za Yesu pera
  Kutowa kwa mtima wane, n'ndopa'zo za Yesu pera.
  `
    }
};

export default function HymnScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(id as string);
  
  const hymn = hymns[id as keyof typeof hymns];

  if (!hymn) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Hymn not found</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id as string);
    } else {
      addFavorite(id as string);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={styles.headerButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable 
                style={styles.headerButton} 
                onPress={toggleFavorite}
              >
                <Heart 
                  size={24} 
                  color={colors.primary}
                  fill={favorite ? colors.primary : 'none'}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.hymnNumber, { color: colors.primary }]}>#{hymn.number}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{hymn.title}</Text>
        </View>

        <Text style={[styles.lyrics, { color: colors.text }]}>{hymn.lyrics}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  hymnNumber: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  lyrics: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    lineHeight: 28,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});