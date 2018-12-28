/**
 * Code is ported from java to js 
 * Source: https://www.geeksforgeeks.org/find-paths-given-source-destination/
 * 
 * This version uses a Map object to track nodes of object value
 */

class ClassesGraph{
    constructor(){
        /**
         * use map to hold the in-edges, out-edges, edge color lists in adjacency lists  
         *      supports more types 
         *      built in iterator capability
         */
        this.outEdges = new Map()
        this.inEdges = new Map()
        this.edgeColors = new Map()
    }

    addEdge(u, v){
        // add the edge u to all three lists if not in outEdges list
        if (!this.outEdges.has(u)){
            this.outEdges.set(u, [])
            this.edgeColors.set(u, new Map())
            this.inEdges.set(u, [])
        }
        // add the edge v to all three lists if not in outEdges list
        if (!this.outEdges.has(v)){
            this.outEdges.set(v, [])
            this.edgeColors.set(v, new Map())
            this.inEdges.set(v, [])
        }
        // get the current outEdges list for u, add v, and add the new list to preserve it previous adjacency list
        let uOut = this.outEdges.get(u)
        uOut.push(v)
        this.outEdges.set(u, uOut)

        // get the current edgeColors list, add the new edge with the value green, add the updated list back to the edgeColors list
        let uEdg = this.edgeColors.get(u)
        uEdg.set(v, 'green')
        this.edgeColors.set(u, uEdg)
        
        // get the current inEdges list for v, add u, and add the new list to preserve it's previous adjacency list
        let vIn = this.inEdges.get(v)
        vIn.push(u)
        this.inEdges.set(v, vIn)
    }

    printAllPaths(s, d){
        var pathList = []
        var isVisited = new Map()
        
        pathList.push(s)

        this.printAllPathsUtil(s,d,isVisited, pathList)
    }

    printAllPathsUtil(u, d, isVisited, localPathList){
        isVisited.set(u, true)
        
        if (u == d){
            console.log('>'+localPathList);
        } 
        else{
            for (let i of this.outEdges.get(u)){
                if (isVisited.get(i) != true){
                    localPathList.push(i);
                    this.printAllPathsUtil(i, d, isVisited, localPathList);
                    console.log(localPathList)
                    localPathList.splice(localPathList.indexOf(i), 1);
                    console.log(localPathList)
                }
            }
        }

        isVisited.set(u, false)
    }
}

function main(){
    var g = new ClassesGraph();

    g.addEdge('a','b');
    g.addEdge('a','c');
    g.addEdge('a','d');
    g.addEdge('c','a');
    g.addEdge('c','b');
    g.addEdge('b','d');
    g.addEdge('b','h')

    g.printAllPaths('c','h');

    //DEBUG
    console.log('\nOUT EDGES ADJACENCY LIST')
    for (let i of g.outEdges){
        console.log(`${i.toString()}`)
    }
    //DEBUG
    console.log('\nIN EDGES ADJACENCY LIST')
    for (let i of g.inEdges){
        console.log(`${i.toString()}`)
    }
    //DEBUG
    console.log('\nEDGE COLORS')
    for (let i of g.edgeColors.keys()){
        let arr = g.edgeColors.get(i)
        console.log(arr)
        //console.log(`${arr.map(x => x.key+','+x.value )}`)
    }
}

main();