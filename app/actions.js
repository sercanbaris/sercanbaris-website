'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

// KULLANICI EKLEME İŞLEMİ
export async function addUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');

  if (!name || !email) return;

  const db = await pool.getConnection();
  try {
    await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  } catch (error) {
    console.error("Kayıt hatası:", error);
  } finally {
    db.release();
  }

  revalidatePath('/'); 
}

// KULLANICI SİLME İŞLEMİ
export async function deleteUser(formData) {
  const id = formData.get('id');

  const db = await pool.getConnection();
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  } catch (error) {
    console.error("Silme hatası:", error);
  } finally {
    db.release();
  }

  revalidatePath('/');
}