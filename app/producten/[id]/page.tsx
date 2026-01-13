import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

export default async function ProductPagina({ params }: { params: { id: string } }) {
  // We halen het specifieke product op uit de database op basis van het ID in de URL
  const { data: product, error } = await supabase
    .from('producten')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !product) {
    notFound(); // Toon een 404 pagina als het product niet bestaat
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.naam}</h1>
        <p className="text-2xl text-green-600 font-semibold mt-2">€{product.prijs.toFixed(2)}</p>
      </div>
      
      <div className="py-4 text-gray-600">
        <p>{product.beschrijving || "Geen beschrijving beschikbaar."}</p>
        <p className="mt-4 text-sm italic">Status: {product.voorraad > 0 ? 'Op voorraad' : 'Verkocht'}</p>
      </div>

      {/* Hier komt later je betaalknop (Mollie/Stripe) */}
      <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
        Nu kopen via WhatsApp
      </button>
      
      <p className="text-center text-xs text-gray-400 mt-6">
        Gedeeld via jouw Social Media App
      </p>
    </div>
  );
}