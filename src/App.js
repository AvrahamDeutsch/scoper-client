import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { pageLinkes } from './linkes'
import { Row, Col } from 'reactstrap'
import store from './store/store';
// import { Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from 'reactstrap';

import SelectProject from './pages/managmentTools/selectProject.js';
import Versions from './pages/managmentTools/versions.js';
import PDFpreview from './pages/managmentTools/pdfPreview.js';
import CreateNewVersion from './pages/managmentTools/createNewVersion.js';

import ProjectDescription from './pages/scoping/projectDescription.js';
import Form from "./pages/scoping/Form.js";
import UserStories from './pages/scoping/AddUserStory.js';

import Pricing from './pages/pricing/pricing.js';
import Payment from './pages/pricing/payment.js';

import Assumptions from './pages/generalInformation/assumptions.js'
import Diagram from './pages/generalInformation/diagram.js'
import Specification from './pages/generalInformation/specification.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faChevronUp);
/**
 * Crating the side bar;
 */
class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDown: [
        { title: 'managment', isOpen: false },
        { title: 'scoping', isOpen: false },
        { title: 'pricing', isOpen: false },
        { title: 'general', isOpen: false }
      ]
    };
  }


  /**
   * Change the status of drop-down unit
  * @param {Number} index
  */
  dropDownIsOpen = (index) => {
    var newState = this.state.dropDown.slice();
    newState[index].isOpen = !newState[index].isOpen;
    this.setState({ dropDown: newState })
  }


  /**
   * Changing the direction of the arrow if clicked
  * @param {Boolian} bool
  */
  arrowIcon = (bool) => {
    return bool ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />
  }



  render() {


    return (
      <div className='sidebar'>
        <div className='py-2 sidBarItem'>

          <div onClick={() => { this.dropDownIsOpen(0) }}>Managment Tools{this.arrowIcon(this.state.dropDown[0].isOpen)}</div>
          {this.state.dropDown[0].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.selectProject} >Select project</Link>
            <Link className='link' to={pageLinkes.newVersion} >New version</Link>
            <Link className='link' to={pageLinkes.allVersions}>All versions</Link>
            <Link className='link' to={pageLinkes.pdfPreview}>PDF preview</Link>
          </div> : null}
        </div>

        <div className='py-2 sidBarItem'>
          <div onClick={() => { this.dropDownIsOpen(1) }}>Scoping {this.arrowIcon(this.state.dropDown[1].isOpen)}</div>
          {this.state.dropDown[1].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.projectDescreption} >Project Discraption</Link>
            <Link className='link' to={pageLinkes.actors}>Actors</Link>
            <Link className='link' to={pageLinkes.subjects}>Requirement Specifications‏</Link>
            <Link className='link' to={pageLinkes.userStory}>User Story</Link>
          </div> : null}
        </div>
        <div className='py-2 sidBarItem'>
          <div onClick={() => { this.dropDownIsOpen(2) }}>Pricing {this.arrowIcon(this.state.dropDown[2].isOpen)}</div>
          {this.state.dropDown[2].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.pricing}>Pricing</Link>
            <Link className='link' to={pageLinkes.payment}>Payment</Link>
          </div> : null}
        </div>
        <div className='py-2 sidBarItem'>
          <div onClick={() => { this.dropDownIsOpen(3) }}>General Information {this.arrowIcon(this.state.dropDown[3].isOpen)}</div>
          {this.state.dropDown[3].isOpen ? <div className='links' >
            <Link className='link' to={pageLinkes.assumptions}>Assumptions</Link>
            <Link className='link' to={pageLinkes.diagram}>Attach diagram</Link>
            <Link className='link' to={pageLinkes.specification}>Specification (UX)</Link>
          </div> : null}
        </div>

      </div>
    );
  }
}

/**
 * Crating the main screen;
 */
class MainScreen extends Component {
  render() {
    return (
      <div className='mainScreen'>

        <Route path={pageLinkes.selectProject} component={SelectProject} />
        <Route path={pageLinkes.newVersion} component={CreateNewVersion} />
        <Route path={pageLinkes.allVersions} component={Versions} />
        <Route path={pageLinkes.pdfPreview} component={PDFpreview} />

        <Route path={pageLinkes.projectDescreption} component={ProjectDescription} />
        <Route path={pageLinkes.actors} component={this.props.store.scopingStatus ? () => <Form name={'Actor'} dispatchType={'ACTOR'} enableDelete={true} /> : () => <Massege massege='Locked for editing' icon={faLock} />} />
        <Route path={pageLinkes.subjects} component={this.props.store.scopingStatus ? () => <Form name={'Subject'} dispatchType={'SUBJECT'} enableDelete={false} /> : () => <Massege massege='Locked for editing' icon={faLock} />} />
        <Route path={pageLinkes.userStory} component={this.props.store.scopingStatus ? UserStories : () => <Massege massege='Locked for editing' icon={faLock} />} />

        <Route path={pageLinkes.pricing} component={this.props.store.pricingStatus ? Pricing : () => <Massege massege='Waiting for evaluetor' icon={faSpinner} />} />
        <Route path={pageLinkes.payment} component={Payment} />

        <Route path={pageLinkes.assumptions} component={Assumptions} />
        <Route path={pageLinkes.diagram} component={Diagram} />
        <Route path={pageLinkes.specification} component={Specification} />
      </div>
    );
  }
}

class Massege extends Component {
  render() {
    return (
      <div className="massege">

        <h2 className='lightBlue'>{this.props.massege}</h2>
        <FontAwesomeIcon className="fa-10x fa-spin" color='lightBlue' icon={this.props.icon} />

      </div>
    )
  }
}


 class App extends Component {

 async  componentDidMount() {
    const startProjectId = this.props.projectId;
    console.log(startProjectId);
    await store.dispatch({ type: 'GET_PROJECTS', payload:startProjectId });
    // await store.dispatch({type:'START_WITH_PROJECT'})

    if (startProjectId !== undefined) {
      store.dispatch({ type: 'UPDATE_CURRENT_PROJECT_ID', payload: this.props.projectId });
      store.dispatch({ type: 'GET_ALL_DATA' });

    }
    
    console.log( this.props.projectsArray);

  }

  render() {
    return (
      <BrowserRouter >
        <div className=''>
          <div className='header'>
            <header className={'container py-2'}>SCOPER</header>
          </div>
          <div className={'container'}>
            <Row >

              <Col className={"col-3"}><SideBar /></Col>
              <Col className=' col-9 border-dark border-left text-xl-center'><MainScreen store={this.props} /></Col>
            </Row>

          </div>
          <div className='footer'>
            <footer className={'container py-3'}>✎ created by COD Team ©</footer>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}


export default connect(store => store)(App);