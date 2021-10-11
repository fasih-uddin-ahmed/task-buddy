import React, { Component } from "react";
import List from "./List";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { getLists } from "../../actions/mainListsAction";
import { getModals } from "../../actions/modalActions";
import { sort } from "../../actions/mainListsAction";
import { setActiveBoard } from "../../actions/boardActions";
import PropTypes from "prop-types";

const ListsContainer = styled.div`
  display: flex;

  flex-direction: row;
`;

// TODO: Fix performance issue
//here we are displaying boards and its lists through <List> component
//we are getting lists and cards here and passing cards to <list> component through props
//alspo calling <create> component for createlist form
class Board extends Component {
  componentDidMount() {
    // set active trello board here
    //const { boardID } = this.props.match.params;
    console.log(this.props.match.params.boardID);
    this.props.getLists(this.props.match.params.boardID);
    this.props.setActiveBoard(this.props.match.params.boardID);
    this.props.getModals();
  }
  //we are performing all drag through this function///calling ssort from(mainListsAction)
  onDragEnd = result => {
    const { lists } = this.props.boards;
    const { boardID } = this.props.match.params;
    const boardidd = boardID;
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type,
      lists,
      boardidd
    );
  };

  render() {
    const { match } = this.props;
    const { lists } = this.props.boards;
    const { modals } = this.props.modal;
    const { user } = this.props.auth;

    const { boardID } = match.params;
    const { boardd } = this.props.location.state;

    if (!boardd) {
      return <p>Board not found</p>;
    }
    console.log(boardd.members);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {/* <div style={{ background: "black" }}>
          <h2 style={{ marginTop: "-24px" }}>{boardd.title}</h2>
        </div> */}
        <Droppable
          droppableId={String(boardID)}
          direction="horizontal"
          type="list"
        >
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => {
                console.log("listcards");
                console.log(list.cards);
                return (
                  <List
                    listID={list._id}
                    key={list._id}
                    boardID={boardID}
                    cardss={list.cards}
                    title={list.title}
                    index={index}
                    modals={modals}
                    user={user}
                    members={boardd.members}
                  />
                );
              })}
              {provided.placeholder}
              <Create list boardID={boardID} />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  boards: state.boards,
  modal: state.modal,
  auth: state.auth
});

Board.propTypes = {
  auth: PropTypes.object.isRequired,
  boards: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  sort: PropTypes.func.isRequired,
  setActiveBoard: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired,
  boardd: PropTypes.object,
  getModals: PropTypes.func.isRequired
};



export default connect(
  mapStateToProps,
  { setActiveBoard, getLists, sort, getModals }
)(Board);
