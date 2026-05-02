const UkraineDonationBanner = () => {
  return (
    <div className="border-b border-transparent bg-[#0057B7] text-white">
      <div className="container mx-auto py-2 px-4 text-center">
        While we code, Ukrainians are fighting for our freedom. Please consider donating:{" "}
        <a
          href="https://u24.gov.ua/donate"
          className="underline font-semibold hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          United24 🇺🇦
        </a>
        {" Героям слава!"}
      </div>
    </div>
  );
};

export default UkraineDonationBanner;