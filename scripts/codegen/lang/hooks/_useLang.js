import { useContext } from 'react';

/**
 * Get currently selected language.
 * @returns {Array.<string, function>} Tuple. Similar to `useState`, first element is value and second one is setter.
 * The value is two letter codes of currently selected language. E.g. `id`, `en`.
 */
export default function useLang(LocaleContext) {
  const { lang, setLang } = useContext(LocaleContext);

  return [lang, setLang];
}
