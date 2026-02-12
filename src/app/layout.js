import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import Navbar from "@/components/Navbar/Navbar";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />   {/* ✅ NOW DEFINED */}
            {children}
             <Toaster position="top-right" reverseOrder={false} />
            <Footer />
          </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
