require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');

// Inicializamos el cliente de Prisma
const prisma = new PrismaClient();
const app = express();

// --- CAPAS DE SEGURIDAD Y CONFIGURACIÓN ---

// Permite que el frontend (puerto 3000) se comunique con este servidor
app.use(cors()); 

// Agrega cabeceras de seguridad para proteger el servidor
app.use(helmet()); 

// Permite leer el cuerpo de las peticiones en formato JSON (máximo 10kb para evitar ataques)
app.use(express.json({ limit: '10kb' })); 


// --- RUTAS ---

// 1. Ruta de salud: Para verificar que el servidor y la base de datos están OK
app.get('/api/health', async (req, res) => {
    try {
        // Hacemos una consulta rápida para validar la conexión
        await prisma.$queryRaw`SELECT 1`; 
        res.status(200).json({ 
            estado: 'Servidor operativo', 
            database: 'Conectada exitosamente a MongoDB' 
        });
    } catch (error) {
        res.status(500).json({ error: 'Falla en la conexión a la base de datos' });
    }
});

// 2. Ruta de Contacto: Aquí se reciben los datos de Gustavo
app.post('/api/contacto', async (req, res) => {
    try {
        // Log para ver en la terminal lo que llega desde el formulario
        console.log(" Datos recibidos:", req.body);

        const { nombre, telefono, correo } = req.body;

        // Validación básica
        if (!nombre || !telefono || !correo) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // GUARDADO: Usamos "lead" porque así se llama tu modelo en schema.prisma
        const nuevoRegistro = await prisma.lead.create({
            data: {
                nombre: String(nombre),
                telefono: String(telefono),
                correo: String(correo)
            }
        });

        console.log(' Éxito al guardar en MongoDB:', nuevoRegistro);
        
        // Respuesta positiva al frontend
        res.status(201).json({ 
            mensaje: 'Éxito', 
            id: nuevoRegistro.id 
        });

    } catch (error) {
        // Este log es vital: si algo falla, aquí verás el porqué en rojo en tu terminal
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
    -------------------------------------------
    `);
});