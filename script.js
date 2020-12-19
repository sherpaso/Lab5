d3.csv("coffee-house-chains.csv", d3.autoType).then((data) => {
    console.log(data);
 

    const margin = { top: 20, left: 20, bottom: 20, right: 20 };
    const width = 650 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right + 50)
      .attr("height", height + margin.top + margin.bottom + 50)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.right + ")");
  
    // create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.company))
      .rangeRound([0, width])
      .paddingInner(0.0);
  
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.stores))
      .range([height, 0]);
  
    // console.log(data.map((d) => d.stores));
    // console.log(d3.extent(data, (d) => d.stores));
  
    // create bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "rect")
      .attr("x", (d, i) => i * 76 + 69)
      .attr("y", (d) => yScale(d.stores) + 10)
      .attr("height", (d) => height - yScale(d.stores) + 20)
      .attr("width", 40)
      .attr("fill", "skyblue")
      .attr("opacity", 0.0)
      .transition()
      .duration(1000)
      .attr("fill", "red")
      .attr("opacity", 1.0);
  
    // create axes and axis title
    const xAxis = d3.axisBottom().scale(xScale).ticks(5, "s");
  
    svg
      .append("g")
      .attr("class", "axis x-axis")
      .call(xAxis)
      .attr("transform", `translate(50, ${height + 30})`);
  
    const yAxis = d3.axisLeft().scale(yScale).ticks(5, "s");
  
    svg
      .append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)
      .attr("transform", `translate(50, 30)`);
  
    svg.append("text").attr("x", 15).attr("y", 20).text("stores");
  
   
  
    // console.log(document.querySelector("#group-by").value);
    let type = document.querySelector("#group-by");
    let direction = 0;
    let isPressed = false;
  
    // CHART UPDATE FUNCTION 
    function update(data, type) {
     
  
      if (isPressed == true && type == "revenue") {
        if (direction == 0) {
          data.sort(function (a, b) {
            return b.revenue - a.revenue;
          });
        } else {
          data.sort(function (a, b) {
            return a.revenue - b.revenue;
          });
        }
      }
  
      if (isPressed == true && type == "stores") {
        if (direction == 0) {
          data.sort(function (a, b) {
            return b.stores - a.stores;
          });
        } else {
          data.sort(function (a, b) {
            return a.stores - b.stores;
          });
        }
      }
  
      xScale.domain(data.map((d) => d.company)); //was data
      type == "revenue"
        ? yScale.domain(d3.extent(data, (d) => d.revenue))
        : yScale.domain(d3.extent(data, (d) => d.stores));
  
      const bars = svg.selectAll(".bar").data(data);
  
      console.log(data.map((d) => d.revenue));
      console.log(data.map((d) => d.stores));
  
      // Implement the enter-update-exist sequence
  
      type == "revenue"
        ? svg
            .selectAll("#rect")
            .data(data, (d) => d)
            .enter()
            .append("rect")
            .attr("class", "rect")
            .attr("x", (d, i) => i * 76 + 69)
            .attr("y", (d) => yScale(d.revenue) + 10)
            .attr("height", (d) => height - yScale(d.revenue) + 20)
            .attr("width", 40)
            .attr("fill", "yellow")
            .attr("opacity", 0.0)
            .transition()
            .duration(1000)
            .attr("fill", "yellow")
            .attr("opacity", 1.0)
        : svg
            .selectAll("#rect")
            .data(data, (d) => d)
            .enter()
            .append("rect")
            .attr("class", "rect")
            .attr("x", (d, i) => i * 76 + 69)
            .attr("y", (d) => yScale(d.stores) + 10)
            .attr("height", (d) => height - yScale(d.stores) + 20)
            .attr("width", 40)
            .attr("fill", "skyblue")
            .attr("opacity", 0.0)
            .transition()
            .duration(1000)
            .attr("fill", "blue")
            .attr("opacity", 1.0);
  
      // Update axes and axis title
      const xAxis = d3.axisBottom().scale(xScale).ticks(5, "s");
  
      svg
        .append("g")
        .attr("class", "axis x-axis")
        .call(xAxis)
        .attr("transform", `translate(50, ${height + 30})`);
  
      const yAxis = d3.axisLeft().scale(yScale).ticks(5, "s");
  
      svg
        .append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)
        .attr("transform", `translate(50, 30)`);
  
      svg
        .append("text")
        .attr("x", 15)
        .attr("y", 20)
        .text(type + "");
  
      if (direction == 0 && isPressed == true) {
        direction = 1;
        isPressed = false;
      } else if (direction == 1 && isPressed == true) {
        direction = 0;
        isPressed = false;
      }
      // console.log(direction)
    }
  
    type.addEventListener("change", () => {
      // console.log(data);
      // console.log(type.value);
      svg
        .selectAll("rect")
        .transition()
        .duration(1000)
        .attr("fill", "black")
        .attr("opacity", 0.0)
        .remove();
      svg.selectAll("g").remove();
      svg.selectAll("text").remove();
      update(data, type.value);
    });
  
    document.querySelector("#sort").addEventListener("click", (e) => {
      isPressed = true;
      svg
        .selectAll("rect")
        .transition()
        .duration(1000)
        .attr("fill", "black")
        .attr("opacity", 0.0)
        .remove();
      svg.selectAll("g").remove();
      svg.selectAll("text").remove();
      update(data, type.value);
    });
  });
  