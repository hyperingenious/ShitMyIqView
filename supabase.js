import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://rallonzumcmiymaghbxo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbGxvbnp1bWNtaXltYWdoYnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMDc0MTEsImV4cCI6MjAzNjY4MzQxMX0.2IoQeHbhvBavXXmJPhJ18QctGRHdT4Wq3X-_-VE9qHM"

const supabase = createClient(supabaseUrl, supabaseKey);

function formatDateString(rawDateString) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(rawDateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

function evaluateCreativity(responses) {
    // Define the questions and their weights
    const questions = [
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

    // Define weights for each question (adjust as needed)
    const weights = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];

    // Ensure responses and questions have the same length
    if (responses.length !== questions.length) {
        throw new Error('Responses length does not match questions length');
    }

    // Calculate total score based on responses
    let totalYes = 0;
    for (let i = 0; i < responses.length; i++) {
        if (responses[i] === 'yes') {
            totalYes += weights[i];
        }
    }

    // Evaluate creativity level based on total score
    if (totalYes <= 10) {
        return "Very Uncreative";
    } else if (totalYes <= 20) {
        return "Creative";
    } else {
        return "Highly Creative";
    }
}

function computeData(data) {
    return data.map(obj => {
        return {
            course: obj.course,
            date: formatDateString(obj.created_at),
            id: obj.id,
            name: obj.name,
            roll_number: obj.roll_number,
            section: obj.section,
            semester: obj.semester,
            creativity_level: evaluateCreativity(obj.answers.preferences),
            answers: obj.answers
        }
    }
    )
}

export async function getData(setData, setDataState) {
    setDataState('loading')
    let { data: allData, error } = await supabase
        .from('Know your intelligence')
        .select('*')

    if (error) {
        console.error(error);
        setDataState('error')
        return
    }

    const computedData = computeData(allData);

    setData(computedData);
    setDataState('success');

    return null;
}