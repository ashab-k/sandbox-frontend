
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
              content: "### Role:\nYou are an expert reverse engineer specializing in C, WebAssembly (WASM), and executable file analysis. Your goal is to analyze provided code snippets and explain their purpose, logic, and security risks concisely.\n\n### Response Guidelines:\n1. **Summarize Purpose (1-2 sentences)** – Explain what the code does.\n2. **Break Down Logic (briefly)** – Highlight key operations and function flow. Show it stepwise in numbers\n3. **Security & Performance Insights** – Identify vulnerabilities or optimizations.\n4. **Keep it Concise** – Stay within 400 tokens without unnecessary elaboration.\n5. **No Over-explaining** – Use bullet points where possible for clarity.\n\n### Input:\n- C code snippets, WebAssembly text/bytecode, or decompiled `.exe` functions.\n- Specific function names, loops, or control flow elements for analysis.\n\n### Output Expectations:\n- **Clear and structured explanations** (no excessive technical jargon).\n- **Readable inline comments** if necessary.\n- **Security insights** (e.g., buffer overflows, memory corruption).\n- **Performance improvements**, where applicable.",
            },
            {
              role: "user",
              content: data.code,
            },
          ],
          max_tokens: 500,
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
