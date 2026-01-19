import pool from '@/lib/db';
import { addUser, deleteUser } from './actions';
import { RowDataPacket } from 'mysql2'; // <--- 1. YENİ EKLENEN KISIM

export const dynamic = 'force-dynamic'; 

export default async function Home() {
  const db = await pool.getConnection();
  
  // 2. YENİ EKLENEN KISIM: <RowDataPacket[]> 
  // TypeScript'e dönen verinin bir dizi olduğunu garanti ediyoruz.
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users ORDER BY id DESC');
  
  db.release();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-10 px-4">
      
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Kullanıcı Yönetimi
        </h1>

        {/* --- EKLEME FORMU --- */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Yeni Kullanıcı</h2>
          
          <form action={addUser} className="flex flex-col gap-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Ad Soyad" 
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
            
            <input 
              type="email" 
              name="email" 
              placeholder="E-posta" 
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
            
            <button 
              type="submit" 
              className="bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-500 transition shadow-md active:scale-95"
            >
              Kaydet
            </button>
          </form>
        </div>

        {/* --- LİSTE --- */}
        <h2 className="text-xl font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">
          Kayıtlı Kişiler <span className="text-sm font-normal text-gray-500 ml-2">({rows.length})</span>
        </h2>
        
        {rows.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
            Henüz kayıtlı kullanıcı yok.
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((user) => (
              <li key={user.id} className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:border-gray-500 transition group">
                
                <div>
                  <div className="font-bold text-gray-200 group-hover:text-blue-400 transition">{user.name}</div> 
                  <div className="text-gray-400 text-sm">{user.email}</div>
                </div>

                <form action={deleteUser}>
                  <input type="hidden" name="id" value={user.id} />
                  <button 
                    type="submit" 
                    className="bg-red-900/30 text-red-400 border border-red-900/50 px-4 py-2 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                  >
                    Sil
                  </button>
                </form>

              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}