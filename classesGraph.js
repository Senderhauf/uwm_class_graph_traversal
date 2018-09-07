
class ClassesGraph {
    constructor(numVertices){
        this.numVertices = numVertices;
        this.adjList = [[],[],[],[]];
        //don't need to initialize an arraylist of arraylists
    }

    addEdge(u, v){
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
    var g = new ClassesGraph(4);

    g.addEdge(0,1);
    g.addEdge(0,2);
    g.addEdge(0,3);
    g.addEdge(2,0);
    g.addEdge(2,1);
    g.addEdge(1,3);

    g.printAllPaths(2,3);
}

main();