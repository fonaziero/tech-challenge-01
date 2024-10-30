import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    if (!userId) {
      throw new Error('ID do usuário não fornecido');
    }

    const response = await fetch(`http://localhost:3001/users/${userId}`);
    if (!response.ok) {
      throw new Error('Falha ao obter os dados do usuário');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar os dados do usuário', error: 'Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    if (!userId) {
      throw new Error('ID do usuário não fornecido');
    }

    const body = await request.json();
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar o saldo do usuário');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o saldo do usuário', error: 'Error' },
      { status: 500 }
    );
  }
}
