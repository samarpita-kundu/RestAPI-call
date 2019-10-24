import React , {Component} from 'react'
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import axios from 'axios';
import WordDetails from './WordDetails';
import '../css/wordDetails.css';

class GetWords extends Component{
    constructor(props){
        super(props)
        this.state = {
            wordInformation : [],
            link : [],
            semanticallySimilarWords : [],
            errorMsg : '',
            isLoaded : false
        }
        
    }

    componentDidMount(){
        const language=this.props.language;
        const word=this.props.word;
        const apiKey =this.props.apiKey;
        axios.get(`https://api.gavagai.se/v3/lexicon/${language}/${word}?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=${apiKey}&polarizeWord=false`)
        .then(
            response => {
                console.log(response.data.semanticallySimilarWords);
                console.log(response.data.wordInformation);
                console.log(response.data.wordInformation.additionalInformation);
                this.setState({semanticallySimilarWords : response.data.semanticallySimilarWords})
                this.setState({wordInformation : response.data.wordInformation})
                this.setState({link : response.data.wordInformation.additionalInformation})
                this.setState({isLoaded : true})
            }
        ).catch(error=>{
            console.log(error)
            this.setState({isLoaded : true})
            this.setState({errorMsg : 'Error Retreiving data'})
        })
    }

    render(){
        const {semanticallySimilarWords, wordInformation,link, isLoaded} = this.state;

        return (
            <BrowserRouter>
            {isLoaded ?
            <div>
                 {wordInformation.length ?
                 <div className="wordInformation">
            <h2>Word Information</h2>
            <table>
               
                <tbody>
                    
                <tr>  
                    <td>Frequency</td>
                    <td>{wordInformation.frequency}</td>
                </tr>
                <tr>  
                    <td>Word</td>
                    <td>{wordInformation.word}</td>
                </tr>
                <tr>  
                    <td>Vocabulary Size</td>
                    <td>{wordInformation.vocabularySize}</td>
                </tr>
                <tr>  
                    <td>Absolute Rank</td>
                    <td>{wordInformation.absoluteRank}</td>
                </tr>
                <tr>  
                    <td>Document Frequency</td>
                    <td>{wordInformation.documentFrequency}</td>
                </tr>
                <tr>  
                    <td>Relative Rank</td>
                    <td>{wordInformation.relativeRank}</td>
                </tr> 
                <tr>  
                    <td>Link</td>
                    <td>{link.link}</td>
                </tr>    
                </tbody>
                
            </table>
            </div>
            : null}
            {semanticallySimilarWords.length ?
            <div className="wordList">
            <h2>Semantically Similar Words</h2>
            <table>
                <tbody>
                {
                       
                    semanticallySimilarWords.map((wordName,index) => 
                    <tr key={index}>
                      <td>  <NavLink className="navLink" to={'/word'+wordName.word} exact activeStyle={{color: 'blue'}}>{wordName.word}</NavLink></td>
                      <td>  <Route path={'/word'+wordName.word} exact render={(props)=>
                        <WordDetails word={wordName.word} strength={wordName.strength} forWord={wordName.forWord} {...props}/>}/></td>
                    </tr>
                    ) 
                }
            {/* {errorMsg ? <div>{errorMsg}</div>:null}     */}
                </tbody>
            </table>
            </div>
            : 
            <h3> there is no words which can be matched with the word "{this.props.word}" 
            in "{this.props.language}" language</h3>
            }</div>
            : null
            }</BrowserRouter>
        )
    }

}

export default GetWords



