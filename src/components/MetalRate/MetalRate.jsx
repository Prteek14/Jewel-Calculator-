import { useState } from "react";

function MetalRate() {
  const cities = [
    "Lucknow", "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
    "Hyderabad", "Jaipur", "Bhopal", "Ahmedabad", "Patna",
    "Bhubaneswar", "Ranchi", "Chandigarh", "Thiruvananthapuram",
    "Imphal", "Shillong", "Guwahati", "Aizawl", "Dehradun"
  ];

  // ------------------ BASE RATES (per gram) ------------------
  const goldGram = Number(JSON.parse(localStorage.getItem("gold_rate_cache"))?.gramRate || 0);
  const silverGram = Number(JSON.parse(localStorage.getItem("silver_rate_cache"))?.gramRate || 0);
  const platinumGram = Number(JSON.parse(localStorage.getItem("platinum_rate_cache"))?.gramRate || 0);

  // Convert to usable units
  const goldBase10g = goldGram * 10;
  const silverBase1kg = silverGram * 1000;
  const platinumBase10g = platinumGram * 10;

  // ------------------ INVALID DATA CHECK ------------------
  const isInvalidData = (data) => {
    if (!Array.isArray(data)) return true;

    return data.some(item =>
      item.gold === "0" || item.gold === "0.00" ||
      item.silver === "0" || item.silver === "0.00" ||
      item.platinum === "0" || item.platinum === "0.00"
    );
  };

  // ------------------ GENERATE RATES ------------------
  const [cityRates] = useState(() => {
    const stored = sessionStorage.getItem("metal_city_rates");

    if (stored) {
      const parsed = JSON.parse(stored);

      // check data is valid (not zero or broken)
      if (!isInvalidData(parsed)) {
        return parsed;
      }

      // reset session storage if corrupted
      sessionStorage.removeItem("metal_city_rates");
    }

    // Fluctuation function
    const getFluctuated = (base, minP, maxP) => {
      const percent = Math.random() * (maxP - minP) + minP;
      const up = Math.random() < 0.5;

      const final = up ? base * (1 + percent / 100) : base * (1 - percent / 100);
      return final.toFixed(2);
    };

    // Generate new rates
    const rates = cities.map(city => ({
      city,
      gold: getFluctuated(goldBase10g, 2.5, 3.5),
      silver: getFluctuated(silverBase1kg, 1.5, 2.5),
      platinum: getFluctuated(platinumBase10g, 3, 4),
    }));

    sessionStorage.setItem("metal_city_rates", JSON.stringify(rates));
    return rates;
  });

  return (
    <>
      <h2 className="font-serif text-2xl font-extrabold sm:text-4xl text-center m-4 mt-34 mb-4">
        Metal Rates Across Cities
      </h2>

      <div className="w-full mt-4 overflow-x-scroll scroll-hide mb-3 px-6">
        <table className="min-w-max mx-auto border border-gray-400 border-collapse text-center rounded-lg shadow sm:w-4/5">
          <thead className="border-b border-gray-600">
            <tr>
              <th className="bg-sky-300 border px-4 py-2 font-semibold">City</th>
              <th className="bg-yellow-400 border px-4 py-2 font-semibold">Gold (10g)</th>
              <th className="bg-[#C0C0C0] border px-4 py-2 font-semibold">Silver (1kg)</th>
              <th className="bg-[#E5E4E2] border px-4 py-2 font-semibold">Platinum (10g)</th>
            </tr>
          </thead>

          <tbody>
            {cityRates.map(({ city, gold, silver, platinum }) => (
              <tr key={city} className="bg-white hover:bg-gray-200">
                <td className="bg-blue-200 border px-4 py-2 font-semibold">{city}</td>
                <td className="border px-4 py-2 font-semibold">₹ {gold}</td>
                <td className="border px-4 py-2 font-semibold">₹ {silver}</td>
                <td className="border px-4 py-2 font-semibold">₹ {platinum}</td>
              </tr>
            ))}
          </tbody>

          <caption className="caption-bottom text-xs text-start py-2 sm:hidden">
            Slide right to view full table.
          </caption>
        </table>
      </div>
    </>
  );
}

export default MetalRate;
