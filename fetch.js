
// getMessage()

// async function getMessage(){

//     fetch('https://staging.buybyraffle.com/wp-json/api/v2/t-test', {
//     method : 'POST',
//     headers : {
//         'Content-Type' : 'application/json;charset=utf-8'
//     },
//     body : JSON.stringify({
//         'name' : 'samson',
//         'age' : '30'
//     })
//  } )
//  .then(response => response.json())
//  .then(result => {
//     console.log(result)
//  })
// //  const file = await response.json()


// }

// fetch('https://api.dictionaryapi.dev/api/v2/entries/en/game').then(response => response.json()).then(result => console.log(result))


const input = document.querySelector('#input');
const errorOutput = document.querySelector('#errorOutput');
const search = document.querySelector('#search');
const partOfSpeechNoun = document.querySelector('#partOfSpeechNoun');
const phoneticsNoun = document.querySelector('#phoneticsNoun');
const meaningNoun = document.querySelector('#meaningNoun');
const partOfSpeechVerb = document.querySelector('#partOfSpeechVerb');
const phoneticsVerb = document.querySelector('#phoneticsVerb');
const meaningVerb = document.querySelector('#meaningVerb');
const err = document.querySelector('#error');
const allResult = document.querySelectorAll('.all');

search.addEventListener('click', result );


async function dic(){
    allResult.forEach(result => result.innerText = '')
    errorOutput.innerText = ''
    if(!/[a-z]/i.test(input.value)) return output.innerText = 'Please input a word'
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
    const result = await response.json();
    partOfSpeechNoun.innerText = `Part of speech: ${result[0].meanings[0].partOfSpeech}`;
    phoneticsNoun.innerText = `Phonetics: ${result[0].phonetic}`;
    meaningNoun.innerText = `Meaning as a Noun: ${result[0].meanings[0].definitions[0].definition}`;

    if(result[0].meanings.length != 1){
    partOfSpeechVerb.innerText = `Part of speech: ${result[0].meanings[1].partOfSpeech}`;
    phoneticsVerb.innerText = `Phonetics: ${result[0].phonetic}`;
    meaningVerb.innerText = `Meaning as Verb: ${result[0].meanings[1].definitions[0].definition}`;
    }
}

function result(){
    dic().catch(error =>  {
        allResult.forEach(result => result.innerText = '')
        errorOutput.innerText = 'Error: what you searched might not be a word or you probably made a mistake in the spelling'
    } )
}