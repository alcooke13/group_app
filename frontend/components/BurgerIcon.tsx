import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

interface Props {
    onPress?: () => void;
}

const BurgerIcon = (props: Props) => {
    const {onPress} = props

    return <TouchableOpacity>
        <Ionicons name="ios-menu" size={65} color="#FFFFFF" />
    </TouchableOpacity>

}

export default BurgerIcon;