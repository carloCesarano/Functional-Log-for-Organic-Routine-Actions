import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";
import {styles} from "../../styles/toastMessage";

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={[styles.toast, {borderLeftColor: 'green'}]}
            contentContainerStyle={styles.content}
            text1Style={styles.title}
            text2Style={styles.text}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={[styles.toast, {borderLeftColor: 'red'}]}
            contentContainerStyle={styles.content}
            text1Style={styles.title}
            text2Style={styles.text}
        />
    )
}

export function ToastShow({type, title, message} : {type:string, title:string, message:string}) {
    Toast.show({
        type: type,
        text1: title,
        text2: message
    })
}

export default function ToastMessage() {
    return (
        <Toast config={toastConfig}/>
    )
}