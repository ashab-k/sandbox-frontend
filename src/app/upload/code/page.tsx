"use client";

import { useState, useEffect } from "react";
import MonacoEditor from "@/components/MonacoEditor";

export default function Home() {
  const [codeData, setCodeData] = useState<{
    decompiled_text: string;
    objdump_text: string;
  }>();
  const fetchFileContent = async (filePath: string) => {
    const response = await fetch(filePath);
    return response.text();
  };

  // Load both text files on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("code_response");
    if (storedData) {
      setCodeData(JSON.parse(storedData));
    }
  }, []);

  return (
    <MonacoEditor
      cCode={codeData?.decompiled_text}
      assemblyCode={codeData?.objdump_text}
      setAssemblyCode={setCodeData}
      setCCode={setCodeData}
    />
  );
}
