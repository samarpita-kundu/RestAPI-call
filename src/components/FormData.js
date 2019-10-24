import React,{ Component }  from 'react'
import GetWords from './GetWords'

class FormData extends Component{
    constructor(props){
        super(props);
        this.state = {
            language : '',
            word : '',
            apiKey : '',
            isSubmitted : false
        }
    }

    changeLanguage = (event) => {
        this.setState({
            language : event.target.value
        })
    }

    changeWord = (event) => {
        this.setState({
            word : event.target.value
        })
    }

    changeApiKey = (event) => {
      this.setState({
        apiKey : event.target.value
      })
    }

    submitHandler = (event) => {
        const language = this.state.language;
        const word = this.state.word;
        const apiKey =this.state.apiKey;
        
        if((language==="" || language===null ) && (word==="" || word===null) && (apiKey==="" || apiKey===null)){
            alert("language & word field cannot be blank");
        }
        else{
            this.setState({
                isSubmitted : true
            })
        }
        event.preventDefault();
    }

    render(){
        const isSubmitted = this.state.isSubmitted;
        const language = this.state.language;
        const word = this.state.word;
        const apiKey = this.state.apiKey;
        return(  
            <div>
                {isSubmitted===false ? 
                (
                    <form onSubmit={this.submitHandler}>
                    <div>
                        <label>Language </label>
                        <input type='text' required value={language} onChange={this.changeLanguage}></input>
                    </div>
                    <div>
                        <label>Word </label>
                        <input type='text' required value={word} onChange={this.changeWord}></input>
                    </div>
                    <div>
                        <label>Api Key </label>
                        <input type='text' required value={apiKey} onChange={this.changeApiKey}></input>
                    </div>
                    <button type='submit'>Submit</button>
                    </form>
                ) : (
                    <GetWords language={language} word={word} apiKey={apiKey}/> 
                )
                }
            </div>
        )

    }
}

export default FormData
