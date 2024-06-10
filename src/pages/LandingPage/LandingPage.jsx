import background from "../../assets/images/landing-pic.jpg";

export default function LandingPage() {
  return (
    <div className="h-screen w-full relative">
      <img
        src={background}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        alt="Landing background"
      />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to Just Wear 👕
          </h2>
          <p className="mt-4 text-white/90 leading-relaxed">
            Just focus on being your best.
          </p>
        </div>
      </div>
    </div>
  );
}
