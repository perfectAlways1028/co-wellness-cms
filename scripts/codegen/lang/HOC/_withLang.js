import React from 'react';
import { object } from 'prop-types';
import { LocaleConsumer } from '../../context/locale';

function withLocale(Component) {
  const Localized = props => {
    return <LocaleConsumer>{state => <Component {...props} {...state} />}</LocaleConsumer>;
  };

  Localized.propTypes = {
    locale: object,
  };

  Localized.defaultProps = {
    locale: {},
  };

  return Localized;
}

export default withLocale;
