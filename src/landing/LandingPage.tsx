import PageBackground from "./PageBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import CoachPhotoRail from "./sections/CoachPhotoRail";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Cta from "./sections/Cta";
import Footer from "./sections/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-svh antialiased text-zinc-100">
      <PageBackground />
      <div className="relative z-10">
        <Hero />
        <div className="relative">
          <About />
          <CoachPhotoRail />
          <Services />
          <Testimonials />
          <Cta />
          <Footer />
        </div>
      </div>
    </div>
  );
}
