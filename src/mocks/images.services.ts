
export const fetchImages = async (device:string) => {
    // Creamos un objeto de respuesta simulado
    const mockResponse = [{
        _id: "1",
        src: "/indexImg-d.jpg",
        device: "desktop",
        alt: "Imagen 1"       
    },
    {
        _id: "2",
        src: "/indexImg-m.jpeg",
        device: "tablet",
        alt: "Imagen 1"       
    },
        
    ]
  
    const response= mockResponse.filter((image)=>image.device===device)[0];
    // Retornamos la respuesta simulada
    return response;
  }

 