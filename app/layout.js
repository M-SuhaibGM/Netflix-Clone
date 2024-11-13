


import { ChakraProvider } from "@chakra-ui/react";



export const metadata = {
  title: "NETFLIX",
  description: "WATCH HINDEE MOVEES ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <ChakraProvider>
          {children}
        </ChakraProvider>

      </body>
    </html>
  );
}
