import React from 'react';
import { node, instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import sanitizeLang from '../helper/sanitizeLang';

const COOKIE_DOMAIN = process.env.NODE_ENV === 'development' ? 'localhost' : '.domain.com';

const languages = {
  id: 'id',
  en: 'en',
};

const LocaleContext = React.createContext({
  lang: languages.id,
  setLang: () => {},
});

class _LocaleProvider extends React.Component {
  static propTypes = {
    children: node.isRequired,
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      lang: sanitizeLang(cookies.get('lang')),
      setLang: this.handleLanguageChange,
    };
  }

  handleLanguageChange = lang => {
    const { cookies } = this.props;

    // cookie should not expire
    const date = new Date('2070-12-31');

    cookies.set('lang', lang, { path: '/', secure: false, domain: COOKIE_DOMAIN, httpOnly: false, expires: date });

    this.setState({ lang });
  };

  render() {
    const { children } = this.props;

    return <LocaleContext.Provider value={this.state}>{children}</LocaleContext.Provider>;
  }
}

const LocaleConsumer = LocaleContext.Consumer;

const LocaleProvider = withCookies(_LocaleProvider);

export { LocaleContext, LocaleProvider, LocaleConsumer, languages };
