import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

function Products() {
    return (
        <div className="font-sans min-h-screen flex flex-col">
            <Header />
            <HeroSection />
            <Footer />
        </div>
    );
}

export default Products;
