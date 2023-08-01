import TextField from "@mui/material/TextField";
import { FC } from "react";
import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types";
import styles from './CustomInput.module.css';

interface Props {
    control: Control;
    error?: boolean;
    rules?: any;
    name: string;
    type: string;
    label: string;
    helperText?: string;
    onKeyUp?: () => void;
}

const CustomInput: FC<Props> = ({ control, type, rules, name, label, error, helperText, onKeyUp }) => {
    const { field } = useController({ name, control, rules })

    return (
        <TextField
            {...field}
            error={error}
            type={type}
            variant="filled"
            fullWidth
            margin="normal"
            label={label}
            helperText={helperText}
            onKeyUp={onKeyUp}
            sx={{ background: 'white', borderRadius: 2, ".MuiInputLabel-root": {color: 'black'}}}
            className={styles.loginInput}
        />
    )
}

export default CustomInput;