"use client";

import { PlayerItem } from "@/stores/game/type";
import { useUserStore } from "@/stores/user";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
  });
  const { setUser } = useUserStore();

  // Open socket connection on component mount
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const player: PlayerItem = {
        name: formData.name,
        role: formData.role,
      };
      localStorage.setItem("player", JSON.stringify(player));
      setUser(player);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const storedPlayer = localStorage.getItem("player");
    if (storedPlayer) {
      const player: PlayerItem = JSON.parse(storedPlayer);
      setUser(player);
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center w-screen h-screen justify-center"
      style={{
        backgroundImage: "url('/bg-home.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="p-10 gap-4 bg-white rounded-xl grid-cols-2 grid max-sm:grid-cols-1">
        <div className="w-full h-full max-sm:hidden">
          {/* <DotLottieReact
              src="/home.lottie"
              loop
              autoplay
              width={100}
              height={100}
              layout={{
                fit: "contain",
              }}
            /> */}
        </div>
        <div className="flex flex-col justify-center items-center gap-10 p-4 min-w-xs">
          <Image
            src={"/planet-c.svg"}
            alt="Logo planet C"
            width={100}
            height={100}
          />
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="focus:outline-none border-b p-2 border-gray-300 w-full focus:border-primary transition-all"
            />
            <select
              className="focus:outline-none border-b p-2 border-gray-300 w-full focus:border-primary transition-all"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              value={formData.role}
              required
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="harvester">Harvester</option>
              <option value="parkManager">Park Manager</option>
            </select>
            <button className="bg-primary text-white rounded-md p-2 hover:bg-orange-500 cursor-pointer transition-all">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
