import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import Buttons from "./Buttons";
import { connect } from "react-redux";
import { addLists } from "../../actions/mainListsAction";
import { addCards } from "../../actions/mainCardsAction";
import styled from "styled-components";
import Form from "./Form";
import TrelloOpenForm from "./TrelloOpenForm";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';


class Create extends Component {
  state = {
    formOpen: false,
    title: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleAddList = () => {
    const { boardID } = this.props;
    const { title } = this.state;

    if (title) {
      this.setState({
        title: ""
      });
      this.props.addLists(title, boardID);
    }

    return;
  };

  handleAddCard = () => {
    const { listID, boardID } = this.props;
    const { title } = this.state;
    if (title.length < 3) {
      toast.error("Card's Minimum length should be 3");
    }
    else {
      if (title) {
        this.setState({
          title: ""
        });
        this.props.addCards(boardID, listID, title);
      }
    }

  };

  //here we are opening add another card or list  and closing it
  //also adding list and cards through actions
  //calling<button> <form> <openFormButton> components for it
  renderOpenForm = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;
    //add another list or card option
    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };
  //here rendering form for creating card or list or closing based on formopen property
  render() {
    const { title } = this.state;
    const { list } = this.props;

    return this.state.formOpen ? (
      <Form
        list={list}
        title={title}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >

        <Buttons onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? "Add List" : "Add Card"}
        </Buttons>
      </Form>
    ) : (
        <TrelloOpenForm list={list} onClick={this.openForm}>
          {list ? "Add another list" : "Add another card"}
        </TrelloOpenForm>
      );
  }
}

Create.propTypes = {
  list: PropTypes.bool,
  listID: PropTypes.string,
  boardID: PropTypes.string,
  addLists: PropTypes.func.isRequired,
  addCards: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLists, addCards }
)(Create);
