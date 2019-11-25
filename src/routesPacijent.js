/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import IzmenaProfila from "views/IzmenaProfila";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Login from "login.js";
import Registracija from "registracija";
import KlinickiCentar from "views/KlinickiCentar.jsx";
import PocetnaStranaPacijenta from "views/PocetnaStranaPacijenta.jsx";
import ListaZahtevaAdminKC from "views/ListaZahtevaAdminKC.jsx";
import Sifrarnik from "views/Sifrarnik.jsx";

const dashboardRoutes = [
  //za lekara
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana",
    icon: "pe-7s-graph",
    component: PocetnaStranaPacijenta,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Izmena profila",
    icon: "pe-7s-user",
    component: IzmenaProfila,
    layout: "/admin"
  }
];

export default dashboardRoutes;
