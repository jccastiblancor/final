import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import localesEsMessages from "./locales/es";
import localesEnMessages from "./locales/en";
import App from "./components/App";

const getBrowserLang = () => {
  return navigator.language || navigator.userLanguage;
};

const getLocales = () => {
  return getBrowserLang().includes("en")
    ? localesEnMessages
    : localesEsMessages;
};

ReactDOM.render(
  <IntlProvider locale={getBrowserLang()} messages={getLocales()}>
    <App />
  </IntlProvider>,
  document.querySelector("#root")
);

serviceWorkerRegistration.register();

reportWebVitals();
