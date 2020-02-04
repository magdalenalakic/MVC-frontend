import IzmenaProfila from "views/IzmenaProfila";
import ListaPacijenata from "views/ListaPacijenataLekar"

import PocetnaStranicaLekara from "views/PocetnaStranicaLekara.jsx";

const dashboardRoutes = [
  //za lekara
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana Lekara",
    icon: "pe-7s-home",
    component: PocetnaStranicaLekara,
    layout: "/lekar"
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
    layout: "/lekar"
  }
];

export default dashboardRoutes;
