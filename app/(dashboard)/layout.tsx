import React from "react";

const Layout = ({ children}: {children: React.ReactNode}) => {
    return (
        <>
         <p>Dashboard Navbar</p>
         {children}

        </>
    )
}
export default Layout
