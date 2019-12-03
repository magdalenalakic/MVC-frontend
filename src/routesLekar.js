
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
import PocetnaStranicaLekara from "views/PocetnaStranicaLekara.jsx";
import ListaZahtevaAdminKC from "views/ListaZahtevaAdminKC.jsx";
import Sifrarnik from "views/Sifrarnik.jsx";

const dashboardRoutes = [
 
  //za lekara 
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana Lekara",
    icon: "pe-7s-graph",
    component: PocetnaStranicaLekara,
    layout: "/admin"
  },
  {
    path: "/izmenaProfilaLekara",
    name: "Izmena profila",
    icon: "pe-7s-user",
    component: IzmenaProfila,
    layout: "/admin"
  }
];

export default dashboardRoutes;
