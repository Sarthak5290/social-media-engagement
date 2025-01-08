import Image from "next/image";
import DashBoard from "./components/DashBoard";
import Loader from "./components/Loader";

export default function Home() {
  return (
    <div>
      <DashBoard />
     {/* <center><Loader /></center>  */}
    </div>
  );
}
