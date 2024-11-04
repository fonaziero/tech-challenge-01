import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Nome, email e senha são obrigatórios' }, { status: 400 });
  }

  try {
    const existingUserRes = await fetch(`http://localhost:3001/users?email=${email}`);
    const existingUsers = await existingUserRes.json();

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createUserRes = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!createUserRes.ok) {
      throw new Error('Falha ao criar o usuário');
    }

    const createdUser = await createUserRes.json();

    return NextResponse.json({ message: 'Usuário registrado com sucesso', user: createdUser }, { status: 201 });
  } catch (error) {
    console.error('Erro ao processar o registro:', error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}
