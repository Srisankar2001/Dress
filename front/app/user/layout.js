import { Navbar } from "./component/navbar/Navbar";
import "./layout.css"
export default function RootLayout({ children }) {
  return (
      <div className="layout-container">
        <Navbar/>
          <main>{children}</main>
      </div>
  );
}
