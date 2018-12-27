/**
 * Code is ported from java to js 
 * Source: https://www.geeksforgeeks.org/find-paths-given-source-destination/
 * 
 * This version uses a Map object to track nodes of object value
 */

class ClassesGraph{
    constructor(){
        this.adjList = new Map()
    }

    addEdge(u, v){
        if (!this.adjList.has(u)){
            this.adjList.set(u, [])
        }
        if (!this.adjList.has(v)){
            this.adjList.set(v, [])
        }
        let l = this.adjList.get(u)
        l.push(v)
        this.adjList.set(u, l)
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
            console.log(localPathList);
        }

        for (let i of this.adjList.get(u)){
            if (isVisited.get(i) != true){
                localPathList.push(i);
                this.printAllPathsUtil(i, d, isVisited, localPathList);

                localPathList.splice(localPathList.indexOf(i), 1);
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
    for (let i of g.adjList){
        console.log(`${i.toString()}`)
    }
}

main();