require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const rateLimit = require('express-rate-limit');

const prisma = new PrismaClient();
const app = express();

// anti-spam limite de peticiones
const contactoLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { 
        error: "Se ha detectado actividad inusual. Por favor, intenta enviar tu mensaje de nuevo en 15 minutos." 
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

// anti correo temporal
const dominiosBloqueados = [
    '10minutemail.com', 
    'tempmail.com', 
    'yopmail.com', 
    'mailinator.com',
    'guerrillamail.com'
];

// esquema de validacion para zod
const contactoSchema = z.object({
    nombre: z.string()
        .min(2, "El nombre es muy corto")
        .max(100, "El nombre es muy largo")
        .trim()
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
        .toLowerCase()
        .refine(email => {
            const dominio = email.split('@')[1];
            return !dominiosBloqueados.includes(dominio);
        }, { message: "No se permiten correos temporales o desechables" }),
    servicio: z.enum(["Bodas", "XV Años", "Corporativo", "Cabinas/Muebles", "Otro"], {
        errorMap: () => ({ message: "Selecciona un servicio válido" })
    }),
    // 
    fecha: z.string().min(1, "La fecha es requerida"),
    hora: z.string().min(1, "La hora es requerida"),
    ubicacion: z.string().min(5, "La dirección de envío/evento es muy corta").trim(),
    detalles: z.string().optional().default(""), // Permite que venga vacío
});

// capas de seguridad
const dominiosPermitidos = ['http://localhost:3000']; 

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
app.use(express.json({ limit: '10kb' }));


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

        const datosValidados = contactoSchema.parse(req.body);

        // pasamos los 8 campos a Prisma
        const nuevoRegistro = await prisma.lead.create({
            data: {
                nombre: datosValidados.nombre,
                telefono: datosValidados.telefono,
                correo: datosValidados.correo,
                servicio: datosValidados.servicio,
                fecha: datosValidados.fecha,
                hora: datosValidados.hora,
                ubicacion: datosValidados.ubicacion,
                detalles: datosValidados.detalles
            }
        });

        console.log(' Éxito al guardar en MongoDB:', nuevoRegistro);
        res.status(201).json({ 
            mensaje: 'Éxito', 
            id: nuevoRegistro.id 
        });

    } catch (error) {
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