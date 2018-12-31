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

    addVertex(u){
        if (!this.outEdges.has(u)){
            this.outEdges.set(u, new Map())
            this.outEdgeColors.set(u, new Map())
            this.inEdgeColors.set(u, new Map())
            this.inEdges.set(u, new Map())
            this.isVisited.set(u, false)
        }
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

    addDummyEdge(dest, arr){
        let dummyNode = dest+'dummy'
        this.addEdge(dummyNode, dest, 'and')
        for (let i of arr){
            this.addEdge(i, dummyNode, 'or')
        }
    }
    visitValidNode(){
        //return null if there are no more valid nodes
        return this.getRandomValidNode() == null ? null : this.visitValidNodeHelper()
    }

    getRandomValidNode(){
        let arr = Array.from(this.isVisited.keys()).filter(x => this.isVisited.get(x) === false)

        if (arr.length == 0){
            return null
        }
        
        //console.log(`DEBUG ARR ${arr}`)

        //is this efficient? will it call duplicate values if the arr is recalculated everytime it is called?
        let min = 0;
        let max = arr.length;
        let randIndex = Math.floor(Math.random() * (+max - +min)) + +min;
        //console.log(`DEBUG min: ${min}, max: ${max}, random index: ${randIndex}`)
        return arr[randIndex]; 
    }

    visitValidNodeHelper(){
        let found = false
        let i = 0
        let nextNodeKey

        while(!found){
            //console.log(`WHILE ${i}`)
            
            nextNodeKey = this.getRandomValidNode()

            //console.log(`DEBUG 1: ${nextNodeKey}`)                

            // if nextNodeKey contains 'dummy' then continue searching (found == false)
            if (nextNodeKey.includes('dummy')){
                this.nodeVisited(nextNodeKey)
            }
            // insert new conditional in 'else if' below
            else if(this.hasNoAndOutEdges(nextNodeKey) && this.hasAtLeastOneOrOutEdge(nextNodeKey)){
                //debug
                //console.log(`DEBUG 2: ${nextNodeKey}`)                
                for(let n of this.outEdges.get(nextNodeKey).keys()){
                    //console.log(`DEBUG 3: ${n}`)
                    let a = !this.isVisited.get(n)
                    let b = !this.hasAtLeastOneOrGreenInEdge(n)
                    //console.log(`DEBUG 3 cont: ${a} ${b}`)
                    if(a && b){
                        this.nodeVisited(nextNodeKey)
                        found = true
                        break
                    }
                }
            }
            // check if n has no in-edges
            else if (Array.from(this.inEdges.get(nextNodeKey)).length == 0){
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

    hasNoAndOutEdges(n){
        let outEdg = this.outEdges.get(n)
        for (let i of outEdg.keys()){
            if (outEdg.get(i) === 'and'){
                return false
            }
        }
        return true
    }

    hasAtLeastOneOrOutEdge(n){
        let outEdg = this.outEdges.get(n)
        for (let i of outEdg.keys()){
            if (outEdg.get(i) === 'or'){
                return true
            }
        }
        return false
    }

    debugAdjacencyLists(){
        //DEBUG
        console.log('\nOUT EDGES ADJACENCY LIST')
        for (let i of this.outEdges.keys()){
            let arr = this.outEdges.get(i)
            console.log(`${i}:`)
            console.log(arr)
        }
        //DEBUG
        console.log('\nIN EDGES ADJACENCY LIST')
        for (let i of this.inEdges.keys()){
            let arr = this.inEdges.get(i)
            console.log(`${i}:`)
            console.log(arr)
        }
        //DEBUG
        console.log('\nOUT EDGE COLORS')
        for (let i of this.outEdgeColors.keys()){
            let arr = this.outEdgeColors.get(i)
            console.log(`${i}:`)
            console.log(arr)
            //console.log(`${arr.map(x => x.key+','+x.value )}`)
        }
        //DEBUG
        console.log('\nIN EDGE COLORS')
        for (let i of this.inEdgeColors.keys()){
            let arr = this.inEdgeColors.get(i)
            console.log(`${i}:`)
            console.log(arr)
            //console.log(`${arr.map(x => x.key+','+x.value )}`)
        }
    }
}

function main(){
    var g = new ClassesGraph();

    /*
    g.addVertex('a')
    g.addEdge('e','f','and');
    g.addEdge('b','f','and');
    g.addEdge('g','f','and');
    g.addEdge('g','i','and');
    g.addEdge('h','i','and');
    */
    
    g.addVertex('cs150')
    g.addEdge('math116','cs250','or')
    g.addEdge('math211','cs250','or')
    g.addEdge('cs250', 'cs251', 'and')
    g.addDummyEdge('cs251', ['math116', 'math211'])
    g.addEdge('cs250', 'cs315', 'and')
    g.addDummyEdge('cs315', ['math116', 'math211'])

    console.log('HELLO! WELCOME TO CLASS GRAPH TRAVERSAL.\n')
    
    let i = 1
    console.log(`Semester ${i++}: `)
    console.log(`${g.visitValidNode()}, ${g.visitValidNode()}, ${g.visitValidNode()}`)

    console.log(`Semester ${i++}: `)
    console.log(`${g.visitValidNode()}, ${g.visitValidNode()}`)

    console.log('\nGOODBYE!')

    //g.debugAdjacencyLists()
}

main();