import * as bcrypt from 'bcrypt';
import { NumericType } from 'typeorm';

interface SeedProduct {
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    isActive: boolean;
    expirationDate: Date;
    tags: string;
    rating: number;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: number;
    brandId:number;
}

interface SeedUser {
    email: string;
    password: string;
    fullName: string;
    roles: string[];
}

interface SeedCategory {
    name: string;
}

interface SeedBrand{
    name: string;
}

interface SeedBanner {
    name: string;
    imageUrl: string;
    categoryId: number;
}

interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
    categories: SeedCategory[];
    banners: SeedBanner[];
    brand: SeedBrand[];
}

function randomDate(): Date {
    const baseDate = new Date();
    const daysRandom =  Math.floor(Math.random() * 31);
    const randomDaysInMilliseconds = daysRandom * 24 * 60 * 60 * 1000;
    return new Date(baseDate.getTime() - randomDaysInMilliseconds);
}

function randomRaiting(): number {
    var rand = Math.random()*(5-0) + 0;
    var power = Math.pow(10, 2);
    return Math.floor(rand*power) / power;
}

export const initialData: SeedData = {

    users: [
        {
            email: 'irwing@hotmail.com',
            fullName: 'Irwing',
            password: bcrypt.hashSync('Melody123', 10),
            roles: ['user', 'admin']
        },
        {
            email: 'melody@hotmail.com',
            fullName: 'La Cachetona',
            password: bcrypt.hashSync('Melody123', 10),
            roles: ['user']
        }
    ],
    categories: [
        {
            name: "Computadoras y tablets"
        },
        {
            name: "Hogar, Cocina y Jardín"
        },
        {
            name: "Videojuegos"
        },
        {
            name: "Libros"
        },
        {
            name: "Películas, Series de TV y Música"
        },
        {
            name: "Herramientas y Mejoras del Hogar"
        },
        {
            name: "Automotriz y Motocicletas"
        },
        {
            name: "Juegos y Juguetes"
        },
        {
            name: "Mascotas y Accesorios"
        },
        {
            name: "Moda"
        }
    ],
    brand: [
        {
            name: "Apple"
        },
        {
            name: "Zara Home"
        },
        {
            name: "PlayStation (Sony)"
        },
        {
            name: "HarperCollins"
        },
        {
            name: "Disney"
        },
        {
            name: "Stanley"
        },
        {
            name: "Mercedes-Benz"
        },
        {
            name: "Mattel"
        },
        {
            name: "Petco"
        },
        {
            name: "Gucci"
        }
    ],
    products: [
        {
            name: "Apple MacBook Pro con chip Apple M1",
            description: "Chip M1 diseñado por Apple para un gran salto en CPU, GPU y rendimiento de aprendizaje automático - Obtén hasta 20 horas de autonomía de la batería.",
            price: 13499.00,
            quantity: 10,
            categoryId: 1,
            brandId:1,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 2,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "iPad Pro 2021",
            description: "El iPad Pro cuenta con el potente chip Apple M1, que te da un rendimiento de siguiente nivel y autonomía de batería para todo el día. Cuenta con una pantalla de sumersión Liquid Retina XDR de 12.9 pulgadas, perfecta para ver y editar fotos y videos HDR. Modelos celulares 5G para velocidades asombrosas lejos de Wi-Fi. También cuenta con una cámara frontal con Center Stage que te mantiene automáticamente en el marco durante las videollamadas. El iPad Pro tiene cámaras profesionales y un escáner LiDAR para disfrutar de fotos, videos y realidad aumentada de sumersión. Thunderbolt para conectar accesorios de alto rendimiento. Puedes agregar un Apple Pencil para tomar notas, dibujar y hacer anotaciones de documentos, así como el Magic Keyboard para una experiencia de escritura sensible y trackpad.⁴ Características principales: con chip Apple M1 para un rendimiento de siguiente nivel. Pantalla Liquid Retina XDR brillante de 12.9 pulgadas con ProMotion, True Tone y sistema de cámara TrueDepth de color P3 con cámara ultraancha y cámara con Central Stage de 10MP y 12MP. Escáner LiDAR para AR5G de sumersión para descargas súper rápidas y transmisión de alta calidad. Mantente conectado con el Wi-FiGo ultrarrápido con autonomía de batería para todo el día. Puerto Thunderbolt para conectarse a almacenamiento externo rápido, pantallas, docksFace ID para autenticación segura, audio de los altavoces Apple PayFour y cinco micrófonos con calidad de estudio.",
            price: 13243.00,
            quantity: 10,
            categoryId: 1,
            brandId:1,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 5,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Samsung LC24F390FHLXZX",
            description: "Con una pantalla de 1,800R, disfruta de un campo de visión parecido a una pantalla iMax, una gran curva con radio de 1,800 mm que crea un campo visual amplio, mejora la profundidad y minimiza la distracción para que te concentres en tu contenido.",
            price: 1999.00,
            quantity: 10,
            categoryId: 1,
            brandId:1,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 3,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Licuadora Profesional con 4 velocidades | BL610",
            description: "La batidora profesional Ninja 1000 presenta un diseño elegante y un rendimiento sobresaliente con 1000 vatios de potencia profesional de 64 onzas de capacidad máxima de líquido.",
            price: 1677.00,
            quantity: 10,
            categoryId: 2,
            brandId:2,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 2,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Cabeza de Ducha de Lluvia de Alta Presión",
            description: "La regadera cuadrada ofrece ducha de lluvia fina y densa con la alta presión, que relaja y masajea el cuerpo al bañarse, experiencia agradable para iniciar un día fresco o descansar después de un día de trabajo.",
            price: 235.00,
            quantity: 10,
            categoryId: 2,
            brandId:2,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 3,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Yale Security Yale Assure Llave de bloqueo",
            description: "Abre la puerta con el código de entrada del teclado y deja atrás el voluminoso llavero. Para usarlo con su teléfono inteligente o sistema doméstico inteligente, se requiere el kit de actualización Yale Access (se vende por separado). Bloqueo automático para mayor tranquilidad: no te olvidaste de cerrar la puerta, tu cerradura lo hizo por ti. Descansa tranquilo sabiendo que tu puerta está cerrada con llave cada vez que sales de casa y cuando te acuestas por la noche. Deja de esconder claves: compartir códigos es la nueva forma de esconder una clave.",
            price: 4279.00,
            quantity: 10,
            categoryId: 2,
            brandId:1,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 3,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Xbox Series X 1TB Consola",
            description: "La Versión Internacional corresponde a un producto vendido en distintos países. Esta consola no incluye soporte local de la marca pero sí está respaldada por las políticas de devolución de Amazon México. Presentamos Xbox Series X, la consola Xbox más rápida y potente de la historia. Juega miles de títulos de cuatro generaciones de consolas: todos los juegos se ven y se juegan mejor en Xbox Series X.",
            price: 11699.00,
            quantity: 10,
            categoryId: 3,
            brandId:3,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 2,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "PlayStation®5 (Modelo Slim)",
            description: "Diseño Slim Con PS5, los jugadores obtienen una potente tecnología de juego incluida en un diseño de consola elegante y compacto. 1 TB de almacenamiento: Mantenga sus juegos favoritos listos y esperando a que los inicie y juegue con 1 TB de almacenamiento SSD integrado: SSD de ultra alta velocidad Maximiza tus sesiones de juego con tiempos de carga casi instantáneos para los juegos de PS5 instalados.",
            price: 11599.00,
            quantity: 10,
            categoryId: 3,
            brandId:3,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 1,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Nintendo Switch - OLED Model",
            description: "Embárcate en una épica aventura a través de la superficie y los cielos de Hyrule con la consola Nintendo Switch – Modelo OLED – Edición The Legend of Zelda: Tears of the Kingdom.",
            price: 9719.00,
            quantity: 10,
            categoryId: 3,
            brandId:3,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 4,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "El Principito",
            description: "El principito es una fábula infantil que disfrutan por igual los niños y adultos. Publicada por primera vez en 1943, la novela se ha traducido a más de 250 idiomas, incluida una versión en Braile. También es uno de los libros más vendidos en el mundo, después de la Biblia y El capital de Karl Marx. El autor se estrella con su avión en medio del desierto del Sahara y encuentra a un niño, que es un príncipe de otro planeta. Se trata de un relato poético que es filosófico e incluye crítica social. Hace diversas observaciones sobre la naturaleza humana y su lectura es placentera y al mismo tiempo invita a la reflexión. Y naturalmente, está pensado para lectores de todas las edades. El principito es una narración corta del escritor francés Antoine de Saint-Exupéry. La historia se centra en un pequeño príncipe que realiza una travesía por el universo. En este viaje descubre la extraña forma en que los adultos ven la vida y comprende el valor del amor y la amistad. El principito es considerado como uno de los mejores libros de todos los tiempos y como un clásico contemporáneo de la literatura universal. Debido a su estilo sencillo y directo, se lo ha considerado un libro para niños. No obstante, su carácter reflexivo sobre la vida, la sociedad y el amor, lo convierten en una narración de interés para todos. Editorial: Silver Dolphin Infantil Materia Cuentos Clásicos ISBN: 9786076189498 Páginas: 68 Encuadernación: PASTA DURA Producto: NUEVO Contamos con mas de 20 años de experiencia y gran cobertura en retail y eCommerce. Conoce nuestros sellos editoriales Silver Dolphin y Numen.",
            price: 69.00,
            quantity: 10,
            categoryId: 4,
            brandId:14,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 3,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Los Juegos del Hambre 5",
            description: "Cuando te roban todo lo que amas, ¿queda algo por lo que luchar? Amanece el día de los Quincuagésimos Juegos del Hambre y el miedo atenaza a los distritos de Panem. Este año, en honor al Vasallaje de los Veinticinco, se llevarán de sus hogares al doble de tributos. En el Distrito 12, Haymitch Abernathy intenta no pensar demasiado en sus probabilidades. Lo único que le importa es que se acabe el día para poder estar con su chica. Cuando anuncian el nombre de Haymitch, todos sus sueños se rompen en pedazos. Lo separan de su familia y de su amada, y lo envían al Capitolio con los otros tres tributos del Distrito 12: una amiga que es casi como una hermana pequeña para él, un chico obsesionado con analizar apuestas y la chica más estirada de la ciudad. Cuando empiezan los Juegos, Haymitch comprende que en el Capitolio quieren que fracase.",
            price: 489.00,
            quantity: 10,
            categoryId: 4,
            brandId:4,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 1,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Sunrise on the Reaping",
            description: "As the day dawns on the fiftieth annual Hunger Games, fear grips the districts of Panem. This year, in honor of the Quarter Quell, twice as many tributes will be taken from their homes. Back in District 12, Haymitch Abernathy is trying not to think too hard about his chances. All he cares about is making it through the day and being with the girl he loves.",
            price: 514.00,
            quantity: 10,
            categoryId: 4,
            brandId:4,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Titanic",
            description: "Director James Cameron's epic blockbuster, at the time the most expensive movie ever, won a record-tying 11 Academy Awards, including Best Picture and Best Director. As an undersea expedition explores the remains of the RMS Titanic, a survivor of the doomed ship relates her account of the 1912 voyage, when, as a young socialite, she had a life-changing romance with a handsome steerage passenger. Leonardo DiCaprio, Kate Winslet, Billy Zane, Gloria Stuart star; includes Celine Dion's hit My Heart Will Go On. 194 min. Widescreen; Soundtrack: English. Two-disc set.",
            price: 295.04,
            quantity: 10,
            categoryId: 5,
            brandId:5,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 4,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Flow",
            description: "A wondrous journey, through realms natural and mystical, Flow follows a courageous cat after his home is devastated by a great flood. Teaming up with a capybara, a lemur, a bird, and a dog to navigate a boat in search of dry land, they must rely on trust, courage, and wits to survive the perils of a newly aquatic planet. From the boundless imagination of the award-winning filmmaker Gints Zilbalodis (Away) comes a thrilling animated spectacle as well as a profound meditation on the fragility of the environment and the spirit of friendship and community. Steeped in the soaring possibilities of visual storytelling, Flow is a feast for the senses and a treasure for the heart.",
            price: 748.65,
            quantity: 10,
            categoryId: 5,
            brandId:5,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 3,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "The Wild Robot",
            description: "From DreamWorks Animation comes an adaptation of Peter Brown's award-winning, #1 New York Times bestseller, The Wild Robot. The epic adventure stars Academy Award® winner Lupita Nyong'o (Us, the Black Panther franchise) as Roz, a robot that is shipwrecked on an uninhabited island and must adapt to the harsh surroundings. Gradually Roz starts building relationships with the animals on the island, including a clever fox voiced by Pedro Pascal (The Last of Us, The Mandalorian), and becomes the adoptive parent of an orphaned gosling named Brightbill. The Wild Robot is a powerful story about self-discovery, a thrilling examination of the bridge between technology and nature, and a moving exploration of what it means to be alive and connected to all living things.",
            price: 957.29,
            quantity: 10,
            categoryId: 5,
            brandId:5,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Koblenz WD-5 MA",
            description: "Experimente la gran potencia de la aspiradora seco mojado Koblenz WD-5 MA y su potente motor de 3.5 hp caballos de fuerza le permite un alto nivel de succión. Los 5 galones de capacidad le permiten aspirar tu hogar con facilidad o realizar trabajos pequeños eficientemente.",
            price: 938.49,
            quantity: 10,
            categoryId: 6,
            brandId:6,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Bosch Rotomartillo inalámbrico GSB 183",
            description: "El taladro percutor y atornillador inalámbrico GSB 183-LI de Bosch es perfecto para perforar con percusión y atornillar en metal, albañilería y madera. Tiene un torque máximo de 60NM para enfrentar cualquier desafío y un diámetro máximo de perforación de 35mm en madera y 10mm en acero. Cuenta con un mandril metálico que bloquea mejor el accesorio, proporcionando mayor seguridad, robustez, durabilidad y un sistema de enganche rápido del mandril que ahorra tiempo y esfuerzo.",
            price: 2395.59,
            quantity: 10,
            categoryId: 6,
            brandId:16,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Pretul NL-12P",
            description: "La garantía de Grupo Truper cubre más de 25,000 accesorios y refacciones, con costo mínimo o sin costo de mano de obra. Cuenta con 177 centros de servicio en México y 15 países de Latinoamérica, no se requiere presentar la nota de compra para hacerla válida.",
            price: 1095.00,
            quantity: 10,
            categoryId: 6,
            brandId:6,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Fundas de Asiento",
            description: "Esta funda de asiento de coche es adecuada para la gran mayoría de modelos del mercado, como los asientos traseros bajos de coches, camiones, todoterrenos y furgonetas.",
            price: 599.00,
            quantity: 10,
            categoryId: 7,
            brandId:7,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Funda de Coche Impermeable",
            description: "El material suave no raya la capa de pintura, por lo que tu coche siempre se verá bien. Verifique el modelo y Tamaño de su automóvil antes de comprar esta lona para automóvil.La funda completa para automóvil se adapta a la longitud de un Auto (520*200*150 cm).",
            price: 350.00,
            quantity: 10,
            categoryId: 7,
            brandId:7,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: 'Funda',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "SuperSprings TSS-107-47",
            description: "Cada SumoSpring está hecho a mano con cuidado, lo que hace que cada uno sea único con sus propias características naturales, como ligeras variaciones de color y burbujas de superficie, prueba de la artesanía que entra en cada pieza.",
            price: 7255.00,
            quantity: 10,
            categoryId: 7,
            brandId:7,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "TAMASHII NATIONS Son Goku Ultra Instinct",
            description: "Tamashii Nations vuelve a presentar, dentro de la colección S. H. Figuarts, la figura de Son Goku Ultra Instinct. Está basada en el personaje del anime Dragon Ball Super y mide 14 cm. Incluye 3x placas faciales (estándar, gritando y de combate), 3x pares de manos intercambiables y efecto Kamehameha.",
            price: 1601.00,
            quantity: 10,
            categoryId: 8,
            brandId:8,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Figura de Vinilo de Pato de Goma Batman Cosplaying",
            description: "Diseñados y fabricados por Numskull Designs, estos mini coleccionables con licencia oficial son parte de la gama TUBBZ, una serie altamente coleccionable de tus personajes favoritos de juegos, películas, programas de televisión y cultura pop en forma de pato Ahora puedes disfrutarlos en forma mini.",
            price: 294.00,
            quantity: 10,
            categoryId: 8,
            brandId:8,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Figura de Shinobu Kocho de Demon Slayer",
            description: "De Banpresto. Shinobu Kocho es de la serie de anime, Kimetsu no Yaiba (Demon Slayer). Ella es una cazadora de demonios y el insecto Hashira del Cuerpo Asesino de Demonios. Shinobu es bastante relajado, siempre teniendo una sonrisa en su cara, independientemente de la situación en la que se encuentra. Ella parece disfrutar burlándose de otros y puede ser bastante sádico al respecto, disfrutando más notablemente de elegir a Giyu Tomioka. Siendo Hashira del Cuerpo de Asesinos de Demonios, Shinobu es uno de los espadachines más poderosos y hábiles de toda la organización.",
            price: 758.00,
            quantity: 10,
            categoryId: 8,
            brandId:8,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Multietapa 10 kg Alimento de calidad profesional",
            description: "Este producto está fabricado con materiales de calidad. El producto es fácil de usar y se adapta a todos.",
            price: 490.00,
            quantity: 10,
            categoryId: 9,
            brandId:9,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "CLEAN & DRY Arena Aglutinante con Aroma 5Kg",
            description: "Arena aglutinante con esferas aromatizantes. CLEAN DRY es un nombre de marca reconocido. Nuestros estándares son lo que nos distingue, y nuestra calidad es lo que nos recomanda. Lea atentamente las instrucciones antes de usar.",
            price: 51.00,
            quantity: 10,
            categoryId: 9,
            brandId:9,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "INABA Churu Premios para Gato, Mix Recetas de Atún, Delicioso Puré Cremoso Bajo en Calorías, 50pzs",
            description: "¡Deleita a tu gato con la irresistible Variedad de Churu Recetas de Atún! El snack perfecto que lo hará ronronear de felicidad! Este delicioso mix de premios en forma de puré, incluye 4 deliciosas recetas: Atún, Atún con Vieira, Atún con sabor a Almejas y Atún con sabor a Cangrejo, brindando a tu felino una experiencia única de sabor. Con su textura cremosa y delicioso sabor, estos snacks libres de granos, saborizantes, colorantes ni conservadores artificiales son ideales para consentir a tu gatito y promover su bienestar. Además, son perfectos para tomar junto con medicamentos. Su alta humedad proporciona el equilibrio que los felinos necesitan para mantenerse hidratados y saludables. Ya sea alimentándolos directamente de la mano, vertiéndolos en un plato o añadiéndolos como aderezo en sus alimentos, nuestros Churus de Inaba ofrecen una forma innovadora e interactiva de pasar tiempo de calidad y reforzar la relación con tu mascota ¡Haz que cada momento sea inolvidable y sorprende a tu gatito con nuestros premios irresistibles!.",
            price: 660.00,
            quantity: 10,
            categoryId: 9,
            brandId:9,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Skechers Zapato Go Walk Joy para mujer Modelo Ancho",
            description: "Malla de aire atlética sin cordones",
            price: 1199.00,
            quantity: 10,
            categoryId: 10,
            brandId:10,
            imageUrl: '',
            isActive: true,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Unilexi - chamarra de mezclilla corta de manga 3/4",
            description: "Las chaquetas de mezclilla recortadas están disponibles en una variedad de colores, chamarra de mezclilla rosa, chamarra de mezclilla azul, chamarra de mezclilla blanca, chamarra de mezclilla amarilla, chamarra de mezclilla púrpura, hermoso color, muestra tu vitalidad.",
            price: 351.00,
            quantity: 10,
            categoryId: 10,
            brandId:10,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        },
        {
            name: "Pantalones de Pata Ancha para Mujer Ligeros Cintura Ajustable con Nudo de Corbata Sueltos",
            description: "Pantalones de Pata Ancha para Mujer Ligeros de Cintura Ajustable con Nudo de Corbata Sueltos Pantalones Cómodos y Casuales con Bolsillo.",
            price: 269.00,
            quantity: 10,
            categoryId: 10,
            brandId:10,
            imageUrl: '',
            isActive: false,
            expirationDate: new Date('2025-12-31'),
            tags: '',
            rating: randomRaiting(),
            reviewCount: 0,
            createdAt: randomDate(),
            updatedAt: new Date()
        }
    ],
    banners: [
        {
            name: 'Encuentra el regalo perfecto para Mamá',
            imageUrl: 'https://m.media-amazon.com/images/G/33/dravizz/Mothers/Stores/StoresBanners2/Mothers25_Banner04_RP_1500x300.jpg',
            categoryId: 4
        },
        {
            name: 'Mesa de regalos para tu Bebe',
            imageUrl: 'https://m.media-amazon.com/images/G/33/img24/PROGRAMS/BR_benefits_landing/BBREGISTRY_DSKBANNER_BENEFICIOS_1500X200.jpg',
            categoryId: 4
        },
        {
            name: 'Streaming',
            imageUrl: 'https://m.media-amazon.com/images/I/61Y83YbjBRL._SX3000_.jpg',
            categoryId: 5
        },
        {
            name: 'Ofertas en Telefonia',
            imageUrl: 'https://http2.mlstatic.com/D_NQ_699014-MLA84353305067_052025-OO.webp',
            categoryId: 1
        },
        {
            name: 'Ofertas en Llantas',
            imageUrl: 'https://http2.mlstatic.com/D_NQ_643007-MLA83998433254_052025-OO.webp',
            categoryId: 8
        },
        {
            name: 'Ofertas en Moda',
            imageUrl: 'https://http2.mlstatic.com/D_NQ_821587-MLA82645694985_022025-OO.webp',
            categoryId: 9
        }
    ]
}