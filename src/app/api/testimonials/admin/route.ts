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

// GET - Listar todos os depoimentos para administração (incluindo não aprovados)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    
    // Verificação básica de segurança (em produção, usar um sistema mais robusto)
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Acesso não autorizado' }, { status: 401 });
    }
    
    const db = await getDB();
    const testimonials = await db.all('SELECT * FROM testimonials ORDER BY createdAt DESC');
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar depoimentos' }, { status: 500 });
  }
}

// PUT - Aprovar ou rejeitar depoimento
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    
    // Verificação básica de segurança
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Acesso não autorizado' }, { status: 401 });
    }
    
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    
    const db = await getDB();
    
    // Verificar se o depoimento existe
    const testimonial = await db.get('SELECT * FROM testimonials WHERE id = ?', data.id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 });
    }
    
    // Atualizar status de aprovação
    const result = await db.run(
      'UPDATE testimonials SET approved = ? WHERE id = ?',
      [data.approved ? 1 : 0, data.id]
    );
    
    if (result.changes > 0) {
      const updatedTestimonial = await db.get('SELECT * FROM testimonials WHERE id = ?', data.id);
      return NextResponse.json(updatedTestimonial);
    } else {
      return NextResponse.json({ error: 'Falha ao atualizar depoimento' }, { status: 500 });
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
    const adminKey = searchParams.get('adminKey');
    const id = searchParams.get('id');
    
    // Verificação básica de segurança
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Acesso não autorizado' }, { status: 401 });
    }
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    
    const db = await getDB();
    
    // Verificar se o depoimento existe
    const testimonial = await db.get('SELECT * FROM testimonials WHERE id = ?', id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Depoimento não encontrado' }, { status: 404 });
    }
    
    // Remover depoimento
    const result = await db.run('DELETE FROM testimonials WHERE id = ?', id);
    
    if (result.changes > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Falha ao remover depoimento' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro ao remover depoimento:', error);
    return NextResponse.json({ error: 'Erro ao remover depoimento' }, { status: 500 });
  }
} 