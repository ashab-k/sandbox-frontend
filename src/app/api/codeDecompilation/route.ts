import { NextRequest, NextResponse } from "next/server";

const PROCESSING_SERVER_URL =
  "https://8e51-103-213-208-187.ngrok-free.app/decompile";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Forward the file to the external processing server
    const externalFormData = new FormData();
    externalFormData.append("file", file);

    const response = await fetch(PROCESSING_SERVER_URL, {
      method: "POST",
      body: externalFormData,
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }

    const data = await response.json(); // Expect JSON response with two text fields
    return NextResponse.json({
      decompiled_text: data.decompiled_text,
      objdump_text: data.objdump_text,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
