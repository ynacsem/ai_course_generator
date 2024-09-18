import Image from "next/image";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
export default function Home() {
  return (
    <div className="custom-bg h-screen">
      <Nav />
      <Hero />
    </div>
  );
}
