import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux'

import store from '../../store/store';
import RichEditor from '../../richEditor/richEditor.js'
import '../../richEditor/richEditor.css';
import {Button, Input,  Form} from 'reactstrap';

class Diagram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: this.props.diagramLink
    }
  }

    render() {
        return (
            <div>
                <Form inline>
                    <Input className='col-4 mr-1' type="text" placeholder='Diagram link'
                     onChange={(e) => this.setState({ link: e.target.value })}
                     value={this.state.link} />
                    <button className='btn btn-primary col-4' onClick={() => store.dispatch({ type: 'SAVE_DIAGRAM_LINK', payload: this.state.link })}>Save</button>

                </Form>
                <div className="card mt-3">
                    <RichEditor editMode={true} data={this.props.diagramDescription} save={'SAVE_DIAGRAM_DESCRIPTION'} placeholder='Descibe the diagram...' />
                </div>
                <img src={this.props.diagramLink} alt="" />
            </div>
    );
    }
}


export default connect(store => store)(Diagram);

