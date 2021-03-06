import PropTypes from "prop-types";
import React from "react";
import { CircularProgress } from "@material-ui/core";

/**
 * Return an HOC wrapper
 * @param {Component} BaseComponent- use other loading component than CircularProgress
 * @param {Component} LoadingComponent- In case we want to use other loading component than CircularProgress
 * @return {Component} the enhanced component
 */
const withLoading = (BaseComponent, LoadingComponent) => {
  /**
   * Return an enhanced component that show loading abilities
   * @param {bool} isEmpty- if there is no data.
   * @param {bool} isLoaded - if isLoaded -> we have load in data
   * @param {string} isEmptyText- if isEmpty -> we will display why with isEmptyText
   * @return {Component} the enhanced component
   */
  const EnhancedComponent = ({ isEmpty, isEmptyText, isLoaded, children, ...rest }) => {
    LoadingComponent = LoadingComponent ? LoadingComponent : CircularProgress;

    return (
      <BaseComponent {...rest}>
        {!isLoaded ? <LoadingComponent /> : isEmpty ? isEmptyText : children}
      </BaseComponent>
    );
  };
  EnhancedComponent.defaultProps = {
    isEmpty: false,
    isLoaded: true,
  };

  EnhancedComponent.propTypes = {
    isEmpty: PropTypes.bool,
    isEmptyText: PropTypes.string,
    isLoaded: PropTypes.bool,
    children: PropTypes.any,
  };
  return EnhancedComponent;
};

withLoading.propTypes = {
  BaseComponent: PropTypes.element,
  LoadingComponent: PropTypes.element,
};

withLoading.defaultProps = {
  LoadingComponent: CircularProgress,
};

export default withLoading;
