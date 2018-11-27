import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';

class Payment extends Component {

  render() {
    return (
      <div className='card' >
          <RichEditor editMode={true} data={this.props.payment} save={'SAVE_PAYMENT'} placeholder="Add payment"/>
      </div>
    );

  }
}
export default connect(store => store)(Payment);