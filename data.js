// data.js
const DEFAULT_PAIRS = [
  { jp: "じゃぱぱ", romaji: "japapa" },
  { jp: "ヒロ", romaji: "hiro" },
  { jp: "もふ", romaji: "mofu" },
  { jp: "なおきり", romaji: "naokiri" },
  { jp: "えと", romaji: "eto" },
  { jp: "うり", romaji: "uri" },
  { jp: "どぬく", romaji: "donuku" },
  { jp: "シヴァ", romaji: "shiva" },
  { jp: "たっつん", romaji: "tattsun" },
  { jp: "のあ", romaji: "noa" },
  { jp: "ゆあんくん", romaji: "yuankun" }
];

const IMAGE_MAP = {
  "じゃぱぱ": "images/jpapa.png",
  "ヒロ": "images/hiro.png",
  "もふ": "images/mofu.png",
  "なおきり": "images/naokiri.png",
  "えと": "images/eto.png",
  "うり": "images/uri.png",
  "どぬく": "images/dnq.png",
  "シヴァ": "images/siva.png",
  "たっつん": "images/tattsun.png",
  "のあ": "images/noa.png",
  "ゆあんくん": "images/yuankun.png"
};

const QUOTES = {
  "じゃぱぱ": [
    { jp: "ちょっと抜けてるムードメーカー兼頼れるリーダー", romaji: "chotto nuketeru mu-do me-ka- ken tayoreru ri-da-" },
    { jp: "おい　のあに近づくな", romaji: "oi noa ni chikazuku na" },
    { jp: "じゃあ動くか", romaji: "jaa ugoku ka" },
    { jp: "大丈夫俺らが絶対守る絶対触らせないから", romaji: "daijoubu orera ga zettai mamoru zettai sawarasenaikara" },
    { jp: "パイナップルは俺たちのものだ", romaji: "painappuru ha oretachi no mono da" },
    { jp: "これが社会だよ", romaji: "kore ga shakai da yo" }
  ],
  "ヒロ": [
    { jp: "おしとやかで恥ずかしがり屋なひつじ王子", romaji: "oshitoyaka de hazukashigariya na hitsuji ouji" },
    { jp: "なにこの渓谷みたいな渓谷 いや渓谷やないかい", romaji: "nani kono keikoku mitai na keikoku iya keikoku ya nai kai" },
    { jp: "俺のセリフに惚れちゃったってわけだよね", romaji: "ore no serifu ni horechatta tte wake da yo ne" },
    { jp: "ナイス", romaji: "naisu" }
  ],
  "もふ": [
    { jp: "おふざけも実は大好きなからぴちの頭脳", romaji: "ofuzake mo jitsu ha daisuki na karapichi no zunou" },
    { jp: "お前の意思は俺が受け継ぐ", romaji: "omae no ishi ha ore ga uketsugu" },
    { jp: "俺も推せ", romaji: "ore mo ose" }
  ],
  "なおきり": [
    { jp: "奇想天外な発想の持ち主 勇敢なみんなのお兄ちゃん", romaji: "kisoutengai na hassou no mochinushi yuukan na minna no oniichan" },
    { jp: "ぽぴぃ", romaji: "popii" },
    { jp: "これだからサバイバルはやめらんねーよ", romaji: "kore dakara sabaibaru ha yameran ne-yo" },
    { jp: "おいおいおい人の話ちゃんと聞けよ少年", romaji: "oi oi oi hito no hanashi chanto kike yo shounen" },
    { jp: "先生まあいいじゃん", romaji: "sensei maa ii jan" }
  ],
  "えと": [
    { jp: "すぐに手が出る楽観的サバサバガール", romaji: "sugu ni te ga deru rakkanteki sabasaba ga-ru" },
    { jp: "心は女かもしれないでしょ", romaji: "kokoro ha onna kamo shirenai desho" },
    { jp: "ママがだいちゅきなんだね", romaji: "mama ga daichuki nan da ne" },
    { jp: "もふくん後で殴るわ", romaji: "mofu kun ato de naguru wa" }
  ],
  "うり": [
    { jp: "おふざけ大好きな、からぴちイチのロマンチスト", romaji: "ofuzake daisuki na karapichi ichi no romanchisuto" },
    { jp: "俺と鬼のタイマンのようだな", romaji: "ore to oni no taiman no you da na" },
    { jp: "お口がキューティクルですね", romaji: "okuchi ga kyu-thikuru desu ne" },
    { jp: "後で捕まえに行っちゃうからねぇ", romaji: "ato de tsukamae ni icchau kara nee" }
  ],
  "どぬく": [
    { jp: "何事にも全力で素直なキツネと人間のハーフ", romaji: "nanigoto ni mo zenryoku de sunao na kitsune to ningen no ha-fu" },
    { jp: "あれビリか笑コッペパン", romaji: "are biri ka warau koppepan" },
    { jp: "俺は俺の責務を全うした", romaji: "ore ha ore no sekimu wo mattou shita" },
    { jp: "銅はどうだい", romaji: "dou ha dou dai" }
  ],
  "シヴァ": [
    { jp: "脱力感のある喋り方でみんなの心を癒す、からぴちのゆるキャラ", romaji: "datsuryokukan no aru shaberikata de minna no kokoro wo iyasu karapichi no yuru kyara" },
    { jp: "これで世界は救われた", romaji: "kore de sekai ha sukuwareta" },
    { jp: "これで終わりだ", romaji: "kore de owari da" },
    { jp: "みんなの思いを俺は受け継いでんだ", romaji: "minna no omoi wo ore ha uketsuindenda" },
    { jp: "見せ物ちゃうぞ", romaji: "misemono chauzo" }
  ],
  "たっつん": [
    { jp: "ボケもツッコミもできる厨二病の人気者", romaji: "boke mo tsukkomi mo dekiru chuunibyou no ninkimono" },
    { jp: "俺さ実は水の精霊なんだよね", romaji: "ore sa jitsu ha mizu no seirei nan da yo ne" },
    { jp: "ワタシゴリラ", romaji: "watashi gorira" },
    { jp: "騎士の石像だよ", romaji: "kishi no sekizou da yo" },
    { jp: "うちとにゃんにゃんする", romaji: "uchi to nyan nyan suru" }
  ],
  "のあ": [
    { jp: "甘いもの大好き心配性ふわふわガール", romaji: "amai mono daisuki shinpai shou fuwafuwa ga-ru" },
    { jp: "ウハウハだぁ", romaji: "uha uha dala" }
  ],
  "ゆあんくん": [
    { jp: "めんどくさがりだけど　誰よりも好奇心旺盛なわんぱくボーイ", romaji: "mendokusagari dakedo dare yori mo koukishin ousei na wanpaku bo-i" },
    { jp: "えとさん逃げて", romaji: "eto san nigete" },
    { jp: "かしこまりんりんです", romaji: "kashikomarinrin desu" },
    { jp: "俺たちの時間は ずれない", romaji: "oretachi no jikan ha zurenai" },
    { jp: "え　まってクリティカルワンパン女おる", romaji: "e matte kurithikaru wanpan onna oru" }
  ]
};
