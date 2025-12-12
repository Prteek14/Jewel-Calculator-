import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Home from "./components/Home/Home";
import MetalChart from "./components/MetalChart/MetalChart";
import MetalRate from "./components/MetalRate/MetalRate";
import Images from "./components/Images/Images";
import GoldCalc from "./components/Home/Gold/GoldCalc";
import SilverCalc from "./components/Home/Silver/SilverCalc";
import PlatinumCalc from "./components/Home/Platinum/PlatinumCalc";

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path="/" element={<App />}>

      {/* DEFAULT HOME PAGE */}
      <Route path="/" element={<Home />}>
        <Route index element={<GoldCalc/>}></Route>
      </Route>

      {/* HOME PAGE WITH NESTED ROUTES */}
      <Route path="/Home" element={<Home />}>
        <Route index element={<GoldCalc />} />
        <Route path="Silver" element={<SilverCalc />} />
        <Route path="Platinum" element={<PlatinumCalc />} />

      </Route>

      {/* OTHER PAGES */}
      <Route path="MetalChart" element={<MetalChart />} />
      <Route path="MetalRate" element={<MetalRate />} />
      <Route path="Images" element={<Images />} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
