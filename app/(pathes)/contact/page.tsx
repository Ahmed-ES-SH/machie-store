import ContactSection from "@/app/_components/_website/contact/ContactSection";
import React from "react";

export default function ContactPage() {
  return (
    <>
      <div className="c-container mt-12">
        <div id="main-title" className="flex flex-col gap-2 items-start">
          <p className="text-gray-300">You can ask us questions !</p>
          <h3 className="xl:text-4xl md:text-2xl text-xl w-full font-light xl:w-1/2 ">
            Contact us for all your questions and opinions, or you can solve
            your problems in a shorter time with our contact offices.
          </h3>
        </div>
        <ContactSection />
      </div>
    </>
  );
}
