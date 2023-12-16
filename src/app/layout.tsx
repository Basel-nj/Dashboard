"use client";
import "rsuite/dist/rsuite.min.css";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body>
            <Provider store={store}>{children}</Provider>
         </body>
      </html>
   );
}
