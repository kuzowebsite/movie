"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Film,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  BarChart3,
  Monitor,
  FileText,
  ImageIcon,
  Subtitles,
  Shield,
  LogOut,
  Search,
  Download,
  Star,
  DollarSign,
  TrendingUp,
  Activity,
  Tags,
  Play,
  Pause,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SubtitleEntry {
  id: string
  startTime: number // in seconds
  endTime: number // in seconds
  text: string
}

interface AdminMovie {
  id: number
  title: string
  description: string
  price: number
  rating: number
  duration: string
  year: string
  genre: string
  image: string
  videoUrl: string
  isActive: boolean
  subtitles: Array<{
    language: string
    entries: SubtitleEntry[]
    fileName?: string
    uploadDate: string
  }>
  createdAt: string
  views: number
}

interface AdminUser {
  id: number
  name: string
  email: string
  phone: string
  joinDate: string
  isActive: boolean
  subscription: string
  totalSpent: number
  lastLogin: string
}

interface HeroSlide {
  id: number
  title: string
  description: string
  image: string
  isActive: boolean
  order: number
}

interface Genre {
  id: number
  name: string
  description: string
  isActive: boolean
  createdAt: string
  movieCount: number
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  logo: string
  socialMedia: {
    facebook: string
    instagram: string
    youtube: string
    twitter: string
  }
  paymentInfo: {
    bankName: string
    accountNumber: string
    accountName: string
  }
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" })
  const [activeTab, setActiveTab] = useState("dashboard")

  // Movies state
  const [movies, setMovies] = useState<AdminMovie[]>([
    {
      id: 1,
      title: "ZONE",
      description: "Бэлтгэл ойн дунд нэгэн нуучлаг цэргийн баазад гэмт хэрэгтнүүд ирнэ.",
      price: 15000,
      rating: 4.8,
      duration: "136 мин",
      year: "2024",
      genre: "Адал явдал",
      image: "/images/hero-bg.png",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      isActive: true,
      subtitles: [],
      createdAt: "2024-01-15",
      views: 1250,
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
      image: "/images/movie5.png",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      isActive: true,
      subtitles: [],
      createdAt: "2024-01-10",
      views: 890,
    },
  ])

  // Users state
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: 1,
      name: "Батбаяр",
      email: "batbayar@gmail.com",
      phone: "+976 99887766",
      joinDate: "2024-01-15",
      isActive: true,
      subscription: "VIP",
      totalSpent: 45000,
      lastLogin: "2024-01-20",
    },
    {
      id: 2,
      name: "Сарантуяа",
      email: "sarantuya@gmail.com",
      phone: "+976 88776655",
      joinDate: "2024-01-10",
      isActive: true,
      subscription: "Basic",
      totalSpent: 12000,
      lastLogin: "2024-01-19",
    },
  ])

  // Hero slides state
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: 1,
      title: "ZONE",
      description: "Бэлтгэл ойн дунд нэгэн нуучлаг цэргийн баазад гэмт хэрэгтнүүд ирнэ.",
      image: "/images/hero-bg.png",
      isActive: true,
      order: 1,
    },
  ])

  // Genres state
  const [genres, setGenres] = useState<Genre[]>([
    {
      id: 1,
      name: "Адал явдал",
      description: "Адал явдалт кинонууд",
      isActive: true,
      createdAt: "2024-01-01",
      movieCount: 1,
    },
    {
      id: 2,
      name: "Инээдэм",
      description: "Инээдэм кинонууд",
      isActive: true,
      createdAt: "2024-01-01",
      movieCount: 1,
    },
    {
      id: 3,
      name: "Драм",
      description: "Драм кинонууд",
      isActive: true,
      createdAt: "2024-01-01",
      movieCount: 0,
    },
    {
      id: 4,
      name: "Аймшиг",
      description: "Аймшгийн кинонууд",
      isActive: true,
      createdAt: "2024-01-01",
      movieCount: 0,
    },
    {
      id: 5,
      name: "Романтик",
      description: "Романтик кинонууд",
      isActive: true,
      createdAt: "2024-01-01",
      movieCount: 0,
    },
  ])

  // Site settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: "ByteCraft Hub",
    siteDescription: "Монголын хамгийн шилдэг кино стриминг платформ",
    contactEmail: "info@bytecrafthub.mn",
    contactPhone: "+976 99887766",
    address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
    logo: "",
    socialMedia: {
      facebook: "https://facebook.com/bytecrafthub",
      instagram: "https://instagram.com/bytecrafthub",
      youtube: "https://youtube.com/bytecrafthub",
      twitter: "https://twitter.com/bytecrafthub",
    },
    paymentInfo: {
      bankName: "Хаан банк",
      accountNumber: "5123 4567 8901 2345",
      accountName: "ByteCraft Hub LLC",
    },
  })

  // Modal states
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false)
  const [isSubtitleModalOpen, setIsSubtitleModalOpen] = useState(false)
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<AdminMovie | null>(null)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [editingHero, setEditingHero] = useState<HeroSlide | null>(null)
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null)
  const [selectedMovieForSubtitles, setSelectedMovieForSubtitles] = useState<AdminMovie | null>(null)

  // Form states
  const [movieForm, setMovieForm] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    duration: "",
    year: "",
    genre: "",
    image: "",
    imageFile: null as File | null,
    videoUrl: "",
    videoFile: null as File | null,
  })

  const [heroForm, setHeroForm] = useState({
    title: "",
    description: "",
    image: "",
    imageFile: null as File | null,
    order: "",
  })

  const [genreForm, setGenreForm] = useState({
    name: "",
    description: "",
  })

  const [subtitleForm, setSubtitleForm] = useState({
    language: "",
    entries: [] as SubtitleEntry[],
    currentEntry: {
      id: "",
      startTime: 0,
      endTime: 0,
      text: "",
    },
  })

  // Video player states for subtitle editor
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Search and filter states
  const [movieSearch, setMovieSearch] = useState("")
  const [userSearch, setUserSearch] = useState("")
  const [genreSearch, setGenreSearch] = useState("")
  const [movieFilter, setMovieFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")

  const [logoFile, setLogoFile] = useState<File | null>(null)

  // Video player effects
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isSubtitleModalOpen) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [isSubtitleModalOpen, selectedMovieForSubtitles])

  // Keyboard shortcuts for subtitle editor
  useEffect(() => {
    if (!isSubtitleModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current
      if (!video) return

      // Prevent default if we're handling the key
      switch (e.key) {
        case " ":
          e.preventDefault()
          toggleVideoPlay()
          break
        case "ArrowLeft":
          e.preventDefault()
          seekVideo(Math.max(0, currentTime - 5))
          break
        case "ArrowRight":
          e.preventDefault()
          seekVideo(Math.min(duration, currentTime + 5))
          break
        case "Enter":
          if (e.ctrlKey) {
            e.preventDefault()
            addSubtitleEntry()
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isSubtitleModalOpen, currentTime, duration, isPlaying])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminCredentials.email === "admin@gmail.com" && adminCredentials.password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Буруу и-мэйл хаяг эсвэл нууц үг!")
    }
  }

  // Movie functions
  const handleAddMovie = () => {
    const videoUrl = movieForm.videoFile ? URL.createObjectURL(movieForm.videoFile) : movieForm.videoUrl
    const imageUrl = movieForm.imageFile ? URL.createObjectURL(movieForm.imageFile) : movieForm.image

    const newMovie: AdminMovie = {
      id: Date.now(),
      title: movieForm.title,
      description: movieForm.description,
      price: Number(movieForm.price),
      rating: Number(movieForm.rating),
      duration: movieForm.duration,
      year: movieForm.year,
      genre: movieForm.genre,
      image: imageUrl,
      videoUrl: videoUrl,
      isActive: true,
      subtitles: [],
      createdAt: new Date().toISOString().split("T")[0],
      views: 0,
    }
    setMovies([...movies, newMovie])

    // Update genre movie count
    const updatedGenres = genres.map((genre) =>
      genre.name === movieForm.genre ? { ...genre, movieCount: genre.movieCount + 1 } : genre,
    )
    setGenres(updatedGenres)

    setIsMovieModalOpen(false)
    resetMovieForm()
  }

  const handleEditMovie = (movie: AdminMovie) => {
    setEditingMovie(movie)
    setMovieForm({
      title: movie.title,
      description: movie.description,
      price: movie.price.toString(),
      rating: movie.rating.toString(),
      duration: movie.duration,
      year: movie.year,
      genre: movie.genre,
      image: movie.image,
      imageFile: null,
      videoUrl: movie.videoUrl,
      videoFile: null,
    })
    setIsMovieModalOpen(true)
  }

  const handleUpdateMovie = () => {
    if (!editingMovie) return

    const videoUrl = movieForm.videoFile ? URL.createObjectURL(movieForm.videoFile) : editingMovie.videoUrl
    const imageUrl = movieForm.imageFile ? URL.createObjectURL(movieForm.imageFile) : editingMovie.image

    const updatedMovies = movies.map((movie) =>
      movie.id === editingMovie.id
        ? {
            ...movie,
            title: movieForm.title,
            description: movieForm.description,
            price: Number(movieForm.price),
            rating: Number(movieForm.rating),
            duration: movieForm.duration,
            year: movieForm.year,
            genre: movieForm.genre,
            image: imageUrl,
            videoUrl: videoUrl,
          }
        : movie,
    )
    setMovies(updatedMovies)
    setIsMovieModalOpen(false)
    setEditingMovie(null)
    resetMovieForm()
  }

  const toggleMovieStatus = (id: number) => {
    const updatedMovies = movies.map((movie) => (movie.id === id ? { ...movie, isActive: !movie.isActive } : movie))
    setMovies(updatedMovies)
  }

  const deleteMovie = (id: number) => {
    if (confirm("Энэ киног устгахдаа итгэлтэй байна уу?")) {
      const movieToDelete = movies.find((movie) => movie.id === id)
      if (movieToDelete) {
        // Update genre movie count
        const updatedGenres = genres.map((genre) =>
          genre.name === movieToDelete.genre ? { ...genre, movieCount: Math.max(0, genre.movieCount - 1) } : genre,
        )
        setGenres(updatedGenres)
      }
      setMovies(movies.filter((movie) => movie.id !== id))
    }
  }

  const resetMovieForm = () => {
    setMovieForm({
      title: "",
      description: "",
      price: "",
      rating: "",
      duration: "",
      year: "",
      genre: "",
      image: "",
      imageFile: null,
      videoUrl: "",
      videoFile: null,
    })
  }

  // User functions
  const toggleUserStatus = (id: number) => {
    const updatedUsers = users.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user))
    setUsers(updatedUsers)
  }

  // Hero functions
  const handleAddHero = () => {
    const imageUrl = heroForm.imageFile ? URL.createObjectURL(heroForm.imageFile) : heroForm.image

    const newHero: HeroSlide = {
      id: Date.now(),
      title: heroForm.title,
      description: heroForm.description,
      image: imageUrl,
      isActive: true,
      order: Number(heroForm.order),
    }
    setHeroSlides([...heroSlides, newHero])
    setIsHeroModalOpen(false)
    resetHeroForm()
  }

  const handleEditHero = (hero: HeroSlide) => {
    setEditingHero(hero)
    setHeroForm({
      title: hero.title,
      description: hero.description,
      image: hero.image,
      imageFile: null,
      order: hero.order.toString(),
    })
    setIsHeroModalOpen(true)
  }

  const handleUpdateHero = () => {
    if (!editingHero) return

    const imageUrl = heroForm.imageFile ? URL.createObjectURL(heroForm.imageFile) : editingHero.image

    const updatedHeros = heroSlides.map((hero) =>
      hero.id === editingHero.id
        ? {
            ...hero,
            title: heroForm.title,
            description: heroForm.description,
            image: imageUrl,
            order: Number(heroForm.order),
          }
        : hero,
    )
    setHeroSlides(updatedHeros)
    setIsHeroModalOpen(false)
    setEditingHero(null)
    resetHeroForm()
  }

  const toggleHeroStatus = (id: number) => {
    const updatedHeros = heroSlides.map((hero) => (hero.id === id ? { ...hero, isActive: !hero.isActive } : hero))
    setHeroSlides(updatedHeros)
  }

  const resetHeroForm = () => {
    setHeroForm({
      title: "",
      description: "",
      image: "",
      imageFile: null,
      order: "",
    })
  }

  // Genre functions
  const handleAddGenre = () => {
    const newGenre: Genre = {
      id: Date.now(),
      name: genreForm.name,
      description: genreForm.description,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      movieCount: 0,
    }
    setGenres([...genres, newGenre])
    setIsGenreModalOpen(false)
    resetGenreForm()
  }

  const handleEditGenre = (genre: Genre) => {
    setEditingGenre(genre)
    setGenreForm({
      name: genre.name,
      description: genre.description,
    })
    setIsGenreModalOpen(true)
  }

  const handleUpdateGenre = () => {
    if (!editingGenre) return

    const updatedGenres = genres.map((genre) =>
      genre.id === editingGenre.id
        ? {
            ...genre,
            name: genreForm.name,
            description: genreForm.description,
          }
        : genre,
    )
    setGenres(updatedGenres)

    // Update movies with the new genre name
    if (editingGenre.name !== genreForm.name) {
      const updatedMovies = movies.map((movie) =>
        movie.genre === editingGenre.name ? { ...movie, genre: genreForm.name } : movie,
      )
      setMovies(updatedMovies)
    }

    setIsGenreModalOpen(false)
    setEditingGenre(null)
    resetGenreForm()
  }

  const toggleGenreStatus = (id: number) => {
    const updatedGenres = genres.map((genre) => (genre.id === id ? { ...genre, isActive: !genre.isActive } : genre))
    setGenres(updatedGenres)
  }

  const deleteGenre = (id: number) => {
    const genreToDelete = genres.find((genre) => genre.id === id)
    if (genreToDelete && genreToDelete.movieCount > 0) {
      alert("Энэ жанрт кино байгаа тул устгах боломжгүй!")
      return
    }

    if (confirm("Энэ жанрыг устгахдаа итгэлтэй байна уу?")) {
      setGenres(genres.filter((genre) => genre.id !== id))
    }
  }

  const resetGenreForm = () => {
    setGenreForm({
      name: "",
      description: "",
    })
  }

  // Subtitle functions
  const openSubtitleEditor = (movie: AdminMovie) => {
    setSelectedMovieForSubtitles(movie)
    setSubtitleForm({
      language: "",
      entries: [],
      currentEntry: {
        id: "",
        startTime: 0,
        endTime: 0,
        text: "",
      },
    })
    setIsSubtitleModalOpen(true)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const toggleVideoPlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const seekVideo = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const addSubtitleEntry = () => {
    if (!subtitleForm.currentEntry.text.trim()) {
      alert("Хадмалын текст оруулна уу!")
      return
    }

    const newEntry: SubtitleEntry = {
      id: Date.now().toString(),
      startTime: subtitleForm.currentEntry.startTime,
      endTime: subtitleForm.currentEntry.endTime,
      text: subtitleForm.currentEntry.text,
    }

    setSubtitleForm({
      ...subtitleForm,
      entries: [...subtitleForm.entries, newEntry],
      currentEntry: {
        id: "",
        startTime: currentTime,
        endTime: currentTime + 5, // Default 5 seconds duration
        text: "",
      },
    })
  }

  const updateSubtitleEntry = (id: string, field: keyof SubtitleEntry, value: any) => {
    setSubtitleForm({
      ...subtitleForm,
      entries: subtitleForm.entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: field.includes("Time") ? Number(value) : value } : entry,
      ),
    })
  }

  const deleteSubtitleEntry = (id: string) => {
    setSubtitleForm({
      ...subtitleForm,
      entries: subtitleForm.entries.filter((entry) => entry.id !== id),
    })
  }

  const setCurrentTimeAsStart = () => {
    setSubtitleForm({
      ...subtitleForm,
      currentEntry: {
        ...subtitleForm.currentEntry,
        startTime: currentTime,
        endTime: Math.max(currentTime + 5, subtitleForm.currentEntry.endTime),
      },
    })
  }

  const setCurrentTimeAsEnd = () => {
    setSubtitleForm({
      ...subtitleForm,
      currentEntry: {
        ...subtitleForm.currentEntry,
        endTime: currentTime,
      },
    })
  }

  const handleSaveSubtitles = () => {
    if (!selectedMovieForSubtitles || !subtitleForm.language) {
      alert("Хэл сонгоно уу!")
      return
    }

    if (subtitleForm.entries.length === 0) {
      alert("Хадмал оруулна уу!")
      return
    }

    // Sort entries by start time
    const sortedEntries = [...subtitleForm.entries].sort((a, b) => a.startTime - b.startTime)

    const newSubtitle = {
      language: subtitleForm.language,
      entries: sortedEntries,
      uploadDate: new Date().toISOString().split("T")[0],
    }

    const updatedMovies = movies.map((movie) =>
      movie.id === selectedMovieForSubtitles.id
        ? {
            ...movie,
            subtitles: [...movie.subtitles, newSubtitle],
          }
        : movie,
    )
    setMovies(updatedMovies)
    setIsSubtitleModalOpen(false)
  }

  // Filter functions
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(movieSearch.toLowerCase())
    const matchesFilter =
      movieFilter === "all" ||
      (movieFilter === "active" && movie.isActive) ||
      (movieFilter === "inactive" && !movie.isActive)
    return matchesSearch && matchesFilter
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
    const matchesFilter =
      userFilter === "all" ||
      (userFilter === "active" && user.isActive) ||
      (userFilter === "inactive" && !user.isActive) ||
      (userFilter === "vip" && user.subscription === "VIP")
    return matchesSearch && matchesFilter
  })

  const filteredGenres = genres.filter((genre) => {
    const matchesSearch = genre.name.toLowerCase().includes(genreSearch.toLowerCase())
    const matchesFilter =
      genreFilter === "all" ||
      (genreFilter === "active" && genre.isActive) ||
      (genreFilter === "inactive" && !genre.isActive)
    return matchesSearch && matchesFilter
  })

  // Statistics
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.isActive).length
  const totalMovies = movies.length
  const activeMovies = movies.filter((m) => m.isActive).length
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0)
  const totalViews = movies.reduce((sum, movie) => sum + movie.views, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("mn-MN").format(price) + "₮"
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500 text-center flex items-center justify-center">
              <Shield className="w-6 h-6 mr-2" />
              АДМИН НЭВТРЭХ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">И-мэйл хаяг</label>
                <Input
                  type="email"
                  value={adminCredentials.email}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                  placeholder="admin@gmail.com"
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Нууц үг</label>
                <Input
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  placeholder="admin123"
                  required
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                НЭВТРЭХ
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-red-600 transform rotate-45 rounded-sm"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold transform -rotate-45">BC</span>
                  </div>
                </div>
                <div className="text-white">
                  <div className="text-xl font-bold tracking-wider">BYTECRAFT</div>
                  <div className="text-xs tracking-widest opacity-80">ADMIN</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  <Monitor className="w-4 h-4 mr-2" />
                  Сайт үзэх
                </Button>
              </Link>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Гарах
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 mb-6">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-red-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Хяналтын самбар
            </TabsTrigger>
            <TabsTrigger value="movies" className="text-white data-[state=active]:bg-red-600">
              <Film className="w-4 h-4 mr-2" />
              Кино удирдах
            </TabsTrigger>
            <TabsTrigger value="genres" className="text-white data-[state=active]:bg-red-600">
              <Tags className="w-4 h-4 mr-2" />
              Жанр удирдах
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-red-600">
              <Users className="w-4 h-4 mr-2" />
              Хэрэглэгч
            </TabsTrigger>
            <TabsTrigger value="hero" className="text-white data-[state=active]:bg-red-600">
              <ImageIcon className="w-4 h-4 mr-2" />
              Нүүр хэсэг
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-red-600">
              <Settings className="w-4 h-4 mr-2" />
              Тохиргоо
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Нийт хэрэглэгч</p>
                      <p className="text-3xl font-bold text-white">{totalUsers}</p>
                      <p className="text-green-500 text-sm">+{activeUsers} идэвхтэй</p>
                    </div>
                    <Users className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Нийт кино</p>
                      <p className="text-3xl font-bold text-white">{totalMovies}</p>
                      <p className="text-green-500 text-sm">+{activeMovies} идэвхтэй</p>
                    </div>
                    <Film className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Нийт орлого</p>
                      <p className="text-3xl font-bold text-white">{formatPrice(totalRevenue)}</p>
                      <p className="text-green-500 text-sm">+12% энэ сар</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Нийт үзэлт</p>
                      <p className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
                      <p className="text-green-500 text-sm">+8% энэ сар</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-500" />
                    Сүүлийн үйл ажиллагаа
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Шинэ хэрэглэгч бүртгэгдлээ</p>
                        <p className="text-gray-400 text-xs">5 минутын өмнө</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">ZONE кино үзэгдлээ</p>
                        <p className="text-gray-400 text-xs">10 минутын өмнө</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Төлбөр төлөгдлөө</p>
                        <p className="text-gray-400 text-xs">15 минутын өмнө</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                    Хамгийн их үзэгдсэн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {movies.slice(0, 3).map((movie, index) => (
                      <div key={movie.id} className="flex items-center space-x-3">
                        <div className="text-red-500 font-bold">#{index + 1}</div>
                        <Image
                          src={movie.image || "/placeholder.svg"}
                          alt={movie.title}
                          width={40}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{movie.title}</p>
                          <p className="text-gray-400 text-xs">{movie.views} үзэлт</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Movies Tab */}
          <TabsContent value="movies" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-white">Кино удирдах</h2>
              <Button onClick={() => setIsMovieModalOpen(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Шинэ кино нэмэх
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Кино хайх..."
                    value={movieSearch}
                    onChange={(e) => setMovieSearch(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <Select value={movieFilter} onValueChange={setMovieFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Шүүлтүүр" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Бүх кино</SelectItem>
                  <SelectItem value="active">Идэвхтэй</SelectItem>
                  <SelectItem value="inactive">Идэвхгүй</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setIsGenreModalOpen(true)}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <Tags className="w-4 h-4 mr-2" />
                Шинэ жанр
              </Button>
            </div>

            {/* Movies Table */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Кино</TableHead>
                      <TableHead className="text-gray-300">Жанр</TableHead>
                      <TableHead className="text-gray-300">Үнэ</TableHead>
                      <TableHead className="text-gray-300">Үнэлгээ</TableHead>
                      <TableHead className="text-gray-300">Үзэлт</TableHead>
                      <TableHead className="text-gray-300">Статус</TableHead>
                      <TableHead className="text-gray-300">Үйлдэл</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovies.map((movie) => (
                      <TableRow key={movie.id} className="border-gray-700">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={movie.image || "/placeholder.svg"}
                              alt={movie.title}
                              width={50}
                              height={75}
                              className="rounded object-cover"
                            />
                            <div>
                              <p className="text-white font-medium">{movie.title}</p>
                              <p className="text-gray-400 text-sm">{movie.year}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{movie.genre}</TableCell>
                        <TableCell className="text-gray-300">{formatPrice(movie.price)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-gray-300">{movie.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{movie.views}</TableCell>
                        <TableCell>
                          <Badge className={movie.isActive ? "bg-green-600" : "bg-gray-600"}>
                            {movie.isActive ? "Идэвхтэй" : "Идэвхгүй"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditMovie(movie)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openSubtitleEditor(movie)}
                              className="text-purple-400 hover:text-purple-300"
                              title={`${movie.subtitles.length} хадмал`}
                            >
                              <Subtitles className="w-4 h-4" />
                              {movie.subtitles.length > 0 && (
                                <span className="ml-1 text-xs">{movie.subtitles.length}</span>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleMovieStatus(movie.id)}
                              className={
                                movie.isActive
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-green-400 hover:text-green-300"
                              }
                            >
                              {movie.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteMovie(movie.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Genres Tab */}
          <TabsContent value="genres" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-white">Жанр удирдах</h2>
              <Button onClick={() => setIsGenreModalOpen(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Шинэ жанр нэмэх
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Жанр хайх..."
                    value={genreSearch}
                    onChange={(e) => setGenreSearch(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Шүүлтүүр" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Бүх жанр</SelectItem>
                  <SelectItem value="active">Идэвхтэй</SelectItem>
                  <SelectItem value="inactive">Идэвхгүй</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Genres Table */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Жанрын нэр</TableHead>
                      <TableHead className="text-gray-300">Тайлбар</TableHead>
                      <TableHead className="text-gray-300">Киноны тоо</TableHead>
                      <TableHead className="text-gray-300">Үүсгэсэн огноо</TableHead>
                      <TableHead className="text-gray-300">Статус</TableHead>
                      <TableHead className="text-gray-300">Үйлдэл</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGenres.map((genre) => (
                      <TableRow key={genre.id} className="border-gray-700">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                              <Tags className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{genre.name}</p>
                              <p className="text-gray-400 text-sm">ID: {genre.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{genre.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {genre.movieCount} кино
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{genre.createdAt}</TableCell>
                        <TableCell>
                          <Badge className={genre.isActive ? "bg-green-600" : "bg-gray-600"}>
                            {genre.isActive ? "Идэвхтэй" : "Идэвхгүй"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditGenre(genre)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleGenreStatus(genre.id)}
                              className={
                                genre.isActive
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-green-400 hover:text-green-300"
                              }
                            >
                              {genre.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteGenre(genre.id)}
                              className="text-red-400 hover:text-red-300"
                              disabled={genre.movieCount > 0}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-white">Хэрэглэгч удирдах</h2>
              <Button className="bg-red-600 hover:bg-red-700">
                <Download className="w-4 h-4 mr-2" />
                Экспорт хийх
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Хэрэглэгч хайх..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Шүүлтүүр" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Бүх хэрэглэгч</SelectItem>
                  <SelectItem value="active">Идэвхтэй</SelectItem>
                  <SelectItem value="inactive">Идэвхгүй</SelectItem>
                  <SelectItem value="vip">VIP гишүүн</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Хэрэглэгч</TableHead>
                      <TableHead className="text-gray-300">И-мэйл</TableHead>
                      <TableHead className="text-gray-300">Утас</TableHead>
                      <TableHead className="text-gray-300">Багц</TableHead>
                      <TableHead className="text-gray-300">Зарцуулсан</TableHead>
                      <TableHead className="text-gray-300">Сүүлд нэвтэрсэн</TableHead>
                      <TableHead className="text-gray-300">Статус</TableHead>
                      <TableHead className="text-gray-300">Үйлдэл</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-gray-700">
                        <TableCell>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-gray-400 text-sm">ID: {user.id}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{user.email}</TableCell>
                        <TableCell className="text-gray-300">{user.phone}</TableCell>
                        <TableCell>
                          <Badge className={user.subscription === "VIP" ? "bg-yellow-600" : "bg-blue-600"}>
                            {user.subscription}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{formatPrice(user.totalSpent)}</TableCell>
                        <TableCell className="text-gray-300">{user.lastLogin}</TableCell>
                        <TableCell>
                          <Badge className={user.isActive ? "bg-green-600" : "bg-gray-600"}>
                            {user.isActive ? "Идэвхтэй" : "Идэвхгүй"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleUserStatus(user.id)}
                              className={
                                user.isActive
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-green-400 hover:text-green-300"
                              }
                            >
                              {user.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Tab */}
          <TabsContent value="hero" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-2xl font-bold text-white">Нүүр хэсгийн слайд удирдах</h2>
              <Button onClick={() => setIsHeroModalOpen(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Шинэ слайд нэмэх
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide) => (
                <Card key={slide.id} className="bg-gray-900 border-gray-700">
                  <div className="relative">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={slide.isActive ? "bg-green-600" : "bg-gray-600"}>
                        {slide.isActive ? "Идэвхтэй" : "Идэвхгүй"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-white font-bold mb-2">{slide.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{slide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Эрэмбэ: {slide.order}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditHero(slide)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleHeroStatus(slide.id)}
                          className={
                            slide.isActive ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"
                          }
                        >
                          {slide.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Сайтын тохиргоо</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Site Information */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-red-500" />
                    Сайтын мэдээлэл
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Сайтын нэр</label>
                    <Input
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Тайлбар</label>
                    <Textarea
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">И-мэйл хаяг</label>
                    <Input
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Утасны дугаар</label>
                    <Input
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Хаяг</label>
                    <Input
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Logo Settings */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-red-500" />
                    Лого тохиргоо
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Одоогийн лого</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                      {siteSettings.logo ? (
                        <div className="space-y-2">
                          <Image
                            src={siteSettings.logo || "/placeholder.svg"}
                            alt="Site Logo"
                            width={100}
                            height={100}
                            className="mx-auto rounded"
                          />
                          <div className="flex justify-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const input = document.createElement("input")
                                input.type = "file"
                                input.accept = ".png,.jpg,.jpeg,.svg"
                                input.onchange = (e) => {
                                  const file = (e.target as HTMLInputElement).files?.[0]
                                  if (file) {
                                    setLogoFile(file)
                                    setSiteSettings({ ...siteSettings, logo: URL.createObjectURL(file) })
                                  }
                                }
                                input.click()
                              }}
                              className="border-gray-600 text-white hover:bg-gray-800"
                            >
                              Лого солих
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSiteSettings({ ...siteSettings, logo: "" })}
                              className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                            >
                              Лого устгах
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                          <p className="text-gray-400">Лого сонгоогүй байна</p>
                          <Button
                            size="sm"
                            onClick={() => {
                              const input = document.createElement("input")
                              input.type = "file"
                              input.accept = ".png,.jpg,.jpeg,.svg"
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0]
                                if (file) {
                                  setLogoFile(file)
                                  setSiteSettings({ ...siteSettings, logo: URL.createObjectURL(file) })
                                }
                              }
                              input.click()
                            }}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Лого сонгох
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">PNG, JPG, SVG файл дэмжигдэнэ</p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Нийгмийн сүлжээ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Facebook</label>
                    <Input
                      value={siteSettings.socialMedia.facebook}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          socialMedia: { ...siteSettings.socialMedia, facebook: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Instagram</label>
                    <Input
                      value={siteSettings.socialMedia.instagram}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          socialMedia: { ...siteSettings.socialMedia, instagram: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">YouTube</label>
                    <Input
                      value={siteSettings.socialMedia.youtube}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          socialMedia: { ...siteSettings.socialMedia, youtube: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Twitter</label>
                    <Input
                      value={siteSettings.socialMedia.twitter}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          socialMedia: { ...siteSettings.socialMedia, twitter: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Төлбөрийн мэдээлэл</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Банкны нэр</label>
                    <Input
                      value={siteSettings.paymentInfo.bankName}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          paymentInfo: { ...siteSettings.paymentInfo, bankName: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Дансны дугаар</label>
                    <Input
                      value={siteSettings.paymentInfo.accountNumber}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          paymentInfo: { ...siteSettings.paymentInfo, accountNumber: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Дансны нэр</label>
                    <Input
                      value={siteSettings.paymentInfo.accountName}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          paymentInfo: { ...siteSettings.paymentInfo, accountName: e.target.value },
                        })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button className="bg-red-600 hover:bg-red-700">
                <Save className="w-4 h-4 mr-2" />
                Тохиргоо хадгалах
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Movie Modal */}
      <Dialog open={isMovieModalOpen} onOpenChange={setIsMovieModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingMovie ? "Кино засах" : "Шинэ кино нэмэх"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Киноны нэр</label>
                <Input
                  value={movieForm.title}
                  onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Жанр</label>
                <Select value={movieForm.genre} onValueChange={(value) => setMovieForm({ ...movieForm, genre: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Жанр сонгох" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {genres
                      .filter((genre) => genre.isActive)
                      .map((genre) => (
                        <SelectItem key={genre.id} value={genre.name}>
                          {genre.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Тайлбар</label>
              <Textarea
                value={movieForm.description}
                onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Үнэ (₮)</label>
                <Input
                  type="number"
                  value={movieForm.price}
                  onChange={(e) => setMovieForm({ ...movieForm, price: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Үнэлгээ</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={movieForm.rating}
                  onChange={(e) => setMovieForm({ ...movieForm, rating: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Он</label>
                <Input
                  value={movieForm.year}
                  onChange={(e) => setMovieForm({ ...movieForm, year: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Үргэлжлэх хугацаа</label>
              <Input
                value={movieForm.duration}
                onChange={(e) => setMovieForm({ ...movieForm, duration: e.target.value })}
                placeholder="120 мин"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Зураг</label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setMovieForm({ ...movieForm, imageFile: file, image: URL.createObjectURL(file) })
                    }
                  }}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {movieForm.image && (
                  <div className="mt-2">
                    <Image
                      src={movieForm.image || "/placeholder.svg"}
                      alt="Preview"
                      width={200}
                      height={300}
                      className="rounded object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Видео файл</label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setMovieForm({ ...movieForm, videoFile: file, videoUrl: URL.createObjectURL(file) })
                    }
                  }}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {movieForm.videoFile && (
                  <p className="text-green-400 text-sm">Файл сонгогдлоо: {movieForm.videoFile.name}</p>
                )}
                {!movieForm.videoFile && (
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Эсвэл видео URL оруулах</label>
                    <Input
                      value={movieForm.videoUrl}
                      onChange={(e) => setMovieForm({ ...movieForm, videoUrl: e.target.value })}
                      placeholder="https://example.com/video.mp4"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsMovieModalOpen(false)}
                className="border-gray-600 text-white"
              >
                Цуцлах
              </Button>
              <Button
                onClick={editingMovie ? handleUpdateMovie : handleAddMovie}
                className="bg-red-600 hover:bg-red-700"
              >
                {editingMovie ? "Засах" : "Нэмэх"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Modal */}
      <Dialog open={isHeroModalOpen} onOpenChange={setIsHeroModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingHero ? "Слайд засах" : "Шинэ слайд нэмэх"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Гарчиг</label>
              <Input
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Тайлбар</label>
              <Textarea
                value={heroForm.description}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Эрэмбэ</label>
              <Input
                type="number"
                value={heroForm.order}
                onChange={(e) => setHeroForm({ ...heroForm, order: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Зураг</label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setHeroForm({ ...heroForm, imageFile: file, image: URL.createObjectURL(file) })
                    }
                  }}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                {heroForm.image && (
                  <div className="mt-2">
                    <Image
                      src={heroForm.image || "/placeholder.svg"}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="rounded object-cover w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsHeroModalOpen(false)}
                className="border-gray-600 text-white"
              >
                Цуцлах
              </Button>
              <Button onClick={editingHero ? handleUpdateHero : handleAddHero} className="bg-red-600 hover:bg-red-700">
                {editingHero ? "Засах" : "Нэмэх"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Genre Modal */}
      <Dialog open={isGenreModalOpen} onOpenChange={setIsGenreModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>{editingGenre ? "Жанр засах" : "Шинэ жанр нэмэх"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Жанрын нэр</label>
              <Input
                value={genreForm.name}
                onChange={(e) => setGenreForm({ ...genreForm, name: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Тайлбар</label>
              <Textarea
                value={genreForm.description}
                onChange={(e) => setGenreForm({ ...genreForm, description: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsGenreModalOpen(false)}
                className="border-gray-600 text-white"
              >
                Цуцлах
              </Button>
              <Button
                onClick={editingGenre ? handleUpdateGenre : handleAddGenre}
                className="bg-red-600 hover:bg-red-700"
              >
                {editingGenre ? "Засах" : "Нэмэх"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subtitle Editor Modal */}
      <Dialog open={isSubtitleModalOpen} onOpenChange={setIsSubtitleModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-7xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Subtitles className="w-5 h-5 mr-2 text-red-500" />
                Хадмал засварлагч - {selectedMovieForSubtitles?.title}
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  {subtitleForm.entries.length} хадмал
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  {subtitleForm.language || "Хэл сонгоогүй"}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-12 gap-6 h-[80vh]">
            {/* Video Player Section - 7 columns */}
            <div className="col-span-7 space-y-4">
              {/* Video Container */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={selectedMovieForSubtitles?.videoUrl}
                  className="w-full h-80 object-contain"
                  controls={false}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setDuration(videoRef.current.duration)
                    }
                  }}
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime)
                    }
                  }}
                />

                {/* Subtitle Overlay */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-w-[90%]">
                  {subtitleForm.entries
                    .filter((entry) => currentTime >= entry.startTime && currentTime <= entry.endTime)
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-center shadow-lg border border-gray-600"
                        style={{
                          fontSize: "18px",
                          lineHeight: "1.4",
                          fontWeight: "500",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {entry.text}
                      </div>
                    ))}
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-75 rounded-lg p-3">
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          value={currentTime}
                          onChange={(e) => seekVideo(Number(e.target.value))}
                          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`,
                          }}
                        />

                        {/* Subtitle markers on timeline */}
                        {subtitleForm.entries.map((entry) => (
                          <div
                            key={entry.id}
                            className="absolute top-0 h-2 bg-yellow-500 opacity-60 rounded"
                            style={{
                              left: `${(entry.startTime / duration) * 100}%`,
                              width: `${((entry.endTime - entry.startTime) / duration) * 100}%`,
                              minWidth: "2px",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          onClick={toggleVideoPlay}
                          className="bg-red-600 hover:bg-red-700 w-10 h-10 rounded-full p-0"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => seekVideo(Math.max(0, currentTime - 10))}
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800"
                        >
                          -10s
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => seekVideo(Math.min(duration, currentTime + 10))}
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800"
                        >
                          +10s
                        </Button>
                      </div>

                      <div className="text-white text-sm font-mono bg-gray-800 px-3 py-1 rounded">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.playbackRate = 0.5
                            }
                          }}
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 text-xs"
                        >
                          0.5x
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.playbackRate = 1
                            }
                          }}
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 text-xs"
                        >
                          1x
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.playbackRate = 1.5
                            }
                          }}
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 text-xs"
                        >
                          1.5x
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Add Subtitle Form */}
              <Card className="bg-gray-800 border-gray-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-green-500" />
                    Шинэ хадмал нэмэх
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                      <label className="block text-white font-medium mb-2">Хэл</label>
                      <Select
                        value={subtitleForm.language}
                        onValueChange={(value) => setSubtitleForm({ ...subtitleForm, language: value })}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Хэл сонгох" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="mn">🇲🇳 Монгол</SelectItem>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                          <SelectItem value="zh">🇨🇳 中文</SelectItem>
                          <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                          <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3">
                      <label className="block text-white font-medium mb-2">Эхлэх цаг</label>
                      <div className="flex space-x-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={subtitleForm.currentEntry.startTime}
                          onChange={(e) =>
                            setSubtitleForm({
                              ...subtitleForm,
                              currentEntry: { ...subtitleForm.currentEntry, startTime: Number(e.target.value) },
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={setCurrentTimeAsStart}
                          className="bg-blue-600 hover:bg-blue-700 px-2"
                          title="Одоогийн цагийг эхлэх цаг болгох"
                        >
                          <Clock className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label className="block text-white font-medium mb-2">Дуусах цаг</label>
                      <div className="flex space-x-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={subtitleForm.currentEntry.endTime}
                          onChange={(e) =>
                            setSubtitleForm({
                              ...subtitleForm,
                              currentEntry: { ...subtitleForm.currentEntry, endTime: Number(e.target.value) },
                            })
                          }
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={setCurrentTimeAsEnd}
                          className="bg-blue-600 hover:bg-blue-700 px-2"
                          title="Одоогийн цагийг дуусах цаг болгох"
                        >
                          <Clock className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-white font-medium mb-2">Үйлдэл</label>
                      <Button
                        onClick={addSubtitleEntry}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!subtitleForm.currentEntry.text.trim()}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Нэмэх
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Хадмалын текст</label>
                    <Textarea
                      value={subtitleForm.currentEntry.text}
                      onChange={(e) =>
                        setSubtitleForm({
                          ...subtitleForm,
                          currentEntry: { ...subtitleForm.currentEntry, text: e.target.value },
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={2}
                      placeholder="Хадмалын текст оруулах... (Enter дарж шинэ мөр нэмэх)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          e.preventDefault()
                          addSubtitleEntry()
                        }
                      }}
                    />
                    <p className="text-gray-400 text-xs mt-1">💡 Зөвлөмж: Ctrl+Enter дарж хурдан нэмэх</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subtitle List Section - 5 columns */}
            <div className="col-span-5 space-y-4 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">
                  Хадмалын жагсаалт
                  <span className="ml-2 text-sm text-gray-400">({subtitleForm.entries.length})</span>
                </h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      const sortedEntries = [...subtitleForm.entries].sort((a, b) => a.startTime - b.startTime)
                      setSubtitleForm({ ...subtitleForm, entries: sortedEntries })
                    }}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    Эрэмбэлэх
                  </Button>
                  <Button
                    onClick={handleSaveSubtitles}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={!subtitleForm.language || subtitleForm.entries.length === 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Хадгалах
                  </Button>
                </div>
              </div>

              {/* Subtitle Entries */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {subtitleForm.entries.length === 0 ? (
                  <div className="text-center py-12">
                    <Subtitles className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Хадмал нэмээгүй байна</p>
                    <p className="text-gray-500 text-sm">Дээрх формоор хадмал нэмнэ үү</p>
                  </div>
                ) : (
                  subtitleForm.entries.map((entry, index) => (
                    <Card
                      key={entry.id}
                      className={`bg-gray-800 border-gray-600 transition-all duration-200 hover:border-gray-500 ${
                        currentTime >= entry.startTime && currentTime <= entry.endTime
                          ? "border-red-500 bg-gray-750"
                          : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="border-blue-500 text-blue-400">
                                #{index + 1}
                              </Badge>
                              <div className="text-sm text-gray-400 font-mono">
                                {formatTime(entry.startTime)} → {formatTime(entry.endTime)}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {(entry.endTime - entry.startTime).toFixed(1)}s
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => seekVideo(entry.startTime)}
                                className="text-green-400 hover:text-green-300 p-1"
                                title="Эхлэх цаг руу шилжих"
                              >
                                <Play className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteSubtitleEntry(entry.id)}
                                className="text-red-400 hover:text-red-300 p-1"
                                title="Устгах"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Timing Controls */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Эхлэх</label>
                              <Input
                                type="number"
                                step="0.1"
                                value={entry.startTime}
                                onChange={(e) => updateSubtitleEntry(entry.id, "startTime", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white text-xs h-8"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Дуусах</label>
                              <Input
                                type="number"
                                step="0.1"
                                value={entry.endTime}
                                onChange={(e) => updateSubtitleEntry(entry.id, "endTime", e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white text-xs h-8"
                              />
                            </div>
                          </div>

                          {/* Text Content */}
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Текст</label>
                            <Textarea
                              value={entry.text}
                              onChange={(e) => updateSubtitleEntry(entry.id, "text", e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white text-sm resize-none"
                              rows={2}
                            />
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const newStartTime = Math.max(0, entry.startTime - 0.5)
                                  updateSubtitleEntry(entry.id, "startTime", newStartTime)
                                }}
                                className="text-xs text-gray-400 hover:text-white p-1"
                                title="0.5с эрт эхлүүлэх"
                              >
                                ←0.5s
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const newEndTime = entry.endTime + 0.5
                                  updateSubtitleEntry(entry.id, "endTime", newEndTime)
                                }}
                                className="text-xs text-gray-400 hover:text-white p-1"
                                title="0.5с удаашруулах"
                              >
                                +0.5s→
                              </Button>
                            </div>
                            <div className="text-xs text-gray-500">{entry.text.length} тэмдэгт</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Existing Subtitles */}
              {selectedMovieForSubtitles && selectedMovieForSubtitles.subtitles.length > 0 && (
                <Card className="bg-gray-800 border-gray-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-500" />
                      Хадгалагдсан хадмалууд
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedMovieForSubtitles.subtitles.map((subtitle, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                        <div>
                          <p className="text-white font-medium text-sm">{subtitle.language}</p>
                          <p className="text-gray-400 text-xs">
                            {subtitle.entries.length} хадмал • {subtitle.uploadDate}
                          </p>
                        </div>
                        <Badge className="bg-green-600 text-xs">Хадгалагдсан</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <span className="font-medium">Товчлуурууд:</span>
                <span className="ml-2">Space - Тоглуулах/Зогсоох</span>
                <span className="ml-4">← → - 5с урагш/хойш</span>
                <span className="ml-4">Ctrl+Enter - Хадмал нэмэх</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubtitleModalOpen(false)}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Хаах
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
