"use client";
import AttackTree from "@/components/attack-tree";
import AttackGraph from "@/components/attack-graph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function Home() {
  const [attackData, setAttackData] = useState<any>();
  useEffect(() => {
    const storedData = localStorage.getItem("capa_response");
    if (storedData) {
      setAttackData(JSON.parse(storedData));
    }
  }, []);

  return (
    <main className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              MITRE ATT&CK Techniques
            </h1>
            <p className="text-gray-600">
              Visualization of techniques organized by tactics
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Tabs defaultValue="tree">
            <TabsList className="mb-4">
              <TabsTrigger value="tree">Tree View</TabsTrigger>
              <TabsTrigger value="graph">Graph View</TabsTrigger>
            </TabsList>
            <TabsContent value="tree">
              <AttackTree data={attackData} />
            </TabsContent>
            <TabsContent value="graph">
              <AttackGraph data={attackData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
