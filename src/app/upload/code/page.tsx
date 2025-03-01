"use client";

import { useState, useEffect } from "react";
import MonacoEditor from "@/components/MonacoEditor";

export default function Home() {
  const [cCode, setCCode] = useState("");

  const [assemblyCode, setAssemblyCode] = useState("");
  const fetchFileContent = async (filePath: string) => {
    const response = await fetch(filePath);
    return response.text();
  };

  // Load both text files on component mount
  useEffect(() => {
    fetchFileContent("/test.exe_decompiled.txt").then(setCCode);
    fetchFileContent("/test.exe_objdump.txt").then(setAssemblyCode);
  }, []);

  return (
    <MonacoEditor
      cCode={cCode}
      setCCode={setCCode}
      assemblyCode={assemblyCode}
      setAssemblyCode={setAssemblyCode}
    />
  );
}
