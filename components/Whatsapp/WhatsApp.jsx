"use client";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/8801844846535"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 rounded-full p-2 shadow-lg hover:bg-green-600 transition-all z-50"
    >
      <FaWhatsapp size={30} color="green" />
    </a>
  );
};

export default WhatsApp;
