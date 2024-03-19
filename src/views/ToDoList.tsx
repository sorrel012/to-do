import React from 'react';
import styled from 'styled-components';
import Category from './Category';
import CreateToDo from '../components/CreateToDo';
import { useRecoilValue } from 'recoil';
import { toDoSelector } from '../store/atoms';
import TodoItem from '../components/TodoItem';

const Wrapper = styled.div`
  max-width: 500px;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.header`
  text-transform: uppercase;
  margin: 20px auto 20px;
  font-size: xx-large;
  font-weight: bold;
  color: #ffffff;
  animation: sparkle 1s infinite alternate;

  @keyframes sparkle {
    from {
      text-shadow:
        0 0 20px #fff3df,
        0 0 20px #ffdfd3,
        0 0 20px #fde2cb,
        0 0 20px #fcf0d9;
    }
    to {
      text-shadow:
        0 0 20px #e5d5ff,
        0 0 20px #bcb9fd,
        0 0 30px #e2dbff,
        0 0 30px #d1d4ff;
    }
  }
`;

const ToDoLayout = styled.div`
  height: 80%;
  padding: 0 10px;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 5px 3px 8px 0 rgba(66, 66, 66, 0.37);
`;

const ToDoListLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid #dedede;
  padding-top: 15px;
`;

const ToDos = styled.div`
  padding: 5px 25px;
  text-align: start;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Wrapper>
      <Header>To Do List</Header>
      <ToDoLayout>
        <Category />
        <ToDoListLayout>
          <ToDos>
            {toDos.map((toDo) => (
              <TodoItem key={toDo.id} {...toDo} />
            ))}
          </ToDos>
          <CreateToDo />
        </ToDoListLayout>
      </ToDoLayout>
    </Wrapper>
  );
}

export default ToDoList;
