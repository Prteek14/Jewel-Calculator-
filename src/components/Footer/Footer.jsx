function Footer() {
  return (
    <div
      className="text-xs left-0 w-full
                    bg-yellow-500 text-black p-8
                    flex flex-col gap-2 text-justify"
    >
      <p>
        <span className="font-bold">Metal Calculators</span> - Gold, Silver,
        Platinum Estimation.
      </p>

      <p>
        <span className="font-bold">Disclaimer:</span> Rates shown are derived
        from global spot market data and are for estimation purposes only. Final
        prices may vary depending on local market conditions, purity testing,
        taxes, and jeweller charges.
      </p>
    </div>
  );
}

export default Footer;
