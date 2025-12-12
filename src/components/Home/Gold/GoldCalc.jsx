import { useEffect, useState } from "react";

const Metal_API = import.meta.env.VITE_METAL_API;

function GoldCalc() {
  const [baseGoldRate, setBaseGoldRate] = useState(null);
  const [purity, setPurity] = useState("");
  const [weight, setWeight] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [apiError, setApiError] = useState(null);

  // 1️⃣ Fetch Gold Rate (Daily Cached)
  useEffect(() => {
    async function getGoldRate() {
      try {
        setApiError(null);

        // === CHECK LOCAL STORAGE ===
        const savedData = localStorage.getItem("gold_rate_cache");

        if (savedData) {
          const parsed = JSON.parse(savedData);
          const today = new Date().toDateString();

          if (parsed.date === today) {
            
            setBaseGoldRate(parsed.gramRate);
            return;
          }
        }



        // === API CALL ===
        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=${Metal_API}&base=INR&currencies=XAU`
        );

        const data = await res.json();

        if (!data.success) {
          setApiError({
            code: data.error.statusCode,
            message: data.error.message,
          });
          return;
        }

        // Convert ounce → gram price
        const ounceRate = data.rates.INRXAU;
        const gramRate = (ounceRate / 31.1035).toFixed(2);

        setBaseGoldRate(gramRate);

        // === SAVE IN LOCAL STORAGE ===
        localStorage.setItem(
          "gold_rate_cache",
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

    getGoldRate();
  }, []);

  // 2️⃣ Calculate Gold Price
  function rateCalculate(e) {
    e.preventDefault();

    if (!purity || !weight || !baseGoldRate) return;

    const purityPercent = purity / 1000;
    const pureGoldPrice = baseGoldRate * purityPercent * weight;

    setFinalPrice(pureGoldPrice.toFixed(2));
  }

  return (
    <div className="flex justify-center items-center h-[60vh] sm:h-[70vh]">
      <div className="w-4/5 mx-auto bg-[#ffb347] border-2 rounded-xl shadow-md sm:w-3/5">
        <h2 className="p-2 text-center text-sm font-bold sm:text-2xl sm:p-4">
          Gold Calculator
        </h2>

        <form
          className="w-4/5 mx-auto flex flex-col items-start gap-4 px-2 py-4 text-sm sm:text-lg"
          onSubmit={rateCalculate}
        >
          {apiError && (
            <p className="text-black text-sm font-semibold">
              Error ({apiError.code}): {apiError.message}
            </p>
          )}

          {/* PURITY */}
          <div className="flex flex-row items-center w-full ">
            <label htmlFor="purity" className="font-semibold mb-1">Purity:</label>
            <select
              className="w-full p-1 ml-1 rounded-lg border border-gray-400"
              id="purity"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            >
              <option value="" disabled hidden>
                --Select Purity--
              </option>
              <option value="999">24K (999)</option>
              <option value="995">24K (995)</option>
              <option value="916">22K</option>
              <option value="875">21K</option>
              <option value="750">18K</option>
              <option value="585">14K</option>
            </select>
          </div>

          {/* WEIGHT */}
          <div className="flex flex-row items-center w-full">
            <label className="font-semibold mb-1 whitespace-nowrap" htmlFor="weight">
              Weight (gm):
            </label>
            <input
              id="weight"
              type="number"
              className="w-full p-1 ml-1 rounded-lg border border-gray-400 outline-none"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="p-2 font-semibold border-2 bg-blue-600 text-white rounded-xl border-gray-800 w-3/5 mx-auto hover:bg-blue-400 hover:text-black cursor-pointer sm:text-xl"
          >
            Calculate
          </button>

          {/* RESULT */}
          <div className="flex flex-row items-center w-full ">
            <p className="font-semibold w-38 whitespace-nowrap" >Approx. Price:</p>
            <p  className="w-full p-1 rounded-lg border border-gray-400">
              ₹ {finalPrice}
            </p>
          </div>

          {/* BASE RATE */}
          <p className="text-xs">
            Base Gold Rate:{" "}
            {baseGoldRate ? `₹ ${baseGoldRate}/gm` : "Loading..."}
          </p>
        </form>
      </div>
    </div>
  );
}

export default GoldCalc;
