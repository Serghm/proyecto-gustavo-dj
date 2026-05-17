require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');

const prisma = new PrismaClient();
const app = express();

// anti-spam limete de peticiones
const contactoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de tiempo: 15 minutos
  max: 3, // Límite estricto: Máximo 3 peticiones por IP en esos 15 minutos
  message: { 
    error: "Se ha detectado actividad inusual. Por favor, intenta enviar tu mensaje de nuevo en 15 minutos." 
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// anti correo temporal
// Aquí podemos agregar más dominios si notamos que llega spam de otros sitios
const dominiosBloqueados = [
    '10minutemail.com', 
    'tempmail.com', 
    'yopmail.com', 
    'mailinator.com',
    'guerrillamail.com'
];

// esquema de validacion para zod
// validamos formatos, limpiamos la entrada y bloqueamos correos falsos
const contactoSchema = z.object({
    nombre: z.string()
        .min(2, "El nombre es muy corto")
        .max(100, "El nombre es muy largo")
        .trim() // Elimina espacios fantasmas al inicio y final
        // Rechaza caracteres sospechosos de etiquetas HTML
        .refine(val => !/[<>]/g.test(val), {
            message: "El nombre contiene caracteres no permitidos (< o >)"
        }),
    telefono: z.string()
        .min(10, "Teléfono inválido")
        .max(15, "Teléfono muy largo")
        .trim()
        .regex(/^[0-9+()-\s]+$/, "El teléfono contiene caracteres inválidos"),
    correo: z.string()
        .email("Formato de correo inválido")
        .trim()
        .toLowerCase() // Normaliza el correo 
        // Bloqueo de dominios temporales
        .refine(email => {
            const dominio = email.split('@')[1]; // Extrae lo que está después de la @
            return !dominiosBloqueados.includes(dominio); // Si el dominio está en la lista negra, lanza error
        }, { message: "No se permiten correos temporales o desechables" }),
    servicio: z.enum(["Bodas", "XV Años", "Corporativo", "Cabinas/Muebles", "Otro"], {
        errorMap: () => ({ message: "Selecciona un servicio válido" })
    })
});

// capaas de seguridad
const dominiosPermitidos = ['http://localhost:3000']; 
// Nota: cuando se suba a produccion cambiar aqui el dominio de Gustavo

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por CORS: Origen no autorizado'));
        }
    }
}));

app.use(helmet()); 
app.use(express.json({ limit: '10kb' })); // Protege contra payloads masivos


// rutas

app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`; 
        res.status(200).json({ 
            estado: 'Servidor operativo', 
            database: 'Conectada exitosamente a MongoDB' 
        });
    } catch (error) {
        res.status(500).json({ error: 'Falla en la conexión a la base de datos' });
    }
});

app.post('/api/contacto', contactoLimiter, async (req, res) =>{
    try {
        console.log(" Datos recibidos:", req.body);

        // pasamos los datos por el Escudo Zod 
        // si hay código malicioso o formatos incorrectos, la ejecución salta directo al catch.
        const datosValidados = contactoSchema.parse(req.body);

        // Si pasó el escudo, usamos "datosValidados" (datos limpios) para guardar en MongoDB
        const nuevoRegistro = await prisma.lead.create({
            data: {
                nombre: datosValidados.nombre,
                telefono: datosValidados.telefono,
                correo: datosValidados.correo,
                servicio: datosValidados.servicio 
            }
        });

        console.log(' Éxito al guardar en MongoDB:', nuevoRegistro);
        res.status(201).json({ 
            mensaje: 'Éxito', 
            id: nuevoRegistro.id 
        });

    } catch (error) {
        // Capturamos los errores específicos de Zod para avisarle al usuario
        if (error instanceof z.ZodError) {
            console.error(' ERROR DE VALIDACIÓN:', error.errors);
            return res.status(400).json({ 
                error: 'Datos con formato incorrecto', 
                detalles: error.errors.map(err => ({ campo: err.path[0], mensaje: err.message }))
            });
        }

        console.error(' ERROR AL GUARDAR EN BASE DE DATOS:', error);
        res.status(500).json({ error: 'No se pudo guardar la información' });
    }
});

// arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
     Servidor Backend Encendido
     Puerto: ${PORT}
     ORM: Prisma con MongoDB
     Seguridad: Zod + Helmet Activados
    -------------------------------------------
    `);
});