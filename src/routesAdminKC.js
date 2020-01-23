import KlinickiCentarPocetna from "views/PocetnaStranicaAdminaKC.jsx";
import IzmenaProfilaAdminaKC from "views/IzmenaProfilaAdminaKC.jsx";
import ListaZahtevaAdminKC from "views/ListaZahtevaAdminKC.jsx";
import Sifrarnik from "views/Sifrarnik.jsx";

const dashboardRoutes = [
  //za admina KC
  {    
    path: "/klinickiCentar",
    name: "Klinicki Centar",
    icon: "pe-7s-home",
    component: KlinickiCentarPocetna,
    layout: "/admin"
  },
  {    
    path: "/profilAdmina",
    name: "Profil",
    icon: "pe-7s-user",
    component: IzmenaProfilaAdminaKC,
    layout: "/admin"
  },
  {    
    path: "/listaZahteva",
    name: "Zahtevi za registraciju",
    icon: "pe-7s-news-paper",
    component: ListaZahtevaAdminKC,
    layout: "/admin"
  },
  {    
    path: "/sifrarnik",
    name: "Šifrarnik",
    icon: "pe-7s-menu",
    component: Sifrarnik,
    layout: "/admin"
  }
 
  
];

export default dashboardRoutes;
