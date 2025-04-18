export interface ProjectTranslation {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  image: string;
  technologies: string[];
  category: string;
  github?: string;
  demo?: string;
  isOpenSource: boolean;
  inDevelopment?: boolean;
  translations: {
    en: ProjectTranslation;
    ru: ProjectTranslation;
    ua: ProjectTranslation;
  };
}

const projects: Project[] = [
  {
    id: 1,
    image: "/CaptchaSolver.png?height=300&width=400",
    technologies: ["Python", "TensorFlow", "OpenCV", "Pillow", "NumPy", "Keras"],
    category: "ai",
    github: "https://gitflic.ru/project/fukuyamakeiske/captcha-solver",
    isOpenSource: true,
    translations: {
      en: {
        title: "CAPTCHA Solver AI",
        description:
          "An AI-powered solution for solving various types of CAPTCHAs using computer vision and machine learning techniques.",
      },
      ru: {
        title: "ИИ для решения капч",
        description:
          "Решение на базе искусственного интеллекта для распознавания различных типов капч с использованием компьютерного зрения и машинного обучения.",
      },
      ua: {
        title: "ШІ для розв'язання капч",
        description:
          "Рішення на базі штучного інтелекту для розпізнавання різних типів капч з використанням комп'ютерного зору та машинного навчання.",
      },
    },
  },
  {
    id: 2,
    image: "/Cafeteria9.png",
    technologies: ["Kotlin", "Python", "MongoDB", "Android SDK"],
    category: "mobile",
    demo: "https://www.rustore.ru/catalog/app/com.torgtrans.stolovaya",
    isOpenSource: false,
    translations: {
      en: {
        title: "Cafeteria №9",
        description:
          "Mobile application for food ordering from cafeteria №9 with menu management, ordering, and delivery tracking.",
      },
      ru: {
        title: "Столовая №9",
        description:
          "Мобильное приложение для заказа еды из столовой №9 с управлением меню, заказами и отслеживанием доставки.",
      },
      ua: {
        title: "Їдальня №9",
        description:
          "Мобільний додаток для замовлення їжі з їдальні №9 з управлінням меню, замовленнями та відстеженням доставки.",
      },
    },
  },
  {
    id: 3,
    image: "/Maze.png",
    technologies: ["Python", "NumPy", "Curses"],
    category: "desktop",
    github: "https://github.com/FukuyamaKeiske/maze-game",
    isOpenSource: true,
    translations: {
      en: {
        title: "Console Maze Game",
        description:
          "A console game where the player has to find the exit from a randomly generated maze. The player controls the character using the WASD keys. One minute is allotted to complete the maze.",
      },
      ru: {
        title: "Консольная игра лабиринт",
        description:
          "Консольная игра, где игроку предстоит найти выход из случайно сгенерированного лабиринта. Игрок управляет персонажем с помощью клавиш WASD. На прохождение лабиринта отводится одна минута.",
      },
      ua: {
        title: "Консольна гра лабіринт",
        description:
          "Консольна гра, де гравцеві потрібно знайти вихід із випадково згенерованого лабіринту. Гравець керує персонажем за допомогою клавіш WASD. На проходження лабіринту відводиться одна хвилина.",
      },
    },
  },
  {
    id: 4,
    image: "/HappyCheckers.jpg?height=300&width=400",
    technologies: [
      "React",
      "Tailwind CSS",
      "Python",
      "MongoDB",
      "Telegram API",
    ],
    category: "bots",
    isOpenSource: false,
    translations: {
      en: {
        title: "HappyCheckers",
        description:
          "Telegram bot for playing checkers with friends or against AI with different difficulty levels.",
      },
      ru: {
        title: "HappyCheckers",
        description:
          "Телеграм-бот для игры в шашки с друзьями или против ИИ с разными уровнями сложности.",
      },
      ua: {
        title: "HappyCheckers",
        description:
          "Телеграм-бот для гри в шашки з друзями або проти ШІ з різними рівнями складності.",
      },
    },
  },
  {
    id: 5,
    image: "/Discogs.webp?height=300&width=400",
    technologies: ["Python", "aiohttp", "asyncio", "BeautifulSoup"],
    category: "scripts",
    isOpenSource: false,
    translations: {
      en: {
        title: "Discogs Parser",
        description:
          "High-performance asynchronous parser for Discogs music database with data extraction and analysis capabilities.",
      },
      ru: {
        title: "Парсер Discogs",
        description:
          "Высокопроизводительный асинхронный парсер для музыкальной базы данных Discogs с возможностями извлечения и анализа данных.",
      },
      ua: {
        title: "Парсер Discogs",
        description:
          "Високопродуктивний асинхронний парсер для музичної бази даних Discogs з можливостями вилучення та аналізу даних.",
      },
    },
  },
  {
    id: 6,
    image: "/BonBon.png",
    technologies: ["Python", "Discord.py", "Telegram API", "MongoDB"],
    category: "bots",
    inDevelopment: true,
    isOpenSource: true,
    github: "https://github.com/FukuyamaKeiske/BonBon",
    translations: {
      en: {
        title: "BonBon",
        description:
          "Gaming bot for Telegram and Discord with mini-games, tournaments, and leaderboards.",
      },
      ru: {
        title: "BonBon",
        description:
          "Игровой бот для Telegram и Discord с мини-играми, турнирами и таблицами лидеров.",
      },
      ua: {
        title: "BonBon",
        description:
          "Ігровий бот для Telegram та Discord з міні-іграми, турнірами та таблицями лідерів.",
      },
    },
  },
];

export default projects;
