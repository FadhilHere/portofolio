export default function WhoAmI() {
  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Title */}
        <div className="flex flex-col lg:flex-row justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-serif text-white">
                WHO <span className="text-accent italic">AM I?</span>
            </h2>
            <div className="max-w-md text-right mt-4 lg:mt-0">
                <p className="font-sans uppercase tracking-widest text-sm text-gray-500">
                    Kepribadian & Konsep Diri
                </p>
            </div>
        </div>

        {/* Personality Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h3 className="text-2xl font-serif text-white">The Character Build</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                    Aku mendefinisikan diri aku sebagai <b>"System Thinker"</b>. Aku suka melihat segala sesuatu sebagai sistem yang bisa di-"optimize", termasuk diri sendiri. Tapi tenang, aku bukan robot, kok. Aku percaya kalau <span className="text-white italic">empathy</span> itu adalah fitur paling mahal di manusia.
                </p>
                <div className="flex gap-4">
                    {['Ambivert', 'Tech-Savvy', 'Detail-Oriented', 'Cat-Lover'].map((trait) => (
                         <span key={trait} className="px-4 py-2 border border-accent/30 rounded-full text-accent text-sm uppercase tracking-wider bg-accent/5">
                             {trait}
                         </span>
                    ))}
                </div>
            </div>
            
            {/* Visual element for stats/traits */}
            <div className="bg-white/5 p-8 rounded-lg border border-white/10">
                 <h4 className="text-xl font-serif mb-6 text-center text-white">Core System Values</h4>
                 <ul className="space-y-4">
                    {[
                        { val: "Firewall", desc: "Anti bocor, anti manipulasi. Jujur itu harga mati." },
                        { val: "Update", desc: "Selalu siap install patch ilmu baru tiap hari." },
                        { val: "Error Handling", desc: "Kalau gagal (crash), ya restart lagi lebih kuat." }
                    ].map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="font-bold text-gray-200">{item.val}</span>
                            <span className="text-sm text-gray-500 italic">{item.desc}</span>
                        </li>
                    ))}
                 </ul>
            </div>
        </div>

        {/* Strength & Area of Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 border-l-4 border-green-500/50">
                <h4 className="text-2xl font-serif mb-4 flex items-center gap-2 text-white">
                    <span className="text-green-500 text-sm">01</span> Main Buffs
                </h4>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li><b>High Logic:</b> Bisa mecahin masalah kompleks jadi langkah simpel.</li>
                    <li><b>Adaptive:</b> Cepet banget adaptasi sama "framework" atau lingkungan baru.</li>
                    <li><b>Active Listener:</b> Lebih suka dengerin dulu baru "coding" solusi.</li>
                </ul>
            </div>
            <div className="p-8 bg-white/5 border-l-4 border-accent/50">
                <h4 className="text-2xl font-serif mb-4 flex items-center gap-2 text-white">
                    <span className="text-accent text-sm">02</span> Patch Coming Soon (Pengembangan)
                </h4>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li><b>Public Speaking:</b> Masih suka nervous kalo lagi crowded.</li>
                    <li><b>Overthinking:</b> Kadang suka mikirin skenario buruk yang belum tentu kejadian.</li>
                    <li><b>Delegation:</b> Kadang masih suka solo rank, lagi belajar buat percaya tim.</li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
}
