"use client";

import { useState, useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import MarkdownIt from "markdown-it";
import * as monaco from "monaco-editor";
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
  assemblyCode,
}: MonacoEditorProps) {
  const md = new MarkdownIt();
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  const handleCEditorMount: OnMount = (editor) => {
    cEditorRef.current = editor;
    editor.onDidChangeCursorSelection(() => handleSelectionChange(editor, "c"));
  };

  const handleAsmEditorMount: OnMount = (editor) => {
    asmEditorRef.current = editor;
    editor.onDidChangeCursorSelection(() =>
      handleSelectionChange(editor, "asm")
    );
  };

  // Scroll to analysis when it's available
  useEffect(() => {
    if (analysis && !isLoading && analysisRef.current) {
      analysisRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [analysis, isLoading]);

  // Send selected code to LLM API
  const analyzeCode = async () => {
    if (!selectedText) return;

    // Close the analyze button immediately
    setButtonPosition(null);

    setIsLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch("/api/snippetAnalysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: selectedText }),
      });

      const data = await response.json();
      setAnalysis(data.content);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setAnalysis("Error fetching analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative">
        <div className="flex gap-6 p-6">
          {/* Left - Assembly Code Editor */}
          <div className="relative w-1/2 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 text-sm font-medium flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
              Assembly Code
            </div>
            <Editor
              height="65vh"
              language="asm"
              theme="vs-dark"
              value={assemblyCode}
              onChange={() => {}}
              onMount={handleAsmEditorMount}
              options={{
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontFamily: "'Fira Code', monospace",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Right - C Editor */}
          <div className="relative w-1/2 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-3 text-sm font-medium flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              C Code
            </div>
            <Editor
              height="65vh"
              language="cpp"
              theme="vs-dark"
              value={cCode}
              onChange={() => {}}
              onMount={handleCEditorMount}
              options={{
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontFamily: "'Fira Code', monospace",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        {/* Floating Analyze Button - Using fixed positioning */}
        {buttonPosition && (
          <button
            className="fixed bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm z-50 hover:from-blue-700 hover:to-blue-600 shadow-md transition-all duration-200 flex items-center"
            style={{
              top: `${buttonPosition.top}px`,
              left: `${buttonPosition.left}px`,
            }}
            onClick={analyzeCode}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            Analyze
          </button>
        )}
      </div>

      <div className="px-[10%] py-6">
        <div className="font-bold text-[2rem] text-center mb-6 text-gray-800 border-b border-gray-200 pb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Code Analysis
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Analyzing your code...
            </p>
          </div>
        ) : analysis ? (
          <div
            ref={analysisRef}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-black w-full z-40 transition-all duration-300"
          >
            <div
              className="prose max-w-none prose-headings:text-blue-700 prose-pre:bg-gray-800 prose-pre:text-white prose-pre:shadow-md prose-pre:rounded-lg"
              dangerouslySetInnerHTML={{ __html: md.render(analysis) }}
            ></div>
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={() => setAnalysis(null)}
            ></button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            <p className="text-lg">Select some code to analyze</p>
            <p className="text-sm mt-2 text-gray-400">
              Highlight code in either editor and click the Analyze button
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
