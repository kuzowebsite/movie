"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Heart, Clock, Settings, CreditCard, Star, Film, Edit, Save, X } from "lucide-react"
import Image from "next/image"

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userProfile: any
  onUpdateProfile: (profile: any) => void
}

export default function UserProfileModal({ isOpen, onClose, userProfile, onUpdateProfile }: UserProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: userProfile?.name || "",
    phone: userProfile?.phone || "",
    bio: userProfile?.bio || "",
  })

  const handleSave = () => {
    const updatedProfile = {
      ...userProfile,
      ...editData,
    }
    onUpdateProfile(updatedProfile)
    setIsEditing(false)
  }

  const favoriteMovies = [
    { id: 1, title: "ZONE", image: "/images/hero-bg.png", rating: 4.8 },
    { id: 2, title: "Wolf of the Tegri", image: "/images/movie4.png", rating: 4.9 },
    { id: 3, title: "Family Shock", image: "/images/movie2.png", rating: 4.7 },
  ]

  const watchHistory = [
    { id: 1, title: "ZONE", image: "/images/hero-bg.png", watchedAt: "2024-01-15", progress: 100 },
    { id: 2, title: "Гэнэтийн Зочид", image: "/images/movie5.png", watchedAt: "2024-01-14", progress: 75 },
    { id: 3, title: "In Da House 3", image: "/images/movie3.png", watchedAt: "2024-01-13", progress: 45 },
  ]

  if (!userProfile) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-500 text-center tracking-wide">
            ХЭРЭГЛЭГЧИЙН ПРОФАЙЛ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-black/50 rounded-none">
            <div className="relative">
              <Image
                src={userProfile.avatar || "/placeholder.svg"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-red-600"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white text-xl font-bold"
                    placeholder="Нэр"
                  />
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Утасны дугаар"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 text-white p-2 rounded-none"
                    placeholder="Товч танилцуулга"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-1" />
                      Хадгалах
                    </Button>
                    <Button onClick={() => setIsEditing(false)} size="sm" variant="outline" className="border-gray-600">
                      <X className="w-4 h-4 mr-1" />
                      Цуцлах
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <h2 className="text-3xl font-bold">{userProfile.name}</h2>
                    <Button
                      onClick={() => setIsEditing(true)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{userProfile.email}</span>
                  </div>

                  {userProfile.phone && (
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                      <span>📱</span>
                      <span>{userProfile.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Нэгдсэн: {new Date(userProfile.joinDate).toLocaleDateString("mn-MN")}</span>
                  </div>

                  {userProfile.bio && <p className="text-gray-300 max-w-md">{userProfile.bio}</p>}

                  <div className="flex justify-center md:justify-start space-x-4 pt-2">
                    <Badge className="bg-red-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      VIP Гишүүн
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      <Film className="w-3 h-3 mr-1" />
                      {favoriteMovies.length} дуртай кино
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="favorites" className="text-white data-[state=active]:bg-red-600">
                <Heart className="w-4 h-4 mr-2" />
                ДУРТАЙ
              </TabsTrigger>
              <TabsTrigger value="history" className="text-white data-[state=active]:bg-red-600">
                <Clock className="w-4 h-4 mr-2" />
                ТҮҮХ
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-white data-[state=active]:bg-red-600">
                <Settings className="w-4 h-4 mr-2" />
                ТОХИРГОО
              </TabsTrigger>
            </TabsList>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-4 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Дуртай кинонууд</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favoriteMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-black/50 rounded-none overflow-hidden group hover:bg-black/70 transition-all"
                  >
                    <div className="relative">
                      <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        width={200}
                        height={120}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-red-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          {movie.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-white">{movie.title}</h4>
                      <Button size="sm" className="w-full mt-2 bg-red-600 hover:bg-red-700">
                        Дахин үзэх
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Үзсэн кинонууд</h3>
              <div className="space-y-3">
                {watchHistory.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center space-x-4 p-4 bg-black/50 rounded-none hover:bg-black/70 transition-all"
                  >
                    <Image
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      width={80}
                      height={60}
                      className="rounded-none object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{movie.title}</h4>
                      <p className="text-sm text-gray-400">
                        Үзсэн: {new Date(movie.watchedAt).toLocaleDateString("mn-MN")}
                      </p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${movie.progress}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{movie.progress}% дууссан</p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Үргэлжлүүлэх
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Тохиргоо</h3>

              <div className="space-y-4">
                <div className="p-4 bg-black/50 rounded-none">
                  <h4 className="font-bold text-white mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-red-500" />
                    Төлбөрийн мэдээлэл
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Багц:</span>
                      <span className="text-white">VIP Гишүүнчлэл</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Дуусах хугацаа:</span>
                      <span className="text-white">2024-12-31</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Автомат төлбөр:</span>
                      <span className="text-green-400">Идэвхтэй</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-3 border-gray-600 text-gray-300">
                    Багц өөрчлөх
                  </Button>
                </div>

                <div className="p-4 bg-black/50 rounded-none">
                  <h4 className="font-bold text-white mb-3">Мэдэгдэл тохиргоо</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-600 bg-gray-800 text-red-600"
                      />
                      <span className="text-gray-300">Шинэ кино мэдэгдэл</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-600 bg-gray-800 text-red-600"
                      />
                      <span className="text-gray-300">Төлбөрийн мэдэгдэл</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-600 bg-gray-800 text-red-600" />
                      <span className="text-gray-300">Маркетингийн мэдэгдэл</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-none">
                  <h4 className="font-bold text-red-400 mb-2">Аюултай бүс</h4>
                  <p className="text-sm text-red-300 mb-3">
                    Бүртгэл устгах нь таны бүх мэдээлэл, үзсэн түүх болон дуртай кинонуудыг бүрмөсөн устгана.
                  </p>
                  <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Бүртгэл устгах
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
