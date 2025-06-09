"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Play, Star, Search, User, Filter, ChevronLeft, ChevronRight, Home, Film, Grid3X3, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AuthModal from "@/components/auth-modal"
import UserProfileModal from "@/components/user-profile-modal"

interface Anime {
  id: number
  title: string
  description: string
  price: number
  rating: number
  duration: string
  year: string
  genre: string
  status: string
  episodes: number
  image: string
  featured?: boolean
}

const animeList: Anime[] = [
  {
    id: 101,
    title: "Jujutsu Kaisen",
    description:
      "Ид шидийн сургуулийн оюутан Южи Итадори харааны хүчтэй ид шидтэй тулалдана. Гайхамшигтай тулааны анимэ.",
    price: 18000,
    rating: 4.9,
    duration: "24 мин",
    year: "2024",
    genre: "Адал явдал",
    status: "Гүйцэт",
    episodes: 24,
    image: "/images/anime1.jpg",
    featured: true,
  },
  {
    id: 102,
    title: "Tokyo Ghoul",
    description: "Хүн болон гоул хоёрын хооронд амьдрах залуугийн түүх. Харанхуй, сэтгэл хөдөлгөм анимэ.",
    price: 16000,
    rating: 4.8,
    duration: "22 мин",
    year: "2024",
    genre: "Фэнтэзи",
    status: "Үргэлжилж байна",
    episodes: 12,
    image: "/images/anime2.jpg",
    featured: true,
  },
  {
    id: 103,
    title: "Naruto Shippuden",
    description: "Наруто Узумакигийн хокаге болох замын түүх. Найрамдал, хүчин чармайлтын тухай эпик анимэ.",
    price: 15000,
    rating: 4.7,
    duration: "25 мин",
    year: "2023",
    genre: "Адал явдал",
    status: "Гүйцэт",
    episodes: 500,
    image: "/images/anime3.jpg",
  },
  {
    id: 104,
    title: "Seven Deadly Sins",
    description: "Долоон нүглийн баатрууд хаант улсыг аврахын тулд нэгдэнэ. Фэнтэзи адал явдлын анимэ.",
    price: 12000,
    rating: 4.5,
    duration: "20 мин",
    year: "2023",
    genre: "Фэнтэзи",
    status: "Гүйцэт",
    episodes: 96,
    image: "/images/anime4.jpg",
  },
  {
    id: 105,
    title: "Steins;Gate",
    description: "Цаг хугацааны аялалын тухай шинжлэх ухааны уран зөгнөлт анимэ. Гүн утга санаатай түүх.",
    price: 17000,
    rating: 4.8,
    duration: "28 мин",
    year: "2024",
    genre: "Sci-Fi",
    status: "Үргэлжилж байна",
    episodes: 24,
    image: "/images/anime5.jpg",
    featured: true,
  },
  {
    id: 106,
    title: "Attack on Titan",
    description: "Аварга биетүүдийн эсрэг хүн төрөлхтний тулаан. Гайхамшигтай зохиол, гүн утга санаа.",
    price: 13000,
    rating: 4.6,
    duration: "22 мин",
    year: "2023",
    genre: "Драм",
    status: "Гүйцэт",
    episodes: 87,
    image: "/placeholder.svg?height=400&width=300&text=Attack+on+Titan",
  },
  {
    id: 107,
    title: "Demon Slayer",
    description: "Чөтгөр устгагч Танжирогийн эгчээ аврах аялал. Гайхалтай дүрслэл, сэтгэл хөдөлгөм түүх.",
    price: 16000,
    rating: 4.7,
    duration: "24 мин",
    year: "2024",
    genre: "Адал явдал",
    status: "Үргэлжилж байна",
    episodes: 44,
    image: "/placeholder.svg?height=400&width=300&text=Demon+Slayer",
  },
  {
    id: 108,
    title: "One Piece",
    description: "Далайн дээрэмчин Луффигийн One Piece эрэлхийлэх адал явдал. Хамгийн урт анимэ цуврал.",
    price: 19000,
    rating: 4.9,
    duration: "26 мин",
    year: "2024",
    genre: "Адал явдал",
    status: "Үргэлжилж байна",
    episodes: 1000,
    image: "/placeholder.svg?height=400&width=300&text=One+Piece",
  },
  {
    id: 109,
    title: "My Hero Academia",
    description: "Супер хүчгүй хүүхэд хамгийн агуу баатар болох мөрөөдөлтэй. Урам зориг өгөх анимэ.",
    price: 11000,
    rating: 4.4,
    duration: "20 мин",
    year: "2023",
    genre: "Супер баатар",
    status: "Гүйцэт",
    episodes: 138,
    image: "/placeholder.svg?height=400&width=300&text=My+Hero+Academia",
  },
  {
    id: 110,
    title: "Death Note",
    description: "Хүмүүсийг алах чадвартай тэмдэглэлийн дэвтэр олсон оюутны түүх. Сэтгэцийн тулаан.",
    price: 20000,
    rating: 4.8,
    duration: "30 мин",
    year: "2024",
    genre: "Thriller",
    status: "Гүйцэт",
    episodes: 37,
    image: "/placeholder.svg?height=400&width=300&text=Death+Note",
  },
]

const animeCategories = [
  { id: "all", label: "БҮХ АНИМЭ", active: true },
  { id: "new", label: "ШИНЭ", active: false },
  { id: "popular", label: "АЛДАРТАЙ", active: false },
  { id: "ongoing", label: "ҮРГЭЛЖИЛЖ БАЙНА", active: false },
  { id: "completed", label: "ГҮЙЦЭТ", active: false },
]

const animeGenres = [
  "Адал явдал",
  "Фэнтэзи",
  "Sci-Fi",
  "Драм",
  "Thriller",
  "Супер баатар",
  "Романс",
  "Инээдэм",
  "Спорт",
  "Slice of Life",
]

export default function AnimePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([0])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Check for logged in user on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userProfile")
    setUserProfile(null)
  }

  const handleUpdateProfile = (updatedProfile: any) => {
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile))
    setUserProfile(updatedProfile)
  }

  const featuredAnime = animeList.filter((anime) => anime.featured)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAnime.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featuredAnime.length])

  const filteredAnime = animeList.filter((anime) => {
    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "new" && anime.year === "2024") ||
      (activeCategory === "popular" && anime.rating >= 4.7) ||
      (activeCategory === "ongoing" && anime.status === "Үргэлжилж байна") ||
      (activeCategory === "completed" && anime.status === "Гүйцэт")

    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(anime.genre)
    const matchesRating = anime.rating >= ratingRange[0]
    const matchesSearch =
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.genre.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesGenre && matchesRating && matchesSearch
  })

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN").format(price) + "₮"
  }

  return (
    <div className="min-h-screen bg-black pb-20 md:pb-0">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 transform rotate-45 rounded-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base transform -rotate-45">BC</span>
                </div>
              </div>
              <div className="text-white">
                <div className="text-lg md:text-xl font-bold tracking-wider">BYTECRAFT</div>
                <div className="text-xs tracking-widest opacity-80">HUB</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-red-500 transition-colors font-medium">
                НҮҮР
              </Link>
              <Link href="/anime" className="text-red-500 font-medium">
                АНИМЭ
              </Link>
              <Link href="/categories" className="text-white hover:text-red-500 transition-colors font-medium">
                АНГИЛАЛ
              </Link>
              <Link href="/contact" className="text-white hover:text-red-500 transition-colors font-medium">
                ХОЛБОО
              </Link>
            </nav>

            <Button className="hidden md:flex bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-none font-medium">
              <User className="w-4 h-4 mr-2" />
              НЭВТРЭХ
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredAnime[currentSlide]?.image || "/images/anime1.jpg"}
            alt={featuredAnime[currentSlide]?.title || "Anime"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Mobile Slide Navigation Dots */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="flex space-x-2">
            {featuredAnime.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-red-600 scale-125" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Slide Navigation Dots */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
          <div className="flex flex-col space-y-3">
            {featuredAnime.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-red-600 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl space-y-4 md:space-y-6 pt-20 pb-20">
            {/* Anime Badge */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 transform rotate-45 rounded-sm flex items-center justify-center">
                <Play className="w-3 h-3 md:w-4 md:h-4 text-white transform -rotate-45" />
              </div>
              <span className="text-red-500 font-medium tracking-wider text-sm md:text-base">АНИМЭ</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-wider leading-none">
                АНИМЭ
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                Дэлхийн шилдэг анимэ цуврал, кинонуудыг монгол хэлээр үзээрэй
              </p>
            </div>

            {/* Featured Anime Info */}
            {featuredAnime[currentSlide] && (
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {featuredAnime[currentSlide].title}
                </h2>
                <div className="flex items-center space-x-4 md:space-x-6 text-gray-300 text-sm md:text-base">
                  <div className="flex items-center space-x-2 bg-black/30 px-3 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{featuredAnime[currentSlide].rating}</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <span className="text-gray-300">{featuredAnime[currentSlide].year}</span>
                  <div className="text-gray-400">•</div>
                  <span className="text-gray-300">{featuredAnime[currentSlide].genre}</span>
                </div>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
                  {featuredAnime[currentSlide].description.slice(0, 200)}...
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4 md:pt-6">
              <Link href={`/watch/${featuredAnime[currentSlide]?.id || 101}`}>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-none font-bold tracking-wider text-sm md:text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  ҮЗЭХ
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredAnime.length) % featuredAnime.length)}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredAnime.length)}
          className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </section>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
          {animeCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 md:px-6 py-2 rounded-none font-bold tracking-wide transition-all duration-300 text-xs md:text-sm ${
                activeCategory === category.id
                  ? "bg-red-600 text-white"
                  : "bg-transparent border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Filters Section */}
        <div className="mb-6 md:mb-8 space-y-4 md:space-y-6">
          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <Input
                type="text"
                placeholder="Анимэ хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 h-10 md:h-12 rounded-none text-sm md:text-base"
              />
            </div>
          </div>

          {/* Genre Filters */}
          <div>
            <h3 className="text-white font-bold mb-3 md:mb-4 flex items-center text-sm md:text-base">
              <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-500" />
              ЖАНР
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {animeGenres.map((genre) => (
                <Button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 md:px-4 py-2 rounded-full font-medium transition-all duration-300 text-xs md:text-sm ${
                    selectedGenres.includes(genre)
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-white font-bold text-sm md:text-base">ҮНЭЛГЭЭ</h3>
              <span className="text-red-500 font-bold text-sm md:text-base">{ratingRange[0].toFixed(1)}</span>
            </div>
            <div className="max-w-md">
              <Slider
                value={ratingRange}
                onValueChange={setRatingRange}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs md:text-sm text-gray-400 mt-2">
                <span>0.0</span>
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-6 md:mb-8" />

        {/* Results Count */}
        <div className="mb-4 md:mb-6">
          <p className="text-gray-400 text-sm md:text-base">
            <span className="text-white font-bold">{filteredAnime.length}</span> анимэ олдлоо
          </p>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6">
          {filteredAnime.map((anime) => (
            <Card
              key={anime.id}
              className="bg-gray-900 border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group rounded-none overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={anime.image || "/placeholder.svg"}
                  alt={anime.title}
                  width={200}
                  height={300}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/watch/${anime.id}`}>
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 rounded-none font-bold text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      ҮЗЭХ
                    </Button>
                  </Link>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-red-600 text-white rounded-none font-bold text-xs">{anime.genre}</Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge
                    className={`rounded-none font-bold text-xs ${
                      anime.status === "Үргэлжилж байна" ? "bg-green-600 text-white" : "bg-blue-600 text-white"
                    }`}
                  >
                    {anime.episodes} анги
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-2 md:p-3">
                <CardTitle className="text-white text-xs md:text-sm font-bold leading-tight line-clamp-2">
                  {anime.title}
                </CardTitle>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{anime.rating}</span>
                  </div>
                  <span>{anime.year}</span>
                </div>
                <div className="text-xs md:text-sm font-bold text-red-500">{formatPrice(anime.price)}</div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAnime.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">Хайлтын үр дүн олдсонгүй</div>
            <p className="text-gray-500">Өөр шүүлтүүр ашиглан дахин оролдоно уу</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gray-800 md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white">
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">НҮҮР</span>
          </Link>
          <Link href="/anime" className="flex flex-col items-center space-y-1 p-2 text-red-500">
            <Film className="w-5 h-5" />
            <span className="text-xs font-medium">АНИМЭ</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white">
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs font-medium">АНГИЛАЛ</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white">
            <Phone className="w-5 h-5" />
            <span className="text-xs font-medium">ХОЛБОО</span>
          </Link>
          {userProfile ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white"
            >
              <Image
                src={userProfile.avatar || "/placeholder.svg"}
                alt="Profile"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-xs font-medium">ПРОФАЙЛ</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">НЭВТРЭХ</span>
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* User Profile Modal */}
      {userProfile && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {/* Footer - Hidden on Mobile */}
      <footer className="bg-black border-t border-gray-800 hidden md:block">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
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
              </div>
              <p className="text-gray-400 text-sm">Монголын хамгийн шилдэг кино стриминг платформ</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 tracking-wide">ХОЛБООСУУД</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/" className="block hover:text-red-500 transition-colors">
                  Нүүр хуудас
                </Link>
                <Link href="/anime" className="block hover:text-red-500 transition-colors">
                  Анимэ
                </Link>
                <Link href="/categories" className="block hover:text-red-500 transition-colors">
                  Ангилал
                </Link>
                <Link href="/contact" className="block hover:text-red-500 transition-colors">
                  Холбоо барих
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 tracking-wide">ТУСЛАМЖ</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Түгээмэл асуулт
                </a>
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Үйлчилгээний нөхцөл
                </a>
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Нууцлалын бодлого
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 tracking-wide">ХОЛБОО БАРИХ</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>И-мэйл: info@bytecrafthub.mn</p>
                <p>Утас: +976 99887766</p>
                <p>Хаяг: Улаанбаатар хот</p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800 my-8" />

          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 BYTECRAFT HUB. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
