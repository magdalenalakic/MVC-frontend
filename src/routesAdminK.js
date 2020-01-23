import Dashboard from "views/Dashboard.jsx";
import izmenaProfilaAdminaKlinike from "views/IzmenaProfilaAdminaKlinike.jsx";
import izmenaKlinike from "views/IzmenaKlinike.jsx"
import listaLekara from "views/ListaLekara.jsx"
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Login from "login.js";
import Registracija from "registracija";
import KlinickiCentar from "views/KlinickiCentar.jsx";
import PocetnaStranicaAdminaKlinike from "views/PocetnaStranicaAdminaKlinike";
import listaPregleda from "views/ListaPregleda.jsx";
import slobodniTermini from "views/SlobodniTermini.jsx"
import listaSala from "views/ListaSala.jsx"
import listaZahteva from "views/ListaZahtevaPregled.jsx"
import izmenaProfila from "views/IzmenaProfila";
import tipoviPregleda from "views/TipoviPregleda.jsx"




const dashboardRoutes = [
 
  //za admina k 
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana ",
    icon: "pe-7s-home",
    component: PocetnaStranicaAdminaKlinike,
    layout: "/admin"
  },
  {
    path: "/izmenaProfilaAdminaKlinike",
    name: "Izmena profila",
    icon: "pe-7s-user",
    component: izmenaProfilaAdminaKlinike,
    layout: "/admin"
  },
  {
    path: "/izmenaKlinike",
    name: "Izmena  klinike",
    icon: "pe-7s-note",
    component: izmenaKlinike,
    layout: "/admin"
  },
  {
    path: "/lekari",
    name: "Lekari",
    icon: "pe-7s-id",
    component: listaLekara,
    layout: "/admin"
  },

  {
    path: "/Pregledi",
    name: "Pregledi",
    icon: "pe-7s-menu",
    component: listaPregleda,
    layout: "/admin"
  },
  {
    path: "/Sale",
    name: "Sale",
    icon: "pe-7s-albums",
    component: listaSala,
    layout: "/admin"
  },
  {
    path: "/slobodniTermini",
    name: "Slobodni termini",
    icon: "pe-7s-note2",
    component: slobodniTermini,
    layout: "/admin"
  },
  {
    path: "/tipoviPregleda",
    name: "Tipovi pregleda",
    icon: "pe-7s-news-paper",
    component: tipoviPregleda,
    layout: "/admin"
  },
  {
    path: "/listaZahtevaPregled",
    name: "Zahtevi za pregled",
    icon: "pe-7s-box1",
    component: listaZahteva,
    layout: "/admin"
  },
  // {
  //   path: "/izmenaProfilaLekara",
  //   name: "Pocetna Strana Admina ",
  //   icon: "pe-7s-graph",
  //   component: izmenaProfila,
  //   layout: "/admin"
  // },

];

export default dashboardRoutes;