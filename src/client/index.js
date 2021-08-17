//              IMPORT jAVASCRIPT FILES         //

import { checkUrl } from "./js/checkURL";
import { polarityReturn } from "./js/helper";

//              IMPORT SASS&cSS FILES           //
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'
import './styles/loading.scss'


const isLoading = false;    //USED FOR LOADING MODAL 
const ServerBaseUrl = 'http://localhost:8081'
const urlElment = document.getElementById('article-url')

//              TO VLIDATE URL USING CHECK URL AND DIABLE/ENABLE SUBMIT BUTTON         //
export function validateUrl(event){
 
    const url = event.target.value
    const isValid = checkUrl(url)
    console.log(`check ${isValid} `,url);
    document.getElementById('btnSubmit').disabled = !isValid ?   true : false    
}
//              HANDLE SUBMITTING USING(BUTTON/FORM)                //
 
export async function handleSubmit(event){
    event.preventDefault()
    //  Recheck URL and alert user
    const url = urlElment.value
    if(!checkUrl(url)) {
        alert('please input a valid URL first ')
        urlElment.focus()
    }
    else{
        // show loading modal and prevent user from resubmit
        //and post data to server
        ModalShow()
        document.getElementById('section-result').classList.add('hidden')
        const rslt = await postData(ServerBaseUrl + '/addurl',{url: url})
        .then((returnedData) => { 
            if(returnedData === false){ 
                // result from Post Function is false means error while posting/receiving data 
                alert(`ERROR : can't complete analyzing proccess `)   
                ModalHide             
                return false
            }
            // console.log(`returnedData`, returnedData)
            if(returnedData.status.code !=="0"){
                // error from API response shown in alert details
                alert(`error in analyzing url[${url}] \n error details : ${returnedData.status.msg }`)
                ModalHide();
                return false
            }
            //  NO Errors => update UI
            updateUI(returnedData)          
        })
        .catch( er => {
            //addition error handler for developer logging
            ModalHide();
            console.log('Analyzing error :',er)
        } )
        // console.log('rslt',rslt);
    }
}
const postData = async (url ='', data ={}) => {
    // console.log(`POSTDATA url,data`, url,data)
    try {
        var response =await fetch( url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      }
    );
    
        const returnedData = await response.json();
        console.log('new data ' , returnedData);
        return returnedData
    } catch (error) {
        console.log(`Post Data error Res.state[${response.status}] `, error)
        ModalHide()
        if(response.status !== 200){
            alert('invalid Server url, please contact developer for updating url')
            console.log(`response from server status[${response.status}] \n Server[${ServerBaseUrl}] \n 
                requested URl [${url}] \n requested Page [${data.url}]`)
            
        }
        if(error.toString().includes('Failed to fetch')){
            alert(`can't connect to LocalServer @[${ServerBaseUrl}] \n /n 
            checke Server is running and using exact route [${url}]`)
            ModalHide()            
        }
        return false
        ModalHide()
    }
    
}
const updateUI =(returnedData)=>{
     // document.getElementById('text').innerHTML           = 
            //     '<span class="result-title"> text  </span>'+ returnedData.sentence_list[50].text  
    document.getElementById('agreement').innerHTML      = 
        `<h3> agreement  </h3> <p class='condtional-style' data-status="${returnedData.agreement}"> ${returnedData.agreement}  </p>`
    document.getElementById('subjectivity').innerHTML   = 
        `<h3> subjectivity </h3> <p class='condtional-style' data-status="${returnedData.subjectivity}"> ${returnedData.subjectivity}</p>`
    document.getElementById('confidence').innerHTML     = 
        `<h3>confidence</h3> <p> ${returnedData.confidence  }</p><meter min="0" low="90" optimum="100" high="110" max="100" title="${returnedData.confidence  }"  value="${returnedData.confidence  }"> ${returnedData.confidence  }% </meter> `     
    document.getElementById('irony').innerHTML          = 
        `<h3> irony </h3> <p class='condtional-style' data-status="${returnedData.irony}"> ${returnedData.irony}          </p>`
    document.getElementById('score_tag').innerHTML      = 
        `<h3> score_tag </h3> <p class='condtional-style' data-status="${polarityReturn(returnedData.score_tag )}"> ${polarityReturn(returnedData.score_tag )} </p>`
        document.getElementById('section-result').classList.remove('hidden')
    ModalHide()
}


function ModalShow(){
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function ModalHide(){
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}