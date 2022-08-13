import React, {useState} from "react";
import Axios from 'axios';
import "./style.css";


export default function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  function GetMeaning(e){
    e.preventDefault();
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
    .then(res=>{
      setData(res.data[0]);
      console.log(data)
    })
  }

  function PlayAudio(){
    const audio = new Audio(data.phonetics[0].audio);
    audio.play()
  }
  return (
    <div className="card">
      <h1>English Dictionary</h1>
      <div className="searchbox">
        <form action="" onSubmit={(e)=>GetMeaning(e)} >
        <input 
            type="search" 
            placeholder="Search Words..." 
            defaultValue={data}
            onChange={(e)=> {
              setSearchWord(e.target.value);
            } }
            
        />
        <button onClick={(e)=> GetMeaning(e)}  type="button" > 🔍 </button>
        </form>
      </div>

      {data ? (
        <div className="result" >
          <p>Searching the meaning of <b> {data.word } </b> </p>
            <h3> {data.word }  ({data.phonetic})
              <span onClick={()=>{
                PlayAudio();
              }} className="speaker"> 🕪 </span>
            </h3>
            <div className="meaning">
              <h3> Meaning</h3>
              <p>
                {data.meanings[0].definitions[0].definition} 
              </p>
            </div>
            <div className="partofspeech">
              <h3> partOfSpeech</h3>
              <p>
                {data.meanings[0].partOfSpeech} 
              </p>
            </div>
            {data.meanings[0].definitions[0].synonyms ? (
              <div className="synonyms">
              <h3> Synonyms</h3>
              <p>
              {data.meanings[0].definitions[0].synonyms}
              </p>
            </div>
            ): 'waiting'}
            <div className="example">
              <h3> Example</h3>
              <p>
              {data.meanings[0].definitions[0].example}
              </p>
            </div>
            
        </div>
      ):" Type the Word "}
      
    </div>
  ); 
}
