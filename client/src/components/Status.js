import React, { Component } from 'react';
import "../assets/css/status.css";

class Status extends Component {

    iconClassnames = {
        notStarted : 'bx-x-circle',
        inProgress : "bx-loader-circle",
        complete: "bx-check-circle",
    }

    componentDidUpdate(prevProps, prevState) {
        const statusIndicators = document.querySelectorAll('.status-desc');
        
        statusIndicators.forEach( item => {
            if (item.classList.contains("maze")){
                const icon = item.children[1];
                if (this.props.appState.generatingMaze) {
                    

                    icon.children[0].classList.remove(this.iconClassnames.notStarted);
                    icon.children[0].classList.add(this.iconClassnames.inProgress);
                    

                }

                if (this.props.appState.mazeGenerated) {

                    item.classList.remove('text-dark');
                    item.classList.add('text-pink');

                    icon.children[0].classList.remove(this.iconClassnames.inProgress);
                    icon.children[0].classList.add(this.iconClassnames.complete);

                }
            }

            if (item.classList.contains("path")){
                const icon = item.children[1];

                if (this.props.appState.pathFinding) {
                    icon.children[0].classList.remove(this.iconClassnames.notStarted);
                    icon.children[0].classList.add(this.iconClassnames.inProgress);
                }

                if (this.props.appState.pathFound){
                    item.classList.remove('text-dark');
                    item.classList.add('text-pink');

                    icon.children[0].classList.remove(this.iconClassnames.inProgress);
                    icon.children[0].classList.add(this.iconClassnames.complete);
                }
            }
        })

        const { maze, path } = this.props.appState.times;

        if (maze.start && maze.end){
            console.log((maze.end - maze.start)/1000)
        }
    }
    

    render() {
        const { maze, path } = this.props.appState.times;
        return (
            <div className="status p-3">
                <h4 className="text-pink">Status</h4>
                <div className="status-desc maze text-dark">
                    <p className=" fw-light my-1  me-2 status-text">Generating Maze </p>
                    <p className=" fw-light my-1 status-icon"><i class='bx bx-x-circle'></i></p>
                </div>

                {maze.start && maze.end && <p className="text-dark fw-light my-0"><small>{Math.round((maze.end - maze.start)/1000)}s</small></p>}
                
                <div className="status-desc path text-dark ">
                    <p className=" fw-light my-1 me-2 status-text">Finding Path </p>
                    <p className=" fw-light my-1 status-icon"><i class='bx bx-x-circle'></i></p>
                </div>

                {path.start && path.end && <p className="text-dark fw-light my-0"><small>{Math.round((path.end - path.start)/1000)}s</small></p>}
                
            </div>
        );
    }
}

export default Status;
