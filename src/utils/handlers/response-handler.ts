//Paso 1 creo los handlers

export const responseHandler = async (
    res: Response,
    okStatus?: number 
  ): Promise<{ data?: object; message: string }> => {
    if (res.status === (okStatus || 200))
      return { data: await res.json(), message: "The request was resolved successfully" };
    if (res.status === 400) return { message: `${res.status} Invalid data` };
    if (res.status === 403) return { message: `${res.status} Not authorized` };
    if (res.status === 404) return { message: `${res.status} Not found` };
    if (res.status === 409)
      return { message: `${res.status} There was a conflict with the request` };
    if (res.status === 500) return { message: `${res.status} Server error` };
  
    return { message: `${res.status} Unhandled error on api response` };
  };