import Navbar from "@navbar/Navbar";
import Footer from "@footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <div>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
