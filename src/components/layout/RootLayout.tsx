import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <div className='bg-white dark:bg-black'>
      <Navbar />
      <main className="max-w-7xl min-h-[38rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster duration={5000} position="bottom-right" expand={true} richColors theme='dark' />
    </div>
  );
};

export default RootLayout;