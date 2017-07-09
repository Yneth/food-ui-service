import { connect } from 'react-redux';
import { selectIsLogged } from '../selectors';

const Logged = ({ isLogged, children }) => (isLogged ? children : null);

const mapDispatchToProps = state => ({
    isLogged: selectIsLogged(state),
});

export default connect(mapDispatchToProps)(Logged);
