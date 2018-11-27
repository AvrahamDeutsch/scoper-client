import React, { Component } from 'react'
import data from '../../list_of_development_task.json'
import { connect } from 'react-redux'
import { Table } from 'reactstrap';


/** this class create a table of development tasks list to display in the PDF rreview & PDF file   */
/** TO_DO ===> to connect with the data that comes from Effort Evaluation */



class DevelopmentTasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        this.setState({ list: data })

    }


    render() {
        return (
            <Table id='table' bordered>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Component Type</th>
                        <th>Details</th>
                        <th>Suggested Milestone</th>
                        <th>Assumptions</th>
                    </tr>
                </thead>

                {data.taskContainers.map((task, i) => {
                    return (

                        <tbody key={i}>
                            <tr>
                                <th>{task.taskContainer}</th>
                                <th>{task.category}</th>
                                <th>{task.documentComponentId}</th>
                                <th>{}</th>
                                <th>{}</th>
                            </tr>
                            {task.tasks.map((row, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{row.taskName}</td>
                                        <td>{row.documentComponentId}</td>
                                        <td>{row.details}</td>
                                        <td>{task.milestoneName}</td>
                                        <td>{row.assumptions}</td>
                                    </tr>

                                )
                            })}
                                 

                                </tbody>
                            )
                        })

                
                }

            </Table>
        )
    }
}

export default connect(store => store)(DevelopmentTasks)