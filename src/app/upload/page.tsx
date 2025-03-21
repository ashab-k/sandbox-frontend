"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";
import ProcessingStatus from "@/components/ProcessingStatus";

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [codeResponseLoading, setCodeResponseLoading] = useState(false);
  const [decompilationSuccess, setDecompilationSuccess] = useState(false);
  const [virusTotalLoading, setVirusTotalLoading] = useState(false);
  const [virusTotalSuccess, setVirusTotalSucess] = useState(false);
  const [capaLoading, setCapaLoading] = useState(false);
  const [capaSuccess, setCapaSuccess] = useState(false);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      // Reset states when a new file is selected
      setDecompilationSuccess(false);
      setVirusTotalSucess(false);
      setCapaSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    setCodeResponseLoading(true);
    setDecompilationSuccess(false);

    const formData = new FormData();
    formData.append("file", selectedFile);

    /* try {
      const response = await fetch("/api/codeDecompilation", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      if (!response.ok) {
        alert("Processing failed!");
        return;
      }

      const data = await response.json();
      localStorage.setItem("code_response", JSON.stringify(data));
      setDecompilationSuccess(true);
      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong!");
    } finally {
      setCodeResponseLoading(false);
      setLoading(false);
    } */

    try {
      setVirusTotalLoading(true);
      const response = await fetch("/api/virusTotal", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      if (!response.ok) {
        alert("Processing failed!");
        return;
      }

      const data = await response.json();
      localStorage.setItem("virus_total", JSON.stringify(data));

      setVirusTotalSucess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong!");
    } finally {
      setVirusTotalLoading(false);
    }

    try {
      setCapaLoading(true);
      const response = await fetch("/api/capa", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      if (!response.ok) {
        alert("Processing failed!");
        return;
      }

      const data = await response.json();
      localStorage.setItem("capa_response", JSON.stringify(data));
      setCapaSuccess(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong!");
    } finally {
      setCapaLoading(false);
    }
  };

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
              MALbox
            </span>
          </h2>
          <p className="max-w-2xl mx-auto">
            The all-in-one platform for automated dynamic malware analysis:
            MalBox is a powerful tool that helps you to understand the behavior
            of malware in a safe environment.
          </p>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileChange} />
            <div className="mt-4 flex justify-center">
              <InteractiveHoverButton
                className="bg-cyan-600 text-teal-100 mb-10"
                onClick={handleUpload}
                disabled={loading || !selectedFile}
              >
                {loading ? "Processing..." : "Submit"}
              </InteractiveHoverButton>
            </div>
          </div>{" "}
          {/*  <ProcessingStatus
            loading={codeResponseLoading}
            success={decompilationSuccess}
            loadingText="Decompiling Code...."
            successText="Successfully Decompiled Code"
            link="/upload/code"
          /> */}
          <ProcessingStatus
            loading={virusTotalLoading}
            success={virusTotalSuccess}
            loadingText="Running static analysis...."
            successText="Successfully ran static analysis"
            link="/upload/analysis"
          />
          <ProcessingStatus
            loading={capaLoading}
            success={capaSuccess}
            loadingText="Analyzing with CAPA...."
            successText="Successfully Analyzed with CAPA"
            link="/upload/capa"
          />
        </div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";

export default Hero;
