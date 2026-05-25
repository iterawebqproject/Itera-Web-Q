export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: "business" | "entertainment";
  author: string;
  readTime: string;
  date: string;
  image: string;
  caption: string;
}

export const articles: Article[] = [
  {
    id: "biz-1",
    title: "Thailand's GDP Growth Surges to 4.2% in Q1 Amid Export Boom",
    excerpt: "Strong demand from key trading partners drives economic expansion beyond forecasts, signaling a robust recovery for the Thai economy.",
    body: `Thailand's economy recorded its strongest quarterly growth in two years, expanding 4.2% year-on-year in the first quarter of 2026. The National Economic and Social Development Council (NESDC) attributed the surge primarily to a sharp increase in merchandise exports, which grew 12.3% compared to the same period last year.\n\nThe electronics and automotive sectors led the charge, with semiconductor exports alone rising 18% as global demand for chips continues to outpace supply. Thailand's position as a key node in the ASEAN electronics supply chain has attracted fresh waves of foreign direct investment, with the Board of Investment approving over 280 billion baht in new projects during Q1.\n\n"We are seeing a structural shift in Thailand's export competitiveness," said Dr. Somchai Wattanakul, chief economist at Kasikorn Research Center. "The diversification of trading partners beyond China and the US is paying dividends."\n\nTourism also contributed significantly, with international arrivals reaching 9.8 million in the quarter—a 22% increase from Q1 2025. The government's visa-free entry program for Chinese and Indian nationals has been particularly effective.\n\nHowever, economists caution that headwinds remain. Household debt stands at 91% of GDP, and the agricultural sector contracted 1.8% due to prolonged drought conditions in the northeast. The Bank of Thailand is expected to hold its policy rate steady at 2.25% in its next meeting, balancing growth support with financial stability concerns.`,
    category: "business",
    author: "Nattapong Srisuk",
    readTime: "5 min read",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    caption: "Bangkok's financial district skyline reflects the country's economic momentum."
  },
  {
    id: "biz-2",
    title: "SET Index Breaks 1,700 as Foreign Investors Return to Thai Equities",
    excerpt: "The benchmark index reaches its highest level in 18 months, fueled by renewed confidence in Thai corporate earnings and regional stability.",
    body: `The Stock Exchange of Thailand (SET) Index closed above 1,700 points for the first time since October 2024, marking a decisive shift in investor sentiment toward Thai equities. Foreign investors were net buyers for the eighth consecutive week, pouring 14.2 billion baht into the market.\n\nEnergy and banking stocks led the rally, with PTT Public Company rising 6.2% on the back of higher crude oil prices and Bangkok Bank gaining 4.8% after reporting better-than-expected net interest margins.\n\n"The combination of attractive valuations and improving fundamentals is drawing global capital back to Thailand," said Piyanuch Thongkham, head of research at Phatra Securities. "Thai stocks were among the most undervalued in ASEAN, and that gap is now closing."\n\nThe rally was also supported by the Bank of Thailand's decision to hold interest rates steady, which relieved concerns about tighter monetary policy weighing on corporate profitability. The baht strengthened modestly to 33.8 per dollar.\n\nAnalysts note that retail investor participation has also surged, with new trading accounts opened at a rate not seen since the post-COVID rally of 2021. However, some market watchers urge caution, pointing to geopolitical uncertainties and the potential for profit-taking after such a sustained run.`,
    category: "business",
    author: "Kanjana Phetmak",
    readTime: "4 min read",
    date: "April 9, 2026",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    caption: "Trading activity on the SET has reached its highest volume in over a year."
  },
  {
    id: "biz-3",
    title: "EV Manufacturing Hub: Thailand Attracts $3 Billion in New Investments",
    excerpt: "Major Chinese and Japanese automakers commit to building next-generation EV plants in the Eastern Economic Corridor.",
    body: `Thailand has cemented its position as Southeast Asia's leading electric vehicle manufacturing hub, with the Board of Investment announcing $3 billion in approved EV-related projects in the first quarter of 2026 alone.\n\nBYD's second Thai factory in Rayong province is now operational, producing 150,000 units annually for ASEAN markets. Meanwhile, Toyota has announced a 40-billion-baht investment to convert its Chachoengsao plant to produce hybrid and battery-electric vehicles exclusively by 2028.\n\n"Thailand's comprehensive EV ecosystem—from battery production to charging infrastructure—gives it a decisive advantage over regional competitors," said Dr. Vorapong Kittipanya-ngam, spokesperson for the Eastern Economic Corridor Office.\n\nThe government's EV 3.5 incentive package, which offers tax breaks of up to 40% for manufacturers meeting local content requirements, has been instrumental in attracting investment. Battery cell production capacity in Thailand is expected to reach 30 GWh by 2027.\n\nThe shift is also creating new employment opportunities, with an estimated 45,000 new jobs in the EV supply chain expected over the next two years. However, industry groups have raised concerns about the readiness of Thailand's technical workforce and are calling for accelerated training programs.`,
    category: "business",
    author: "Nattapong Srisuk",
    readTime: "5 min read",
    date: "April 8, 2026",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
    caption: "Electric vehicle production lines are expanding rapidly across Thailand's Eastern Seaboard."
  },
  {
    id: "biz-4",
    title: "Digital Payment Transactions in Thailand Surpass 20 Billion in 2025",
    excerpt: "PromptPay and mobile banking adoption reach record levels as Thailand accelerates toward a cashless society.",
    body: `Thailand's digital payment ecosystem reached a landmark milestone, with total electronic transactions surpassing 20 billion in 2025—a 35% increase from the previous year. The Bank of Thailand reported that PromptPay alone processed over 12 billion transactions valued at 38 trillion baht.\n\nThe surge reflects the deepening penetration of mobile banking and QR code payments across all demographics, including rural communities where cash was previously dominant. The government's digital wallet initiative, which distributed 10,000 baht to eligible citizens through a blockchain-based platform, also contributed to increased digital literacy.\n\n"We are witnessing a fundamental transformation in how Thais transact," said Sethaput Suthiwartnarueput, Governor of the Bank of Thailand. "The infrastructure we built over the past five years is now delivering tangible benefits in terms of financial inclusion and economic efficiency."\n\nCross-border QR payment linkages with Malaysia, Singapore, and Japan have also gained traction, facilitating seamless transactions for tourists and business travelers. The central bank is now in discussions with India and South Korea to expand the network further.`,
    category: "business",
    author: "Kanjana Phetmak",
    readTime: "4 min read",
    date: "April 7, 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    caption: "QR code payments have become ubiquitous across Thai markets and shops."
  },
  {
    id: "ent-1",
    title: "Thai Horror Film 'The Veil' Breaks Global Box Office Records",
    excerpt: "The supernatural thriller from director Banjong Pisanthanakun earns $180 million worldwide in its opening month.",
    body: `Thai cinema has achieved a historic milestone with "The Veil," directed by Banjong Pisanthanakun, becoming the highest-grossing Southeast Asian film of all time. The supernatural horror thriller has earned over $180 million globally in just four weeks of release.\n\nThe film, which draws on Thai folklore about spirits inhabiting ancient temples, has resonated with audiences far beyond Asia. It topped the box office in 23 countries, including strong performances in the United States, United Kingdom, and Brazil.\n\n"Thai horror has always had a devoted following, but 'The Veil' transcends genre boundaries," said film critic Wichaya Artamat. "It's a beautifully crafted film that happens to be terrifying."\n\nThe success has sparked renewed interest in Thai cinema internationally, with Netflix acquiring the streaming rights for a reported $25 million and two Hollywood studios expressing interest in English-language remakes. The Thai Film Board estimates that the film's success will generate over 5 billion baht in related tourism and cultural exports.\n\nPisanthanakun, known for the "Pee Mak" franchise, has announced his next project will be an epic historical drama set during the Ayutthaya period.`,
    category: "entertainment",
    author: "Siriporn Chaiyasit",
    readTime: "4 min read",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    caption: "'The Veil' has captivated global audiences with its blend of Thai folklore and modern horror."
  },
  {
    id: "ent-2",
    title: "Blackpink's Lisa Announces Solo World Tour Starting in Bangkok",
    excerpt: "The Thai-born K-pop superstar reveals a 30-city global tour with her hometown as the inaugural venue.",
    body: `Lisa Manobal, the Thai-born global superstar known for her role in BLACKPINK, has announced her first solo world tour, "LLOUD World Tour," with Bangkok's Rajamangala Stadium as the opening venue on June 15, 2026.\n\nThe 30-city tour will span Asia, Europe, North America, and Australia, making it one of the largest solo tours by an Asian artist in history. Pre-sale registration crashed multiple ticketing platforms within minutes of the announcement.\n\n"Bangkok is where my journey began, and it's only right that I start there," Lisa said in a video message to fans. "I want to give Thai fans the show of a lifetime."\n\nThe concert is expected to attract over 50,000 attendees per night, with the Bangkok dates expanded to three consecutive shows due to overwhelming demand. The Tourism Authority of Thailand estimates the event will draw 100,000 international visitors and generate 8 billion baht in economic activity.\n\nLisa's solo career has flourished since departing BLACKPINK's agency, with her LLOUD label signing a groundbreaking deal with RCA Records. Her debut album under the new label has already produced three Billboard Hot 100 entries.`,
    category: "entertainment",
    author: "Siriporn Chaiyasit",
    readTime: "4 min read",
    date: "April 9, 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    caption: "The announcement has sent fans into a frenzy across social media platforms."
  },
  {
    id: "ent-3",
    title: "Songkran 2026: Bangkok Prepares for the Biggest Water Festival Yet",
    excerpt: "The capital expects 2 million participants as Songkran celebrations expand to a full week of cultural events.",
    body: `Bangkok is gearing up for what officials predict will be the largest Songkran celebration in history, with the traditional Thai New Year water festival expanding to a full seven days of events from April 11-17, 2026.\n\nThe Bangkok Metropolitan Administration has designated 15 official celebration zones across the city, with Khao San Road, Silom, and the newly renovated Chao Phraya riverfront promenade serving as the primary venues. A spectacular drone light show over the Grand Palace will kick off the festivities.\n\n"Songkran is no longer just a Thai celebration—it's a global event," said Tourism Minister Sudawan Wangsuphakijkosol. "We expect over 500,000 international visitors during the festival week."\n\nNew this year is a cultural immersion program offering tourists hands-on experiences in traditional Songkran rituals, including the bathing of Buddha images, sand stupa building, and traditional dance workshops. The program aims to balance the festive water-throwing with deeper cultural appreciation.\n\nSafety measures have been enhanced, with 10,000 additional police officers deployed and strict enforcement of road safety laws during the holiday period, which historically sees a spike in traffic accidents.`,
    category: "entertainment",
    author: "Wichai Boonma",
    readTime: "5 min read",
    date: "April 8, 2026",
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1200&q=80",
    caption: "Songkran preparations are in full swing across Bangkok's historic districts."
  },
  {
    id: "ent-4",
    title: "Thai Series 'Moonlight Bamboo Forest' Tops Netflix Charts in 40 Countries",
    excerpt: "The romantic drama set in Chiang Mai becomes Thailand's most-watched series on Netflix, surpassing previous BL drama records.",
    body: `Thailand's entertainment industry has scored another international hit with "Moonlight Bamboo Forest," a romantic drama series set in the mountains of Chiang Mai that has reached the #1 spot on Netflix in 40 countries within its first week of release.\n\nThe series, produced by GMMTV and directed by Nattapol Diloknawarit, tells the story of a Bangkok architect who discovers a hidden community preserving ancient Lanna traditions while working on a resort development project. The show has been praised for its stunning cinematography, nuanced storytelling, and authentic portrayal of Northern Thai culture.\n\n"This series proves that Thai storytelling can captivate global audiences without compromising cultural authenticity," said GMMTV CEO Sataporn Panichraksapong. "We're incredibly proud of what the team has achieved."\n\nThe show's success has triggered a tourism boom in Chiang Mai, with searches for flights to the northern city increasing 340% in the week following the premiere. Several filming locations have become popular pilgrimage sites for international fans.\n\nNetflix has already commissioned a second season, and discussions are underway for a theatrical film adaptation for the Chinese market.`,
    category: "entertainment",
    author: "Wichai Boonma",
    readTime: "4 min read",
    date: "April 7, 2026",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80",
    caption: "Chiang Mai's stunning landscapes serve as the backdrop for the hit Netflix series."
  },
];

export const breakingNews = [
  "BREAKING: Thailand's GDP growth hits 4.2% in Q1 2026, exceeding analyst expectations",
  "SET Index crosses 1,700 points as foreign investors return with confidence",
  "Lisa announces 30-city world tour starting in Bangkok this June",
  "Songkran 2026 set to be the biggest celebration in history with 2M expected participants",
  "'The Veil' becomes highest-grossing Southeast Asian film at $180M worldwide",
];

export const getArticlesByCategory = (category: "business" | "entertainment") =>
  articles.filter((a) => a.category === category);

export const getArticleById = (id: string) =>
  articles.find((a) => a.id === id);

export const getTrendingArticles = () => articles.slice(0, 5);
