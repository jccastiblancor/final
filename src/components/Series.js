import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

import Grafica from "./Grafica";

const Series = () => {
  const getBrowserLang = () => {
    return navigator.language || navigator.userLanguage;
  };

  const [series, setSeries] = useState(null);
  const url = getBrowserLang().includes("en")
    ? "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json"
    : "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";

  const fetchData = async () => {
    const data = await axios.get(url);
    setSeries(data.data);
    localStorage.setItem("series", data);
  };

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("series") !== null) {
        setSeries(localStorage.getItem("series").data);
      }
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderHeaders = (cols) => {
    return cols.map((col) => {
      return (
        <th key={col} scope="col">
          <FormattedMessage id={col} />
        </th>
      );
    });
  };

  const renderBody = (cols) => {
    return series.map((item, index) => {
      return (
        <tr key={item.id}>
          {cols.map((col) => {
            return <td key={col}>{item[col]}</td>;
          })}
        </tr>
      );
    });
  };

  const limpiezaColumnas = (cols) => {
    _.remove(cols, function (col) {
      return col === "seasons" || col === "webpage" || col === "poster";
    });
    return cols;
  };

  const renderSeries = () => {
    var columnas = Object.keys(series[0]);
    columnas = limpiezaColumnas(columnas);
    return (
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>{renderHeaders(columnas)}</tr>
            </thead>
            <tbody>{renderBody(columnas)}</tbody>
          </table>
          <Grafica
            titulo={getBrowserLang().includes("en") ? "Seasons" : "Temporadas"}
            data={series}
            width={700}
            height={700}
            margin={{ top: 10, left: 100, bottom: 40, right: 10 }}
          />
        </div>
      </div>
    );
  };
  if (series) {
    return renderSeries();
  } else {
    return <div> Cargando </div>;
  }
};

export default Series;
