import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
  Apple,
  Android,
} from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-family: Oleo Script;
  font-size: 24px;
  ${mobile({ fontSize: '24px' })}
  img {
    width: 400px; /* Adjust the width as per your preference */
    height: auto; /* This will maintain the aspect ratio */
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  margin: auto; /* Center the icon horizontally */
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically and horizontally */
  ${mobile({ display: 'none' })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: '#fff8f8' })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const AppDownloadText = styled.p`
  margin-top: 5px; /* Adjust the margin-top value to lower the text */
`;

const AppImage = styled.img`
  margin-top: 5px;
  margin-bottom: 5px;
  /* You can adjust the width and height as per your preference */
  width: ${(props) => (props.width ? props.width : '300px')};
  height: auto;
`;

const Footer = () => {
  const handleFacebookClick = () => {
    window.location.href = 'https://www.facebook.com/fashionfizzness';
  };

  const handleInstagramClick = () => {
    window.location.href = 'https://www.instagram.com/fashionfizzness';
  };

  const handleTwitterClick = () => {
    window.location.href = 'https://www.twitter.com/fashionfizzness';
  };

  const handlePinterestClick = () => {
    window.location.href = 'https://www.pinterest.com/fashionfizzness';
  };

  const handleAppleClick = () => {
    window.location.href = 'https://apps.apple.com/us/app/fashionfizzness';
  };

  const handleAndroidClick = () => {
    window.location.href =
      'https://play.google.com/store/apps/details?id=com.fashionfizzness.android';
  };

  return (
    <Container>
      <Left>
        <Logo to="/">
          <img src="https://i.imgur.com/Kd3OLyn.jpg" alt="Fashion Fizzness" />
        </Logo>
        <Desc>
          Join the fashion frenzy! We're here to add a sparkling twist to your
          style game. From head-turning gowns to sassy streetwear, we've got the
          perfect fizz for every occasion. Get ready to unleash your inner
          fashionista and let your fizzness shine through! Cheers to fabulous
          and fizz-tistic fashion adventures with Fashion Fizzness! Follow
          us!🥂✨
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999" onClick={handleFacebookClick}>
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F" onClick={handleInstagramClick}>
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE" onClick={handleTwitterClick}>
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023" onClick={handlePinterestClick}>
            <Pinterest />
          </SocialIcon>
          <SocialIcon color="708090" onClick={handleAppleClick}>
            <Apple />
          </SocialIcon>
          <SocialIcon color="708090" onClick={handleAndroidClick}>
            <Android />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title></Title>
        <AppImage
          src="https://i.imgur.com/sWtZfHl.jpg"
          alt="Download Our App"
        />
        <AppDownloadText>
          <Desc>Download our App and earn 100 FF points!</Desc>
          <SocialContainer>
            <SocialIcon color="708090" onClick={handleAppleClick}>
              <Apple />
            </SocialIcon>
            <SocialIcon color="708090" onClick={handleAndroidClick}>
              <Android />
            </SocialIcon>
          </SocialContainer>
        </AppDownloadText>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: '10px' }} /> 101 Fashion Street, Boston,
          Massachusetts 02115
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '10px' }} /> +1.800.888.8888
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '10px' }} />{' '}
          contact@fashionfizzness.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
