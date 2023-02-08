import { useState } from "react"
import { StyleSheet} from "react-native"
import { Overlay } from '@rneui/themed';    




interface Props {
    children: JSX.Element
}


const MenuOverlay = (props: Props) => {
    const {children} = props
    const [visible, setVisibile] = useState(false);

    const handleOpenMenu = () => {
        setVisibile(true);
    }
    
    const handleCloseMenu = () => {
        setVisibile(false)
    }

    return <Overlay isVisible={false} overlayStyle={styles.overlayOpen}>
        {children}
    </Overlay>
}


const styles = StyleSheet.create({
    overlayOpen: {
        width: "100%",
        minHeight: "70%",
       backgroundColor: "#161619",
       justifyContent: "center",
       alignItems: "center",
    }
})

export default MenuOverlay