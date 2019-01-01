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
        // this.outEdgeColors = new Map()
        // this.inEdgeColors = new Map()
        this.isVisited = new Map() // sorted map
    }

    addVertex(u){
        if (!this.outEdges.has(u)){
            this.outEdges.set(u, new Map())
            this.inEdges.set(u, new Map())
            this.isVisited.set(u, false)    
        }
    }

    addEdge(u, v, edgeType){
        // add the edge u to all three lists if not in outEdges list
        if (!this.outEdges.has(u)){
            this.outEdges.set(u, new Map())
            this.inEdges.set(u, new Map())
            this.isVisited.set(u, false)
        }
        // add the edge v to all three lists if not in outEdges list
        if (!this.outEdges.has(v)){
            this.outEdges.set(v, new Map())
            this.inEdges.set(v, new Map())
            this.isVisited.set(v, false)
        }
        // get the current outEdges list for u, add v, and add the new list to preserve it previous adjacency list
        let uOut = this.outEdges.get(u)
        uOut.set(v, edgeType)
        this.outEdges.set(u, uOut)

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

    visitValidNodes(num){
        //return null if there are no more valid nodes
        if (num <= 0){
            return null
        }

        let currentGroup = []
        this.visitValidNodeHelper(currentGroup, num)
        currentGroup.map(x => this.isVisited.set(x, true))

        return currentGroup
    }

    visitValidNodeHelper(currentGroup, groupSize){
        let nextNodeKey
        let counter = 0

        while (counter < 30 && currentGroup.length < groupSize){
            counter++   // counter placed at beginning of while loop in case 'continue' logic encountered

            nextNodeKey = this.getRandomNotVisitedNode()
            //console.log(`DEBUG nextNodeKey: ${nextNodeKey}`)
            if(nextNodeKey === null){
                return currentGroup
            }
            else if (currentGroup.includes(nextNodeKey)){
                continue
            }
            else if (nextNodeKey.includes('dummy')){
                this.isVisited.set(nextNodeKey, true)
            } 
            else if (this.isValidVisitableNode(nextNodeKey, currentGroup)){
                //check whether n is a competing dependency
                let addNextNodeKey = true

                if (this.hasOrOutEdges(nextNodeKey)){
                    // this right now works on the assumption that if a node has 'or' out-edges it will not have 'and' out edges
                    // need to figure out a way to make the filtering of only 'or' edges work with the arraysAreEqual method
                    let nextNodeKeyOrOutEdges = Array.from(this.outEdges.get(nextNodeKey).keys())

                    for (let node of currentGroup){
                        let nodeOrOutEdges = Array.from(this.outEdges.get(node).keys())
                        if (this.arraysAreEqual(nextNodeKeyOrOutEdges, nodeOrOutEdges)){
                            addNextNodeKey = false
                            break
                        }
                    }
                }
                
                if(addNextNodeKey){
                    currentGroup.push(nextNodeKey)
                }
            }
            counter++
        }

        return currentGroup
    }

    /**
     * This function returns the name of a valid node that has not been visited and is eligible to be visited.
     */
    getRandomNotVisitedNode(){
        let arr = Array.from(this.isVisited.keys()).filter(x => this.isVisited.get(x) === false)
        //console.log(`DEBUG Not Visited: ${arr}`)
        if (arr.length == 0){
            return null
        }
        
        //is this efficient? will it call duplicate values if the arr is recalculated everytime it is called?
        let min = 0;
        let max = arr.length;
        let randIndex = Math.floor(Math.random() * (+max - +min)) + +min;
        //console.log(`DEBUG Random index: ${randIndex}`)
        return arr[randIndex]; 
    }

    /**
     * Eligibility requirements for valid node n include:
     *      if n has 'and' in-edges (m -> n), all m have been visited
     *      if n has 'or' in-edges (m -> n) at least one has been visited
     * @param {string} node 
     */
    isValidVisitableNode(node, currentGroup){
        let curGroupCopy = currentGroup

        // Requirement 1: n has no in-edges and no out-edges
        if (Array.from(this.inEdges.get(node)).length === 0 && Array.from(this.outEdges.get(node)).length === 0){
            //console.log(`DEBUG REQ 1: ${node}`)
            return true
        }
        if(this.hasOrOutEdges(node)){
            //console.log(`DEBUG REQ 2: ${node}`)
            return this.shouldVisitCompetingDependency(node, curGroupCopy) ? true : false
        }
        // Requirement 3: n has 'and' in-edges (m -> n), all m have been visited
        if (this.hasAndInEdges(node)){
            //console.log(`DEBUG REQ 3: ${node}`)
            return this.allAndInEdgesAreVisited(node) ? true : false
        }
        // Requirement 4: n has 'or' in-edges (m -> n) at least one has been visited
        if (this.hasOrInEdges(node)){
            //console.log(`DEBUG REQ 4: ${node}`)
            return this.hasAtLeastOneOrVisitedInEdge(node) ? true : false            
        }

        return true
    }

    arraysAreEqual(n, m){
        for (let i of n){
            if (!m.includes(i)){
                return false
            }
        }
        for (let i of m){
            if (!n.includes(i)){
                return false
            }
        }
        return true
    }

    allAndInEdgesAreVisited(n){
        let nInEdges = this.inEdges.get(n)
        for (let edge of nInEdges.entries()){
            let edgeName = edge[0]
            let edgeType = edge[1]
            if (edgeType === 'and' && this.isVisited.get(edgeName) === false){
                return false
            }
        }
        return true
    }

    hasOrInEdges(n){
        let inEdg = this.inEdges.get(n)
        for(let i of inEdg.keys()){
            if (inEdg.get(i) === 'or'){
                return true
            }
        }
        return false
    }

    hasOrOutEdges(n){
        let outEdg = this.outEdges.get(n)
        for(let i of outEdg.keys()){
            if (outEdg.get(i) === 'or'){
                return true
            }
        }
        return false
    }

    hasAndInEdges(n){
        let inEdg = this.inEdges.get(n)
        for(let i of inEdg.keys()){
            if (inEdg.get(i) === 'and'){
                return true
            }
        }
        return false
    }

    hasAtLeastOneOrVisitedInEdge(n){
        let nInEdges = this.inEdges.get(n)
        for (let edge of nInEdges.entries()){
            let edgeName = edge[0]
            let edgeType = edge[1]
            if (edgeType === 'or' && this.isVisited.get(edgeName) === true){
                return true
            }
        }
        return false
    }

    /**
     * METHOD CASE: n has competing dependency edges
     *      n has 'or' out-edges that are the same as other nodes
     *      visit as few as possible non-necessary nodes with 'or' out-edges
     *      foreach node i in n.out-edges that is not visited:
     *          if all nodes in dest.in-edges (not including n) are not visited:
     *              visit n
     */
    shouldVisitCompetingDependency(n, curGroup){
        let curGroupCopy = curGroup
        // get all non visited 'or' out-edges of n
        let nOutEdgesNotVisited = Array.from(this.outEdges.get(n).entries()).filter(x => x[1] === 'or' && this.isVisited.get(x[0]) === false )
        //console.log(`DEBUG ${n} nOutEdgesNotVisited: ${nOutEdgesNotVisited}`)
        for (let node of nOutEdgesNotVisited){
            //console.log(`DEBUG node: ${node}`)
            for (let inEdge of this.inEdges.get(node[0]).entries()){
                //console.log(`DEBUG inEdge: ${inEdge}`)
                if (inEdge[0] != n && inEdge[1] === 'or' && this.isVisited.get(inEdge[0]) === false){
                    return true
                }
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
        console.log('\nIS VISITED')
        for (let i of this.isVisited.keys()){
            let arr = this.isVisited.get(i)
            console.log(`${i}:`)
            console.log(arr)
        }

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
    
    g.addEdge('cs150', 'cs250', 'and')
    g.addEdge('math116','cs250','or')
    g.addEdge('math211','cs250','or')
    g.addEdge('cs250', 'cs251', 'and')
    g.addDummyEdge('cs251', ['math116', 'math211'])
    g.addEdge('cs250', 'cs315', 'and')
    g.addDummyEdge('cs315', ['math116', 'math211'])
    //g.addDummyEdge('cs317', ['math226', 'math221', 'math231'])
    g.addEdge('cs250', 'cs317', 'and')

    console.log('HELLO! WELCOME TO CLASS GRAPH TRAVERSAL.\n')
    
    let i = 1
    console.log(`Semester ${i++}: `)
    console.log(`${g.visitValidNodes(2)}`)

    console.log(`\nSemester ${i++}: `)
    console.log(`${g.visitValidNodes(2)}`)

    console.log(`\nSemester ${i++}: `)
    console.log(`${g.visitValidNodes(2)}`)

    console.log(`\nSemester ${i++}: `)
    console.log(`${g.visitValidNodes(2)}`)

    console.log('\nGOODBYE!')

    //g.debugAdjacencyLists()
}

main();