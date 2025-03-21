"use client";

import { useState, useEffect } from "react";
import { MalwareAnalysisHeader } from "@/components/MalwareAnalysisHeader";
import { ScanResultsTable } from "@/components/ScanResultsTable";
import { StatsSummary } from "@/components/StatsSummary";
import { Shield, AlertTriangle } from "lucide-react";
export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const storedData = localStorage.getItem("virus_total");
    console.log(storedData);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h1 className="text-2xl font-bold">Error Loading Data</h1>
          <p className="text-muted-foreground">
            Unable to load malware analysis data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Transform the results object into an array of objects with name, category, and result
  const scanResults = Object.entries(data.data.attributes.results).map(
    ([name, details]: [string, any]) => ({
      name,
      category: details.category,
      result: details.result,
    })
  );

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-center">Malware Insight</h1>
      </div>

      <MalwareAnalysisHeader
        fileInfo={data.meta.file_info}
        date={data.data.attributes.date}
        stats={data.data.attributes.stats}
      />

      <div className="grid grid-cols-1 gap-6 mb-6">
        <StatsSummary stats={data.data.attributes.stats} />
      </div>

      <ScanResultsTable results={scanResults} />

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p className="mt-1">SHA256: {data.meta.file_info.sha256}</p>
      </footer>
    </main>
  );
}
