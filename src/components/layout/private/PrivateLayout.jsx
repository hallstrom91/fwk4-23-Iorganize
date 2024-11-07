import Navbar from "@navbar/Navbar";
import Footer from "@footer/Footer";

export default function PrivateLayout({ children }) {
  return (
    <>
      <div>
        <header></header>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
