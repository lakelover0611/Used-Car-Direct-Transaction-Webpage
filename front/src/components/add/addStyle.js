import styled from 'styled-components';

// Body styles are global, so it's better to set them globally or in a global styled-component if needed.

export const FormContainer = styled.section`
  max-width: 600px;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  
  margin:50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;

  &.save {
    background-color: #007bff;
  }

  &.save:hover {
    background-color: #0056b3;
  }

  &.cancel {
    background-color: #6c757d;
  }

  &.cancel:hover {
    background-color: #5a6268;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.a`
  color: #4f5253;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    color: #2767ff;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
`;

export const Main = styled.main`
  padding: 30px;
  min-height: 70vh;
`;
