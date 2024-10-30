import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/transactionalHistory');
    if (!response.ok) {
      throw new Error('Falha ao obter os dados do extrato');
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar os dados do extrato', error: 'Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json(); 
    const response = await fetch('http://localhost:3001/transactionalHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Falha ao inserir os dados do extrato');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao inserir os dados do extrato', error: 'Error' },
      { status: 500 }
    );
  }
}