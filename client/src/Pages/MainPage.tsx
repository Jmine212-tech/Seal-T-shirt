import WebHero from "../components/WebHero";
import { Leaf, Recycle, Shirt, ShoppingCart } from "lucide-react";
import Card from "../components/Card";
import { NavLink, useOutletContext } from "react-router-dom";
import { useCartService } from "../Services/useCartService";
import { PRODUCTS } from "../lib/data";

interface Props {}

function MainPage(props: Props) {
  const {} = props;
  const CART = new useCartService()
  const {opCart, setOpCart} = useOutletContext()

  const IMG = "T-Shirt-WebHero.jpg";
  const description =
    "Would you like to tailor this hero banner toward a specific vibe—such as minimal/streetwear, vintage/retro, or bold graphic prints—or add specific copy and call-to-action text?";

  const view = 235500;
  const ranging = 4.5;
    const webHeroData = {IMG, description, view, ranging}

  return (
    <div className="h-screen overflow-y-scroll scrollbar-none">
      <div className="bg-orange-800 p-1">
        <p className="Redaction text-center text-white text-lg">
          @Seal T-Shirt shop
        </p>
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm lg:flex md:flex lg:text-xl md:text-lg sm:text-md items-center justify-between text-center mt-2 p-2.5">
        <div className="lg:flex md:flex items-center justify-center lg:w-1/3 md:w-1/3 gap-4 font-semibold">
          <p onClick={() => CART.reset()}>SHOP</p>
          <p>COLLECTIONS</p>
          <p>About</p>
        </div>

        <NavLink to={'/admin'} className="amarante-50-bold-italic lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold border-b border-dotted text-orange-800">Seal</NavLink>

        <div className="lg:flex md:flex items-center justify-center lg:w-1/3 md:w-1/3 gap-4 font-semibold">
          <div>SEARCH</div>
          <div>ACCOUNT</div>
          <button onClick={() => setOpCart(!opCart)} className="hover:cursor-pointer">
            CART{" "}
            <span className="bg-black p-1.5 rounded-full text-center text-white">
              {CART.numberItemInCart}
            </span>
          </button>
        </div>
      </header>

      <main>
        <article className="mt-2">
          {webHeroData && <WebHero props={webHeroData} />}
        </article>

        <article className="flex items-center justify-between px-2 mt-2 gap-1.5">
          <section className="flex-1 p-1.5 tracking-tighter leading-tight">
            <Shirt className="fill-black place-self-center" size={30} />
            <p className="text-center font-bold lg:text-2xl md:text-xl sm:text-lg text-md">Hight Quality</p>
          </section>
          <section className="flex-1 p-1.5 tracking-tighter leading-tight">
            <ShoppingCart className="fill-black place-self-center" size={30} />
            <p className="text-center font-bold lg:text-2xl md:text-xl sm:text-lg text-md">3000+</p>
          </section>
          <section className="flex-1 p-1.5 tracking-tighter leading-tight">
            <Leaf className="fill-black place-self-center" size={30} />
            <p className="text-center font-bold lg:text-2xl md:text-xl sm:text-lg text-md">Nature</p>
          </section>
          <section className="flex-1 p-1.5 tracking-tighter leading-tight">
            <Recycle className="fill-black place-self-center" size={30} />
            <p className="text-center font-bold lg:text-2xl md:text-xl sm:text-lg text-md">Recycle</p>
          </section>
        </article>

        <article className="mt-2 gap-2 px-2 grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {PRODUCTS.length > 0 && PRODUCTS.map((item, index) => (
          <Card key={index} props={item} />
          ))}
        </article>
      </main>

      <footer className="mt-2 bg-orange-950 min-h-40 text-white p-2">
        <h1 className="amarante-50-bold-italic text-center text-4xl">@Seal T-Shirt Shop</h1>
      </footer>
    </div>
  );
}

export default MainPage;
