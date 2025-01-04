import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

const RootLayout = () => {
  return (
    <div className='bg-white dark:bg-black'>
      <Navbar />
      <main className="max-w-7xl min-h-[90vh] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;