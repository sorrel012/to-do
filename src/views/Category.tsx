import { categorySelector, categoryState, ICategory } from '../store/atoms';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import CreateCategory from '../components/CreateCategory';

const CategoryLayout = styled.div`
  width: 100%;
`;

const CategorySelectLayout = styled.div`
  margin: 20px auto;
  width: 90%;
  display: flex;
  align-items: center;
`;

const DropdownContainer = styled.div`
  flex: 10;
  position: relative;
  width: 100%;
`;

const SelectedCategory = styled.div`
  width: 100%;
  padding: 5px 0 2px;
  background: white;
  border: 2px solid #bfa9d5;
  border-radius: 5px;
  color: #6c4396;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  flex: 9;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  margin-right: 5px;
  font-size: small;
  transition: transform 0.3s ease-in;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: 50% 40%;
`;

const CategoryList = styled.ul`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;

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

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  color: #bfa9d5;
  transform: scale(1.1);
  cursor: pointer;
`;

function Category() {
  const [categories, setCategories] = useRecoilState(categoryState);
  const selectedCategory = useRecoilValue(categorySelector);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewToDo, setIsNewToDo] = useState(false);
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

  const onSelectedCategoryClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const onCategorySelect = (option: ICategory) => {
    setCategories((prevState) => ({
      ...prevState,
      selectedCategoryId: option.id,
    }));
    setIsDropdownOpen(false);
  };

  const onAddButtonClick = () => {
    setIsNewToDo(true);
  };

  const onAddCancelClick = () => {
    setIsNewToDo(false);
  };

  return (
    <CategoryLayout>
      <CategorySelectLayout>
        <DropdownContainer ref={dropdownRef}>
          <SelectedCategory onClick={onSelectedCategoryClick}>
            <Text>
              {selectedCategory[0].text ?? '새 카테고리를 추가해주세요.'}
            </Text>
            <Arrow isOpen={isDropdownOpen}>▼</Arrow>
          </SelectedCategory>
          <CategoryList className={isDropdownOpen ? 'show' : ''}>
            {categories.categories.map((option) => (
              <li key={option.id} onClick={() => onCategorySelect(option)}>
                {option.text}
              </li>
            ))}
          </CategoryList>
        </DropdownContainer>
        <Button onClick={onAddButtonClick}>
          <span className="material-symbols-outlined">add_box</span>
        </Button>
      </CategorySelectLayout>
      <CSSTransition
        in={isNewToDo}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <CreateCategory
          onCategorySave={onAddCancelClick}
          onAddCancelClick={onAddCancelClick}
        />
      </CSSTransition>
    </CategoryLayout>
  );
}

export default Category;
