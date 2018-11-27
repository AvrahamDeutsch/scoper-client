export const pageLinkes = {
    selectProject:'/selectProject',
    allVersions: '/scoping/allVersions',
    pdfPreview: '/scoping/pdfPreview',
    newVersion: '/scoping/newVersion',

    projectDescreption: '/scoping/project-descreption',
    actors: '/scoping/actors',
    subjects: '/scoping/subjects',
    userStory: '/scoping/user-story',

    pricing: '/scoping/pricing',
    payment: '/scoping/payment',
    specification: '/scoping/specification',
    
    assumptions: '/scoping/assumptions',
    diagram: '/scoping/diagram',
   
}

// const mainURL = "http://10.2.1.119:3000/api";
const mainURL = "/api";
//  const mainURL = "http://10.2.1.106:3000/api";


export const urlLinks = {
    createNewProject: mainURL + '/project/newProject',
    createNewVersion: mainURL + '/project/newVersion',

    saveActor: mainURL + '/actor',
    saveSubject: mainURL + '/general/subject',
    saveUserStory: mainURL + '/userStory',
    saveGeneralAssumptions: mainURL + '/general/generalAssumptions',
    saveAssumption: mainURL + '/general/assumption',
    savePricing: mainURL + '/pricing',
    saveDiscount: mainURL + '/pricing/discount',
    saveAdditionalPricing: mainURL + '/pricing/additionalPricing',
    saveComment: mainURL + '/pricing/comment',
    saveDiagramLink: mainURL + '/general/diagramLink',
    saveDiagramDescription: mainURL + '/general/diagramDescription',
    savePayment: mainURL + '/pricing/payment',
    saveSpecificationLink: mainURL + '/general/specification/specificationLink',
    saveSpecificationDescription: mainURL + '/general/specification/specificationDescription',
    changeScopingStatus: mainURL + '/pricing/scopingStatus',

    
    editActor: mainURL + '/actor',
    editSubject: mainURL + '/general/subjects',
    editUserStory: mainURL + '/userStory',
    editAssumption: mainURL + '/general/assumption',
    
    deleteActor: mainURL + '/actor',
    deleteSubject: mainURL + '/general/subjects',
    deleteUserStory: mainURL + '/userStory',
    deleteAssumption: mainURL + '/general/assumption',
    
    rejectionExplenation: mainURL + '/general/rejection',
    projectDescription: mainURL + '/general/projectDescription',

    getProjects: mainURL + '/project/allProjects',
    getVersions: mainURL + '/project/allVersions',
    getAldVersionData: mainURL + '/project/version',
    getAllData: mainURL + '/project/allData',
    getUserStories: mainURL + '/userStory/allStories',
}