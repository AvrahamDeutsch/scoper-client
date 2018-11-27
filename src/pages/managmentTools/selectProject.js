import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import store from '../../store/store.js';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PrintButton from '../../createPDF/PrintButton.js'
import {Col, FormGroup, Input, Label, Row} from "reactstrap";

import SendDataToEvaluetor from './sendDataToEvaluetor.js'


class SelectProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPdf: false
        }
    }
    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="exampleSelect" sm={2}>Select</Label>
                    <Input type="select" name="select" id="exampleSelect"
                           defaultValue={this.props.currentProject} onChange={(e) => {
                        store.dispatch({ type: 'UPDATE_CURRENT_PROJECT_ID', payload: e.target.value });
                        store.dispatch({ type: 'GET_ALL_DATA' });
                    }}>
                        {/* <option value='' style={{ color: 'red' }} >Select project</option> */}
                        {this.props.projectsArray.map((elm, i) => {
                            return <option key={elm._id} value={elm._id}>{elm.projectName}</option>})}
                    </Input>
                </FormGroup>
                {this.props.currentProject === '' ? <CreateNewProject /> :null}
                <SendDataToEvaluetor/>
            </div>
        );
    }
}

class CreateNewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            editorName: '',
        }
    }

    saveBtn = () =>{
        var inputEmpty = this.state.projectName === '' || this.state.editorName === '';
       return <button className={inputEmpty ? 'btn btn-primary disabled col-4': 'btn btn-primary col-4'} onClick={() => {
           store.dispatch({type: 'CREATE_NEW_PROJECT', payload: this.state})
            this.setState({ projectName: '', editorName: ''})
            }}><Link to='/scoping' >Create New Project</Link></button>
    }
    render() {
        return (
            <div className='newProject'>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="ProjectName">Project Name</Label>
                            <Input type="text" name="ProjectName" id="ProjectName"
                                   value={this.state.projectName} onChange={(e) => {
                                this.setState({ projectName: e.target.value })
                            }} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="Editor name">Editor name</Label>
                            <Input type="text" name="EditorName" id="EditorName"
                                   value={this.state.editorName} onChange={(e) => {
                                this.setState({ editorName: e.target.value })
                            }} />
                        </FormGroup>
                    </Col>
                </Row>
                {this.saveBtn()}
            </div>
        );
    }
}




export default connect(store => store)(SelectProject);
