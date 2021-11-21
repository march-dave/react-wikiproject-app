import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import axios from 'axios';

export default function MarkdownEd() {
  const mdEditor = React.useRef(null);
  const [value, setValue] = React.useState("");
  let dispatch = useDispatch();
  let history = useHistory();
  const [inputs, setInputs] = useState({});

  const handleImage = () => {
      const newValue = '![](https://raw.githubusercontent.com/march-dave/selenium_node/main/images/aif_logo.png)';
      setValue(newValue);
    }
    
    const handleEditorChange = ({ html, text }) => {
        const newValue = text.replace(/\d/g, "");
        setValue(newValue);
    };

  const handleSubmit = (e) => {

    if (e) {
      e.preventDefault();
      axios.post('https://simplewikiproject.herokuapp.com/api/wikis', { 
        ...inputs,
        content: mdEditor.current.getMdValue()
      } )
      .then((result)=>{ 
        history.push('/view/' + result.data.numid);
      })
      .catch((error)=>{ console.log(error) })
    }
  }

  const handleInputChange = (e) => {
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }

  return (
    <div className="App">

    <div className="main">
        <h2>Main Page</h2>

        <form onSubmit={handleSubmit}>
        <div className="w-100">
            <label className="w-50">Title:</label>
            <input type="text" onChange={handleInputChange} name="title" className="form-input" />
        </div>

        <div className="w-100">
            <label className="w-50">Description:</label>
            <input type="text" onChange={handleInputChange} name="description" className="form-input" />
        </div>

        <button type="submit">Submit</button>
        </form>
    </div>

      <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: "500px"
        }}
        // view={ {menu: false} }
          config={{
            view: {
              menu: false,
              md: true,
              html: true
            },
          }}
        onChange={handleEditorChange}
        renderHTML={text => <ReactMarkdown source={text} />}
      />
        <br />
      <button onClick={handleImage}>Choose Images</button>
    </div>
  );
}