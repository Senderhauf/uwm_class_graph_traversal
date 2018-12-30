# uwm_class_graph_traversal

## Run

node ./scripts/classesGraph.js

## Backlog

* Design and Create React components for course route display
* Refactor graphtrace algorithm for use of mongodb
* Create entry form component for courses
* Connect ratemyprofessor API
* Analyze Runtime 



## Algo:
Represent in-edges and out-edges as adjlists

>Find unvisited node n
>    if n has no in-edges
>        continue
>    
>    elif n has no red 'and' in-edges
>        if n has no 'or' edges || at least 1 green 'or' in-edge
>            continue
>        else
>            return
>    else 
>        return
>
>    add to curSem
>    mark n as visited
>    for all n out-edges
>        mark as green
>    
>    return

 