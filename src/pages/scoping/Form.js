import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

/**
 * The Form class creats the 'Actors' and the 'requirment specifications' forms:
 *     the params by the props are:
 *          1. "name" change the place holder by the inputs, and tell him to which data to refer to:
 *          2. "dispatchType" which dispach to go to:
 *          3. "enableDelete" 'true or false' enable to delete or edit the data:
 */
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
            descriprionInput: '',
            editActorIndex: '',
            currentActorId: '',
            editMonde: false,
            deleteMode: false
        }
    }

    /**
     * Handles the changes of the input and update the state: 
     * Params:
     *   'inputName' the name by the state:
     *   'value' the value to pass to the state:
     */
    handleInput = (inputName, value) => {
        this.setState({ [inputName]: value });
    }

    /**
     * send the form to store to save in DB:
     */
    saveForm = () => {
        this.props.dispatch({
            type: `SAVE_${this.props.dispatchType}`, payload: {
                name: this.state.nameInput,
                description: this.state.descriprionInput,
            }
        });
        this.setState({ nameInput: '', descriprionInput: '' });
    }

    editActor = () => {
        this.props.dispatch({
            type: `EDIT_${this.props.dispatchType}`, payload: {
                editActorIndex: this.state.editActorIndex,
                currentActorId: this.state.currentActorId,
                name: this.state.nameInput,
                description: this.state.descriprionInput,
            }
        });
        this.setState({ editMonde: false, nameInput: '', descriprionInput: '' });
    }

    cancelEditActor = () => {
        this.setState({ editMonde: false, nameInput: '', descriprionInput: '' });
    }

    startEditActor = (actorName, actorDescription, index, currentActorId) => {
        this.setState({ editMonde: true, nameInput: actorName, descriprionInput: actorDescription, editActorIndex: index, currentActorId: currentActorId });
    }

    deleteActor = (index, currentActorId) => {
        this.props.dispatch({ type: `DELETE_${this.props.dispatchType}`, payload: { index, currentActorId } })
    }

    startDeleteActor = (index, currentActorId) => {
        this.setState({ deleteMode: true, editActorIndex: index, currentActorId: currentActorId })
    }

    cancelDeleteActor = () => {
        this.setState({ deleteMode: false });
    }

    deleteDialog = () => {
        return <div>
            <Modal isOpen={this.state.deleteMode} toggle={this.toggle} className={this.props.className}>
                <ModalHeader >Are you sure you want to delete the actor?</ModalHeader>
                <ModalBody>Deleting the Actor will delete all the user stories its contains</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.deleteActor(this.state.editActorIndex, this.state.currentActorId)}>Delete</Button>{' '}
                    <Button color="primary" onClick={this.cancelDeleteActor}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }


    render() {
        return (
            <div className='formContainer'>
                {this.deleteDialog()}
                <FormActorInput
                    name={this.props.name}
                    state={this.state}
                    handleInput={this.handleInput}
                    saveForm={this.saveForm}
                    editActor={this.editActor}
                    cancelEditActor={this.cancelEditActor}
                />

                <ShowActors
                    name={this.props.name}
                    store={this.props}
                    enableDelete={this.props.enableDelete}
                    startEditActor={this.startEditActor}
                    startDeleteActor={this.startDeleteActor}
                    deleteActor={this.deleteActor}
                />
            </div>
        )
    }
}

class FormActorInput extends Component {

    saveBtn = (input, textarea, click) => {
        var inputEmpty = input === '' || textarea === '';
        return <button className={inputEmpty ? 'disabled btn btn-primary col-4' : 'btn btn-primary col-4'} onClick={click}>Add</button>
    }

    editBtn = () => {
        return <div>
            <button className='btn btn-secondary mr-1' onClick={this.props.cancelEditActor}>Cancel</button>
            <button className='btn btn-primary ml-1' onClick={this.props.editActor}>Update</button>
        </div>
    }

    render() {
        return (
            <div>
                <input className='form-control mb-1' placeholder={`${this.props.name} name`} value={this.props.state.nameInput}
                    onChange={e => this.props.handleInput('nameInput', e.target.value)} />
                <textarea className='form-control mb-1' placeholder={`${this.props.name} descriprion`} value={this.props.state.descriprionInput}
                    onChange={e => this.props.handleInput('descriprionInput', e.target.value)} />
                {this.props.state.editMonde ? this.editBtn() : this.saveBtn(this.props.state.nameInput, this.props.state.descriprionInput, this.props.saveForm)}
            </div>
        )
    }
}
class ShowActors extends Component {
    arr = null;
    updtaeArr = () => {
        if (this.props.name === 'Actor') {
            this.arr = this.props.store.actorsArray;
        } else {
            this.arr = this.props.store.subjects;
        }
    }

    render() {
        this.updtaeArr()
        return (
            <div className='showActors mt-1'>

                {this.arr.map((elm, index) => {
                    return <div id='actorView' key={index}>
                        <div className='details'>
                            <u>{elm.name}</u>
                            <p>{elm.description}</p>
                        </div>

                        {this.props.enableDelete ? <div className='iconDiv'>
                            <div className='icon' onClick={() => this.props.startEditActor(elm.name, elm.description, index, elm._id)}><FontAwesomeIcon icon={faEdit}/></div>
                            <div className='icon' onClick={() => this.props.startDeleteActor(index, elm._id)}><FontAwesomeIcon icon={faTrashAlt}/></div>
                        </div> : null}
                    </div>
                })}
            </div>
        )
    }
}

export default connect(store => store)(Form);
