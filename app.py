from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta'

# Datos de ejemplo de usuarios (se recomienda utilizar una base de datos en un entorno de producción)
usuarios = {
    'usuario1@example.com': {'contrasena': 'contraseña1', 'nombre': 'Usuario 1'},
    'usuario2@example.com': {'contrasena': 'contraseña2', 'nombre': 'Usuario 2'},
    # Agrega más usuarios si es necesario
}

# Base de datos ficticia de productos agrupados por categorías
productos_por_categoria = {
    'BODAS': [
        {"id": 1, "nombre": "Boda Tradicional", "precio": 100, "descripcion": "Una ceremonia clásica que sigue las tradiciones culturales y religiosas, seguida de una elegante recepción.", "imagen": "vestido1.jpg"},
        {"id": 2, "nombre": "Boda Temática", "precio": 150, "descripcion": "Una celebración única que sigue un tema específico, como una boda de destino en la playa, una boda vintage o una boda inspirada en una película.", "imagen": "ramo_flores.jpg"},
        {"id": 3, "nombre": "Mini-Boda Íntima", "precio": 120, "descripcion": "Una ceremonia más pequeña y personalizada con un número reducido de invitados, ideal para parejas que prefieren una celebración más íntima y relajada.", "imagen": "kit_decoracion.jpg"}
    ],
    'CONFERENCIAS Y SEMINARIOS': [
        {"id": 4, "nombre": "Conferencia de Negocios", "precio": 80, "descripcion": "Un evento profesional que reúne a líderes y expertos en negocios para discutir tendencias, estrategias y mejores prácticas.", "imagen": "boleto_conferencia.jpg"},
        {"id": 5, "nombre": "Seminario de Desarrollo Personal", "precio": 90, "descripcion": "Una experiencia de aprendizaje que ofrece talleres y charlas motivadoras sobre crecimiento personal, liderazgo y bienestar.", "imagen": "taller_liderazgo.jpg"},
        {"id": 6, "nombre": "Conferencia Tecnológica", "precio": 110, "descripcion": "Un encuentro enfocado en la innovación y la tecnología, donde se exploran nuevas ideas, tendencias y avances en el campo de la tecnología.", "imagen": "libro_conferencia.jpg"}
    ],
    # Agregar más categorías y productos según sea necesario
}

# Página de inicio de sesión
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        if correo in usuarios and usuarios[correo]['contrasena'] == contrasena:
            # Inicio de sesión exitoso, almacenamos el correo del usuario en la sesión
            session['correo'] = correo
            return redirect('/catalogo')
        else:
            # Credenciales incorrectas, redirigimos de nuevo a la página de inicio de sesión con un mensaje de error
            return render_template('login.html', mensaje_error='Credenciales incorrectas. Inténtalo de nuevo.')
    else:
        return render_template('login.html')

# Página de catálogo de productos
@app.route('/catalogo')
def catalogo():
    if 'correo' in session:
        usuario = usuarios[session['correo']]
        return render_template('catalogo.html', productos_por_categoria=productos_por_categoria, nombre_usuario=usuario['nombre'])
    else:
        return redirect('/login')

# Ruta para cerrar sesión
@app.route('/logout')
def logout():
    session.pop('correo', None)
    return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)
