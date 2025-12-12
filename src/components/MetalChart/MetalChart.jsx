import { useState } from "react";

function MetalChart() {
  // Fetch gold rate from today’s cache
  const [goldRate] = useState(() => {
    const gold = JSON.parse(localStorage.getItem("gold_rate_cache"));
    return gold?.gramRate || null;
  });

  const [silverRate] = useState(() => {
    const silver = JSON.parse(localStorage.getItem("silver_rate_cache"));
    return silver?.gramRate || null;
  });

  const [platinumRate] = useState(() => {
    const platinum = JSON.parse(localStorage.getItem("platinum_rate_cache"));
    return platinum?.gramRate || null;
  });

  const calc = (rate, grams) =>
    rate ? (rate * grams).toFixed(2) : "00.00";

  return (
    <div className="mt-32 mb-3">
      <h2 className="font-serif font-extrabold text-4xl text-center m-4">
        Metal Charts
      </h2>

      {/* GOLD */}
      <div className="mx-auto mb-4">
        <table className="w-3/5 mx-auto border border-gray-400 border-collapse text-left rounded-lg shadow">
          <caption className="caption-top font-serif text-xl text-start py-2">
            GOLD PRICE :
          </caption>
          <thead className="bg-yellow-400 border-b border-gray-600">
            <tr>
              <th className="border border-gray-600 px-4 py-2">Quantity</th>
              <th className="border border-gray-600 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">1gm</td><td className="border px-4 py-2">{calc(goldRate, 1)}</td></tr>
            <tr><td className="border px-4 py-2">10gm</td><td className="border px-4 py-2">{calc(goldRate, 10)}</td></tr>
            <tr><td className="border px-4 py-2">100gm</td><td className="border px-4 py-2">{calc(goldRate, 100)}</td></tr>
            <tr><td className="border px-4 py-2">1kg</td><td className="border px-4 py-2">{calc(goldRate, 1000)}</td></tr>
          </tbody>
        </table>
      </div>

      {/* SILVER */}
      <div className="mx-auto mb-4">
        <table className="w-3/5 mx-auto border border-gray-400 border-collapse text-left rounded-lg shadow">
          <caption className="caption-top font-serif text-xl text-start py-2">
            SILVER PRICE :
          </caption>
          <thead className="bg-[#C0C0C0] border-b border-gray-600">
            <tr>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">1gm</td><td className="border px-4 py-2">{calc(silverRate, 1)}</td></tr>
            <tr><td className="border px-4 py-2">10gm</td><td className="border px-4 py-2">{calc(silverRate, 10)}</td></tr>
            <tr><td className="border px-4 py-2">100gm</td><td className="border px-4 py-2">{calc(silverRate, 100)}</td></tr>
            <tr><td className="border px-4 py-2">1kg</td><td className="border px-4 py-2">{calc(silverRate, 1000)}</td></tr>
          </tbody>
        </table>
      </div>

      {/* PLATINUM */}
      <div className="mx-auto mb-4">
        <table className="w-3/5 mx-auto border border-gray-400 border-collapse text-left rounded-lg shadow">
          <caption className="caption-top font-serif text-xl text-start py-2">
            PLATINUM PRICE :
          </caption>
          <thead className="bg-[#E5E4E2] border-b border-gray-600">
            <tr>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">1gm</td><td className="border px-4 py-2">{calc(platinumRate, 1)}</td></tr>
            <tr><td className="border px-4 py-2">10gm</td><td className="border px-4 py-2">{calc(platinumRate, 10)}</td></tr>
            <tr><td className="border px-4 py-2">100gm</td><td className="border px-4 py-2">{calc(platinumRate, 100)}</td></tr>
            <tr><td className="border px-4 py-2">1kg</td><td className="border px-4 py-2">{calc(platinumRate, 1000)}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MetalChart;
