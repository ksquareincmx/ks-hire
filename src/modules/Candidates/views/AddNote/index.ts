import AddNote from './AddNote';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'store';
import { addNewNote } from 'store/notes/thunks';

const mapDispatchToProps = { addNewNote };

const mapStateToProps = (state: RootState) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNote),
);
