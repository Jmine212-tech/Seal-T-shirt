import React, { useState } from 'react'
import { Heart, ShoppingBag, Check } from "lucide-react"
import { useCartService } from '../Services/useCartService'
import toast from 'react-hot-toast'

interface Product {
  id: string
  title: string
  img: string
  category: string
  price: number
  existSize: string[]
  existColor: string[]
}

// Fallback color mapping for reliable rendering without Tailwind dynamic class purge issues
const COLOR_MAP: Record<string, string> = {
  black: 'bg-neutral-900',
  white: 'bg-white',
  gray: 'bg-neutral-500',
  stone: 'bg-stone-400',
  red: 'bg-rose-600',
  blue: 'bg-blue-600',
  navy: 'bg-slate-900',
  olive: 'bg-emerald-900',
}

function Card({ props }: {props: Product}) {
  const CART = new useCartService()

  // Only keep state for interactive user selections
  const [selectedSize, setSelectedSize] = useState<string>(props?.existSize?.[0] ?? '')
  const [selectedColor, setSelectedColor] = useState<string>(props?.existColor?.[0] ?? '')

  const handleAddCart = () => {
    if (!props?.id || !props?.title || !selectedSize || !selectedColor) {
      toast.error('Please select both a size and color.')
      return
    }

    CART.setCartItem({
      id: props.id,
      title: props.title,
      img: props.img,
      category: props.category,
      price: props.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    })
  }

  const handleSetItemInFavStore = () => {
    CART.setItemInFavStore({
      id: props.id,
      title: props.title,
      img: props.img,
      category: props.category,
      price: props.price,
      selectedSize,
      selectedColor,
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-sky-100 text-neutral-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-2xl">
      {/* Image Preview & Badges */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-900">
        <img
          src={props.img}
          alt={props.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleSetItemInFavStore}
          aria-label="Save to favorites"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-neutral-950/60 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              CART.favStore?.find( (f: Product) => f.id === props.id) ? 'fill-rose-500 text-rose-500' : 'text-neutral-200'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAddCart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/80 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow-lg backdrop-blur transition hover:bg-white active:scale-98"
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content & Selectors */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Title */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {props.category}
            </p>
            <h3 className="mt-1 line-clamp-1 text-base font-bold text-black">
              {props.title}
            </h3>
          </div>
          <p className="text-base font-extrabold text-black">
            ${props.price.toFixed(2)}
          </p>
        </div>

        {/* Size Selection */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500">Size</span>
          <div className="flex gap-1.5">
            {props.existSize?.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedSize(item)}
                className={`min-w-7 rounded-md px-2 py-1 text-xs font-semibold uppercase transition-all ${
                  selectedSize === item
                    ? 'bg-neutral-100 text-neutral-900 shadow-sm'
                    : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500">Color</span>
          <div className="flex items-center gap-2">
            {props.existColor?.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedColor(item)}
                title={item}
                className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-transform ${
                  selectedColor === item
                    ? 'scale-110 border-white ring-2 ring-neutral-400/50'
                    : 'border-neutral-700 hover:scale-105'
                } ${COLOR_MAP[item.toLowerCase()] ?? 'bg-neutral-700'}`}
              >
                {selectedColor === item && (
                  <Check
                    className={`h-3 w-3 stroke-3 ${
                      item.toLowerCase() === 'white' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card