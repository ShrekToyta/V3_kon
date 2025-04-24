import { generateID } from '../utils.js';

export const trips = [
  {
    id: generateID(),
    destination: "Москва",
      date: "2025-11-15",
      notes: "Посетить концерт Егора Крида",
    status: "planned"
  },
  {
    id: generateID(),
    destination: "остров Хонсю",
      date: "2025-07-20",
      notes: "Посмотреть на гору Фудзи",
    status: "planned"
  },
  
];