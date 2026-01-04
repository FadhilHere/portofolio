import Image from "next/image";

export default function PersonalBranding() {
  return (
    <section className="min-h-screen py-20 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Large Image Side */}
        <div className="relative h-[600px] lg:h-[800px] w-full bg-[#111] rounded-2xl overflow-hidden order-2 lg:order-1 border border-white/10 group">
            <Image 
                src="/DSC08744.jpg" 
                alt="Personal Branding" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Overlay Text */}
            <div className="absolute bottom-10 left-10">
                <p className="text-accent font-serif text-3xl italic">"Authenticity is the new currency."</p>
            </div>
        </div>

        {/* Content Side */}
        <div className="space-y-10 order-1 lg:order-2">
            <div>
                <span className="text-sm font-sans tracking-[0.2em] text-gray-500 uppercase">Personal Branding</span>
                <h2 className="text-5xl md:text-6xl font-serif mt-4 leading-tight text-white">
                    "Reliable, <br/>
                    <span className="text-accent">Adaptive,</span> <br/>
                    Authentic."
                </h2>
            </div>

            <div className="space-y-8">
                <div className="bg-white/5 p-6 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-medium mb-3 text-white">My Brand Statement</h3>
                    <p className="text-gray-400 italic text-lg leading-relaxed">
                        "Aku bukan sekadar type of guy yang nulis kode, tapi "listener" yang peduli sama user experience. Aku percaya teknologi itu harusnya mempermudah hidup, bukan bikin ribet. Simple but impactful."
                    </p>
                </div>
                
                <div>
                     <h3 className="text-xl font-medium mb-3 text-white">The Vibe I Bring</h3>
                     <p className="text-gray-400 leading-relaxed">
                        Aku pengen dikenal sebagai teman kerja yang asik diajak diskusi, bisa diandelin pas deadline mepet, dan selalu jujur apa adanya.
                     </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
