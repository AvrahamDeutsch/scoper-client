import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';

import { Button, Input } from 'reactstrap';
//import data from '../../rest_API_example_of_task_container.json';
import data from '../../list_of_development_task.json'


class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountInput: this.props.discount,
      pricing: []
    }
  }

  subTotal = () => {
    let total = 0;
    this.props.pricing.map(process => {
      process.containers.map(container => {
        if (!isNaN(parseInt(container.price))) {
          total += parseInt(container.price);
        }
      })
    });
    return total;
  };

  grandTotal = (subTotal) => {
    let discount = this.state.discountInput;
    let grandTotal = subTotal * ((100 - discount) / 100);
    return Math.round(grandTotal);
  }

  render() {

    let subTotal = this.subTotal();

    return (<div>

      {/* <Button color="success" onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA_FROM_EVALUETOR', payload: data })}>Get Data from evaluetor</Button> */}
      {/* <button onClick={()=>store.dispatch({type: 'GET_DATA_FROM_PRICING'})}>Save Data</button> */}
      <div className='pricing'>
      </div>

      {
        this.props.pricing.map((process, i) => {
          return <Process key={i} process={process} ProcessIndex={i} subTotal={this.subTotal} />
        })}
      <h6 className='grandTotal'>{`Sub Total: ${this.subTotal()}`}</h6>
      <div className='grandTotal'>
        Discount %

            <Input type="number"
          value={this.state.discountInput}
          onBlur={() => { store.dispatch({ type: 'SAVE_DISCOUNT', payload: { subTotalPrice: subTotal, discount: this.state.discountInput, grandTotalPrice: this.grandTotal(subTotal) } }) }}
          onChange={e => this.setState({ discountInput: e.target.value })}
        />

      </div>
      <h6 className='grandTotal'>{`Grand Total: ${this.grandTotal(subTotal)}`}</h6>

      <button className='btn btn-primary col-4 mb-2' onClick={() => store.dispatch({ type: 'SAVE_PRICING_DATA', payload: { pricing: this.props.pricing } })}>Save</button>
      <div className='description card' >
        <RichEditor readOnly={false} data={this.props.additionalPricing} save={'SAVE_ADDITIONAL_PRICING'} placeholder='Add pricing...' />
      </div>
    </div>
    );
  }
}



class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processPrice: 0,
      processComment: this.props.process.comment,
      addContainer: false
    }
  }

  componentWillMount() {
    this.processPrice();
  }

  totalDays = null;


  cancelAddContainer = () => {
    this.setState({ addContainer: false });
  }

  processPrice = () => {
    let processPrice = 0;
    this.props.process.containers.map((container, i) => {
      if (!isNaN(parseInt(container.price))) {
        processPrice += parseInt(container.price);
      }
    });
    this.setState({ processPrice: processPrice });
    this.props.subTotal(this.state.processPrice);
  };

  render() {
    this.totalDays = 0;

    return (
      <div className='card my-2'>
        <h3><span className={"font-weight-bold"}>Process: </span>{this.props.process.milestoneName}</h3>

        <div>
          <table className="table table-hover text-left border-bottom">
            <thead>
              <tr>
                <th scope="col">Timeline</th>
                <th scope="col">Days</th>
                <th scope="col">Total price (NIS)</th>
              </tr>
            </thead>
            <tbody>
              {this.props.process.containers.map((container, i) => {
                console.log(container.days);

                if (container.days !== undefined) {
                  this.totalDays += parseInt(container.days);
                }
                return <Container key={i} container={container} containerIndex={i} ProcessIndex={this.props.ProcessIndex} processPrice={this.processPrice} />
              })}
              <tr>
                <td> </td>
                <th >{`Total days ${this.totalDays}`}</th>
                <th >{`Total price ${this.state.processPrice}`}</th>
              </tr>
            </tbody>
          </table>
          {
            this.state.addContainer ? <AddContainer ProcessIndex={this.props.ProcessIndex} cancelAddContainer={this.cancelAddContainer} />
              :
              <button className={'btn btn-primary col-4'} onClick={() => this.setState({ addContainer: true })}>Add Container</button>
          }

          {/* <button className={'btn btn-primary'} onClick={()=>this.setState({addContainer: true})}>Add Container</button> */}
        </div>
        <textarea className='form-control m-2 processComment w-auto'
          value={this.state.processComment}
          onChange={e => this.setState({ processComment: e.target.value })}
          onBlur={e => {
            store.dispatch({ type: 'ADD_COMMENT_TO_PROCESS', payload: { processComment: this.state.processComment, ProcessIndex: this.props.ProcessIndex } });
          }}
        />
      </div>
    )
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceInput: this.props.container.price
    }
  }
  render() {

    return (
      <tr>
        <td className='timeline'>{this.props.container.containerName}</td>
        <td className='days'>{this.props.container.days}</td>
        <td>
          <input className={"form-control"} type="number"
            value={this.state.priceInput}
            onBlur={e => {
              store.dispatch({ type: 'ADD_PRICE_TO_CONTAINER', payload: { price: e.target.value, ProcessIndex: this.props.ProcessIndex, containerIndex: this.props.containerIndex } });
              this.props.processPrice();
            }}
            onChange={e => this.setState({ priceInput: e.target.value })}
          />
        </td>
      </tr>
    )
  }
}

class AddContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      containerName: '',
      price: ''
    }

  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  saveDataToState = () => {
    store.dispatch({ type: 'ADD_CONTAINER_TO_PROCESS', payload: this.state, processIndex: this.props.ProcessIndex });
    this.props.cancelAddContainer();
  }
  saveBtn = () => {
    var inputEmpty = this.state.containerName === '' || this.state.price === '';
    return <div>
      <button className={"btn btn-secondary col-4 mr-1"} onClick={() => this.props.cancelAddContainer()}>Cancel</button>
      <button className={inputEmpty ? 'disabled btn btn-primary col-4 ml-1' : 'btn btn-primary col-4 ml-1'} onClick={this.saveDataToState}>Save</button>
    </div>
  }
  render() {
    console.log(this.props.ProcessIndex);

    return (
      <div className={"col-12"}>
        <input className={"form-control mb-1"} type="text" name='containerName' placeholder='Container name' onChange={this.handleInput} />
        <input className={"form-control mb-1"} type="number" name='price' placeholder='Price' onChange={this.handleInput} />
        {this.saveBtn()}
      </div>
    )
  }
}

export default connect(store => store)(Pricing);

