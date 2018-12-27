# uwm_class_graph_traversal

## Backlog

* Design and Create React components for course route display
* Refactor graphtrace algorithm for use of mongodb
* Create entry form component for courses
* Connect ratemyprofessor API



## Algo:
Find unvisited node n
    if n has no 'red' in-edges
        if at least 1 'or' in-edge
            add to curSem
            mark n as visited
            for all n out-edges
                mark as green
