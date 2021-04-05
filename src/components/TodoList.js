import React, { useState, useRef } from 'react';
import '../App.css'
import styled, {createGlobalStyle} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import coverImage from '../images/undraw_To_do_re_jaef.svg';
import TodoItem from './TodoItem'


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans TC', sans-serif;
  }
  body {
    background-color: ${(props) => props.theme.colors.pink};
  }
`
const Title = styled.h1`
  position: absolute;
  top: -48px;
  left: 15px;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 360px;
  height: 550px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px ${(props) => props.theme.colors.purple};
`;
const CoverImage = styled.div`
  background-image: url(${coverImage});
  background-repeat: no-repeat;
  background-size: 320px;
  height: 180px;
`;
const Todos = styled.div`
  background-color: white;
  height: 290px;
  border-raidus: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;
const TodoInput = styled.div`
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  padding: 6px;
  border-color: transparent;
  border-bottom: 2px solid black;
  letter-spacing: 1px;
  font-size: ${(props) => props.theme.fonts.MD};
  margin-bottom: 10px;

  &:focus {
    outline: none;
  }
`
const Todo = styled.div`
  height: 220px;
  overflow: auto;
`
const ButtonContainer = styled.div`
  text-align: center;
`
const Button = styled.button`
  border-radius: 5px;
  padding: 5px 8px;
  font-size: ${(props) => props.theme.fonts.SM};
  &:focus {
    outline: none;
  }
  & + & {
    margin-left: 10px;
  }
  &:last-child {
    background-color: ${(props) => props.theme.colors.peachPink};
    color: ${(props) => props.theme.colors.lightGray};
  }
  background-color: ${(props) => props.active ? props.theme.colors.purple : 'auto'};
  color: ${(props) => props.active ? props.theme.colors.lightGray : 'auto'};
`

function TodoList() {
  const id = useRef(1);
  const [ value, setValue] = useState('')
  const [ todos, setTodo ] = useState([])
  const [ filter, setFilter ] = useState('all')

  const handleAddTodo = () => {
    if (!value) return
    setTodo([
      {id: id.current, content: value, isDone: false},
      ...todos
    ])
    setValue('')
    id.current++
  }

  const handleToggleIsDone = (id) => {
    setTodo(todos.map((todo)=>{
      if (id !== todo.id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const handleDeleteTodo = (id)=> {
    setTodo(todos.filter(todo => todo.id !== id))
  }

  const handleDeleteTodoAll = () => {
    setTodo(todos.filter(todo => todo.id !== todo.id))
  }

  return (
    <React.Fragment>
    <GlobalStyle />
      <Container>
        <Title>Todo List</Title>
        <CoverImage />
        <Todos>
          <TodoInput>
            <Input
              value={value}
              placeholder={'輸入待辦事項'}
              onChange={((e)=>{setValue(e.target.value)})}
              onKeyPress={((e)=> {
                if (e.key === 'Enter'){
                  handleAddTodo()
                }
              })}
            />
            <FontAwesomeIcon
              onClick={handleAddTodo}
              icon={faPlus}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "5px",
                top: "10px",
              }}
          />
          </TodoInput>
          <Todo>
            {todos
              .filter((todo) => {
                if (filter === 'all') return todo
                if (filter === 'active') return !todo.isDone
                if (filter === 'completed') return todo.isDone
              })
              .map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleToggleIsDone={handleToggleIsDone}
                  handleDeleteTodo={handleDeleteTodo}
                />
              )
            })}
          </Todo>
        </Todos>
        <ButtonContainer>
          <Button onClick={(()=>setFilter('all'))} active={filter === 'all'}>全選</Button>
          <Button onClick={(()=>setFilter('active'))} active={filter === 'active'}>進行中</Button>
          <Button onClick={(()=>setFilter('completed'))} active={filter === 'completed'}>已完成</Button>
          <Button onClick={handleDeleteTodoAll}>刪除全部</Button>
        </ButtonContainer>
      </Container>
    </React.Fragment>
  );
}

export default TodoList;
