import axios from 'axios';
import { apiConfig } from './config';
import {reactLocalStorage} from 'reactjs-localstorage';

const cleanUp = function(name) {
    var clean_name = name.split(' ').join('_');
    clean_name = clean_name.toLowerCase();
    return clean_name;
}

const { apiUrl } = apiConfig;
const callApi = (method, url, params) => {
    let school_name = reactLocalStorage.get('school_name');
    let db_name = 'db_'+cleanUp(school_name);
    const apiEndpoint = apiUrl + url;
    const headers = {
        'x-key-db':db_name
        //Authorization : 'Bearer ' + authToken
    };
    const requestObj = {
        url : '',
        method : '',
        params : {},
        data : {},
        headers : {},
    };
    let defHttpMethod = 'get';
    switch(method) {
        case 'POST':
            defHttpMethod = 'post';
            requestObj.data = params;
            break;
        case 'GET':
            defHttpMethod = 'get';
            requestObj.params = params;
            break;
        case 'HEAD':
            defHttpMethod = 'head';
            requestObj.params = params;
            break;
        default:
            defHttpMethod = 'get';
    }
    requestObj.method = defHttpMethod;
    requestObj.headers = headers;
    requestObj.url = apiEndpoint;
    return axios(requestObj);
};


const teacherApi = {
    addTeacher : (params) => {
        return callApi('POST','teacher', params);
    },
    getTeachers : (params) => {
        return callApi('GET', 'teacher', params);
    },
    getPlotsByQualification : (params) => {
        return callApi('GET', 'get_plots_by_qualification', params);
    },
    
}
const loginApi = {
    login : (params) => {
        console.log(params);
        return callApi('POST','login', params);
    },
}


const subjectApi ={
    getSubjects: (params) => {
        return callApi('GET','subjects', params);
    },
    addSubject: (params) => {
        return callApi('POST','subjects', params);
    }
}

const classApi = {
    getClasses: (params) => {
        console.log(params)
        return callApi('GET','classes', params);
    },
    addClasses: (params) => {
        return callApi('POST','classes', params);
    },   
    updateClass: (params) => {
        return callApi('POST','update_teacher_map', params);
    },  
}

const holidayApi = {
    getHolidays: (params) => {
        return callApi('GET','holiday', params);
    },
    addHoliday: (params) => {
        return callApi('POST','holiday', params);
    },   
    updateHoliday: (params) => {
        return callApi('POST','update_holiday', params);
    },  
}

export {teacherApi , loginApi , subjectApi , classApi , holidayApi}
