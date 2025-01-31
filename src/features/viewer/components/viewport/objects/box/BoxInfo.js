import PropTypes from 'prop-types';

const BoxInfo = ({ name, description, setName, setDescription }) => {
  console.log('BoxInfo render:', { name, description }); // Debug log

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '5px',
      color: 'white',
    },
    input: {
      margin: '5px 0',
      padding: '3px',
      width: '100%',
      color: '#000000',
      backgroundColor: '#ffffff',
    },
    label: {
      marginTop: '5px',
      fontSize: '0.9em',
    },
  };

  const handleNameChange = (e) => {
    console.log('Name change:', e.target.value); // Debug log
    setName?.(e.target.value);
  };

  return (
    <div style={styles.container}>
      <form>
        <label htmlFor="fname" style={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={name ?? ''} // Null coalescing operator
          onChange={handleNameChange}
          style={styles.input}
        />
        <label htmlFor="fdescription" style={styles.label}>
          Description:
        </label>
        <input
          type="text"
          id="fdescription"
          name="fdescription"
          value={description || ''}
          onChange={(e) => setDescription?.(e.target.value)}
          style={styles.input}
        />
      </form>
    </div>
  );
};

BoxInfo.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  setName: PropTypes.func,
  setDescription: PropTypes.func,
};

BoxInfo.defaultProps = {
  name: '',
  description: '',
  setName: () => console.warn('setName not provided'),
  setDescription: () => console.warn('setDescription not provided'),
};

export default BoxInfo;
