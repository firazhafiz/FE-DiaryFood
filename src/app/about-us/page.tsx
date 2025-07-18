import Link from "next/link";
import AboutUs from "@/components/molecules/AboutUs";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar statis */}
      <nav className="py-2 px-6 w-full shadow-none fixed top-0 left-0 z-30 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-2xl text-[color:var(--custom-orange)]">
              Diary
              <span className="font-bold text-2xl text-gray-800">Food</span>
            </h1>
          </Link>
        </div>
      </nav>
      {/* Hero Header Section */}
      <div className="relative w-full h-[300px] mt-[80px]">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0">
          <Image
            src="/assets/images/image_about_us.jpg"
            alt="About Us Hero"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <div className="w-full max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-2">
              Your Ultimate{" "}
              <span className="text-[var(--custom-orange)]">Recipe</span>{" "}
              Platform
            </h1>
            <p className="text-md max-w-xl mx-auto">
              DiaryFood is a modern recipe platform for food lovers to discover,
              share, and create delicious dishes. We make cooking fun, easy, and
              accessible for everyone.
            </p>
          </div>
        </div>
      </div>
      <main className="bg-gray-100 flex-1 w-full pt-8 pb-16 px-2">
        <div className="w-full max-w-4xl mx-auto">
          <AboutUs
            image="/assets/images/image_aboutus.jpg"
            imageAlt="DiaryFood Journey"
            imagePosition="left"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--custom-orange)]">
              Our Journey Since 2025
            </h2>
            <p className="mb-4">
              Founded in 2025, DiaryFood emerged from a simple yet powerful
              vision: to revolutionize how people interact with cooking and
              recipes. What started as a small community of passionate home
              cooks has grown into a vibrant platform that connects food
              enthusiasts from all walks of life.
            </p>
            <p>
              Our platform combines cutting-edge AI technology with the warmth
              of community sharing. We've helped thousands of users discover
              their passion for cooking, from complete beginners to seasoned
              chefs. Through our innovative features like smart recipe
              suggestions, ingredient substitutions, and step-by-step cooking
              guides, we've made cooking more accessible and enjoyable for
              everyone.
            </p>
          </AboutUs>
          <AboutUs
            image="/assets/images/image_aboutus2.jpg"
            imageAlt="DiaryFood Community"
            imagePosition="right"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--custom-orange)]">
              Our Community & Vision
            </h2>
            <p className="mb-4">
              At DiaryFood, we believe that cooking is more than just following
              recipes—it's about creating memories, sharing experiences, and
              building connections. Our community of food lovers continues to
              grow, sharing unique recipes and culinary traditions from around
              the world.
            </p>
            <p className="mb-4">
              We're committed to innovation and continuous improvement, always
              working to enhance your cooking experience with new features and
              technologies that make recipe creation and sharing even more
              exciting.
            </p>
            <p className="mt-4">
              For questions, suggestions, or collaboration, please visit our{" "}
              <a href="/contact" className="text-[color:var(--custom-orange)]">
                Contact
              </a>{" "}
              page.
            </p>
          </AboutUs>
        </div>
      </main>
      {/* Footer statis */}
      <footer className="bg-white text-gray-600 py-6 text-center border-t mt-8">
        &copy; {new Date().getFullYear()} Diary Food. All rights reserved.
      </footer>
    </div>
  );
}
