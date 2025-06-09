"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Play, Star, Search, User, Filter, Home, Film, Grid3X3, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AuthModal from "@/components/auth-modal"
import UserProfileModal from "@/components/user-profile-modal"

interface Movie {
  id: number
  title: string
  description: string
  price: number
  rating: number
  duration: string
  year: string
  genre: string
  category: string
  image: string
}

const allMovies: Movie[] = [
  {
    id: 1,
    title: "ZONE",
    description: "Бэлтгэл ойн дунд нэгэн нуучлаг цэргийн баазад гэмт хэрэгтнүүд ирнэ.",
    price: 15000,
    rating: 4.8,
    duration: "136 мин",
    year: "2024",
    genre: "Адал явдал",
    category: "movies",
    image: "/images/hero-bg.png",
  },
  {
    id: 2,
    title: "Гэнэтийн Зочид",
    description: "Гэр бүлийн амьдралд гэнэт ирсэн зочид бүх зүйлийг өөрчилж орхино.",
    price: 12000,
    rating: 4.6,
    duration: "108 мин",
    year: "2023",
    genre: "Инээдэм",
    category: "movies",
    image: "/images/movie5.png",
  },
  {
    id: 3,
    title: "Family Shock",
    description: "Гэр бүлийн нууц задарч, бүх гишүүд цочирдох үед тэд хэрхэн нэгдэж чадах вэ?",
    price: 13000,
    rating: 4.7,
    duration: "118 мин",
    year: "2023",
    genre: "Драм",
    category: "series",
    image: "/images/movie2.png",
  },
  {
    id: 4,
    title: "In Da House 3",
    description: "Солонгосын алдартай инээдэм киноны гуравдахь хэсэг.",
    price: 14000,
    rating: 4.5,
    duration: "125 мин",
    year: "2025",
    genre: "Инээдэм",
    category: "movies",
    image: "/images/movie3.png",
  },
  {
    id: 5,
    title: "Wolf of the Tegri",
    description: "Эрдэнэ билэгтийн бүтээл. Монголын түүхэн дэх агуу дайчдын тухай эпик кино.",
    price: 16000,
    rating: 4.9,
    duration: "155 мин",
    year: "2022",
    genre: "Түүх",
    category: "original",
    image: "/images/movie4.png",
  },
  {
    id: 6,
    title: "Хүүхдийн Дурлал",
    description: "Хүүхэд насны дурсамж, найзууд, гэр бүлийн хайрыг дүрсэлсэн сэтгэл хөдөлгөм кино.",
    price: 11000,
    rating: 4.4,
    duration: "95 мин",
    year: "2023",
    genre: "Гэр бүл",
    category: "movies",
    image: "/images/movie1.png",
  },
  // Additional movies for better filtering demonstration
  {
    id: 7,
    title: "Цагийн Аялагч",
    description: "Цаг хугацааг дамнасан гайхамшигтай адал явдал",
    price: 12000,
    rating: 4.2,
    duration: "142 мин",
    year: "2023",
    genre: "Sci-Fi",
    category: "movies",
    image: "/placeholder.svg?height=400&width=300&text=Цагийн+Аялагч",
  },
  {
    id: 8,
    title: "Хар Тэнгэр",
    description: "Агаарын цэргийн баатрын түүх",
    price: 13000,
    rating: 4.3,
    duration: "118 мин",
    year: "2023",
    genre: "Адал явдал",
    category: "series",
    image: "/placeholder.svg?height=400&width=300&text=Хар+Тэнгэр",
  },
  {
    id: 9,
    title: "Мөнхийн Хайр",
    description: "Хайрын гүн утга санааг харуулсан драм",
    price: 10000,
    rating: 4.1,
    duration: "125 мин",
    year: "2023",
    genre: "Романс",
    category: "original",
    image: "/placeholder.svg?height=400&width=300&text=Мөнхийн+Хайр",
  },
  {
    id: 10,
    title: "Цөлийн Дайчин",
    description: "Цөлийн дунд болсон эпик тулаан",
    price: 14000,
    rating: 4.8,
    duration: "155 мин",
    year: "2023",
    genre: "Адал явдал",
    category: "movies",
    image: "/placeholder.svg?height=400&width=300&text=Цөлийн+Дайчин",
  },
  {
    id: 11,
    title: "Нууц Агент",
    description: "Дэлхийг аврах нууц ажиллагаа",
    price: 11000,
    rating: 4.0,
    duration: "108 мин",
    year: "2023",
    genre: "Thriller",
    category: "series",
    image: "/placeholder.svg?height=400&width=300&text=Нууц+Агент",
  },
  {
    id: 12,
    title: "Анимэ Баатар",
    description: "Японы анимэ стилээр хийсэн монгол баатрын түүх",
    price: 9000,
    rating: 4.6,
    duration: "90 мин",
    year: "2024",
    genre: "Анимэ",
    category: "original",
    image: "/placeholder.svg?height=400&width=300&text=Анимэ+Баатар",
  },
]

const categories = [
  { id: "movies", label: "КИНО", active: true },
  { id: "series", label: "ЦУВРАЛ", active: false },
  { id: "original", label: "BYTECRAFT ORIGINAL", active: false },
]

const genres = [
  "Адал явдал",
  "Инээдэм",
  "Анимэ",
  "Намтар",
  "Гэмт хэрэг",
  "Драм",
  "Баримтат",
  "Гэр бүл",
  "Романс",
  "Sci-Fi",
  "Thriller",
  "Түүх",
]

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("movies")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([0])
  const [searchQuery, setSearchQuery] = useState("")

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

  const filteredMovies = allMovies.filter((movie) => {
    const matchesCategory = movie.category === activeCategory
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre)
    const matchesRating = movie.rating >= ratingRange[0]
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())

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
              <Link href="/anime" className="text-white hover:text-red-500 transition-colors font-medium">
                АНИМЭ
              </Link>
              <Link href="/categories" className="text-red-500 font-medium">
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

      <div className="container mx-auto px-4 py-20 md:py-24">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
          {categories.map((category) => (
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
                placeholder="Кино хайх..."
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
              {genres.map((genre) => (
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
            <span className="text-white font-bold">{filteredMovies.length}</span> үр дүн олдлоо
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="bg-gray-900 border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group rounded-none overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 rounded-none font-bold text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    ҮЗЭХ
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-red-600 text-white rounded-none font-bold text-xs">{movie.genre}</Badge>
                </div>
              </div>

              <CardHeader className="p-2 md:p-3">
                <CardTitle className="text-white text-xs md:text-sm font-bold leading-tight line-clamp-2">
                  {movie.title}
                </CardTitle>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{movie.rating}</span>
                  </div>
                  <span>{movie.year}</span>
                </div>
                <div className="text-xs md:text-sm font-bold text-red-500">{formatPrice(movie.price)}</div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMovies.length === 0 && (
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
          <Link href="/anime" className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white">
            <Film className="w-5 h-5" />
            <span className="text-xs font-medium">АНИМЭ</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center space-y-1 p-2 text-red-500">
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
    </div>
  )
}
