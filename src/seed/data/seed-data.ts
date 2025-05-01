import * as bcrypt from 'bcrypt';

interface SeedProduct {
    name: string;
    price: number;
    description: string;
    stock: number;
    categoryId: number;
}

interface SeedUser {
    email:    string;
    password: string;
    fullName: string;
    roles:     string[];
}

interface SeedCategory {
    name:    string;
}

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
    categories: SeedCategory[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'irwing@hotmail.com',
            fullName: 'Irwing',
            password: bcrypt.hashSync( 'Melody123', 10 ),
            roles: ['admin']
        },
        {
            email: 'melody@hotmail.com',
            fullName: 'La Cachetona',
            password: bcrypt.hashSync( 'Melody123', 10 ),
            roles: ['user']
        }
    ],
    categories: [
        {
            name: "Computacion"
        },
        {
            name: "Muebles"
        },
        {
            name: "Smartphone"
        }
    ],
    products: [
        {
            name: "ASUS Laptop ROG Strix G16",
            description: "POTENCIA TU JUEGO: Obtén la mayor cantidad de FPS y gana más partidas con Windows 11 Home, procesador Intel Core i7-13650HX de 13.ª generación y una GPU NVIDIA GeForce RTX 4060 compatible con DLSS 3 y ROG Boost de 2420MHz* a 140W.",
            price: 29499.00,
            stock: 10,
            categoryId: 1
        },
        {
            name: "SAMSUNG Galaxy S24 FE",
            description: "Conoce Galaxy S24 FE con Galaxy AI, donde cada foto desata una creatividad sin límites. Sumérgete en la experiencia completa de Galaxy AI y desbloquea innumerables formas de explorar tu imaginación. Utiliza Photo Assist para cambiar fácilmente el tamaño, mover y eliminar objetos no deseados en tus fotos. Transforma imágenes cotidianas en impresionantes obras de arte con nuestra herramienta de edición asistida por AI.",
            price: 9599.00,
            stock: 10,
            categoryId: 3
        },
        {
            name: "Muebles para Baño",
            description: "Este mueble para baño tiene 5 capas de almacenamiento, y las manijas de las puertas y los pies son dorados. Alacena tiene estantes ajustables que se pueden usar en muchas situaciones y brindan un almacenamiento integral. El diseño del gabinete para baño está pensado para mantener una apariencia ordenada, lo que lo hace práctico y hermoso",
            price: 1999.00,
            stock: 10,
            categoryId: 2
        }
    ]
}