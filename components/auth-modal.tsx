"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Facebook,
  Chrome,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Check credentials
    if (loginData.email === "user@gmail.com" && loginData.password === "user123") {
      setIsLoading(false)
      setIsSuccess(true)

      // Create user profile and store in localStorage
      const userProfile = {
        email: loginData.email,
        name: "Хэрэглэгч",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: new Date().toISOString(),
        isLoggedIn: true,
      }

      localStorage.setItem("userProfile", JSON.stringify(userProfile))

      // Reset after 2 seconds and close modal
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setLoginData({ email: "", password: "", rememberMe: false })
        // Trigger page refresh to update header
        window.location.reload()
      }, 2000)
    } else {
      setIsLoading(false)
      alert("И-мэйл эсвэл нууц үг буруу байна!")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      alert("Нууц үг таарахгүй байна")
      return
    }

    if (!registerData.agreeTerms) {
      alert("Үйлчилгээний нөхцлийг зөвшөөрнө үү")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSuccess(true)

    // Reset after 2 seconds
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      })
    }, 2000)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Implement social login logic here
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md w-[95vw] rounded-none">
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Амжилттай!</h3>
            <p className="text-gray-300">
              {activeTab === "login" ? "Амжилттай нэвтэрлээ" : "Бүртгэл амжилттай үүслээ"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md w-[95vw] max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-500 text-center tracking-wide">BYTECRAFT HUB</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-red-600">
              НЭВТРЭХ
            </TabsTrigger>
            <TabsTrigger value="register" className="text-white data-[state=active]:bg-red-600">
              БҮРТГҮҮЛЭХ
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-6 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">И-мэйл хаяг</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="example@email.com"
                    required
                    className="pl-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Нууц үг</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Нууц үгээ оруулна уу"
                    required
                    className="pl-12 pr-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-gray-300">Намайг санах</span>
                </label>
                <button type="button" className="text-red-500 hover:text-red-400 text-sm">
                  Нууц үг мартсан?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-none font-bold tracking-wide"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    НЭВТЭРЧ БАЙНА...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    НЭВТРЭХ
                  </>
                )}
              </Button>
            </form>

            <Separator className="bg-gray-700" />

            {/* Social Login */}
            <div className="space-y-3">
              <p className="text-center text-gray-400 text-sm">Эсвэл</p>

              <Button
                onClick={() => handleSocialLogin("google")}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 rounded-none"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google-ээр нэвтрэх
              </Button>

              <Button
                onClick={() => handleSocialLogin("facebook")}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 rounded-none"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook-ээр нэвтрэх
              </Button>

              <Button
                onClick={() => handleSocialLogin("phone")}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 rounded-none"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Утасны дугаараар
              </Button>
            </div>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-6 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Нэр</label>
                  <Input
                    type="text"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    placeholder="Нэр"
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Овог</label>
                  <Input
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    placeholder="Овог"
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">И-мэйл хаяг</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="example@email.com"
                    required
                    className="pl-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Утасны дугаар</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    placeholder="+976 99887766"
                    className="pl-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Нууц үг</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="Нууц үг (8+ тэмдэгт)"
                    required
                    minLength={8}
                    className="pl-12 pr-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Нууц үг давтах</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="Нууц үгээ давтана уу"
                    required
                    className="pl-12 pr-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={registerData.agreeTerms}
                    onChange={(e) => setRegisterData({ ...registerData, agreeTerms: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-500 mt-1"
                    required
                  />
                  <span className="text-gray-300 leading-relaxed">
                    Би{" "}
                    <button type="button" className="text-red-500 hover:text-red-400 underline">
                      үйлчилгээний нөхцөл
                    </button>{" "}
                    болон{" "}
                    <button type="button" className="text-red-500 hover:text-red-400 underline">
                      нууцлалын бодлого
                    </button>
                    -той танилцаж, зөвшөөрч байна.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-none font-bold tracking-wide"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    БҮРТГҮҮЛЖ БАЙНА...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    БҮРТГҮҮЛЭХ
                  </>
                )}
              </Button>
            </form>

            <div className="bg-red-900/20 border border-red-500/20 rounded-none p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-300">
                  <p className="font-bold mb-1">АНХААР:</p>
                  <p>
                    Бүртгэл үүсгэсний дараа таны и-мэйл хаяг руу баталгаажуулах холбоос илгээгдэнэ. И-мэйлээ шалгаарай.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
