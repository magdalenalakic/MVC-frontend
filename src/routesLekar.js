
import IzmenaProfila from "views/IzmenaProfila.jsx";
import ZahtevZaGodOdmor from "views/ZahtevLekar.jsx";
import PocetnaStranicaLekara from "views/PocetnaStranicaLekara.jsx";
import ListaPacijenata from "views/ListaPacijenataLekar.jsx";
// import Pregled from "views/Pregled.jsx";

const dashboardRoutes = [
 
  //za lekara 
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana Lekara",
    icon: "pe-7s-home",
    component: PocetnaStranicaLekara,
    layout: "/admin"
  },
  
  {
    path: "/listaPacijenataLekar",
    name: "Lista pacijenata",
    icon: "pe-7s-news-paper",
    component: ListaPacijenata,
    layout: "/admin"
  },
  {
    path: "/izmenaProfilaLekara",
    name: "Izmena profila",
    icon: "pe-7s-user",
    component: IzmenaProfila,
    layout: "/admin"
  },
  {
    path: "/zahtevLekar",
    name: "Zahtev za odmor odsustvo",
    icon: "pe-7s-date",
    component: ZahtevZaGodOdmor,
    layout: "/admin"
  },
  // {
  //   path: "/zakazivanjePregleda",
  //   name: "Zakazivanje pregleda",
  //   icon: "pe-7s-date",
  //   component: ZakazivanjePregleda,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
