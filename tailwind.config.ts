import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            primary1: "#18073B",
            primary2: "#40E1FE",
            gradient1: "#40E1FE",
            gradient2: "#0190FF",
            text: "#908CA5",
            shades1: "#F5F8FF",
            shades2: "#E8EFF9",
         },
         screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
         },
         backgroundImage: {
            "login-background": "linear-gradient(135deg,#40E1FE, #0190FF)",
            "button-gradient": "linear-gradient(-135deg,#40E1FE, #0190FF)",
            "continue-button": "linear-gradient(to left,#40E1FE, #0190FF)",
         },
         boxShadow: {
            custom: "3px 3px 7px -2px rgba(0,0,0,1)",
         },
      },
   },
   plugins: [],
};
export default config;
