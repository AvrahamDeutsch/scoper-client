import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import store from '../../store/store';
import { Link } from 'react-router-dom'



class CreateNewVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectionStatus: true,
            editorNameStatus: false,
            rejectionExplenation: "",
            editorName: "",
        }
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className='newVersion'>
                {
                    this.state.rejectionStatus ?
                     <div>
                        <textarea placeholder='Rejection explenation' name='rejectionExplenation' className={"form-control"} rows="3" onChange={this.handleInput}></textarea>

                         <div className={"mt-3 mx-0"}>

                             <Link to='/scoping' className='btn btn-secondary col-4 mr-1'>
                                 Cancel
                             </Link>
                             <button className={this.state.rejectionExplenation === '' ? 'btn btn-primary col-4 ml-1 disabled ' : 'btn btn-primary col-4 ml-1'} onClick={() => {
                                 this.setState({ rejectionStatus: false, editorNameStatus: true })
                                 store.dispatch({ type: 'REJECTION_EXPLENATION', payload: this.state.rejectionExplenation })
                             }}>Save rejection explenation</button>
                         </div>
                    </div>
                        : null
                }

                {
                    this.state.editorNameStatus ? 
                    <div className={'form-inline'}>
                        <input type="text" placeholder='Editor name' name='editorName' onChange={this.handleInput} className={'form-control'} />
                        <button className={this.state.editorName === '' ? 'btn btn-primary disabled': 'btn btn-primary'} onClick={() => {
                            this.setState({ editorNameStatus: false });
                            store.dispatch({ type: 'CREATE_NEW_VERSION', payload: this.state.editorName })
                        }}><Link to='/scoping' >Create New Version</Link></button>
                    </div>
                        : null
                }
            </div>
        );
    }
}



export default connect(store => store)(CreateNewVersion);
