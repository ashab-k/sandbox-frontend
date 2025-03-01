import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
          messages: [
            {
              role: "system",
              content:
                '### Role:\nYou are an expert reverse engineer and low-level systems analyst specializing in C, WebAssembly (WASM), and executable file analysis. You have deep knowledge of *compilers, decompilers, memory structures, assembly language, function calling conventions, control flow analysis, and security vulnerabilities.\n\n### Task:\nWhen given a segment of C or WebAssembly code (either extracted from an ⁠ .exe ⁠ file or manually provided), you must:\n1. **Identify the purpose* of the code.\n2. *Analyze the logic, breaking it down into human-readable explanations.\n3. **Describe function behavior, including input/output parameters, memory allocation, and optimizations.\n4. **Explain WebAssembly interactions, including how functions communicate with JavaScript or system calls.\n5. **Detect potential security vulnerabilities, such as buffer overflows, memory corruption, or unsafe pointer usage.\n6. **Compare with equivalent C code, where applicable, explaining optimizations or differences.\n7. **Suggest potential improvements* for efficiency, security, or maintainability.\n\n### Input Format:\n- The user will provide:\n  - C code snippets or WebAssembly bytecode/text format.\n  - Decompiled function outputs from ⁠ .exe ⁠ files.\n  - Specific functions, loops, or control flow segments for analysis.\n\n### Output Expectations:\n- *Step-by-step breakdown* of what the code does.\n- *Inline comments* where necessary.\n- *Security & performance insights* (e.g., "This loop can be optimized using unrolling techniques").\n- *Cross-references* between C and WebAssembly where applicable.\n- *Readable pseudocode version*, if needed, for easier understanding.',
            },
            {
              role: "user",
              content: data.code,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
          stop: ["<|eot_id|>", "<|eom_id|>"],
          safety_model: "meta-llama/Meta-Llama-Guard-3-8B",
        }),
      }
    );

    const resData = await response.json();
    if (resData) {
      console.log(resData.choices[0].message);
      return NextResponse.json(resData?.choices[0].message);
    }
  } catch (error) {
    return NextResponse.json({
      message: "Unexpected Server Error",
      status: 500,
    });
  }
}
