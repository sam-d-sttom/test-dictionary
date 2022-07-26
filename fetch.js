const input = document.querySelector('#input');
const errorOutput = document.querySelector('#errorOutput');
const search = document.querySelector('#search');
const err = document.querySelector('#error');
const div = document.querySelector('div');
const sound = document.querySelector('i');
const soundSpan = document.querySelector('#soundSpan');
const vowels = 'aeiou'
let audio;

//This calls the result function on the click of the search button
search.addEventListener('click', result );

sound.addEventListener('click', () => {
        audio.play()
    })

async function dic(){
    //next 3 lines of codes clears the initial output on the DOM so as to replace it with a new one
    div.innerHTML = ''
    errorOutput.innerText = ''
    soundSpan.style.display = 'none'
    //this next line of code checks if a user has inputed a word in the input area
    if(!/[a-z]/i.test(input.value)) return output.innerText = 'Please input a word'
    
    //the interaction of the API and getting the response begins here
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
    const result =  await response.json();

    //checking the paticular path the pronounciation is embeded depending on the word searched
    const pronounciation = result[0].phonetics.find((s) => {
        return s.audio != ''
    })
    audio = new Audio(pronounciation.audio);

    soundSpan.style.display = 'inline'

    //displays the right output in the DOM depending on what word is being searched
    result[0].meanings.forEach(meaning => document.querySelector('div').innerHTML += `<p>Part of speech: ${meaning.partOfSpeech}<br>
    ${result[0].phonetic == undefined ? '' : `Phonetics: ${result[0].phonetic}<br>`}
    Meaning as ${vowels.includes(meaning.partOfSpeech[0]) ? 'an' : 'a'} ${meaning.partOfSpeech}: ${meaning.definitions[0].definition}</p>`);
}

function result(){
    dic().catch(error =>  {
        console.log(error)
        div.innerHTML = ''
        errorOutput.innerText = 'Error: what you searched might not be a word or you probably made a mistake in the spelling'
    } )
}