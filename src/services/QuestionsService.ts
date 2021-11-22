import axios from 'axios';
import Question from '../DTOs/Question';
import { QuestionsResponse } from '../DTOs/QuestionsResponse';
import Error from '../DTOs/Error'; 

// would a piece of software someone else that would save the bearer token on the localstore for example 
function authHeader() {
    return {};
}

const QuestionsService = {
  getAnswers
};

// this should be a global variable in a bundler like webpack
const config = {
  apiUrl: 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
}

const mock = 
{
  "response_code": 0,
  "results": [
    {
      "category": "Vehicles",
      "type": "boolean",
      "difficulty": "hard",
      "question": "In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "boolean",
      "difficulty": "hard",
      "question": "This is the correct spelling of &quot;Supercalifragilisticexpialidocious&quot;.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Mythology",
      "type": "boolean",
      "difficulty": "hard",
      "question": "Rannamaari was a sea demon that haunted the people of the Maldives and had to be appeased monthly with the sacrifice of a virgin girl.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "boolean",
      "difficulty": "hard",
      "question": "In Scandinavian languages, the letter &Aring; means river.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Entertainment: Music",
      "type": "boolean",
      "difficulty": "hard",
      "question": "The band STRFKR was also briefly known as Pyramiddd.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Entertainment: Books",
      "type": "boolean",
      "difficulty": "hard",
      "question": "Harry Potter was born on July 31st, 1980.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Science & Nature",
      "type": "boolean",
      "difficulty": "hard",
      "question": "The value of one Calorie is different than the value of one calorie.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Entertainment: Film",
      "type": "boolean",
      "difficulty": "hard",
      "question": "The weapon Clint Eastwood uses in &quot;Dirty Harry&quot; was a .44 Automag.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "category": "Entertainment: Japanese Anime & Manga",
      "type": "boolean",
      "difficulty": "hard",
      "question": "In the &quot;Kagerou Daze&quot; series, Shintaro Kisaragi is prominently shown with the color red.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Entertainment: Film",
      "type": "boolean",
      "difficulty": "hard",
      "question": "YouTube personality Jenna Marbles served as an executive producer of the film Maximum Ride (2016).",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    }
  ]
} as QuestionsResponse;

function getAnswers() : Promise<Question[]> {
    return new Promise(async (resolve, reject) => {
        try
        {
            let request = await axios.request<QuestionsResponse>({url: `${config.apiUrl}`,headers: { ...authHeader()}});

            if(request.data.response_code !== 0) {
                reject({title: "Error", message: "it was not a succesful request"} as Error)
            }

            //let response = mock.results as Question[];
            let response = request.data.results as Question[];

            resolve(response);
        }
        catch(e)
        {
            reject({title: "Error Server", message: "The server is not responding"} as Error)
        }
    });
}

export default QuestionsService;