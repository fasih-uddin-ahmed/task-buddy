import React, { useState } from "react";
import Cards from "./Cards";
import Create from "./Create";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle, deleteList } from "../../actions/mainListsAction";
import Icon from "@material-ui/core/Icon";
//import { toast } from 'react-toastify';

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

//here we are displaying lists and its cardss through <Card> component
//editing listtitle
//deleting list
//also calling<Create> component for creating new cards
//we are getting lists and cards here as props and passing cards to <Cards> component through props in lists.map
const List = ({ members, modals, user, title, cardss, listID, boardID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(boardID, listID, listTitle));
    //toast
   // toast.info("List Title Updated");
  };

  const handleDeleteList = () => {
    dispatch(deleteList(boardID, listID));
    //toast.error("List deleted");
  };

  return (
    <Draggable key={String(listID)} draggableId={String(listID)} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {provided => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                      <TitleContainer onClick={() => setIsEditing(true)}>
                        <ListTitle>{listTitle}</ListTitle>
                        <DeleteButton onClick={handleDeleteList}>
                          delete
                      </DeleteButton>
                      </TitleContainer>
                    )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cardss.map((card, index) => (
                    <Cards
                      key={card._id}
                      text={card.text}
                      id={card._id}
                      boardID={boardID}
                      index={index}
                      listID={listID}
                      title={title}
                      card={card}
                      modals={modals}
                      user={user}
                      members={members}
                    />
                  ))}
                  {provided.placeholder}
                  <Create listID={listID} boardID={boardID} />
                </div>
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default connect()(List);
