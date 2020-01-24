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
import BrzoZakazivanje from "views/BrzoZakazivanje.jsx";
import IstorijaPOPacijenta from "views/IstorijaPOPacijenta.jsx";
import PotvrdaPregleda from "views/PotvrdaPregleda.jsx";
import PregledKlinika from "views/PregledKlinika.jsx";
const dashboardRoutes = [
  //za pacijenta
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana",
    icon: "pe-7s-home",
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
  // {
  //   path: "/pregledKlinika",
  //   name: "Pregled klinika",
  //   icon: "pe-7s-keypad",
  //   component: PregledKlinika,
  //   layout: "/admin"
  // },
  {
    path: "/brzoZakazivanje",
    name: "Brzo Zakazivanje",
    icon: "pe-7s-next",
    component: BrzoZakazivanje,
    layout: "/admin"
  },

  {
    path: "/klinikePacijenta",
    name: "Klinike",
    icon: "pe-7s-menu",
    component: ListaKlinika,
    layout: "/admin"
  },
  {
    path: "/zdravstveniKarton",
    name: "Zdravstveni karton",
    icon: "pe-7s-note2",
    component: ZdravstveniKarton,
    layout: "/admin"
  },
  {
    path: "/istorija",
    name: "Istorija pregleda",
    icon: "pe-7s-news-paper",
    component: IstorijaPOPacijenta,
    layout: "/admin"
  },
  {
    path: "/potvrdaPregleda",
    name: "Potvrda pregleda",
    icon: "pe-7s-check",
    component: PotvrdaPregleda,
    layout: "/admin"
  }
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
