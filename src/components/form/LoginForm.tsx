import CustomInput from "./CustomInput";
import { Control } from "react-hook-form/dist/types";
import Box from "@mui/material/Box";
import styles from './LoginForm.module.css';

interface Props {
    control: Control,
    type: string,
    name: string,
    label: string,
    title: string,
    helperText?: string,
    error?: boolean,
    onKeyUp?: () => void;
}

const LoginForm = ({ control, type, name, label, title, helperText, error, onKeyUp }: Props) => {

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{textAlign: 'center', color: "white"}}>
                    <h3 className={styles.dynamicTitle}>{title}</h3>
                </div>
                <div style={{alignSelf: 'center'}}>
                    <CustomInput control={control} type={type} name={name} label={label} helperText={helperText} error={error} onKeyUp={onKeyUp} />
                </div>
            </Box>
        </>
    )
};

export default LoginForm;