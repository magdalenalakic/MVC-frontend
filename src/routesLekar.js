
import IzmenaProfila from "views/IzmenaProfila";

import PocetnaStranicaLekara from "views/PocetnaStranicaLekara.jsx";


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
