"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import verifyToken from "../verifyToken";
import theme from "@/components/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import StoreProvider from "@/app/StoreProvider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader/DashboardHeader";
import HandlerProvider from "@/lib/providers/HandlerProvider";
import SideNavBar from "@/components/Dashboard/Sidebar/SideNavBar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await verifyToken();
      console.log("token", token);
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Access Denied!",
          text: "Please log in first.",
          position: "center", // Display alert in the middle
          timer: 3000,
          showConfirmButton: false,
        });
        router.push("/signin"); // Redirect to login if token is invalid
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <html lang="en">
      <body className="bg-[#F0F0F5] dark:bg-[#0f1214]">
        <HandlerProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <StoreProvider>
                <div className="lg:grid lg:grid-cols-12 ">
                  <section className="lg:col-span-2">
                    <SideNavBar />
                  </section>
                  <section className="lg:col-span-10 ">
                    <DashboardHeader />
                    <div className="my-4 md:my-8 md:px-8">{children}</div>
                  </section>
                </div>
              </StoreProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </HandlerProvider>
      </body>
    </html>
  );
}
