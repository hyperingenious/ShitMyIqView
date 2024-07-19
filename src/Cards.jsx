import { useState } from "react"

function Cards({ data }) {
    const [assessmentType, setAssessmentType] = useState(['small', null]);

    return (
        <>
            {assessmentType[0] == "small" && <SmallCards data={data} setAssessmentType={setAssessmentType} />}
            {
                assessmentType[0] == 'large' && <FullAssessment fullData={data[data.findIndex(obj => obj.id == assessmentType[1])]} />
            }
        </>

    )
}

function SmallCards({ data, setAssessmentType }) {
    return (
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data.map((student) => (
                (<div
                    key={student.id}
                    onClick={() => setAssessmentType(['large', student.id])}
                    className="bg-white cursor-pointer rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out"
                >
                    <h2 className="text-xl font-bold mb-2">{student.name}</h2>
                    <p className="text-gray-600 mb-2">{student.course}</p>
                    <p className="text-gray-600 mb-2">Creativity Score: {student.creativity_level}</p>
                    <p className="text-gray-600 mb-2">Section: {student.section}</p>
                    <p className="text-gray-600 mb-2">Semester: {student.semester}</p>
                    <p className="text-gray-600 mb-2">Date: {student.date}</p>
                </div>)
            ))}
        </div>
    )
}


const QuestionCard = ({ question, answer }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">{question}</h3>
        <p className={`text-lg ${answer === 'yes' ? 'text-green-500' : 'text-red-500'}`}>
            {answer.charAt(0).toUpperCase() + answer.slice(1)}
        </p>
    </div>
);

const FullAssessment = ({ fullData }) => {
    const specificQuestions = [
        "If you have given a chance to live 1000 years would you take it?",
        "How are you seeing yourself in next 10 years?",
        "Name the 5 best books you have read?",
        "Do you know Elon Musk, if yes, what you dislike about him vice-versa?",
        "Answer yes if you know any one of these: OSHO, Jiddu Krishnamurti, Naval Ravikant, Richard Feynman, Fyodor Dostoevsky, Jordan Peterson, Richard Dawkins, Friedrich Nietzsche, Acharya Prashant, Alan Turing, Ada Lovelace?"

    ]
    const creativityQuestion = [
        "Do you daydream often?",
        "Do you solve problems in unique ways?",
        "Do you like visiting new places?",
        "Can you think of different answers to a problem?",
        "Do you try new hobbies regularly?",
        "Do you imagine 'what if' scenarios?",
        "Do you enjoy making art or music?",
        "Do you get inspired by your environment?",
        "Do you see patterns others miss?",
        "Do you like variety in your daily routine?",
        "Do you enjoy sharing ideas with friends?",
        "Do you change your space often?",
        "Can you connect unrelated ideas easily?",
        "Do you like to write stories or poems?",
        "Do you enjoy shows with surprising plots?",
        "Do you get excited about new ideas?",
        "Do you prefer working with others on projects?",
        "Do you question traditional methods?",
        "Do you think about future inventions?",
        "Do you look for creative solutions when stuck?",
        "Do you enjoy brainstorming sessions?",
        "Do you like to experiment with new recipes?",
        "Do you often doodle or sketch?",
        "Do you find joy in solving puzzles?",
        "Do you like to learn about different cultures?",
        "Do you often rearrange your schedule?",
        "Do you feel inspired by nature?",
        "Do you enjoy playing games that require strategy?",
        "Do you often create lists of ideas?",
        "Do you like to express your thoughts through writing?"
    ];

    const { preferences, question1, question2, question3, question4, question5 } = fullData.answers;
    const questionsWithAnswers = preferences.map((el, i) => { return { question: creativityQuestion[i], answer: el } });
    const specificAnswers = [question1, question2, question3, question4, question5]
    const additionalQuestions = specificQuestions.map((q, i) => {
        return {
            question: q, answer: specificAnswers[i]
        }
    })


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Creativity Assessment</h1>
                <h1 className="text-2xl font-thin mb-6 uppercase">{fullData.name}</h1>

            </div>
            
            <div>
                <h2 className="text-2xl font-semibold mb-4">Additional Questions</h2>
                {additionalQuestions.map((qa, index) => (
                    <QuestionCard key={index} question={qa.question} answer={qa.answer} />
                ))}
            </div><div className="mb-8">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Initial Questions</h2>
                    <h2 className="text-2xl font-semibold mb-4">Yes {preferences.reduce((count, el) => el == 'Yes' ? count + 1 : count, 0)}/30</h2>
                </div>
                {questionsWithAnswers.map((qa, index) => (
                    <QuestionCard key={index} question={qa.question} answer={qa.answer} />
                ))}
            </div>
        </div>
    );
};

export default Cards
