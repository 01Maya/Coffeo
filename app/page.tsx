'use client';

import Image from 'next/image'
import { ShoppingCart, User, Heart, Menu, ChevronRight, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Users, Star, Package } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Newsteller from '@/components/Newsteller'

export default function Homepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set())
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
      hero: null,
      products: null,
      'special-offers': null,
      process: null,
      packing: null,
      about: null
    })

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const scrollToSection = (sectionId: string) => {
      const sectionElement = sectionsRef.current[sectionId.toLowerCase()]
      if (sectionElement) {
        const yOffset = -60; // Adjust this value based on your header height
        const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setIsMenuOpen(false)
    }

    const toggleLike = (index: number) => {
      setLikedProducts(prev => {
        const newSet = new Set(prev)
        if (newSet.has(index)) {
          newSet.delete(index)
        } else {
          newSet.add(index)
        }
        return newSet
      })
    }

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { threshold: 0.5 }
      )

      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.observe(section)
      })

      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }

      return () => {
        document.body.style.overflow = 'visible'
      }
    }, [isMenuOpen])

    const products = [
      {
        name: 'Honduras El Puente',
        price: '$30',
        image: 'product2.png'
      },
      {
        name: 'Cold Brew Blend',
        price: '$16',
        image: 'product1.png'
      },
      {
        name: 'Signature Latte',
        price: '$12',
        image: 'hero coffee.png'
      },
      {
        name: 'Spice Iceland Blend',
        price: '$25',
        image: 'product3.png'
      },
      {
        name: 'Hair Bender',
        price: '$22',
        image: 'product4.png'
      },
    ]

    return (
      <div className="min-h-screen bg-[#F8F3EF] text-[#4A3728]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee1-CYJH6vE8eDeBPGSDM0ygzhfvSbJGmw.png"
              alt="Coffeo Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold">Coffeo</span>
          </div>
          <div className="hidden md:flex space-x-12">
            {['Products', 'Special offers', 'Process', 'Packing', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className={`hover:text-[#8B5E3C] transition-colors ${activeSection === item.toLowerCase().replace(' ', '-') ? 'text-[#8B5E3C] font-bold' : ''
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex items-center">
              <User className="mr-2 h-4 w-4" />
              Log in / Sign up
            </Button>
            <Button variant="ghost" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-white md:hidden"
            >
              <div className="flex flex-col h-full p-4 overflow-y-auto">
                <div className="flex justify-end mb-4">
                  <Button variant="ghost" onClick={toggleMenu} aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                {['Products', 'Special offers', 'Process', 'Packing', 'About'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="py-3 text-left text-lg font-medium hover:text-[#8B5E3C] transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.div whileTap={{ scale: 0.95 }} className="mt-4">
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" /> Log in / Sign up
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
  <section ref={(el) => { sectionsRef.current['hero'] = el; }} id="hero" className="relative bg-[#F8F3EF] overflow-hidden">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 z-10">
              <h1 className="text-6xl font-bold mb-4 text-[#4A3728]">COFFEO</h1>
              <p className="text-2xl mb-4 text-[#4A3728]">An online coffee store</p>
              <p className="text-xl mb-6 text-[#4A3728]">Straight to your doorstep. We don't roast our beans until we have your order. Freshness is our promise—roasted only when you order. Your perfect cup, delivered with love and bold flavor, every time.</p>
              <Button
                className="bg-[#8B5E3C] hover:bg-[#6F4E32] text-white transition-colors"
                onClick={() => scrollToSection('products')}
              >
                Explore our products
              </Button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <Image
                src="/hero coffee.png"
                alt="Artistic latte with intricate leaf pattern latte art surrounded by coffee beans"
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-[#4A3728] text-white py-4">
            <div className="container mx-auto px-4 flex justify-around">
              <div className="text-center">
                <p className="text-2xl font-bold">+1000</p>
                <p>Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">+340k</p>
                <p>Happy clients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">+340k</p>
                <p>Order everyday</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
  <section ref={(el) => { sectionsRef.current['products'] = el; }} id="products" className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Explore the recent products</h2>
            <p className="text-neutral-600 mb-10 text-center">
              Our delectable drink options, including classic espresso choices, house specialties, cold brewed and frozen treats.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-square bg-[#F8F3EF] rounded-xl mb-4 p-6 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={250}
                      height={250}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-neutral-600 mb-2">{product.price}</p>
                  <div className="flex items-center justify-between">
                    <button className="text-[#4A3728] font-medium flex items-center hover:underline">
                      Add to cart <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button
                      className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      onClick={() => toggleLike(index)}
                      aria-label={likedProducts.has(index) ? "Unlike" : "Like"}
                    >
                      <Heart className={`w-4 h-4 ${likedProducts.has(index) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section
          ref={(el) => { sectionsRef.current['special-offers'] = el; }}
          id="special-offers"
          className="bg-[#F1E8E0] p-8 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Weekend Special Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'French Press',
                image: 'ws1.png',
                originalPrice: 45,
                salePrice: 36
              },
              {
                name: 'Coffeo Cup',
                image: 'pack.png',
                originalPrice: 12,
                salePrice: 9.60
              },
              {
                name: 'Moka Pot',
                image: 'ws2.png',
                originalPrice: 35,
                salePrice: 28
              }
            ].map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative">
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                  20% OFF
                </div>
                <div className="relative pt-[100%] mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="absolute top-0 left-0 rounded hover:opacity-90 transition-opacity duration-300 object-contain p-4"
                  />
                </div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="mb-2">
                  <span className="line-through mr-2">${product.originalPrice}</span>
                  <span className="text-red-500 font-bold">${product.salePrice}</span>
                </p>
                <Button variant="outline" className="w-full hover:bg-[#8B5E3C] hover:text-white transition-colors">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section
          ref={(el) => { sectionsRef.current['process'] = el; }}
          id="process"
          className="p-6 md:p-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Selection', 'Roasting', 'Packaging'].map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
              >
                {/* Icon for each step */}
                <div className="mb-4">
                  {step === 'Selection' && (
                    <span className="inline-block bg-[#FDF5F3] rounded-full p-3 shadow">
                      <Star className="w-10 h-10 text-[#8B5E3C]" />
                    </span>
                  )}
                  {step === 'Roasting' && (
                    <span className="inline-block bg-[#FDF5F3] rounded-full p-3 shadow">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C12 2 7 7 7 12a5 5 0 0 0 10 0c0-5-5-10-5-10z"/><path d="M12 22v-4"/></svg>
                    </span>
                  )}
                  {step === 'Packaging' && (
                    <span className="inline-block bg-[#FDF5F3] rounded-full p-3 shadow">
                      <Package className="w-10 h-10 text-[#8B5E3C]" />
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4">{step}</h3>
                {step === 'Selection' && (
                  <p className="text-gray-600 text-center">
                    Only the finest beans make the cut—handpicked from the best farms to
                    bring you a taste that's pure and unforgettable.
                  </p>
                )}
                {step === 'Roasting' && (
                  <p className="text-gray-600 text-center">
                    Perfectly roasted to unlock rich aromas and bold flavors, each batch
                    is crafted to elevate your coffee experience.
                  </p>
                )}
                {step === 'Packaging' && (
                  <p className="text-gray-600 text-center">
                    Sealed for freshness, our eco-friendly packaging ensures every sip
                    tastes as vibrant as the day it was roasted.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* About Section */}
  <section ref={(el) => { sectionsRef.current['about'] = el; }} id="about" className="bg-[#8B4513]/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#8B4513] mb-12">
              We care about quality
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Active Community',
                  description: 'Join our passionate coffee community and share your love for coffee.'
                },
                {
                  icon: Star,
                  title: 'Premium Quality',
                  description: 'We source only the finest coffee beans from sustainable farms.'
                },
                {
                  icon: Package,
                  title: 'Best Product Design',
                  description: 'Carefully designed packaging to preserve freshness and flavor.'
                }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-[#FAF3E8] rounded-xl shadow-lg"
                >
                  <div className="inline-block p-4 bg-[#8B4513]/10 rounded-full mb-4">
                    <item.icon className="w-8 h-8 text-[#8B4513]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5C2E0E]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packing Section */}
  <section ref={(el) => { sectionsRef.current['packing'] = el; }} id="packing" className="bg-[#F1E8E0] p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Our Packaging</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                src="pack.png"
                alt="Coffeo Packaging"
                width={400}
                height={400}
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-bold mb-4">Eco-Friendly Packaging</h3>
              <p className="mb-4">Our packaging keeps your coffee fresh while being eco-friendly. Made from recyclable materials and carefully sealed, it locks in aroma and flavor, ensuring every cup tastes as vibrant as the day it was roasted. Sustainable, convenient, and designed with care, it’s freshness you can feel good about.</p>
              <Button className="bg-[#8B5E3C] hover:bg-[#6F4E32] text-white transition-colors">
                Learn More
              </Button>
            </div>
          </div>
        </section>

  <Newsteller />

        {/* Footer */}
        <footer className="bg-[#4A3728] text-[#F8F3EF] px-8 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-[#F8F3EF]">Privacy</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Cookies</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-[#F8F3EF]">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Delivery</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">How to order</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Menu</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-[#F8F3EF]">About us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Work location</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Our story</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Our entry</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-[#F8F3EF]">Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Press & media</a></li>
                <li><a href="#" className="hover:text-[#8B5E3C] transition-colors">Sell your product</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-[#F8F3EF]">Social media</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#8B5E3C] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#8B5E3C] text-sm">
            <div className="flex flex-wrap justify-center items-center">
              <div>
                <p>Copyright © 2024 Coffeo</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
}
