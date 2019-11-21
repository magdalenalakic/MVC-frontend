
import KlinickiCentarPocetna from "views/KlinickiCentarPocetna.jsx";
import ListaZahtevaAdminKC from "views/ListaZahtevaAdminKC.jsx";
import Sifrarnik from "views/Sifrarnik.jsx";

const dashboardRoutes = [
  //za admina KC
  {    
    path: "/klinickiCentar",
    name: "Klinicki Centar",
    icon: "pe-7s-graph",
    component: KlinickiCentarPocetna,
    layout: "/admin"
  },
  {    
    path: "/listaZahteva",
    name: "Zahtevi za registraciju",
    icon: "pe-7s-graph",
    component: ListaZahtevaAdminKC,
    layout: "/admin"
  },
  {    
    path: "/sifrarnik",
    name: "Šifrarnik",
    icon: "pe-7s-graph",
    component: Sifrarnik,
    layout: "/admin"
  }
  
];

export default dashboardRoutes;
