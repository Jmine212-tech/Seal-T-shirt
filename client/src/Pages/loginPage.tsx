import { Check } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserService } from "../Services/useUserService";

interface Props {}

function LoginPage(props: Props) {
  const {} = props;
  const USER = new useUserService()

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  const [toggleForm, setToggleForm] = useState<string>('login');

  const navigate = useNavigate()

  const handleLogin = () => {
    USER.login(email, password)
    navigate('/', {replace: true})
  }

  const handleRegister = () => {
    const info = {name, email, password}
    USER.register(info)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-sky-200">
      <div className="group overflow-hidden lg:w-2/4 w-3/4 h-3/4 lg:flex flex-row-reverse shadow-xl shadow-sky-950 inset-shadow-sm backdrop-brightness-90 rounded-xl">
        <div className="lg:flex-1/2 lg:flex hidden overflow-hidden">
          <img
            src="shirt_black_sealLogo.jpg"
            className="object-center object-cover group-hover:scale-110 transition-transform"
            alt=""
          />
        </div>

        <main className="lg:flex-1/2 h-full flex-1 p-1.5 flex items-center justify-center relative">
          <NavLink to={'/'} className="absolute bottom-5 left-5 text-red-700 hover:cursor-pointer">Home</NavLink>
          {toggleForm === 'login' && <article className="">
            <section className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com..."
                className="px-2 py-1 block ring ring-indigo-600 hover:ring-rose-600 rounded-xl"
              />
              <input
                type={view ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password..."
                className="px-2 py-1 block ring ring-indigo-600 hover:ring-rose-600 rounded-xl"
              />
                <button onClick={handleLogin} className="block ring text-center rounded-xl p-1 font-bold tracking-tighter w-full bg-green-600 hover:cursor-pointer">
                  login
                </button>
              <div className="mt-2 flex items-center justify-between">
                <div className="space-x-1">
                  <button
                    onClick={() => setView(!view)}
                    className="inline hover:cursor-pointer border h-3 w-3"
                  >
                    {view && <Check size={10} />}
                  </button>
                  <span>view password</span>
                </div>
                <button onClick={() => setToggleForm('register')} className="inline text-red-700 hover:border-b hover:cursor-pointer">
                  register?
                </button>
              </div>
            </section>
          </article>}

          {toggleForm === 'register' && <article className="">
            <section className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name..."
                className="px-2 py-1 block ring ring-indigo-600 hover:ring-rose-600 rounded-xl"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com..."
                className="px-2 py-1 block ring ring-indigo-600 hover:ring-rose-600 rounded-xl"
              />
              <input
                type={view ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password..."
                className="px-2 py-1 block ring ring-indigo-600 hover:ring-rose-600 rounded-xl"
              />
              <button onClick={handleRegister} className="block ring text-center rounded-xl p-1 font-bold tracking-tighter w-full bg-green-400 hover:cursor-pointer">
                register
              </button>
              <div className="mt-2">
                <div className="space-x-1">
                  <button
                    onClick={() => setView(!view)}
                    className="hover:cursor-pointer border h-3 w-3"
                  >
                    {view && <Check size={10} />}
                  </button>
                  <span>view password</span>
                </div>
                <button onClick={() => setToggleForm('login')} className="text-red-700 hover:border-b hover:cursor-pointer">
                  already have account?
                </button>
              </div>
            </section>
          </article>}
        </main>
      </div>
    </div>
  );
}

export default LoginPage;
