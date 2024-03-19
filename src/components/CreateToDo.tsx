import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../store/atoms';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const Form = styled.form`
  margin-bottom: 20px;
  width: 100%;
  padding: 0 20px;
`;

const Input = styled.input`
  width: 80%;
  padding: 5px 5px 3px;
  background: white;
  color: #5f6091;
  border: 2px solid #96b9e8;
  border-radius: 5px;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #86a6d0;
  }
`;

const Button = styled.button`
  background-color: #96b9e8;
  color: white;
  margin-left: -5px;
  padding: 5px 10px 3px;
  border: 2px solid #96b9e8;
  border-radius: 3px;
  white-space: nowrap;
  cursor: pointer;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const categoryInfo = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      {
        text: toDo,
        id: Date.now(),
        categoryId: categoryInfo.selectedCategoryId,
      },
    ]);
    setValue('toDo', '');
    Swal.fire({ title: '추가되었습니다.', icon: 'success' });
  };

  useEffect(() => {
    if (errors.toDo) {
      Swal.fire({
        title: errors.toDo.message,
        icon: 'error',
      });
    }
  }, [errors.toDo]);

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register('toDo', {
          required: '내용을 입력해 주세요.',
          maxLength: {
            value: 50,
            message: '50자 이내로 입력해 주세요.',
          },
        })}
        placeholder="할 일을 입력해 주세요."
      />
      <Button>추가</Button>
    </Form>
  );
}

export default CreateToDo;
