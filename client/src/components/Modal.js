import React, { Component } from 'react';
import "../assets/css/modal.css";

class Modal extends Component {

    state = {
        hide: false,
    }
    
    modal = document.querySelector(".modal-bg");

    handleButtonClick = e =>{
        //this.props.appState.setGeneratingMaze(true);

        const modal = document.querySelector(`.${this.props.identifier}`);
        modal.classList.toggle("d-none");
    }

    
    
    
    

    render() {
        return (
            <div className={`modal-bg ${this.props.hide ? "d-none" : ""} ${this.props.identifier}`}>
                <div className="custom-modal px-5 py-4">
                    {
                        this.props.contentJsx
                    }

                    <div className="close">
                        <button className="btn btn-pink" onClick={this.handleButtonClick}>{this.props.closeText} <i className={this.props.closeIcon}></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
