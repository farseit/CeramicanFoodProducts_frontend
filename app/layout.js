import WhatsApp from "@/components/Whatsapp/WhatsApp";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WhatsApp />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
