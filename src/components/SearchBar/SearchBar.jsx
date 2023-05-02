import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({ handleOnSubmit }) => {
  const [searchQuerry, setSearchQuerry] = useState('');

  const handleInputChange = event => {
    setSearchQuerry(event.currentTarget.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (searchQuerry.trim() === '') {
      return alert('Write down something please!');
    }

    handleOnSubmit(searchQuerry.trim());

    event.currentTarget.reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
};
