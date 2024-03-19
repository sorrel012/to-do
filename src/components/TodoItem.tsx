import { IToDo, toDoState } from '../store/atoms';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Item = styled.li`
  list-style: none;
  margin-bottom: 10px;
  color: #494949;
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

function TodoItem({ text, id }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);

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

  return (
    <Item>
      <Checkbox className="material-symbols-outlined" onClick={handleClick}>
        check_box_outline_blank
      </Checkbox>
      <Text>{text}</Text>
    </Item>
  );
}

export default TodoItem;
