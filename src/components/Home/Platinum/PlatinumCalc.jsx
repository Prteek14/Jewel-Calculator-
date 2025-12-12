import { useState, useEffect } from "react";

const Metal_API = import.meta.env.VITE_METAL_API;

function PlatinumCalc() {
  const [baseRate, setBaseRate] = useState(null);
  const [purity, setPurity] = useState("");
  const [weight, setWeight] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [apiError, setApiError] = useState(null);

  // 🔵 Fetch Platinum Rate (Daily Cached)
  useEffect(() => {
    async function getPlatinumRate() {
      try {
        const savedData = localStorage.getItem("platinum_rate_cache");

        if (savedData) {
          const parsed = JSON.parse(savedData);
          const today = new Date().toDateString();

          // Same-day cache loaded → No API call
          if (parsed.date === today) {
            setBaseRate(parsed.gramRate);
            return;
          }
        }


        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=${Metal_API}&base=INR&currencies=XPT`
        );

        const data = await res.json();

        if (!data.success) {
          return;
        }

        const ounceRate = data.rates.INRXPT; // INR per ounce platinum
        const gramRate = (ounceRate / 31.1035).toFixed(2); // convert ounce → gram

        setBaseRate(gramRate);

        // Save in cache for the day
        localStorage.setItem(
          "platinum_rate_cache",
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

    getPlatinumRate();
  }, []);

  // 🔵 PRICE CALCULATION
  function rateCalculate(e) {
    e.preventDefault();

    if (!purity || !weight) {
      alert("Please enter all fields");
      return;
    }

    if (!baseRate) {
      alert("Platinum rate not loaded");
      return;
    }

    const purityPercent = purity / 1000;
    const total = baseRate * purityPercent * weight;

    setFinalPrice(total.toFixed(2));
  }

  return (
    <div className="flex justify-center items-center h-[60vh] sm:h-[70vh]">
      <div className="w-4/5 mx-auto bg-[#fbfbfb] border-2 rounded-xl shadow-md sm:w-3/5">
        <h2 className="p-2 text-center text-sm font-bold sm:text-2xl sm:p-4">
          Platinum Calculator
        </h2>

        {/* FORM */}
        <form
          className="w-4/5 mx-auto flex flex-col items-start gap-4 px-2 py-4 text-sm sm:text-lg mb-4"
          onSubmit={rateCalculate}
        >

          {apiError && (
            <p className="text-black text-sm font-semibold">
              Error ({apiError.code}): {apiError.message}
            </p>
          )}

          {/* PURITY */}
          <div className="flex flex-row items-center w-full ">
            <label className="font-semibold mb-1" htmlFor="purity">Purity/Fineness:</label>
            <select
              className="w-full p-1 ml-1 rounded-lg border border-gray-400 outline-none"
              value={purity}
              id="purity"
              onChange={(e) => setPurity(e.target.value)}
            >
              <option value="" disabled hidden>
                --Select Purity--
              </option>
              <option value="999">99.9% pure</option>
              <option value="950">95% pure (Common Jewelry)</option>
              <option value="900">90% pure</option>
            </select>
          </div>

          {/* WEIGHT */}
          <div className="flex flex-row items-center w-full " >
            <label className="font-semibold mb-1 whitespace-nowrap" htmlFor="weight">
              Weight (gm):
            </label>
            <input
              id="weight"
              type="number"
              placeholder="0"
              className="w-full p-1 ml-1 rounded-lg border border-gray-400 outline-none"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* CALCULATE */}
          <button
            type="submit"
            className="p-2 font-semibold border-2 bg-blue-600 text-white rounded-xl border-gray-800 w-3/5 mx-auto hover:bg-blue-400 hover:text-black cursor-pointer sm:text-xl"
          >
            Calculate
          </button>

          {/* FINAL PRICE */}
          <div className="flex flex-row items-center w-full gap-2">
            <p className="font-semibold mb-1 whitespace-nowrap w-40">
              Approximate Price:
            </p>
            <p className="w-full p-1 rounded-lg border border-gray-400 outline-none ">
              ₹ {finalPrice}
            </p>
          </div>

          {/* BASE RATE */}
          <p className="text-xs mt-1">
            Base Platinum Rate:{" "}
            {baseRate ? `₹ ${baseRate}/gm` : "Loading..."}
          </p>
        </form>
      </div>
    </div>
  );
}

export default PlatinumCalc;
