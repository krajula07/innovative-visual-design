// set the dimensions and margins of the graph
   // the outerRadius goes from the middle of the SVG area to the border
document.addEventListener('DOMContentLoaded', function() {
  var margin = { top: 20, right: 60, bottom: 60, left: 200 },
      width = 900 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 100,
      outerRadius = Math.min(width, height) / 2;
// append the svg object to the body of the page

var svg = d3.select("#my_dataviz")
.append("svg")
     .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
  // svg=d3.select("#my_dataviz")
  //.attr(style="background-color:green)
  .style("background-color", "black")
 .append("g")
     .attr("transform", "translate(" + ((width-75)/2)+ "," + ( height/2+50 )+ ")"); // Add 100 on Y translation, cause upper bars are longer

console.log('kavya',width/2,height/2+75);



d3.csv("data/Adobada.csv", function(data) {



  var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
                     .domain([0,100]);

  var xScale = d3.scaleLinear()
            .range([0, width])

            .domain([0, d3.max(data, function (d) {
    return d.overall;
 })]);

  var yScale = d3.scaleBand()
            .range([height-165, 0])
             .padding(0.1)
            .domain(data.map(function (d) {
    return d.Location;
 }));

 //   console.log(y.step())
 svg
 .selectAll(".bar")
 .append("g")
 .data(data)
 .enter()
 .append("rect")

 .attr("id", "bar")
 .transition()
    .delay(function(d, i){ return i*50; })
    .duration(1000)

 .attr("y", function (d) {
 // console.log(y(d.Location),'kavya')
 //console.log(d)
   d.spy=yScale(d.Location)-100;
    return yScale(d.Location)-100;
 })
 .attr("height",10)
 .attr("x", function (d) {
 // console.log(y(d.Location),'kavya')
 //console.log(d)
   d.spx=150;
    return d.spx;
 })
 .attr("width", function (d) {
   //console.log(xScale(d.overall)-300)
   d.tt=xScale(d.overall)-300;
    return xScale(d.overall)-300;
 })
 .attr("fill", function(d) {
     return colorScale(d.Location)
   })

 ;

  var x = d3.scaleBand()
      .range([0, - Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)
                      // This does nothing ?
      .domain( data.map(function(d) { return d.Location; }) ); // The domain of the X axis is the list of states.

  // Y scale
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 10]); // Domain of Y is from 0 to the max seen in the data


//  svg=d3.select("#my_dataviz")

  // Add bars
  svg
.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", function(d) {
        return colorScale(d.Location)
      })
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['Cost']); })
          .startAngle(function(d) { return x(d.Location); })
          .endAngle(function(d) { return x(d.Location) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

          ;

  var texts= svg.selectAll("text").data(data)
    .enter();

    texts.append("text")
    .attr("text-anchor", "start")
    .attr("font-size","10px")
    .style("font-weight", "bold")
    .attr("fill","white")
    //.style("color","white")
    //.attr("transform", "rotate(360)")
    .attr("x", function(d) {
        var a = x(d.Location) + ((x(d.Location) + x.bandwidth()) - x(d.Location))/2 - Math.PI/2;
      //  console.log(a)
        d.cx = Math.cos(a) * (180 - 75);
        //console.log(d.cx)
      //  console.log(a,(180 - 40))
        d.x =(- Math.cos(a) * (180-60));
        d.xc=d.spx-125;
        xe=d.spx-125;
        return xe;
      //  console.log(d.x)
    })
    .attr("y", function(d) {
        var a = x(d.Location) + ((x(d.Location) + x.bandwidth()) - x(d.Location))/2 - Math.PI/2;
        d.cy = Math.sin(a) * (180 - 75);
        //d.y = Math.sin(a) * (180-40)
        d.y = (Math.sin(a) * (180-40));
        d.yc=d.spy+10;
        ye=d.spy+10;
        return ye;
    })
  //  .attr("transform", "rotate(180,"+x+","+y+")")
    .text(function(d) { return d.Location; })
    .each(function(d) {
        var bbox = this.getBBox();
      //  console.log(d.x,d.y,bbox.width);
        d.sx = d.x;
        d.ox = d.x+50;
        d.sy = d.oy = d.y +5;
    });

  texts.append("text")
  .transition()
      .delay(function(d, i){ return i*50; })
      .duration(1000)
      .attr("fill","white")
    .attr("x", function(d) {
                  xe=d.spx+d.tt+2;
                  console.log(data,xe);
                  return xe;
    //            //  console.log(d.x)
             })
             .attr("y", function(d) {
                          ye=d.spy+10;
                         // console.log(ye);
                         return ye;
                     })
    .text(function(d){
        return d.overall;

  });

  svg.append("text")
  .attr("fill","white")

          .attr("x", (width / 2.7))
          .attr("y", 0- ((height-150) / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text("Rating of Burrito")
          ;

          svg.append("text")
          .attr("fill","white")
                  .attr("x", ((width-450) / 2.7))
                  .attr("y", 0- ((height-150) / 2))
                  .attr("text-anchor", "middle")
                  .style("font-size", "16px")
                  .style("text-decoration", "underline")
                  .text("Restaurants");

                  svg.append("path")
                      .attr("id", "wavy") //Unique id of the path
                      .attr("d", "M -170,-50 Q -150,-120, -70,-170") //SVG path hardcode
                      .style("fill", "none")
                      .style("stroke", "#AAAAAA");
                      svg.append("text")
   .append("textPath") //append a textPath to the text element
    .attr("xlink:href", "#wavy") //place the ID of the path here
    .style("text-anchor","middle") //place the text halfway on the arc
    .attr("startOffset", "50%")
    .attr("fill","white")
    .text("Cost Of Burrito(in $)");


     svg.append("defs").append("marker")
         .attr("id", "circ")
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("refX", 3)
         .attr("refY", 3)
        .append("circle")
         .attr("cx", 3)
         .attr("cy", 3)
         .attr("r", 3);
//console.log(data);
        svg.selectAll("path.pointer").data(data).enter()
    .append("path")
    .attr("class", "pointer")
    .style("fill", "none")
  .attr("stroke", function(d) {
      return colorScale(d.Location)
    })
  //  .style("stroke", "black")
  // .transition()
  //     .delay(function(d, i){ return i*100; })
  //     .duration(1000)

    .attr("marker-end", "url(#circ)")
    .attr("d", function(d,i) {
    //  console.log(d,i,svg[i-1]);
        if(d.cx > d.ox) {
        //  console.log("M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy);
            return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
        } else {
        //  console.log("M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy);
        //  console.log(d.oy,d.cy);
          x1=d.xc-5;
            return "M" + x1 + "," + d.yc+ " " + d.cx + "," + d.cy;
        }
    });
  //  console.log(data);
svg.select("g").selectAll("div")
.data(data).enter().append("text")//.attr("transform", "rotate(360)")
.attr("x", function(d) {
    var a = x(d.Location) + ((x(d.Location) + x.bandwidth()) - x(d.Location))/2 - Math.PI/2;

    //console.log(a,(180 - 40))
    d.x =( Math.cos(a) * (180-33));
    xc=22;
    return d.x;
})
.attr("y", function(d) {
    var a = x(d.Location) + ((x(d.Location) + x.bandwidth()) - x(d.Location))/2 - Math.PI/2;

    d.y = (Math.sin(a) * (180-40));
    yc=d.cy+2;
    return d.y;
})
.text(function(d) { return d.Cost; })
});



});
