import { formatCurrencyBRL } from '@/app/utils/formatters';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const response = await fetch(`http://localhost:3001/transactionalHistory?_start=${offset}&_limit=${limit}&_sort=-date&_order=asc`);
    if (!response.ok) {
      throw new Error('Falha ao obter os dados do extrato');
    }
    const data = await response.json();

    return NextResponse.json(data.map((item: any) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("pt-BR"),
        month: new Date(item.date).toLocaleString("pt-BR", { month: "long" }),
        type: item.type,
        value: formatCurrencyBRL(parseFloat(item.value)),
      })));
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
      body: JSON.stringify({ ...body, value: parseFloat(body.value) }),
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      throw new Error('ID do item a ser atualizado não fornecido');
    }
    const updatedBody = {
      id: body.id,
      userId: body.userId,
      value: parseFloat(body.value),
      type: body.type,
      method: body.method,
      date: new Date().toISOString()
    };
    const response = await fetch(`http://localhost:3001/transactionalHistory/${body.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBody),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar os dados do extrato');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar os dados do extrato', error: 'Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      throw new Error('ID do item a ser removido não fornecido');
    }

    const response = await fetch(`http://localhost:3001/transactionalHistory/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao remover os dados do extrato');
    }

    return NextResponse.json({ message: 'Item removido com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao remover os dados do extrato', error: 'Error' },
      { status: 500 }
    );
  }
}
