import React from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartService } from "../Services/useCartService";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartProps {
  opCart: boolean;
  setOpCart: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cart({props}: {props: CartProps}) {
  const {opCart, setOpCart} = props
  const CART = new useCartService();
  const navigate = useNavigate();

  const handleClose = () => setOpCart(false);

  const handleDecQuantity = (index: number) => {
    CART.decItemQuantity(index);
  };

  const handleIncItem = (index: number) => {
    CART.incItemQuantity(index);
  };

  const handleDelItem = (index: number) => {
    CART.removeItemInCart(index);
  };

  const handleItemDetail = (item: Product) => {
    handleClose();
    navigate(`/productDetail/${item.id}`, { state: { item } });
  };

  const items: Product[] = CART.itemStore || [];
  const itemCount = CART.numberItemInCart || 0;
  const subtotal = CART.subtotal || 0;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        opCart ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-blue-50 shadow-2xl border-l border-neutral-800 transition-transform duration-300 ease-out ${
          opCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold tracking-tight uppercase">
              Your Bag
            </h2>
            <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-neutral-400">
              {itemCount}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div>
              <p className="text-base font-semibold">Your cart is empty</p>
              <p className="mt-1 text-sm text-neutral-400">
                Explore our streetwear arrivals and gear up.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-900">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 py-4 group">
                {/* Product Thumbnail */}
                <div
                  onClick={() => handleItemDetail(item)}
                  className="relative h-24 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => handleItemDetail(item)}
                        className="cursor-pointer text-sm font-semibold transition hover:text-neutral-500 line-clamp-1"
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Variant tags */}
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                      {item.size && (
                        <span className="rounded bg-neutral-900 px-1.5 py-0.5 border border-neutral-800 uppercase">
                          Size {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="rounded bg-neutral-900 px-1.5 py-0.5 border border-neutral-800 capitalize">
                          {item.color}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Controls: Stepper & Remove */}
                  <div className="mt-3 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="inline-flex items-center rounded-lg border border-neutral-800 bg-neutral-900">
                      <button
                        onClick={() => handleDecQuantity(index)}
                        disabled={item.quantity <= 1}
                        className="flex h-7 w-7 items-center justify-center text-neutral-400 transition hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-neutral-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncItem(index)}
                        className="flex h-7 w-7 items-center justify-center text-neutral-400 transition hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelItem(index)}
                      className="p-1.5 text-neutral-500 transition-colors hover:text-rose-400"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-neutral-800/80 bg-sky-950 p-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Shipping</span>
                <span className="text-neutral-500">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-900">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                handleClose();
                navigate("/checkout");
              }}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-neutral-200 active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;