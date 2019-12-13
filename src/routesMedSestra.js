
import IzmenaProfila from "views/IzmenaProfilaMedSestre.jsx";
import PocetnaStranicaMedSestre from "views/PocetnaStranicaMedSestre.jsx";
import ListaPacijenata from "views/ListaPacijenataMedSestra.jsx";
import OveravanjeRecepata from "views/OveravanjeRecepata.jsx"; 
import ZahtevZaGodOdmor from "views/ZahtevMedSestra.jsx";

const dashboardRoutes = [
 
  //za medicinsku sestru
  {
    path: "/pocetnaStranica",
    name: "Pocetna Strana Medicinske sestre",
    icon: "pe-7s-user",
    component: PocetnaStranicaMedSestre,
    layout: "/admin"
  },
  {
    path: "/listaPacijenata",
    name: "Lista pacijenata",
    icon: "pe-7s-user",
    component: ListaPacijenata,
    layout: "/admin"
  },
  {
    path: "/overavanjeRecepata",
    name: "Overavanje recepata",
    icon: "pe-7s-user",
    component: OveravanjeRecepata,
    layout: "/admin"
  },
  {
    path: "/izmenaProfila",
    name: "Izmena profila",
    icon: "pe-7s-user",
    component: IzmenaProfila,
    layout: "/admin"
  },
  {
    path: "/zahtevZaGodOdmor",
    name: "Zahtev za godisnji odmor",
    icon: "pe-7s-user",
    component: ZahtevZaGodOdmor,
    layout: "/admin"
  }
];

export default dashboardRoutes;
