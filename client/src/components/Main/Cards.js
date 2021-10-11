import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editCard } from "../../actions/mainListsAction";
import { deleteCard } from "../../actions/mainCardsAction";
import { connect } from "react-redux";
import Buttons from "./Buttons";
import Modal from "./CardFunctionality/Modal/Modal";
import CardSetting from "./CardFunctionality/cardsettings/CardSetting";
import { toast } from 'react-toastify';

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;
//here we are displaying  cardss in Card of material-ui
//editing cardtext
//deleting card
//also form for editing card
//we are getting  cards here as props .
//from here we are opening card modal for furthur card settings on card double click
//calling (Modal component) and inside modal component we are using (card setting Component) as a children and performing
//all the modal functionality in (card settings component) through lot of (dialogs) and (common folder components)
/////and all ov this happens in (((cardFunctionality FOLDER)))
const Cards = React.memo(
  ({ text, id, boardID, listID, index, title, card, modals, user, members, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setText] = useState(text);
    const [isOpen, setIsOpen] = useState(false);

    const closeForm = e => {
      setIsEditing(false);
    };

    const handleChange = e => {
      setText(e.target.value);
    };

    const saveCard = e => {
      e.preventDefault();
      if(cardText.length < 3){
        toast.error("Card's Minimum Length should be 3");
      }else {
        dispatch(editCard(boardID, listID, id, cardText));
        setIsEditing(false);
      } 
    };

    const handleDeleteCard = e => {
      console.log(id);
      dispatch(deleteCard(boardID, listID, id));
    };

    const ModalCancelHandler = () => {
      setIsOpen(false);
    };

    const renderEditForm = () => {
      return (
        <Form title={cardText} onChange={handleChange} closeForm={closeForm}>
          <Buttons onClick={saveCard}>Save</Buttons>
        </Form>
      );
    };
    let status;
    let deadline;
    const renderCard = () => {
 

      //here we are putting card due Date and card ownership by displaying yours card 
      let cardDate;
      // let status = false
      modals.map(modal => {
        console.log(modal.card_id, id);
        if (modal.card_id === id) {

          //getting card due date and checking if its due or not .....if not then it will be brown othrer wise it will be red
          cardDate = modal.dueDate;
          let today = new Date();
          let date_from = cardDate;
          date_from = new Date(date_from)
      
          if (today > date_from) {
             deadline = "due";
          }
          //
          //
          //
          //we are checking if current user is a  member of current card
          if (modal.members.length > 0) {
            modal.members.map(m => {
              if (m.user_id === user.id) {
                status = "yes";
              }
            })
          }
        }
      })
      return (
        <div>
          <Modal show={isOpen} modalClosed={ModalCancelHandler}>
            <CardSetting title={title} card={card} members={members} />
          </Modal>
          <Draggable key={String(id)} draggableId={String(id)} index={index}>
            {provided => (
              <CardContainer
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onDoubleClick={() => setIsOpen(true)}
              >
                <Card>
                  <EditButton
                    onMouseDown={() => setIsEditing(true)}
                    fontSize="small"
                  >
                    edit
                  </EditButton>
                  <DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
                    delete
                  </DeleteButton>
                  <CardContent>
                    <Typography>{text}
                    </Typography>
                    <h6 style={{ fontSize: "12px", width: "150px", marginTop: "10px", marginBottom: "-18px"}}>
                    {deadline === "due" ? (
                        <span style={ {backgroundColor: "red" }}>{cardDate}</span>                    
                    ) : (
                    <span style={ {backgroundColor: "yellow" }}>{cardDate}</span>
                    )
                    
                    }
                      {/* condition for showing duedate and members ownership */}
                      {status === "yes" ? (
                        <span style={{ marginLeft: "5px", backgroundColor: "#80c70dbd" }}>
                          Your Card
                      </span>
                      ) : null}{" "}
                    </h6 >
                  </CardContent>
                </Card>
              </CardContainer>
            )}
          </Draggable>
        </div>
      );
    };

    return isEditing ? renderEditForm() : renderCard();
  }
);

export default connect()(Cards);
