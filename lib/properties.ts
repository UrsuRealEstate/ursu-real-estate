export interface Property {
  id: string
  title: { en: string; ru: string; it: string }
  description: { en: string; ru: string; it: string }
  price: number
  currency: string
  area: number
  rooms: number
  bathrooms: number
  location: { en: string; ru: string; it: string }
  city: { en: string; ru: string; it: string }
  image: string
  images: string[]
  features: { en: string[]; ru: string[]; it: string[] }
}

export const properties: Property[] = [
  {
    id: 'amalfi-coast-villa',
    title: {
      en: 'Luxury Apartment on the Amalfi Coast',
      ru: 'Роскошные апартаменты на побережье Амальфи',
      it: 'Appartamento di Lusso sulla Costiera Amalfitana',
    },
    description: {
      en: 'An exquisite apartment with panoramic views of the Mediterranean Sea. Marble floors, floor-to-ceiling windows, and a spacious terrace overlooking the historic coastline. Located in one of the most prestigious areas of the Amalfi Coast.',
      ru: 'Изысканные апартаменты с панорамным видом на Средиземное море. Мраморные полы, панорамные окна и просторная терраса с видом на историческое побережье. Расположены в одном из самых престижных районов побережья Амальфи.',
      it: 'Un appartamento squisito con vista panoramica sul Mar Mediterraneo. Pavimenti in marmo, finestre dal pavimento al soffitto e un\'ampia terrazza con vista sulla costa storica. Situato in una delle zone più prestigiose della Costiera Amalfitana.',
    },
    price: 1250000,
    currency: '€',
    area: 185,
    rooms: 4,
    bathrooms: 2,
    location: {
      en: 'Positano, Amalfi Coast',
      ru: 'Позитано, побережье Амальфи',
      it: 'Positano, Costiera Amalfitana',
    },
    city: { en: 'Positano', ru: 'Позитано', it: 'Positano' },
    image: '/properties/property-1.png',
    images: ['/properties/property-1.png'],
    features: {
      en: ['Sea View', 'Marble Floors', 'Terrace', 'Air Conditioning', 'Parking'],
      ru: ['Вид на море', 'Мраморные полы', 'Терраса', 'Кондиционер', 'Парковка'],
      it: ['Vista Mare', 'Pavimenti in Marmo', 'Terrazza', 'Aria Condizionata', 'Parcheggio'],
    },
  },
  {
    id: 'tuscan-villa',
    title: {
      en: 'Historic Villa in Tuscany',
      ru: 'Историческая вилла в Тоскане',
      it: 'Villa Storica in Toscana',
    },
    description: {
      en: 'A magnificent stone villa nestled among rolling Tuscan hills. Features a private pool, extensive gardens with olive groves, and beautifully restored interiors. The perfect blend of historic charm and modern comfort.',
      ru: 'Великолепная каменная вилла среди холмов Тосканы. Частный бассейн, обширные сады с оливковыми рощами и прекрасно отреставрированные интерьеры. Идеальное сочетание исторического шарма и современного комфорта.',
      it: 'Una magnifica villa in pietra immersa nelle colline toscane. Piscina privata, ampi giardini con uliveti e interni splendidamente restaurati. Il perfetto connubio tra fascino storico e comfort moderno.',
    },
    price: 2800000,
    currency: '€',
    area: 420,
    rooms: 7,
    bathrooms: 4,
    location: {
      en: 'Chianti, Tuscany',
      ru: 'Кьянти, Тоскана',
      it: 'Chianti, Toscana',
    },
    city: { en: 'Chianti', ru: 'Кьянти', it: 'Chianti' },
    image: '/properties/property-2.png',
    images: ['/properties/property-2.png'],
    features: {
      en: ['Swimming Pool', 'Garden', 'Olive Grove', 'Wine Cellar', 'Fireplace', 'Restored'],
      ru: ['Бассейн', 'Сад', 'Оливковая роща', 'Винный погреб', 'Камин', 'Реставрация'],
      it: ['Piscina', 'Giardino', 'Uliveto', 'Cantina', 'Camino', 'Restaurato'],
    },
  },
  {
    id: 'milan-penthouse',
    title: {
      en: 'Modern Penthouse in Milan',
      ru: 'Современный пентхаус в Милане',
      it: 'Attico Moderno a Milano',
    },
    description: {
      en: 'A stunning contemporary penthouse in the heart of Milan with a rooftop terrace offering breathtaking city views. Designer kitchen, floor-to-ceiling windows, and premium finishes throughout. Steps from the Duomo and fashion district.',
      ru: 'Потрясающий современный пентхаус в сердце Милана с террасой на крыше и захватывающим видом на город. Дизайнерская кухня, панорамные окна и премиальная отделка. В нескольких шагах от Дуомо и модного квартала.',
      it: 'Uno splendido attico contemporaneo nel cuore di Milano con terrazza panoramica e vista mozzafiato sulla città. Cucina di design, finestre dal pavimento al soffitto e finiture premium. A pochi passi dal Duomo e dal quadrilatero della moda.',
    },
    price: 3500000,
    currency: '€',
    area: 280,
    rooms: 5,
    bathrooms: 3,
    location: {
      en: 'City Center, Milan',
      ru: 'Центр города, Милан',
      it: 'Centro Città, Milano',
    },
    city: { en: 'Milan', ru: 'Милан', it: 'Milano' },
    image: '/properties/property-3.png',
    images: ['/properties/property-3.png'],
    features: {
      en: ['Rooftop Terrace', 'City View', 'Designer Kitchen', 'Concierge', 'Gym', 'Smart Home'],
      ru: ['Терраса на крыше', 'Вид на город', 'Дизайнерская кухня', 'Консьерж', 'Спортзал', 'Умный дом'],
      it: ['Terrazza Panoramica', 'Vista Città', 'Cucina di Design', 'Portineria', 'Palestra', 'Domotica'],
    },
  },
  {
    id: 'rome-historic',
    title: {
      en: 'Historic Apartment in Rome',
      ru: 'Историческая квартира в Риме',
      it: 'Appartamento Storico a Roma',
    },
    description: {
      en: 'A beautifully renovated apartment in a historic Roman palazzo. Original frescoed ceilings, herringbone parquet floors, and arched windows overlooking a quiet piazza. A rare find in the Eternal City.',
      ru: 'Прекрасно отреставрированная квартира в историческом римском палаццо. Оригинальные потолки с фресками, паркет «ёлочкой» и арочные окна с видом на тихую площадь. Редкая находка в Вечном городе.',
      it: 'Un appartamento splendidamente ristrutturato in un palazzo storico romano. Soffitti originali affrescati, pavimenti in parquet a spina di pesce e finestre ad arco con vista su una piazza tranquilla. Un\'occasione rara nella Città Eterna.',
    },
    price: 1850000,
    currency: '€',
    area: 210,
    rooms: 4,
    bathrooms: 2,
    location: {
      en: 'Historic Center, Rome',
      ru: 'Исторический центр, Рим',
      it: 'Centro Storico, Roma',
    },
    city: { en: 'Rome', ru: 'Рим', it: 'Roma' },
    image: '/properties/property-4.png',
    images: ['/properties/property-4.png'],
    features: {
      en: ['Frescoed Ceilings', 'Parquet Floors', 'Fireplace', 'Balcony', 'Elevator', 'Wine Cellar'],
      ru: ['Потолки с фресками', 'Паркетные полы', 'Камин', 'Балкон', 'Лифт', 'Винный погреб'],
      it: ['Soffitti Affrescati', 'Pavimenti in Parquet', 'Camino', 'Balcone', 'Ascensore', 'Cantina'],
    },
  },
]

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString('en-US')}`
}
