import React, { useEffect } from "react";
import * as d3 from "d3";

const Grafica = ({ titulo, data, width, height, margin }) => {
  useEffect(() => {
    drawChart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const drawChart = () => {
    const data_x = [];
    const data_y = [];
    data.forEach((d) => {
      data_y.push(d.seasons);
      data_x.push(d.name);
    });

    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const canvas = d3.select("#canva");
    const svg = canvas.append("svg");

    svg.attr("width", width);
    svg.attr("height", height);
    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data_y, (d) => d)])
      .range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data_x.map((d) => d))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "orange")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.seasons))
      .attr("width", x.bandwidth())
      .attr("height", (d) => iheight - y(d.seasons));

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  };

  return (
    <div>
      <h2>{titulo}</h2>
      <div id="canva"></div>
    </div>
  );
};

export default Grafica;
