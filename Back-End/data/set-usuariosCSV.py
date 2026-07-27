import csv
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
import random
from typing import List, Tuple
import unicodedata


TOTAL_USUARIOS = 250
SEED = 20260727


NOMBRES_MASCULINOS = [
    "Juan", "Jose", "Luis", "Carlos", "Jorge", "Pedro", "Alejandro", "Lucas", "Mateo", "Joaquin",
    "Santiago", "Martin", "Gabriel", "Nicolas", "Federico", "Matias", "Ezequiel", "Facundo", "Tomas", "Agustin",
    "Daniel", "David", "Diego", "Eduardo", "Emiliano", "Esteban", "Gonzalo", "Guillermo", "Hernan", "Ignacio",
    "Javier", "Leandro", "Leonardo", "Maximiliano", "Pablo", "Patricio", "Rodrigo", "Ramiro", "Sebastian", "Valentin",
    "Bruno", "Dante", "Enzo", "Franco", "Gino", "Ian", "Julian", "Lautaro", "Marcos", "Thiago"
]

NOMBRES_FEMENINOS = [
    "Maria", "Ana", "Carmen", "Rosa", "Silvia", "Patricia", "Lucia", "Camila", "Martina", "Sofia",
    "Valentina", "Catalina", "Victoria", "Florencia", "Agustina", "Rocio", "Micaela", "Julieta", "Paula", "Carla",
    "Adriana", "Alejandra", "Andrea", "Beatriz", "Claudia", "Cristina", "Daniela", "Elena", "Gabriela", "Graciela",
    "Guadalupe", "Juana", "Karina", "Laura", "Lorena", "Marcela", "Mariana", "Natalia", "Romina", "Sabrina",
    "Antonella", "Belen", "Celeste", "Delfina", "Guillermina", "Lujan", "Milagros", "Sol", "Zoe", "Candela"
]

APELLIDOS_ARGENTINOS = [
    "Gonzalez", "Rodriguez", "Gomez", "Fernandez", "Lopez", "Diaz", "Martinez", "Perez", "Alvarez", "Romero",
    "Sosa", "Ruiz", "Torres", "Ramirez", "Flores", "Benitez", "Acosta", "Medina", "Herrera", "Aguirre",
    "Pereira", "Gimenez", "Vera", "Molina", "Silva", "Cabrera", "Campos", "Cardozo", "Correa", "Dominguez",
    "Escobar", "Farias", "Franco", "Godoy", "Juarez", "Ledesma", "Luna", "Maldonado", "Mansilla", "Marquez",
    "Meza", "Miranda", "Moreno", "Ojeda", "Ortiz", "Paz", "Peralta", "Ponce", "Quiroga",
    "Rios", "Rojas", "Salazar", "Salinas", "Sanchez", "Sandoval", "Suarez", "Tapia", "Vazquez", "Vega",
    "Villalba", "Villegas", "Zarate", "Zappia", "Zuniga", "Bustos", "Carrizo", "Castillo", "Caceres", "Chavez",
    "Contreras", "Cruz", "Delgado", "Duarte", "Figueroa", "Galiano", "Gareca", "Ibarra", "Leguizamon", "Lencina"
]

CIUDADES_ARGENTINAS = [
    "Buenos Aires", "La Plata", "Mar del Plata", "Rosario", "Cordoba", "Villa Maria", "San Luis", "Mendoza",
    "San Rafael", "San Juan", "Resistencia", "Corrientes", "Posadas", "Neuquen", "General Roca", "Bariloche",
    "Trelew", "Rawson", "Comodoro Rivadavia", "Ushuaia", "Rio Grande", "Salta", "Jujuy", "Tucuman",
    "Santiago del Estero", "Catamarca", "La Rioja", "Santa Fe", "Rafaela", "Reconquista", "Venado Tuerto",
    "Concordia", "Parana", "Gualeguaychu", "Villa Carlos Paz", "Rio Cuarto", "Olavarria", "Bahia Blanca",
    "Junin", "Pergamino", "Tandil", "Necochea", "San Nicolas", "Zarate", "Campana", "Azul", "Mercedes"
]

PAISES_HISPANOHABLANTES = [
    "Mexico", "Chile", "Uruguay", "Paraguay", "Bolivia", "Peru", "Ecuador", "Colombia",
    "Venezuela", "Costa Rica", "Guatemala", "Panama", "Republica Dominicana",
    "Honduras", "Nicaragua", "El Salvador"
]


@dataclass
class Usuario:
    id: str
    email: str
    nombre: str
    rol: str
    puntos: int
    racha: int
    password: str
    edad: int
    genero: str
    lugar: str
    desafio: str
    sentimiento: str
    mascota: str
    tiempo: str
    tokens: int
    ultimaConexion: str
    createdAt: str

def limpiar_texto(texto: str) -> str:
    nfkd = unicodedata.normalize('NFKD', texto)
    return "".join([c for c in nfkd if not unicodedata.combining(c)]).lower()


def generar_racha() -> int:
    valores = [random.gauss(15, 7) for _ in range(1000)]
    racha = int(random.choice(valores))
    return max(0, min(30, racha))


def generar_puntos(racha: int) -> int:
    base = racha * 18
    ruido = random.randint(-40, 40)
    puntos = base + ruido
    return max(0, min(600, puntos))


def generar_edad() -> int:
    r = random.random()

    if r < 0.35:
        return random.randint(20, 30)
    elif r < 0.80:
        return random.randint(31, 50)
    else:
        return random.randint(51, 75)


def generar_genero() -> str:
    r = random.random()

    if r < 0.46:
        return "Masculino"
    elif r < 0.92:
        return "Femenino"
    else:
        return "Prefiero no decirlo"


def generar_nombre_completo(genero: str) -> Tuple[str, str, str]:

    if genero == "Masculino":
        nombre = random.choice(NOMBRES_MASCULINOS)

    elif genero == "Femenino":
        nombre = random.choice(NOMBRES_FEMENINOS)

    else:
        nombre = random.choice(NOMBRES_MASCULINOS + NOMBRES_FEMENINOS)

    apellido = random.choice(APELLIDOS_ARGENTINOS)
    nombre_completo = f"{nombre} {apellido}"

    return nombre, apellido, nombre_completo


def generar_email(nombre: str, apellido: str, emails_existentes: set) -> str:

    n_limpio = limpiar_texto(nombre).replace(" ", "")
    a_limpio = limpiar_texto(apellido).replace(" ", "")

    base = f"{n_limpio}.{a_limpio}"
    email = f"{base}@correo.com"

    contador = 1

    while email in emails_existentes:
        contador += 1
        email = f"{base}{contador}@correo.com"

    emails_existentes.add(email)

    return email


def generar_lugar() -> str:

    if random.random() < 0.90:
        return random.choice(CIUDADES_ARGENTINAS)
    else:
        return random.choice(PAISES_HISPANOHABLANTES)


def generar_desafio(edad: int) -> str:

    opciones = [
        "Numeros basicos",
        "Porcentajes",
        "Finanzas cotidianas",
        "Geometria basica",
        "Construccion civil",
        "Comercio minorista",
        "Economia domestica",
        "Estimulacion cognitiva",
    ]

    if edad <= 30:
        pesos = [0.2, 0.1, 0.1, 0.3, 0.2, 0.1, 0.0, 0.0]

    elif edad <= 50:
        pesos = [0.05, 0.25, 0.3, 0.05, 0.05, 0.2, 0.05, 0.05]

    else:
        pesos = [0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.4, 0.4]

    return random.choices(opciones, weights=pesos, k=1)[0]
def generar_sentimiento(racha: int) -> str:
    opciones = ["Relajado", "Motivado", "Ansioso", "Confundido", "Curioso", "Concentrado"]

    if racha >= 18:
        pesos = [0.25, 0.4, 0.05, 0.05, 0.05, 0.2]
    elif racha <= 8:
        pesos = [0.05, 0.05, 0.35, 0.3, 0.2, 0.05]
    else:
        pesos = [0.15, 0.2, 0.15, 0.15, 0.2, 0.15]

    return random.choices(opciones, weights=pesos, k=1)[0]


def generar_mascota() -> str:
    opciones = ["", "suma", "resta", "multiplicacion", "division", "geometria"]
    pesos = [0.35, 0.11, 0.11, 0.11, 0.11, 0.21]

    return random.choices(opciones, weights=pesos, k=1)[0]


def generar_tiempo() -> str:
    opciones = ["", "5 minutos", "10 minutos", "+15 minutos", "+30 minutos"]
    pesos = [0.25, 0.2, 0.2, 0.2, 0.15]

    return random.choices(opciones, weights=pesos, k=1)[0]


def generar_tokens(puntos: int) -> int:
    ratio = puntos / 600.0
    base_tokens = int(ratio * 500)
    ruido = random.randint(-25, 25)
    tokens = base_tokens + ruido

    return max(0, min(500, tokens))


def generar_fechas() -> Tuple[str, str]:
    inicio = datetime(2024, 5, 1, 0, 0, 0)
    fin = datetime(2026, 7, 31, 23, 59, 59)
    delta_total = int((fin - inicio).total_seconds())

    segundos_creacion = random.randint(0, delta_total)
    dt_created = inicio + timedelta(seconds=segundos_creacion)

    delta_conexion = int((fin - dt_created).total_seconds())
    segundos_conexion = random.randint(0, delta_conexion) if delta_conexion > 0 else 0
    dt_conexion = dt_created + timedelta(seconds=segundos_conexion)

    return (
        dt_created.strftime("%Y-%m-%dT%H:%M:%S"),
        dt_conexion.strftime("%Y-%m-%dT%H:%M:%S"),
    )


def generar_usuario(i: int, emails_existentes: set) -> Usuario:
    user_id = f"user-{i:03d}"
    genero = generar_genero()
    nombre, apellido, nombre_completo = generar_nombre_completo(genero)
    email = generar_email(nombre, apellido, emails_existentes)
    rol = "usuario"
    password = "User123!"
    edad = generar_edad()
    racha = generar_racha()
    puntos = generar_puntos(racha)
    lugar = generar_lugar()
    desafio = generar_desafio(edad)
    sentimiento = generar_sentimiento(racha)
    mascota = generar_mascota()
    tiempo = generar_tiempo()
    tokens = generar_tokens(puntos)
    created_at, ultima_conexion = generar_fechas()
    return Usuario(
        id=user_id,
        email=email,
        nombre=nombre_completo,
        rol=rol,
        puntos=puntos,
        racha=racha,
        password=password,
        edad=edad,
        genero=genero,
        lugar=lugar,
        desafio=desafio,
        sentimiento=sentimiento,
        mascota=mascota,
        tiempo=tiempo,
        tokens=tokens,
        ultimaConexion=ultima_conexion,
        createdAt=created_at
    )


def guardar_csv(usuarios: List[Usuario], nombre_archivo: str = "usuarios.csv"):
    encabezado = [
        "id", "email", "nombre", "rol", "puntos", "racha", "password",
        "edad", "genero", "lugar", "desafio", "sentimiento", "mascota",
        "tiempo", "tokens", "ultimaConexion", "createdAt"
    ]

    path = Path(nombre_archivo)

    with path.open(mode="w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter=",")
        writer.writerow(encabezado)

        for u in usuarios:
            writer.writerow([
                u.id,
                u.email,
                u.nombre,
                u.rol,
                u.puntos,
                u.racha,
                u.password,
                u.edad,
                u.genero,
                u.lugar,
                u.desafio,
                u.sentimiento,
                u.mascota,
                u.tiempo,
                u.tokens,
                u.ultimaConexion,
                u.createdAt
            ])


def main():
    random.seed(SEED)

    emails_existentes = set()
    usuarios = []

    for i in range(1, TOTAL_USUARIOS + 1):
        usuario = generar_usuario(i, emails_existentes)
        usuarios.append(usuario)

    guardar_csv(usuarios, "usuarios.csv")

    print(f"Archivo usuarios.csv generado correctamente con {TOTAL_USUARIOS} usuarios.")


if __name__ == "__main__":
    main()
