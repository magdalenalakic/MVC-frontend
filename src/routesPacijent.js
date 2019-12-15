import Dashboard from "views/Dashboard.jsx";
import IzmenaProfilaPacijent from "views/IzmenaProfilaPacijent.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Login from "login.js";
import Registracija from "registracija";
import KlinickiCentar from "views/KlinickiCentar.jsx";
import PocetnaStranaPacijenta from "views/PocetnaStranicaPacijenta.jsx";
import ListaZahtevaAdminKC from "views/ListaZahtevaAdminKC.jsx";
import Sifrarnik from "views/Sifrarnik.jsx";
import ListaKlinika from "views/ListaKlinika.jsx";
import ZdravstveniKarton from "views/ZdravstveniKarton.jsx";

const dashboardRoutes = [
  //za pacijenta
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana",
    icon: "pe-7s-graph",
    component: PocetnaStranaPacijenta,
    layout: "/admin"
  },
  {
    path: "/izmenaProfilaPacijenta",
    name: "Izmena profila",
    icon: "pe-7s-user",
    component: IzmenaProfilaPacijent,
    layout: "/admin"
  },
  {
    path: "/klinikePacijenta",
    name: "Klinike",
    icon: "pe-7s-user",
    component: ListaKlinika,
    layout: "/admin"
  },
  {
    path: "/zdravstveniKarton",
    name: "Zdravstveni karton",
    icon: "pe-7s-user",
    component: ZdravstveniKarton,
    layout: "/admin"
  }
];

export default dashboardRoutes;
