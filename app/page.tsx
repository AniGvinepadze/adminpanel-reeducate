import Image from "next/image";
import Dashboard from "./components/Home/Dashboard";

export default function Home() {
  return (
    <div className="max-w-[1440px] w-full m-auto ">
      <Dashboard />
    </div>
  );
}
