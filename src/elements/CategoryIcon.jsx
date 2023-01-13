import {ReactComponent as FoodIcon} from '../images/cat_comida.svg';
import {ReactComponent as PurchasesIcon} from '../images/cat_compras.svg';
import {ReactComponent as BillsIcon} from '../images/cat_cuentas-y-pagos.svg';
import {ReactComponent as EntertainmentIcon} from '../images/cat_diversion.svg';
import {ReactComponent as HomeIcon} from '../images/cat_hogar.svg';
import {ReactComponent as ClothesIcon} from '../images/cat_ropa.svg';
import {ReactComponent as PersonalCareIcon} from '../images/cat_salud-e-higiene.svg';
import {ReactComponent as TransportIcon} from '../images/cat_transporte.svg';

const CategoryIcon = ({id}) => {
    switch (id) {
        case "Food":
            return <FoodIcon/>;
        case "Bills":
            return <BillsIcon/>;
        case "Home":
            return <HomeIcon/>;
        case "Transport":
            return <TransportIcon/>;
        case "Clothes":
            return <ClothesIcon/>;
        case "Personal Care":
            return <PersonalCareIcon/>;
        case "Purchases":
            return <PurchasesIcon/>;
        case "Entertainment":
            return <EntertainmentIcon/>;
        default:
            break;
    }
}

export default CategoryIcon;