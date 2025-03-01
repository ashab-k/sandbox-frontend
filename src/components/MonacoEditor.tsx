"use client";

import { useState, useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

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
  const cEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const asmEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [activeEditor, setActiveEditor] = useState<"c" | "asm" | null>(null);
  const analysisRef = useRef<HTMLDivElement | null>(null);

  // Handle editor selection tracking
  const handleSelectionChange = (
    editor: monaco.editor.IStandaloneCodeEditor,
    editorType: "c" | "asm"
  ) => {
    const selection = editor.getSelection();
    const model = editor.getModel();

    if (model && selection) {
      const text = model.getValueInRange(selection);
      setSelectedText(text);

      if (text.trim() !== "") {
        const position = editor.getScrolledVisiblePosition(
          selection.getEndPosition()
        );
        if (position) {
          // Get the editor container's position
          const editorContainer = editor.getContainerDomNode();
          const rect = editorContainer.getBoundingClientRect();

          setButtonPosition({
            top: rect.top + position.top + 10, // Offset from the top of the page
            left: rect.left + position.left + 10, // Offset from the left of the page
          });
          setActiveEditor(editorType);
        }
      } else {
        setButtonPosition(null);
        setActiveEditor(null);
      }
    }
  };

  // Create separate mount handlers for each editor type
  const handleCEditorMount: OnMount = (editor, monaco) => {
    cEditorRef.current = editor;
    editor.onDidChangeCursorSelection(() => handleSelectionChange(editor, "c"));
  };

  const handleAsmEditorMount: OnMount = (editor, monaco) => {
    asmEditorRef.current = editor;
    editor.onDidChangeCursorSelection(() =>
      handleSelectionChange(editor, "asm")
    );
  };

  // Send selected code to LLM API
  const analyzeCode = async () => {
    if (!selectedText) return;

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: selectedText }),
      });

      const data = await response.json();
      setAnalysis(data.analysis);

      setTimeout(() => {
        if (analysisRef.current) {
          analysisRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setAnalysis("Error fetching analysis.");
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-4 p-4">
        {/* Left - Assembly Code Editor */}
        <div className="relative w-1/2 border border-black rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gray-800 text-white p-2 text-sm">
            Assembly Code
          </div>
          <Editor
            height="80vh"
            language="asm"
            theme="vs-dark"
            value={assemblyCode}
            onChange={(value) => {
              if (typeof value === "string") {
                setAssemblyCode({ decompiled_text: value, objdump_text: "" });
              }
            }}
            onMount={handleAsmEditorMount}
          />
        </div>

        {/* Right - C Editor */}
        <div className="relative w-1/2 border border-black rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gray-800 text-white p-2 text-sm">C Code</div>
          <Editor
            height="80vh"
            language="cpp"
            theme="vs-dark"
            value={cCode}
            onChange={(value) => {
              if (typeof value === "string") {
                setCCode({ decompiled_text: value, objdump_text: "" });
              }
            }}
            onMount={handleCEditorMount}
          />
        </div>
      </div>

      {/* Floating Analyze Button - Using fixed positioning */}
      {buttonPosition && (
        <button
          className="fixed bg-blue-600 text-white px-3 py-1 rounded-md text-sm z-50 hover:bg-blue-700"
          style={{
            top: `${buttonPosition.top}px`,
            left: `${buttonPosition.left}px`,
          }}
          onClick={analyzeCode}
        >
          Analyze
        </button>
      )}

      {/* Analysis Result */}
      {analysis && (
        <div
          ref={analysisRef}
          className="bottom-4 px-[10%] p-3 text-black rounded shadow-lg w-1/2 z-40"
        >
          <strong>Analysis:</strong>
          <pre>{analysis}</pre>
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-300"
            onClick={() => setAnalysis(null)}
          ></button>
        </div>
      )}
    </div>
  );
}
