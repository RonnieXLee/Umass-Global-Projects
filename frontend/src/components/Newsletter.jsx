import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { useState } from 'react'; // Import useState hook
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center' })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: '80%' })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Message = styled.div`
  margin-top: 10px;
  color: green;
  font-size: 16px;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Add message state

  const handleSubmit = () => {
    // You can perform any email validation here before setting the message
    setMessage(
      'Welcome to the Fashion Fizzness Family! We will keep you updated on the latest trends and deals!'
    );
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Sign up for updates on the latest trends and deals!</Desc>
      <InputContainer>
        <Input
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          <Send />
        </Button>
      </InputContainer>
      <Message>{message}</Message>
    </Container>
  );
};

export default Newsletter;
