import { StaticImageData } from "next/image";

type InfoItemsProps = {
    title: string;
    description: string;
    icon: StaticImageData;
};

const InfoItems = ({ title, description, icon }: InfoItemsProps) => {

    return (
        <div className="text-center">
            <div className="mb-4 flex justify-center">
                <img src={icon.src} alt="icon" />
            </div>
            <h3 className="font-bold text-md text-green">{title}</h3>
            <p className="text-sm text-gray px-8">
                {description}
            </p>
        </div>
    );
};

export default InfoItems;
