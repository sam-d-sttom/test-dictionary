const input = document.querySelector('#input');
const errorOutput = document.querySelector('#errorOutput');
const search = document.querySelector('#search');
const err = document.querySelector('#error');
const searchResult = document.querySelector('#searchResult');
const searchedWord = document.querySelector('#searchedWord');
const clearSearchIput = document.querySelector('#clearSearchIput');
const sound = document.querySelector('#soundIcon');
const soundSpan = document.querySelector('#soundSpan');
const ham = document.querySelectorAll('.ham');
const nav = document.querySelector('nav');
const vowels = 'aeiou'
let audio;

ham.forEach(btn => btn.addEventListener('click', operationHam))

function operationHam(click){
    click.target.classList.contains('openHam') ? nav.style.right = '0%' : nav.style.right = '-100%';
}

// I'm using "click" but it works with any event
document.addEventListener('click', event => {
  const isClickInside = errorOutput.contains(event.target);
  const isClickSearch = search.contains(event.target);

  if (!isClickInside && !isClickSearch) {
    // The click was OUTSIDE the specifiedElement, do something
    errorOutput.style.display = 'none';
  };
})

clearSearchIput.addEventListener('click', ()=>{
    input.value = ''
})

//This calls the result function on the click of the search button
search.addEventListener('click', result);

sound.addEventListener('click', () => {
        audio.play();
    })

async function dic(){
    //next 3 lines of codes clears the initial output on the DOM so as to replace it with a new one
    searchResult.innerHTML = '';
    errorOutput.innerText = '';
    soundSpan.style.display = 'none';
    //this next line of code checks if a user has inputed a word in the input area
    if(!/[a-z]/i.test(input.value)){
        errorOutput.style.display = 'block';
        errorOutput.innerText = 'Please input a word';
        return
    }
    
    //the interaction with the API and getting the response begins here
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
    const result =  await response.json();
console.log(result[0])
    //checking the paticular path the pronounciation is embeded depending on the word searched
    const pronounciation = result[0].phonetics.find((s) => {
        return s.audio != '';
    })
    if(pronounciation != undefined) audio = new Audio(pronounciation.audio);
    

    soundSpan.style.display = 'inline'

    //displays the right output in the DOM depending on what word is being searched
    searchedWord.innerText = `${input.value}`
    result[0].meanings.forEach(meaning => searchResult.innerHTML +=`<div>
    <p>Part of speech: ${meaning.partOfSpeech}<br>
    ${result[0].phonetic == undefined ? '' : `Phonetics: ${result[0].phonetic}<br>`}
    Meaning as ${vowels.includes(meaning.partOfSpeech[0]) ? 'an' : 'a'} ${meaning.partOfSpeech}: ${meaning.definitions[0].definition}</p></div>`);
}

function result(){
    dic().catch(error =>  {
        console.log(error)
        searchResult.innerHTML = ''
        errorOutput.style.display = 'block'
        errorOutput.innerText = 'Error: what you searched might not be a word or you probably made a mistake in the spelling'
    } )
}