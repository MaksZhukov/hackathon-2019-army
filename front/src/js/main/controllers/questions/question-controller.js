import axios from 'axios';
import  QuestionsRecord  from 'main/records/questions/question-record';

axios.defaults.baseURL = "http://localhost:3002/";


export async function fetchQuestions() {
    return axios.get(`/question`).then((res) => {
        const data = res.data;
        return data;
    });
}
// export async function fetchSpecialists(Ids) {

//     return axios.post(`/article/bySpecialistIds`,{
//             specialistIds: Ids
//         }).then((res) => {
//         const data = res.data;
//         console.log(res, 111111111111);
//         return data;
//     });
// }

export async function fetchSpecialists() {
    return axios.get(`/specialist`).then((res) => {
        const data = res.data;
        return data;
    });
}


export async function fetchDiseases(Id) {
    return axios.get(`/disease?specialistId=${Id}`).then((res) => {
        const data = res.data;
        return data;
    });
}
