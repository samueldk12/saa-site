import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { Testimonial } from '@/models/Testimonial';

// Inicialização do banco de dados
let db: Database | null = null;

async function getDB() {
  if (!db) {
    db = await open({
      filename: path.join(process.cwd(), 'testimonials.db'),
      driver: sqlite3.Database
    });
    
    // Cria tabela se não existir
    await db.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        company TEXT NOT NULL,
        position TEXT NOT NULL,
        testimonial TEXT NOT NULL,
        votes INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        approved INTEGER DEFAULT 0
      )
    `);
  }
  return db;
}

// GET - Listar todos os depoimentos aprovados ou administrador ver todos
export async function GET(request: NextRequest) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    let testimonials;
    if (isAdmin) {
      testimonials = await db.all('SELECT * FROM testimonials ORDER BY votes DESC');
    } else {
      testimonials = await db.all('SELECT * FROM testimonials WHERE approved = 1 ORDER BY votes DESC');
    }
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar depoimentos' }, { status: 500 });
  }
}

// POST - Criar um novo depoimento
export async function POST(request: NextRequest) {
  try {
    const db = await getDB();
    const data = await request.json();
    
    // Validação de dados
    if (!data.name || !data.company || !data.position || !data.testimonial) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }
    
    const result = await db.run(
      `INSERT INTO testimonials (name, company, position, testimonial) 
       VALUES (?, ?, ?, ?)`,
      [data.name, data.company, data.position, data.testimonial]
    );
    
    if (result.lastID) {
      const newTestimonial = await db.get('SELECT * FROM testimonials WHERE id = ?', result.lastID);
      return NextResponse.json(newTestimonial, { status: 201 });
    } else {
      throw new Error('Falha ao inserir depoimento');
    }
  } catch (error) {
    console.error('Erro ao adicionar depoimento:', error);
    return NextResponse.json({ error: 'Erro ao adicionar depoimento' }, { status: 500 });
  }
}

// PUT - Atualizar depoimento (aprovar)
export async function PUT(request: NextRequest) {
  try {
    const db = await getDB();
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    
    const { id, approved } = data;
    
    const result = await db.run(
      'UPDATE testimonials SET approved = ? WHERE id = ?',
      [approved ? 1 : 0, id]
    );
    
    if (result.changes && result.changes > 0) {
      const updatedTestimonial = await db.get('SELECT * FROM testimonials WHERE id = ?', id);
      return NextResponse.json(updatedTestimonial);
    } else {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error);
    return NextResponse.json({ error: 'Erro ao atualizar depoimento' }, { status: 500 });
  }
}

// DELETE - Remover depoimento
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    
    const db = await getDB();
    const result = await db.run('DELETE FROM testimonials WHERE id = ?', id);
    
    if (result.changes && result.changes > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao remover depoimento:', error);
    return NextResponse.json({ error: 'Erro ao remover depoimento' }, { status: 500 });
  }
} 