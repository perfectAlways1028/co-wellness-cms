import { node } from 'prop-types';

function ContextProvider({ children }) {
  return children;
}

ContextProvider.propTypes = {
  children: node.isRequired,
};

export default ContextProvider;
