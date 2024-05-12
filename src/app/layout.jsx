import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import headerStyles from "./header.module.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Munggit",
  description: "Mung Community Blog!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ overflowX: "hidden" }}>
        <header
          className={headerStyles.header}
          style={{
            position: "fixed",
            top: 0,
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ffffff",
            width: "100vw",
            borderBottom: "1px solid #41ac3d",
          }}
        >
          <Link href="/">
            <Image
              src="/munggit.png"
              alt="Munggit Logo"
              width={100}
              height={100}
            />
          </Link>
          <h1 style={{ color: "#41ac3d" }}>Munggit</h1>
        </header>
        <nav
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: "200px",
            backgroundColor: "#41ac3d",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/addpost">Add a post</Link>
          <Image
            src="/mung.png"
            alt="Mung (Spike from Mario)"
            width={200}
            height={200}
            style={{ position: "fixed", bottom: 0, left: 0 }}
          />
        </nav>
        <div
          style={{ marginLeft: "220px", marginTop: "140px", padding: "20px" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
