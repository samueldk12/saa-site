import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Inicialização do banco de dados
let db: Database | null = null;

async function getDB() {
  if (!db) {
    db = await open({
      filename: path.join(process.cwd(), 'testimonials.db'),
      driver: sqlite3.Database
    });
  }
  return db;
}

// POST - Votar em um depoimento
export async function POST(request: NextRequest) {
  try {
    const db = await getDB();
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    
    // Verifica se o depoimento existe e está aprovado
    const testimonial = await db.get(
      'SELECT * FROM testimonials WHERE id = ? AND approved = 1',
      data.id
    );
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Depoimento não encontrado ou não aprovado' },
        { status: 404 }
      );
    }
    
    // Incrementa o voto
    const result = await db.run(
      'UPDATE testimonials SET votes = votes + 1 WHERE id = ?',
      data.id
    );
    
    if (result.changes > 0) {
      const updatedTestimonial = await db.get('SELECT * FROM testimonials WHERE id = ?', data.id);
      return NextResponse.json(updatedTestimonial);
    } else {
      return NextResponse.json({ error: 'Falha ao votar no depoimento' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro ao votar em depoimento:', error);
    return NextResponse.json({ error: 'Erro ao processar voto' }, { status: 500 });
  }
} 