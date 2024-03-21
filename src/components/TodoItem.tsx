import {
  categoryChangeSelector,
  ICategory,
  IToDo,
  toDoState,
} from '../store/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import React, { useEffect, useRef, useState } from 'react';
import { Arrow } from '../views/Category';

const Item = styled.li`
  list-style: none;
  margin-bottom: 10px;
  color: #494949;
  display: flex;
  align-items: center;
`;

const ItemText = styled.div`
  flex: 8;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.span`
  margin-right: 5px;
  cursor: pointer;
`;

const Text = styled.span`
  padding-top: 4px;
`;

const CategorySelectLayout = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const DropdownContainer = styled.div`
  flex: 2;
  position: relative;
`;

const SelectedCategory = styled.div`
  width: 90%;
  padding: 5px 0 2px;
  background: white;
  border: 2px solid #868686;
  border-radius: 5px;
  color: #868686;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CategoryList = styled.ul`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 90%;
  background: white;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  z-index: 5;
  transition: opacity 0.2s ease-in;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
    font-size: small;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const CategoryText = styled.span`
  flex: 9;
  padding-left: 5px;
`;

function TodoItem({ text, id }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryChangeSelector);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onCategoryChangeClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClick = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      text: '삭제한 항목은 다시 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((prevToDos) => {
          return prevToDos.filter((toDo) => toDo.id !== id);
        });
        Swal.fire({
          title: '삭제되었습니다.',
          icon: 'success',
        });
      }
    });
  };

  const onCategoryChange = (option: ICategory) => {
    setTodos((prevTodos) => {
      const targetIndex = prevTodos.findIndex((todo) => todo.id === id);
      const newTarget: IToDo = {
        text,
        id,
        categoryId: option.id,
      };

      return [
        ...prevTodos.slice(0, targetIndex),
        newTarget,
        ...prevTodos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Item>
      <ItemText>
        <Checkbox className="material-symbols-outlined" onClick={handleClick}>
          <span className="material-symbols-outlined">delete</span>
        </Checkbox>
        <Text>{text}</Text>
      </ItemText>
      <CategorySelectLayout>
        <DropdownContainer ref={dropdownRef}>
          <SelectedCategory onClick={onCategoryChangeClick}>
            <CategoryText>{'변경'}</CategoryText>
            <Arrow isOpen={isDropdownOpen}>▼</Arrow>
          </SelectedCategory>
          <CategoryList className={isDropdownOpen ? 'show' : ''}>
            {categories.map((option) => (
              <li key={option.id} onClick={() => onCategoryChange(option)}>
                {option.text}
              </li>
            ))}
          </CategoryList>
        </DropdownContainer>
      </CategorySelectLayout>
    </Item>
  );
}

export default TodoItem;
