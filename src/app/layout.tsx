import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import ThemeProvider from "@/theme/index";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import * as React from "react";

const sidebarWidth = 280;

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <AuthProvider>
              <CssBaseline />
              <Box
                sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}
              >
                <Sidebar width={sidebarWidth} />
                <Box
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Header />
                  <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                    {props.children}
                  </Box>
                </Box>
              </Box>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
