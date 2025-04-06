import PropTypes from 'prop-types';

/**
 * returns a Select component displaying a list of option with a custom placeholder by default
 * the component takes the value property of the options prop as value, or the id property if the value is missing
 * @param {object} props
 * @param {array} props.options
 * @param {string} props.customPlaceholder
 * @returns {React.ReactNode}
 */
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
