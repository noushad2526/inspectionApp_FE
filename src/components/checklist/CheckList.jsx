import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TextField,
  Autocomplete,
  Chip,
  Avatar,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckList = ({
  label,
  placeholder,
  list,
  onSelectedItems,
  preSelectedItems: initialSelectedItems = [],
  maxWidth = 'none',
  resetSelectedItems,
  readOnly,
  noImage,
  chipColor = 'default',
}) => {
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelectedItems(initialSelectedItems);
    setSelectAll(initialSelectedItems.length === list.length);
  }, [initialSelectedItems, list]);

  useEffect(() => {
    if (resetSelectedItems) {
      setSelectedItems([]);
      onSelectedItems([]);
      setSelectAll(false);
    }
  }, [resetSelectedItems, onSelectedItems]);

  const handleDelete = (itemToDelete) => {
    if (!readOnly) {
      setSelectedItems(selectedItems.filter((item) => item.title !== itemToDelete.title));
      setSelectAll(false);
    }
  };

  const handleChange = (event, value) => {
    if (!readOnly) {
      const filteredValue = value.filter(item => item.title !== 'Select All');
      setSelectedItems(filteredValue);
      onSelectedItems(filteredValue);
      setSelectAll(filteredValue.length === list.length);
    }
  };

  const handleSelectAll = () => {
    if (!readOnly) {
      if (!selectAll) {
        setSelectedItems(list);
        onSelectedItems(list);
      } else {
        setSelectedItems([]);
        onSelectedItems([]);
      }
      setSelectAll(!selectAll);
    }
  };

  const style = {
    width: '100%',
    maxWidth,
    margin: '0 auto',
    '@media (minWidth: 600px)': {
      maxWidth: '50%',
    },
    '@media (minWidth: 960px)': {
      maxWidth: '30%',
    },
  };

  const selectAllOption = {
    title: 'Select All',
    image: '',
  };

  return (
    <>
      <Autocomplete
        multiple
        id="items"
        options={[selectAllOption, ...list]}
        disableCloseOnSelect
        style={style}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => {
          if (option.title === 'Select All') {
            return (
              <li {...props}>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  disabled={readOnly}
                />
                <span style={{ marginLeft: 8 }}>{option.title}</span>
              </li>
            );
          }

          const isChecked = selected || selectedItems.some(item => item.title === option.title);

          return (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={isChecked}
                onChange={() => handleChange(null, [...selectedItems, option])}
                disabled={readOnly}
              />

              {!noImage && <Avatar sx={{ width: 24, height: 24 }} src={option.image} />}
              <span style={{ marginLeft: 8 }}>{option.title}</span>
            </li>
          );
        }}
        renderTags={(value, getTagProps) => (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              overflowX: 'auto',
              maxHeight: selectedItems.length > 3 ? 90 : 'auto',
              paddingRight: 2,
            }}
          >
            {value
              .filter((option) => option.title !== 'Select All')
              .map((option, index) => (
                <Chip
                  variant="outlined"
                  color={chipColor}
                  key={option.title}
                  label={option.title}
                  avatar={!noImage ? <Avatar src={option.image} /> : undefined}
                  onDelete={() => handleDelete(option)}
                  {...getTagProps({ index })}
                />
              ))}
          </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={readOnly}
          />
        )}
        onChange={handleChange}
        value={selectedItems}
      />
    </>
  );
};

CheckList.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
  })),
  onSelectedItems: PropTypes.func,
  preSelectedItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  })),
  maxWidth: PropTypes.number,
  resetSelectedItems: PropTypes.bool,
  readOnly: PropTypes.bool,
  noImage: PropTypes.bool,
  chipColor: PropTypes.string,
};

export default CheckList;
