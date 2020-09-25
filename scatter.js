//mean
var homeworkMean=function(penguin)
{
    var getHwGrade=function(homework)
    {return homework.grade}

var homeworkGrade=penguin.homework.map(getHwGrade)
return d3.mean(homeworkGrade)
}
//graph
var drawPlot= function(penguins,screen,xScale,yScale)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
    {
      return (penguin.final[0].grade)  
    })
    
   .attr("cy",function(penguin){
         
        return yScale (homeworkMean(penguin))
                       })
    .attr("r",5) 

    
    .on("mouseenter",function(penguin)
    {
      var xPos=d3.event.pageX;
        var yPos=d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#img")
    })



}





var initGraph=function(penguins)
{
    var screen= {width:1000,height:800}
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height)

    var xScale=d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width])
    
    
    var yScale=d3.scaleLinear()
    .domain([0,100])
    .range([screen.height,0])


    drawPlot(penguins,screen,xScale,yScale);







}
var successFCN=function(penguins)
{
    console.log("grades",penguins)
    initGraph(penguins)
}

var failFCN= function(error)
{
    console.log("error",error)
}
var penguinPromise=d3.json("classData.json")
penguinPromise.then(successFCN,failFCN)