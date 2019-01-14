import React from 'react'
import * as d3 from 'd3'
import {select} from 'd3-selection'
import {attrs} from 'd3-selection-multi'
import './CourseGraph.css'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import {ExpandMore} from '@material-ui/icons/ExpandMore'

export default class CourseGraph extends React.Component {

    constructor(props){
        super(props)
        this.createGraph = this.createGraph.bind(this)
        this.update = this.update.bind(this)
    }

    createGraph() {
        let node = this.node
        

        select(node)
            .selectAll('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            
    
        let simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(200).strength(1))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));
        console.log(`${this.props.width / 2} ${this.props.height / 2}`)
        //TODO connect http://localhost:3033/api/graphdata to mongodb 
        d3.json("/graph.json").then((graph) => {
            this.update(graph.links, graph.nodes, simulation);
        }).catch(error => console.log(error))
    }

    update(links, nodes, simulation) {
        var colors = d3.scaleOrdinal(d3.schemeCategory10);
        var rx, ry
        let node = this.node
        let link = select(node)
            .selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end','url(#arrowhead)')

        link.append("title")
            .text(function (d) {return d.type;});

        let edgepaths = select(node)
            .selectAll(".edgepath")
            .data(links)
            .enter()
            .append('path')
            .attrs({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'id': function (d, i) {return 'edgepath' + i}
            })
            .style("pointer-events", "none");

        let edgelabels = select(node)
            .selectAll(".edgelabel")
            .data(links)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {return 'edgelabel' + i},
                'font-size': 10,
                'fill': '#aaa'
            });

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) {return '#edgepath' + i})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {return d.type});

        let curNode = select(node)
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                    .on("start", (d) => {
                        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", (d) => {
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    })
                    // .on("end", (d) =>{
                    //     if (!d3.event.active) simulation.alphaTarget(0);
                    //     d.fx = undefined;
                    //     d.fy = undefined;
                    // })
            );

        curNode.append("circle")
            .attr("r", 10)
            .style("fill", function (d, i) {return colors(i);})

        curNode.append("title")
            .text(function (d) {return d.id;});

        curNode.append("text")
            .attr("dy", -3)
            .text(function (d) {return d.name/*+":"+d.label*/;});

        simulation
            .nodes(nodes)
            .on("tick", () => {
                link
                    .attr("x1", function (d) {return d.source.x;})
                    .attr("y1", function (d) {return d.source.y;})
                    .attr("x2", function (d) {return d.target.x;})
                    .attr("y2", function (d) {return d.target.y;});

                curNode
                    .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});

                edgepaths.attr('d', function (d) {
                    //console.log('M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y)
                    return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                });

                edgelabels.attr('transform', function (d, i) {
                    if (d.target.x < d.source.x) {
                        let curEdgeLabel = select('#edgelabel'+String(i)).node()
                        let bbox = curEdgeLabel.getBBox();
                        rx = bbox.x + bbox.width / 2;
                        ry = bbox.y + bbox.height / 2;
                        return 'rotate(180 ' + rx + ' ' + ry + ')';
                    }
                    else {
                        return 'rotate(0)';
                    }
                });
            });

        simulation.force("link")
            .links(links);
    } 

    render(){
        const {width, height} = this.props
        this.createGraph()

        return(
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                        <h1>Course Graph</h1>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <svg    
                        ref={node => this.node = node} 
                        width={width} 
                        height={height} 
                        >
                            <defs>
                                <marker
                                    viewBox={`-0 -5 10 10`}
                                    id={'arrowhead'}
                                    refX={13}
                                    refY={0}
                                    orient={'auto'}
                                    markerWidth={13}
                                    markerHeight={13}
                                    xoverflow={'visible'}
                                >
                                    <path fill={'#999'} style={{stroke: "none"}} d={'M 0,-5 L 10 ,0 L 0,5'}></path>
                                </marker>
                            </defs>
                        </svg>
                    </ExpansionPanelDetails>
                    
                </ExpansionPanel>
            </div>
        )
    }
}