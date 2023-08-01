import { useState, useContext, useEffect, ChangeEvent } from 'react';
import {
  CardContent,
  Typography,
  TextField,
  IconButton,
  Box,
  useMediaQuery,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataUser } from '../../context/UserDataContext.jsx';
import { theme } from '@/styles/material-theme';

const matchField: Record<string, string> = {
  email: 'Email',
  firstname: 'Nombre',
  lastname: 'Apellido',
  dni: 'CUIT',
  phone: 'Teléfono',
  password: 'Contraseña',
};

const PersonalData = () => {
  const { userData, setUserData, token } = useContext(DataUser);
  const [fields, setFields] = useState<{
    [key: string]: string;
  }>({
    email: '',
    firstname: '',
    lastname: '',
    dni: '',
    phone: '',
    password: '*******',
  });
  const [editingFields, setEditingFields] = useState<{
    [key: string]: string;
  }>({});
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const desktop = useMediaQuery(theme.breakpoints.up('desktop'));

  useEffect(() => {
    if (userData) {
      setFields({
        ...fields,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        dni: userData.dni,
        phone: userData.phone,
      });
    }
  }, [userData]);

  const handleEditField = (fieldName: string) => {
    setEditingFields((prevFields) => ({
      ...prevFields,
      [fieldName]: fields[fieldName],
    }));
  };

  const handleFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditingFields((prevFields) => ({
      ...prevFields,
      [fieldName]: e.target.value,
    }));
  };

  const handleCancel =  () => {
    setEditingFields({});
  };
  const handleSaveFields = async () => {
    const endpoint = `https://digitalmoney.ctd.academy/api/users/${userData.user_id}`;
    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(editingFields),
      });

      if (response.ok) {
        const updatedUserData = { ...userData, ...editingFields };
        setUserData(updatedUserData);
        setEditingFields({});
      } else {
        console.error('Failed to update fields:', Object.keys(editingFields));
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0px 5px 3px rgba(0, 0, 0, 0.1)',
        paddingY: 1,
        width: mobile ? '90vw' : '100%',
        paddingX: mobile ? 0 : 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}
        >
          <Typography
            variant='h3'
            style={{
              paddingBottom: mobile ? 16 : 24,
              fontSize: 20,
              borderBottom: mobile ? '1px solid #ccc' : 'none',
              fontWeight: 'bold',
            }}
          >
            Tus datos
          </Typography>
          {Object.keys(editingFields).length > 0 && (
            <Box>
              <Button
                sx={{
                  marginRight: 3,
                  '&:hover': {
                    transitionDelay: '0.05s',
                  },
                }}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                variant='contained'
                sx={{
                  paddingX: 3,
                  paddingY: 1,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: mobile ? 10 : 14,
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                  transitionDelay: '0.05s',
                  '&:hover': {
                    color: 'secondary.main',
                    transitionDelay: '0.05s',
                  },
                }}
                onClick={handleSaveFields}
              >
                Guardar cambios
              </Button>
            </Box>
          )}
        </Box>
        {Object.entries(fields).map(([fieldName, value]) => {
          return (
            <Box
              key={fieldName}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ccc',
                paddingBottom: 2,
              }}
            >
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    marginY: '5px',
                    display: tablet || desktop ? 'flex' : '',
                  }}
                >
                  <Typography
                    variant='body1'
                    style={{ marginRight: 16, width: 200, fontSize: 16 }}
                  >
                    {matchField[fieldName]}
                  </Typography>

                  {editingFields.hasOwnProperty(fieldName) ? (
                    <TextField
                      data-testid='editing-input'
                      variant='outlined'
                      value={editingFields[fieldName]}
                      onChange={(e) => handleFieldChange(fieldName, e)}
                      fullWidth
                      autoFocus
                      sx={{
                        marginLeft: '80px',
                        fontSize: 16,
                        padding: 0,
                        paddingLeft: '4px',
                        fieldset: { borderColor: 'white' },
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: 'white',
                          },
                          '&:hover fieldset': {
                            borderColor: 'white',
                          },
                        },
                      }}
                      inputProps={{
                        style: {
                          paddingTop: 0,
                          paddingBottom: 0,
                          paddingLeft: 1,
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      variant='body1'
                      style={{
                        fontSize: '1rem',
                        color: '#636363',
                        paddingLeft: 1,
                      }}
                    >
                      {value}
                    </Typography>
                  )}
                </Box>
              </Box>

              {editingFields.hasOwnProperty(fieldName) ? (
                <></>
              ) : (
                fieldName !== 'email' &&
                fieldName !== 'dni' && (
                  <IconButton
                    onClick={() => handleEditField(fieldName)}
                    sx={{ height: 40 }}
                    data-testid={`edit-icon-${fieldName}`}
                  >
                    <EditIcon style={{ color: '#cacaca' }} />
                  </IconButton>
                )
              )}
            </Box>
          );
        })}
      </CardContent>
    </Box>
  );
};

export default PersonalData;
