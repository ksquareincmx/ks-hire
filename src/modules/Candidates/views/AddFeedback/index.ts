import AddFeedback from './AddFeedback';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'store';
import { addNewFeedback } from 'store/feedbacks/thunks';

const mapDispatchToProps = { addNewFeedback };

const mapStateToProps = (state: RootState) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddFeedback),
);
