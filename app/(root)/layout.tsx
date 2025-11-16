import React from "react";

const Layout = ({ children}: {children: React.ReactNode}) => {
    return (
        <>
            <p>Navbar</p>
            {children}

        </>
    )
}
export default Layout
