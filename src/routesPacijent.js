
import IzmenaProfilaPacijent from "views/IzmenaProfilaPacijent.jsx";
import PocetnaStranaPacijenta from "views/PocetnaStranicaPacijenta.jsx";
import ListaKlinika from "views/ListaKlinika.jsx";
import ZdravstveniKarton from "views/ZdravstveniKarton.jsx";
import BrzoZakazivanje from "views/BrzoZakazivanje.jsx";
import IstorijaPOPacijenta from "views/IstorijaPOPacijenta.jsx";
import PotvrdaPregleda from "views/PotvrdaPregleda.jsx";

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
