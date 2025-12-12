import { useState, useEffect } from "react";

const Metal_API = import.meta.env.VITE_METAL_API;

function SilverCalc() {
  const [baseSilverRate, setSilverRate] = useState(null);
  const [purity, setPurity] = useState("");
  const [weight, setWeight] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [apiError, setApiError] = useState(null);

  // 1️⃣ Fetch Silver Rate (Daily Cached)
  useEffect(() => {
    async function getSilverRate() {
      try {
        const savedData = localStorage.getItem("silver_rate_cache");

        if (savedData) {
          const parsed = JSON.parse(savedData);
          const today = new Date().toDateString();

          if (parsed.date === today) {
            setSilverRate(parsed.gramRate);
            return;
          }
        }


        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=${Metal_API}&base=INR&currencies=XAG`
        );

        const data = await res.json();

        const ounceRate = data.rates.INRXAG; // Silver price per ounce in INR
        const gramRate = (ounceRate / 31.1035).toFixed(2);

        setSilverRate(gramRate);

        // Save in local storage
        localStorage.setItem(
          "silver_rate_cache",
          JSON.stringify({
            gramRate,
            date: new Date().toDateString(),
          })
        );
      } catch (err) {
        setApiError({
          code: err,
          message: "Unable to connect. Please check your connection",
        });
      }
    }

    getSilverRate();
  }, []);

  // 2️⃣ Calculate Silver Price
  function rateCalculate(e) {
    e.preventDefault();

    if (!purity || !weight || !baseSilverRate) return;

    const purityPercent = purity / 1000;
    const pureSilverPrice = baseSilverRate * weight * purityPercent;

    setFinalPrice(pureSilverPrice.toFixed(2));
  }

  return (
    <div className="flex justify-center items-center h-[60vh] sm:h-[70vh]">
      <div className="w-4/5 mx-auto bg-[#e0e0e0] border-2 rounded-xl shadow-md sm:w-3/5">
        <h2 className="p-2 text-center text-sm font-bold sm:text-2xl sm:p-4">
          Silver Calculator
        </h2>

        {/* FORM CONTAINER */}
        <form
          className="w-4/5 mx-auto flex flex-col items-start  gap-4 px-2 py-4 text-sm sm:text-lg mb-4"
          onSubmit={rateCalculate}
        >
          {apiError && (
            <p className="text-black text-sm font-semibold">
              Error ({apiError.code}): {apiError.message}
            </p>
          )}

          {/* PURITY */}
          <div className="flex flex-row items-center w-full ">
            <label htmlFor="purity" className="font-semibold mb-1">
              Purity/Fineness:
            </label>
            <select
              id="purity"
              className="w-full p-1 ml-1 rounded-lg border border-gray-400 outline-none"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            >
              <option value="" disabled hidden>
                --Select Fineness--
              </option>
              <option value="999">99.9% pure</option>
              <option value="925">92.5% pure</option>
              <option value="958">95.8% pure</option>
              <option value="900">90% pure</option>
            </select>
          </div>

          {/* WEIGHT */}
          <div className="flex flex-row items-center w-full ">
            <label
              htmlFor="weight"
              className="font-semibold mb-1 whitespace-nowrap"
            >
              Weight (gm):
            </label>
            <input
              type="number"
              id="weight"
              placeholder="0,00,000"
              className="w-full p-1 ml-1 rounded-lg border border-gray-400 outline-none"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Calculate */}
          <button
            className="p-2 font-semibold border-2 bg-blue-600 text-white rounded-xl border-gray-800 w-3/5 mx-auto hover:bg-blue-400 hover:text-black cursor-pointer sm:text-xl"
            type="submit"
          >
            Calculate
          </button>

          {/* Silver Price */}
          <div className="flex flex-row items-center w-full gap-2">
            <p className="font-semibold mb-1 whitespace-nowrap w-40  ">
              Approx. Price:
            </p>
            <p className="w-full p-1 rounded-lg border border-gray-400 outline-none ">
              ₹ {finalPrice}
            </p>
          </div>

          {/* Base Rate Show */}
          <p className="text-xs mt-1">
            Base Silver Rate:{" "}
            {baseSilverRate ? `₹ ${baseSilverRate}/gm` : "Loading..."}
          </p>
        </form>
      </div>
    </div>
  );
}

export default SilverCalc;
