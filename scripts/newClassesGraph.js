/**
 * Code is ported from java to js 
 * Source: https://www.geeksforgeeks.org/find-paths-given-source-destination/
 * 
 * This version uses a Map object to track nodes of object value
 */

class ClassesGraph{
    constructor(){
        /**
         * use map to hold the adjacency list and edge color lists 
         *      supports more types 
         *      built in iterator capability
         */
        this.adjList = new Map()
        this.edgeColors = new Map()
    }

    addEdge(u, v){
        if (!this.adjList.has(u)){
            this.adjList.set(u, [])
            this.edgeColors.set(u, new Map())
        }
        if (!this.adjList.has(v)){
            this.adjList.set(v, [])
            this.edgeColors.set(v, new Map())
        }
        let uAdj = this.adjList.get(u)
        uAdj.push(v)
        this.adjList.set(u, uAdj)

        let uEdg = this.edgeColors.get(u)
        uEdg.set(v, 'green')
        this.edgeColors.set(u, uEdg)
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
            for (let i of this.adjList.get(u)){
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
    console.log('\nADJACENCY LISTS')
    for (let i of g.adjList){
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