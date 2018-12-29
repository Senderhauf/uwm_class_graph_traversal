/**
 * Code is ported from java to js 
 * Source: https://www.geeksforgeeks.org/find-paths-given-source-destination/
 * 
 * This version uses a Map object to track nodes of object value
 */

var inquirer = require('inquirer')

class ClassesGraph{
    constructor(){
        /**
         * use map to hold the in-edges, out-edges, edge color lists in adjacency lists  
         *      supports more types 
         *      built in iterator capability
         */
        this.outEdges = new Map()
        this.inEdges = new Map()
        this.outEdgeColors = new Map()
        this.inEdgeColors = new Map()
        this.isVisited = new Map()
    }

    addEdge(u, v, edgeType){
        // add the edge u to all three lists if not in outEdges list
        if (!this.outEdges.has(u)){
            this.outEdges.set(u, new Map())
            this.outEdgeColors.set(u, new Map())
            this.inEdgeColors.set(u, new Map())
            this.inEdges.set(u, new Map())
            this.isVisited.set(u, false)
        }
        // add the edge v to all three lists if not in outEdges list
        if (!this.outEdges.has(v)){
            this.outEdges.set(v, new Map())
            this.outEdgeColors.set(v, new Map())
            this.inEdgeColors.set(v, new Map())
            this.inEdges.set(v, new Map())
            this.isVisited.set(v, false)
        }
        // get the current outEdges list for u, add v, and add the new list to preserve it previous adjacency list
        let uOut = this.outEdges.get(u)
        uOut.set(v, edgeType)
        this.outEdges.set(u, uOut)

        // get the current edgeColors list, add the new edge with the value green, add the updated list back to the edgeColors list
        let uEdg = this.outEdgeColors.get(u)
        uEdg.set(v, 'red')
        this.outEdgeColors.set(u, uEdg)
        
        let vEdg = this.inEdgeColors.get(v)
        vEdg.set(u, 'red')
        this.inEdgeColors.set(v, vEdg)        
        
        // get the current inEdges list for v, add u, and add the new list to preserve it's previous adjacency list
        let vIn = this.inEdges.get(v)
        vIn.set(u, edgeType)
        this.inEdges.set(v, vIn)
    }

    visitValidNode(){
        let arr = Array.from(this.isVisited.keys()).filter(x => this.isVisited.get(x) === false)
        
        if (arr.length == 0){
            return null
        }
        
        return this.visitValidNodeHelper(arr)
    }

    visitValidNodeHelper(validNodes){
        let found = false
        let i = 0
        let nextNodeKey

        while(!found){
            //console.log(`WHILE ${i}`)
            
            nextNodeKey = validNodes[i]
            // check if n has no in-edges
            if (Array.from(this.inEdges.get(nextNodeKey)).length == 0){
                //console.log('DEBUG 1')
                this.nodeVisited(nextNodeKey)
                found = true
            }
            // check n has no red 'and' in-edges
            else if (this.hasNoRedAndInEdges(nextNodeKey)){
                //console.log('DEBUG 2')
                if (this.hasNoOrInEdges(nextNodeKey) || this.hasAtLeastOneOrGreenInEdge(nextNodeKey)){
                    //console.log('DEBUG 3')
                    this.nodeVisited(nextNodeKey)
                    found = true
                }
            }
            else {
                found = false
                //console.log('DEBUG 4')
            }

            i += 1
        }

        return nextNodeKey
    }

    nodeVisited(n){
        // mark n as visited
        this.isVisited.set(n, true)
        //for all n out-edges: mark as green; since out-edges and edge color adjlists are the same use edgecolor adjlist directly
        let uOut = this.outEdgeColors.get(n)
        for (let i of uOut.keys()){
            uOut.set(i, 'green')
        }
        this.outEdgeColors.set(n, uOut)

        // also reset all in edge colors
        for (let i of this.inEdgeColors.keys()){
            let uIn = this.inEdgeColors.get(i)
            for (let j of uIn.keys()){
                if (j == n){
                    uIn.set(j, 'green')
                }
            }
            this.inEdgeColors.set(i, uIn)
        }
    }

    hasNoRedAndInEdges(n){
        let inEdgCol = this.inEdgeColors.get(n)
        let inEdg = this.inEdges.get(n)
        for (let i of inEdgCol.keys()){
            if (inEdgCol.get(i) === 'red' && inEdg.get(i) === 'and'){
                return false
            }
        }
        return true
    }

    hasNoOrInEdges(n){
        let inEdg = this.inEdges.get(n)
        for(let i of inEdg.keys()){
            if (inEdg.get(i) === 'or'){
                return false
            }
        }
        return true
    }

    hasAtLeastOneOrGreenInEdge(n){
        let inEdgCol = this.inEdgeColors.get(n)
        let inEdg = this.inEdges.get(n)

        for (let i of inEdgCol.keys()){
            if (inEdgCol.get(i) === 'green' && inEdg.get(i) === 'or'){
                return true
            }
        }
        return false
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

    //g.addEdge('a','c','and');
    //g.addEdge('a','d','and');
    g.addEdge('e','f','and');
    g.addEdge('b','f','and');
    g.addEdge('g','f','and');
    g.addEdge('g','i','and');
    g.addEdge('h','i','and');

    console.log('HELLO! WELCOME TO CLASS GRAPH TRAVERSAL.')
    
    let i = 1
    console.log(`Valid Node ${i++}: ${g.visitValidNode()}`)
    console.log(`Valid Node ${i++}: ${g.visitValidNode()}`)
    console.log(`Valid Node ${i++}: ${g.visitValidNode()}`)
    console.log(`Valid Node ${i++}: ${g.visitValidNode()}`)
    console.log(`Valid Node ${i++}: ${g.visitValidNode()}`)
    console.log(`Valid Node ${i++}: ${g.visitValidNode()}`)

    console.log('GOODBYE!')

    //g.printAllPaths('c','h');

    //DEBUG
    console.log('\nOUT EDGES ADJACENCY LIST')
    for (let i of g.outEdges.keys()){
        let arr = g.outEdges.get(i)
        console.log(arr)
   }
    //DEBUG
    console.log('\nIN EDGES ADJACENCY LIST')
    for (let i of g.inEdges.keys()){
        let arr = g.inEdges.get(i)
        console.log(arr)
    }
    //DEBUG
    console.log('\nOUT EDGE COLORS')
    for (let i of g.outEdgeColors.keys()){
        let arr = g.outEdgeColors.get(i)
        console.log(arr)
        //console.log(`${arr.map(x => x.key+','+x.value )}`)
    }
    //DEBUG
    console.log('\nIN EDGE COLORS')
    for (let i of g.inEdgeColors.keys()){
        let arr = g.inEdgeColors.get(i)
        console.log(arr)
        //console.log(`${arr.map(x => x.key+','+x.value )}`)
    }
}

main();