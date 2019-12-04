import React, { Component, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import { Column, Table, SortDirection, AutoSizer } from "react-virtualized";
import _ from "lodash";
import "react-virtualized/styles.css";
import { FETCH_POSTS_QUERY, ADD_TODO } from "../util/graphql";
import Test from "./data";
import { RemoveNumber, EditNumber } from "../util/QlComponnents";

class Change extends React.Component {
  constructor(props) {
    super();

    this.state = {
      edit: false
    };
  }
  chenge = async () => {
    await this.setState({ edit: true });
    console.log(this.state);
  };
  render() {
    if (!this.props) {
      return <>loading..</>;
    }
    return this.state.edit ? (
      <div>
        <EditNumber data={this.props.data} />
        <RemoveNumber data={this.props.data} />
      </div>
    ) : (
      <div>
        <button onClick={this.chenge}>edit</button>
        <RemoveNumber data={this.props.data} />
      </div>
    );
  }
}

export default class Tible extends React.Component {
  constructor(props) {
    super(props);
    const sortBy = "name";
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({ sortBy, sortDirection });

    this.state = {
      sortBy,
      sortDirection,
      sortedList,
      hover: 0,
      height: 400,
      Column_width_num1: 300,
      Column_width_num2: 300,
      Column_width_add: 300,
      Column_width_molt: 300,
      page: 1,
      pageCount: 5
    };
  }

  render() {
    if (!this.props.data) {
      return <>loading..</>;
    }
    return (
      <>
        <div>
          <select
            defaultValue={this.state.pageCount}
            onChange={async event => {
              await this.setState({ pageCount: event.target.value });
              let list = this._sortList(
                this.state.sortBy,
                this.state.sortDirection
              );
              await this.setState({ sortedList: list });
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="10">20</option>
          </select>
          <input
            type="number"
            placeholder="go to page : "
            onChange={async event => {
              await this.setState({ page: event.target.value });
              let list = this._sortList(
                this.state.sortBy,
                this.state.sortDirection
              );
              await this.setState({ sortedList: list });
            }}
          ></input>
        </div>

        <div>
          <input
            type="number"
            placeholder="edit first width"
            onChange={event =>
              this.setState({ Column_width_num1: event.target.value })
            }
          ></input>

          <input
            type="number"
            placeholder="edit secand width"
            onChange={event =>
              this.setState({ Column_width_num2: event.target.value })
            }
          ></input>

          <input
            type="number"
            placeholder="edit add width"
            onChange={event =>
              this.setState({ Column_width_add: event.target.value })
            }
          ></input>
          <input
            type="number"
            placeholder="edit molt width"
            onChange={event =>
              this.setState({ Column_width_molt: event.target.value })
            }
          ></input>
        </div>

        <div style={{ height: 400 }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                width={width}
                height={height}
                headerHeight={20}
                rowHeight={300}
                sort={this._sort}
                sortBy={this.state.sortBy}
                sortDirection={this.state.sortDirection}
                rowCount={this.state.sortedList.length}
                rowGetter={({ index }) => this.state.sortedList[index]}
                onRowMouseOver={({ index, rowData }) =>
                  this._hover(index, rowData)
                }
                onRowMouseOut={({ index }) => this._nothover(index)}
              >
                <Column
                  label="first number"
                  dataKey="number1"
                  width={this.state.Column_width_num1}
                />
                <Column
                  width={this.state.Column_width_num2}
                  label="secand number"
                  dataKey="number2"
                />
                <Column
                  label="add"
                  dataKey="addNumber"
                  width={this.state.Column_width_add}
                />
                <Column
                  width={this.state.Column_width_molt}
                  label="molt"
                  dataKey="moltNumber"
                />
                <Column
                  width={300}
                  label="hover"
                  dataKey="isHover"
                  cellRenderer={({ rowIndex, rowData }) =>
                    this.state.hover == rowIndex ? (
                      <Change data={rowData} update={this.props.update} />
                    ) : null
                  }
                  // cellRenderer={({ rowData }) => (
                  //     <button data-tip={`This is a button for ${rowData}`}>
                  //       Button
                  //     </button>
                  //   )}
                />
              </Table>
            )}
          </AutoSizer>
          <Table />
        </div>
        
      </>
    );
  }

  _sortList = ({ sortBy, sortDirection, page = 1, number = 5 }) => {
    console.log(number);
    if (this.state) {
      number = this.state.pageCount;
      page = this.state.page;
    }
    let list = this.props.data.splice((page - 1) * number, number);
    let newList = _.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };

  _hover = function(index, data = "") {
    let new_list = [...this.state.sortedList];
    //new_list.isHover = index
    this.setState({ sortedList: new_list, hover: index });
  };
  _nothover = function(index) {
    let new_list = [...this.state.sortedList];
    this.setState({ sortedList: new_list, hower: 0 });
  };
}
//this.state.sortedList[index].isHover = 1
