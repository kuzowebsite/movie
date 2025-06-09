"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  ArrowLeft,
  Settings,
  Loader2,
  Star,
  Clock,
  Calendar,
  CaptionsIcon as ClosedCaptioning,
  Download,
  Share,
  Heart,
  Plus,
  X,
  CreditCard,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Mic,
  BookOpen,
  Type,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

interface Episode {
  id: number
  title: string
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
}

interface Person {
  name: string
  image: string
  role?: string
}

interface VoiceActor {
  name: string
  image: string
  character: string
}

interface Creator {
  name: string
  image: string
  role: string
}

interface Movie {
  id: number
  title: string
  description: string
  price: number
  rating: number
  duration: string
  year: string
  genre: string
  image: string
  director: Person
  cast: Person[]
  videoUrl?: string
  episodes?: Episode[]
  type?: "movie" | "anime"
  voiceActors?: VoiceActor[]
  creators?: Creator[]
}

interface SubtitleSettings {
  size: "small" | "medium" | "large" | "extra-large"
  backgroundColor: "transparent" | "black" | "white" | "gray" | "red" | "blue"
  textColor: "white" | "black" | "yellow" | "red" | "blue" | "green"
  opacity: number
  position: "bottom" | "top" | "center"
}

// Update the movies array to include all movies from the main page with matching IDs

const movies: Movie[] = [
  // Movies from main page
  {
    id: 1,
    title: "ZONE",
    description:
      "Бэлтгэл ойн дунд нэгэн нуучлаг цэргийн баазад гэмт хэрэгтнүүд ирнэ. Тэд эхэндээ зугээр л хатуу долгионтой хөдөлмөрийн лагерь гэж бодож байсан боловч үүний бодь. Харин бүрүүгээр эргэж үл мэдэгдэх хөлцөдөөр тохон тэрхүү эхэллээ. Тэд өнөө үндээ чадах болов уу? Энэхүү кино нь хүчирхийлэл, найрамдал, хүний сэтгэлийн хүчийг харуулсан гайхамшигтай бүтээл юм.",
    price: 15000,
    rating: 4.8,
    duration: "136 мин",
    year: "2024",
    genre: "Адал явдал • Нөмрөг",
    image: "/images/hero-bg.png",
    type: "movie",
    director: {
      name: "Б.Батбаяр",
      image: "/placeholder.svg?height=200&width=150&text=Б.Батбаяр",
      role: "Найруулагч",
    },
    cast: [
      {
        name: "Ц.Алтанцэцэг",
        image: "/placeholder.svg?height=200&width=150&text=Ц.Алтанцэцэг",
        role: "Гол дүр",
      },
      {
        name: "Б.Амарсайхан",
        image: "/placeholder.svg?height=200&width=150&text=Б.Амарсайхан",
        role: "Туслах дүр",
      },
      {
        name: "Д.Батбаяр",
        image: "/placeholder.svg?height=200&width=150&text=Д.Батбаяр",
        role: "Антагонист",
      },
      {
        name: "С.Отгонбаяр",
        image: "/placeholder.svg?height=200&width=150&text=С.Отгонбаяр",
        role: "Туслах дүр",
      },
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    title: "Гэнэтийн Зочид",
    description:
      "Гэр бүлийн амьдралд гэнэт ирсэн зочид бүх зүйлийг өөрчилж орхино. Инээдтэй, сэтгэл хөдөлгөм монгол кино.",
    price: 12000,
    rating: 4.6,
    duration: "108 мин",
    year: "2023",
    genre: "Инээдэм • Гэр бүл",
    image: "/images/movie5.png",
    type: "movie",
    director: {
      name: "Д.Мөнхбат",
      image: "/placeholder.svg?height=200&width=150&text=Д.Мөнхбат",
      role: "Найруулагч",
    },
    cast: [
      {
        name: "Б.Батмөнх",
        image: "/placeholder.svg?height=200&width=150&text=Б.Батмөнх",
        role: "Гол дүр",
      },
      {
        name: "Г.Сарантуяа",
        image: "/placeholder.svg?height=200&width=150&text=Г.Сарантуяа",
        role: "Эхнэр",
      },
      {
        name: "Ч.Болормаа",
        image: "/placeholder.svg?height=200&width=150&text=Ч.Болормаа",
        role: "Зочин",
      },
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 3,
    title: "Family Shock",
    description: "Гэр бүлийн нууц задарч, бүх гишүүд цочирдох үед тэд хэрхэн нэгдэж чадах вэ? Сэтгэл хөдөлгөм драм.",
    price: 13000,
    rating: 4.7,
    duration: "118 мин",
    year: "2023",
    genre: "Драм • Гэр бүл",
    image: "/images/movie2.png",
    type: "movie",
    director: {
      name: "С.Энхбаяр",
      image: "/placeholder.svg?height=200&width=150&text=С.Энхбаяр",
      role: "Найруулагч",
    },
    cast: [
      {
        name: "Т.Батбаяр",
        image: "/placeholder.svg?height=200&width=150&text=Т.Батбаяр",
        role: "Эцэг",
      },
      {
        name: "М.Оюунцэцэг",
        image: "/placeholder.svg?height=200&width=150&text=М.Оюунцэцэг",
        role: "Эх",
      },
      {
        name: "Б.Мөнхзул",
        image: "/placeholder.svg?height=200&width=150&text=Б.Мөнхзул",
        role: "Охин",
      },
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    title: "In Da House 3",
    description: "Солонгосын алдартай инээдэм киноны гуравдахь хэсэг. Найз нөхдийн хооронд болох хачирхалтай явдлууд.",
    price: 14000,
    rating: 4.5,
    duration: "125 мин",
    year: "2025",
    genre: "Инээдэм • Найзууд",
    image: "/images/movie3.png",
    type: "movie",
    director: {
      name: "Ким Мин Хо",
      image: "/placeholder.svg?height=200&width=150&text=Ким+Мин+Хо",
      role: "Найруулагч",
    },
    cast: [
      {
        name: "Ли Жон Сок",
        image: "/placeholder.svg?height=200&width=150&text=Ли+Жон+Сок",
        role: "Гол дүр",
      },
      {
        name: "Парк Бо Ён",
        image: "/placeholder.svg?height=200&width=150&text=Парк+Бо+Ён",
        role: "Найз охин",
      },
      {
        name: "Ким Ү Жин",
        image: "/placeholder.svg?height=200&width=150&text=Ким+Ү+Жин",
        role: "Найз",
      },
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 5,
    title: "Wolf of the Tegri",
    description: "Эрдэнэ билэгтийн бүтээл. Монголын түүхэн дэх агуу дайчдын тухай эпик кино. Тэнгэрийн чонын домог.",
    price: 16000,
    rating: 4.9,
    duration: "155 мин",
    year: "2022",
    genre: "Түүх • Эпик",
    image: "/images/movie4.png",
    type: "movie",
    director: {
      name: "Эрдэнэ Билэг",
      image: "/placeholder.svg?height=200&width=150&text=Эрдэнэ+Билэг",
      role: "Найруулагч",
    },
    cast: [
      {
        name: "А.Амарсайхан",
        image: "/placeholder.svg?height=200&width=150&text=А.Амарсайхан",
        role: "Чингис хаан",
      },
      {
        name: "Б.Батбаяр",
        image: "/placeholder.svg?height=200&width=150&text=Б.Батбаяр",
        role: "Жэбэ",
      },
      {
        name: "Д.Отгонбаяр",
        image: "/placeholder.svg?height=200&width=150&text=Д.Отгонбаяр",
        role: "Сүбээдэй",
      },
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 6,
    title: "Хүүхдийн Дурлал",
    description: "Хүүхэд насны дурсамж, найзууд, гэр бүлийн хайрыг дүрсэлсэн сэтгэл хөдөлгөм кино.",
    price: 11000,
    rating: 4.4,
    duration: "95 мин",
    year: "2023",
    genre: "Гэр бүл • Драм",
    image: "/images/movie1.png",
    type: "movie",
    director: {
      name: "Ж.Мөнхбаяр",
      image: "/placeholder.svg?height=200&width=150&text=Ж.Мөнхбаяр",
      role: "Найруулагч",
    },
    cast: [
      {
        name: "Б.Мөнхзул",
        image: "/placeholder.svg?height=200&width=150&text=Б.Мөнхзул",
        role: "Хүүхэд",
      },
      {
        name: "Г.Сарантуяа",
        image: "/placeholder.svg?height=200&width=150&text=Г.Сарантуяа",
        role: "Эх",
      },
      {
        name: "Д.Батбаяр",
        image: "/placeholder.svg?height=200&width=150&text=Д.Батбаяр",
        role: "Эцэг",
      },
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  // Anime entries - keeping the same IDs but using different range to avoid conflicts
  {
    id: 101,
    title: "Jujutsu Kaisen",
    description:
      "Ид шидийн сургуулийн оюутан Южи Итадори харааны хүчтэй ид шидтэй тулалдана. Гайхамшигтай тулааны анимэ. Итадори Южи энгийн ахлах сургуулийн сурагч байсан ч нэгэн өдөр зуршил болсон хүчтэй ид шидийн эд зүйлийг залгиснаар амьдрал нь бүрэн өөрчлөгдөнө. Тэрээр ид шидийн хүчийг эзэмшсэн хүмүүсийн нууц нийгэмлэгт элсэж, хүн төрөлхтнийг аврах тэмцэлд оролцоно.",
    price: 18000,
    rating: 4.9,
    duration: "24 мин",
    year: "2020",
    genre: "Адал явдал • Анимэ",
    image: "/images/anime1.jpg",
    type: "anime",
    director: {
      name: "Сунгхо Парк",
      image: "/placeholder.svg?height=200&width=150&text=Сунгхо+Парк",
      role: "Найруулагч",
    },
    cast: [],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    episodes: [
      {
        id: 1,
        title: "1-р анги: Рёмен Сукуна",
        description: "Итадори Южи ид шидийн хуруу олж, түүнийг залгиснаар түүний амьдрал өөрчлөгдөнө",
        duration: "24 мин",
        thumbnail: "/images/anime1.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        title: "2-р анги: Ид шидийн сургууль",
        description: "Итадори Южи ид шидийн сургуульд элсэж, шинэ найзуудтай танилцана",
        duration: "24 мин",
        thumbnail: "/images/anime1.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: 3,
        title: "3-р анги: Дайсан",
        description: "Итадори анхны том дайсантайгаа тулгарна",
        duration: "24 мин",
        thumbnail: "/images/anime1.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
    voiceActors: [
      {
        name: "Жүнья Эноки",
        image: "/placeholder.svg?height=200&width=150&text=Жүнья+Эноки",
        character: "Итадори Южи",
      },
      {
        name: "Юма Учида",
        image: "/placeholder.svg?height=200&width=150&text=Юма+Учида",
        character: "Мегуми Фүшигүро",
      },
      {
        name: "Асами Сэто",
        image: "/placeholder.svg?height=200&width=150&text=Асами+Сэто",
        character: "Нобара Кугисаки",
      },
      {
        name: "Жүничи Сүвабэ",
        image: "/placeholder.svg?height=200&width=150&text=Жүничи+Сүвабэ",
        character: "Сатору Гожо",
      },
    ],
    creators: [
      {
        name: "Гэгэ Акүтами",
        image: "/placeholder.svg?height=200&width=150&text=Гэгэ+Акүтами",
        role: "Манга зохиолч",
      },
      {
        name: "Сунгхо Парк",
        image: "/placeholder.svg?height=200&width=150&text=Сунгхо+Парк",
        role: "Найруулагч",
      },
      {
        name: "MAPPA",
        image: "/placeholder.svg?height=200&width=150&text=MAPPA",
        role: "Анимэ студи",
      },
    ],
  },
  {
    id: 102,
    title: "Tokyo Ghoul",
    description:
      "Хүн болон гоул хоёрын хооронд амьдрах залуугийн түүх. Харанхуй, сэтгэл хөдөлгөм анимэ. Канэки Кэн энгийн оюутан байсан ч нэгэн удаагийн осол түүнийг хагас хүн, хагас гоул болгон хувиргана. Тэрээр хүний махаар хооллодог гоул нар болон хүмүүсийн хооронд зогсож, өөрийн шинэ байдалтайгаа эвлэрэхийг хичээнэ.",
    price: 16000,
    rating: 4.8,
    duration: "22 мин",
    year: "2014",
    genre: "Фэнтэзи • Анимэ",
    image: "/images/anime2.jpg",
    type: "anime",
    director: {
      name: "Шүхэй Морита",
      image: "/placeholder.svg?height=200&width=150&text=Шүхэй+Морита",
      role: "Найруулагч",
    },
    cast: [],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    episodes: [
      {
        id: 1,
        title: "1-р анги: Трагеди",
        description: "Канэки Кэн гоул болсноор түүний амьдрал өөрчлөгдөнө",
        duration: "22 мин",
        thumbnail: "/images/anime2.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: 2,
        title: "2-р анги: Кафе Антейку",
        description: "Канэки гоул нарын кафед ажиллаж эхэлнэ",
        duration: "22 мин",
        thumbnail: "/images/anime2.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
    voiceActors: [
      {
        name: "Нацүки Ханаэ",
        image: "/placeholder.svg?height=200&width=150&text=Нацүки+Ханаэ",
        character: "Канэки Кэн",
      },
      {
        name: "Сора Амамия",
        image: "/placeholder.svg?height=200&width=150&text=Сора+Амамия",
        character: "Тоука Киришима",
      },
      {
        name: "Мамору Мияно",
        image: "/placeholder.svg?height=200&width=150&text=Мамору+Мияно",
        character: "Цүкияма Шүү",
      },
      {
        name: "Кана Ханазава",
        image: "/placeholder.svg?height=200&width=150&text=Кана+Ханазава",
        character: "Рисэ Камишира",
      },
    ],
    creators: [
      {
        name: "Сүи Ишида",
        image: "/placeholder.svg?height=200&width=150&text=Сүи+Ишида",
        role: "Манга зохиолч",
      },
      {
        name: "Шүхэй Морита",
        image: "/placeholder.svg?height=200&width=150&text=Шүхэй+Морита",
        role: "Найруулагч",
      },
      {
        name: "Studio Pierrot",
        image: "/placeholder.svg?height=200&width=150&text=Studio+Pierrot",
        role: "Анимэ студи",
      },
    ],
  },
  {
    id: 103,
    title: "Naruto Shippuden",
    description:
      "Наруто Узумакигийн хокаге болох замын түүх. Найрамдал, хүчин чармайлтын тухай эпик анимэ. Наруто Узумаки бол ниндзя болох мөрөөдөлтэй залуу хүү. Тэрээр өөрийн дотор нуугдсан есөн сүүлт үнэгний хүчийг ашиглан тосгоноо хамгаалж, хамгийн хүчирхэг ниндзя - Хокаге болохыг хүсдэг.",
    price: 15000,
    rating: 4.7,
    duration: "25 мин",
    year: "2007",
    genre: "Адал явдал • Анимэ",
    image: "/images/anime3.jpg",
    type: "anime",
    director: {
      name: "Хаято Датэ",
      image: "/placeholder.svg?height=200&width=150&text=Хаято+Датэ",
      role: "Найруулагч",
    },
    cast: [],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    episodes: [
      {
        id: 1,
        title: "1-р анги: Буцаж ирсэн",
        description: "Наруто 2 жилийн дараа тосгондоо буцаж ирнэ",
        duration: "25 мин",
        thumbnail: "/images/anime3.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        id: 2,
        title: "2-р анги: Акацүки",
        description: "Акацүки бүлэглэл хөдөлж эхэлнэ",
        duration: "25 мин",
        thumbnail: "/images/anime3.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
    voiceActors: [
      {
        name: "Жүнко Такэучи",
        image: "/placeholder.svg?height=200&width=150&text=Жүнко+Такэучи",
        character: "Наруто Узумаки",
      },
      {
        name: "Нориаки Сүгияма",
        image: "/placeholder.svg?height=200&width=150&text=Нориаки+Сүгияма",
        character: "Саскэ Учиха",
      },
      {
        name: "Чиэ Накамура",
        image: "/placeholder.svg?height=200&width=150&text=Чиэ+Накамура",
        character: "Сакура Харуно",
      },
      {
        name: "Казүхико Иноуэ",
        image: "/placeholder.svg?height=200&width=150&text=Казүхико+Иноуэ",
        character: "Какаши Хатакэ",
      },
    ],
    creators: [
      {
        name: "Масаши Кишимото",
        image: "/placeholder.svg?height=200&width=150&text=Масаши+Кишимото",
        role: "Манга зохиолч",
      },
      {
        name: "Хаято Датэ",
        image: "/placeholder.svg?height=200&width=150&text=Хаято+Датэ",
        role: "Найруулагч",
      },
      {
        name: "Studio Pierrot",
        image: "/placeholder.svg?height=200&width=150&text=Studio+Pierrot",
        role: "Анимэ студи",
      },
    ],
  },
  {
    id: 104,
    title: "Seven Deadly Sins",
    description:
      "Долоон нүглийн баатрууд хаант улсыг аврахын тулд нэгдэнэ. Фэнтэзи адал явдлын анимэ. Британи хаант улсыг Ариун Рыцарууд эзлэн авсны дараа хунтайж Элизабет Лионес нь нэгэн үе Британийг хамгаалж байсан Долоон Нүглийн Баатруудыг хайж эхэлнэ.",
    price: 12000,
    rating: 4.5,
    duration: "20 мин",
    year: "2014",
    genre: "Фэнтэзи • Анимэ",
    image: "/images/anime4.jpg",
    type: "anime",
    director: {
      name: "Тэнсай Окамура",
      image: "/placeholder.svg?height=200&width=150&text=Тэнсай+Окамура",
      role: "Найруулагч",
    },
    cast: [],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    episodes: [
      {
        id: 1,
        title: "1-р анги: Долоон нүглийн баатрууд",
        description: "Хунтайж Элизабет Долоон Нүглийн Баатруудыг хайж эхэлнэ",
        duration: "20 мин",
        thumbnail: "/images/anime4.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        title: "2-р анги: Мэлиодас",
        description: "Элизабет Мэлиодастай танилцана",
        duration: "20 мин",
        thumbnail: "/images/anime4.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
    ],
    voiceActors: [
      {
        name: "Юки Кажи",
        image: "/placeholder.svg?height=200&width=150&text=Юки+Кажи",
        character: "Мэлиодас",
      },
      {
        name: "Сора Амамия",
        image: "/placeholder.svg?height=200&width=150&text=Сора+Амамия",
        character: "Элизабет Лионес",
      },
      {
        name: "Мисаки Куно",
        image: "/placeholder.svg?height=200&width=150&text=Мисаки+Куно",
        character: "Диана",
      },
      {
        name: "Аои Юки",
        image: "/placeholder.svg?height=200&width=150&text=Аои+Юки",
        character: "Мэрлин",
      },
    ],
    creators: [
      {
        name: "Накаба Сузуки",
        image: "/placeholder.svg?height=200&width=150&text=Накаба+Сузуки",
        role: "Манга зохиолч",
      },
      {
        name: "Тэнсай Окамура",
        image: "/placeholder.svg?height=200&width=150&text=Тэнсай+Окамура",
        role: "Найруулагч",
      },
      {
        name: "A-1 Pictures",
        image: "/placeholder.svg?height=200&width=150&text=A-1+Pictures",
        role: "Анимэ студи",
      },
    ],
  },
  {
    id: 105,
    title: "Steins;Gate",
    description:
      "Цаг хугацааны аялалын тухай шинжлэх ухааны уран зөгнөлт анимэ. Гүн утга санаатай түүх. Окабэ Ринтаро бол өөрийгөө галзуу эрдэмтэн гэж нэрлэдэг коллежийн оюутан. Тэрээр найзуудтайгаа хамт санамсаргүй цаг хугацааг өөрчлөх боломжтой төхөөрөмж зохион бүтээнэ.",
    price: 17000,
    rating: 4.8,
    duration: "28 мин",
    year: "2011",
    genre: "Sci-Fi • Анимэ",
    image: "/images/anime5.jpg",
    type: "anime",
    director: {
      name: "Хироши Хамасаки",
      image: "/placeholder.svg?height=200&width=150&text=Хироши+Хамасаки",
      role: "Найруулагч",
    },
    cast: [],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    episodes: [
      {
        id: 1,
        title: "1-р анги: Цаг хугацааны онол",
        description: "Окабэ Ринтаро цаг хугацааны аялалын талаар судалж эхэлнэ",
        duration: "28 мин",
        thumbnail: "/images/anime5.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: 2,
        title: "2-р анги: Цаг хугацааны машин",
        description: "Окабэ болон түүний найзууд цаг хугацааны машин бүтээнэ",
        duration: "28 мин",
        thumbnail: "/images/anime5.jpg",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
    voiceActors: [
      {
        name: "Мамору Мияно",
        image: "/placeholder.svg?height=200&width=150&text=Мамору+Мияно",
        character: "Окабэ Ринтаро",
      },
      {
        name: "Асами Имаи",
        image: "/placeholder.svg?height=200&width=150&text=Асами+Имаи",
        character: "Макисэ Курису",
      },
      {
        name: "Кана Ханазава",
        image: "/placeholder.svg?height=200&width=150&text=Кана+Ханазава",
        character: "Шиина Маюри",
      },
      {
        name: "Томоказу Сэки",
        image: "/placeholder.svg?height=200&width=150&text=Томоказу+Сэки",
        character: "Хашида Итару",
      },
    ],
    creators: [
      {
        name: "5pb. / Nitroplus",
        image: "/placeholder.svg?height=200&width=150&text=5pb./Nitroplus",
        role: "Оригинал тоглоом",
      },
      {
        name: "Хироши Хамасаки",
        image: "/placeholder.svg?height=200&width=150&text=Хироши+Хамасаки",
        role: "Найруулагч",
      },
      {
        name: "White Fox",
        image: "/placeholder.svg?height=200&width=150&text=White+Fox",
        role: "Анимэ студи",
      },
    ],
  },
]

const PersonCard = ({ person }: { person: Person }) => {
  const [showCard, setShowCard] = useState(false)

  return (
    <div className="relative inline-block">
      <span
        className="text-gray-300 hover:text-white cursor-pointer transition-colors border-b border-dotted border-gray-500 hover:border-white"
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
      >
        {person.name}
      </span>

      {showCard && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl min-w-[200px]">
          <div className="flex flex-col items-center text-center">
            <Image
              src={person.image || "/placeholder.svg"}
              alt={person.name}
              width={80}
              height={120}
              className="rounded-lg object-cover mb-2"
            />
            <h4 className="text-white font-bold text-sm">{person.name}</h4>
            {person.role && <p className="text-gray-400 text-xs">{person.role}</p>}
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  )
}

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = Number.parseInt(params.id as string)
  const content = movies.find((m) => m.id === movieId)

  // Payment states
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"qr" | "bank" | null>(null)
  const [paymentTimer, setPaymentTimer] = useState(0)

  // Video player states
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([1])
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isSubtitleSettingsOpen, setIsSubtitleSettingsOpen] = useState(false)

  // Subtitle settings state
  const [subtitleSettings, setSubtitleSettings] = useState<SubtitleSettings>({
    size: "medium",
    backgroundColor: "black",
    textColor: "white",
    opacity: 0.8,
    position: "bottom",
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Load subtitle settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("subtitleSettings")
    if (savedSettings) {
      setSubtitleSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save subtitle settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("subtitleSettings", JSON.stringify(subtitleSettings))
  }, [subtitleSettings])

  // Payment timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (paymentStatus === "processing" && paymentTimer > 0) {
      interval = setInterval(() => {
        setPaymentTimer((prev) => {
          if (prev <= 1) {
            setPaymentStatus("completed")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [paymentStatus, paymentTimer])

  // Video loading effect
  useEffect(() => {
    if (paymentStatus === "completed") {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(loadingTimer)
    }
  }, [paymentStatus])

  useEffect(() => {
    const video = videoRef.current
    if (!video || paymentStatus !== "completed") return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handleCanPlay = () => {
      setIsBuffering(false)
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("canplay", handleCanPlay)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [currentEpisode, paymentStatus])

  const handlePayment = (method: "qr" | "bank") => {
    setSelectedPaymentMethod(method)
    setPaymentStatus("processing")
    setPaymentTimer(10) // 10 seconds simulation
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.volume = value[0]
    setVolume(value)
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume[0]
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const skipTime = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN").format(price) + "₮"
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showInfo) {
        setShowControls(false)
      }
    }, 3000)
  }

  const playEpisode = (episodeIndex: number) => {
    setCurrentEpisode(episodeIndex)
    setIsLoading(true)
    const video = videoRef.current
    if (video && content?.episodes) {
      video.src = content.episodes[episodeIndex].videoUrl
      video.load()
    }
  }

  const handleBack = () => {
    router.back()
  }

  const getSubtitleStyles = () => {
    const sizeMap = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
      "extra-large": "text-xl",
    }

    const backgroundColorMap = {
      transparent: "bg-transparent",
      black: "bg-black",
      white: "bg-white",
      gray: "bg-gray-600",
      red: "bg-red-600",
      blue: "bg-blue-600",
    }

    const textColorMap = {
      white: "text-white",
      black: "text-black",
      yellow: "text-yellow-400",
      red: "text-red-400",
      blue: "text-blue-400",
      green: "text-green-400",
    }

    const positionMap = {
      bottom: "bottom-20",
      top: "top-20",
      center: "top-1/2 transform -translate-y-1/2",
    }

    return `${sizeMap[subtitleSettings.size]} ${backgroundColorMap[subtitleSettings.backgroundColor]} ${
      textColorMap[subtitleSettings.textColor]
    } ${positionMap[subtitleSettings.position]} px-4 py-2 rounded font-bold text-center max-w-4xl`
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Контент олдсонгүй</h1>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">Нүүр хуудас руу буцах</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Payment Screen
  if (paymentStatus === "pending" || paymentStatus === "processing") {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-black/95 backdrop-blur-md border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-red-600 transform rotate-45 rounded-sm"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold transform -rotate-45">BC</span>
                  </div>
                </div>
                <div className="text-white">
                  <div className="text-xl font-bold tracking-wider">BYTECRAFT</div>
                  <div className="text-xs tracking-widest opacity-80">HUB</div>
                </div>
              </Link>

              <Button variant="ghost" className="text-white hover:bg-gray-800" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Буцах
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Content Info */}
              <div className="space-y-6">
                <div className="relative">
                  <Image
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{content.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{content.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{content.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Badge className="bg-red-600 text-white text-sm px-3 py-1">{content.genre}</Badge>
                  <p className="text-gray-300 leading-relaxed">{content.description}</p>

                  {content.type === "anime" ? (
                    <div className="space-y-4">
                      {/* Creators */}
                      {content.creators && content.creators.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-white font-bold flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-red-500" />
                            Зохиолчид
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {content.creators.map((creator, index) => (
                              <span key={index}>
                                <PersonCard person={creator} />
                                {index < content.creators!.length - 1 && <span className="text-gray-400">, </span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Voice Actors */}
                      {content.voiceActors && content.voiceActors.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-white font-bold flex items-center">
                            <Mic className="w-4 h-4 mr-2 text-red-500" />
                            Дуу оруулагчид
                          </h3>
                          <div className="space-y-1">
                            {content.voiceActors.map((actor, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <PersonCard person={actor} />
                                <span className="text-gray-400">{actor.character}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400">Найруулагч: </span>
                        <PersonCard person={content.director} />
                      </div>
                      <div>
                        <span className="text-gray-400">Жүжигчид: </span>
                        <div className="inline-flex flex-wrap gap-2">
                          {content.cast.map((actor, index) => (
                            <span key={index}>
                              <PersonCard person={actor} />
                              {index < content.cast.length - 1 && <span className="text-gray-400">, </span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-red-500 flex items-center">
                      <CreditCard className="w-6 h-6 mr-2" />
                      ТӨЛБӨР ТӨЛӨХ
                    </CardTitle>
                    <div className="text-3xl font-bold text-white">{formatPrice(content.price)}</div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {paymentStatus === "pending" && (
                      <>
                        {/* QR Code Payment */}
                        <Card
                          className="bg-gray-800 border-gray-600 hover:border-red-500 transition-colors cursor-pointer"
                          onClick={() => handlePayment("qr")}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="w-32 h-32 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
                              <div className="text-black text-xs font-mono text-center">
                                QR CODE
                                <br />
                                {content.price}₮
                              </div>
                            </div>
                            <h3 className="text-white font-bold mb-2">QR код уншуулж төлөх</h3>
                            <p className="text-gray-400 text-sm mb-4">Гар утасны банк ашиглан хялбар төлөх</p>
                            <Badge className="bg-green-600 text-white">
                              <Smartphone className="w-4 h-4 mr-1" />
                              ГАР УТАСНЫ БАНК
                            </Badge>
                          </CardContent>
                        </Card>

                        <div className="text-center text-gray-400">эсвэл</div>

                        {/* Bank Transfer */}
                        <Card
                          className="bg-gray-800 border-gray-600 hover:border-red-500 transition-colors cursor-pointer"
                          onClick={() => handlePayment("bank")}
                        >
                          <CardContent className="p-6">
                            <h3 className="text-white font-bold mb-4 text-center">Банкны шилжүүлэг</h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Банк:</span>
                                <span className="text-white">Хаан банк</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Данс:</span>
                                <span className="text-white font-mono">5123 4567 8901 2345</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Нэр:</span>
                                <span className="text-white">ByteCraft Hub LLC</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Дүн:</span>
                                <span className="text-red-500 font-bold">{formatPrice(content.price)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {paymentStatus === "processing" && (
                      <div className="text-center space-y-4">
                        <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />
                        <h3 className="text-white font-bold text-lg">Төлбөр баталгаажуулж байна...</h3>
                        <p className="text-gray-400">
                          {selectedPaymentMethod === "qr" ? "QR код" : "Банкны шилжүүлэг"} төлбөрийг шалгаж байна
                        </p>
                        <div className="text-red-500 font-bold text-2xl">
                          {Math.floor(paymentTimer / 60)}:{(paymentTimer % 60).toString().padStart(2, "0")}
                        </div>
                        <p className="text-gray-500 text-sm">Автоматаар баталгаажна...</p>
                      </div>
                    )}

                    <Separator className="bg-gray-700" />

                    <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-red-300">
                          <p className="font-bold mb-1">АНХААР:</p>
                          <p>
                            Төлбөр төлсний дараа 5-10 минутын дотор контент нээгдэнэ. Асуудал гарвал 99887766 утсаар
                            холбогдоно уу.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Payment Success Screen
  if (paymentStatus === "completed" && isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          <h1 className="text-3xl font-bold text-white">Төлбөр амжилттай төлөгдлөө!</h1>
          <p className="text-gray-400 text-lg">Контент ачаалж байна...</p>
          <Loader2 className="w-8 h-8 text-red-600 animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  // Video Player (only after payment)
  const currentVideoUrl = content.episodes ? content.episodes[currentEpisode]?.videoUrl : content.videoUrl

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player Container */}
        <div className="lg:w-2/3">
          <div
            ref={containerRef}
            className="relative w-full h-[50vh] lg:h-screen bg-black overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && !showInfo && setShowControls(false)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={currentVideoUrl}
              poster={content.image}
              onClick={togglePlay}
            />

            {/* Subtitles Overlay */}
            {showSubtitles && (
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 ${getSubtitleStyles()}`}
                style={{ opacity: subtitleSettings.opacity }}
              >
                <p>Энэ бол жишээ хадмал текст юм. Хэрэглэгч тохиргоогоор өөрчилж болно.</p>
              </div>
            )}

            {/* Buffering Indicator */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Controls Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h1 className="text-white text-xl font-bold">{content.title}</h1>
                    <p className="text-gray-300 text-sm">
                      {content.year} • {content.genre}
                      {content.episodes && ` • ${currentEpisode + 1}-р анги`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/20 ${showSubtitles ? "bg-white/20" : ""}`}
                  >
                    <ClosedCaptioning className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={() => setIsSubtitleSettingsOpen(true)}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Center Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </Button>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider value={[currentTime]} onValueChange={handleSeek} max={duration} step={1} className="w-full" />
                  <div className="flex justify-between text-white text-sm mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => skipTime(-10)}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="w-5 h-5" />
                    </Button>

                    <Button onClick={togglePlay} variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>

                    <Button
                      onClick={() => skipTime(10)}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      <div className="w-20">
                        <Slider
                          value={isMuted ? [0] : volume}
                          onValueChange={handleVolumeChange}
                          max={1}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setShowInfo(!showInfo)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      Мэдээлэл
                    </Button>
                    <Button
                      onClick={toggleFullscreen}
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Always Visible Back Button - Separate Overlay */}
            <div className="absolute top-6 left-6 z-50">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 bg-black/30 backdrop-blur-sm"
                onClick={handleBack}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Information Sidebar */}
        <div className={`lg:w-1/3 bg-gray-900 ${showInfo ? "block" : "hidden lg:block"}`}>
          <div className="p-6 h-full overflow-y-auto">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="info" className="text-white data-[state=active]:bg-red-600">
                  Мэдээлэл
                </TabsTrigger>
                <TabsTrigger value="episodes" className="text-white data-[state=active]:bg-red-600">
                  Анги ({content.episodes?.length || 1})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6 mt-6">
                {/* Content Poster and Basic Info */}
                <div className="flex space-x-4">
                  <Image
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    width={120}
                    height={180}
                    className="rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{content.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{content.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{content.duration}</span>
                      </div>
                    </div>
                    <Badge className="bg-red-600 text-white mb-3">{content.genre}</Badge>
                    <div className="text-lg font-bold text-green-500">✓ Төлөгдсөн</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Дуртай
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Жагсаалт
                  </Button>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800">
                    <Download className="w-4 h-4 mr-2" />
                    Татах
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800">
                    <Share className="w-4 h-4 mr-2" />
                    Хуваалцах
                  </Button>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Тайлбар</h3>
                  <p className="text-gray-300 leading-relaxed">{content.description}</p>
                </div>

                {/* Cast and Crew or Voice Actors and Creators */}
                {content.type === "anime" ? (
                  <div className="space-y-6">
                    {/* Creators */}
                    {content.creators && content.creators.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-white flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-red-500" />
                          Зохиолчид
                        </h3>
                        <div className="space-y-3">
                          {content.creators.map((creator, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Image
                                src={creator.image || "/placeholder.svg"}
                                alt={creator.name}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                              />
                              <div>
                                <p className="text-white font-medium">{creator.name}</p>
                                <p className="text-gray-400 text-sm">{creator.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Voice Actors */}
                    {content.voiceActors && content.voiceActors.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-white flex items-center">
                          <Mic className="w-5 h-5 mr-2 text-red-500" />
                          Дуу оруулагчид
                        </h3>
                        <div className="space-y-3">
                          {content.voiceActors.map((actor, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Image
                                src={actor.image || "/placeholder.svg"}
                                alt={actor.name}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-white font-medium">{actor.name}</p>
                                <p className="text-gray-400 text-sm">{actor.character}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Director */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Найруулагч</h3>
                      <PersonCard person={content.director} />
                    </div>

                    {/* Cast */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Жүжигчид</h3>
                      <div className="flex flex-wrap gap-3">
                        {content.cast.map((actor, index) => (
                          <PersonCard key={index} person={actor} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="episodes" className="space-y-4 mt-6">
                {content.episodes ? (
                  content.episodes.map((episode, index) => (
                    <Card
                      key={episode.id}
                      className={`bg-gray-800 border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${
                        currentEpisode === index ? "ring-2 ring-red-600" : ""
                      }`}
                      onClick={() => playEpisode(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex space-x-3">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={episode.thumbnail || "/placeholder.svg"}
                              alt={episode.title}
                              width={80}
                              height={60}
                              className="rounded object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-1">{episode.title}</h4>
                            <p className="text-sm text-gray-400 mb-2">{episode.description}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{episode.duration}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <p>Энэ контент нэг ангитай байна</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Mobile Info Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button onClick={() => setShowInfo(!showInfo)} className="bg-red-600 hover:bg-red-700 rounded-full w-12 h-12">
          {showInfo ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </Button>
      </div>

      {/* Subtitle Settings Modal */}
      <Dialog open={isSubtitleSettingsOpen} onOpenChange={setIsSubtitleSettingsOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white w-[95vw] max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-xl font-bold text-red-500 flex items-center">
              <Type className="w-5 h-5 mr-2" />
              Хадмалын тохиргоо
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Preview */}
            <div className="bg-black rounded-lg p-4 relative min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
              <div
                className={`${getSubtitleStyles()}`}
                style={{ opacity: subtitleSettings.opacity, position: "relative", transform: "none" }}
              >
                Жишээ хадмал текст
              </div>
            </div>

            {/* Size Settings */}
            <div className="space-y-3">
              <label className="block text-white font-medium text-sm sm:text-base">Хэмжээ</label>
              <Select
                value={subtitleSettings.size}
                onValueChange={(value: any) => setSubtitleSettings({ ...subtitleSettings, size: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-10 sm:h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="small">Жижиг</SelectItem>
                  <SelectItem value="medium">Дунд</SelectItem>
                  <SelectItem value="large">Том</SelectItem>
                  <SelectItem value="extra-large">Маш том</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Background Color */}
            <div className="space-y-3">
              <label className="block text-white font-medium text-sm sm:text-base">Дэвсгэрийн өнгө</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { value: "transparent", label: "Тунгалаг", color: "bg-transparent border-2 border-gray-400" },
                  { value: "black", label: "Хар", color: "bg-black" },
                  { value: "white", label: "Цагаан", color: "bg-white" },
                  { value: "gray", label: "Саарал", color: "bg-gray-600" },
                  { value: "red", label: "Улаан", color: "bg-red-600" },
                  { value: "blue", label: "Цэнхэр", color: "bg-blue-600" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={subtitleSettings.backgroundColor === option.value ? "default" : "outline"}
                    className={`h-10 sm:h-12 text-xs sm:text-sm ${option.color} ${
                      subtitleSettings.backgroundColor === option.value
                        ? "ring-2 ring-red-500"
                        : "border-gray-600 hover:bg-gray-700"
                    }`}
                    onClick={() => setSubtitleSettings({ ...subtitleSettings, backgroundColor: option.value as any })}
                  >
                    <span className={option.value === "white" ? "text-black" : "text-white"}>{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-3">
              <label className="block text-white font-medium text-sm sm:text-base">Текстийн өнгө</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { value: "white", label: "Цагаан", color: "bg-white text-black" },
                  { value: "black", label: "Хар", color: "bg-black text-white" },
                  { value: "yellow", label: "Шар", color: "bg-yellow-400 text-black" },
                  { value: "red", label: "Улаан", color: "bg-red-400 text-white" },
                  { value: "blue", label: "Цэнхэр", color: "bg-blue-400 text-white" },
                  { value: "green", label: "Ногоон", color: "bg-green-400 text-white" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={subtitleSettings.textColor === option.value ? "default" : "outline"}
                    className={`h-10 sm:h-12 text-xs sm:text-sm ${option.color} ${
                      subtitleSettings.textColor === option.value
                        ? "ring-2 ring-red-500"
                        : "border-gray-600 hover:bg-gray-700"
                    }`}
                    onClick={() => setSubtitleSettings({ ...subtitleSettings, textColor: option.value as any })}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div className="space-y-3">
              <label className="block text-white font-medium text-sm sm:text-base">
                Тунгалаг байдал: {Math.round(subtitleSettings.opacity * 100)}%
              </label>
              <div className="px-2">
                <Slider
                  value={[subtitleSettings.opacity]}
                  onValueChange={(value) => setSubtitleSettings({ ...subtitleSettings, opacity: value[0] })}
                  max={1}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Position */}
            <div className="space-y-3">
              <label className="block text-white font-medium text-sm sm:text-base">Байрлал</label>
              <Select
                value={subtitleSettings.position}
                onValueChange={(value: any) => setSubtitleSettings({ ...subtitleSettings, position: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-10 sm:h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="bottom">Доод хэсэг</SelectItem>
                  <SelectItem value="center">Дунд хэсэг</SelectItem>
                  <SelectItem value="top">Дээд хэсэг</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fixed Bottom Buttons */}
          <div className="flex-shrink-0 pt-4 border-t border-gray-700 mt-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={() => {
                  setSubtitleSettings({
                    size: "medium",
                    backgroundColor: "black",
                    textColor: "white",
                    opacity: 0.8,
                    position: "bottom",
                  })
                }}
                variant="outline"
                className="flex-1 border-gray-600 text-white hover:bg-gray-800 h-10 sm:h-11 text-sm"
              >
                Анхдагш болгох
              </Button>
              <Button
                onClick={() => setIsSubtitleSettingsOpen(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 h-10 sm:h-11 text-sm"
              >
                Хадгалах
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
