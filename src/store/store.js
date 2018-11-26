import { createStore } from 'redux'
import { urlLinks } from '../linkes.js'
import { createNewProject, getData, getPojects, saveData, editData, deleteData } from './axios'
// import pricingData from '../rest_API_example_of_task_container.json';

var state = {
    projectsArray: [],
    currentProject: '',
    versionsArray: [],
    oldVersionNumber: '',
    oldVersionData: null,

    projectDescription: '',
    actorsArray: [],
    subjects: [],

    pricing: [],
    payment: '',
    grandTotalPrice: null,
    discount: '',
    additionalPricing: '',

    generalAssumptions: [],
    currentAssumptions: [],


    diagramLink: '',
    diagramDescription: '',

    specificationLink: '',
    specificationDescription: '',

    scopingStatus: null,
    pricingStatus: null,
}

var reduser = function (state, action) {
    let url = '';
    var newState = { ...state };
    switch (action.type) {
        //Change the status of the scoping;
        case "CHANGE_SCOPING_STATUS":
            url = `${urlLinks.changeScopingStatus}/${newState.currentProject}`;
            editData(url, 'Change scoping status', 'GET_ALL_DATA')
            return newState;
            break;
        //Geting an array of the names and id's of all projects exist;
        case "GET_PROJECTS":
            url = `${urlLinks.getProjects}`;
            getPojects(url, 'UPDATE_STATE_PROJECTS', action.payload);
            return newState;
        // break;
        //Updating the projects to an arr;
        case "UPDATE_STATE_PROJECTS":
            newState.projectsArray = action.payload.slice();
            console.log(newState.projectsArray);
            return newState;

        case "START_WITH_PROJECT":
            newState.projectsArray.map(elm => {
                elm == action.payload ? console.log('YES'):console.log("NO");
                
                
            })

            

            console.log(action.payload)
               
            console.log(newState.projectsArray);
            return newState


        //After selecting a project updating the id of the project to state;
        case "UPDATE_CURRENT_PROJECT_ID":
            newState.currentProject = action.payload;
            return newState;
            break;
        //Geting all the data of the current project;
        case "GET_ALL_DATA":
            url = `${urlLinks.getAllData}/${newState.currentProject}`;
            getData(url, 'UPDATE_STATE');
            return newState;
            break;
        //Updating all the data of the currect projcet to state;
        case "UPDATE_STATE":
            // newState.currentVersion = action.payload._id;
            newState.projectDescription = action.payload.projectDescription;
            newState.actorsArray = action.payload.allActors;
            newState.subjects = action.payload.subjects;

            newState.pricing = action.payload.pricing;
            newState.payment = action.payload.payment;
            newState.grandTotalPrice = action.payload.grandTotalPrice;
            newState.discount = action.payload.discount;
            newState.additionalPricing = action.payload.additionalPricing;

            newState.generalAssumptions = action.payload.generalAssumptions;
            newState.currentAssumptions = action.payload.currentAssumptions;

            newState.diagramLink = action.payload.diagramLink;
            newState.diagramDescription = action.payload.diagramDescription;

            newState.specificationLink = action.payload.specificationLink;
            newState.specificationDescription = action.payload.specificationDescription;

            newState.scopingStatus = action.payload.scopingStatus;
            newState.pricingStatus = action.payload.pricingStatus;

            return newState;
            break;
        //Geting an array of all versions axist in the current project;
        case "GET_VERSIONS":
            url = `${urlLinks.getVersions}/${newState.currentProject}`;
            getData(url, 'UPDATE_STATE_VERSIONS');
            return newState;
            break;
        //Updating the versions to an arr in state;
        case "UPDATE_STATE_VERSIONS":
            newState.versionsArray = action.payload;
            return newState;
            break;
        //After selectin version updates the version number to state;
        case "UPDATE_OLD_VERSION_NUMBER":
            newState.oldVersionNumber = action.payload;
            return newState;
            break;
        //Geting all the data of the old version selected;
        case "GET_OLD_VERSION_DATA":
            url = `${urlLinks.getAldVersionData}/${newState.currentProject}/${newState.oldVersionNumber}`;
            getData(url, 'UPDATE_STATE_OLD_VERSION_DATA');
            return newState;
            break;
        //Updating the ald data to state;
        case "UPDATE_STATE_OLD_VERSION_DATA":
            newState.oldVersionData = action.payload;
            return newState;
            break;
        //Createin new project in DB;
        case "CREATE_NEW_PROJECT":
            url = urlLinks.createNewProject;
            createNewProject(url, action.payload);
            return newState
            break;
        //Createin an new version of a specific project in DB;
        case "CREATE_NEW_VERSION":
            url = `${urlLinks.createNewVersion}/${newState.currentProject}`;
            saveData(url, { editorName: action.payload }, 'GET_ALL_DATA');
            return newState
            break;
        //Adding explenation of rejection project;
        case "REJECTION_EXPLENATION":
            url = `${urlLinks.rejectionExplenation}/${newState.currentProject}`
            saveData(url, { rejectionExplenation: action.payload }, '');
            return newState
            break;
        //Adding project descreption to DB;
        case "PROJECT_DESCREPTION":
            url = `${urlLinks.projectDescription}/${newState.currentProject}`;
            saveData(url, { projectDescription: action.payload }, 'GET_ALL_DATA');
            return newState;
            break;
        //Save actor to DB;
        case "SAVE_ACTOR":
            var actorTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.saveActor}/${newState.currentProject}`;
            saveData(url, actorTemplate, 'GET_ALL_DATA')
            return newState;
            break;
        //Save subject to DB;
        case "SAVE_SUBJECT":
            var subjectTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.saveSubject}/${newState.currentProject}`;
            saveData(url, subjectTemplate, 'GET_ALL_DATA');
            return newState;
            break;
        //Saving user story DB;
        case "SAVE_USER_STORY":
            url = `${urlLinks.saveUserStory}/${newState.currentProject}/${action.payload.indexOfActor}`;
            saveData(url, action.payload.userStory, 'GET_ALL_DATA');
            return newState
            break;

        //Geting data from evaluetor (stil not working!);
        case "GET_DATA_FROM_PRICING":

            url = 'http://fromPricing';
            getData(url, 'SAVE_PRICING_DATA')
            return newState;
            break;

        //Saving the data from evaluetor Api to DB;
        case "SAVE_PRICING_DATA_FROM_EVALUETOR":
            var addProcessToArr = () => {
                var processArr = [];
                action.payload.taskContainers.map(container => {
                    var checkIfNameExist = processArr.every(milestone => container.milestoneName !== milestone.milestoneName);
                    if (checkIfNameExist) {
                        processArr.push({
                            milestoneName: container.milestoneName,
                            containers: [],
                        });
                    }
                })
                return processArr;
            }

            var addContainersToProcess = (data, processArr) => {
                data.map(container => {
                    processArr.map(process => {
                        if (container.milestoneName === process.milestoneName) {
                            process.containers.push(container);
                        }

                    })
                })
            }

            var pricing = addProcessToArr();
            addContainersToProcess(action.payload.taskContainers, pricing);

            url = `${urlLinks.savePricing}/${newState.currentProject}`;
            saveData(url, { pricing: pricing }, 'GET_ALL_DATA');
            return newState;
            break;

        //Saving the pricing data after changed to DB;

        case 'SAVE_PRICING_DATA':
            url = `${urlLinks.savePricing}/${newState.currentProject}`;
            saveData(url, action.payload, 'GET_ALL_DATA')
            return newState;
            break;

        //Adding price to container in state;
        case 'ADD_PRICE_TO_CONTAINER':
            newState.pricing[action.payload.ProcessIndex].containers[action.payload.containerIndex].price = action.payload.price;
            return newState;
            break;
        //Adding comment process to DB;
        case 'ADD_COMMENT_TO_PROCESS':
            newState.pricing[action.payload.ProcessIndex].comment = action.payload.processComment;
            url = `${urlLinks.saveComment}/${newState.currentProject}/${action.payload.ProcessIndex}`;
            saveData(url, { comment: action.payload.processComment }, '')
            return newState;
            break;

        case 'ADD_CONTAINER_TO_PROCESS':

            newState.pricing[action.processIndex].containers.push({ containerName: action.payload.containerName, price: action.payload.price });
            console.log(newState.pricing);
            return newState;
            break;
        //Saving discout to DB;
        case 'SAVE_DISCOUNT':
            url = `${urlLinks.saveDiscount}/${newState.currentProject}`;
            saveData(url, action.payload, '')
            return newState;
            break;
        //Save rich editor pricing data to DB;
        case 'SAVE_ADDITIONAL_PRICING':
            url = `${urlLinks.saveAdditionalPricing}/${newState.currentProject}`;
            saveData(url, { additionalPricing: action.payload }, '');
            newState.additionalPricing = action.payload;
            return newState;
            break;

        case 'SAVE_PAYMENT':
            url = `${urlLinks.savePayment}/${newState.currentProject}`;
            saveData(url, { payment: action.payload }, '');
            newState.payment = action.payload;
            return newState;
            break;

        case 'SAVE_SPECIFICATION_LINK':
            url = `${urlLinks.saveSpecificationLink}/${newState.currentProject}`;
            saveData(url, { specification: action.payload }, '');
            newState.specificationLink = action.payload;
            return newState;
            break;

        case 'SAVE_SPECIFICATION_DESCRIPTION':
            url = `${urlLinks.saveSpecificationDescription}/${newState.currentProject}`;
            saveData(url, { specification: action.payload }, '');
            newState.specificationDescription = action.payload;
            return newState;
            break;


        case "SAVE_GENERAL_ASSUMPTIONS":
            url = `${urlLinks.saveGeneralAssumptions}/${newState.currentProject}`;
            saveData(url, { generalAssumptions: action.payload }, 'GET_ALL_DATA')
            return newState;
            break;

        case "SAVE_ASSUMPTION":
            url = `${urlLinks.saveAssumption}/${newState.currentProject}`;
            saveData(url, { assumption: action.payload }, 'GET_ALL_DATA');
            return newState;
            break;

        case "SAVE_DIAGRAM_LINK":
            url = `${urlLinks.saveDiagramLink}/${newState.currentProject}`;
            console.log(url, { diagram: action.payload });

            saveData(url, { diagram: action.payload }, 'GET_ALL_DATA');
            return newState;
            break;

        case "SAVE_DIAGRAM_DESCRIPTION":
            url = `${urlLinks.saveDiagramDescription}/${newState.currentProject}`;
            saveData(url, { diagram: action.payload }, 'GET_ALL_DATA');
            return newState;
            break;


        case "EDIT_ASSUMPTION":
            url = `${urlLinks.editAssumption}/${newState.currentProject}/${action.payload.index}`;
            editData(url, { assumption: action.payload.assumption }, 'GET_ALL_DATA')
            return newState;
            break;

        case "EDIT_ACTOR":
            var actorTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.editActor}/${newState.currentProject}/${action.payload.editActorIndex}`;
            editData(url, actorTemplate, 'GET_ALL_DATA');
            return newState;
            break;
        //In the meen time we can't edit subject;
        case "EDIT_SUBJECT":
            var subjectTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.editActor}/${action.payload.currentActorId}`;
            editData(url, subjectTemplate, 'GET_ALL_DATA');
            return newState;
            break;

        case "EDIT_USER_STORY":
            url = `${urlLinks.editUserStory}/${newState.currentProject}/${action.payload.indexOfActor}/${action.payload.editUserStoryIndex}`;
            editData(url, action.payload.userStory, 'GET_ALL_DATA')
            return newState;
            break;

        case "DELETE_ACTOR":
            url = `${urlLinks.deleteActor}/${newState.currentProject}/${action.payload.index}`
            deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        //In the meen time we can't delete subject;
        case "DELETE_SUBJECT":
            // var url = `${urlLinks.deleteActor}/${newState.currentVersion}/${action.payload.index}`
            // deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        case "DELETE_ASSUMPTION":
            url = `${urlLinks.deleteAssumption}/${newState.currentProject}/${action.payload}`
            deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        case "DELETE_USER_STORY":
            url = `${urlLinks.deleteUserStory}/${newState.currentProject}/${action.payload.indexOfActor}/${action.payload.storyLocation}`
            deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        default:
            return newState;
            break;
    }
}


var store = createStore(reduser, state)
export default store

