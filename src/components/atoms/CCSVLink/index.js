import {CSVLink} from "react-csv";
class CCSVLink extends CSVLink {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const { data, headers, separator, uFEFF } = nextProps;
		this.setState({ href: this.buildURI(data, uFEFF, headers, separator) });
	}
}

export default CCSVLink