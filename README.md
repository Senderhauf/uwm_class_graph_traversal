# uwm_class_graph_traversal

## About

This is a project I've had in mind since I first began college at UWM. I was handed a massive course catalog and told to find my major and pick my classes according to the major requirements. Having the course catalog online was only marginally helpful. 

Once I did have a major that I wanted to pursue, I realized all the courses weren't offered every semester and that some courses were more important to take before others or if I wanted to understand specific content before interning. 

With this project, users will be able to enter in a major's courses, specifying which courses are contingent on others and then be able to iterate through variations of course schedules for their remaining academics. This takes out the hastle of having to keep track in spreadsheets or on paper whether one is on track to graduate and hopefully is a more immediate roadmap of coursework possibilities than having to sitdown with an advisor. 

Please note, this is not a substitute for academic advising as advisors will often know of nuanced contingencies for one's major that are not immediately apparent on paper. Use this software as an ancillary tool to get a feel for where you need to be and verify a courseload with your advisor before enrolling. 

## Setup

npm install 

cd client

npm install

## Run 

npm start

#### NOTE: to run the terminal classesGraph program before the React components are finished try:
>>node ./scripts/classesGraph.js


## Backlog

* Design and Create React components for course route display
* Refactor graphtrace algorithm for use of mongodb
* Create entry form component for courses
* Connect ratemyprofessor API
* Analyze Runtime 
* Refactor to allow node categories of 'necessary'/'non-necessary'
* Finish maxTypeReached implementation



 