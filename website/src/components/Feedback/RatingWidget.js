import React, { Component } from 'react';

import ThumbsUp from './assets/thumb-up.svg';
import ThumbsDown from './assets/thumb-down.svg';

import './index.scss';

const genClassName = (className) => {
  return `BinaryFeedback__${className}`;
};

class BinaryFeedback extends Component {
  constructor(props) {
    super(props);

    let initialState = 0;
    if (props.positive) {
      initialState = 1;
    } else if (props.negative) {
      initialState = 2;
    }

    this.state = {
      selected: initialState,
    };

    this.onPositiveClick = this.onPositiveClick.bind(this);
    this.onNegativeClick = this.onNegativeClick.bind(this);
    this.renderPositiveContent = this.renderPositiveContent.bind(this);
    this.renderNegativeContent = this.renderNegativeContent.bind(this);
  }

  onPositiveClick() {
    if (this.state.selected === 1) {
      return;
    }
    if (!this.props.singleSelect || this.state.selected === 0) {
      this.setState({
        selected: 1,
      });
      this.props.onPositiveClick();
    }
  }

  onNegativeClick() {
    if (this.state.selected === 2) {
      return;
    }
    if (!this.props.singleSelect || this.state.selected === 0) {
      this.setState({
        selected: 2,
      });
      this.props.onNegativeClick();
    }
  }

  renderPositiveContent() {
    if (this.props.positiveContent) {
      return this.props.positiveContent;
    }

    return (
      <ThumbsUp className={genClassName('icon')} />
    );
  }

  renderNegativeContent() {
    if (this.props.negativeContent) {
      return this.props.negativeContent;
    }

    return (
      <ThumbsDown className={genClassName('icon')} />
    );
  }

  render() {
    let positiveClass = genClassName('positive');
    let negativeClass = genClassName('negative');
    if (this.state.selected === 1) {
      positiveClass = `${positiveClass} ${genClassName('selected')}`;
      if (this.props.singleSelect) {
        negativeClass = `${negativeClass} ${genClassName('disabled')}`;
      }
    } else if (this.state.selected === 2) {
      negativeClass = `${negativeClass} ${genClassName('selected')}`;
      if (this.props.singleSelect) {
        positiveClass = `${positiveClass} ${genClassName('disabled')}`;
      }
    }

    return (
      <div className={genClassName('container')}>
        <div className={genClassName('actions')}>
          <div className={positiveClass} onClick={this.onPositiveClick} role="button" tabIndex={0}>
            {this.renderPositiveContent()}
          </div>
          <div className={negativeClass} onClick={this.onNegativeClick} role="button" tabIndex={0}>
            {this.renderNegativeContent()}
          </div>
        </div>
      </div>
    );
  }
}

export { BinaryFeedback };