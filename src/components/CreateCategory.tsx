import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { categoryState } from '../store/atoms';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const Form = styled.form`
  margin: 0 auto 10px;
  width: 60%;
  display: flex;
  padding-bottom: 5px;
`;

const Input = styled.input`
  margin-right: 5px;
  padding-left: 7px;
  width: 80%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus-visible {
    outline: none;
  }
`;

const Button = styled.button<{ isSave: boolean }>`
  margin-right: 5px;
  padding: 1px 10px 0;
  background-color: ${(props) => (props.isSave ? '#fdefbb' : '#ECE4FE')};
  border: 1px solid ${(props) => (props.isSave ? '#fdefbb' : '#ECE4FE')};
  color: #5f6091;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
`;

interface ICategoryProps {
  onAddCancelClick: () => void;
  onCategorySave: () => void;
}

interface IForm {
  category: string;
}

function CreateCategory({ onAddCancelClick, onCategorySave }: ICategoryProps) {
  const setCategories = useSetRecoilState(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  useEffect(() => {
    if (errors.category) {
      Swal.fire({
        title: errors.category.message,
        icon: 'error',
      });
    }
  }, [errors.category]);

  const onNewCategorySubmit = ({ category }: IForm) => {
    const newCategory = {
      text: category,
      id: Date.now(),
    };
    setCategories((prevState) => ({
      categories: [...prevState.categories, newCategory],
      selectedCategoryId: newCategory.id,
    }));
    setValue('category', '');
    onCategorySave();
    Swal.fire({ title: '추가되었습니다.', icon: 'success' });
  };

  const onCancleClick = () => {
    setValue('category', '');
    onAddCancelClick();
  };

  return (
    <Form onSubmit={handleSubmit(onNewCategorySubmit)}>
      <Input
        {...register('category', {
          required: '카테고리명을 입력해주세요.',
          maxLength: { value: 10, message: '10자 이내로 입력해주세요' },
        })}
      />
      <Button isSave={true} type="submit">
        저장
      </Button>
      <Button isSave={false} type="button" onClick={onCancleClick}>
        취소
      </Button>
    </Form>
  );
}

export default CreateCategory;
