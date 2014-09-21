var w = 1200,
    h = 800;

var circleWidth = 20;

var fontFamily = 'Bree Serif',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

/*
Manual data entry below O_o

Each element in this JSON array defines nodes and their connections in the graph. 

If a value in the "imports" array matches one of the values of the "name" of one of these elements,
a line will be drawn between them.
*/

var nodes = 
[ 
{ "name": "core/id/andrea_ang", "imports": [ "core/class/ID_She" ] }, 
{ "name": "core/class/Doc_Table", "imports": [ ] }, 
{ "name": "core/re/patent/us/20070233782_A1", "imports": [ ] }, 
{ "name": "core/at/USA/MA/Middlesex/Somerville/Geo", "imports": [ "core/at/USA/MA/Middlesex/Geo" ] }, 
{ "name": "core/class/ID_She", "imports": [ "core/class/ID_Individual" ] }, 
{ "name": "core/id/roberta_robinson", "imports": [ "core/class/ID_She", "core/at/USA/NY/Ulster/Woodstock/Geo" ] }, 
{ "name": "core/at/USA/MA/Middlesex/Cambridge/Geo", "imports": [ "core/at/USA/MA/Middlesex/Geo" ] }, 
{ "name": "core/ids/hazardj", "imports": [ "core/id/hazardj", "core/at/USA/MA/Middlesex/Cambridge/Broadway/1/Geo", "core/id/hazardj" ] }, 
{ "name": "core/class/ID_Entity", "imports": [ "core/class/ID" ] }, 
{ "name": "core/id/acme_incorporated", "imports": [ "core/class/ID_Entity", "core/id/the_corporation_company", "core/id/andrea_ang" ] }, 
{ "name": "core/at/USA/MA/Geo", "imports": [ "core/at/USA/Geo" ] }, 
{ "name": "core/id/hazardj", "imports": [ "core/class/ID_He", "core/at/USA/MA/Middlesex/Somerville/Geo" ] }, 
{ "name": "core/class/ID_Individual", "imports": [ "core/class/ID" ] }, 
{ "name": "core/at/USA/NY/Ulster/Geo", "imports": [ "core/at/USA/NY/Geo" ] }, 
{ "name": "core/form/agt/ip/assignment/Patent_Assignment_Form", "imports": [ "core/class/Doc_Table" ] }, 
{ "name": "core/id/the_corporation_company", "imports": [ "core/class/ID_Entity" ] }, 
{ "name": "core/class/ID", "imports": [ ] }, 
{ "name": "core/at/USA/MA/Middlesex/Cambridge/Broadway/1/Geo", "imports": [ "core/at/USA/MA/Middlesex/Cambridge/Broadway/Geo" ] }, 
{ "name": "event/ip/assignment/Patent_Assignment_Acme", "imports": [ "core/form/agt/ip/assignment/Patent_Assignment_Form", "core/id/acme_incorporated", "core/ids/hazardj", "core/id/roberta_robinson", "core/re/patent/us/20070233782_A1" ] }, 
{ "name": "core/class/ID_He", "imports": [ "core/class/ID_Individual" ] }, 
{ "name": "core/at/USA/MA/Middlesex/Cambridge/Broadway/Geo", "imports": [ "core/at/USA/MA/Middlesex/Cambridge/Geo" ] }, 
{ "name": "core/class/Geo_USA", "imports": [ ] }, { "name": "core/at/USA/Geo", "imports": [ "core/class/Geo_USA" ] }, 
{ "name": "core/at/USA/NY/Ulster/Woodstock/Geo", "imports": [ "core/at/USA/NY/Ulster/Geo" ] }, 
{ "name": "core/at/USA/MA/Middlesex/Geo", "imports": [ "core/at/USA/MA/Geo" ] }, 
{ "name": "core/at/USA/NY/Geo", "imports": [ "core/at/USA/Geo" ] } 
];

/*
var links = [
                {source: nodes[0], target: nodes[1]},
                  {source: nodes[1], target: nodes[2]},
                  {source: nodes[0], target: nodes[3]},
                  {source: nodes[4], target: nodes[2]},
  {source: nodes[2], target: nodes[3]}
] */

//returns index of a node in an array of node objects, or -1 if not found
function nodeIndexOf(nodes, searchNodeName) {
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].name === searchNodeName)
			return i;
	}
	return -1;
};

var links = [];

for (var n=0; n<nodes.length; n++) {
	for (var i=0; i<nodes[n].imports.length; i++) {
		var thisLink = {};
		targetIndex = nodeIndexOf(nodes, nodes[n].imports[i]);
		if (targetIndex >= 0) {
			thisLink.source = nodes[n];
			thisLink.target = nodes[targetIndex];
			links.push(thisLink);
		}
		
		
	}
}


var vis = d3.select("body")
    .append("svg:svg")
      .attr("class", "stage")
      .attr("width", w)
      .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w, h]);

 var link = vis.selectAll(".link")
        .data(links)
        .enter().append("line")
          .attr("class", "link")
          .attr("stroke", "black")
          .attr("fill", "none");

 var node = vis.selectAll("circle.node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")

      //MOUSEOVER
      .on("mouseover", function(d,i) {
        if (i>0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .style("cursor", "none")     
          .attr("r", circleWidth+3)
          .attr("fill",palette.orange);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .style("cursor", "none")     
          .duration(250)
          .style("cursor", "none")     
          .attr("font-size","1.5em")
          .attr("x", 15 )
          .attr("y", 5 )
        } else {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .style("cursor", "none")     

          //TEXT
          d3.select(this).select("text")
          .style("cursor", "none")     
        }
      })

      //MOUSEOUT
      .on("mouseout", function(d,i) {
        if (i>0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .attr("r", circleWidth)
          .attr("fill",palette.pink);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .duration(250)
          .attr("font-size","1em")
          .attr("x", 8 )
          .attr("y", 4 )
        }
      })

      .call(force.drag);


    //CIRCLE
    node.append("svg:circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", circleWidth)
      .attr("fill", function(d, i) { if (i>0) { return  palette.pink; } else { return palette.paleryellow } } )

    //TEXT
    node.append("text")
      .text(function(d, i) { return d.name; })
    .attr("x",    function(d, i) { return circleWidth + 5; })
      .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 }    else { return 8 } })
      .attr("font-family",  "Bree Serif")
      .attr("fill",         function(d, i) {  return  palette.black;  })
      .attr("font-size",    function(d, i) {  return  "1em"; })
      .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })




force.on("tick", function(e) {
  node.attr("transform", function(d, i) {     
        return "translate(" + d.x + "," + d.y + ")"; 
    });
    
   link.attr("x1", function(d)   { return d.source.x; })
       .attr("y1", function(d)   { return d.source.y; })
       .attr("x2", function(d)   { return d.target.x; })
       .attr("y2", function(d)   { return d.target.y; })
});

force.start();