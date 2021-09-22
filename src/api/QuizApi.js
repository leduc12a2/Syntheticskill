import axiosClient from "./axiosClient"

const QuizApi = {
    getAllQuiz: (params = null) => {
        const url = 'https://opentdb.com/api.php?amount=10&category=21&type=boolean';
        return axiosClient.get(url)
        .then((questions)=> questions.results).catch(
            error => Promise.reject(error)
        )
    }
}
export {
    QuizApi
}