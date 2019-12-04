import React, { Component, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import _ from "lodash";
import "react-virtualized/styles.css";
import { FETCH_POSTS_QUERY, ADD_TODO } from "../util/graphql";
import Tible from "./Tible"
export default function Test() {
  let { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const [test, setSortListBy] = useState(data.numbers)
  //   const [sortDirection, setSortDirection] = useState()
  //   const [sortedList, setNum2] = useState()

  console.log(data);
  if (loading) {
    return <>loading..</>;
  } else {
    return (
      <>
        <Tible data= {data.numbers} />
      </>
    );
  }
}

