"use client";

import { useEffect, useRef } from "react";
import type { AttackData } from "@/lib/types";
import * as d3 from "d3";

interface AttackGraphProps {
  data: AttackData;
}

interface Node {
  id: string;
  group: number;
  url?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  value: number;
}

// Define D3 simulation node type
interface SimulationNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  url?: string;
  x: number;
  y: number;
}

// Define D3 simulation link type
interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  value: number;
}

export default function AttackGraph({ data }: AttackGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Transform the data into nodes and links
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Add the root node
    nodes.push({ id: "MITRE ATT&CK", group: 0 });

    // Add tactic nodes and connect to root
    Object.keys(data).forEach((tactic) => {
      nodes.push({ id: tactic, group: 1 });
      links.push({ source: "MITRE ATT&CK", target: tactic, value: 1 });

      // Add technique nodes and connect to tactic
      data[tactic].forEach((technique) => {
        const [name, url] = Object.entries(technique)[0];
        nodes.push({ id: name, group: 2, url: url as string });
        links.push({ source: tactic, target: name, value: 1 });
      });
    });

    const width = svgRef.current.clientWidth;
    const height = 600;

    // Create a force simulation
    const simulation = d3
      .forceSimulation<SimulationNode>(nodes as unknown as SimulationNode[])
      .force(
        "link",
        d3
          .forceLink<SimulationNode, SimulationLink>(
            links as unknown as SimulationLink[]
          )
          .id((d: SimulationNode) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody<SimulationNode>().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3
      .select<SVGSVGElement, unknown>(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Define arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // Create links
    const link = svg
      .append("g")
      .selectAll<SVGLineElement, SimulationLink>("line")
      .data(links as unknown as SimulationLink[])
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: SimulationLink) => Math.sqrt(d.value))
      .attr("marker-end", "url(#arrowhead)");

    // Create node groups
    const node = svg
      .append("g")
      .selectAll<SVGGElement, SimulationNode>(".node")
      .data(nodes as unknown as SimulationNode[])
      .join("g")
      .attr("class", "node")
      .call(
        d3
          .drag<SVGGElement, SimulationNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", (d: SimulationNode) =>
        d.group === 0 ? 20 : d.group === 1 ? 15 : 10
      )
      .attr("fill", (d: SimulationNode) => {
        if (d.group === 0) return "#e53e3e"; // Root node (red)
        if (d.group === 1) return "#dd6b20"; // Tactics (orange)
        return "#3182ce"; // Techniques (blue)
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Add text labels to nodes
    node
      .append("text")
      .attr("dx", (d: SimulationNode) =>
        d.group === 0 ? 25 : d.group === 1 ? 20 : 15
      )
      .attr("dy", ".35em")
      .text((d: SimulationNode) => d.id)
      .attr("font-size", (d: SimulationNode) =>
        d.group === 0 ? "14px" : d.group === 1 ? "12px" : "10px"
      )
      .attr("fill", "#333");

    // Add click handler for technique nodes
    node.on("click", (event: MouseEvent, d: SimulationNode) => {
      if (d.url) {
        window.open(d.url, "_blank");
      }
    });

    // Add hover effect
    node
      .on("mouseover", function (this: SVGGElement) {
        d3.select(this)
          .select("circle")
          .attr("stroke", "#333")
          .attr("stroke-width", 2);
      })
      .on("mouseout", function (this: SVGGElement) {
        d3.select(this)
          .select("circle")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5);
      });

    // Add title for tooltip
    node.append("title").text((d: SimulationNode) => d.id);

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: SimulationLink) => (d.source as SimulationNode).x)
        .attr("y1", (d: SimulationLink) => (d.source as SimulationNode).y)
        .attr("x2", (d: SimulationLink) => (d.target as SimulationNode).x)
        .attr("y2", (d: SimulationLink) => (d.target as SimulationNode).y);

      node.attr("transform", (d: SimulationNode) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(
      event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>,
      d: SimulationNode
    ) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="w-full h-[600px] overflow-hidden border border-gray-200 rounded-lg">
      <svg ref={svgRef} width="100%" height="100%" className="bg-white"></svg>
    </div>
  );
}
