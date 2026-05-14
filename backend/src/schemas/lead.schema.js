const { z } = require('zod');

const validarLead = z.object({
    nombre: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres.")
        .max(60, "El nombre excede el límite permitido.")
        .trim(), // Elimina espacios en blanco accidentales al inicio o final
    
    telefono: z.string()
        .regex(/^[0-9]{10}$/, "El teléfono debe contener exactamente 10 números sin espacios ni guiones."),
    
    correo: z.string()
        .email("El formato del correo electrónico es inválido.")
        .trim()
        .toLowerCase() 
});

module.exports = { validarLead };