

import React, { Component, useState, useEffect } from "react";
import { FETCH_POSTS_QUERY, ADD_TODO, REMOVE_NUMBER ,EDIT_NUMBER} from "../util/graphql";
import { json } from "body-parser";
import { LocalState } from "apollo-client/core/LocalState";
import { useQuery, useMutation } from "@apollo/react-hooks";

export function RemoveNumber(props) {
    const [removeNumber] = useMutation(REMOVE_NUMBER);
    
    return (
      <div>
        <button
          onClick={e => {
            e.preventDefault();
            removeNumber({
              variables: {id:  `${props.data._id}` }
            });
            window.location.reload()
          }}
        >
          remove
        </button>
      </div>
    );
  }
  
  
  
  export function EditNumber(props) {
    const [editNumber] = useMutation(EDIT_NUMBER);
    const [num1, setNum1] = useState(props.data.number1);
    const [num2, setNum2] = useState(props.data.number2);
    return (
      <>
      <input
        type="number"
        placeholder="number1"
        defaultValue = {num1}
        onChange={event => setNum1(event.target.value)}
      ></input>
      <p> 
         <input
        type="number"
        placeholder="number2"
        onChange={event => setNum2(event.target.value)}
      ></input>
      </p>
    
      <button
          onClick={e => {
            e.preventDefault();
            editNumber({
              variables: {id: `${props.data._id}` , number1: num1, number2: num2 }
            });
            console.log(editNumber);
          }}
        >
          send
        </button>
    </>
    );
  }
  
  