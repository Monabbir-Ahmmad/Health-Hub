import PropTypes from "prop-types";
import React from "react";
import { CSSTransition } from "react-transition-group";

function Result(props) {
  return (
    <CSSTransition
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        Suggestion: <strong>{props.quizResult}</strong>!
      </div>
    </CSSTransition>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};

export default Result;
