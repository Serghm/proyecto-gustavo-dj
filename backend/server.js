require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod'); // 1. Importamos Zod

const prisma = new PrismaClient();
const app = express();

// --- ESQUEMAS DE VALIDACIÓN (ZOD) ---
// Definimos las reglas exactas que el formulario DEBE cumplir
const contactoSchema = z.object({
    nombre: z.string().min(2, "El nombre es muy corto").max(100, "El nombre es muy largo"),
    telefono: z.string().min(10, "Teléfono inválido").max(15, "Teléfono muy largo"),
    correo: z.string().email("Formato de correo inválido"),
    servicio: z.enum(["Bodas", "XV Años", "Corporativo", "Cabinas/Muebles", "Otro"], {
        errorMap: () => ({ message: "Selecciona un servicio válido" })
    })
});

// --- CAPAS DE SEGURIDAD Y CONFIGURACIÓN ---

// 2. CORS Restringido: Solo tu dominio frontend tiene la llave
const dominiosPermitidos = ['http://localhost:3000']; 
// Nota: Cuando subas el proyecto a producción, agregarás el dominio real aquí.

app.use(cors({
    origin: function (origin, callback) {
        // Permite la petición si viene de tu frontend (o si no tiene origen definido en desarrollo)
        if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por CORS: Origen no autorizado'));
        }
    }
}));

app.use(helmet()); 
app.use(express.json({ limit: '10kb' })); 


// --- RUTAS ---

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

app.post('/api/contacto', async (req, res) => {
    try {
        console.log(" Datos recibidos:", req.body);

        // 3. Pasamos los datos por el Escudo Zod
        // Si hay código malicioso o formatos incorrectos, el código se detiene aquí.
        const datosValidados = contactoSchema.parse(req.body);

        // Si pasó el escudo, usamos "datosValidados" para guardar en MongoDB
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
        // 4. Capturamos los errores específicos de Zod para avisarle al usuario
        if (error instanceof z.ZodError) {
            console.error(' ERROR DE VALIDACIÓN:', error.errors);
            return res.status(400).json({ 
                error: 'Datos con formato incorrecto', 
                detalles: error.errors 
            });
        }

        console.error(' ERROR AL GUARDAR EN BASE DE DATOS:', error);
        res.status(500).json({ error: 'No se pudo guardar la información' });
    }
});

// --- ARRANQUE DEL SERVIDOR ---
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