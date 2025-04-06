import PropTypes from 'prop-types';

export default function Select({ options, customPlaceholder, ...props }) {
  return (
    <select defaultValue= '' { ...props }>
      <option value='' disabled>{customPlaceholder}</option>
      {
        options.length > 0 && options.map(option => {
          return <option key={option.id} value={option.value || option.id}>{option.name}</option>;
        })
      }
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  customPlaceholder: PropTypes.string
};
