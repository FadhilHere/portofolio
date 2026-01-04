export default function Foreword() {
    return (
      <section className="min-h-screen flex items-center py-20 px-6 bg-gray-900/20">
        <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <span className="text-accent text-sm tracking-widest font-sans uppercase">
                    Editorial
                </span>
                <h2 className="text-4xl md:text-5xl font-serif">Kata Pengantar</h2>
                <div className="h-1 w-20 bg-accent mx-auto" />
            </div>
  
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-gray-300 leading-relaxed text-lg">
                <div className="space-y-6 first-letter:text-5xl first-letter:font-serif first-letter:text-white first-letter:float-left first-letter:mr-3 first-letter:mt-[-5px]">
                    <p>
                        Portofolio ini bukan sekadar arsip tugas kuliah, tapi <span className="text-white italic">core memory</span> dari proses transformasi diri aku. Di mata kuliah Pengembangan Kepribadian, aku sadar kalau jago <b>coding</b> aja nggak cukup. Dunia butuh lebih dari sekadar baris kode, hehe. Dunia butuh karakter.
                    </p>
                    <p>
                        Ini adalah dokumentasi perjalanan aku memahami <span className="text-accent">Self-Concept</span> dan etika profesional. Bukan tentang menjadi orang lain, tapi menjadi versi terbaik dari diri sendiri.
                    </p>
                </div>
                <div className="space-y-6">
                    <h3 className="text-white font-serif text-2xl">
                        "Upgrade Your Character"
                    </h3>
                    <p>
                         Buat aku, pengembangan diri itu kaya <b>software update</b>. Ada <b>bug</b> yang harus di-fix (kekurangan diri), dan ada fitur baru yang harus di-install (skill komunikasi & manner).
                    </p>
                    <div className="border-l-2 border-accent pl-4 italic text-gray-400">
                        "Competence gets you in the room, but character keeps you there." <br/>
                    </div>
                </div>
            </div>

            {/* Signature/Date */}
            <div className="text-right pt-8 border-t border-gray-800">
                <p className="font-serif text-xl">Fadhil</p>
                <p className="text-sm text-gray-500 font-sans">2026</p>
            </div>
        </div>
      </section>
    );
  }
