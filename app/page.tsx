"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import AuthModal from "@/components/auth-modal"
import {
  Play,
  Star,
  Clock,
  Calendar,
  Search,
  CreditCard,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  User,
  Home,
  Film,
  Grid3X3,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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
  image: string
  featured?: boolean
}

const movies: Movie[] = [
  {
    id: 1,
    title: "ZONE",
    description:
      "Бэлтгэл ойн дунд нэгэн нуучлаг цэргийн баазад гэмт хэрэгтнүүд ирнэ. Тэд эхэндээ зугээр л хатуу долгионтой хөдөлмөрийн лагерь гэж бодож байсан боловч үүний бодь. Харин бүрүүгээр эргэж үл мэдэгдэх хөлцөдөөр тохон тэрхүү эхэллээ. Тэд өнөө үнэндээ чадах болов уу?",
    price: 15000,
    rating: 4.8,
    duration: "136 мин",
    year: "2024",
    genre: "Адал явдал • Нөмрөг",
    image: "/images/hero-bg.png",
    featured: true,
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
  },
]

export default function MovieSite() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
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

  const featuredMovies = movies.filter((movie) => movie.featured)
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featuredMovies.length])

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN").format(price) + "₮"
  }

  const currentFeaturedMovie = featuredMovies[currentSlide] || movies[0]

  return (
    <div className="min-h-screen bg-black pb-20 md:pb-0">
      {/* Header - Simplified for Mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-red-600 transform rotate-45 rounded-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-lg transform -rotate-45">BC</span>
                </div>
              </div>
              <div className="text-white">
                <div className="text-lg md:text-2xl font-bold tracking-wider">BYTECRAFT</div>
                <div className="text-xs tracking-widest opacity-80">HUB</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-red-500 transition-colors font-medium">
                НҮҮР
              </a>
              <Link href="/anime" className="text-white hover:text-red-500 transition-colors font-medium">
                АНИМЭ
              </a>
              <Link href="/categories" className="text-white hover:text-red-500 transition-colors font-medium">
                АНГИЛАЛ
              </a>
              <Link href="/contact" className="text-white hover:text-red-500 transition-colors font-medium">
                ХОЛБОО
              </a>
            </nav>

            {/* Desktop User Profile */}
            {userProfile ? (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center space-x-3 hover:bg-gray-800/50 p-2 rounded-none transition-colors"
                >
                  <Image
                    src={userProfile.avatar || "/placeholder.svg"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="text-white">
                    <div className="text-sm font-medium">{userProfile.name}</div>
                    <div className="text-xs text-gray-400">VIP Гишүүн</div>
                  </div>
                </button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-none font-medium"
                >
                  ГАРАХ
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:flex bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-none font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                НЭВТРЭХ
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={currentFeaturedMovie.image || "/placeholder.svg"}
            alt={currentFeaturedMovie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Mobile Slide Navigation Dots */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="flex space-x-2">
            {featuredMovies.map((_, index) => (
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
            {featuredMovies.map((_, index) => (
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
          <div className="max-w-2xl space-y-4 md:space-y-8 pt-20 md:pt-20">
            {/* Movie Badge */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 transform rotate-45 rounded-sm flex items-center justify-center">
                <Play className="w-3 h-3 md:w-4 md:h-4 text-white transform -rotate-45" />
              </div>
              <span className="text-red-500 font-medium tracking-wider text-sm md:text-base">КИНО</span>
            </div>

            {/* Movie Title */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-wider leading-none">
                {currentFeaturedMovie.title}
              </h1>
              <div className="flex items-center space-x-3 md:space-x-6 text-gray-300 text-sm md:text-base">
                <div className="flex items-center space-x-1 md:space-x-2 bg-black/30 px-2 md:px-3 py-1 rounded">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium">{currentFeaturedMovie.year}</span>
                </div>
                <div className="text-gray-400">•</div>
                <span className="text-gray-300">{currentFeaturedMovie.genre}</span>
              </div>
            </div>

            {/* Movie Description */}
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-xl line-clamp-3 md:line-clamp-none">
              {currentFeaturedMovie.description}
            </p>

            {/* Action Button */}
            <div className="pt-2 md:pt-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-none font-bold tracking-wider text-sm md:text-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => handleMovieSelect(currentFeaturedMovie)}
              >
                ДЭЛГЭРЭНГҮЙ
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)}
          className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </section>

      {/* Search Section */}
      <section className="bg-black py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
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
        </div>
      </section>

      {/* Movies Grid */}
      <section className="bg-black py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-12 text-center tracking-wider">
            БҮХ КИНО
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-8">
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="bg-gray-900 border-gray-800 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group rounded-none overflow-hidden min-h-[400px] md:min-h-[450px]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    width={300}
                    height={400}
                    className="w-full h-48 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/watch/${movie.id}`}>
                      <Button
                        size="sm"
                        className="w-full bg-red-600 hover:bg-red-700 rounded-none font-bold text-xs md:text-sm"
                      >
                        <Play className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        ҮЗЭХ
                      </Button>
                    </Link>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-600 text-white rounded-none font-bold text-xs">
                      {movie.genre.split(" • ")[0]}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-2 md:p-4">
                  <CardTitle className="text-white text-sm md:text-xl font-bold tracking-wide line-clamp-2">
                    {movie.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                    {movie.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-2 md:pt-0">
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                        <span>{movie.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 hidden md:flex">
                        <Clock className="w-4 h-4" />
                        <span>{movie.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm md:text-2xl font-bold text-red-500">{formatPrice(movie.price)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gray-800 md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center space-y-1 p-2 text-red-500">
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">НҮҮР</span>
          </Link>
          <Link href="/anime" className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white">
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

      {/* Payment Modal */}
      <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto rounded-none">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-red-500 tracking-wide">ТӨЛБӨР ТӨЛӨХ</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm md:text-base">
              {selectedMovie?.title} киног үзэхийн тулд төлбөр төлнө үү
            </DialogDescription>
          </DialogHeader>

          {selectedMovie && (
            <div className="space-y-4 md:space-y-6">
              {/* Movie Info */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 p-3 md:p-4 bg-black/50 rounded-none">
                <Image
                  src={selectedMovie.image || "/placeholder.svg"}
                  alt={selectedMovie.title}
                  width={60}
                  height={90}
                  className="md:w-20 md:h-30 rounded-none object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base md:text-lg mb-2">{selectedMovie.title}</h4>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">
                    {selectedMovie.duration} • {selectedMovie.year} • {selectedMovie.genre}
                  </p>
                  <p className="text-xs md:text-sm text-gray-300 mb-3 leading-relaxed line-clamp-3">
                    {selectedMovie.description}
                  </p>
                  <p className="text-lg md:text-xl font-bold text-red-500">{formatPrice(selectedMovie.price)}</p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Payment Methods */}
              <div className="space-y-3 md:space-y-4">
                <h5 className="font-bold flex items-center tracking-wide text-sm md:text-base">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-500" />
                  ТӨЛБӨРИЙН АРГА
                </h5>

                {/* QR Code Payment */}
                <div className="p-3 md:p-4 bg-black/50 rounded-none text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white mx-auto mb-3 md:mb-4 rounded-none flex items-center justify-center">
                    <div className="text-black text-xs font-mono text-center">
                      QR CODE
                      <br />
                      {selectedMovie.price}₮
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">QR код уншуулж төлнө үү</p>
                  <Badge className="bg-green-600 rounded-none font-bold text-xs">
                    <Smartphone className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    ГАР УТАСНЫ БАНК
                  </Badge>
                </div>

                {/* Bank Transfer */}
                <div className="p-3 md:p-4 bg-black/50 rounded-none">
                  <h6 className="font-bold mb-3 tracking-wide text-sm md:text-base">ШИЛЖҮҮЛЭХ ДАНС</h6>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Банк:</span>
                      <span>Хаан банк</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Данс:</span>
                      <span className="font-mono">5123 4567 8901 2345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Нэр:</span>
                      <span>ByteCraft Hub LLC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Дүн:</span>
                      <span className="font-bold text-red-500">{formatPrice(selectedMovie.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-3 md:p-4 bg-red-900/20 rounded-none border border-red-500/20">
                  <p className="text-xs md:text-sm text-red-300">
                    <strong>АНХААР:</strong> Төлбөр төлсний дараа 5-10 минутын дотор кино нээгдэнэ. Асуудал гарвал
                    99887766 утсаар холбогдоно уу.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-white hover:bg-gray-800 rounded-none font-bold text-sm"
                  onClick={() => setSelectedMovie(null)}
                >
                  ЦУЦЛАХ
                </Button>
                <Link href={`/watch/${selectedMovie.id}`} className="flex-1">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 rounded-none font-bold tracking-wide text-sm"
                    onClick={() => setSelectedMovie(null)}
                  >
                    ҮЗЭХ
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Нүүр хуудас
                </a>
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Кино
                </a>
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Ангилал
                </a>
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Шинэ кино
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 tracking-wide">ТУСЛАМЖ</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Түгээмэл асуулт
                </a>
                <a href="#" className="block hover:text-red-500 transition-colors">
                  Холбоо барих
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
