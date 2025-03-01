"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface StatsSummaryProps {
  stats: {
    malicious: number;
    suspicious: number;
    undetected: number;
    harmless: number;
    timeout: number;
    "confirmed-timeout": number;
    failure: number;
    "type-unsupported": number;
  };
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  const data = [
    { name: "Malicious", value: stats.malicious, color: "rgb(235,38,23)" },
    {
      name: "Suspicious",
      value: stats.suspicious,
      color: "rgb(204,117,31)",
    },
    {
      name: "Undetected",
      value: stats.undetected,
      color: "rgb(76,158,49)",
    },
    { name: "Harmless", value: stats.harmless, color: "hsl(var(--chart-4))" },
    {
      name: "Unsupported",
      value: stats["type-unsupported"],
      color: "hsl(var(--chart-5))",
    },
  ].filter((item) => item.value > 0);

  const totalScans = Object.values(stats).reduce((acc, val) => acc + val, 0);

  return (
    <div className="bg-card rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Detection Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} engines`, undefined]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Total Scans</div>
              <div className="text-2xl font-bold">{totalScans}</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                Detection Rate
              </div>
              <div className="text-2xl font-bold text-red-500">
                {Math.round((stats.malicious / totalScans) * 100)}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Malicious</span>
              <span className="text-sm font-medium">{stats.malicious}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${(stats.malicious / totalScans) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Suspicious</span>
              <span className="text-sm font-medium">{stats.suspicious}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${(stats.suspicious / totalScans) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Undetected</span>
              <span className="text-sm font-medium">{stats.undetected}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(stats.undetected / totalScans) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Unsupported</span>
              <span className="text-sm font-medium">
                {stats["type-unsupported"]}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-500"
                style={{
                  width: `${(stats["type-unsupported"] / totalScans) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
