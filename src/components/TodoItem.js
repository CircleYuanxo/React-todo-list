import React from 'react';
import '../App.css'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faSquare  } from "@fortawesome/free-regular-svg-icons";

const Card = styled.div`
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightPink};
  }
`;
const CardText = styled.div`
  width: 215px;
  font-size: ${(props) => props.theme.fonts.MD};
  word-break: break-all;

  ${(props) =>
    props.isDone &&
    `text-decoration: line-through;
      opacity: 0.6;
    `}
`
const Status = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`

const Delete = styled.div`
  display: flex;
  align-items: center;
`



function TodoItem( { todo, handleDeleteTodo, handleToggleIsDone }) {
  const handleStatusClick = () => {
    handleToggleIsDone(todo.id)
  }

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id)
  }

  return (
    <Card>
     {!todo.isDone && <Status>
      <FontAwesomeIcon
        onClick={handleStatusClick}
        icon={faSquare}
        style={{
          color: "#cdc9c3",
          cursor: "pointer",
          fontSize: "21px",
        }}
        />
      </Status>}
      {todo.isDone && <Status>
       <FontAwesomeIcon
         onClick={handleStatusClick}
         icon={faCheckSquare}
         style={{
           color: "#cdc9c3",
           cursor: "pointer",
           fontSize: "21px",
         }}
         />
       </Status>}
      <CardText isDone={todo.isDone}>{todo.content}</CardText>
      <Delete>
        <FontAwesomeIcon
          onClick={handleDeleteClick}
          icon={faTrashAlt}
          style={{
            color: "#cdc9c3",
            cursor: "pointer",
            fontSize: "21px",
          }}
        />
      </Delete>
    </Card>

  );
}

export default TodoItem;
