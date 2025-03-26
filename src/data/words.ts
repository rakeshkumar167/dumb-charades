// Categories and their words for different difficulty levels
export type Difficulty = 'easy' | 'medium' | 'hard' | 'insane';
export type Category = 'hindi-movies' | 'english-movies' | 'bollywood-actors' | 'hollywood-actors' | 'pictionary';

export const gameData: Record<Category, Record<Difficulty, string[]>> = {
  'hindi-movies': {
    easy: [
      'DDLJ', 'Kuch Kuch Hota Hai', 'Sholay', '3 Idiots', 'PK',
      // ... Add more words to reach ~200
    ],
    medium: [
      'Andhadhun', 'Gully Boy', 'Barfi', 'Queen', 'Kahaani',
      // ... Add more words to reach ~200
    ],
    hard: [
      'Masaan', 'Ship of Theseus', 'Court', 'Lunch Box', 'Udaan',
      // ... Add more words to reach ~200
    ],
    insane: [
      'Pushpak', 'Ardh Satya', 'Jaane Bhi Do Yaaro', 'Ankur', 'Albert Pinto Ko Gussa Kyoon Aata Hai',
      // ... Add more words to reach ~200
    ]
  },
  'english-movies': {
    easy: [
      'Titanic', 'Avatar', 'The Lion King', 'Frozen', 'Spider-Man',
      // ... Add more words to reach ~200
    ],
    medium: [
      'Inception', 'The Matrix', 'Fight Club', 'Pulp Fiction', 'The Godfather',
      // ... Add more words to reach ~200
    ],
    hard: [
      'Memento', 'Mulholland Drive', 'The Seventh Seal', 'Rashomon', '8½',
      // ... Add more words to reach ~200
    ],
    insane: [
      'Synecdoche New York', 'The Holy Mountain', 'Last Year at Marienbad', 'Persona', 'Un Chien Andalou',
      // ... Add more words to reach ~200
    ]
  },
  'bollywood-actors': {
    easy: [
      'Shah Rukh Khan', 'Amitabh Bachchan', 'Aamir Khan', 'Salman Khan', 'Deepika Padukone',
      // ... Add more words to reach ~200
    ],
    medium: [
      'Naseeruddin Shah', 'Irrfan Khan', 'Tabu', 'Konkona Sen', 'Nawazuddin Siddiqui',
      // ... Add more words to reach ~200
    ],
    hard: [
      'Balraj Sahni', 'Motilal', 'Smita Patil', 'Shabana Azmi', 'Om Puri',
      // ... Add more words to reach ~200
    ],
    insane: [
      'K.L. Saigal', 'Durga Khote', 'Prithviraj Kapoor', 'Devika Rani', 'Ashok Kumar',
      // ... Add more words to reach ~200
    ]
  },
  'hollywood-actors': {
    easy: [
      'Tom Cruise', 'Brad Pitt', 'Leonardo DiCaprio', 'Jennifer Lawrence', 'Angelina Jolie',
      // ... Add more words to reach ~200
    ],
    medium: [
      'Gary Oldman', 'Philip Seymour Hoffman', 'Cate Blanchett', 'Meryl Streep', 'Daniel Day-Lewis',
      // ... Add more words to reach ~200
    ],
    hard: [
      'Klaus Kinski', 'Max von Sydow', 'Toshiro Mifune', 'Peter O\'Toole', 'Omar Sharif',
      // ... Add more words to reach ~200
    ],
    insane: [
      'Lillian Gish', 'Lon Chaney', 'Rudolph Valentino', 'Louise Brooks', 'Charlie Chaplin',
      // ... Add more words to reach ~200
    ]
  },
  'pictionary': {
    easy: [
      'Cat', 'Dog', 'House', 'Tree', 'Sun',
      // ... Add more words to reach ~200
    ],
    medium: [
      'Skateboard', 'Orchestra', 'Lighthouse', 'Windmill', 'Rainbow',
      // ... Add more words to reach ~200
    ],
    hard: [
      'Democracy', 'Evolution', 'Nostalgia', 'Philosophy', 'Quantum',
      // ... Add more words to reach ~200
    ],
    insane: [
      'Existentialism', 'Procrastination', 'Enlightenment', 'Bureaucracy', 'Metamorphosis',
      // ... Add more words to reach ~200
    ]
  }
};