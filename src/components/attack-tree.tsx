"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import type { AttackData, TechniqueItem } from "@/lib/types";

interface AttackTreeProps {
  data?: AttackData; // Make `data` optional to handle undefined cases
}

export default function AttackTree({ data = {} }: AttackTreeProps) {
  const [expandedTactics, setExpandedTactics] = useState<
    Record<string, boolean>
  >(
    Object.keys(data || {}).reduce(
      (acc, tactic) => ({ ...acc, [tactic]: true }),
      {}
    )
  );

  const toggleTactic = (tactic: string) => {
    setExpandedTactics((prev) => ({
      ...prev,
      [tactic]: !prev[tactic],
    }));
  };

  return (
    <div className="attack-tree">
      {Object.entries(data).map(([tactic, techniques]) => (
        <div key={tactic} className="mb-4">
          <div
            className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
            onClick={() => toggleTactic(tactic)}
          >
            {expandedTactics[tactic] ? (
              <ChevronDown className="w-5 h-5 text-blue-700 mr-2" />
            ) : (
              <ChevronRight className="w-5 h-5 text-blue-700 mr-2" />
            )}
            <h2 className="text-xl font-semibold text-blue-800">{tactic}</h2>
          </div>

          {expandedTactics[tactic] && (
            <div className="ml-6 mt-2 space-y-2">
              {techniques.map((technique: TechniqueItem, index: number) => {
                const [name, url] = Object.entries(technique)[0] || [
                  "Unknown",
                  "#",
                ];
                return (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-white border border-gray-200 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">{name}</span>
                    </div>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="mr-1">View</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
