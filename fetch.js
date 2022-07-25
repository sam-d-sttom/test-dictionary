
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
const err = document.querySelector('#error');
const div = document.querySelector('div');
const vowels = 'aeiou'

search.addEventListener('click', result );


async function dic(){
    div.innerHTML = ''
    errorOutput.innerText = ''
    if(!/[a-z]/i.test(input.value)) return output.innerText = 'Please input a word'
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
    const result =  await response.json();
    
    result[0].meanings.forEach(meaning => document.querySelector('div').innerHTML += `<p>Part of speech: ${meaning.partOfSpeech}<br>
    Phonetics: ${result[0].phonetic}<br>
    Meaning as ${vowels.includes(meaning.partOfSpeech[0]) ? 'an' : 'a'} ${meaning.partOfSpeech}: ${meaning.definitions[0].definition}</p>`)
}

function result(){
    dic().catch(error =>  {
        console.log(error)
        div.innerHTML = ''
        errorOutput.innerText = 'Error: what you searched might not be a word or you probably made a mistake in the spelling'
    } )
}