const UkraineDonationBanner = () => {
  return (
    <div className="bg-[#0057B7] text-white text-sm">
      <div className="container mx-auto px-4 py-2 text-center">
        <span className="opacity-90 sm:hidden">Stand with Ukraine. Donate via</span>
        <span className="opacity-90 hidden sm:inline">
          While we code, Ukrainians are fighting for our freedom. Please consider donating:
        </span>{" "}
        <a
          href="https://u24.gov.ua/donate"
          className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          United24 🇺🇦
        </a>{" "}
        <span className="opacity-90 hidden sm:inline">Героям слава!</span>
      </div>
    </div>
  );
};

export default UkraineDonationBanner;
