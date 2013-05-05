var json = {
 "name": "flare",
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "HADOOP", "size": 2938},
      {"name": "HIVE", "size": 2812},
      {"name": "IMPALA", "size": 743},
      {"name": "TABLEU", "size": 931},
      {"name": "SPLUNK", "size": 931},
      {"name": "TOOLS", "size": 931},
      {"name": "MATLAB", "size": 931}
     ]
    },
    {
     "name": "graph",
     "children": [
      {"name": "SQL", "size": 3534},
      {"name": "EXCEL", "size": 3731},
      {"name": "NO SQL", "size": 3731},
      {"name": "R", "size": 3731}
     ]
    }
   ]
  }
 ]
};

var color = d3.scale.ordinal()
    .domain(["foo", "bar", "baz"])
    .range(["#B9090B","#279bfa","black"]);

var r = 500,
    format = d3.format(",d"),
    fill = color;

var bubble = d3.layout.pack()
    .sort(null)
    .size([r, r])
    .padding(1.5);

var vis = d3.select("#chart").append("svg")
    .attr("width", r)
    .attr("height", r)
    .attr("class", "bubble");


  var node = vis.selectAll("g.node")
      .data(bubble.nodes(classes(json))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return fill(d.packageName); });

  node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "white")
      .text(function(d) { return d.className.substring(0, d.r / 3); });

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

var w = 550,
    h = 550,
    r = 50,
    x = Math.sin(2 * Math.PI / 3),
    y = Math.cos(2 * Math.PI / 3),
    speed = 8,
    start = Date.now();

var svg = d3.select("#problem").insert("svg:svg")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(.9)")
  .append("svg:g")
    .data([{radius: r * 5}]);
    
svg.append("svg:g")
    .attr("class", "ring")
    .data([{teeth: 80, radius: -r * 5, ring: true}])
  .append("svg:path")
    .attr("class", "gear")
    .attr("d", gear);

var sun = svg.append("svg:g")
    .attr("class", "sun")
    .data([{teeth: 16, radius: r}])
  .append("svg:g")
    .attr("class", "gear");

sun.append("svg:path")
    .attr("d", gear);

sun.append("svg:text")
    .attr("x", r / 2 + 6)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .text("ME");

var planet1 = svg.append("svg:g")
    .attr("class", "planet")
    .attr("transform", "translate(0,-" + r * 3 + ")")
    .data([{teeth: 32, radius: -r * 2}])
  .append("svg:g")
    .attr("class", "gear");

planet1.append("svg:path")
    .attr("d", gear);

planet1.append("svg:text")
    .attr("x", -r)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(45)")
    .text("IDEAS")

var planet2 = svg.append("svg:g")
    .attr("class", "planet")
    .attr("transform", "translate(" + -r * 3 * x + "," + -r * 3 * y + ")")
    .data([{teeth: 32, radius: -r * 2}])
  .append("svg:g")
    .attr("class", "gear");

planet2.append("svg:path")
    .attr("d", gear);

planet2.append("svg:text")
    .attr("x", -r)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(45)")
    .text("SKILL");

var planet3 = svg.append("svg:g")
    .attr("class", "planet")
    .attr("transform", "translate(" + r * 3 * x + "," + -r * 3 * y + ")")
    .data([{teeth: 32, radius: -r * 2}])
  .append("svg:g")
    .attr("class", "gear");

planet3.append("svg:path")
    .attr("d", gear);

planet3.append("svg:text")
    .attr("x", -r)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(45)")
    .text("SPEED");


function gear(d) {
  var n = d.teeth,
      r2 = Math.abs(d.radius),
      r0 = r2 - 8,
      r1 = r2 + 8,
      r3 = d.ring ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
      da = Math.PI / n,
      a0 = -Math.PI / 2 + (d.ring ? Math.PI / n : 0),
      i = -1,
      path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
  while (++i < n) path.push(
      "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
      "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
      "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
      "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
  path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
  return path.join("");
}

d3.timer(function() {
  var angle = (Date.now() - start) * speed,
      transform = function(d) { return "rotate(" + angle / d.radius + ")"; };
  svg.selectAll(".gear").attr("transform", transform);
  svg.attr("transform", transform); // fixed ring
});
