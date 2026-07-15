import Home from "@/components/Home/Home";
import Destinations from "@/components/Home/Destinations";
import Membersec from "@/components/Home/Membersec";
import About from "@/components/Home/About";
import Clientsec from "@/components/Home/Clientsec";
import Properties from "@/components/Home/Properties";
import Bannersec from "@/components/Home/Bannersec";
import Getstarted from "@/components/Home/Getstarted";
import Activities from "@/components/Home/Activities";
import Overview from "@/components/Home/Overview";
import Blog from "@/components/Home/Blog";
import Itinerary from "@/components/Home/Itinerary";

function page() {
  return (
    <>
      <Home />
      <About />
      <Overview />
      <Membersec />
      <Properties />
      <Destinations />
      <Getstarted />
      <Itinerary />
      <Bannersec />
      <Clientsec />
      <Activities />
      <Blog />
    </>
  );
}

export default page;
