# UofT_SnC

make sure to have npm and python 3.x installed

for setup:
  - create a directory for your files
  - before cloning the repo, I recommend to run venv <project_name> to create a virtual environment for your project
  - once this is finished change to <project_name> directory and clone the repo
  - run:
    - npm install 
    - .\Scripts\activate
      - this activates the python virtual environment created in the beginning and is where the python dependencies will be installed
      - use deactivate instead of activate to get out of it
    - pip install req.txt
  - this should build all the javascript and python modules needed
  
for use:
  - this is only created for development as of writing this
  - to start if you created a python virtual environment
    - go to the directory where you cloned the repo
    - run python server.py
      - if you want to run flask set the environment variable FLASK_APP=server.py
      - this will enable you to start the server using: `flask run`
  - the static javascript files are served from webpack-dev-server
    - the link to the static files is in index.html and points to the dev-server
    - the output for the bundle created is controlled in webpack.config file as well as all webpack dependencies
    - the server can be run from .\node_modules\.bin\webpack-dev-server
      - this will create the bundle, host it and dynamically load
  - to access the application go to localhost:5000 (the default port) once both the python and webpack servers are up and running
