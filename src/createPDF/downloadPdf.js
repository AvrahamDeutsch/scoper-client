import React, { Component } from 'react';
import  jsPDF from 'jspdf';
import data from '../overView.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';


class DownloadPdf extends Component {
    constructor(props) {
        super(props)
    }

    createPdf = () => {
        var doc = new jsPDF();


        var elementHandler = {
            '#img': function (element, renderer) {
                return true;
            },
            '#table': function (element, renderer) {
                return true;
            }
        };

        var margins = {
            top: 15,
            bottom: 15,
            left: 15,
            width: 15
        };        
        var source = document.getElementById('pdfPreview');
        console.log(source);

        doc.fromHTML(
            source,
            15,
            15,
            {
                'width': 180,
                'elementHandlers': elementHandler
            },

            (dispose) => {
              
                doc.save(`${this.props.currentProject}.pdf`);
            },margins
        );

    };

    render() {
        return (
            <div >
                <button className={'btn btn-primary col-4'} onClick={this.createPdf}>Download Pdf<FontAwesomeIcon className={'mx-2'} icon={faDownload} /></button>
            </div>
        )
    }

}

export default connect(store => store)(DownloadPdf);