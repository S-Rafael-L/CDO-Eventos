
# Decisión 000

Nunca volveremos a usar "..." en el código.

Todo ejemplo deberá estar completo y listo para copiar.

# Decisión 001

Las vistas estarán separadas en archivos independientes.

Motivo:
Facilita el mantenimiento y el crecimiento del proyecto.

# Decisión 002

La aplicación será SPA.

Motivo:
Mayor velocidad y mejor experiencia de usuario.


# Decisión 004

Módulo de Asistentes

Hoy acabamos de definir algo que, en mi opinión, será uno de los mayores aciertos de CDO Eventos.

No tendremos una pantalla saturada de información.

Tendremos un Centro de Operaciones.

# ADR-001 — Centro de Operaciones

Decisión

La pantalla principal de Asistentes no mostrará la lista completa.

Motivo

La acción principal es buscar o registrar.
Una lista de cientos de asistentes degrada la experiencia.
Reduce el tiempo para encontrar las acciones más utilizadas.

Consecuencia

Se crea una vista independiente llamada Lista de Asistentes.

# ADR-002 — Responsabilidad Única

Cada pantalla responderá únicamente a una pregunta.

Ejemplos:

Asistentes

¿Qué asistente necesito administrar?

Dashboard

¿Cómo va el evento?

Configuración

¿Qué deseo modificar?

# ADR-003 — Mobile First

Todas las decisiones se tomarán pensando primero en el teléfono.

Después adaptaremos a tablet y computadora.
