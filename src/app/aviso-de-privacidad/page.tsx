
import React from 'react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Aviso de Privacidad</h1>
        <div className="space-y-6 text-base">
          <p>
            Xianna es responsable del tratamiento de los datos personales que nos proporciones a través del Cuestionario de Estilo, los cuales serán tratados de forma confidencial y conforme a la legislación aplicable en materia de protección de datos personales.
          </p>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Datos que se recaban</h2>
            <p className="mb-2">
              Los datos que solicitamos pueden incluir, de manera enunciativa más no limitativa:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Nombre</li>
              <li>Correo electrónico</li>
              <li>Preferencias de estilo, imagen y consumo</li>
              <li>
                Información relacionada con gustos, hábitos y necesidades personales vinculadas a servicios de asesoría de imagen y estilo
              </li>
            </ul>
            <p className="mt-3 font-medium">En ningún caso solicitamos datos sensibles.</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Finalidades del tratamiento</h2>
            <p className="mb-2">
              Tus datos personales serán utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Analizar tu perfil y preferencias de estilo</li>
              <li>
                Ofrecerte recomendaciones personalizadas de imagen, moda y servicios de Xianna
              </li>
              <li>Dar seguimiento a solicitudes, consultas o servicios contratados</li>
              <li>
                Enviarte información relacionada con nuestros servicios, en caso de que así lo autorices
              </li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Protección y confidencialidad</h2>
            <p>
              Xianna se compromete a proteger tu información personal, implementando medidas de seguridad administrativas, técnicas y físicas que evitan su pérdida, uso indebido, acceso no autorizado o divulgación.
            </p>
            <p>
              Tus datos no serán compartidos con terceros sin tu consentimiento, salvo en los casos legalmente previstos.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Derechos ARCO</h2>
            <p>
              En cualquier momento podrás ejercer tus derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO) respecto a tus datos personales, así como revocar tu consentimiento, enviando una solicitud al correo:
            </p>
            <p className="text-center font-medium mt-2">
              <a href="mailto:xianna.mx1@gmail.com" className="text-indigo-600 hover:text-indigo-800">
                📩 xianna.mx1@gmail.com
              </a>
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Aceptación del Aviso de Privacidad</h2>
            <p>
              Al continuar y enviar este cuestionario, confirmas que has leído y aceptas el presente Aviso de Privacidad y otorgas tu consentimiento para el tratamiento de tus datos personales conforme a los fines aquí descritos.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Volver a la página principal
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
