import React, {Component} from 'react';
import '../css/wordDetails.css';

class WordDetails extends Component{
    
    render(){
        const {forWord, strength, word} = this.props;
    return (
        <div className="wordDetails">
            <h2>Word: {word}</h2>
            <h3>Strength: {strength}</h3>
            <h3>forWord: {forWord}</h3>
        </div>
    ) 
 }
}

export default WordDetails;