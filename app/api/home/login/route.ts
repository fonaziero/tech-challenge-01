import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 });
  }

  try {
    const userRes = await fetch(`http://localhost:3001/users?email=${email}`);
    const users = await userRes.json();

    if (users.length === 0) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }
    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email ou senha inválidos' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login realizado com sucesso', user: { id: user.id, email: user.email, name: user.name, balance: user.balance } });
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}
