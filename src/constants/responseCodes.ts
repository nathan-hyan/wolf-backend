export const HTTP_CODES = {
  OK: {code: 200, message: "¡Peticion completada con exito!"},
  CREATED: {code: 201, message: "¡Item creado con exito!"},
  BAD_REQUEST: {code: 400, message: "El servidor no sabe como interpretar esto. Reintente por favor"},
  UNAUTHORIZED: {code: 401, message: "No tenés los permisos necesarios para esto"},
  NOT_FOUND: {code: 404, message: "Lo que estás buscando no se puede encontrar"},
  CONFLICT: {code: 409, message: "Existe un conflicto con esta petición. Por favor, contacte un Administrador."},
  SERVER_ERROR: {code: 500, message: "Existe un error en el servidor. Por favor, contacte un Administrador."},
};
