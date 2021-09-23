import React, { Component } from 'react';
import '../assets/css/instructions.css';

import instructions from '../assets/jsx/instructions';

import Modal from './Modal';

class Instructions extends Component {

    state = {
        show: false
    }

    handleHideClick = (e) => {
        
        this.setState({show: true})

    }

    
    
    
    

    render() {
        return (
            <>
                <button className="inst-icon btn fs-3" onClick={this.handleHideClick}><i class='bx bxs-info-circle' ></i></button>

                {this.state.show && <Modal contentJsx={instructions} hide={false} closeText="Makes sense" closeIcon="bx bx-check" identifer="inst-modal"/>}
            </>
        )
        
    }
}

export default Instructions;
