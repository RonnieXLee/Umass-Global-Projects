import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 200px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 20px; /* Increase the margin to create more space */
  padding: 10px 40px; /* Increase left and right padding */
`;

const Input = styled.input`
  border: none;
  flex: 1;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-family: Oleo Script;
  font-size: 60px;
  ${mobile({ fontSize: '24px' })}
  cursor: pointer;
  text-decoration: none;
  color: grey;
  img {
    width: 800px; /* Adjust the width as per your preference */
    height: auto; /* This will maintain the aspect ratio */
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const SearchTitle = styled.h3`
  margin: 10px;
`;

const SearchList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SearchItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const quantity = useSelector((state) => state.cart.quantity);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Replace 'allProducts' with your actual array of products fetched from the server
    const allProducts = [
      // Your array of products goes here
    ];

    // Implement the search logic here
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the user session and update the login status in the Redux store
    // dispatch(updateLoginStatus(false));
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <Search
              style={{ color: 'gray', fontSize: 16, cursor: 'pointer' }}
              onClick={handleSearchSubmit}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>
              <img
                src="https://i.imgur.com/Kd3OLyn.jpg"
                alt="Fashion Fizzness"
              />
            </Logo>
          </Link>
        </Center>
        <Right>
          {isLoggedIn ? (
            <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem>LOG IN</MenuItem>
            </Link>
          )}

          <Link
            to="/register"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      {searchResults.length > 0 && (
        <SearchResults>
          <SearchTitle>Search Results:</SearchTitle>
          <SearchList>
            {searchResults.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <SearchItem>{product.title}</SearchItem>
              </Link>
            ))}
          </SearchList>
        </SearchResults>
      )}
    </Container>
  );
};

export default Navbar;
