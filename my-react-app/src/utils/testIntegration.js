/**
 * SCRIPT DE PRUEBA PARA LA INTEGRACIÓN FRONTEND-BACKEND
 * 
 * Este script verifica que todos los endpoints estén funcionando correctamente
 * y que la integración entre frontend y backend sea exitosa.
 */

// Configuración de prueba
const API_BASE_URL = 'https://localhost:7000/api/ecommerce';

/**
 * Función para probar un endpoint
 */
async function probarEndpoint(endpoint, metodo = 'GET', datos = null) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (datos) {
      options.body = JSON.stringify(datos);
    }

    console.log(`🔍 Probando: ${metodo} ${endpoint}`);
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Éxito: ${endpoint}`);
      console.log(`   Respuesta:`, data);
      return { exito: true, datos: data };
    } else {
      console.log(`❌ Error: ${endpoint} - ${response.status}`);
      console.log(`   Mensaje:`, data.message);
      return { exito: false, error: data.message };
    }
  } catch (error) {
    console.log(`❌ Error de conexión: ${endpoint}`);
    console.log(`   Error:`, error.message);
    return { exito: false, error: error.message };
  }
}

/**
 * Función principal de pruebas
 */
async function ejecutarPruebas() {
  console.log('🚀 Iniciando pruebas de integración Frontend-Backend');
  console.log('=' .repeat(60));
  
  const resultados = {
    exitosos: 0,
    fallidos: 0,
    detalles: []
  };

  // Lista de endpoints a probar
  const pruebas = [
    { endpoint: '/libros', metodo: 'GET', descripcion: 'Obtener todos los libros' },
    { endpoint: '/categorias', metodo: 'GET', descripcion: 'Obtener todas las categorías' },
    { endpoint: '/libros/bestsellers', metodo: 'GET', descripcion: 'Obtener best sellers' },
    { endpoint: '/libros/buscar?termino=test', metodo: 'GET', descripcion: 'Buscar libros' },
    { endpoint: '/libros/1', metodo: 'GET', descripcion: 'Obtener libro específico (ID: 1)' },
    { endpoint: '/libros/categoria/1', metodo: 'GET', descripcion: 'Obtener libros por categoría (ID: 1)' }
  ];

  // Ejecutar todas las pruebas
  for (const prueba of pruebas) {
    console.log(`\n📋 ${prueba.descripcion}`);
    const resultado = await probarEndpoint(prueba.endpoint, prueba.metodo);
    
    resultados.detalles.push({
      endpoint: prueba.endpoint,
      descripcion: prueba.descripcion,
      resultado: resultado
    });

    if (resultado.exito) {
      resultados.exitosos++;
    } else {
      resultados.fallidos++;
    }
  }

  // Resumen de resultados
  console.log('\n' + '=' .repeat(60));
  console.log('📊 RESUMEN DE PRUEBAS');
  console.log('=' .repeat(60));
  console.log(`✅ Pruebas exitosas: ${resultados.exitosos}`);
  console.log(`❌ Pruebas fallidas: ${resultados.fallidos}`);
  console.log(`📈 Total de pruebas: ${resultados.exitosos + resultados.fallidos}`);

  // Detalles de pruebas fallidas
  if (resultados.fallidos > 0) {
    console.log('\n❌ PRUEBAS FALLIDAS:');
    resultados.detalles
      .filter(d => !d.resultado.exito)
      .forEach(d => {
        console.log(`   • ${d.descripcion}: ${d.resultado.error}`);
      });
  }

  // Recomendaciones
  console.log('\n💡 RECOMENDACIONES:');
  if (resultados.fallidos === 0) {
    console.log('   🎉 ¡Todas las pruebas pasaron! La integración está funcionando correctamente.');
    console.log('   🚀 Puedes proceder a usar la aplicación con confianza.');
  } else {
    console.log('   🔧 Revisa los errores anteriores y asegúrate de que:');
    console.log('      • El backend esté ejecutándose en https://localhost:7000');
    console.log('      • La base de datos esté configurada y ejecutándose');
    console.log('      • Los endpoints estén correctamente implementados');
    console.log('      • No haya problemas de CORS');
  }

  return resultados;
}

/**
 * Función para probar la funcionalidad del frontend
 */
function probarFrontend() {
  console.log('\n🎨 PRUEBAS DEL FRONTEND');
  console.log('=' .repeat(40));
  
  const pruebas = [
    {
      nombre: 'Servicio API',
      verificar: () => {
        try {
          // Verificar que el servicio API esté disponible
          const apiService = require('./src/services/apiService');
          return apiService && apiService.librosService;
        } catch (error) {
          return false;
        }
      }
    },
    {
      nombre: 'Hooks personalizados',
      verificar: () => {
        try {
          const hooks = require('./src/hooks/useApi');
          return hooks && hooks.useLibros && hooks.useCategorias;
        } catch (error) {
          return false;
        }
      }
    },
    {
      nombre: 'Configuración de la app',
      verificar: () => {
        try {
          const config = require('./src/config/appConfig');
          return config && config.API_CONFIG && config.APP_CONFIG;
        } catch (error) {
          return false;
        }
      }
    }
  ];

  pruebas.forEach(prueba => {
    const resultado = prueba.verificar();
    console.log(`${resultado ? '✅' : '❌'} ${prueba.nombre}: ${resultado ? 'OK' : 'FALLO'}`);
  });
}

// Ejecutar las pruebas si se ejecuta directamente
if (typeof window === 'undefined') {
  // Ejecutar en Node.js
  ejecutarPruebas().then(resultados => {
    console.log('\n🏁 Pruebas completadas');
    process.exit(resultados.fallidos > 0 ? 1 : 0);
  });
} else {
  // Ejecutar en el navegador
  window.ejecutarPruebasIntegracion = ejecutarPruebas;
  window.probarFrontend = probarFrontend;
  
  console.log('🔧 Script de pruebas cargado. Usa:');
  console.log('   • ejecutarPruebasIntegracion() - Para probar la API');
  console.log('   • probarFrontend() - Para probar el frontend');
}

export { ejecutarPruebas, probarFrontend };
