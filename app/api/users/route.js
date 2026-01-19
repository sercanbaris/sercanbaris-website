// app/api/users/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // 2. adımda oluşturduğumuz havuzu çağırdık

export async function GET() {
  try {
    // Veritabanından bağlantı al
    const db = await pool.getConnection();
    
    // Sorguyu çalıştır (Query)
    const [rows] = await db.query('SELECT * FROM users');
    
    // Bağlantıyı serbest bırak (önemli!)
    db.release();

    // Veriyi JSON olarak döndür
    return NextResponse.json(rows);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// İleride POST eklemek istersen buraya export async function POST(request) {...} yazacaksın.