"use client";

import Image from "next/image";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";

export function Upload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("/api/codeDecompilation", {
      method: "POST",
      body: formData,
    });

    /*  if (!response.ok) {
      alert("Processing failed!");
      return;
    } */

    const data = await response.json();
    setResponseData(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleUpload} />
    </div>
  );
}

const Hero = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-sm text-indigo-600 font-medium">
            Security comes first.
          </h1>
          <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
            Get to know your files with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
              GaandBox
            </span>
          </h2>
          <p className="max-w-2xl mx-auto">
            The all-in-one platform for automated dynamic malware analysis:
            GaandBox is a powerful tool that helps you to understand the
            behavior of malware in a safe environment.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <InteractiveHoverButton className="bg-cyan-600 text-teal-100">
              Hover Me
            </InteractiveHoverButton>
          </div>
          <Upload />
        </div>
        <div className="mt-14">
          <Image
            src=""
            className="w-full shadow-lg rounded-lg border"
            alt="Analysis preview"
            width={1200}
            height={800}
          />
        </div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";

export default Hero;
