import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast"

export class useCartService {
    #itemStore = useCartStore(state => state.itemStore)
    reset = useCartStore(state => state.reset)
    addItem = useCartStore(state => state.addItem)
    removeItem = useCartStore(state => state.removeItem)
    incItem = useCartStore(state => state.incItem)
    decItem = useCartStore(state => state.decItem)
    resetItemStore = useCartStore(state => state.resetItemStore)

    #favStore = useCartStore(state => state.favStore)    
    addItemToFav = useCartStore(state => state.addItemToFav)
    removeItemFromFav = useCartStore(state => state.removeItemFromFav)

    setCartItem(item: Product){
        const isExisting = this.#itemStore.find((f: Product) => (
            f.title === item.title &&
            f.category === item.category &&
            f.size === item.size &&
            f.color === item.color &&
            f.price === item.price
        ))
        if(isExisting){
            toast.error('This shirt with same size and color already add to cart.')
        }else{       
            this.addItem(item)
            toast.success('Add product to cart.')
        }
    }
    removeItemInCart(index: number){
        this.removeItem(index)
    }
    incItemQuantity(index: number){
        this.incItem(index)
    }
    decItemQuantity(index: number){
        this.decItem(index)
    }
    resetItemInCart(){
        this.resetItemStore()
    }
    addItemToFavCart(item: Product){
        this.addItemToFav(item)
    }
    removeItemToFavCart(index: number){
        this.removeItemFromFav(index)
    }

    get itemStore(){
        return this.#itemStore
    }
    get numberItemInCart(){
        return this.#itemStore.length
    }
    get sumOfEachItemPrice(){
        return this.#itemStore?.map((m: Product) => m.price * m.quantity)
    }
    get subtotal(){
            let total = 0
            this.sumOfEachItemPrice?.map((m: number) => {
                total += m
            })
            return total
    }
    get favStore(){
        return this.#favStore
    }

    setTotalPrice(price:number, quantity: number){
        return price * quantity
    }
    setItemInFavStore(item: Product){
        const isExisting = this.#favStore.find( (f: Product) => f.id === item.id)
        if(isExisting){
            this.removeItemFromFav(item.id)
        }else{
            this.addItemToFav(item)
        }
    }
}

