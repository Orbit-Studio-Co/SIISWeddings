/* =====================================================================
   SIIS WEDDINGS — behaviour
   Vanilla JS, no dependencies.
   ===================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WA = '9647505100113';

  /* Unsplash URL helper */
  function u(id, w, h) {
    return 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w +
           (h ? '&h=' + h : '') + '&q=80';
  }

  /* ==================================================================
     1 — CONTENT DATA
     ================================================================== */

  var SERVICES = [
    { k: 'plan',   ico: 'calendar' },
    { k: 'photo',  ico: 'camera'   },
    { k: 'film',   ico: 'film'     },
    { k: 'decor',  ico: 'sparkle'  },
    { k: 'bridal', ico: 'dress'    },
    { k: 'dest',   ico: 'globe'    },
    { k: 'coord',  ico: 'clock'    },
    { k: 'floral', ico: 'flower'   }
  ];

  var ICONS = {
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    camera:   '<path d="M3 8.5h3l1.6-2.4h8.8L18 8.5h3v11H3z"/><circle cx="12" cy="13.5" r="3.9"/>',
    film:     '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M7 5v14M17 5v14M2.5 12h19"/>',
    sparkle:  '<path d="M12 2.5l2.2 6 6 2.2-6 2.2-2.2 6-2.2-6-6-2.2 6-2.2z"/><path d="M19 16.5l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z"/>',
    dress:    '<path d="M12 3.4a1.9 1.9 0 00-.7 3.7v1.5"/><path d="M12 8.6l7.8 5.7c1 .8.5 2.4-.8 2.4H5c-1.3 0-1.8-1.6-.8-2.4z"/>',
    globe:    '<circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.6 3.9 5.9 3.9 9.2s-1.3 6.6-3.9 9.2c-2.6-2.6-3.9-5.9-3.9-9.2S9.4 5.4 12 2.8z"/>',
    clock:    '<circle cx="12" cy="12" r="9.2"/><path d="M12 6.6V12l3.6 2.4"/>',
    flower:   '<circle cx="12" cy="12" r="2.6"/><path d="M12 9.4c0-2.6-1-4.4-2.6-4.4S6.8 6.4 6.8 8.2c0 2 2 3.4 5.2 3.8M12 14.6c0 2.6 1 4.4 2.6 4.4s2.6-1.4 2.6-3.2c0-2-2-3.4-5.2-3.8M9.4 12c-2.6 0-4.4 1-4.4 2.6s1.4 2.6 3.2 2.6c2 0 3.4-2 3.8-5.2M14.6 12c2.6 0 4.4-1 4.4-2.6S17.6 6.8 15.8 6.8c-2 0-3.4 2-3.8 5.2"/>'
  };

  var STORIES = [
    { k: 'garden',   img: 'photo-1469371670807-013ccf25f16a',
      gal: ['photo-1469371670807-013ccf25f16a','photo-1529636798458-92182e662485','photo-1522673607200-164d1b6ce486','photo-1487530811176-3780de880c2d','photo-1525258946800-98cfd641d0de'] },
    { k: 'ballroom', img: 'photo-1519167758481-83f550bb49b3',
      gal: ['photo-1519167758481-83f550bb49b3','photo-1522413452208-996ff3f3e740','photo-1519225421980-715cb0215aed','photo-1535254973040-607b474cb50d','photo-1487530811176-3780de880c2d'] },
    { k: 'mountain', img: 'photo-1532712938310-34cb3982ef74',
      gal: ['photo-1532712938310-34cb3982ef74','photo-1544078751-58fee2d8a03b','photo-1537633552985-df8429e8048b','photo-1546032996-6dfacbacbf3f','photo-1606216794074-735e91aa2c92'] }
  ];

  var PROCESS = [
    { k: 'consult', ico: 'clock'    },
    { k: 'plan',    ico: 'calendar' },
    { k: 'design',  ico: 'sparkle'  },
    { k: 'exec',    ico: 'film'     },
    { k: 'celeb',   ico: 'flower'   }
  ];

  var TESTIMONIALS = [
    { k: 't1', ava: 'photo-1494790108377-be9c29b29330' },
    { k: 't2', ava: 'photo-1544005313-94ddf0286df2'    },
    { k: 't3', ava: 'photo-1438761681033-6461ffad8d80' },
    { k: 't4', ava: 'photo-1580489944761-15a19d654956' }
  ];

  /* Portfolio — id, categories, caption key */
  var PORTFOLIO = [
    { id: 'photo-1519741497674-611481863552', cat: ['couples'],              k: 'p1'  },
    { id: 'photo-1546032996-6dfacbacbf3f',    cat: ['couples','outdoor'],    k: 'p2'  },
    { id: 'photo-1469371670807-013ccf25f16a', cat: ['decor','outdoor'],      k: 'p3'  },
    { id: 'photo-1460978812857-470ed1c77af0', cat: ['couples','bride'],      k: 'p4'  },
    { id: 'photo-1519167758481-83f550bb49b3', cat: ['reception','indoor'],   k: 'p5'  },
    { id: 'photo-1606800052052-a08af7148866', cat: ['groom'],                k: 'p6'  },
    { id: 'photo-1519657337289-077653f724ed', cat: ['bride','indoor'],       k: 'p7'  },
    { id: 'photo-1520854221256-17451cc331bf', cat: ['couples'],              k: 'p8'  },
    { id: 'photo-1487530811176-3780de880c2d', cat: ['decor'],                k: 'p9'  },
    { id: 'photo-1544078751-58fee2d8a03b',    cat: ['couples','outdoor'],    k: 'p10' },
    { id: 'photo-1509927083803-4bd519298ac4', cat: ['groom'],                k: 'p11' },
    { id: 'photo-1522413452208-996ff3f3e740', cat: ['reception','decor'],    k: 'p12' },
    { id: 'photo-1494955870715-979ca4f13bf0', cat: ['bride'],                k: 'p13' },
    { id: 'photo-1583939003579-730e3918a45a', cat: ['weddings'],             k: 'p14' },
    { id: 'photo-1529636798458-92182e662485', cat: ['decor','outdoor'],      k: 'p15' },
    { id: 'photo-1465495976277-4387d4b0b4c6', cat: ['groom'],                k: 'p16' },
    { id: 'photo-1535254973040-607b474cb50d', cat: ['reception','indoor'],   k: 'p17' },
    { id: 'photo-1532712938310-34cb3982ef74', cat: ['couples','outdoor'],    k: 'p18' },
    { id: 'photo-1595407753234-0882f1e77954', cat: ['weddings'],             k: 'p19' },
    { id: 'photo-1525258946800-98cfd641d0de', cat: ['decor'],                k: 'p20' },
    { id: 'photo-1537633552985-df8429e8048b', cat: ['couples','bride'],      k: 'p21' },
    { id: 'photo-1550005809-91ad75fb315f',    cat: ['bride','weddings'],     k: 'p23' },
    { id: 'photo-1591604466107-ec97de577aff', cat: ['weddings','couples'],   k: 'p25' },
    { id: 'photo-1519225421980-715cb0215aed', cat: ['reception','decor'],    k: 'p26' },
    { id: 'photo-1515934751635-c81c6bc9a2d8', cat: ['groom','decor'],        k: 'p27' },
    { id: 'photo-1606216794074-735e91aa2c92', cat: ['couples','outdoor'],    k: 'p29' },
    { id: 'photo-1478146896981-b80fe463b330', cat: ['bride'],                k: 'p30' }
  ];

  var CATS = ['all','weddings','couples','reception','outdoor','indoor','decor','bride','groom'];

  var GALLERY = PORTFOLIO.map(function (p) { return p.id; });

  var CINEMA = [
    { id: 'photo-1519741497674-611481863552', k: 'c1' },
    { id: 'photo-1537633552985-df8429e8048b', k: 'c2' },
    { id: 'photo-1519167758481-83f550bb49b3', k: 'c3' },
    { id: 'photo-1469371670807-013ccf25f16a', k: 'c4' },
    { id: 'photo-1532712938310-34cb3982ef74', k: 'c5' }
  ];

  var INSTA = [
    'photo-1460978812857-470ed1c77af0','photo-1520854221256-17451cc331bf',
    'photo-1465495976277-4387d4b0b4c6','photo-1606800052052-a08af7148866',
    'photo-1509927083803-4bd519298ac4','photo-1550005809-91ad75fb315f',
    'photo-1546032996-6dfacbacbf3f','photo-1544078751-58fee2d8a03b'
  ];

  var FAQ = ['q1','q2','q3','q4','q5','q6'];

  /* ==================================================================
     2 — TRANSLATIONS  (en · ku = Kurdish Badini · ar = Arabic)
     ================================================================== */
  var I18N = {
    en: {
      'a11y.skip':'Skip to content','pre.tag':'Luxury Wedding House','brand.sub':'Weddings',
      'nav.home':'Home','nav.about':'About','nav.services':'Services','nav.portfolio':'Portfolio',
      'nav.testimonials':'Testimonials','nav.process':'Process','nav.gallery':'Gallery',
      'nav.contact':'Contact','nav.faq':'FAQ','nav.cta':'Book Now',

      'hero.eyebrow':'Kurdistan · Luxury Wedding House',
      'hero.title':'Creating Weddings Worth Remembering Forever',
      'hero.sub':'Luxury Wedding Planning, Photography & Event Design in Kurdistan.',
      'hero.cta1':'Book Consultation','hero.cta2':'View Portfolio','hero.scroll':'Scroll',

      'about.eyebrow':'The House',
      'about.title':'For couples who expect nothing less than extraordinary',
      'about.p1':'SIIS Weddings creates timeless celebrations tailored for couples who expect nothing less than perfection.',
      'about.p2':'We transform dreams into unforgettable experiences through exceptional planning, luxury styling, breathtaking photography, and flawless execution.',
      'about.since':'Serving couples since',
      'about.pill1t':'Planning','about.pill1d':'Every hour designed, every detail rehearsed.',
      'about.pill2t':'Films & Photography','about.pill2d':'Cinematic storytelling with an editorial eye.',
      'about.pill3t':'Styling','about.pill3d':'Florals, light and space, composed as one.',
      'about.sig':'SIIS — Luxury Wedding House',

      'serv.eyebrow':'What We Do','serv.title':'A complete house of celebration',
      'serv.sub':'One team, one standard — from the first consultation to the final frame.',
      's.plan.t':'Wedding Planning','s.plan.d':'Full production of your day, from budget and timeline to the final rehearsal.',
      's.photo.t':'Photography','s.photo.d':'Editorial portraits and quiet, honest moments — finished in our signature grade.',
      's.film.t':'Videography','s.film.d':'Cinematic wedding films, shot and scored like a short feature.',
      's.decor.t':'Luxury Decoration','s.decor.d':'Venue transformations built around light, texture and scale.',
      's.bridal.t':'Bridal Styling','s.bridal.d':'Gown consultation, fittings, hair and beauty direction for the whole party.',
      's.dest.t':'Destination Weddings','s.dest.d':'Celebrations abroad, managed end to end with trusted local partners.',
      's.coord.t':'Event Coordination','s.coord.d':'A discreet team on the day so you never have to think about logistics.',
      's.floral.t':'Floral Design','s.floral.d':'Bouquets, installations and tablescapes designed in season.',

      'story.eyebrow':'Featured','story.title':'Wedding stories',
      'story.sub':'Three celebrations, three worlds — designed entirely around the couple.',
      'story.cta':'View Gallery',
      'st.garden.t':'Elegant Garden Wedding','st.garden.l':'Shaqlawa, Kurdistan',
      'st.garden.d':'Two hundred guests beneath old trees, an aisle of ivory roses, and a dinner that ran until the candles burned down. Built around one instruction: keep it soft.',
      'st.ballroom.t':'Royal Ballroom Reception','st.ballroom.l':'Erbil, Kurdistan',
      'st.ballroom.d':'A grand hall reimagined in gold and deep green — mirrored tables, a nine-metre floral run, and a first dance under two hundred candles.',
      'st.mountain.t':'Mountain Sunset Ceremony','st.mountain.l':'Rawanduz, Kurdistan',
      'st.mountain.d':'An intimate ceremony timed to the minute the sun cleared the ridge. Forty guests, one string quartet, and a valley turning gold behind them.',
      'st.chip1':'Planning','st.chip2':'Film','st.chip3':'Florals','st.chip4':'Photography',

      'port.eyebrow':'Portfolio','port.title':'Selected work','port.sub':'Tap any frame to view it full screen.',
      'cat.all':'All','cat.weddings':'Weddings','cat.couples':'Couples','cat.reception':'Reception',
      'cat.outdoor':'Outdoor','cat.indoor':'Indoor','cat.decor':'Luxury Decor','cat.bride':'Bride','cat.groom':'Groom',

      'proc.eyebrow':'The Journey','proc.title':'How we work',
      'proc.sub':'Five considered stages, from first conversation to last dance.',
      'pr.consult.t':'Consultation','pr.consult.d':'We meet, listen, and learn how you want the day to feel. No templates, no packages read from a list.',
      'pr.plan.t':'Planning','pr.plan.d':'Venue, budget, suppliers and a minute-by-minute timeline — all agreed and documented before anything is booked.',
      'pr.design.t':'Design','pr.design.d':'Mood boards, floral studies, colour and lighting plans. You approve the look before a single flower is ordered.',
      'pr.exec.t':'Execution','pr.exec.d':'Our team takes the build, the suppliers and the schedule. You get ready; we handle everything else.',
      'pr.celeb.t':'Celebration','pr.celeb.d':'You are present for every moment. We stay invisible, and the film and photographs arrive weeks later.',

      'stat.1':'Luxury Weddings','stat.2':'Happy Clients','stat.3':'Years Experience','stat.4':'Client Satisfaction',

      'test.eyebrow':'Kind Words','test.title':'From our couples',
      't1.q':'The most incredible wedding experience we could ever imagine.','t1.n':'Lana & Aram','t1.m':'Erbil · 2025',
      't2.q':'They turned our dream into reality.','t2.n':'Dilan & Rebin','t2.m':'Duhok · 2025',
      't3.q':'Absolutely flawless from beginning to end.','t3.n':'Sara & Hemin','t3.m':'Shaqlawa · 2024',
      't4.q':'Every detail was considered. We simply enjoyed our day.','t4.n':'Nma & Karwan','t4.m':'Sulaymaniyah · 2024',

      'gal.eyebrow':'Gallery','gal.title':'The archive','gal.grid':'Grid','gal.masonry':'Masonry',
      'grade.eyebrow':'Craft','grade.title':'The SIIS grade',
      'grade.sub':'Drag to compare the untouched capture with our finished cinematic grade.',
      'grade.before':'Raw','grade.after':'SIIS Grade',
      'c1':'First light, first look','c2':'The veil, unhurried','c3':'A hall dressed in gold',
      'c4':'An aisle of ivory','c5':'Where the valley turns gold',

      'ig.eyebrow':'Instagram','ig.sub':'Behind the scenes, film stills and details from the week.',
      'ig.cta':'Follow on Instagram',

      'faq.eyebrow':'Questions','faq.title':'Good to know',
      'faq.sub':'Anything else, our team is one message away.','faq.cta':'Ask on WhatsApp',
      'q1.q':'How early should we book?',
      'q1.a':'For peak season we recommend nine to twelve months ahead, as we take a limited number of weddings each year. Shorter timelines are often possible — ask us and we will tell you honestly what is available.',
      'q2.q':'Do you travel?',
      'q2.a':'Yes. We work across the Kurdistan Region and all of Iraq, and we take a small number of destination weddings abroad each year. Travel and accommodation are quoted transparently as a separate line.',
      'q3.q':'Can you customise packages?',
      'q3.a':'Every proposal is written from scratch after your consultation. You can book us for full production, for planning alone, or for photography and film only.',
      'q4.q':'How much does a wedding cost?',
      'q4.a':'It depends entirely on guest count, venue and the scale of the design. We will give you a clear, itemised figure after the first consultation, and we do not add anything to it later without your approval.',
      'q5.q':'Do you offer photography separately?',
      'q5.a':'Yes. Photography and film can be booked independently of planning, and are frequently our most requested service.',
      'q6.q':'When do we receive our photographs and film?',
      'q6.a':'A preview gallery arrives within one week. The full edited collection and your wedding film follow within six to eight weeks.',

      'cta.eyebrow':'Enquire','cta.title':"Let's begin your celebration",
      'cta.sub':'Share a few details and we will reply personally, usually within one day.',
      'f.name':'Full name','f.phone':'Phone','f.email':'Email','f.date':'Wedding date',
      'f.venue':'Venue or city','f.budget':'Budget','f.budget0':'Select a range',
      'f.budget1':'$10,000 – $20,000','f.budget2':'$20,000 – $40,000','f.budget3':'$40,000 – $70,000',
      'f.budget4':'$70,000+','f.budget5':'Not sure yet',
      'f.services':'Services of interest','f.serv1':'Full wedding production','f.serv2':'Planning & coordination',
      'f.serv3':'Photography & film only','f.serv4':'Decoration & floral design','f.serv5':'Destination wedding',
      'f.msg':'Tell us about your day','f.submit':'Send via WhatsApp',
      'f.note':'Your enquiry opens in WhatsApp so we can reply instantly.',
      'e.req':'This field is required','e.email':'Please enter a valid email','e.phone':'Please enter a valid phone number',
      'c.callus':'Speak to us','c.wa':'Book via WhatsApp','c.loc':'Erbil · Kurdistan Region, Iraq',
      'c.hours':'Studio hours','c.h1d':'Saturday – Thursday','c.h2d':'Friday','c.h2v':'By appointment',
      'c.hnote':'Consultations are held at our studio or by video call.',

      'foot.tag':'Luxury Wedding House — for couples who expect nothing less than extraordinary.',
      'foot.links':'Explore','foot.services':'Services','foot.news':'The Journal',
      'foot.newsSub':'Occasional letters on styling, venues and real weddings.',
      'foot.newsLabel':'Email address','foot.rights':'All rights reserved.',
      'foot.made':'Erbil · Kurdistan Region, Iraq',

      'sticky.cta':'Book Consultation',
      'modal.eyebrow':'Private Consultation','modal.title':'Reserve your date',
      'modal.sub':'Tell us the essentials — we will take it from there.',
      'cookie.txt':'We use a small number of cookies to remember your language and theme, and to understand how the site is used.',
      'cookie.yes':'Accept','cookie.no':'Decline',
      'toast.news':'Thank you — you are on the list.','toast.newsErr':'Please enter a valid email address.',
      'toast.wa':'Opening WhatsApp…',

      'p1':'Evening portrait','p2':'Golden hour','p3':'An aisle of ivory','p4':'Black & white',
      'p5':'The ballroom','p6':'The rings','p7':'The gown','p8':'Hands held','p9':'Centrepiece',
      'p10':'Coastline vows','p11':'Details','p12':'The table','p13':'The bouquet','p14':'Confetti',
      'p15':'Floral arch','p16':'The band','p17':'The cake','p18':'The valley','p19':'The exit',
      'p20':'Roses','p21':'Beneath the veil','p22':'The toast','p23':'The bride','p24':'Destination',
      'p25':'First dance','p26':'Tablescape','p27':'Gold & petals','p28':'Mr & Mrs','p29':'Under the palms','p30':'Bridal portrait'
    },

    ku: {
      'a11y.skip':'بچە بۆ ناوەڕۆک','pre.tag':'مالا زەماوەندێن لوکس','brand.sub':'زەماوەند',
      'nav.home':'سەرەکی','nav.about':'دەربارە','nav.services':'خزمەتگوزاری','nav.portfolio':'کارێن مە',
      'nav.testimonials':'بۆچوون','nav.process':'رێکا کارکرنێ','nav.gallery':'گەلەری',
      'nav.contact':'پەیوەندی','nav.faq':'پرسیار','nav.cta':'ژمارتن',

      'hero.eyebrow':'کوردستان · مالا زەماوەندێن لوکس',
      'hero.title':'زەماوەندێن هێژایی بیرهاتنێ بۆ هەتاهەتایێ',
      'hero.sub':'پلاندانانا زەماوەندێن لوکس، وێنەگرتن و دیزاینا بۆنان ل کوردستانێ.',
      'hero.cta1':'ژمارتنا شێورەکرنێ','hero.cta2':'دیتنا کارێن مە','hero.scroll':'خوارە',

      'about.eyebrow':'دەربارەی مە',
      'about.title':'بۆ وان جوتان یێن کو ژ نەبێتە ئاسایی چو ناخوازن',
      'about.p1':'SIIS Weddings بۆنێن بێ کات دروست دکەت، تایبەت بۆ وان جوتان یێن کو ژ تەمامیێ کێمتر ناخوازن.',
      'about.p2':'ئەم خەونان دگۆهورین بۆ ئەزموونێن نەهێتە ژبیرکرن، ب رێکا پلاندانانا تایبەت، ستایلا لوکس، وێنەگرتنا سەرنجڕاکێش و جێبەجێکرنا بێ کێماسی.',
      'about.since':'ژ خزمەتا جوتان ڤە',
      'about.pill1t':'پلاندانان','about.pill1d':'هەر دەمژمێرەک دیزاینکری، هەر وردەکارییەک تاقیکری.',
      'about.pill2t':'فیلم و وێنە','about.pill2d':'چیرۆکڤانیا سینەمایی ب چاڤەکێ هونەری.',
      'about.pill3t':'ستایل','about.pill3d':'گول، رۆناهی و جه، وەک ئێک هاتینە دانان.',
      'about.sig':'SIIS — مالا زەماوەندێن لوکس',

      'serv.eyebrow':'ئەم چ دکەین','serv.title':'مالەکا تەمام یا بۆنان',
      'serv.sub':'ئێک تیم، ئێک ئاست — ژ شێورەکرنا ئێکێ هەتا وێنەیا دویماهیێ.',
      's.plan.t':'پلاندانانا زەماوەندی','s.plan.d':'بەرهەمهێنانا تەمام یا رۆژا تە، ژ بودجە و کاتژمێرێ هەتا تاقیکرنا دویماهیێ.',
      's.photo.t':'وێنەگرتن','s.photo.d':'پۆرترەیێن هونەری و ساتێن راستەقینە — ب ستایلا مە یا تایبەت.',
      's.film.t':'ڤیدیۆگرتن','s.film.d':'فیلمێن زەماوەندی یێن سینەمایی، وەک فیلمەکێ کورت هاتینە گرتن.',
      's.decor.t':'خەملاندنا لوکس','s.decor.d':'گۆهورینا جهێ بۆنێ ل دویڤ رۆناهی، تێکست و مەزناهیێ.',
      's.bridal.t':'ستایلا بویکێ','s.bridal.d':'شێورەکرنا کراسی، پرووڤە، پۆر و جوانیێ بۆ هەمی خێزانێ.',
      's.dest.t':'زەماوەندێن دەرڤەیی','s.dest.d':'بۆنێن ل دەرڤەی وەلاتی، ب هەڤکارێن خۆجهی یێن متمانەپێکری.',
      's.coord.t':'رێکخستنا بۆنێ','s.coord.d':'تیمەکێ بێدەنگ ل رۆژا بۆنێ، دا تو قەت نەفکری ل کارێن تەکنیکی.',
      's.floral.t':'دیزاینا گولان','s.floral.d':'دەستەگول، دامەزراندن و خەملاندنا مێزان ل دویڤ وەرزی.',

      'story.eyebrow':'تایبەت','story.title':'چیرۆکێن زەماوەندی',
      'story.sub':'سێ بۆن، سێ جیهان — هەمی ل دویرگەها جوتێ هاتینە دیزاینکرن.',
      'story.cta':'دیتنا گەلەریێ',
      'st.garden.t':'زەماوەندێ باخچەیێ شیرین','st.garden.l':'شەقلاوە، کوردستان',
      'st.garden.d':'دووسەد ڤەخواندی ل بن دارێن کەڤن، رێکەکا گولێن سپی، و شێوەکا کو هەتا هەلاتنا مۆمان درێژ بوو.',
      'st.ballroom.t':'پێشوازیا هۆلا شاهانە','st.ballroom.l':'هەولێر، کوردستان',
      'st.ballroom.d':'هۆلەکا مەزن ب زێڕ و کەسکێ قویل هاتە نۆژەنکرن — مێزێن ئاڤێنەیی و ئێکەم سەما ل بن دووسەد مۆمان.',
      'st.mountain.t':'بۆنا ڕۆژئاڤابوونا چیایی','st.mountain.l':'ڕەواندز، کوردستان',
      'st.mountain.d':'بۆنەکا نزیک، دەمژمێرا وێ ب خولەکێ هاتبوو دیارکرن. چل ڤەخواندی و دۆلەکا کو ل پشتیا وان دبوو زێڕ.',
      'st.chip1':'پلاندانان','st.chip2':'فیلم','st.chip3':'گول','st.chip4':'وێنەگرتن',

      'port.eyebrow':'کارێن مە','port.title':'کارێن هەلبژارتی','port.sub':'دەست بدە هەر وێنەیەکێ بۆ دیتنا تەمام.',
      'cat.all':'هەمی','cat.weddings':'زەماوەند','cat.couples':'جوت','cat.reception':'پێشوازی',
      'cat.outdoor':'دەرڤە','cat.indoor':'ناڤخۆ','cat.decor':'خەملاندنا لوکس','cat.bride':'بویک','cat.groom':'زاڤا',

      'proc.eyebrow':'رێکا مە','proc.title':'ئەم چاوا کار دکەین',
      'proc.sub':'پێنج قۆناغ، ژ ئاخفتنا ئێکێ هەتا سەمایا دویماهیێ.',
      'pr.consult.t':'شێورەکرن','pr.consult.d':'ئەم دگەهین ئێک، گوهدارییێ دکەین، و دزانین تو دخوازی رۆژا تە چاوا بێت. نە قالب، نە پاکێج.',
      'pr.plan.t':'پلاندانان','pr.plan.d':'جه، بودجە، دابینکەر و کاتژمێرەکا وردەکاری — هەمی بەری هەر ژمارتنەکێ هاتینە پەسندکرن.',
      'pr.design.t':'دیزاین','pr.design.d':'تەختەیێن مود، خواندنا گولان، پلانێن رەنگ و رۆناهیێ. تو دیمەنی پەسند دکەی بەری هەر گولەکێ.',
      'pr.exec.t':'جێبەجێکرن','pr.exec.d':'تیما مە دامەزراندن، دابینکەر و کاتژمێرێ ل خۆ دگرێت. تو خۆ ئامادە دکەی؛ ئەم یێن مای دکەین.',
      'pr.celeb.t':'بۆن','pr.celeb.d':'تو ل هەر ساتەکێ ئامادەی. ئەم نەدیار دمینین، و فیلم و وێنە پشتی چەند هەفتەیان دگەهنە تە.',

      'stat.1':'زەماوەندێن لوکس','stat.2':'کڕیارێن دلخۆش','stat.3':'سالێن ئەزموونی','stat.4':'ڕەزامەندیا کڕیاران',

      'test.eyebrow':'گۆتنێن خۆش','test.title':'ژ جوتێن مە',
      't1.q':'باشترین ئەزموونا زەماوەندی یا مە دشیا خەیال بکرا.','t1.n':'لانە و ئارام','t1.m':'هەولێر · ٢٠٢٥',
      't2.q':'وان خەونا مە کرە راستی.','t2.n':'دیلان و ڕێبین','t2.m':'دهۆک · ٢٠٢٥',
      't3.q':'ب تەمامی بێ کێماسی ژ دەستپێکێ هەتا دویماهیێ.','t3.n':'سارا و هەمن','t3.m':'شەقلاوە · ٢٠٢٤',
      't4.q':'هەر وردەکارییەک هاتبوو رەچاڤکرن. مە تنێ ژ رۆژا خۆ خۆش بوو.','t4.n':'نما و کاروان','t4.m':'سلێمانی · ٢٠٢٤',

      'gal.eyebrow':'گەلەری','gal.title':'ئەرشیف','gal.grid':'خانە','gal.masonry':'ماسۆنری',
      'grade.eyebrow':'هونەر','grade.title':'ستایلا SIIS',
      'grade.sub':'رابکێشە بۆ بەراوردکرنا وێنەیا خاڤ دگەل ستایلا مە یا سینەمایی.',
      'grade.before':'خاڤ','grade.after':'ستایلا SIIS',
      'c1':'رۆناهیا ئێکێ','c2':'دەلاق، ب هێمنی','c3':'هۆلەک ب زێڕ خەملاندی',
      'c4':'رێکەکا گولێن سپی','c5':'ل دەرێ دۆل دبیتە زێڕ',

      'ig.eyebrow':'ئینستاگرام','ig.sub':'ژ پشت کامێرایێ، وێنە و وردەکارییێن ڤێ هەفتەیێ.',
      'ig.cta':'شوێنکەفتن ل ئینستاگرامێ',

      'faq.eyebrow':'پرسیار','faq.title':'باشە بزانی',
      'faq.sub':'هەر پرسیارەکا دی، تیما مە نامەیەک ژ تە دویرە.','faq.cta':'پرسیار ل واتسئەپێ',
      'q1.q':'دڤێت چەند زوی ژمارتنێ بکەین؟',
      'q1.a':'بۆ وەرزێ قەرەباڵغ ئەم پێشنیارا نەهـ هەتا دوازدەه هەیڤان دکەین، چونکی ئەم هەر سالێ ژمارەکا سنووردار ژ زەماوەندان وەردگرین. دەمێن کورتر ژی دشێن گونجاو بن — ژ مە بپرسە و ئەم ب راستی دێ بێژینە تە چ بەردەستە.',
      'q2.q':'هوین دگەڕین؟',
      'q2.a':'بەلێ. ئەم ل تەمامیا هەرێما کوردستانێ و عێراقێ کار دکەین، و هەر سالێ ژمارەکا بچویک ژ زەماوەندێن دەرڤەیی وەردگرین. گەڕان و مانەوە ب شێوەیەکێ ئاشکرا دهێنە ژمارتن.',
      'q3.q':'دشێن پاکێجان تایبەت بکەن؟',
      'q3.a':'هەر پێشنیارەک ژ نوی دهێتە نڤیسین پشتی شێورەکرنا تە. تو دشێی مە بۆ بەرهەمهێنانا تەمام، تنێ پلاندانان، یان تنێ وێنە و فیلم ژمارە بکەی.',
      'q4.q':'زەماوەندەک چەند تێچوونێ دکەت؟',
      'q4.a':'ب تەمامی ب ژمارا ڤەخواندیان، جهی و مەزناهیا دیزاینی ڤە گرێدایە. ئەم دێ پشتی شێورەکرنا ئێکێ ژمارەیەکا ئاشکرا و وردەکاری بدەینە تە، و پاشی چو تشتی لێ زێدە ناکەین بێ رەزامەندیا تە.',
      'q5.q':'وێنەگرتنێ ب تنێ پێشکێش دکەن؟',
      'q5.a':'بەلێ. وێنە و فیلم دشێن سەربەخۆ ژ پلاندانانێ بهێنە ژمارتن، و ئەڤە پترین داخوازا مە یە.',
      'q6.q':'کەنگی وێنە و فیلمێ خۆ وەردگرین؟',
      'q6.a':'گەلەرییەکا پێشوەخت د ناڤ ئێک هەفتەیێ دا دگەهیتە تە. کۆمەلا تەمام و فیلمێ زەماوەندی د ناڤ شەش هەتا هەشت هەفتەیان دا دهێن.',

      'cta.eyebrow':'پرسیار','cta.title':'با بۆنا تە دەست پێ بکەین',
      'cta.sub':'هندەک وردەکاری پارڤە بکە و ئەم ب خۆ دێ بەرسڤا تە دەین، پترجار د ناڤ رۆژەکێ دا.',
      'f.name':'ناڤێ تەمام','f.phone':'ژمارا تەلەفۆنێ','f.email':'ئیمەیل','f.date':'رۆژا زەماوەندی',
      'f.venue':'جه یان بajار','f.budget':'بودجە','f.budget0':'ئاستەکێ هەلبژێرە',
      'f.budget1':'$١٠,٠٠٠ – $٢٠,٠٠٠','f.budget2':'$٢٠,٠٠٠ – $٤٠,٠٠٠','f.budget3':'$٤٠,٠٠٠ – $٧٠,٠٠٠',
      'f.budget4':'$٧٠,٠٠٠+','f.budget5':'هێشتا نەزانم',
      'f.services':'خزمەتگوزاریێن دڤیایی','f.serv1':'بەرهەمهێنانا تەمام','f.serv2':'پلاندانان و رێکخستن',
      'f.serv3':'تنێ وێنە و فیلم','f.serv4':'خەملاندن و دیزاینا گولان','f.serv5':'زەماوەندێ دەرڤەیی',
      'f.msg':'دەربارەی رۆژا خۆ بۆ مە بێژە','f.submit':'رەوانەکرن ب واتسئەپێ',
      'f.note':'پرسیارا تە ل واتسئەپێ ڤەدبیت دا ئەم زوی بەرسڤێ بدەین.',
      'e.req':'ئەڤ خانە پێدڤیە','e.email':'تکایە ئیمەیلەکا دروست بنڤیسە','e.phone':'تکایە ژمارەکا دروست بنڤیسە',
      'c.callus':'دگەل مە بئاخڤە','c.wa':'ژمارتن ب واتسئەپێ','c.loc':'هەولێر · هەرێما کوردستانێ، عێراق',
      'c.hours':'دەمژمێرێن کارکرنێ','c.h1d':'شەممی – پێنجشەممی','c.h2d':'ئینی','c.h2v':'ب ژمارتنێ',
      'c.hnote':'شێورەکرن ل ستۆدیۆیا مە یان ب پەیوەندیا ڤیدیۆیێ دهێتە کرن.',

      'foot.tag':'مالا زەماوەندێن لوکس — بۆ وان جوتان یێن کو ژ نەبێتە ئاسایی چو ناخوازن.',
      'foot.links':'گەڕان','foot.services':'خزمەتگوزاری','foot.news':'نامە',
      'foot.newsSub':'نامەیێن کێم دەم دەربارەی ستایل، جه و زەماوەندێن راستەقینە.',
      'foot.newsLabel':'ناڤونیشانێ ئیمەیلی','foot.rights':'هەمی ماف پاراستینە.',
      'foot.made':'هەولێر · هەرێما کوردستانێ، عێراق',

      'sticky.cta':'ژمارتنا شێورەکرنێ',
      'modal.eyebrow':'شێورەکرنا تایبەت','modal.title':'رۆژا خۆ بپارێزە',
      'modal.sub':'تنێ گرنگان بۆ مە بێژە — ئەم دێ یێن مای بکەین.',
      'cookie.txt':'ئەم ژمارەکا کێم ژ کوکیان بکار تینین دا زمان و ستایلا تە بیر بێت، و بزانین ماڵپەڕ چاوا دهێتە بکارئینان.',
      'cookie.yes':'پەسندکرن','cookie.no':'رەتکرن',
      'toast.news':'سوپاس — تو ل لیستێ دا یی.','toast.newsErr':'تکایە ئیمەیلەکا دروست بنڤیسە.',
      'toast.wa':'ڤەکرنا واتسئەپێ…',

      'p1':'پۆرترەیا ئێڤارێ','p2':'دەمژمێرا زێڕین','p3':'رێکا گولێن سپی','p4':'ڕەش و سپی',
      'p5':'هۆلا مەزن','p6':'گوستیل','p7':'کراسێ بویکێ','p8':'دەست ب دەست','p9':'ناڤەندا مێزێ',
      'p10':'سویندا کەناری','p11':'وردەکاری','p12':'مێز','p13':'دەستەگول','p14':'کۆنفێتی',
      'p15':'تاقا گولان','p16':'گروپ','p17':'کێک','p18':'دۆل','p19':'دەرکەفتن',
      'p20':'گولێن سور','p21':'ل بن دەلاقێ','p22':'خواستن','p23':'بویک','p24':'دەرڤەیی',
      'p25':'سەمایا ئێکێ','p26':'خەملاندنا مێزێ','p27':'زێڕ و گول','p28':'زاڤا و بویک','p29':'ل بن دارێن خورمێ','p30':'پۆرترەیا بویکێ'
    },

    ar: {
      'a11y.skip':'تخطَّ إلى المحتوى','pre.tag':'دار الأفراح الفاخرة','brand.sub':'أفراح',
      'nav.home':'الرئيسية','nav.about':'من نحن','nav.services':'خدماتنا','nav.portfolio':'أعمالنا',
      'nav.testimonials':'آراء العملاء','nav.process':'مراحل العمل','nav.gallery':'المعرض',
      'nav.contact':'تواصل معنا','nav.faq':'الأسئلة','nav.cta':'احجز الآن',

      'hero.eyebrow':'كردستان · دار الأفراح الفاخرة',
      'hero.title':'نصنع أفراحًا تستحق أن تُذكر إلى الأبد',
      'hero.sub':'تخطيط الأفراح الفاخرة والتصوير وتصميم المناسبات في كردستان.',
      'hero.cta1':'احجز استشارة','hero.cta2':'شاهد أعمالنا','hero.scroll':'مرِّر',

      'about.eyebrow':'عن الدار',
      'about.title':'لمن لا يقبل بأقل من الاستثنائي',
      'about.p1':'تصنع SIIS Weddings احتفالاتٍ خالدة، مصمَّمة خصيصًا لمن لا يقبلون بأقل من الكمال.',
      'about.p2':'نحوّل الأحلام إلى تجارب لا تُنسى، عبر تخطيط استثنائي وتنسيق فاخر وتصوير آسر وتنفيذ لا تشوبه شائبة.',
      'about.since':'في خدمة العرسان منذ',
      'about.pill1t':'التخطيط','about.pill1d':'كل ساعة مُصمَّمة، وكل تفصيل مُجرَّب.',
      'about.pill2t':'الأفلام والتصوير','about.pill2d':'سرد سينمائي بعينٍ فنية.',
      'about.pill3t':'التنسيق','about.pill3d':'الزهور والضوء والمكان، في تكوين واحد.',
      'about.sig':'SIIS — دار الأفراح الفاخرة',

      'serv.eyebrow':'ما نقدّمه','serv.title':'دارٌ متكاملة للاحتفال',
      'serv.sub':'فريق واحد ومعيار واحد — من الاستشارة الأولى حتى اللقطة الأخيرة.',
      's.plan.t':'تخطيط الأفراح','s.plan.d':'إنتاج كامل ليومكم، من الميزانية والجدول حتى البروفة الأخيرة.',
      's.photo.t':'التصوير الفوتوغرافي','s.photo.d':'بورتريهات فنية ولحظات صادقة — بمعالجة ألوان تحمل توقيعنا.',
      's.film.t':'التصوير السينمائي','s.film.d':'أفلام زفاف سينمائية، تُصوَّر وتُلحَّن كفيلم قصير.',
      's.decor.t':'الديكور الفاخر','s.decor.d':'تحويل كامل للمكان، مبني على الضوء والملمس والحجم.',
      's.bridal.t':'تنسيق إطلالة العروس','s.bridal.d':'استشارة الفستان والقياسات وإدارة الشعر والتجميل للعائلة كاملة.',
      's.dest.t':'أفراح الوجهات','s.dest.d':'احتفالات خارج البلاد، تُدار بالكامل مع شركاء محليين موثوقين.',
      's.coord.t':'تنسيق المناسبة','s.coord.d':'فريق غير مرئي في اليوم نفسه، فلا تفكرون في أي تفصيل تنظيمي.',
      's.floral.t':'تصميم الزهور','s.floral.d':'باقات وتركيبات وتنسيقات طاولات مصممة حسب الموسم.',

      'story.eyebrow':'مختارات','story.title':'قصص أفراح',
      'story.sub':'ثلاثة احتفالات، ثلاثة عوالم — مصمَّمة بالكامل حول العروسين.',
      'story.cta':'شاهد المعرض',
      'st.garden.t':'زفاف الحديقة الأنيق','st.garden.l':'شقلاوة، كردستان',
      'st.garden.d':'مئتا ضيف تحت أشجار عتيقة، وممرٌّ من الورد العاجي، وعشاءٌ امتدّ حتى ذابت الشموع.',
      'st.ballroom.t':'حفل القاعة الملكية','st.ballroom.l':'أربيل، كردستان',
      'st.ballroom.d':'قاعة كبرى أُعيدت صياغتها بالذهبي والأخضر الداكن — طاولات مرآتية، وأول رقصة تحت مئتي شمعة.',
      'st.mountain.t':'مراسم غروب الجبل','st.mountain.l':'راوندوز، كردستان',
      'st.mountain.d':'مراسم حميمة ضُبط توقيتها على اللحظة التي تجاوزت فيها الشمس القمة. أربعون ضيفًا، ووادٍ يتحول إلى ذهب خلفهم.',
      'st.chip1':'تخطيط','st.chip2':'فيلم','st.chip3':'زهور','st.chip4':'تصوير',

      'port.eyebrow':'أعمالنا','port.title':'أعمال مختارة','port.sub':'اضغط أي صورة لعرضها بملء الشاشة.',
      'cat.all':'الكل','cat.weddings':'أفراح','cat.couples':'العرسان','cat.reception':'الحفل',
      'cat.outdoor':'خارجي','cat.indoor':'داخلي','cat.decor':'ديكور فاخر','cat.bride':'العروس','cat.groom':'العريس',

      'proc.eyebrow':'الرحلة','proc.title':'كيف نعمل',
      'proc.sub':'خمس مراحل مدروسة، من الحديث الأول حتى الرقصة الأخيرة.',
      'pr.consult.t':'الاستشارة','pr.consult.d':'نلتقي ونصغي ونفهم كيف تريدون أن يكون شعور اليوم. لا قوالب ولا باقات جاهزة.',
      'pr.plan.t':'التخطيط','pr.plan.d':'المكان والميزانية والموردون وجدول زمني بالدقيقة — كلها متفق عليها وموثّقة قبل أي حجز.',
      'pr.design.t':'التصميم','pr.design.d':'لوحات إلهام ودراسات زهور وخطط ألوان وإضاءة. توافقون على الشكل قبل طلب زهرة واحدة.',
      'pr.exec.t':'التنفيذ','pr.exec.d':'فريقنا يتولى التركيب والموردين والجدول. أنتم تستعدون، ونحن نتكفل بالباقي.',
      'pr.celeb.t':'الاحتفال','pr.celeb.d':'تحضرون كل لحظة. نبقى غير مرئيين، ويصلكم الفيلم والصور بعد أسابيع.',

      'stat.1':'حفل زفاف فاخر','stat.2':'عميل سعيد','stat.3':'سنوات خبرة','stat.4':'رضا العملاء',

      'test.eyebrow':'كلمات طيبة','test.title':'من عرساننا',
      't1.q':'أروع تجربة زفاف كنا نتخيلها على الإطلاق.','t1.n':'لانة وآرام','t1.m':'أربيل · ٢٠٢٥',
      't2.q':'حوّلوا حلمنا إلى حقيقة.','t2.n':'ديلان ورێبين','t2.m':'دهوك · ٢٠٢٥',
      't3.q':'كان كل شيء مثاليًا من البداية إلى النهاية.','t3.n':'سارة وهەمن','t3.m':'شقلاوة · ٢٠٢٤',
      't4.q':'روعي كل تفصيل. لم يبقَ علينا سوى الاستمتاع بيومنا.','t4.n':'نما وكاروان','t4.m':'السليمانية · ٢٠٢٤',

      'gal.eyebrow':'المعرض','gal.title':'الأرشيف','gal.grid':'شبكة','gal.masonry':'متدرج',
      'grade.eyebrow':'الحرفة','grade.title':'معالجة SIIS',
      'grade.sub':'اسحب للمقارنة بين اللقطة الخام ومعالجتنا السينمائية النهائية.',
      'grade.before':'خام','grade.after':'معالجة SIIS',
      'c1':'الضوء الأول','c2':'الطرحة، على مهل','c3':'قاعة بثوب ذهبي',
      'c4':'ممرٌّ من العاج','c5':'حيث يتحول الوادي إلى ذهب',

      'ig.eyebrow':'إنستغرام','ig.sub':'من خلف الكواليس، لقطات وتفاصيل من الأسبوع.',
      'ig.cta':'تابعنا على إنستغرام',

      'faq.eyebrow':'أسئلة','faq.title':'من الجيد أن تعرف',
      'faq.sub':'لأي سؤال آخر، فريقنا على بعد رسالة واحدة.','faq.cta':'اسأل عبر واتساب',
      'q1.q':'قبل كم من الوقت ينبغي الحجز؟',
      'q1.a':'في الموسم المزدحم ننصح بالحجز قبل تسعة إلى اثني عشر شهرًا، إذ نقبل عددًا محدودًا من الأفراح سنويًا. المدد الأقصر ممكنة غالبًا — اسألونا وسنخبركم بصراحة بما هو متاح.',
      'q2.q':'هل تسافرون؟',
      'q2.a':'نعم. نعمل في عموم إقليم كردستان والعراق، ونقبل عددًا صغيرًا من أفراح الوجهات خارج البلاد سنويًا. تُحتسب تكاليف السفر والإقامة بشفافية كبند منفصل.',
      'q3.q':'هل يمكن تخصيص الباقات؟',
      'q3.a':'يُكتب كل عرض من الصفر بعد استشارتكم. يمكنكم حجزنا للإنتاج الكامل، أو للتخطيط وحده، أو للتصوير والفيلم فقط.',
      'q4.q':'كم تبلغ تكلفة حفل الزفاف؟',
      'q4.a':'تعتمد كليًا على عدد الضيوف والمكان وحجم التصميم. سنقدّم لكم رقمًا واضحًا ومفصّلًا بعد الاستشارة الأولى، ولا نضيف عليه شيئًا لاحقًا دون موافقتكم.',
      'q5.q':'هل تقدّمون التصوير بشكل منفصل؟',
      'q5.a':'نعم. يمكن حجز التصوير والفيلم بمعزل عن التخطيط، وهما من أكثر خدماتنا طلبًا.',
      'q6.q':'متى نستلم الصور والفيلم؟',
      'q6.a':'يصلكم معرض أولي خلال أسبوع واحد. أما المجموعة الكاملة المعالجة وفيلم الزفاف فيصلان خلال ستة إلى ثمانية أسابيع.',

      'cta.eyebrow':'استفسار','cta.title':'لنبدأ احتفالكم',
      'cta.sub':'شاركونا بعض التفاصيل وسنرد شخصيًا، عادةً خلال يوم واحد.',
      'f.name':'الاسم الكامل','f.phone':'رقم الهاتف','f.email':'البريد الإلكتروني','f.date':'تاريخ الزفاف',
      'f.venue':'المكان أو المدينة','f.budget':'الميزانية','f.budget0':'اختر النطاق',
      'f.budget1':'$١٠,٠٠٠ – $٢٠,٠٠٠','f.budget2':'$٢٠,٠٠٠ – $٤٠,٠٠٠','f.budget3':'$٤٠,٠٠٠ – $٧٠,٠٠٠',
      'f.budget4':'$٧٠,٠٠٠+','f.budget5':'لم أحدد بعد',
      'f.services':'الخدمات المطلوبة','f.serv1':'إنتاج زفاف كامل','f.serv2':'تخطيط وتنسيق',
      'f.serv3':'تصوير وفيلم فقط','f.serv4':'ديكور وتصميم زهور','f.serv5':'زفاف في وجهة خارجية',
      'f.msg':'حدثونا عن يومكم','f.submit':'أرسل عبر واتساب',
      'f.note':'يُفتح استفساركم في واتساب لنتمكن من الرد فورًا.',
      'e.req':'هذا الحقل مطلوب','e.email':'يرجى إدخال بريد إلكتروني صحيح','e.phone':'يرجى إدخال رقم هاتف صحيح',
      'c.callus':'تحدث إلينا','c.wa':'احجز عبر واتساب','c.loc':'أربيل · إقليم كردستان، العراق',
      'c.hours':'ساعات العمل','c.h1d':'السبت – الخميس','c.h2d':'الجمعة','c.h2v':'بموعد مسبق',
      'c.hnote':'تُعقد الاستشارات في الاستوديو أو عبر مكالمة فيديو.',

      'foot.tag':'دار الأفراح الفاخرة — لمن لا يقبل بأقل من الاستثنائي.',
      'foot.links':'استكشف','foot.services':'الخدمات','foot.news':'النشرة',
      'foot.newsSub':'رسائل متفرقة عن التنسيق والأماكن وأفراح حقيقية.',
      'foot.newsLabel':'البريد الإلكتروني','foot.rights':'جميع الحقوق محفوظة.',
      'foot.made':'أربيل · إقليم كردستان، العراق',

      'sticky.cta':'احجز استشارة',
      'modal.eyebrow':'استشارة خاصة','modal.title':'احجز تاريخك',
      'modal.sub':'أخبرونا بالأساسيات — وسنتولى الباقي.',
      'cookie.txt':'نستخدم عددًا محدودًا من ملفات تعريف الارتباط لتذكّر لغتك ومظهرك، ولفهم كيفية استخدام الموقع.',
      'cookie.yes':'موافق','cookie.no':'رفض',
      'toast.news':'شكرًا لك — تم تسجيلك في القائمة.','toast.newsErr':'يرجى إدخال بريد إلكتروني صحيح.',
      'toast.wa':'جارٍ فتح واتساب…',

      'p1':'بورتريه مسائي','p2':'الساعة الذهبية','p3':'ممرٌّ من العاج','p4':'أبيض وأسود',
      'p5':'القاعة','p6':'الخواتم','p7':'الفستان','p8':'أيدٍ متشابكة','p9':'تنسيق الطاولة',
      'p10':'وعودٌ على الساحل','p11':'تفاصيل','p12':'الطاولة','p13':'الباقة','p14':'كونفيتي',
      'p15':'قوس الزهور','p16':'الخاتم','p17':'الكعكة','p18':'الوادي','p19':'الخروج',
      'p20':'ورود','p21':'تحت الطرحة','p22':'النخب','p23':'العروس','p24':'وجهة',
      'p25':'الرقصة الأولى','p26':'تنسيق المائدة','p27':'ذهب وبتلات','p28':'العروسان','p29':'تحت النخيل','p30':'بورتريه العروس'
    }
  };

  var lang = 'en';
  function t(key) {
    var d = I18N[lang] || I18N.en;
    return (key in d) ? d[key] : (I18N.en[key] || key);
  }

  /* ==================================================================
     3 — RENDERING
     ================================================================== */

  function svgIco(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
           'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
           ICONS[name] + '</svg>';
  }

  function renderServices() {
    var g = $('#servicesGrid'); if (!g) return;
    g.innerHTML = SERVICES.map(function (s, i) {
      return '<article class="card" data-reveal data-delay="' + (i % 4) * 80 + '">' +
        '<span class="card__num">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
        '<span class="card__ico">' + svgIco(s.ico) + '</span>' +
        '<h3 class="card__t" data-i18n="s.' + s.k + '.t">' + t('s.' + s.k + '.t') + '</h3>' +
        '<p class="card__d" data-i18n="s.' + s.k + '.d">' + t('s.' + s.k + '.d') + '</p>' +
      '</article>';
    }).join('');
  }

  function renderStories() {
    var g = $('#storiesList'); if (!g) return;
    g.innerHTML = STORIES.map(function (s, i) {
      return '<article class="story" data-reveal>' +
        '<div class="story__media">' +
          '<img src="' + u(s.img, 1000) + '" alt="' + t('st.' + s.k + '.t') + '" ' +
               'loading="lazy" decoding="async" width="1000" height="688">' +
        '</div>' +
        '<div class="story__body">' +
          '<p class="story__loc">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
            '<path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>' +
            '<span data-i18n="st.' + s.k + '.l">' + t('st.' + s.k + '.l') + '</span>' +
          '</p>' +
          '<h3 class="story__t" data-i18n="st.' + s.k + '.t">' + t('st.' + s.k + '.t') + '</h3>' +
          '<p class="story__d" data-i18n="st.' + s.k + '.d">' + t('st.' + s.k + '.d') + '</p>' +
          '<div class="story__meta">' +
            '<span class="story__chip" data-i18n="st.chip1">' + t('st.chip1') + '</span>' +
            '<span class="story__chip" data-i18n="st.chip2">' + t('st.chip2') + '</span>' +
            '<span class="story__chip" data-i18n="st.chip3">' + t('st.chip3') + '</span>' +
            '<span class="story__chip" data-i18n="st.chip4">' + t('st.chip4') + '</span>' +
          '</div>' +
          '<button class="btn btn--ghost" data-story="' + i + '" data-i18n="story.cta">' + t('story.cta') + '</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function tileHTML(item, idx, set) {
    return '<button class="tile" type="button" data-lb-set="' + set + '" data-lb-i="' + idx + '" ' +
           'data-cats="' + (item.cat ? item.cat.join(' ') : '') + '">' +
      '<img src="' + u(item.id, 720) + '" alt="' + t(item.k || 'p1') + ' — SIIS Weddings" ' +
           'loading="lazy" decoding="async">' +
      '<span class="tile__veil"><span class="tile__cap">' +
        '<b data-i18n="' + (item.k || '') + '">' + t(item.k || '') + '</b>' +
        '<span data-i18n="cat.' + (item.cat ? item.cat[0] : 'all') + '">' + t('cat.' + (item.cat ? item.cat[0] : 'all')) + '</span>' +
      '</span></span>' +
      '<span class="tile__zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
        '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6M11 8.4v5.2M8.4 11h5.2"/></svg></span>' +
    '</button>';
  }

  function renderPortfolio() {
    var f = $('#portfolioFilters'), g = $('#portfolioGrid');
    if (f) {
      f.innerHTML = CATS.map(function (c, i) {
        return '<button role="tab" aria-selected="' + (i === 0) + '" class="' + (i === 0 ? 'is-on' : '') +
               '" data-cat="' + c + '" data-i18n="cat.' + c + '">' + t('cat.' + c) + '</button>';
      }).join('');
    }
    if (g) g.innerHTML = PORTFOLIO.map(function (p, i) { return tileHTML(p, i, 'portfolio'); }).join('');
  }

  function renderGallery() {
    var g = $('#galleryGrid'); if (!g) return;
    g.innerHTML = GALLERY.map(function (id, i) {
      return tileHTML({ id: id, k: PORTFOLIO[i] ? PORTFOLIO[i].k : '', cat: PORTFOLIO[i] ? PORTFOLIO[i].cat : [] }, i, 'gallery');
    }).join('');
  }

  function renderCinema() {
    var tr = $('#cinemaTrack'); if (!tr) return;
    tr.innerHTML = CINEMA.map(function (c, i) {
      return '<div class="cine-slide' + (i === 0 ? ' is-on' : '') + '" style="background-image:url(' + u(c.id, 1800) + ')"></div>';
    }).join('');
    var tot = $('#cinemaTot'); if (tot) tot.textContent = ('0' + CINEMA.length).slice(-2);
  }

  function renderInsta() {
    var g = $('#instaGrid'); if (!g) return;
    g.innerHTML = INSTA.map(function (id) {
      return '<a class="ig" href="https://www.instagram.com/siisweddings/" target="_blank" rel="noopener noreferrer" ' +
             'aria-label="View on Instagram">' +
        '<img src="' + u(id, 500, 500) + '" alt="SIIS Weddings on Instagram" loading="lazy" decoding="async" width="500" height="500">' +
        '<svg class="ig__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
        '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>' +
        '<circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>' +
      '</a>';
    }).join('');
  }

  function renderProcess() {
    var g = $('#timeline'); if (!g) return;
    g.innerHTML = PROCESS.map(function (p, i) {
      return '<li class="step" data-reveal>' +
        '<span class="step__dot"><i>' + svgIco(p.ico) + '</i></span>' +
        '<span class="step__n">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
        '<h3 class="step__t" data-i18n="pr.' + p.k + '.t">' + t('pr.' + p.k + '.t') + '</h3>' +
        '<p class="step__d" data-i18n="pr.' + p.k + '.d">' + t('pr.' + p.k + '.d') + '</p>' +
      '</li>';
    }).join('');
  }

  function renderTestimonials() {
    var tr = $('#tstTrack'), dots = $('#tstDots');
    if (!tr) return;
    var star = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z"/></svg>';
    tr.innerHTML = TESTIMONIALS.map(function (x) {
      return '<div class="tst__slide"><figure class="tst__card">' +
        '<div class="tst__stars" aria-label="5 out of 5 stars">' + star + star + star + star + star + '</div>' +
        '<blockquote class="tst__quote" data-i18n="' + x.k + '.q">“' + t(x.k + '.q') + '”</blockquote>' +
        '<figcaption class="tst__person">' +
          '<img class="tst__ava" src="' + u(x.ava, 160, 160) + '" alt="" loading="lazy" decoding="async" width="160" height="160">' +
          '<span class="tst__name" data-i18n="' + x.k + '.n">' + t(x.k + '.n') + '</span>' +
          '<span class="tst__meta" data-i18n="' + x.k + '.m">' + t(x.k + '.m') + '</span>' +
        '</figcaption>' +
      '</figure></div>';
    }).join('');
    if (dots) {
      dots.innerHTML = TESTIMONIALS.map(function (_, i) {
        return '<button role="tab" aria-selected="' + (i === 0) + '" class="' + (i === 0 ? 'is-on' : '') +
               '" data-tst="' + i + '" aria-label="Testimonial ' + (i + 1) + '"></button>';
      }).join('');
    }
  }

  function renderFaq() {
    var g = $('#faqList'); if (!g) return;
    g.innerHTML = FAQ.map(function (q, i) {
      return '<div class="acc__item">' +
        '<button class="acc__q" aria-expanded="false" aria-controls="acc-' + i + '" id="accq-' + i + '">' +
          '<span data-i18n="' + q + '.q">' + t(q + '.q') + '</span><span class="acc__ico" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="acc__a" id="acc-' + i + '" role="region" aria-labelledby="accq-' + i + '">' +
          '<p data-i18n="' + q + '.a">' + t(q + '.a') + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ==================================================================
     4 — i18n APPLY
     ================================================================== */
  var RTL = { ku: true, ar: true };

  function applyLang(next, save) {
    lang = (next in I18N) ? next : 'en';
    var rtl = !!RTL[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';

    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = t(k);
      if (!v) return;
      if (el.hasAttribute('data-split')) { el.textContent = v; splitOne(el); }
      else if (el.tagName === 'BLOCKQUOTE') { el.textContent = '“' + v + '”'; }
      else { el.textContent = v; }
    });

    var cur = $('#langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();
    $$('#langMenu button').forEach(function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-lang') === lang);
    });

    if (save) { try { localStorage.setItem('siis-lang', lang); } catch (e) {} }
    updateCinemaCaption();
  }

  /* ==================================================================
     5 — TEXT SPLIT / REVEAL
     ================================================================== */
  function splitOne(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w, i) {
      return '<span class="word" style="transition-delay:' + (i * 55) + 'ms"><i>' + w + '</i></span>';
    }).join(' ');
    if (el.getAttribute('data-was-in') === '1') el.classList.add('is-in');
  }

  function initSplit() { $$('[data-split]').forEach(splitOne); }

  var io = null;
  function initReveal() {
    var targets = $$('[data-reveal], [data-split], .tile, .signature, .step');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var d = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () {
          el.classList.add('is-in');
          if (el.hasAttribute('data-split')) el.setAttribute('data-was-in', '1');
        }, d);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }
  function observeNew(sel) {
    if (!io) { $$(sel).forEach(function (el) { el.classList.add('is-in'); }); return; }
    $$(sel).forEach(function (el) { if (!el.classList.contains('is-in')) io.observe(el); });
  }

  /* ==================================================================
     6 — PRELOADER
     ================================================================== */
  function initPreloader() {
    var pl = $('#preloader'), bar = $('#preloaderBar');
    var pct = 0, done = false;
    var tick = setInterval(function () {
      pct = Math.min(pct + Math.random() * 16 + 6, 100);
      if (bar) bar.style.width = pct + '%';
      if (pct >= 100) { clearInterval(tick); finish(); }
    }, 150);

    function finish() {
      if (done) return; done = true;
      setTimeout(function () {
        if (pl) pl.classList.add('is-done');
        document.body.classList.remove('is-loading');
        setTimeout(function () { if (pl) pl.remove(); }, 950);
      }, reduced ? 0 : 320);
    }
    window.addEventListener('load', function () { pct = Math.max(pct, 92); });
    setTimeout(function () { clearInterval(tick); if (bar) bar.style.width = '100%'; finish(); }, reduced ? 400 : 3400);
  }

  /* ==================================================================
     7 — NAV / SCROLL
     ================================================================== */
  function initNav() {
    var nav = $('#nav'), burger = $('#burger'), menu = $('#navMenu');
    var bar = $('#scrollProgress'), sticky = $('#stickyCta');
    var last = 0;

    function onScroll() {
      var y = window.scrollY || 0;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      if (nav) {
        nav.classList.toggle('is-solid', y > 60);
        var open = menu && menu.classList.contains('is-open');
        nav.classList.toggle('is-hidden', y > 620 && y > last && !open);
      }
      if (sticky) sticky.classList.toggle('is-on', y > 900);
      last = y;
      spy(y);
    }

    var secs = $$('main section[id]');
    function spy(y) {
      var cur = '';
      secs.forEach(function (s) { if (s.offsetTop - 140 <= y) cur = s.id; });
      $$('#navMenu a').forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + cur);
      });
    }

    var raf = false;
    window.addEventListener('scroll', function () {
      if (raf) return; raf = true;
      requestAnimationFrame(function () { onScroll(); raf = false; });
    }, { passive: true });
    onScroll();

    if (burger && menu) {
      burger.addEventListener('click', function () {
        var open = menu.classList.toggle('is-open');
        burger.classList.toggle('is-on', open);
        burger.setAttribute('aria-expanded', open);
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('no-scroll', open);
      });
      $$('#navMenu a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('is-open');
          burger.classList.remove('is-on');
          burger.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        });
      });
    }
  }

  /* ==================================================================
     8 — HERO SLIDESHOW
     ================================================================== */
  function initHero() {
    var slides = $$('.hero__slide'), dots = $('#heroDots');
    if (slides.length < 2) return;
    var i = 0, timer;

    if (dots) {
      dots.innerHTML = slides.map(function (_, n) {
        return '<button role="tab" aria-selected="' + (n === 0) + '" class="' + (n === 0 ? 'is-on' : '') +
               '" data-h="' + n + '" aria-label="Slide ' + (n + 1) + '"></button>';
      }).join('');
      dots.addEventListener('click', function (e) {
        var b = e.target.closest('[data-h]'); if (!b) return;
        go(parseInt(b.getAttribute('data-h'), 10)); restart();
      });
    }
    function go(n) {
      slides[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      $$('[data-h]', dots).forEach(function (b, k) {
        b.classList.toggle('is-on', k === i);
        b.setAttribute('aria-selected', k === i);
      });
    }
    function restart() { clearInterval(timer); if (!reduced) timer = setInterval(function () { go(i + 1); }, 6500); }
    restart();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else restart();
    });
  }

  /* ==================================================================
     9 — PARALLAX / TIMELINE FILL
     ================================================================== */
  function initParallax() {
    if (reduced) return;
    var els = $$('[data-parallax]');
    var tl = $('#timeline');
    var raf = false;
    function frame() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var k = parseFloat(el.getAttribute('data-parallax')) || 0.05;
        var off = (r.top + r.height / 2 - vh / 2) * k;
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
      if (tl) {
        var t2 = tl.getBoundingClientRect();
        var p = (vh * 0.72 - t2.top) / t2.height;
        tl.style.setProperty('--fill', Math.max(0, Math.min(1, p)) * 100 + '%');
      }
      raf = false;
    }
    window.addEventListener('scroll', function () {
      if (raf) return; raf = true; requestAnimationFrame(frame);
    }, { passive: true });
    window.addEventListener('resize', frame);
    frame();
  }

  /* ==================================================================
     10 — COUNTERS
     ================================================================== */
  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute('data-count') + (n.getAttribute('data-suffix') || ''); });
      return;
    }
    var ob = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var suf = el.getAttribute('data-suffix') || '';
        var dur = 2100, t0 = performance.now();
        (function step(now) {
          var p = Math.min((now - t0) / dur, 1);
          var e2 = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(target * e2).toLocaleString() + suf;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
        ob.unobserve(el);
      });
    }, { threshold: 0.45 });
    nums.forEach(function (n) { ob.observe(n); });
  }

  /* ==================================================================
     11 — PORTFOLIO FILTER
     ================================================================== */
  function initFilter() {
    var f = $('#portfolioFilters'); if (!f) return;
    f.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]'); if (!b) return;
      var cat = b.getAttribute('data-cat');
      $$('[data-cat]', f).forEach(function (x) {
        var on = x === b;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-selected', on);
      });
      $$('#portfolioGrid .tile').forEach(function (tile) {
        var cats = (tile.getAttribute('data-cats') || '').split(' ');
        var show = cat === 'all' || cats.indexOf(cat) > -1;
        tile.classList.toggle('is-hidden', !show);
      });
    });
  }

  /* ==================================================================
     12 — GALLERY VIEW TOGGLE
     ================================================================== */
  function initGalleryToggle() {
    var seg = $('.seg'), grid = $('#galleryGrid');
    if (!seg || !grid) return;
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]'); if (!b) return;
      $$('[data-view]', seg).forEach(function (x) {
        var on = x === b;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-selected', on);
      });
      grid.classList.toggle('is-masonry', b.getAttribute('data-view') === 'masonry');
    });
  }

  /* ==================================================================
     13 — LIGHTBOX
     ================================================================== */
  var lb = { list: [], i: 0, open: false, lastFocus: null };

  function setLB(setName, idx) {
    if (setName === 'portfolio') {
      lb.list = $$('#portfolioGrid .tile:not(.is-hidden)').map(function (el) {
        var n = parseInt(el.getAttribute('data-lb-i'), 10);
        return { id: PORTFOLIO[n].id, k: PORTFOLIO[n].k };
      });
      var vis = $$('#portfolioGrid .tile:not(.is-hidden)');
      lb.i = 0;
      for (var j = 0; j < vis.length; j++) {
        if (parseInt(vis[j].getAttribute('data-lb-i'), 10) === idx) { lb.i = j; break; }
      }
    } else if (setName === 'gallery') {
      lb.list = GALLERY.map(function (id, n) { return { id: id, k: PORTFOLIO[n] ? PORTFOLIO[n].k : '' }; });
      lb.i = idx;
    } else if (setName.indexOf('story:') === 0) {
      var s = STORIES[parseInt(setName.split(':')[1], 10)];
      lb.list = s.gal.map(function (id) { return { id: id, k: 'st.' + s.k + '.t' }; });
      lb.i = idx;
    }
  }

  function openLB(setName, idx, trigger) {
    setLB(setName, idx);
    if (!lb.list.length) return;
    var box = $('#lightbox');
    lb.lastFocus = trigger || document.activeElement;
    lb.open = true;
    box.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(function () { box.classList.add('is-on'); paintLB(); });
    $('#lbClose').focus();
  }

  function paintLB() {
    var box = $('#lightbox'), img = $('#lbImg');
    var item = lb.list[lb.i];
    box.classList.remove('is-ready');
    var pre = new Image();
    pre.onload = function () {
      img.src = pre.src;
      img.alt = t(item.k) + ' — SIIS Weddings';
      $('#lbCap').textContent = t(item.k);
      $('#lbCount').textContent = (lb.i + 1) + ' / ' + lb.list.length;
      box.classList.add('is-ready');
    };
    pre.src = u(item.id, 1600);
  }

  function closeLB() {
    var box = $('#lightbox');
    lb.open = false;
    box.classList.remove('is-on', 'is-ready');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { box.hidden = true; }, 480);
    if (lb.lastFocus) lb.lastFocus.focus();
  }
  function stepLB(d) { lb.i = (lb.i + d + lb.list.length) % lb.list.length; paintLB(); }

  function initLightbox() {
    document.addEventListener('click', function (e) {
      var tile = e.target.closest('[data-lb-set]');
      if (tile) {
        openLB(tile.getAttribute('data-lb-set'), parseInt(tile.getAttribute('data-lb-i'), 10), tile);
        return;
      }
      var story = e.target.closest('[data-story]');
      if (story) { openLB('story:' + story.getAttribute('data-story'), 0, story); }
    });
    $('#lbClose').addEventListener('click', closeLB);
    $('#lbPrev').addEventListener('click', function () { stepLB(-1); });
    $('#lbNext').addEventListener('click', function () { stepLB(1); });
    $('#lightbox').addEventListener('click', function (e) {
      if (e.target.id === 'lightbox') closeLB();
    });

    /* swipe */
    var x0 = null;
    var box = $('#lightbox');
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 55) stepLB(dx > 0 ? -1 : 1);
      x0 = null;
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.open) return;
      if (e.key === 'Escape') closeLB();
      else if (e.key === 'ArrowRight') stepLB(document.documentElement.dir === 'rtl' ? -1 : 1);
      else if (e.key === 'ArrowLeft')  stepLB(document.documentElement.dir === 'rtl' ? 1 : -1);
      else if (e.key === 'Tab') {
        var f = $$('#lightbox button');
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ==================================================================
     14 — TESTIMONIAL SLIDER
     ================================================================== */
  function initTestimonials() {
    var tr = $('#tstTrack'); if (!tr) return;
    var n = TESTIMONIALS.length, i = 0, timer;
    function go(k) {
      i = (k + n) % n;
      var rtl = document.documentElement.dir === 'rtl';
      tr.style.transform = 'translateX(' + (rtl ? i * 100 : -i * 100) + '%)';
      $$('#tstDots button').forEach(function (b, j) {
        b.classList.toggle('is-on', j === i);
        b.setAttribute('aria-selected', j === i);
      });
    }
    $('#tstPrev').addEventListener('click', function () { go(i - 1); reset(); });
    $('#tstNext').addEventListener('click', function () { go(i + 1); reset(); });
    $('#tstDots').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tst]'); if (!b) return;
      go(parseInt(b.getAttribute('data-tst'), 10)); reset();
    });
    function reset() { clearInterval(timer); if (!reduced) timer = setInterval(function () { go(i + 1); }, 7000); }
    reset(); go(0);

    var x0 = null;
    tr.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    tr.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { go(i + (dx > 0 ? -1 : 1)); reset(); }
      x0 = null;
    });
    window.addEventListener('resize', function () { go(i); });
  }

  /* ==================================================================
     15 — CINEMATIC SLIDER
     ================================================================== */
  var cine = { i: 0, timer: null };
  function updateCinemaCaption() {
    var cap = $('#cinemaCap'), idx = $('#cinemaIdx');
    if (!cap || !CINEMA[cine.i]) return;
    cap.textContent = t(CINEMA[cine.i].k);
    if (idx) idx.textContent = ('0' + (cine.i + 1)).slice(-2);
  }
  function initCinema() {
    var slides = $$('.cine-slide'); if (!slides.length) return;
    function go(n) {
      slides[cine.i].classList.remove('is-on');
      cine.i = (n + slides.length) % slides.length;
      slides[cine.i].classList.add('is-on');
      updateCinemaCaption();
    }
    $('#cinemaPrev').addEventListener('click', function () { go(cine.i - 1); reset(); });
    $('#cinemaNext').addEventListener('click', function () { go(cine.i + 1); reset(); });
    function reset() { clearInterval(cine.timer); if (!reduced) cine.timer = setInterval(function () { go(cine.i + 1); }, 6000); }
    reset(); updateCinemaCaption();
  }

  /* ==================================================================
     16 — COMPARE SLIDER
     ================================================================== */
  function initCompare() {
    var range = $('#compareRange'), before = $('#compareBefore'), handle = $('#compareHandle');
    if (!range) return;
    function paint() {
      var v = range.value;
      before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
      handle.style.left = v + '%';
    }
    range.addEventListener('input', paint);
    paint();
  }

  /* ==================================================================
     17 — FAQ ACCORDION
     ================================================================== */
  function initFaqAccordion() {
    var list = $('#faqList'); if (!list) return;
    list.addEventListener('click', function (e) {
      var q = e.target.closest('.acc__q'); if (!q) return;
      var item = q.parentElement, panel = q.nextElementSibling;
      var open = item.classList.contains('is-open');

      $$('.acc__item', list).forEach(function (it) {
        if (it === item) return;
        it.classList.remove('is-open');
        $('.acc__q', it).setAttribute('aria-expanded', 'false');
        $('.acc__a', it).style.height = '0px';
      });

      item.classList.toggle('is-open', !open);
      q.setAttribute('aria-expanded', String(!open));
      panel.style.height = open ? '0px' : panel.scrollHeight + 'px';
    });
    window.addEventListener('resize', function () {
      $$('.acc__item.is-open .acc__a', list).forEach(function (p) { p.style.height = p.scrollHeight + 'px'; });
    });
  }

  /* ==================================================================
     18 — THEME
     ================================================================== */
  function initTheme() {
    var btn = $('#themeBtn');
    var saved = null;
    try { saved = localStorage.getItem('siis-theme'); } catch (e) {}
    var dark = saved ? saved === 'dark'
                     : window.matchMedia('(prefers-color-scheme: dark)').matches;
    set(dark);
    function set(on) {
      document.documentElement.setAttribute('data-theme', on ? 'dark' : 'light');
      if (btn) btn.setAttribute('aria-pressed', String(on));
    }
    if (btn) btn.addEventListener('click', function () {
      var on = document.documentElement.getAttribute('data-theme') !== 'dark';
      set(on);
      try { localStorage.setItem('siis-theme', on ? 'dark' : 'light'); } catch (e) {}
    });
  }

  /* ==================================================================
     19 — LANGUAGE SWITCHER
     ================================================================== */
  function initLangSwitcher() {
    var box = $('#lang'), btn = $('#langBtn'), menu = $('#langMenu');
    if (!box) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var on = box.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(on));
    });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]'); if (!b) return;
      applyLang(b.getAttribute('data-lang'), true);
      box.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('click', function () {
      box.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { box.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ==================================================================
     20 — MODAL
     ================================================================== */
  function initModal() {
    var modal = $('#bookingModal'), lastFocus = null;
    function open(trigger) {
      lastFocus = trigger || document.activeElement;
      modal.hidden = false;
      document.body.classList.add('no-scroll');
      requestAnimationFrame(function () { modal.classList.add('is-on'); });
      var f = $('#m-name'); if (f) setTimeout(function () { f.focus(); }, 320);
    }
    function close() {
      modal.classList.remove('is-on');
      document.body.classList.remove('no-scroll');
      setTimeout(function () { modal.hidden = true; }, 520);
      if (lastFocus) lastFocus.focus();
    }
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-open-booking]')) { e.preventDefault(); open(e.target.closest('[data-open-booking]')); }
      else if (e.target.closest('[data-close-modal]')) { close(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
      if (e.key === 'Tab' && !modal.hidden) {
        var f = $$('#bookingModal button, #bookingModal input, #bookingModal select, #bookingModal textarea')
                 .filter(function (x) { return !x.disabled; });
        if (!f.length) return;
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ==================================================================
     21 — FORMS → WHATSAPP
     ================================================================== */
  function labelFor(form, name) {
    var el = form.elements[name];
    if (!el) return name;
    var lab = form.querySelector('label[for="' + el.id + '"]');
    return lab ? lab.textContent.trim() : name;
  }
  function valueFor(form, name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el.tagName === 'SELECT') {
      var o = el.options[el.selectedIndex];
      return o && o.value ? o.textContent.trim() : '';
    }
    return (el.value || '').trim();
  }
  function setErr(el, msg) {
    var field = el.closest('.field'); if (!field) return;
    var slot = $('[data-err]', field);
    field.classList.toggle('has-err', !!msg);
    if (slot) slot.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  function validate(form) {
    var ok = true, first = null;
    $$('input, select, textarea', form).forEach(function (el) {
      if (!el.name) return;
      var v = (el.value || '').trim();
      var msg = '';
      if (el.required && !v) msg = t('e.req');
      else if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = t('e.email');
      else if (el.type === 'tel' && v && v.replace(/[^\d]/g, '').length < 7) msg = t('e.phone');
      setErr(el, msg);
      if (msg && ok) { ok = false; first = el; }
    });
    if (first) first.focus();
    return ok;
  }

  function buildWA(form) {
    var order = ['name', 'phone', 'email', 'date', 'venue', 'budget', 'services', 'message'];
    var lines = ['*SIIS Weddings — New Enquiry*', ''];
    order.forEach(function (k) {
      var v = valueFor(form, k);
      if (v) lines.push('*' + labelFor(form, k) + ':* ' + v);
    });
    lines.push('', '— sent from siisweddings.com');
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function initForms() {
    ['#bookingForm', '#modalForm'].forEach(function (sel) {
      var form = $(sel); if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        toast(t('toast.wa'));
        window.open(buildWA(form), '_blank', 'noopener');
      });
      $$('input, select, textarea', form).forEach(function (el) {
        el.addEventListener('input', function () {
          if (el.closest('.field').classList.contains('has-err')) setErr(el, '');
        });
      });
    });

    var news = $('#newsForm');
    if (news) {
      news.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = $('#newsEmail').value.trim();
        var msg = $('#newsMsg');
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        if (msg) msg.textContent = ok ? t('toast.news') : t('toast.newsErr');
        if (ok) { news.reset(); toast(t('toast.news')); }
      });
    }
  }

  /* ==================================================================
     22 — TOAST
     ================================================================== */
  var toastTimer;
  function toast(msg) {
    var el = $('#toast'); if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 3200);
  }

  /* ==================================================================
     23 — COOKIE BANNER
     ================================================================== */
  function initCookie() {
    var box = $('#cookie'); if (!box) return;
    var seen = null;
    try { seen = localStorage.getItem('siis-cookie'); } catch (e) {}
    if (seen) return;
    setTimeout(function () {
      box.hidden = false;
      requestAnimationFrame(function () { box.classList.add('is-on'); });
    }, 1800);
    function dismiss(v) {
      try { localStorage.setItem('siis-cookie', v); } catch (e) {}
      box.classList.remove('is-on');
      setTimeout(function () { box.hidden = true; }, 520);
    }
    $('#cookieAccept').addEventListener('click', function () { dismiss('accepted'); });
    $('#cookieDecline').addEventListener('click', function () { dismiss('declined'); });
  }

  /* ==================================================================
     24 — CURSOR
     ================================================================== */
  function initCursor() {
    if (reduced || !window.matchMedia('(pointer:fine)').matches) return;
    var dot = $('#cursorDot'), ring = $('#cursorRing');
    if (!dot || !ring) return;
    var x = 0, y = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      document.body.classList.add('cursor-on');
    });
    document.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-on'); });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var hot = e.target.closest('a, button, .tile, .card, input, select, textarea, .ig');
      document.body.classList.toggle('cursor-hot', !!hot);
    });
  }

  /* ==================================================================
     25 — MISC
     ================================================================== */
  function initMisc() {
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

    /* smooth anchor scroll that respects the sticky nav */
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a || a.hasAttribute('data-open-booking')) return;
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });

    /* graceful image fallback */
    document.addEventListener('error', function (e) {
      var img = e.target;
      if (img.tagName !== 'IMG' || img.dataset.fallback) return;
      img.dataset.fallback = '1';
      img.src = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
        '<rect width="100%" height="100%" fill="#F6EFE6"/>' +
        '<text x="50%" y="50%" text-anchor="middle" fill="#B08D57" ' +
        'font-family="Georgia,serif" font-size="42" letter-spacing="8">SIIS</text></svg>');
    }, true);
  }

  /* ==================================================================
     BOOT
     ================================================================== */
  function boot() {
    initTheme();

    renderServices();
    renderStories();
    renderPortfolio();
    renderGallery();
    renderCinema();
    renderInsta();
    renderProcess();
    renderTestimonials();
    renderFaq();

    var saved = null;
    try { saved = localStorage.getItem('siis-lang'); } catch (e) {}
    var nav0 = (navigator.language || 'en').slice(0, 2);
    applyLang(saved || (nav0 === 'ar' ? 'ar' : nav0 === 'ku' ? 'ku' : 'en'), false);

    initSplit();
    initReveal();
    observeNew('.card, .story, .step, .tile');

    initPreloader();
    initNav();
    initHero();
    initParallax();
    initCounters();
    initFilter();
    initGalleryToggle();
    initLightbox();
    initTestimonials();
    initCinema();
    initCompare();
    initFaqAccordion();
    initLangSwitcher();
    initModal();
    initForms();
    initCookie();
    initCursor();
    initMisc();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
