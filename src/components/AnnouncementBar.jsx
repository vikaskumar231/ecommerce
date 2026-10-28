import React from "react";
import { useStore } from "../context/StoreContext";

export const AnnouncementBar = ({ onNavigate }) => {
  return (
    <div className="top-announcement-bar">
      <div>
        ✨ <strong>Diwali & Wedding Season Special:</strong> Use code <strong>FESTIVE15</strong> for 15% OFF | Free Express Delivery across India on orders above ₹999
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <a href="#tracking" onClick={(e) => { e.preventDefault(); onNavigate("tracking"); }}>
          Track Your Order
        </a>
        <span>|</span>
        <a href="#bespoke" onClick={(e) => { e.preventDefault(); onNavigate("bespoke"); }}>
          Customize your design
        </a>
      </div>
    </div>
  );
};
