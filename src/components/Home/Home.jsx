import { Outlet } from "react-router-dom";
import MetalNav from "./MetalNav/MetalNav";

function Home() {
  return (
    <>
      <MetalNav />
      <Outlet />   {/* This renders GoldCalc, SilverCalc, PlatinumCalc, DiamondCalc */}
    </>
  );
}

export default Home;
