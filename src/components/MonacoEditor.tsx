"use client";

import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
  cCode: string | undefined;
  setCCode: React.Dispatch<
    React.SetStateAction<
      { decompiled_text: string; objdump_text: string } | undefined
    >
  >;
  assemblyCode: string | undefined;
  setAssemblyCode: React.Dispatch<
    React.SetStateAction<
      { decompiled_text: string; objdump_text: string } | undefined
    >
  >;
}

export default function MonacoEditor({
  cCode,
  setCCode,
  assemblyCode,
  setAssemblyCode,
}: MonacoEditorProps) {
  return (
    <div className="flex h-screen gap-4 p-4">
      {/* Left - Assembly Code Editor */}
      <div className="w-1/2 border  border-black rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gray-800 text-white p-2 text-sm">Assembly Code</div>

        <Editor
          height="90vh"
          language="asm"
          theme="vs-dark"
          value={assemblyCode}
          onChange={(value) => setAssemblyCode(value)}
        />
      </div>

      {/* Right - C Editor */}
      <div className="w-1/2 border border-black rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gray-800 text-white p-2 text-sm">C Code</div>
        <Editor
          height="90vh"
          language="cpp"
          theme="vs-dark"
          value={cCode}
          onChange={(value) => setCCode(value || "")}
        />
      </div>
    </div>
  );
}
