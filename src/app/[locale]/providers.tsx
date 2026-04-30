"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";

// 亮色主题配置
const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#4a6cf7",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f5f5",
    colorText: "#000000",
    colorTextSecondary: "#666666",
    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#f0f0f0",
  },
};

// 暗色主题配置
const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#4a6cf7",
    colorBgContainer: "#1f1f1f",
    colorBgLayout: "#000000",
    colorText: "#ffffff",
    colorTextSecondary: "#a6a6a6",
    colorBorder: "#434343",
    colorBorderSecondary: "#303030",
  },
};

// 主题配置组件
function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 防止服务端渲染时的主题不匹配
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  const antdTheme = currentTheme === "dark" ? darkTheme : lightTheme;

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <AntdThemeProvider>{children}</AntdThemeProvider>
    </ThemeProvider>
  );
}
