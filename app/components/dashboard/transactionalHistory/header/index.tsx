import CircleButton from "@/app/components/UI/buttons/circleButton";

export function Header() {
    return (
        <div className="flex justify-between items-center gap-5 mb-3 sticky top-0 bg-white z-10 p-4 border-b border-gray-300 pt-8" >
            <h3 className="text-lg font-bold">Extrato</h3>
            <div className="flex gap-3">
                <CircleButton type="button">
                    <i className="fa-solid fa-pen"></i>
                </CircleButton>
                <CircleButton type="button">
                    <i className="fa-solid fa-trash"></i>
                </CircleButton>
            </div>
        </div>
    );
}
