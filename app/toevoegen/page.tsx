'use client'; // Dit is nodig voor formulieren in Next.js

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function VoegProductToe() {
  const [naam, setNaam] = useState('');
  const [prijs, setPrijs] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Laden...');

    // Gegevens opslaan in Supabase
    const geformatteerdePrijs = prijs.replace(',', '.'); // Verander komma in punt
    const { error } = await supabase
       .from('producten')
       .insert([{ naam, prijs: parseFloat(geformatteerdePrijs) }]);

    if (error) {
      setStatus('Fout: ' + error.message);
    } else {
      setStatus('Product succesvol toegevoegd!');
      setNaam('');
      setPrijs('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-xl font-bold mb-4 text-black">Nieuw Product Verkopen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Naam van het product"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
        <input
          type="number"
          placeholder="Prijs (bijv. 15.50)"
          value={prijs}
          onChange={(e) => setPrijs(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Opslaan in Database
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  );
}