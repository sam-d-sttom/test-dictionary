
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

// fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello').then(response => response.json()).then(result => console.log(result))
const input = document.querySelector('#input');
const search = document.querySelector('#search');
const output = document.querySelector('#output');

search.addEventListener('click', result );


async function dic(){
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
    const result = await response.json();
    output.innerText = `Meaning: ${result[0].meanings[0].definitions[0].definition}`
}

function result(){
    dic().catch(error =>  {
        console.log(error)
        output.innerText = 'Error: what you searched might not be a word or you probably made a mistake in the spelling'
    } )
}