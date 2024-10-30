'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Transaction } from '@/app/interfaces/transaction';
import { handleFetchError } from '@/app/utils/formatters';
import { fetchTransactionHistory } from '@/app/services/transactionService';
import { handleScroll } from '@/app/utils/scroll';
import { Header } from './header';
import History from './history';

interface TransactionHistoryProps {
  updateHistoryTrigger: boolean;
}

export default function TransactionHistory({ updateHistoryTrigger }: TransactionHistoryProps) {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const LIMIT = 10;

  useEffect(() => {
    const loadHistory = async () => {
      setHistory([]);
      setOffset(0);
      setHasMore(true);
      await loadMoreHistory(0);
    };
    loadHistory();
  }, [updateHistoryTrigger]);

  const loadMoreHistory = async (newOffset: number) => {
    setLoading(true);
    try {
      const newHistory = await fetchTransactionHistory(newOffset, LIMIT);
      if (newHistory.length < LIMIT) {
        setHasMore(false);
      }
      setHistory((prevHistory) => {
        const existingIds = new Set(prevHistory.map((item) => item.id));
        const filteredHistory = newHistory.filter((item: Transaction) => !existingIds.has(item.id));
        return [...prevHistory, ...filteredHistory];
      });
    } catch (error) {
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (offset > 0 && hasMore) {
      loadMoreHistory(offset);
    }
  }, [offset]);

  return (
    <div className="flex-1 flex p-4 md:p-8 lg:p-0">
      <div
        ref={containerRef}
        onScroll={() => handleScroll(containerRef, loading, hasMore, setOffset, LIMIT)}
        className="bg-white rounded-lg shadow-md w-full p-8 pt-0 lg:min-w-[282px] lg:h-full lg:min-h-screen lg:mt-8 overflow-y-auto"
        style={{ maxHeight: '500px', }}
      >
        <Header />
        <ul className="space-y-4">
          {history.length > 0 ? (
            history.map((item) => (
              <li key={item.id}>
                <History {...item} />
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma transação disponível.</p>
          )}
        </ul>
        {loading && <p className="text-center text-gray-500 mt-4">Carregando mais transações...</p>}
      </div>
    </div>
  );
}