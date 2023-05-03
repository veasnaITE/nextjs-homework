import Navbar from "./navbar";
import Footer from "./footer";


 const Layout = ({children})=>{
    return(
        <>
        <Navbar />
        <main className="bg-tertiary-rgb">{children}</main>
        <Footer />
        </>
    )
}
export default Layout;