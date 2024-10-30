export const fetchTransactionHistory = async (offset: number, limit: number) => {
    const response = await fetch(`http://localhost:3001/transactionalHistory?_start=${offset}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar o extrato');
    }
    const data = await response.json();
    
    return data.map((item: any) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("pt-BR"),
      month: new Date(item.date).toLocaleString("pt-BR", { month: "long" }),
      type: item.type,
      value: `R$ ${parseFloat(item.value).toFixed(2)}`,
    }));
  };
  