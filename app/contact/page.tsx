"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle,
  Headphones,
  Globe,
  Home,
  Film,
  Grid3X3,
} from "lucide-react"
import Link from "next/link"
import AuthModal from "@/components/auth-modal"
import UserProfileModal from "@/components/user-profile-modal"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 3000)
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
              <Link href="/categories" className="text-white hover:text-red-500 transition-colors font-medium">
                АНГИЛАЛ
              </Link>
              <Link href="/contact" className="text-red-500 font-medium">
                ХОЛБОО
              </Link>
            </nav>

            {/* Desktop Login Button */}
            {userProfile ? (
              <Button
                onClick={() => setIsProfileModalOpen(true)}
                className="hidden md:flex bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-none font-medium"
              >
                <Image
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt="Profile"
                  width={20}
                  height={20}
                  className="rounded-full mr-2"
                />
                ПРОФАЙЛ
              </Button>
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
      <section className="relative py-20 md:py-16 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-wider">ХОЛБОО БАРИХ</h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Бидэнтэй холбогдож, таны асуулт, санал хүсэлтийг илгээнэ үү
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6 mb-8 md:mb-12">
            {/* Phone */}
            <Card className="bg-gray-900 border-gray-800 rounded-none">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">УТАС</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p className="text-gray-300">+976 99887766</p>
                  <p className="text-gray-300">+976 88776655</p>
                  <p className="text-gray-400 text-xs mt-2">09:00 - 22:00</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-gray-900 border-gray-800 rounded-none">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">И-МЭЙЛ</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p className="text-gray-300">info@bytecrafthub.mn</p>
                  <p className="text-gray-300">support@bytecrafthub.mn</p>
                  <p className="text-gray-400 text-xs mt-2">24 цагийн дотор</p>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="bg-gray-900 border-gray-800 rounded-none">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">ХАЯГ</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p className="text-gray-300">Улаанбаатар хот</p>
                  <p className="text-gray-300">Сүхбаатар дүүрэг</p>
                  <p className="text-gray-300">Энхтайваны өргөн чөлөө 46</p>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="bg-gray-900 border-gray-800 rounded-none">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">АЖЛЫН ЦАГ</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p className="text-gray-300">Даваа - Баасан</p>
                  <p className="text-gray-300">09:00 - 18:00</p>
                  <p className="text-gray-300">Бямба: 10:00-16:00</p>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-gray-900 border-gray-800 rounded-none">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Headphones className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">ТУСЛАМЖ</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <p className="text-gray-300">24/7 Онлайн</p>
                  <p className="text-gray-300">Техникийн дэмжлэг</p>
                  <p className="text-gray-300">Шуурхай хариулт</p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-gray-900 border-gray-800 rounded-none">
              <CardContent className="p-3 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">СОШИАЛ</h3>
                <div className="grid grid-cols-2 gap-1 md:gap-2 mt-3 md:mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full h-6 md:h-8 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
                  >
                    <Facebook className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full h-6 md:h-8 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
                  >
                    <Instagram className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full h-6 md:h-8 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
                  >
                    <Youtube className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full h-6 md:h-8 border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
                  >
                    <Twitter className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900 border-gray-700 h-full">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 text-red-500" />
                    МЕССЕЖ ИЛГЭЭХ
                  </CardTitle>
                  <p className="text-gray-400 text-sm md:text-base">
                    Бидэнтэй холбогдож, таны асуулт, санал хүсэлтийг илгээнэ үү
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  {isSubmitted ? (
                    <div className="text-center py-6 md:py-8 space-y-4">
                      <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto" />
                      <h3 className="text-xl md:text-2xl font-bold text-white">Амжилттай илгээгдлээ!</h3>
                      <p className="text-gray-300 text-sm md:text-base">
                        Таны мессежийг хүлээн авлаа. Бид удахгүй хариулах болно.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2 text-sm md:text-base">Нэр *</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Таны нэр"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none text-sm md:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2 text-sm md:text-base">И-мэйл *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@email.com"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none text-sm md:text-base"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2 text-sm md:text-base">Утас</label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+976 99887766"
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none text-sm md:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2 text-sm md:text-base">Сэдэв *</label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Мессежийн сэдэв"
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none text-sm md:text-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 text-sm md:text-base">Мессеж *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Таны мессеж..."
                          required
                          rows={4}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none resize-none text-sm md:text-base"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 rounded-none font-bold tracking-wide transition-all duration-300 text-sm md:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            ИЛГЭЭЖ БАЙНА...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            МЕССЕЖ ИЛГЭЭХ
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Additional Information - Takes 1 column */}
            <div className="space-y-4 md:space-y-6">
              {/* Company Info */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-bold text-white">КОМПАНИЙН МЭДЭЭЛЭЛ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm md:text-base">ByteCraft Hub LLC</h4>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      Монголын хамгийн шилдэг кино стриминг платформ. Бид таны асуулт, санал хүсэлтийг хүлээн авч,
                      хамгийн сайн үйлчилгээ үзүүлэхийг зорьдог.
                    </p>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Үүсгэн байгуулагдсан:</span>
                      <span className="text-white">2024 он</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Регистрийн дугаар:</span>
                      <span className="text-white">9919012345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Татварын дугаар:</span>
                      <span className="text-white">13012345</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-red-900/20 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-bold text-red-400">ЯАРАЛТАЙ ХОЛБОО</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs md:text-sm text-red-300">
                    <p className="font-semibold mb-2">Техникийн асуудал:</p>
                    <p>📞 +976 99887766</p>
                    <p>📧 support@bytecrafthub.mn</p>
                  </div>
                  <div className="text-xs md:text-sm text-red-300">
                    <p className="font-semibold mb-2">Төлбөрийн асуудал:</p>
                    <p>📞 +976 88776655</p>
                    <p>📧 billing@bytecrafthub.mn</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
          <Link href="/categories" className="flex flex-col items-center space-y-1 p-2 text-gray-400 hover:text-white">
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs font-medium">АНГИЛАЛ</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center space-y-1 p-2 text-red-500">
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
