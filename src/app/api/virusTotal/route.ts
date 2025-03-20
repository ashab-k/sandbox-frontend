import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/lib/endpoint";
const PROCESSING_SERVER_URL = endpoint;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const externalFormData = new FormData();
    externalFormData.append("file", file);

    const response = await fetch(PROCESSING_SERVER_URL, {
      method: "POST",
      body: externalFormData,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }

    const data = await response.json();
    console.log(data.analysis_report);
    return NextResponse.json(data.analysis_report);
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
