/**
 * Code ported to js from java. 
 * Source: https://www.geeksforgeeks.org/find-paths-given-source-destination/
 */

class ClassesGraph {
    constructor(){
        //this.numVertices = numVertices;
        this.adjList = [];
        //don't need to initialize an arraylist of arraylists
    }

    addEdge(u, v){
        while(u >= this.adjList.length || v >= this.adjList.length){
            this.adjList.push([])
        }
        this.adjList[u].push(v);
    }

    printAllPaths(s, d){
        var pathList = []; 
        var isVisited = [];
        
        pathList.push(s);
        
        this.printAllPathsUtil(s,d, isVisited, pathList);        
    }

    printAllPathsUtil(u, d, isVisited, localPathList){
        isVisited[u] = true;
        
        if (u == d){
            console.log(localPathList);
        }

        for (let i of this.adjList[u]){
            if (isVisited[i] != true){
                localPathList.push(i);
                this.printAllPathsUtil(i, d, isVisited, localPathList);

                localPathList.splice(localPathList.indexOf(i), 1);
            }
        }

        isVisited[u] = false;
    }
}

function main(){
    var g = new ClassesGraph();

    g.addEdge(0,1);
    g.addEdge(0,2);
    g.addEdge(0,3);
    g.addEdge(2,0);
    g.addEdge(2,1);
    g.addEdge(1,3);
    g.addEdge(1,7)

    g.printAllPaths(2,7);
}

main();