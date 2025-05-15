import Image from "next/image";
import HomePage from "./components/HomePage/HomePage";

export default function Home() {
  return (
    <div className="max-w-[1440px] w-full m-auto p-5">
      <div>
        <HomePage/>
      </div>
    </div>
  );
}
