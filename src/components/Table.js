import PropTypes from "prop-types";
import classNames from "classnames";
import Moment from "react-moment";

import { formatDecimalNumber, getCategory, getColorCode } from "../utils";

function Table(props) {
  const { values } = props;

  return (
    <div className="row">
      <div className="col col-xl-10 mx-xl-auto mb-4">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>City</th>
              <th>Current AQI</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, i) => {
              const category = getCategory(value.aqi);
              const colorCode = getColorCode(value.aqi);
              return (
                <tr
                  className={classNames({
                    [`category-${category.slug}`]: true,
                  })}
                  key={i}
                >
                  <td>
                    <span>{value.city}</span>
                  </td>
                  <td>
                    <span style={{ color: colorCode }}>
                      {formatDecimalNumber(value.aqi)}
                    </span>
                  </td>
                  <td>
                    <Moment fromNow>{value.updated}</Moment>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Table;
