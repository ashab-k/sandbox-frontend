"use client";

import { useState } from "react";
import MonacoEditor from "@/components/MonacoEditor";

export default function Home() {
  const [cCode, setCCode] = useState(
    `#include <stdio.h>\nint main() {\n  printf("Hello, World!");\n  return 0;\n}`
  );

  const [assemblyCode, setAssemblyCode] = useState(
    `; Assembly equivalent\nsection .text\nglobal _start\n_start:\n  mov rax, 1\n  mov rdi, 1\n  mov rsi, message\n  mov rdx, 13\n  syscall\n  mov rax, 60\n  xor rdi, rdi\n  syscall\nsection .data\nmessage db "Hello, World!", 10`
  );

  return (
    <MonacoEditor
      cCode={cCode}
      setCCode={setCCode}
      assemblyCode={assemblyCode}
      setAssemblyCode={setAssemblyCode}
    />
  );
}
