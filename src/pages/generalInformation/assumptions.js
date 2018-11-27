import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import store from '../../store/store.js';
import axios from 'axios';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import data from '.././../overView.json'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';




class Assumptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalAssumptionsArr: [],
      tempAssum: '',
      variableAssumptionsArr: [],
      selectAll: false,
      displayDeleteDialog: false,
      payload: null
    }
  }

  componentWillMount() {

    var Arr = this.props.generalAssumptions;
    if (Arr.length < 1) {
      data.assumptions.map((elm, i) => { this.state.generalAssumptionsArr.push(false) })
    }
    else {
      var temp = [];
      Arr.map((elm, id) => { elm === 'true' ? temp.push(true) : temp.push(false) })
      this.setState({ generalAssumptionsArr: temp })
      this.setState({ selectAll: temp.every(elm => elm) })
    }
  }


  handleChange = (e) => {

    const id = e.target.id;
    const isChecked = e.target.checked;
    var tempArr = this.state.generalAssumptionsArr.slice();
    tempArr[id] = isChecked;
    this.setState({ generalAssumptionsArr: tempArr })
    this.setState({ selectAll: tempArr.every(elm => elm) })
  }


  // selectAll = () => {

  //   this.setState({ selectAll: !this.state.selectAll })
  //   var arr = []
  //   this.state.generalAssumptionsArr.map(elm => {
  //     arr.push(!this.state.selectAll)
  //   })
  //   this.setState({ generalAssumptionsArr: arr })
  // }

  sendToDB = (type, data) => {

    if (type === 'general') {
      this.props.dispatch({ type: "SAVE_GENERAL_ASSUMPTIONS", payload: data })
    }
    if (type === 'add') {
      this.props.dispatch({ type: "SAVE_ASSUMPTION", payload: data })
    }
  }


  edit = (value, index) => {

    this.props.dispatch({ type: 'EDIT_ASSUMPTION', payload: { assumption: value, index: index } })
  }


  render() {
    return (
      <div className="text-left px-2">
        <h2>Select Assumptions</h2>
        {/* <CustomInput id='selectAll' type='checkbox' label={'Select All'} checked={this.state.selectAll} onChange={this.selectAll} />   */}
        <div>{data.assumptions.map((item, index) => {
          return <FormGroup key={index}>
            <Form>
              <CustomInput
                className='asuumption_row'
                id={index}
                type='checkbox'
                label={item.name}
                checked={this.state.generalAssumptionsArr[index]}
                onChange={(e) => this.handleChange(e)} />
            </Form>
          </FormGroup>
        })}
        </div>
        <div >

          <AddAssumptions
            currentAssumptions={this.props.currentAssumptions}
            handleTextChange={this.handleTextChange}
            sendToDB={this.sendToDB}
            state={this.state}
            edit={this.edit}
            startEdit={this.startEdit} />
        </div>
      </div>
    );

  }
}


class AddAssumptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      index: null,
      editMonde: false
    }
  }


  startEdit = (index) => {

    this.setState({ inputValue: this.props.currentAssumptions[index], index: index, editMonde: true })
  }

  handleTextChange = (e) => {

    this.setState({ inputValue: e.target.value })
  }

  handleBtn = () => {

    if (this.state.editMonde === false) {
      return <button className='btn btn-primary col-4 mr-1' onClick={() => {
        this.props.sendToDB('add', this.state.inputValue);
        this.setState({ inputValue: "" })
      }}>Add</button>
    } else {
      return <button className='editBtn'
        onClick={() => {
          this.props.edit(this.state.inputValue, this.state.index);
          this.setState({ editMonde: false, inputValue: "" })
        }}>
        Edit</button>
    }
  }


  deleteDialog = () => {
    return <div>
      <Modal isOpen={this.state.displayDeleteDialog} toggle={this.toggle} className={this.props.className}>
        <ModalHeader >Are you sure you want to delete the Assumption?</ModalHeader>
        <ModalBody>Deleting the Assumption can not restore.</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { this.delete() }}>Delete</Button>{' '}
          <Button color="primary" onClick={() => this.setState({ displayDeleteDialog: false })}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  }


  delete = () => {

    store.dispatch({ type: "DELETE_ASSUMPTION", payload: this.state.payload })
    this.setState({ displayDeleteDialog: false })
  }

  render() {
    return (
      <div >
        {this.deleteDialog()}
        <div >
          {this.props.currentAssumptions.map((elm, index) => {
            return (
              <div className='asuumption_row' key={index} >
                <div style={{ flex: 11.5 }}>{elm}</div>
                <div className='iconDiv'>
                  <div className='icon btn_delete' onClick={() => { this.setState({ displayDeleteDialog: true, payload: index }) }}>🗑</div>
                  <div className='icon btn_edit' onClick={() => this.startEdit(index)} >✎</div>
                </div>
              </div>
            )
          })}
          <div className='formAssumptionsContainer'>

          <Input className='mb-2' type="textarea" name="text" value={this.state.inputValue} onChange={this.handleTextChange} placeholder='Add Assumption' />
            {/* <textarea
              style={{ width: "100%" }}
              //className='actorDescription'
              value={this.state.inputValue}
              onChange={this.handleTextChange}
              placeholder='Add Assumption'>
            </textarea> */}
            {this.handleBtn()}
            <button className='btn btn-primary col-4 ml-1' onClick={() => { this.props.sendToDB('general', this.props.state.generalAssumptionsArr) }}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(store => store)(Assumptions);