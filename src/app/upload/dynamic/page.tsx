"use client";
import React from "react";

const page = () => {
  return (
    <div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          window.open(
            "https://remotedesktop.google.com/access/session/0780a217-8709-48ee-d00a-8d2c5707f9cd",
            "RemoteDesktopPopup",
            "width=400,height=300,left=200,top=200,toolbar=no,menubar=no,scrollbars=no,resizable=no"
          );
        }}
      >
        Open Window
      </a>
    </div>
  );
};

export default page;
