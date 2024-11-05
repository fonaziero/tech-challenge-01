import React, { useState } from "react";
import CircleButton from "@/app/components/UI/buttons/circleButton";
import { Transaction } from "@/app/interfaces/transaction";
import EditModal from "../edit";
import { useRouter } from "next/navigation";

type HeaderProps = {
    history: Transaction[];
    onUpdateHistory: () => void;
    updateUser: () => void;
};

export function Header({ history, onUpdateHistory, updateUser }: HeaderProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const router = useRouter();

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setDeleteMode(false);
    };

    const handleTransactionUpdate = () => {
        onUpdateHistory(); 
        updateUser();
    };

    return (
        <>
            <div className="flex justify-between items-center gap-5 mb-3 sticky top-0 bg-white z-10 p-4 border-b border-gray-300 pt-8">
                <h3 className="text-lg font-bold">Extrato</h3>
                <div className="flex gap-3">
                    <CircleButton type="button" onClick={() => { setIsEditModalOpen(true); setDeleteMode(false); }}>
                        <i className="fa-solid fa-pen"></i>
                    </CircleButton>
                    <CircleButton type="button" onClick={() => { setIsEditModalOpen(true); setDeleteMode(true); }}>
                        <i className="fa-solid fa-trash"></i>
                    </CircleButton>
                </div>
            </div>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={handleEditModalClose}
                history={history}
                deleteMode={deleteMode}
                onTransactionUpdate={handleTransactionUpdate}
                updateUser={updateUser}
            />
        </>
    );
}

export default Header;
