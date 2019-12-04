import React, { Component, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { FETCH_POSTS_QUERY, ADD_TODO, REMOVE_NUMBER ,EDIT_NUMBER} from "../util/graphql";
import { json } from "body-parser";
import { LocalState } from "apollo-client/core/LocalState";

function AddTodo(props) {
  const [createNumber] = useMutation(ADD_TODO);
  console.log(createNumber);

  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault();
          createNumber({
            variables: { number1: props.number1, number2: props.number2 }
          });
        }}
      >
        dasda
      </button>
    </div>
  );
}


function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [num1, setNum1] = useState(6);
  const [num2, setNum2] = useState(2);

  console.log(data);
  return (
    <>
      <input
        type="number"
        placeholder="num1"
        onChange={event => setNum1(event.target.value)}
      ></input>
      <input
        type="number"
        placeholder="num2"
        onChange={event => setNum2(event.target.value)}
      ></input>
      <AddTodo number1={num1} number2={num2} />
    </>
  );
}

export default Home;
